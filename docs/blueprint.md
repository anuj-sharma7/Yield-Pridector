# **App Name**: VIRIDIAN AI

## Core Features:

- Predictive Crop Stress Forecasting: Utilizes multi-temporal satellite imagery and AI (LSTM neural networks) to forecast crop failure zones and agricultural stress 7-14 days before visible impact. It generates color-coded stress probability heatmaps.
- Campus Energy & Water Anomaly Prediction: Leverages AI-powered anomaly detection and time-series regression to predict campus energy and water consumption spikes 24 hours in advance. It includes an LLM Nudge Engine tool (Claude API) for generating personalized alerts and a 'Green Leaderboard' for gamification.
- Hyperlocal Precision Agriculture Advisory: Delivers hyperlocal, satellite-driven crop management advice to farmers for irrigation needs, yield estimation (using an SIH-validated ML model), and pest probability, via a mobile app and AI-generated voice advisories in local languages.
- Circular Resource Management (BioLoop Nexus): Uses AI to track campus organic waste composting and applies graph-based routing optimization to match compost output with nutrient-deficient farm fields. Satellite imagery verifies soil health improvements, closing the resource loop.
- Campus Climate Intelligence: Maps campus heat islands, tracks air quality patterns using satellite data (Sentinel-5P), and assesses carbon footprints. It provides AI-backed policy recommendations for climate action to campus administrators.
- Unified Data Storage and Access: Provides secure and efficient storage for all application data, including satellite geometries, farm field polygons, and campus zones, utilizing PostgreSQL with PostGIS for spatial capabilities.

## Style Guidelines:

- Primary Color: A deep, sophisticated viridian green (#1F7A4F), reflecting intelligence, growth, and connection to nature. This hue provides strong contrast and legibility for text against light backgrounds.
- Background Color: An ultra-light, subtle green tint (#EFF6F3) for main surfaces, ensuring a clean, modern aesthetic that supports extensive data display while harmonizing with the primary hue.
- Accent Color: A vibrant, energetic lime green (#5FE630), strategically used for calls to action, interactive elements, and highlighting key data points. It offers a dynamic visual pop and clear contrast.
- Headline Font: 'Space Grotesk' (sans-serif), chosen for its modern, techy, and scientific feel, ideal for prominent titles, dashboard headings, and key statistics.
- Body Font: 'Inter' (sans-serif), selected for its neutrality, objectivity, and excellent legibility across diverse screen sizes and data densities, perfect for all body text, data tables, and detailed advisories.
- Clean, contemporary line icons with a subtle technical or scientific aesthetic. Icons should consistently convey geospatial, environmental, and data-driven concepts, favoring outlined glyphs for clarity.
- Modular and data-rich dashboard layouts designed for clear hierarchy and quick scanning by administrators. Responsive design is paramount for the farmer-facing mobile app, ensuring critical information is easily accessible on smaller screens.
- Subtle and purposeful micro-animations to enhance user experience, such as smooth transitions for map overlays, dynamic chart updates, and visual feedback upon user interactions. Animations will prioritize clarity and reduce perceived loading times.