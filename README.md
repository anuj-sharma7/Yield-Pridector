# VIRIDIAN AI | Satellite-Powered Predictive Sustainability

![Main Dashboard](https://picsum.photos/seed/india-tactical-map/1200/800)

VIRIDIAN AI is a cutting-edge, satellite-driven predictive intelligence platform designed to forecast sustainability crises 7–14 days before they occur. By leveraging multi-temporal satellite data and high-performance AI models, VIRIDIAN empowers campus administrators and farmers to transition from reactive to proactive resource management.

## 🚀 Key Modules

### 📡 SatPredict Engine
Uses Google **Veo 2.0** to generate 14-day predictive time-lapse simulations of vegetation health (NDVI) and thermal stress (LST). It leverages AMD ROCm accelerated inference for sub-2s analysis of Sentinel-2 tile stacks.
![Satellite Analysis](https://picsum.photos/seed/viridian-infrared/800/600)

### 🛡️ CampusGuard AI
A predictive anomaly detection system for energy and water consumption. It uses Isolation Forests and LSTM models to detect spikes before they happen, sending automated "AI Nudges" to wardens and students via WhatsApp.
![Inference Monitoring](https://picsum.photos/seed/viridian-4/600/400)

### 🚜 SatFarm Advisor
Generates hyperlocal agricultural advisories in natural voice formats using **Gemini 2.5 TTS**. It bridges the gap between complex satellite telemetry and actionable field management for rural farmers in multiple local languages.

### ♻️ BioLoop Nexus
A circular economy engine that tracks organic waste maturity and suggests optimal routing paths from composting pits to nutrient-deficient fields identified by real-time NDVI analysis.
![BioLoop Facility](https://picsum.photos/seed/viridian-3/600/400)

### 🌡️ ClimateScope AI
Hyper-local climate intelligence that transforms raw environmental data into actionable, data-driven policy recommendations. It maps heat islands and generates sustainability mandates automatically.

## 🛠 Technical Architecture

- **Framework**: Next.js 15 (App Router)
- **AI Core**: Google Genkit v1.x with Gemini 2.5 Flash
- **Computer Vision**: Veo 2.0 for temporal simulations & Gemini 2.5 Flash Image for heatmap generation.
- **Audio Intelligence**: Gemini 2.5 TTS (Algenib profile) for multilingual voice advisories.
- **Inference Acceleration**: Optimized for **AMD ROCm** HIP 5.7 kernels at the edge for low-latency processing.
- **UI/UX**: ShadCN UI + Tailwind CSS with a custom "Viridian & Lime" theme for high-contrast visibility.
- **Data Layer**: Powered by public-domain satellite data from ESA (Sentinel-2) and NASA (Landsat).

## 📂 Project Structure

- `src/app/dashboard`: Main application modules and interactive GIS layers.
- `src/ai/flows`: Genkit AI logic for simulations, voice generation, and policy drafts.
- `src/components/ui`: Reusable UI components powered by ShadCN.
- `src/app/globals.css`: Custom CSS theme utilizing HSL variables for the Viridian palette.

---
*Developed for the Sustainable AI Track | SIH Award-Winning Predictive Pipeline*