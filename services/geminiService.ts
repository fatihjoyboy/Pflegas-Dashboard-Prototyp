import { GoogleGenAI } from "@google/genai";
import { GeminiModel } from "../types";

const ai = new GoogleGenAI({ apiKey: AIzaSyDImiv-2FBWbMttBlGLzRbEwqR90KRCJKk });

export const sendChatMessage = async (
  message: string,
  history: { role: string; parts: { text: string }[] }[] = []
): Promise<string> => {
  try {
    const chat = ai.chats.create({
      model: GeminiModel.CHAT,
      history: history,
    });
    
    const result = await chat.sendMessage({ message });
    return result.text || "No response received.";
  } catch (error) {
    console.error("Chat Error:", error);
    throw error;
  }
};

export const analyzeImage = async (
  base64Image: string,
  prompt: string,
  mimeType: string = "image/jpeg"
): Promise<string> => {
  try {
    const response = await ai.models.generateContent({
      model: GeminiModel.IMAGE,
      contents: {
        parts: [
          {
            inlineData: {
              mimeType: mimeType,
              data: base64Image,
            },
          },
          {
            text: prompt || "Analyze this image.",
          },
        ],
      },
    });

    return response.text || "No analysis generated.";
  } catch (error) {
    console.error("Image Analysis Error:", error);
    throw error;
  }
};