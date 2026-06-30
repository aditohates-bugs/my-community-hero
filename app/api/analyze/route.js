import { NextResponse } from 'next/server';
import { GoogleGenAI } from '@google/genai';

export async function POST(request) {
    try {
        const data = await request.formData();
        const file = data.get('image');

        if (!file) {
            return NextResponse.json({ error: 'No image uploaded' }, { status: 400 });
        }

        // Convert file to buffer for Gemini
        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);

        const ai = new GoogleGenAI({ apiKey: process.env.NEXT_PUBLIC_GEMINI_API_KEY });

        const prompt = `
      Analyze this community issue image. Provide a JSON response with the following keys:
      - category: One of ["Pothole", "Water Leakage", "Damaged Streetlight", "Waste Management", "Public Infrastructure"]
      - severity: One of ["Low", "Medium", "High"]
      - description: A brief 1-sentence summary of what is wrong.
      - autonomousAction: A 1-sentence recommendation for the local municipality's dispatch team.
      
      Respond ONLY with valid JSON. Do not include markdown formatting or backticks.
    `;

        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: [
                prompt,
                {
                    inlineData: {
                        data: buffer.toString('base64'),
                        mimeType: file.type,
                    },
                },
            ],
        });

        const responseText = response.text.trim();
        // Clean up potential markdown formatting if the model returns it
        const cleanJson = responseText.replace(/^```json\s*|```$/g, '');
        const analysis = JSON.parse(cleanJson);

        return NextResponse.json({ success: true, analysis });
    } catch (error) {
        console.error('AI Analysis Error:', error);
        return NextResponse.json({ error: 'Failed to analyze image' }, { status: 500 });
    }
}