'use server';
/**
 * @fileOverview A Genkit flow for generating personalized financial nudges.
 *
 * - generatePersonalizedNudge - A function that generates personalized financial nudges.
 * - GeneratePersonalizedNudgeInput - The input type for the generatePersonalizedNudge function.
 * - GeneratePersonalizedNudgeOutput - The return type for the generatePersonalizedNudge function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const GeneratePersonalizedNudgeInputSchema = z.object({
  financialBehaviorProfile: z
    .string()
    .describe(
      "A description of the user's financial habits and behaviors, or a name of a pre-defined profile (e.g., 'Impulsive Spender', 'Budget-Conscious Saver')."
    ),
  specificConcern: z
    .string()
    .optional()
    .describe(
      'Any specific financial concern or area the user wants to focus on (e.g., "overspending on dining out", "difficulty saving for a down payment").'
    ),
});
export type GeneratePersonalizedNudgeInput = z.infer<
  typeof GeneratePersonalizedNudgeInputSchema
>;

const GeneratePersonalizedNudgeOutputSchema = z.object({
  nudge: z.string().describe('A personalized, AI-generated nudge or advice.'),
  riskCategory: z
    .string()
    .describe(
      'A categorization of the financial impulse risk (e.g., "High Impulse", "Moderate Impulse", "Low Impulse").'
    ),
  actionableSteps: z
    .array(z.string())
    .describe(
      'An array of concrete, actionable steps the user can take to mitigate impulse financial behavior.'
    ),
});
export type GeneratePersonalizedNudgeOutput = z.infer<
  typeof GeneratePersonalizedNudgeOutputSchema
>;

export async function generatePersonalizedNudge(
  input: GeneratePersonalizedNudgeInput
): Promise<GeneratePersonalizedNudgeOutput> {
  return generatePersonalizedNudgeFlow(input);
}

const personalizedNudgePrompt = ai.definePrompt({
  name: 'personalizedNudgePrompt',
  input: { schema: GeneratePersonalizedNudgeInputSchema },
  output: { schema: GeneratePersonalizedNudgeOutputSchema },
  prompt: `You are an AI financial advisor specializing in helping young adults mitigate impulse financial behavior. Your goal is to provide empathetic, actionable, and personalized advice.

Based on the following financial behavior profile and any specific concerns, generate a personalized nudge, categorize the user's impulse risk, and provide 3-5 concrete actionable steps.

Financial Behavior Profile: {{{financialBehaviorProfile}}}
{{#if specificConcern}}Specific Concern: {{{specificConcern}}}{{/if}}

Focus on practical, easy-to-implement suggestions.
`,
});

const generatePersonalizedNudgeFlow = ai.defineFlow(
  {
    name: 'generatePersonalizedNudgeFlow',
    inputSchema: GeneratePersonalizedNudgeInputSchema,
    outputSchema: GeneratePersonalizedNudgeOutputSchema,
  },
  async (input) => {
    const { output } = await personalizedNudgePrompt(input);
    return output!;
  }
);
