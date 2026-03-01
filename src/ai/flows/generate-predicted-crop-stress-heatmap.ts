'use server';
/**
 * @fileOverview A Genkit flow for generating a color-coded satellite heatmap showing predicted crop stress.
 *
 * - generatePredictedCropStressHeatmap - A function that handles the heatmap generation process.
 * - GeneratePredictedCropStressHeatmapInput - The input type for the generatePredictedCropStressHeatmap function.
 * - GeneratePredictedCropStressHeatmapOutput - The return type for the generatePredictedCropStressHeatmap function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';
import {googleAI} from '@genkit-ai/google-genai';

const GeneratePredictedCropStressHeatmapInputSchema = z.object({
  baseSatelliteImageUri: z
    .string()
    .describe(
      "A base satellite image of the agricultural field or campus area, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
  predictedStressSummary: z
    .string()
    .describe(
      'A detailed textual summary of the predicted crop stress and potential failure zones for the next 7-14 days, including areas and stress levels (e.g., "The northern half of the field shows high stress probability (red), while the southern half shows low stress (green).").'
    ),
});
export type GeneratePredictedCropStressHeatmapInput = z.infer<
  typeof GeneratePredictedCropStressHeatmapInputSchema
>;

const GeneratePredictedCropStressHeatmapOutputSchema = z.object({
  heatmapImageUri: z
    .string()
    .describe(
      "A color-coded satellite heatmap image showing predicted crop stress, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
});
export type GeneratePredictedCropStressHeatmapOutput = z.infer<
  typeof GeneratePredictedCropStressHeatmapOutputSchema
>;

export async function generatePredictedCropStressHeatmap(
  input: GeneratePredictedCropStressHeatmapInput
): Promise<GeneratePredictedCropStressHeatmapOutput> {
  return generatePredictedCropStressHeatmapFlow(input);
}

// Defines a prompt object that constructs the multimodal input parts for the image generation model.
const constructHeatmapPromptParts = ai.definePrompt({
  name: 'constructHeatmapPromptParts',
  input: {schema: GeneratePredictedCropStressHeatmapInputSchema},
  // The output of this prompt is an array of multimodal parts (text and media),
  // which will be used as the 'prompt' for the ai.generate call.
  prompt: input => [
    {
      media: {
        url: input.baseSatelliteImageUri,
      },
    },
    {
      text: `Given this satellite image, overlay a color-coded heatmap showing predicted crop stress for the next 7-14 days. Use a gradient from vibrant green for very low stress, through yellow and orange for moderate stress, to bright red for high stress. The heatmap should clearly reflect the following detailed stress summary, accurately placing stress zones over the corresponding areas in the image: ${input.predictedStressSummary}. Also provide a brief, one-sentence textual confirmation of the heatmap's main stress points.`,
    },
  ],
});

const generatePredictedCropStressHeatmapFlow = ai.defineFlow(
  {
    name: 'generatePredictedCropStressHeatmapFlow',
    inputSchema: GeneratePredictedCropStressHeatmapInputSchema,
    outputSchema: GeneratePredictedCropStressHeatmapOutputSchema,
  },
  async (input) => {
    // Call the prompt object to get the structured prompt parts for the image model.
    const {output: multimodalPromptParts} = await constructHeatmapPromptParts(input);

    if (!Array.isArray(multimodalPromptParts)) {
      throw new Error('Expected multimodal prompt parts to be an array for image generation.');
    }

    const {media, text} = await ai.generate({
      model: googleAI.model('gemini-2.5-flash-image'), // Using an image-to-image model
      prompt: multimodalPromptParts,
      config: {
        responseModalities: ['TEXT', 'IMAGE'], // MUST provide both TEXT and IMAGE for gemini-2.5-flash-image
      },
    });

    if (!media || !media.url) {
      throw new Error('Failed to generate heatmap image.');
    }

    // Optionally log the text response, though the main goal is the image.
    if (text) {
      console.log('Text response from image generation model:', text);
    }

    return {
      heatmapImageUri: media.url,
    };
  }
);
