import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI("AIzaSyAN_w7VmhY7TGkfJFmDBtw1AxwYH31wNts");
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

export async function translateText(text, targetLanguage) {
  try {
    const prompt = `Translate the following text into (send only the translated text without quotations on both sides) ${targetLanguage}: "${text}"`;

    const result = await model.generateContent(prompt);

    // Access the correct translation response structure
    const translatedText = result.response.candidates[0].content.parts[0].text;

    return translatedText || "No translation available.";
  } catch (error) {
    console.error("Error translating text:", error);
    return "Translation failed.";
  }
}
