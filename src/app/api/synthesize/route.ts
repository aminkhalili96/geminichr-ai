import { GoogleGenAI } from "@google/genai";
import { NextResponse } from "next/server";

// We use the new official SDK
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

// The strict JSON schema for the CHR
const responseSchema = {
    type: "object",
    properties: {
        patientDemographics: {
            type: "object",
            properties: {
                name: { type: "string" },
                age: { type: "number" },
                gender: { type: "string" },
            },
        },
        vitals: {
            type: "object",
            properties: {
                bloodPressure: { type: "string", description: "Format: Systolic/Diastolic" },
                heartRate: { type: "number" },
                temperature: { type: "number", description: "In Celsius" },
            },
        },
        historyOfPresentIllness: {
            type: "string",
            description: "A professional, medical summary translated from the original Manglish/Malay notes.",
        },
        alerts: {
            type: "array",
            items: {
                type: "string",
            },
            description: "Any critical out-of-range lab values, extreme vitals, or dangerous symptoms.",
        },
        differentialDiagnosis: {
            type: "array",
            items: {
                type: "string",
            },
            description: "Top 3 potential diagnoses based on the provided history.",
        },
        recommendedNextSteps: {
            type: "array",
            items: {
                type: "string",
            },
            description: "Recommended lab tests, imaging, or specialist referrals.",
        },
    },
    required: ["patientDemographics", "vitals", "historyOfPresentIllness", "differentialDiagnosis", "recommendedNextSteps"],
};

export async function POST(req: Request) {
    try {
        const formData = await req.formData();
        const file = formData.get("file") as File;
        const history = formData.get("history") as string; // Stringified JSON of past visits

        if (!file) {
            return NextResponse.json({ error: "No document provided" }, { status: 400 });
        }

        // Convert the File out of FormData into a buffer/base64 for the API
        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);
        const mimeType = file.type;

        // We are using the latest reliable API model string to prevent 404s during the demo
        const model = "gemini-2.5-pro";

        const prompt = `
      You are an expert Malaysian clinician and medical data extractor. 
      You have been provided with an image/document of a patient visit (often written in Manglish or Bahasa Malaysia) and a JSON array of their past medical history.
      
      Your task:
      1. Extract the current patient data accurately from the image.
      2. Translate any colloquial Manglish or Malay into professional English medical terminology for the History of Present Illness.
      3. Analyze the new data IN CONTEXT of their past history (provided below).
      4. Synthesize this into a structured Clinical Health Report (CHR) adhering strictly to the JSON schema.
      
      Patient's Past History (JSON):
      ${history || "[]"}
    `;

        const response = await ai.models.generateContent({
            model: model,
            contents: [
                prompt,
                {
                    inlineData: {
                        data: buffer.toString("base64"),
                        mimeType: mimeType,
                    },
                },
            ],
            config: {
                responseMimeType: "application/json",
                responseSchema: responseSchema,
                temperature: 0.1, // Keep it clinical and deterministic
            },
        });

        if (!response.text) {
            throw new Error("Gemini returned an empty response.");
        }

        const chrData = JSON.parse(response.text);

        return NextResponse.json({ success: true, data: chrData });
    } catch (error: any) {
        console.error("Gemini Extraction Error:", error);
        return NextResponse.json({ error: error.message || "Failed to process document" }, { status: 500 });
    }
}
