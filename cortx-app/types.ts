
export interface SeoIssue {
  id: string;
  url: string;
  currentTitle: string;
  suggestedFix: string;
  status: 'Deployed' | 'Not Deployed';
  category: string;
}

export interface Review {
  id: string;
  author: string;
  rating: number;
  text: string;
  date: string;
  reply?: string;
}

export type SocialPlatform = 'Google' | 'Facebook' | 'Instagram' | 'LinkedIn' | 'Twitter';

export interface Post {
  id: string;
  content: string;
  date: string;
  status: 'Published' | 'Draft';
  imageUrl?: string;
  views?: number;
  platform: SocialPlatform;
}

export interface Keyword {
  term: string;
  volume: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  rank?: number;
}

export interface ChartData {
  name: string;
  score: number;
  pages: number;
  fixed: number;
}

export interface BusinessProfile {
  id: string;
  name: string;
  type: string; // e.g., "Construction", "Restaurant"
  location: string;
  initials: string;
  color: string;
  isConnected: boolean;
  lastSync?: string;
  websiteUrl?: string;
  socials: {
    facebook?: boolean;
    instagram?: boolean;
    linkedin?: boolean;
    twitter?: boolean;
  };
}

export type ViewState = 'audit' | 'locations' | 'content' | 'performance' | 'keywords' | 'reviews' | 'promotions' | 'products' | 'services' | 'bookings' | 'qa' | 'gbp-dashboard' | 'post-scheduler' | 'advanced-strategy' | 'social-media' | 'website-analysis';

// --- GBP Stats & Analytics ---
export interface GBPStats {
  viewsLastMonth: number;
  callsLastMonth: number;
  directionsLastMonth: number;
  websiteVisitsLastMonth: number;
  messagesSent: number;
  reviewsTotal: number;
  averageRating: number;
  dayTrendData: Array<{date: string; views: number; calls: number; directions: number}>;
}

export interface AutomatedPost {
  id: string;
  businessProfileId: string;
  contentTemplate: string;
  scheduledTime: string; // ISO string
  status: 'scheduled' | 'published' | 'failed';
  platforms: SocialPlatform[];
  generatedContent?: string;
  mediaUrls?: string[];
  createdAt: string;
  publishedAt?: string;
}

export interface PostScheduleTemplate {
  id: string;
  name: string;
  contentTemplate: string;
  frequency: 'daily' | 'weekly' | 'custom';
  dayOfWeek?: number; // 0-6 for weekly
  timeOfDay?: string; // HH:mm format
  platforms: SocialPlatform[];
  category: 'promotional' | 'educational' | 'engagement' | 'seasonal';
  active: boolean;
}

export interface SocialMediaAccount {
  id: string;
  businessProfileId: string;
  platform: SocialPlatform;
  accountName: string;
  accountId: string;
  accessToken: string;
  refreshToken?: string;
  expiresAt?: string;
  connected: boolean;
  followers?: number;
  lastSync?: string;
}

export interface WebsiteMetrics {
  url: string;
  loadTimeMs: number;
  mobileScore: number;
  desktopScore: number;
  seoScore: number;
  accessibilityScore: number;
  bestPracticesScore: number;
  issues: WebsiteIssue[];
  lastAnalyzed: string;
}

export interface WebsiteIssue {
  id: string;
  type: 'seo' | 'performance' | 'accessibility' | 'security';
  severity: 'critical' | 'high' | 'medium' | 'low';
  title: string;
  description: string;
  suggestion: string;
  affectedElements?: number;
}

export interface GBPInsight {
  id: string;
  type: 'trend' | 'recommendation' | 'alert';
  title: string;
  description: string;
  metric?: string;
  previousValue?: number;
  currentValue?: number;
  changePercent?: number;
  actionable: boolean;
  createdAt: string;
}
