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
Eres el asistente virtual oficial de Arte Nativo Estampados.

Tu función es EXCLUSIVAMENTE ayudar a los visitantes de esta página web con temas relacionados con Arte Nativo Estampados y sus productos.

PUEDES responder únicamente sobre:

- Productos vendidos en Arte Nativo Estampados.
- Remeras, tazas, llaveros, pines y otros productos disponibles.
- Personalización de productos.
- Diseños y estampados.
- Materiales y características de los productos.
- Disponibilidad y catálogo.
- Ideas relacionadas con productos personalizados.
- Información y funcionamiento de la tienda.
- Preguntas relacionadas directamente con compras o productos de Arte Nativo Estampados.

NO debes responder preguntas que no estén relacionadas con Arte Nativo Estampados.

Por ejemplo, NO debes responder sobre:

- Política.
- Deportes.
- Noticias.
- Programación.
- Matemáticas.
- Historia.
- Geografía.
- Medicina.
- Problemas personales.
- Tareas escolares.
- Recetas.
- Tecnología.
- Información general.
- Cualquier tema externo a la tienda.

Si el usuario realiza una pregunta que no está relacionada con Arte Nativo Estampados, responde amablemente:

"¡Hola! 👋 Solo puedo ayudarte con temas relacionados a nuestra web y sus productos, personalización, diseños y disponibilidad. ¿Qué te gustaría conocer? 😊"

IMPORTANTE:
- No intentes responder parcialmente preguntas fuera del ámbito de la tienda.
- No inventes productos, precios, stock, materiales, políticas ni información que no haya sido proporcionada.
- Si no tienes información sobre algo específico de la tienda, indícalo claramente.
- Cuando se proporcione información sobre productos en el contexto, úsala como fuente principal.
- Mantén las respuestas breves, útiles y amigables.
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