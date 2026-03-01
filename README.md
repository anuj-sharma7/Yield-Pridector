# VIRIDIAN AI | Satellite-Powered Predictive Sustainability

VIRIDIAN AI is a cutting-edge, satellite-driven predictive intelligence platform designed to forecast sustainability crises 7–14 days before they occur. By leveraging multi-temporal satellite data and high-performance AI models, VIRIDIAN empowers campus administrators and farmers to transition from reactive to proactive resource management.

## 🚀 Key Features

- **SatPredict Engine**: Uses Google **Veo 2.0** to generate 14-day predictive time-lapse simulations of vegetation health (NDVI) and thermal stress (LST).
- **CampusGuard AI**: A predictive anomaly detection system for energy and water consumption, sending automated "AI Nudges" to wardens via WhatsApp.
- **SatFarm Advisor**: Generates hyperlocal agricultural advisories in natural voice formats using **Gemini 2.5 TTS**, helping farmers optimize irrigation and pest control.
- **BioLoop Nexus**: A circular economy engine that tracks organic waste maturity and suggests optimal routing paths from composting pits to nutrient-deficient fields.
- **ClimateScope**: Hyper-local climate intelligence that transforms raw environmental data into actionable, data-driven policy recommendations.
- **AI Pitch Studio**: A specialized tool for generating professional demo scripts and recording guides to communicate sustainability impact to stakeholders.

## 🛠 Tech Stack

- **Framework**: [Next.js 15](https://nextjs.org/) (App Router)
- **AI Engine**: [Genkit](https://firebase.google.com/docs/genkit) with Google Generative AI (Gemini 2.5 Flash, Veo 2.0, Imagen 4.0)
- **UI/UX**: [ShadCN UI](https://ui.shadcn.com/), [Tailwind CSS](https://tailwindcss.com/), and [Lucide Icons](https://lucide.dev/)
- **Acceleration**: Optimized for **AMD ROCm** accelerated inference at the edge.
- **Charts**: [Recharts](https://recharts.org/) for predictive data visualization.

## 📂 Project Structure

- `src/app/dashboard`: Main application modules.
- `src/ai/flows`: Genkit AI logic for simulations, voice generation, and policy drafts.
- `src/components/ui`: Reusable UI components powered by ShadCN.
- `src/app/globals.css`: Custom Viridian Green / Lime color theme.

## 🚦 Getting Started

1. **Dashboard Access**: Navigate to `/dashboard` to view the unified satellite intelligence layer.
2. **Predictive Simulation**: Go to **SatPredict** and click "Generate Future Timelapse" to see the Veo 2.0 engine in action.
3. **Voice Advisory**: Visit **SatFarm Advisor** to synthesize a custom voice memo for field management.
4. **AI Chat**: Use the **Campus AI Assistant** to ask natural language questions about your sustainability data.

---

*This project was developed as a high-fidelity prototype for the Sustainable AI Track, focusing on zero-cost satellite data utilization for global scalability.*