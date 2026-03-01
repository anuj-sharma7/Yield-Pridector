'use server';
/**
 * @fileOverview This file implements a Genkit flow to generate personalized WhatsApp messages
 * for energy and water consumption spike predictions, targeting hostel wardens or students.
 *
 * - generatePersonalizedEnergyNudge - A function that handles the message generation process.
 * - PersonalizedNudgeInput - The input type for the generatePersonalizedEnergyNudge function.
 * - PersonalizedNudgeOutput - The return type for the generatePersonalizedEnergyNudge function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

// Define the input schema for the personalized nudge
const PersonalizedNudgeInputSchema = z.object({
  nudgeType: z.enum(['energy', 'water']).describe('The type of consumption spike predicted (energy or water).'),
  location: z.string().describe('The specific location where the spike is predicted, e.g., Hostel B - Lab AC.'),
  estimatedWaste: z.string().describe('A descriptive string of the estimated waste, e.g., ₹2,400 wasted or 150 liters wasted.'),
  timeframe: z.string().describe('The timeframe for the predicted spike, e.g., overnight, next 24 hours.'),
  actionSuggestion: z.string().describe('A concise suggestion for action, e.g., Switch off by 10pm, Check for leaky taps.'),
  targetUser: z.enum(['warden', 'student']).describe('The recipient of the message (warden or student).'),
  language: z.string().describe('The desired language for the message (e.g., English, Hindi, Marathi).'),
  currentConsumption: z.string().optional().describe('Optional: Current consumption data for additional context.'),
  predictedConsumption: z.string().optional().describe('Optional: Predicted consumption data for additional context.')
});
export type PersonalizedNudgeInput = z.infer<typeof PersonalizedNudgeInputSchema>;

// Define the output schema for the personalized nudge
const PersonalizedNudgeOutputSchema = z.object({
  message: z.string().describe('The generated personalized WhatsApp message.')
});
export type PersonalizedNudgeOutput = z.infer<typeof PersonalizedNudgeOutputSchema>;

export async function generatePersonalizedEnergyNudge(input: PersonalizedNudgeInput): Promise<PersonalizedNudgeOutput> {
  return generatePersonalizedEnergyNudgeFlow(input);
}

const personalizedNudgePrompt = ai.definePrompt({
  name: 'personalizedNudgePrompt',
  input: { schema: PersonalizedNudgeInputSchema },
  output: { schema: PersonalizedNudgeOutputSchema },
  prompt: `You are VIRIDIAN AI, a helpful and concise sustainability assistant.\nYour goal is to generate a personalized and actionable WhatsApp message in {{language}} to a {{targetUser}} about a predicted {{nudgeType}} consumption spike.\n\nHere are the details for the message:\n- The spike is predicted at: {{{location}}}\n- Estimated waste: {{{estimatedWaste}}}\n- Expected timeframe: {{{timeframe}}}\n- Suggested action to prevent waste: {{{actionSuggestion}}}\n\n{{#if currentConsumption}}\nCurrent Consumption: {{{currentConsumption}}}\n{{/if}}\n{{#if predictedConsumption}}\nPredicted Consumption: {{{predictedConsumption}}}\n{{/if}}\n\nPlease craft a polite, urgent, and actionable message. Keep it under 160 characters if possible.\nExample for warden: "Hostel B - Lab AC left on overnight detected. Expected ₹2,400 wasted. Switch off by 10pm — save it!"\nExample for student: "Hey! Heads up for Hostel B! Predicted water spike next 24 hrs. Estimated 150L wasted. Check for leaky taps & save water!"\n\nGenerate only the WhatsApp message.`
});

const generatePersonalizedEnergyNudgeFlow = ai.defineFlow(
  {
    name: 'generatePersonalizedEnergyNudgeFlow',
    inputSchema: PersonalizedNudgeInputSchema,
    outputSchema: PersonalizedNudgeOutputSchema,
  },
  async (input) => {
    const { output } = await personalizedNudgePrompt(input);
    return output!;
  }
);
