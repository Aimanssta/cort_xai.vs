// Website Analysis and SEO Optimization Service
import { WebsiteMetrics, WebsiteIssue } from '../types';

class WebsiteAnalysisService {
  /**
   * Analyze website for SEO and performance issues
   */
  async analyzeWebsite(websiteUrl: string): Promise<WebsiteMetrics> {
    try {
      const [
        performanceMetrics,
        seoIssues,
        accessibilityIssues,
        securityIssues,
      ] = await Promise.all([
        this.getPerformanceMetrics(websiteUrl),
        this.checkSEO(websiteUrl),
        this.checkAccessibility(websiteUrl),
        this.checkSecurity(websiteUrl),
      ]);

      const allIssues: WebsiteIssue[] = [
        ...seoIssues,
        ...accessibilityIssues,
        ...securityIssues,
      ];

      return {
        url: websiteUrl,
        loadTimeMs: performanceMetrics.loadTimeMs,
        mobileScore: performanceMetrics.mobileScore,
        desktopScore: performanceMetrics.desktopScore,
        seoScore: performanceMetrics.seoScore,
        accessibilityScore: performanceMetrics.accessibilityScore,
        bestPracticesScore: performanceMetrics.bestPracticesScore,
        issues: allIssues,
        lastAnalyzed: new Date().toISOString(),
      };
    } catch (error) {
      console.error('Error analyzing website:', error);
      throw error;
    }
  }

  /**
   * Get performance metrics using PageSpeed Insights API (mock)
   */
  private async getPerformanceMetrics(websiteUrl: string): Promise<any> {
    try {
      // In production, use Google PageSpeed Insights API
      // For demo, generate realistic mock data
      return {
        loadTimeMs: Math.floor(Math.random() * 3000) + 500,
        mobileScore: Math.floor(Math.random() * 40) + 60,
        desktopScore: Math.floor(Math.random() * 30) + 70,
        seoScore: Math.floor(Math.random() * 30) + 65,
        accessibilityScore: Math.floor(Math.random() * 35) + 60,
        bestPracticesScore: Math.floor(Math.random() * 25) + 70,
      };
    } catch (error) {
      console.error('Error getting performance metrics:', error);
      return {
        loadTimeMs: 0,
        mobileScore: 0,
        desktopScore: 0,
        seoScore: 0,
        accessibilityScore: 0,
        bestPracticesScore: 0,
      };
    }
  }

  /**
   * Check SEO issues
   */
  private async checkSEO(websiteUrl: string): Promise<WebsiteIssue[]> {
    const issues: WebsiteIssue[] = [];

    // Mock SEO checks
    const seoChecks = [
      {
        id: 'meta-title',
        title: 'Missing or duplicate meta titles',
        description: 'Page title tags are not present or duplicate across pages',
        severity: 'high' as const,
        suggestion: 'Ensure each page has a unique, descriptive title (50-60 characters)',
      },
      {
        id: 'meta-desc',
        title: 'Incomplete meta descriptions',
        description: 'Meta descriptions are missing or under-optimized',
        severity: 'medium' as const,
        suggestion: 'Add unique meta descriptions (150-160 characters) to all pages',
      },
      {
        id: 'heading-structure',
        title: 'Poor heading structure',
        description: 'Missing H1 tags or improper heading hierarchy',
        severity: 'medium' as const,
        suggestion: 'Ensure one H1 per page and proper heading hierarchy (H2, H3)',
      },
      {
        id: 'mobile-responsive',
        title: 'Mobile responsiveness issues',
        description: 'Website does not adapt well to mobile devices',
        severity: 'critical' as const,
        suggestion: 'Implement responsive design or mobile version',
      },
      {
        id: 'image-alt',
        title: 'Missing image alt text',
        description: 'Images lack alternative text for accessibility and SEO',
        severity: 'medium' as const,
        suggestion: 'Add descriptive alt text to all images',
      },
      {
        id: 'page-speed',
        title: 'Slow page load speed',
        description: 'Website takes too long to load',
        severity: 'high' as const,
        suggestion: 'Optimize images, minimize CSS/JS, enable caching',
      },
      {
        id: 'structured-data',
        title: 'Missing structured data',
        description: 'Schema markup is not implemented',
        severity: 'medium' as const,
        suggestion: 'Add Schema.org markup (JSON-LD) for better SERP features',
      },
      {
        id: 'canonical-tags',
        title: 'Canonical tag issues',
        description: 'Missing or incorrect canonical tags',
        severity: 'low' as const,
        suggestion: 'Add self-referential canonical tags to prevent duplicate content',
      },
    ];

    // Return random subset of issues (in production, actually check)
    const numIssues = Math.floor(Math.random() * 3) + 2;
    return seoChecks.slice(0, numIssues).map(check => ({
      id: check.id,
      type: 'seo',
      title: check.title,
      description: check.description,
      severity: check.severity,
      suggestion: check.suggestion,
      affectedElements: Math.floor(Math.random() * 50) + 5,
    }));
  }

  /**
   * Check accessibility issues
   */
  private async checkAccessibility(websiteUrl: string): Promise<WebsiteIssue[]> {
    const issues: WebsiteIssue[] = [];

    const a11yChecks = [
      {
        id: 'color-contrast',
        title: 'Insufficient color contrast',
        description: 'Text color does not have sufficient contrast with background',
        severity: 'high' as const,
        suggestion: 'Ensure contrast ratio of at least 4.5:1 for normal text',
      },
      {
        id: 'form-labels',
        title: 'Missing form labels',
        description: 'Form inputs lack associated labels',
        severity: 'high' as const,
        suggestion: 'Add labels to all form inputs using <label> tags',
      },
      {
        id: 'keyboard-nav',
        title: 'Poor keyboard navigation',
        description: 'Website is not fully navigable with keyboard',
        severity: 'critical' as const,
        suggestion: 'Ensure all interactive elements are keyboard accessible',
      },
      {
        id: 'focus-indicators',
        title: 'Missing focus indicators',
        description: 'Focus states are not visible for keyboard navigation',
        severity: 'medium' as const,
        suggestion: 'Add visible focus states to interactive elements',
      },
    ];

    const numIssues = Math.floor(Math.random() * 2) + 1;
    return a11yChecks.slice(0, numIssues).map(check => ({
      id: check.id,
      type: 'accessibility',
      title: check.title,
      description: check.description,
      severity: check.severity,
      suggestion: check.suggestion,
      affectedElements: Math.floor(Math.random() * 30) + 3,
    }));
  }

  /**
   * Check security issues
   */
  private async checkSecurity(websiteUrl: string): Promise<WebsiteIssue[]> {
    const issues: WebsiteIssue[] = [];

    const securityChecks = [
      {
        id: 'ssl-certificate',
        title: 'SSL certificate issues',
        description: 'Website does not use HTTPS or has certificate problems',
        severity: 'critical' as const,
        suggestion: 'Install SSL certificate and redirect all traffic to HTTPS',
      },
      {
        id: 'security-headers',
        title: 'Missing security headers',
        description: 'Important security headers are not configured',
        severity: 'high' as const,
        suggestion: 'Implement Content-Security-Policy and other security headers',
      },
      {
        id: 'outdated-libraries',
        title: 'Outdated JavaScript libraries',
        description: 'Website uses outdated or vulnerable libraries',
        severity: 'high' as const,
        suggestion: 'Update all dependencies to latest secure versions',
      },
    ];

    const numIssues = Math.floor(Math.random() * 2);
    return securityChecks.slice(0, numIssues).map(check => ({
      id: check.id,
      type: 'security',
      title: check.title,
      description: check.description,
      severity: check.severity,
      suggestion: check.suggestion,
    }));
  }

  /**
   * Get website optimization recommendations
   */
  getOptimizationRecommendations(metrics: WebsiteMetrics): string[] {
    const recommendations: string[] = [];

    if (metrics.mobileScore < 70) {
      recommendations.push('Improve mobile user experience - Mobile score is below target');
    }
    if (metrics.seoScore < 70) {
      recommendations.push('Enhance SEO optimization - Implement structured data and improve metadata');
    }
    if (metrics.loadTimeMs > 3000) {
      recommendations.push('Optimize page load speed - Consider image optimization and caching');
    }
    if (metrics.accessibilityScore < 70) {
      recommendations.push('Improve accessibility - Ensure WCAG compliance');
    }
    if (metrics.issues.some(i => i.severity === 'critical')) {
      recommendations.push('Address critical issues immediately - These impact user experience and SEO');
    }

    return recommendations;
  }

  /**
   * Get technical SEO checklist
   */
  getTechnicalSEOChecklist(): Array<{ category: string; items: string[] }> {
    return [
      {
        category: 'Indexing & Crawlability',
        items: [
          'Robots.txt is properly configured',
          'Sitemap.xml exists and is submitted to Google',
          'No blocking of CSS/JS in robots.txt',
          'URL structure is clean and logical',
          'No duplicate content issues',
        ],
      },
      {
        category: 'Core Web Vitals',
        items: [
          'Largest Contentful Paint (LCP) < 2.5s',
          'First Input Delay (FID) < 100ms',
          'Cumulative Layout Shift (CLS) < 0.1',
        ],
      },
      {
        category: 'Mobile & Performance',
        items: [
          'Mobile-first responsive design',
          'Images optimized and lazy-loaded',
          'CSS/JS minified and compressed',
          'Browser caching enabled',
          'CDN for static assets',
        ],
      },
      {
        category: 'On-Page Optimization',
        items: [
          'Unique, compelling title tags (50-60 chars)',
          'Optimized meta descriptions (150-160 chars)',
          'One H1 per page with target keyword',
          'Proper heading hierarchy',
          'Internal linking strategy',
        ],
      },
      {
        category: 'Technical Markup',
        items: [
          'Schema.org structured data implemented',
          'Open Graph tags for social sharing',
          'Twitter Card tags',
          'Canonical tags where applicable',
          'hreflang tags for international versions',
        ],
      },
    ];
  }
}

export const websiteAnalysisService = new WebsiteAnalysisService();
export default websiteAnalysisService;
