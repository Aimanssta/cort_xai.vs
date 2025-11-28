import { LucideIcon } from 'lucide-react';

// Vite environment variables
interface ImportMetaEnv {
  readonly VITE_GEMINI_API_KEY?: string;
  readonly VITE_RETELL_API_KEY?: string;
  readonly VITE_RETELL_AGENT_ID?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

export interface NavItem {
  label: string;
  path: string;
}

export interface FeatureItem {
  title: string;
  description: string;
  icon: LucideIcon;
}

export interface Testimonial {
  quote: string;
  author: string;
  role: string;
  company: string;
}

export interface StatItem {
  label: string;
  value: string;
  trend: string;
  positive: boolean;
}