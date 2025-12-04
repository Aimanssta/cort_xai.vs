/**
 * Website Real-time Analysis Service
 * Fetches real-time analytics using Google PageSpeed Insights API, SEO data, and performance metrics
 */

interface WebsiteMetrics {
  url: string;
  pageSpeedScore: number;
  mobileScore: number;
  desktopScore: number;
  seoScore: number;
  accessibilityScore: number;
  bestPracticesScore: number;
  performanceMetrics: {
    firstContentfulPaint: number;
    largestContentfulPaint: number;
    cumulativeLayoutShift: number;
    speedIndex: number;
    timeToInteractive: number;
  };
  issues: {
    critical: number;
    high: number;
    medium: number;
    low: number;
  };
}

class GooglePageSpeedInsights {
  private apiKey: string = '';
  private baseUrl = 'https://www.googleapis.com/pagespeedonline/v5/runPagespeed';

  async initialize(apiKey: string): Promise<void> {
    this.apiKey = apiKey;
  }

  /**
   * Get real-time PageSpeed metrics for a website
   */
  async analyzeWebsite(url: string): Promise<WebsiteMetrics> {
    try {
      // Analyze for both mobile and desktop
      const [mobileResponse, desktopResponse] = await Promise.all([
        fetch(
          `${this.baseUrl}?url=${encodeURIComponent(url)}&strategy=mobile&key=${this.apiKey}`,
          { headers: { 'Content-Type': 'application/json' } }
        ),
        fetch(
          `${this.baseUrl}?url=${encodeURIComponent(url)}&strategy=desktop&key=${this.apiKey}`,
          { headers: { 'Content-Type': 'application/json' } }
        ),
      ]);

      if (!mobileResponse.ok || !desktopResponse.ok) {
        throw new Error('Failed to fetch PageSpeed data');
      }

      const mobileData = await mobileResponse.json();
      const desktopData = await desktopResponse.json();

      const mobileAudits = mobileData.lighthouseResult?.audits || {};
      const desktopAudits = desktopData.lighthouseResult?.audits || {};

      const mobileCategoryScores = mobileData.lighthouseResult?.categories || {};
      const desktopCategoryScores = desktopData.lighthouseResult?.categories || {};

      // Extract metrics
      const performanceMetrics = {
        firstContentfulPaint: this.extractMetric(
          mobileAudits['first-contentful-paint']?.numericValue || 0
        ),
        largestContentfulPaint: this.extractMetric(
          mobileAudits['largest-contentful-paint']?.numericValue || 0
        ),
        cumulativeLayoutShift: this.extractMetric(
          mobileAudits['cumulative-layout-shift']?.numericValue || 0
        ),
        speedIndex: this.extractMetric(
          mobileAudits['speed-index']?.numericValue || 0
        ),
        timeToInteractive: this.extractMetric(
          mobileAudits['interactive']?.numericValue || 0
        ),
      };

      return {
        url,
        pageSpeedScore: this.normalizeScore(
          mobileCategoryScores.performance?.score || 0
        ),
        mobileScore: this.normalizeScore(mobileCategoryScores.performance?.score || 0),
        desktopScore: this.normalizeScore(desktopCategoryScores.performance?.score || 0),
        seoScore: this.normalizeScore(mobileCategoryScores.seo?.score || 0),
        accessibilityScore: this.normalizeScore(
          mobileCategoryScores.accessibility?.score || 0
        ),
        bestPracticesScore: this.normalizeScore(
          mobileCategoryScores['best-practices']?.score || 0
        ),
        performanceMetrics,
        issues: this.categorizeIssues(mobileAudits),
      };
    } catch (error) {
      console.error('Error analyzing website:', error);
      throw error;
    }
  }

  /**
   * Get real-time SEO analysis
   */
  async analyzeSEO(url: string): Promise<any> {
    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'User-Agent':
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
        },
      });

      if (!response.ok) throw new Error('Failed to fetch page');

      const html = await response.text();

      // Parse HTML for SEO elements
      const metaTitleMatch = html.match(/<title>(.*?)<\/title>/i);
      const metaDescriptionMatch = html.match(
        /<meta\s+name=["']description["']\s+content=["'](.*?)["']/i
      );
      const h1Count = (html.match(/<h1>/gi) || []).length;
      const headingCount =
        (html.match(/<h[1-6]>/gi) || []).length;
      const imageCount = (html.match(/<img/gi) || []).length;
      const altTextCount = (html.match(/<img[^>]*alt=/gi) || [])
        .length;
      const linkCount = (html.match(/<a\s+href=/gi) || [])
        .length;
      const canonicalMatch = html.match(
        /<link\s+rel=["']canonical["']\s+href=["'](.*?)["']/i
      );

      return {
        url,
        title: metaTitleMatch?.[1] || '',
        description: metaDescriptionMatch?.[1] || '',
        headings: {
          h1: h1Count,
          total: headingCount,
        },
        images: {
          total: imageCount,
          withAltText: altTextCount,
          withoutAltText: imageCount - altTextCount,
        },
        links: linkCount,
        canonical: canonicalMatch?.[1] || '',
        hasStructuredData: html.includes('ld+json'),
      };
    } catch (error) {
      console.error('Error analyzing SEO:', error);
      throw error;
    }
  }

  /**
   * Monitor real-time website uptime
   */
  async checkWebsiteUptime(url: string): Promise<{ isOnline: boolean; responseTime: number }> {
    try {
      const startTime = performance.now();
      const response = await fetch(url, { method: 'HEAD' });
      const endTime = performance.now();

      return {
        isOnline: response.ok,
        responseTime: endTime - startTime,
      };
    } catch (error) {
      console.error('Error checking uptime:', error);
      return {
        isOnline: false,
        responseTime: 0,
      };
    }
  }

  /**
   * Get real-time traffic metrics (requires Google Analytics integration)
   */
  async getTrafficMetrics(url: string): Promise<any> {
    try {
      // This would require Google Analytics API integration
      // Placeholder for real implementation
      const response = await fetch(
        `https://www.google-analytics.com/collect?v=1&tid=UA-XXXXX-Y&cid=555&t=pageview&dp=${encodeURIComponent(url)}`
      );

      return {
        url,
        pageviews: 0,
        uniqueVisitors: 0,
        bounceRate: 0,
        avgSessionDuration: 0,
      };
    } catch (error) {
      console.error('Error fetching traffic metrics:', error);
      throw error;
    }
  }

  private extractMetric(value: number): number {
    return Math.round(value);
  }

  private normalizeScore(score: number): number {
    return Math.round(score * 100);
  }

  private categorizeIssues(audits: Record<string, any>): {
    critical: number;
    high: number;
    medium: number;
    low: number;
  } {
    let critical = 0,
      high = 0,
      medium = 0,
      low = 0;

    Object.values(audits).forEach((audit: any) => {
      if (!audit.score || audit.score < 1) {
        const impact = audit.impact || 'low';
        if (impact === 'critical' || impact === 'high') critical++;
        else if (impact === 'high' || impact === 'medium') high++;
        else if (impact === 'medium' || impact === 'low') medium++;
        else low++;
      }
    });

    return { critical, high, medium, low };
  }
}

/**
 * Website Analytics Dashboard Service
 * Aggregates real-time data from multiple sources
 */
class WebsiteAnalyticsDashboard {
  private pageSpeedAPI: GooglePageSpeedInsights;

  constructor() {
    this.pageSpeedAPI = new GooglePageSpeedInsights();
  }

  async initialize(googlePageSpeedApiKey: string): Promise<void> {
    await this.pageSpeedAPI.initialize(googlePageSpeedApiKey);
  }

  /**
   * Get comprehensive real-time website dashboard
   */
  async getComprehensiveDashboard(url: string): Promise<any> {
    try {
      const [metrics, seoData, uptime] = await Promise.all([
        this.pageSpeedAPI.analyzeWebsite(url),
        this.pageSpeedAPI.analyzeSEO(url),
        this.pageSpeedAPI.checkWebsiteUptime(url),
      ]);

      return {
        url,
        metrics,
        seo: seoData,
        uptime,
        generatedAt: new Date().toISOString(),
      };
    } catch (error) {
      console.error('Error generating dashboard:', error);
      throw error;
    }
  }
}

export const pageSpeedInsights = new GooglePageSpeedInsights();
export const websiteAnalyticsDashboard = new WebsiteAnalyticsDashboard();

export type { WebsiteMetrics };
