'use server';

/**
 * @fileOverview This file defines a Genkit flow for suggesting the next best learning resources or topics based on completed milestones and the roadmap.
 *
 * - suggestNextSteps - A function that suggests the next steps in a learning roadmap.
 * - SuggestNextStepsInput - The input type for the suggestNextSteps function.
 * - SuggestNextStepsOutput - The return type for the suggestNextSteps function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SuggestNextStepsInputSchema = z.object({
  completedMilestones: z
    .array(z.string())
    .describe('An array of names of completed milestones.'),
  roadmap: z.string().describe('The learning roadmap as a string.'),
});
export type SuggestNextStepsInput = z.infer<typeof SuggestNextStepsInputSchema>;

const SuggestNextStepsOutputSchema = z.object({
  nextSteps: z
    .array(z.string())
    .describe('An array of suggested next learning resources or topics.'),
  reasoning: z.string().describe('The reasoning behind the suggestions.'),
});
export type SuggestNextStepsOutput = z.infer<typeof SuggestNextStepsOutputSchema>;

export async function suggestNextSteps(
  input: SuggestNextStepsInput
): Promise<SuggestNextStepsOutput> {
  return suggestNextStepsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'suggestNextStepsPrompt',
  input: {schema: SuggestNextStepsInputSchema},
  output: {schema: SuggestNextStepsOutputSchema},
  prompt: `You are an AI learning assistant. Analyze the completed milestones and the learning roadmap to suggest the next best learning resources or topics.

Completed Milestones:
{{#each completedMilestones}}- {{{this}}}\n{{/each}}

Roadmap:
{{{roadmap}}}

Based on the above information, suggest the next best learning resources or topics. Explain your reasoning.

Output the nextSteps as a list of strings, and include your reasoning in the reasoning field.
`,
});

const suggestNextStepsFlow = ai.defineFlow(
  {
    name: 'suggestNextStepsFlow',
    inputSchema: SuggestNextStepsInputSchema,
    outputSchema: SuggestNextStepsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
