# VIRIDIAN AI | Satellite-Powered Predictive Sustainability

[VIRIDIAN Intelligence Dashboard]
<img width="1919" height="1078" alt="image" src="https://github.com/user-attachments/assets/399f3bda-caac-4728-9c7b-bd512c63ca48" />

VIRIDIAN AI is a cutting-edge, satellite-driven predictive intelligence platform designed to forecast sustainability crises 7–14 days before they occur. By leveraging multi-temporal satellite data (Sentinel-2, Landsat) and high-performance AI models, VIRIDIAN empowers campus administrators and farmers to transition from reactive to proactive resource management.

## 📡 Core Modules & Intelligence

### 1. SatPredict Engine (Predictive Time-Lapse)
Uses **Google Veo 2.0** via Genkit to generate 14-day predictive time-lapse simulations of vegetation health (NDVI) and thermal stress (LST). 
- **Inference**: Sub-2s analysis of Sentinel-2 tile stacks.
- **Goal**: Visualize future drought or stress patterns before they are visible to the naked eye.
![Satellite Analysis]<img width="1580" height="1027" alt="image" src="https://github.com/user-attachments/assets/c84f344e-ac34-4942-a6c3-55ea4cc1b501" />


### 2. CampusGuard AI (Anomaly Detection)
A predictive monitoring system for energy and water consumption.
- **Models**: Uses Isolation Forests and LSTM models (accelerated via AMD ROCm) to detect consumption spikes.
- **Nudges**: Automatically generates personalized WhatsApp "AI Nudges" via Gemini 2.5 Flash to encourage wardens and students to take preventive action.

### 3. SatFarm Advisor (Voice Intelligence)
Bridges the gap between complex satellite telemetry and actionable field management.
- **Audio**: Generates hyperlocal agricultural advisories in natural voice formats using **Gemini 2.5 TTS (Algenib profile)**.
- **Multilingual**: Supports local languages to ensure accessibility for rural farmers.

### 4. BioLoop Nexus (Circular Economy)
A circular resource routing engine that tracks organic waste maturity.
- **Routing**: Maps nutrient-deficient fields identified by NDVI analysis to the nearest mature composting pits.
- **Optimization**: Suggests optimal delivery paths to minimize carbon footprint during resource distribution.
![BioLoop Facility]<img width="1606" height="841" alt="image" src="https://github.com/user-attachments/assets/8ec6854d-323c-483d-a9a2-0ccb9e663bdf" />


### 5. ClimateScope AI (Policy Engine)
Transforms raw environmental data into actionable mandates.
- **Heat Mapping**: Maps campus heat islands using Land Surface Temperature (LST) data.
- **Policy Gen**: Uses Genkit prompts to draft data-driven sustainability policies (e.g., "Cool Roof" mandates for specific high-stress buildings).

## 🛠 Technical Architecture

- **Framework**: Next.js 15 (App Router)
- **AI Orchestration**: Google Genkit v1.x
- **Models**: 
  - `Gemini 2.5 Flash`: Text generation, policy drafting, and chat.
  - `Gemini 2.5 Flash Image`: Heatmap overlay generation.
  - `Veo 2.0`: Temporal environmental simulations.
  - `Gemini 2.5 TTS`: Multilingual voice advisory synthesis.
- **Edge Performance**: Optimized for **AMD ROCm** HIP 5.7 kernels to ensure low-latency satellite tile processing.
- **UI/UX**: ShadCN UI + Tailwind CSS with a custom "Viridian & Lime" theme.

## 📂 Project Structure

- `src/app/dashboard`: Modular dashboard views (SatPredict, CampusGuard, etc.).
- `src/ai/flows`: Genkit AI logic for all predictive and generative features.
- `src/firebase`: Firebase client configuration and hooks (ready for Firestore integration).
- `src/components/dashboard`: Shared high-fidelity UI components like `StatCard` and tactical HUDs.

---
*Developed for the Sustainable AI Track | Empowering proactive climate resilience through predictive telemetry.*
