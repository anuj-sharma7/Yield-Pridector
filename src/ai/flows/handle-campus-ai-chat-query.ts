'use server';
/**
 * @fileOverview A Genkit flow for the VIRIDIAN AI Campus AI Chat Assistant.
 * It allows campus administrators to ask natural language queries about sustainability data.
 *
 * - handleCampusAIChatQuery - A function that handles the AI chat query process.
 * - HandleCampusAIChatQueryInput - The input type for the handleCampusAIChatQuery function.
 * - HandleCampusAIChatQueryOutput - The return type for the handleCampusAIChatQuery function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const HandleCampusAIChatQueryInputSchema = z.object({
  query: z.string().describe('The natural language query from the campus administrator.'),
});
export type HandleCampusAIChatQueryInput = z.infer<typeof HandleCampusAIChatQueryInputSchema>;

const HandleCampusAIChatQueryOutputSchema = z.object({
  response: z.string().describe('A summarized sustainability insight or data point based on the query.'),
});
export type HandleCampusAIChatQueryOutput = z.infer<typeof HandleCampusAIChatQueryOutputSchema>;

export async function handleCampusAIChatQuery(input: HandleCampusAIChatQueryInput): Promise<HandleCampusAIChatQueryOutput> {
  return handleCampusAIChatQueryFlow(input);
}

const campusAIChatPrompt = ai.definePrompt({
  name: 'campusAIChatPrompt',
  input: { schema: HandleCampusAIChatQueryInputSchema },
  output: { schema: HandleCampusAIChatQueryOutputSchema },
  prompt: `You are VIRIDIAN AI's Campus Sustainability Assistant. Your role is to provide quick, insightful summaries, data points, and professional scripts related to campus energy, water, waste, and environmental performance.

CORE CAPABILITY: DEMO SCRIPTS
If the user asks for a "demo script", "pitch script", or "video recording text", you must provide a scene-by-scene breakdown covering:
1. SatPredict: Satellite-view time-lapse simulation of environmental stress.
2. CampusGuard: Real-time anomaly detection and WhatsApp nudges.
3. SatFarm: Voice advisories for farmers based on NDVI/LST data.
4. BioLoop: Circular composting and resource routing.
5. ClimateScope: Heat island mapping and policy generation.
6. Edge Runtime: High-speed AMD ROCm accelerated inference.

Format scripts with "Visual:" and "Audio:" cues.

GENERAL QUERIES:
For general data queries, draw from typical VIRIDIAN AI data:
- Energy/Water anomaly scores.
- Satellite-derived vegetation health (NDVI).
- Waste-to-compost routing ETA.
- Green Leaderboard standings.

Answer the following query:
{{{query}}}`,
});

const handleCampusAIChatQueryFlow = ai.defineFlow(
  {
    name: 'handleCampusAIChatQueryFlow',
    inputSchema: HandleCampusAIChatQueryInputSchema,
    outputSchema: HandleCampusAIChatQueryOutputSchema,
  },
  async (input) => {
    const { output } = await campusAIChatPrompt(input);
    return output!;
  }
);
