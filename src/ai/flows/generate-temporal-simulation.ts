'use server';
/**
 * @fileOverview A Genkit flow for generating predictive environmental time-lapse videos using Veo.
 *
 * - generateTemporalSimulation - Handles the video generation process.
 * - TemporalSimulationInput - Input schema for simulation parameters.
 * - TemporalSimulationOutput - Output schema containing the video data URI.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';
import {googleAI} from '@genkit-ai/google-genai';

const TemporalSimulationInputSchema = z.object({
  prompt: z.string().describe('Description of the environmental change to simulate (e.g., "A lush green field turning yellow due to drought over 2 weeks").'),
  baseImageUri: z.string().optional().describe('Optional base satellite image to start the simulation from.'),
});
export type TemporalSimulationInput = z.infer<typeof TemporalSimulationInputSchema>;

const TemporalSimulationOutputSchema = z.object({
  videoDataUri: z.string().describe('The generated predictive simulation as an MP4 data URI.'),
});
export type TemporalSimulationOutput = z.infer<typeof TemporalSimulationOutputSchema>;

export async function generateTemporalSimulation(input: TemporalSimulationInput): Promise<TemporalSimulationOutput> {
  return generateTemporalSimulationFlow(input);
}

const generateTemporalSimulationFlow = ai.defineFlow(
  {
    name: 'generateTemporalSimulationFlow',
    inputSchema: TemporalSimulationInputSchema,
    outputSchema: TemporalSimulationOutputSchema,
  },
  async (input) => {
    // We use Veo 2.0 for stable image-to-video generation
    let { operation } = await ai.generate({
      model: googleAI.model('veo-2.0-generate-001'),
      prompt: [
        { text: `A realistic satellite-view time-lapse simulation showing: ${input.prompt}. Ensure the transition is smooth and reflects seasonal or environmental changes accurately.` },
        ...(input.baseImageUri ? [{ media: { url: input.baseImageUri, contentType: 'image/jpeg' } }] : []),
      ],
      config: {
        durationSeconds: 5,
        aspectRatio: '16:9',
      },
    });

    if (!operation) {
      throw new Error('Failed to initiate video generation operation.');
    }

    // Wait for the operation to complete (Veo is slow, usually takes 30-60s)
    let checkCount = 0;
    while (!operation.done && checkCount < 24) { // Max 2 minutes
      operation = await ai.checkOperation(operation);
      if (!operation.done) {
        await new Promise((resolve) => setTimeout(resolve, 5000));
        checkCount++;
      }
    }

    if (operation.error) {
      throw new Error('Video generation failed: ' + operation.error.message);
    }

    const videoPart = operation.output?.message?.content.find((p) => !!p.media);
    if (!videoPart || !videoPart.media) {
      throw new Error('Failed to retrieve the generated video content.');
    }

    // Download the video and convert to base64 data URI
    const videoUrl = `${videoPart.media.url}&key=${process.env.GEMINI_API_KEY}`;
    const response = await fetch(videoUrl);
    
    if (!response.ok) {
      throw new Error('Failed to fetch video file from Google servers.');
    }

    const arrayBuffer = await response.arrayBuffer();
    const base64 = Buffer.from(arrayBuffer).toString('base64');

    return {
      videoDataUri: `data:video/mp4;base64,${base64}`,
    };
  }
);
