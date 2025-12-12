/**
 * Advanced Content Generation Service with Multi-Keyword Targeting
 * Similar to Semrush strategy - targets multiple keywords in posts by serving areas
 */

import { GoogleGenAI, Type } from "@google/genai";
import { SocialPlatform } from "../types";

const apiKey = import.meta.env.VITE_GOOGLE_GEMINI_API_KEY || '';
const ai = new GoogleGenAI({ apiKey });

// Types for advanced content generation
export interface ServingArea {
  name: string;
  zipCodes?: string[];
  radius?: number;
}

export interface KeywordTarget {
  term: string;
  searchVolume: number;
  difficulty: number; // 1-100
  localRelevance: number; // 1-100
  servingAreas: ServingArea[];
}

export interface LocationKeywordCluster {
  area: string;
  primaryKeyword: string;
  relatedKeywords: string[];
  contentThemes: string[];
  seasonality?: string;
}

export interface OptimizedPost {
  content: string;
  keywords: string[];
  servingAreas: string[];
  estimatedReach: number;
  optimizationScore: number;
  metadata: {
    targetKeywords: string[];
    localEntities: string[];
    callToAction: string;
  };
}

/**
 * Discover location-specific keywords for serving areas
 * Similar to Semrush's keyword research for multiple locations
 */
export const discoverLocationKeywords = async (
  businessType: string,
  servingAreas: ServingArea[]
): Promise<LocationKeywordCluster[]> => {
  try {
    const areaNames = servingAreas.map(a => a.name).join(", ");
    
    const prompt = `You are a local SEO expert like Semrush. Generate keyword clusters for a ${businessType} business serving these areas: ${areaNames}.

For each area, provide:
1. Primary local keyword (e.g., "pizza delivery in Brooklyn")
2. 5 related high-intent keywords
3. 3 content themes to address customer needs
4. Seasonality patterns if applicable

Return JSON array with fields: area, primaryKeyword, relatedKeywords (array), contentThemes (array), seasonality (optional).`;

    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              area: { type: Type.STRING },
              primaryKeyword: { type: Type.STRING },
              relatedKeywords: { 
                type: Type.ARRAY,
                items: { type: Type.STRING }
              },
              contentThemes: {
                type: Type.ARRAY,
                items: { type: Type.STRING }
              },
              seasonality: { type: Type.STRING }
            }
          }
        }
      }
    });

    const text = response.text;
    if (!text) return [];
    return JSON.parse(text) as LocationKeywordCluster[];
  } catch (error) {
    console.error("Error discovering location keywords:", error);
    return [];
  }
};

/**
 * Generate SEO-optimized post content targeting multiple keywords
 * Each post naturally incorporates keywords relevant to specific serving areas
 */
export const generateKeywordTargetedPost = async (
  businessName: string,
  businessType: string,
  keywordClusters: LocationKeywordCluster[],
  servingArea: string,
  platform: SocialPlatform = 'Google'
): Promise<OptimizedPost> => {
  try {
    // Get the cluster for this serving area
    const cluster = keywordClusters.find(k => k.area === servingArea);
    if (!cluster) throw new Error(`No keyword cluster found for ${servingArea}`);

    // Build the prompt for multi-keyword targeting
    const prompt = `You are an expert content marketer. Create a ${platform} post for "${businessName}" (${businessType}) serving ${servingArea}.

PRIMARY OBJECTIVE: Naturally incorporate these keywords into engaging, helpful content:
- Primary: "${cluster.primaryKeyword}"
- Related: ${cluster.relatedKeywords.join(", ")}

CONTENT THEMES to address:
${cluster.contentThemes.map(t => `- ${t}`).join('\n')}

${cluster.seasonality ? `SEASONALITY: ${cluster.seasonality}` : ''}

REQUIREMENTS:
1. Make keywords feel natural, not forced
2. Focus on user intent and solving problems
3. Include location-specific details/references
4. For ${platform}: ${getPlatformGuidelines(platform)}
5. Add a clear call-to-action

Return JSON with fields:
- content: the main post text
- keywords: array of keywords naturally included
- cta: call-to-action used
- servingAreas: array with the area name
- estimatedReach: estimated local reach (1-10000)
- optimizationScore: 1-100 score`;

    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            content: { type: Type.STRING },
            keywords: { 
              type: Type.ARRAY,
              items: { type: Type.STRING }
            },
            cta: { type: Type.STRING },
            servingAreas: {
              type: Type.ARRAY,
              items: { type: Type.STRING }
            },
            estimatedReach: { type: Type.NUMBER },
            optimizationScore: { type: Type.NUMBER }
          }
        }
      }
    });

    const text = response.text;
    if (!text) throw new Error("No content generated");

    const data = JSON.parse(text);

    return {
      content: data.content,
      keywords: data.keywords || [cluster.primaryKeyword, ...cluster.relatedKeywords],
      servingAreas: [servingArea],
      estimatedReach: data.estimatedReach || 1000,
      optimizationScore: data.optimizationScore || 75,
      metadata: {
        targetKeywords: [cluster.primaryKeyword, ...cluster.relatedKeywords],
        localEntities: [businessName, servingArea],
        callToAction: data.cta || "Contact us today"
      }
    };
  } catch (error) {
    console.error("Error generating keyword-targeted post:", error);
    throw error;
  }
};

/**
 * Generate a content calendar targeting different keywords across serving areas
 * Similar to Semrush's content calendar for multi-location businesses
 */
export const generateMultiAreaContentCalendar = async (
  businessName: string,
  businessType: string,
  keywordClusters: LocationKeywordCluster[],
  servingAreas: string[],
  daysInAdvance: number = 30,
  platform: SocialPlatform = 'Google'
): Promise<OptimizedPost[]> => {
  try {
    const postsPerArea = Math.ceil(daysInAdvance / servingAreas.length);
    const posts: OptimizedPost[] = [];

    // Generate posts for each area, rotating through serving areas
    for (let day = 0; day < daysInAdvance; day++) {
      const areaIndex = day % servingAreas.length;
      const area = servingAreas[areaIndex];
      
      try {
        const post = await generateKeywordTargetedPost(
          businessName,
          businessType,
          keywordClusters,
          area,
          platform
        );
        posts.push(post);
      } catch (err) {
        console.warn(`Failed to generate post for ${area}:`, err);
      }
    }

    return posts;
  } catch (error) {
    console.error("Error generating content calendar:", error);
    return [];
  }
};

/**
 * Analyze competitor keywords and suggest variations
 * Helps find gaps in keyword coverage for different areas
 */
export const analyzeKeywordGaps = async (
  businessType: string,
  servingAreas: ServingArea[],
  competitorKeywords?: string[]
): Promise<string[]> => {
  try {
    const areaNames = servingAreas.map(a => a.name).join(", ");
    
    const prompt = `You are a local SEO strategist analyzing keyword gaps.

Business Type: ${businessType}
Serving Areas: ${areaNames}
${competitorKeywords ? `Competitor Keywords: ${competitorKeywords.join(", ")}` : ""}

Suggest 10 high-opportunity local keywords that:
1. Have decent search volume
2. Are underutilized by competitors
3. Are hyper-local (mention specific areas, neighborhoods)
4. Show purchase intent
5. Vary by location/season

Return JSON array with field: keywords (array of strings)`;

    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            keywords: {
              type: Type.ARRAY,
              items: { type: Type.STRING }
            }
          }
        }
      }
    });

    const text = response.text;
    if (!text) return [];
    
    const data = JSON.parse(text);
    return data.keywords || [];
  } catch (error) {
    console.error("Error analyzing keyword gaps:", error);
    return [];
  }
};

/**
 * Generate location-specific hashtag strategies
 * Different hashtags for different areas
 */
export const generateLocationHashtags = async (
  businessType: string,
  servingArea: string,
  platform: SocialPlatform = 'Instagram'
): Promise<string[]> => {
  try {
    const prompt = `Generate the best hashtags for a ${businessType} business in ${servingArea} posting on ${platform}.

Include:
1. Local hashtags (area-specific)
2. Service-specific hashtags
3. Trending hashtags for ${platform}
4. Community hashtags
5. Mix of high-volume and niche hashtags

Return JSON with field: hashtags (array of strings, max 30 for Instagram, 10 for Twitter, 5 for Facebook)`;

    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            hashtags: {
              type: Type.ARRAY,
              items: { type: Type.STRING }
            }
          }
        }
      }
    });

    const text = response.text;
    if (!text) return [];
    
    const data = JSON.parse(text);
    return data.hashtags || [];
  } catch (error) {
    console.error("Error generating location hashtags:", error);
    return [];
  }
};

/**
 * Rate and optimize existing post for keyword targeting
 * Similar to Semrush's content audit
 */
export const analyzePostOptimization = async (
  postContent: string,
  targetKeywords: string[],
  platform: SocialPlatform
): Promise<{
  score: number;
  keywordsFound: string[];
  keywordsMissing: string[];
  suggestions: string[];
}> => {
  try {
    const prompt = `Analyze this ${platform} post for local SEO keyword targeting.

Post Content: "${postContent}"
Target Keywords: ${targetKeywords.join(", ")}

Provide:
1. Overall optimization score (1-100)
2. Which target keywords are naturally included
3. Which keywords are missing
4. 3-5 specific improvement suggestions
5. Better CTAs for ${platform}

Return JSON with fields: score (number), keywordsFound (array), keywordsMissing (array), suggestions (array)`;

    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            score: { type: Type.NUMBER },
            keywordsFound: {
              type: Type.ARRAY,
              items: { type: Type.STRING }
            },
            keywordsMissing: {
              type: Type.ARRAY,
              items: { type: Type.STRING }
            },
            suggestions: {
              type: Type.ARRAY,
              items: { type: Type.STRING }
            }
          }
        }
      }
    });

    const text = response.text;
    if (!text) throw new Error("No analysis generated");

    return JSON.parse(text);
  } catch (error) {
    console.error("Error analyzing post optimization:", error);
    throw error;
  }
};

/**
 * Helper function to get platform-specific guidelines
 */
function getPlatformGuidelines(platform: SocialPlatform): string {
  const guidelines: Record<SocialPlatform, string> = {
    Google: "Professional, informative, 80 words max, include service details, location-specific",
    Facebook: "Community-focused, engaging, encourage shares/comments, 3-5 hashtags, casual tone",
    Instagram: "Visual language, emojis, 10-15 hashtags, casual and trendy, call-to-action",
    LinkedIn: "Professional, industry expertise, value-focused, 3-4 hashtags, thought leadership",
    Twitter: "Punchy, under 280 chars, 2-3 hashtags, trending topics, conversational"
  };
  return guidelines[platform];
}
