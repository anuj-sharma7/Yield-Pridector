'use server';
/**
 * @fileOverview A Genkit flow for generating a professional demo script for VIRIDIAN AI.
 * This flow synthesizes all platform features into a cohesive narrative for video recordings.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GeneratePitchScriptInputSchema = z.object({
  targetAudience: z.enum(['investors', 'campus-admins', 'farmers', 'general']).describe('The primary audience for the video.'),
  videoDuration: z.enum(['60s', '3min', '5min']).describe('The desired length of the video script.'),
  tone: z.enum(['professional', 'inspiring', 'technical', 'urgent']).describe('The tone of the pitch.'),
});
export type GeneratePitchScriptInput = z.infer<typeof GeneratePitchScriptInputSchema>;

const GeneratePitchScriptOutputSchema = z.object({
  title: z.string().describe('The title of the pitch/demo.'),
  script: z.array(z.object({
    scene: z.string().describe('Scene description/Visual cue.'),
    audio: z.string().describe('Spoken script/Voiceover text.'),
    featureHighlight: z.string().describe('The specific platform feature being demonstrated.'),
  })).describe('A scene-by-scene script breakdown.'),
  closingCallToAction: z.string().describe('A strong final statement for the video.'),
});
export type GeneratePitchScriptOutput = z.infer<typeof GeneratePitchScriptOutputSchema>;

export async function generatePitchScript(input: GeneratePitchScriptInput): Promise<GeneratePitchScriptOutput> {
  return generatePitchScriptFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generatePitchScriptPrompt',
  input: {schema: GeneratePitchScriptInputSchema},
  output: {schema: GeneratePitchScriptOutputSchema},
  prompt: `You are a world-class technology evangelist. Your task is to write a compelling video demo script for "VIRIDIAN AI", a satellite-powered predictive sustainability platform.

The script must cover these core features:
1. SatPredict Engine: Multi-temporal crop stress forecasting (7-14 days window) using Veo 2.0 simulations.
2. CampusGuard AI: Predictive energy/water anomaly detection and WhatsApp "Nudges".
3. SatFarm Advisor: Hyperlocal satellite-driven voice advisories for farmers.
4. BioLoop Nexus: Graph-based circular composting and resource routing.
5. ClimateScope: Campus heat-island mapping and AI policy generation.
6. Green Leaderboard: Gamified sustainability rankings.

Audience: {{targetAudience}}
Duration Goal: {{videoDuration}}
Tone: {{tone}}

Format the output as a scene-by-scene breakdown with Visual cues (Scene) and Audio scripts (Audio). Ensure the flow is logical, starting from the problem of climate/resource crisis to the VIRIDIAN AI predictive solution.`,
});

const generatePitchScriptFlow = ai.defineFlow(
  {
    name: 'generatePitchScriptFlow',
    inputSchema: GeneratePitchScriptInputSchema,
    outputSchema: GeneratePitchScriptOutputSchema,
  },
  async (input) => {
    const {output} = await prompt(input);
    if (!output) {
      throw new Error('Failed to generate pitch script.');
    }
    return output;
  }
);
