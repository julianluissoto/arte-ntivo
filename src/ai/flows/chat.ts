'use server';

import Groq from 'groq-sdk';
import { getProducts } from '@/lib/data';

const groqClient = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

export type ChatInput = {
  history: { role: string; content: string }[];
  message: string;
};

export type ChatOutput = {
  message: string;
};

const systemPrompt = `Eres un asistente amigable y útil de Arte Nativo Estampados, una tienda que vende productos personalizados como remeras, tazas, llaveros y más.

Tu rol es:
- Responder preguntas de clientes sobre productos, materiales y opciones de personalización.
- Ayudar a los usuarios con sus ideas de diseño.
- Brindar información sobre la tienda.
- Mantener un tono positivo y creativo.
- Ser conciso y directo en tus respuestas.
- Habla siempre en español.`;

async function fetchProducts() {
  try {
    const products = await getProducts();
    if (!products || !Array.isArray(products)) return [];
    return products.map((p: any) => ({
      title: String(p?.title || 'Producto sin nombre'),
      category: String(p?.category || 'General'),
      description: String(p?.description || ''),
      disponible: Boolean(p?.disponible),
    }));
  } catch {
    return [];
  }
}

export async function chat(input: ChatInput): Promise<ChatOutput> {
  try {
    const { history, message } = input;

    // Detectamos si el usuario pregunta por productos
    const productKeywords = ['producto', 'vend', 'remera', 'taza', 'llavero', 'stock', 'disponible', 'tienen', 'tienes', 'catálogo', 'catalogo', 'artículo', 'articulo', 'pin', 'comprar'];
    const asksForProducts = productKeywords.some(kw => message.toLowerCase().includes(kw));

    let productContext = '';
    if (asksForProducts) {
      const products = await fetchProducts();
      if (products.length > 0) {
        productContext = `\n\nProductos disponibles en la tienda:\n${JSON.stringify(products, null, 2)}`;
      }
    }

    const messages: Groq.Chat.ChatCompletionMessageParam[] = [
      { role: 'system', content: systemPrompt + productContext },
      ...history.map(msg => ({
        role: (msg.role === 'model' ? 'assistant' : msg.role) as 'user' | 'assistant',
        content: msg.content,
      })),
      { role: 'user', content: message },
    ];

    const completion = await groqClient.chat.completions.create({
     model: 'llama-3.1-8b-instant',
      messages,
      max_tokens: 1024,
    });

    const responseText = completion.choices[0]?.message?.content || '';

    return { message: responseText };

  } catch (error: any) {
    console.error('Error en el flujo del Chatbot:', error?.message);
    return {
      message: 'Hola! Estoy experimentando un inconveniente técnico. ¿Podrías intentar de nuevo?',
    };
  }
}