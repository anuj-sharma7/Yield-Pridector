'use server';
/**
 * @fileOverview A Genkit flow for generating AI-backed policy recommendations for campus sustainability.
 *
 * - generateCampusPolicyRecommendation - A function that handles the policy recommendation generation process.
 * - GenerateCampusPolicyRecommendationInput - The input type for the generateCampusPolicyRecommendation function.
 * - GenerateCampusPolicyRecommendationOutput - The return type for the generateCampusPolicyRecommendation function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateCampusPolicyRecommendationInputSchema = z.object({
  campusDescription: z.string().describe('A general description of the campus and its environment.'),
  heatIslandData: z.string().optional().describe('A summary of heat island hotspots observed on campus, e.g., "South campus facade shows +3-6°C vs surroundings".'),
  ndviLossDescription: z.string().optional().describe('A description of tree cover reduction or bare soil expansion, e.g., "NDVI loss detected in Sector 4 due to construction".'),
  airQualitySummary: z.string().optional().describe('A summary of current air quality patterns, e.g., "High NO2 concentration near main road".'),
  carbonFootprintSummary: z.string().optional().describe('A summary of the campus\'s carbon footprint (energy + water + waste + transport combined).'),
  wasteManagementSummary: z.string().optional().describe('A summary of current waste management practices and identified issues, e.g., "500kg organic waste landfilled daily".'),
});
export type GenerateCampusPolicyRecommendationInput = z.infer<typeof GenerateCampusPolicyRecommendationInputSchema>;

const GenerateCampusPolicyRecommendationOutputSchema = z.object({
  policyRecommendations: z.string().describe('Detailed, data-driven policy recommendations for campus sustainability initiatives.'),
});
export type GenerateCampusPolicyRecommendationOutput = z.infer<typeof GenerateCampusPolicyRecommendationOutputSchema>;

export async function generateCampusPolicyRecommendation(input: GenerateCampusPolicyRecommendationInput): Promise<GenerateCampusPolicyRecommendationOutput> {
  return generateCampusPolicyRecommendationFlow(input);
}

const prompt = ai.definePrompt({
  name: 'campusPolicyRecommendationPrompt',
  input: {schema: GenerateCampusPolicyRecommendationInputSchema},
  output: {schema: GenerateCampusPolicyRecommendationOutputSchema},
  prompt: `You are an expert in campus sustainability and urban planning. Your task is to generate actionable, data-driven policy recommendations for a college campus based on the provided information. Focus on initiatives that can lead to measurable improvements in energy, water, waste, and climate intelligence.

Campus Description: {{{campusDescription}}}

{{#if heatIslandData}}
Heat Island Data: {{{heatIslandData}}}
{{/if}}

{{#if ndviLossDescription}}
NDVI Loss Tracking: {{{ndviLossDescription}}}
{{/if}}

{{#if airQualitySummary}}
Air Quality Summary: {{{airQualitySummary}}}
{{/if}}}

{{#if carbonFootprintSummary}}
Carbon Footprint Summary: {{{carbonFootprintSummary}}}
{{/if}}

{{#if wasteManagementSummary}}
Waste Management Summary: {{{wasteManagementSummary}}}
{{/if}}

Based on the above data, provide specific policy recommendations. Each recommendation should include:
- A clear action (e.g., "Plant X trees", "Implement Y system").
- The expected benefit (e.g., "estimated Z°C LST reduction", "reduce W kg waste").
- Optionally, a suggested location or area on campus.

Your recommendations should be practical and aim for impactful sustainability initiatives.`,
});

const generateCampusPolicyRecommendationFlow = ai.defineFlow(
  {
    name: 'generateCampusPolicyRecommendationFlow',
    inputSchema: GenerateCampusPolicyRecommendationInputSchema,
    outputSchema: GenerateCampusPolicyRecommendationOutputSchema,
  },
  async (input) => {
    const {output} = await prompt(input);
    if (!output) {
      throw new Error('Failed to generate policy recommendations.');
    }
    return output;
  }
);
