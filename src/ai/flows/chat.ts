// src/ai/flows/chat.ts
'use server';

/**
 * @fileOverview A chat flow for the Arte Nativo Estampados store.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';
import { MessageData } from 'genkit';
import { getProducts } from '@/lib/data';

// Tool para que la IA pueda consultar los productos
const getStoreProducts = ai.defineTool(
  {
    name: 'getStoreProducts',
    description:
      'Obtiene la lista de productos disponibles en la tienda para responder preguntas sobre stock, tipos de productos, materiales, etc. Úsalo cuando el usuario pregunte qué vendes, si tienes un artículo específico o sobre la disponibilidad de productos.',
    inputSchema: z.object({}),
    outputSchema: z.array(
      z.object({
        title: z.string(),
        category: z.string(),
        description: z.string(),
        disponible: z.boolean().optional(),
      })
    ),
  },
  async () => {
    console.log('Buscando productos en la tienda...');
    const products = await getProducts();
    // Asegurarse de que el formato coincida exactamente con el schema
    return products.map(({ title, category, description, disponible }) => ({
      title,
      category,
      description,
      disponible: disponible ?? false, // Asegurar que disponible siempre sea un booleano
    }));
  }
);

const ChatInputSchema = z.object({
  history: z.array(z.any()).describe('The conversation history.'),
  message: z.string().describe('The latest user message.'),
});
export type ChatInput = z.infer<typeof ChatInputSchema>;

const ChatOutputSchema = z.object({
  message: z.string().describe('The AI-generated response.'),
});
export type ChatOutput = z.infer<typeof ChatOutputSchema>;

const systemPrompt = `You are a friendly and helpful AI assistant for Arte Nativo Estampados, a store that sells personalized products like t-shirts, mugs, keychains, and more.

Your role is to:
- Answer customer questions about products, materials, and personalization options.
- Help users with their design ideas.
- Provide information about the store.
- Maintain a positive and creative tone.
- Keep your answers concise and to the point.
- IMPORTANT: When the user asks about available products, what you sell, or if you have a specific item (like 'remeras', 'tazas', 'pines', etc.), you MUST use the getStoreProducts tool to get the current product list before answering. Do not invent products.
- After using the tool, answer the user's question based on the information you received.
`;

const chatFlow = ai.defineFlow(
  {
    name: 'chatFlow',
    inputSchema: ChatInputSchema,
    outputSchema: ChatOutputSchema,
  },
  async ({ history, message }) => {
    const chatHistory: MessageData[] = history.map((msg: any) => ({
      role: msg.role,
      content: [{ text: msg.content }],
    }));

    const llmResponse = await ai.generate({
      model: 'googleai/gemini-2.0-flash',
      system: systemPrompt,
      history: chatHistory,
      prompt: message,
      tools: [getStoreProducts],
    });

    const responseText = llmResponse.text;
    return {
      message: responseText,
    };
  }
);

export async function chat(input: ChatInput): Promise<ChatOutput> {
  return chatFlow(input);
}
