
import { GoogleGenAI, Type } from "@google/genai";
import { VitalsData, PredictionResult } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const getClinicalInsight = async (vitals: VitalsData, prediction: PredictionResult) => {
  const model = "gemini-3-pro-preview";
  
  const prompt = `
    Analyze the following patient vitals and Logistic Regression risk assessment:
    - Age: ${vitals.age}
    - Blood Pressure: ${vitals.systolicBP}/${vitals.diastolicBP} mmHg (Systolic/Diastolic)
    - Glucose Level: ${vitals.glucose} mg/dL
    - Prediction: ${prediction.isAtRisk ? 'High Risk' : 'Low Risk'}
    - Probability Score: ${(prediction.probability * 100).toFixed(1)}%

    Provide a professional medical insight covering:
    1. A summary of the findings, specifically noting the blood pressure ratio.
    2. Specific risk factors identified from these vitals.
    3. Practical, evidence-based health recommendations.
    4. A mandatory medical disclaimer.
  `;

  const response = await ai.models.generateContent({
    model,
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          summary: { type: Type.STRING },
          riskFactors: { 
            type: Type.ARRAY,
            items: { type: Type.STRING }
          },
          recommendations: { 
            type: Type.ARRAY,
            items: { type: Type.STRING }
          }
        },
        required: ["summary", "riskFactors", "recommendations"]
      }
    }
  });

  return JSON.parse(response.text);
};
