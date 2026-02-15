
import { GoogleGenAI, Type, LiveServerMessage, Modality, Blob } from "@google/genai";
import { SeoIssue, Keyword, SocialPlatform } from "../types";

const apiKey = process.env.API_KEY || '';
const ai = new GoogleGenAI({ apiKey });

// --- Text Generation Service ---

export const generateProfileSuggestions = async (
  category: string, 
  businessName: string, 
  businessType: string,
  count: number = 3
): Promise<SeoIssue[]> => {
  try {
    const prompt = `Generate ${count} realistic Business Profile optimization opportunities for a ${businessType} business called "${businessName}". 
    The category is: "${category}".
    For each issue:
    1. 'url' should be the section of the Google Business Profile (e.g., /info, /reviews, /services).
    2. 'currentTitle' should be the current weak or missing content (e.g., "Missing description" or "Generic service list").
    3. 'suggestedFix' should be a high-quality, professional, and optimized suggestion.
    
    Return JSON.`;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              id: { type: Type.STRING },
              url: { type: Type.STRING },
              currentTitle: { type: Type.STRING },
              suggestedFix: { type: Type.STRING },
              status: { type: Type.STRING, enum: ["Not Deployed"] },
              category: { type: Type.STRING }
            },
            required: ["id", "url", "currentTitle", "suggestedFix", "status"]
          }
        }
      }
    });

    const text = response.text;
    if (!text) return [];
    
    // Inject the category back in since the model might infer it loosely
    const data = JSON.parse(text) as SeoIssue[];
    return data.map(d => ({...d, category}));

  } catch (error) {
    console.error("Gemini Generation Error:", error);
    return [];
  }
};

export const generateReviewReply = async (
  reviewText: string, 
  rating: number, 
  author: string, 
  businessName: string
): Promise<string> => {
  try {
    const prompt = `Write a polite, professional, and empathetic response to this Google Business Profile review for "${businessName}".
    Reviewer: ${author}
    Rating: ${rating} stars
    Review: "${reviewText}"
    
    Keep it concise (under 50 words) and helpful.`;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
    });
    return response.text || "Thank you for your feedback.";
  } catch (error) {
    return "Thank you for your review. We appreciate your feedback.";
  }
};

export const generateMarketingPost = async (topic: string, businessName: string, platform: SocialPlatform = 'Google'): Promise<string> => {
  try {
    let platformGuide = "";
    switch(platform) {
      case 'Instagram':
        platformGuide = "Focus on visual language, use emojis, and include 10-15 relevant hashtags. Casual and engaging tone.";
        break;
      case 'LinkedIn':
        platformGuide = "Professional, industry-focused tone. Focus on value and expertise. 3-4 professional hashtags.";
        break;
      case 'Twitter':
        platformGuide = "Short, punchy, and under 280 characters. Use 2-3 trending hashtags.";
        break;
      case 'Facebook':
        platformGuide = "Community-focused, engaging, encourage comments/shares. 2-3 hashtags.";
        break;
      case 'Google':
      default:
        platformGuide = "Professional Business Profile update. informative, local SEO optimized, max 80 words. 2-3 hashtags.";
        break;
    }

    const prompt = `Write a ${platform} post for "${businessName}" about: ${topic}. 
    Style Guide: ${platformGuide}`;
    
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
    });
    return response.text || "";
  } catch (error) {
    return "";
  }
};

export const discoverKeywords = async (businessType: string, location: string): Promise<Keyword[]> => {
  try {
    const prompt = `Generate 5 high-potential local SEO keywords for a ${businessType} business in ${location}. 
    Return JSON with fields: term, volume (e.g. "1.2k"), difficulty (Easy/Medium/Hard).`;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
           type: Type.ARRAY,
           items: {
             type: Type.OBJECT,
             properties: {
               term: { type: Type.STRING },
               volume: { type: Type.STRING },
               difficulty: { type: Type.STRING, enum: ["Easy", "Medium", "Hard"] }
             }
           }
        }
      }
    });
    
    const text = response.text;
    if(!text) return [];
    return JSON.parse(text) as Keyword[];
  } catch (error) {
    return [];
  }
}

// --- Live API Service Utils ---

export const createBlob = (data: Float32Array): Blob => {
  const l = data.length;
  const int16 = new Int16Array(l);
  for (let i = 0; i < l; i++) {
    int16[i] = data[i] * 32768;
  }
  
  // Custom simple blob implementation for the example
  const uint8 = new Uint8Array(int16.buffer);
  let binary = '';
  const len = uint8.byteLength;
  for (let i = 0; i < len; i++) {
    binary += String.fromCharCode(uint8[i]);
  }
  const base64 = btoa(binary);

  return {
    data: base64,
    mimeType: 'audio/pcm;rate=16000',
  };
};

export const decodeAudioData = async (
  base64Data: string,
  ctx: AudioContext,
  sampleRate: number = 24000,
  numChannels: number = 1
): Promise<AudioBuffer> => {
  const binaryString = atob(base64Data);
  const len = binaryString.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  
  const dataInt16 = new Int16Array(bytes.buffer);
  const frameCount = dataInt16.length / numChannels;
  const buffer = ctx.createBuffer(numChannels, frameCount, sampleRate);

  for (let channel = 0; channel < numChannels; channel++) {
    const channelData = buffer.getChannelData(channel);
    for (let i = 0; i < frameCount; i++) {
      channelData[i] = dataInt16[i * numChannels + channel] / 32768.0;
    }
  }
  return buffer;
};

export const getLiveSession = () => {
    return ai.live;
}
