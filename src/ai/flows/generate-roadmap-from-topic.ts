'use server';

/**
 * @fileOverview Generates a learning roadmap from a given topic.
 *
 * - generateRoadmapFromTopic - A function that generates a learning roadmap.
 * - GenerateRoadmapInput - The input type for the generateRoadmapFromTopic function.
 * - GenerateRoadmapOutput - The return type for the generateRoadmapFromTopic function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateRoadmapInputSchema = z.object({
  topic: z.string().describe('The topic to generate a learning roadmap for.'),
});
export type GenerateRoadmapInput = z.infer<typeof GenerateRoadmapInputSchema>;

const GenerateRoadmapOutputSchema = z.object({
  roadmap: z.string().describe('The generated learning roadmap, including milestones in Markdown format.'),
});
export type GenerateRoadmapOutput = z.infer<typeof GenerateRoadmapOutputSchema>;

export async function generateRoadmapFromTopic(input: GenerateRoadmapInput): Promise<GenerateRoadmapOutput> {
  return generateRoadmapFromTopicFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateRoadmapPrompt',
  input: {schema: GenerateRoadmapInputSchema},
  output: {schema: GenerateRoadmapOutputSchema},
  prompt: `You are an AI Learning Assistant. Generate a comprehensive learning roadmap for the given topic. 
  
  The roadmap should be a list of milestones. Each milestone should be a heading (e.g., "### Milestone 1: Title").

  Topic: {{{topic}}}
  `,
});


const generateRoadmapFromTopicFlow = ai.defineFlow(
  {
    name: 'generateRoadmapFromTopicFlow',
    inputSchema: GenerateRoadmapInputSchema,
    outputSchema: GenerateRoadmapOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
