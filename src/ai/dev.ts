import { config } from 'dotenv';
config();

import '@/ai/flows/handle-campus-ai-chat-query.ts';
import '@/ai/flows/generate-campus-policy-recommendation.ts';
import '@/ai/flows/generate-personalized-energy-nudge.ts';
import '@/ai/flows/generate-farmer-voice-advisory.ts';
import '@/ai/flows/generate-predicted-crop-stress-heatmap.ts';
import '@/ai/flows/generate-temporal-simulation.ts';
import '@/ai/flows/generate-pitch-script.ts';
