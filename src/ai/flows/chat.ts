'use server';

import Groq from 'groq-sdk';
import { getProducts } from '@/lib/data';

const groqClient = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

export type ChatInput = {
  history: {
    role: string;
    content: string;
  }[];
  message: string;
};

export type ChatOutput = {
  message: string;
};

const systemPrompt = `
Eres un asistente amigable y útil de Arte Nativo Estampados.

Tu rol es:
- Responder preguntas de clientes sobre productos.
- Ayudar con ideas de diseño.
- Brindar información sobre la tienda.
- Mantener un tono positivo y creativo.
- Ser conciso y directo.
- Habla siempre en español.
`;

async function fetchProducts() {
  try {
    const products = await getProducts();

    if (!products || !Array.isArray(products)) {
      return [];
    }

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

export async function chat(
  input: ChatInput,
): Promise<ChatOutput> {
  try {
    const { history, message } = input;

    const productKeywords = [
      'producto',
      'vend',
      'remera',
      'taza',
      'llavero',
      'stock',
      'disponible',
      'tienen',
      'tienes',
      'catálogo',
      'catalogo',
      'artículo',
      'articulo',
      'pin',
      'comprar',
    ];

    const asksForProducts = productKeywords.some((kw) =>
      message.toLowerCase().includes(kw),
    );

    let productContext = '';

    if (asksForProducts) {
      const products = await fetchProducts();

      if (products.length > 0) {
        productContext = `
        
Productos disponibles en la tienda:
${JSON.stringify(products, null, 2)}`;
      }
    }

    const messages: Groq.Chat.ChatCompletionMessageParam[] = [
  {
    role: 'system',
    content: systemPrompt + productContext,
  },

  ...history.map(
    (msg): Groq.Chat.ChatCompletionMessageParam => ({
      role:
        msg.role === 'model' || msg.role === 'assistant'
          ? 'assistant'
          : 'user',
      content: msg.content,
    }),
  ),

  {
    role: 'user',
    content: message,
  },
];

    const completion =
      await groqClient.chat.completions.create({
        model: 'openai/gpt-oss-20b',
        messages,
        max_tokens: 1024,
      });

    const responseText =
      completion.choices[0]?.message?.content ||
      'No pude generar una respuesta.';

    return {
      message: responseText,
    };

  } catch (error: any) {
    console.error(
      'Error en el flujo del Chatbot:',
      error?.message,
    );

    return {
      message:
        'Hola! Estoy experimentando un inconveniente técnico. ¿Podrías intentar nuevamente?',
    };
  }
}