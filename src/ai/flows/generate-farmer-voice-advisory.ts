'use server';
/**
 * @fileOverview A Genkit flow for generating AI-powered voice advisories for farmers.
 *
 * - generateFarmerVoiceAdvisory - A function that handles the generation of voice advisories.
 * - FarmerVoiceAdvisoryInput - The input type for the generateFarmerVoiceAdvisory function.
 * - FarmerVoiceAdvisoryOutput - The return type for the generateFarmerVoiceAdvisory function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';
import {Buffer} from 'node:buffer';
import * as wav from 'wav';
import {googleAI} from '@genkit-ai/google-genai';

const FarmerVoiceAdvisoryInputSchema = z.object({
  gpsCoordinates: z.string().describe("GPS coordinates of the farmer's field (e.g., '20.5937, 78.9629')."),
  cropType: z.string().describe("The type of crop being grown in the field (e.g., 'Wheat', 'Rice', 'Cotton')."),
  language: z.string().describe("The local language for the voice advisory (e.g., 'Hindi', 'Marathi', 'Telugu')."),
  irrigationRecommendation: z
    .string()
    .describe('The specific irrigation recommendation for the field (e.g., \'Irrigate with 6mm water in 2 days\').'),
  pestAlert: z
    .string()
    .describe(
      'Any current pest outbreak alert for the field (e.g., \'High probability of aphid outbreak within 7 days. Consider organic neem spray.\').'
    ),
});
export type FarmerVoiceAdvisoryInput = z.infer<typeof FarmerVoiceAdvisoryInputSchema>;

const FarmerVoiceAdvisoryOutputSchema = z.object({
  audioDataUri: z.string().describe('The AI-generated voice advisory as an audio data URI (data:audio/wav;base64,...).'),
});
export type FarmerVoiceAdvisoryOutput = z.infer<typeof FarmerVoiceAdvisoryOutputSchema>;

async function toWav(
  pcmData: Buffer,
  channels = 1,
  rate = 24000,
  sampleWidth = 2
): Promise<string> {
  return new Promise((resolve, reject) => {
    const writer = new wav.Writer({
      channels,
      sampleRate: rate,
      bitDepth: sampleWidth * 8,
    });

    const bufs: any[] = [];
    writer.on('error', reject);
    writer.on('data', function (d) {
      bufs.push(d);
    });
    writer.on('end', function () {
      resolve(Buffer.concat(bufs).toString('base64'));
    });

    writer.write(pcmData);
    writer.end();
  });
}

const farmerVoiceAdvisoryTextPrompt = ai.definePrompt({
  name: 'farmerVoiceAdvisoryTextPrompt',
  input: {schema: FarmerVoiceAdvisoryInputSchema},
  output: {schema: z.object({advisoryText: z.string().describe('The generated crop advisory text in the specified language.')})},
  prompt: `You are a helpful agricultural assistant providing voice advisories to farmers.\nGenerate a clear, concise, and actionable voice message text in {{language}} for the farmer.\nThe message should be friendly and include the following information about their {{cropType}} field at GPS coordinates {{gpsCoordinates}}:\n\nIrrigation Recommendation: {{{irrigationRecommendation}}}\nPest Alert: {{{pestAlert}}}\n\nStart with a friendly greeting and end with a helpful closing encouraging action. Ensure the language is natural for a voice message.`,
});

export async function generateFarmerVoiceAdvisory(
  input: FarmerVoiceAdvisoryInput
): Promise<FarmerVoiceAdvisoryOutput> {
  return farmerVoiceAdvisoryFlow(input);
}

const farmerVoiceAdvisoryFlow = ai.defineFlow(
  {
    name: 'farmerVoiceAdvisoryFlow',
    inputSchema: FarmerVoiceAdvisoryInputSchema,
    outputSchema: FarmerVoiceAdvisoryOutputSchema,
  },
  async (input) => {
    const {output: textOutput} = await farmerVoiceAdvisoryTextPrompt(input);
    const advisoryText = textOutput!.advisoryText;

    const {media} = await ai.generate({
      model: googleAI.model('gemini-2.5-flash-preview-tts'),
      prompt: advisoryText,
      config: {
        responseModalities: ['AUDIO'],
        speechConfig: {
          voiceConfig: {
            prebuiltVoiceConfig: {voiceName: 'Algenib'},
          },
        },
      },
    });

    if (!media) {
      throw new Error('No audio media returned from TTS generation.');
    }

    const audioBuffer = Buffer.from(media.url.substring(media.url.indexOf(',') + 1), 'base64');

    const wavBase64 = await toWav(audioBuffer);

    return {
      audioDataUri: 'data:audio/wav;base64,' + wavBase64,
    };
  }
);
