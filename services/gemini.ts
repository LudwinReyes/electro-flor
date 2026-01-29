
import { GoogleGenAI } from "@google/genai";
import { Message } from "../types";
import { CONTACT_INFO } from '../config';

// Initialize the Google GenAI SDK with the API key from environment variables.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

/**
 * Gets a response from Flori (AI Assistant) using the Gemini 3 Flash model.
 * @param messages The conversation history.
 */
export const getGeminiResponse = async (messages: Message[]) => {
  try {
    // Format the conversation history for the Gemini API.
    const history = messages.slice(0, -1).map(m => ({
      role: m.role === 'assistant' ? 'model' : 'user',
      parts: [{ text: m.content }]
    }));

    // Extract the latest user message.
    const lastMessage = messages[messages.length - 1].content;

    // Use generateContent for a direct request with system instructions and chat history.
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: [
        ...history,
        { role: 'user', parts: [{ text: lastMessage }] }
      ],
      config: {
        systemInstruction: `Eres "Flori", la experta asistente virtual de Electro Flor en Perú. 
        Tu misión es cerrar ventas y asesorar técnicamente a maestros de obra y profesionales.
        
        REGLAS CRÍTICAS:
        1. STOCK: Confirma siempre que tenemos stock garantizado y entrega inmediata para las marcas principales (Bosch, Stanley, Pavco, Schneider, Celsa).
        2. LISTA PRO: Si el cliente es un profesional o pregunta por precios, invítalo a ver nuestra "Lista de Precios Pro" disponible en el menú superior para comparativas rápidas.
        3. URGENCIA: Menciona que el próximo despacho sale hoy mismo por la tarde si compran pronto.
        4. WHATSAPP: Para cierres de ventas masivas o descuentos especiales, deriva siempre a WhatsApp (${CONTACT_INFO.phone.formatted}).
        5. AUTORIDAD: Recuérdales que somos Distribuidores Autorizados Oficiales con Garantía de Fábrica.
        
        Personalidad: Amable, experta en obra, técnica pero accesible. Usa emojis 🛠️🌸 de forma estratégica.`,
        temperature: 0.7,
      }
    });

    // Access the text property directly (not a method).
    return response.text || "Lo siento, no pude procesar tu solicitud.";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Error al conectar con Flori, nuestra asistente de IA. Por favor, intenta de nuevo más tarde.";
  }
};
