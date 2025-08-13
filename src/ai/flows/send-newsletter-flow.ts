// src/ai/flows/send-newsletter-flow.ts
'use server';

/**
 * @fileOverview A flow for generating and sending a newsletter.
 * 
 * - sendNewsletter - Generates an email for the latest news and sends it to all subscribers.
 * - SendNewsletterOutput - The return type for the sendNewsletter function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';
import { News, Subscriber } from '@/lib/types';
import { Resend } from 'resend';
import { getSubscribers, getNews } from '@/lib/data';

const resend = new Resend(process.env.RESEND_API_KEY);

const NewsletterEmailSchema = z.object({
    subject: z.string().describe('The subject line of the email.'),
    body: z.string().describe('The HTML body of the email.'),
});

const SendNewsletterInputSchema = z.object({
  latestNews: z.custom<News>().describe('The latest news item to be sent.'),
  subscribers: z.array(z.custom<Subscriber>()).describe('The list of subscribers.'),
});
export type SendNewsletterInput = z.infer<typeof SendNewsletterInputSchema>;


const SendNewsletterOutputSchema = z.object({
  subscribersCount: z.number().describe('The number of subscribers the newsletter was sent to.'),
  emailPreview: NewsletterEmailSchema.describe('A preview of the generated email.'),
  message: z.string().describe('A confirmation message for the user.'),
});
export type SendNewsletterOutput = z.infer<typeof SendNewsletterOutputSchema>;

const sendNewsletterFlow = ai.defineFlow(
  {
    name: 'sendNewsletterFlow',
    inputSchema: SendNewsletterInputSchema,
    outputSchema: SendNewsletterOutputSchema,
  },
  async ({ latestNews, subscribers }) => {
    if (!latestNews) {
        throw new Error("No hay noticias para enviar.");
    }
    
    if (subscribers.length === 0) {
        return {
            subscribersCount: 0,
            message: 'No hay suscriptores a los que enviar la newsletter.',
            emailPreview: { subject: '', body: '' },
        };
    }
    
    if (!process.env.RESEND_API_KEY) {
        throw new Error("La API Key de Resend no está configurada. Por favor, añádela a tus variables de entorno.");
    }

    // Manual email body construction
    const subject = "Novedades arte nativo estampados";
    const body = `
      <div style="font-family: Arial, sans-serif; line-height: 1.6;">
        <h2>Estas son las novedades que tenemos para vos:</h2>
        <img src="${latestNews.image}" alt="${latestNews.title}" style="max-width: 100%; height: auto; border-radius: 8px;" />
        <h3>${latestNews.title}</h3>
        <p>${latestNews.description}</p>
        <a href="https://arte-nativo-web.web.app/news/${latestNews.id}" style="display: inline-block; padding: 10px 20px; background-color: #1a73e8; color: #ffffff; text-decoration: none; border-radius: 5px;">
          Ver más
        </a>
      </div>
    `;

    const emailContent = { subject, body };
    
    // Send email to all subscribers using Resend
    try {
        const emails = subscribers.map(s => s.email);
        await resend.emails.send({
            from: 'Arte Nativo <newsletter@info.artenativo.com.ar>', // You will need to verify this domain in Resend
            to: emails,
            subject: emailContent.subject,
            html: emailContent.body,
        });
    } catch (error) {
        console.error("Error sending emails with Resend:", error);
        throw new Error("No se pudieron enviar los correos. Revisa la configuración de Resend y que el dominio esté verificado.");
    }
    
    const subscribersCount = subscribers.length;
    console.log("Newsletter sent. Subject:", emailContent.subject);
    console.log(`Sent to ${subscribersCount} subscribers.`);
    
    return {
      subscribersCount,
      emailPreview: emailContent,
      message: `¡Newsletter enviada a ${subscribersCount} suscriptores!`,
    };
  }
);

export async function sendNewsletter(input: SendNewsletterInput): Promise<SendNewsletterOutput> {
  return await sendNewsletterFlow(input);
}
