'use server';
/**
 * @fileOverview A Genkit flow for analyzing potential impulse purchases.
 *
 * - analyzeImpulse - A function that analyzes a potential purchase for impulse characteristics.
 * - AnalyzeImpulseInput - The input type for the analyzeImpulse function.
 * - AnalyzeImpulseOutput - The return type for the analyzeImpulse function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const AnalyzeImpulseInputSchema = z.object({
  itemName: z.string().describe('The name of the item the user wants to buy.'),
  price: z.number().describe('The price of the item.'),
  mood: z.string().describe('The user\'s current emotional state (e.g., Stressed, Bored, Excited).'),
  isOnSale: z.boolean().describe('Whether the item is currently on sale.'),
});
export type AnalyzeImpulseInput = z.infer<typeof AnalyzeImpulseInputSchema>;

const AnalyzeImpulseOutputSchema = z.object({
  impulseRating: z.number().min(0).max(100).describe('A score from 0-100 indicating how "impulsive" this purchase seems.'),
  analysis: z.string().describe('A brief behavioral analysis of why this might be an impulse buy.'),
  recommendation: z.string().describe('A specific recommendation (e.g., "Wait 24 hours").'),
  alternativeAction: z.string().describe('A productive alternative to spending this money right now.'),
  savingsGoalImpact: z.string().describe('A comment on how this affects long-term savings goals.'),
});
export type AnalyzeImpulseOutput = z.infer<typeof AnalyzeImpulseOutputSchema>;

export async function analyzeImpulse(
  input: AnalyzeImpulseInput
): Promise<AnalyzeImpulseOutput> {
  return analyzeImpulseFlow(input);
}

const impulseAnalysisPrompt = ai.definePrompt({
  name: 'impulseAnalysisPrompt',
  input: { schema: AnalyzeImpulseInputSchema },
  output: { schema: AnalyzeImpulseOutputSchema },
  prompt: `You are a behavioral economist assistant. Analyze the following potential purchase for impulse triggers.

Item: {{{itemName}}}
Price: \${{{price}}}
Current Mood: {{{mood}}}
Is on Sale: {{#if isOnSale}}Yes{{else}}No{{/if}}

Consider that:
- Emotions like stress and boredom are high impulse triggers.
- "Sales" create a false sense of urgency.
- Young adults are particularly susceptible to social validation purchases.

Provide a rating, a behavioral analysis, a cooling-off recommendation, and one alternative action.
`,
});

const analyzeImpulseFlow = ai.defineFlow(
  {
    name: 'analyzeImpulseFlow',
    inputSchema: AnalyzeImpulseInputSchema,
    outputSchema: AnalyzeImpulseOutputSchema,
  },
  async (input) => {
    const { output } = await impulseAnalysisPrompt(input);
    return output!;
  }
);
