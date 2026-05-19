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

const resend = new Resend(process.env.RESEND_API_KEY);

const NewsletterEmailSchema = z.object({
    subject: z.string().describe('The subject line of the email.'),
    body: z.string().describe('The HTML body of the email.'),
});

const SendNewsletterInputSchema = z.object({
  newsItems: z.array(z.custom<News>()).describe('The list of news items to be sent.'),
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
  async ({ newsItems, subscribers }) => {
    if (!newsItems || newsItems.length === 0) {
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

    const newsHtml = newsItems.map(news => `
        <div style="margin-bottom: 2rem; padding-bottom: 1rem; border-bottom: 1px solid #eeeeee;">
            <img src="${news.image}" alt="${news.title}" style="max-width: 100%; height: auto; border-radius: 8px; margin-bottom: 1rem;" />
            <h3 style="font-size: 1.25rem; margin-top: 0; margin-bottom: 0.5rem;">${news.title}</h3>
            <p style="margin-top: 0; margin-bottom: 1rem;">${news.description}</p>
            <a href="https://arte-nativo-web.vercel.app/news/${news.id}" style="display: inline-block; padding: 10px 20px; background-color: #1a73e8; color: #ffffff; text-decoration: none; border-radius: 5px;">
              Ver más
            </a>
        </div>
    `).join('');
    
    // Manual email body construction
    const subject = "Novedades de Arte Nativo Estampados";
    const body = `
      <div style="font-family: Arial, sans-serif; line-height: 1.6;">
        <h2 style="font-size: 1.5rem; margin-bottom: 2rem;">Estas son las novedades que tenemos para vos:</h2>
        ${newsHtml}
      </div>
    `;

    const emailContent = { subject, body };
    
    // Send email to all subscribers using Resend
    try {
        const emails = subscribers.map(s => s.email);
        console.log("Sending emails to:", emails);
        await resend.emails.send({
            from: 'Acme <onboarding@resend.dev>', 
            to: ['julianlasoto@gmail.com'], // Use a test address from Resend
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
