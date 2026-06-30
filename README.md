# 🦸‍♂️ Community Hero: Hyperlocal Problem Solver

## 🚀 The Vision
Communities face fragmented, unverified, and slow reporting of local issues like potholes, water leaks, and damaged infrastructure. **Community Hero** replaces passive reporting with **Autonomous AI Dispatch Logic**. 

Instead of municipal workers manually sorting through vague citizen complaints, our platform leverages multimodal AI to instantly verify, categorize, and prioritize issues, generating an immediate action plan.

## 🧠 Agentic Depth & Google Integration
This project was built to maximize AI agentic capabilities using **Google's Generative AI Ecosystem**:
* **Google Gemini 1.5 Flash (Multimodal):** Acts as an autonomous dispatcher. When a citizen uploads a photo, the AI does not just describe it; it analyzes the image to determine the specific category, assigns a severity level (Low/Medium/High), and generates a specialized autonomous dispatch action for city workers.
* **Next.js & React:** For a lightning-fast, SSR-capable citizen portal.

## 🛠️ How It Works
1. **Report:** A citizen snaps a photo of a local issue and uploads it via the portal.
2. **Analyze:** The image buffer is securely passed to the Gemini 1.5 Flash API.
3. **Dispatch:** The AI returns a structured JSON payload containing the verified category, severity, and a recommended action plan.
4. **Resolve:** Municipal dashboards receive prioritized, pre-assessed data, cutting response times drastically.

## 💻 Local Setup
\`\`\`bash
npm install
# Add your Gemini API key to .env.local as NEXT_PUBLIC_GEMINI_API_KEY
npm run dev
\`\`\`
