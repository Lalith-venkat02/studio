'use server';

/**
 * @fileOverview This file defines a Genkit flow for suggesting content to admins
 * for advertising panels and CSR branding records, based on trending environmental concerns.
 *
 * - suggestAdminContent - A function that suggests content for admin use.
 * - AdminContentSuggestionInput - The input type for the suggestAdminContent function.
 * - AdminContentSuggestionOutput - The return type for the suggestAdminContent function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AdminContentSuggestionInputSchema = z.object({
  trendingTopic: z.string().describe('The current trending environmental topic.'),
  targetAudience: z.string().describe('The target audience for the content.'),
});

export type AdminContentSuggestionInput = z.infer<
  typeof AdminContentSuggestionInputSchema
>;

const AdminContentSuggestionOutputSchema = z.object({
  advertisingPanelSuggestion: z
    .string()
    .describe('Suggested content for advertising panels.'),
  csrBrandingRecordSuggestion: z
    .string()
    .describe('Suggested content for CSR branding records.'),
});

export type AdminContentSuggestionOutput = z.infer<
  typeof AdminContentSuggestionOutputSchema
>;

export async function suggestAdminContent(
  input: AdminContentSuggestionInput
): Promise<AdminContentSuggestionOutput> {
  return adminContentSuggestionFlow(input);
}

const adminContentSuggestionPrompt = ai.definePrompt({
  name: 'adminContentSuggestionPrompt',
  input: {schema: AdminContentSuggestionInputSchema},
  output: {schema: AdminContentSuggestionOutputSchema},
  prompt: `You are an expert marketing assistant specializing in generating advertising and CSR content.

  Based on the trending environmental topic and target audience, generate content for advertising panels and CSR branding records.

  Trending Topic: {{{trendingTopic}}}
  Target Audience: {{{targetAudience}}}

  Advertising Panel Suggestion:
  CSR Branding Record Suggestion: `,
});

const adminContentSuggestionFlow = ai.defineFlow(
  {
    name: 'adminContentSuggestionFlow',
    inputSchema: AdminContentSuggestionInputSchema,
    outputSchema: AdminContentSuggestionOutputSchema,
  },
  async input => {
    const {output} = await adminContentSuggestionPrompt(input);
    return output!;
  }
);
