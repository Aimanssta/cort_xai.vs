/**
 * Unified Real-time Dashboard Service
 * Integrates Google Business Profile, Social Media, and Website Analytics
 * Provides live data aggregation and sync
 */

import { googleBusinessProfileAPI } from './googleBusinessProfileRealtime';
import { facebookAPI, instagramAPI, linkedinAPI, twitterAPI } from './socialMediaRealtime';
import { websiteAnalyticsDashboard } from './websiteAnalyticsRealtime';

interface DashboardData {
  gbpData: {
    profile?: any;
    insights?: any;
    posts?: any[];
    reviews?: any[];
    lastUpdated: string;
  };
  socialMediaData: {
    facebook?: any;
    instagram?: any;
    linkedin?: any;
    twitter?: any;
    lastUpdated: string;
  };
  websiteData: {
    metrics?: any;
    seo?: any;
    uptime?: any;
    lastUpdated: string;
  };
}

class RealtimeSyncDashboard {
  private gbpLocationId: string = '';
  private facebookPageId: string = '';
  private instagramAccountId: string = '';
  private linkedinOrgId: string = '';
  private twitterUserId: string = '';
  private websiteUrl: string = '';
  private syncInterval: NodeJS.Timeout | null = null;

  /**
   * Initialize all API connections
   */
  async initialize(config: {
    gbpAccessToken?: string;
    gbpLocationId?: string;
    fbAccessToken?: string;
    fbPageId?: string;
    igAccessToken?: string;
    igAccountId?: string;
    liAccessToken?: string;
    liOrgId?: string;
    twitterBearerToken?: string;
    twitterUserId?: string;
    pageSpeedApiKey?: string;
    websiteUrl?: string;
  }): Promise<void> {
    try {
      // Initialize Google Business Profile
      if (config.gbpAccessToken && config.gbpLocationId) {
        await googleBusinessProfileAPI.initialize(
          config.gbpAccessToken,
          'accounts/default'
        );
        this.gbpLocationId = config.gbpLocationId;
      }

      // Initialize Facebook
      if (config.fbAccessToken && config.fbPageId) {
        await facebookAPI.initialize(config.fbAccessToken, config.fbPageId);
        this.facebookPageId = config.fbPageId;
      }

      // Initialize Instagram
      if (config.igAccessToken && config.igAccountId) {
        await instagramAPI.initialize(config.igAccessToken, config.igAccountId);
        this.instagramAccountId = config.igAccountId;
      }

      // Initialize LinkedIn
      if (config.liAccessToken && config.liOrgId) {
        await linkedinAPI.initialize(config.liAccessToken, config.liOrgId);
        this.linkedinOrgId = config.liOrgId;
      }

      // Initialize Twitter
      if (config.twitterBearerToken && config.twitterUserId) {
        await twitterAPI.initialize(config.twitterBearerToken);
        this.twitterUserId = config.twitterUserId;
      }

      // Initialize Website Analytics
      if (config.pageSpeedApiKey && config.websiteUrl) {
        await websiteAnalyticsDashboard.initialize(config.pageSpeedApiKey);
        this.websiteUrl = config.websiteUrl;
      }
    } catch (error) {
      console.error('Error initializing RealtimeSyncDashboard:', error);
      throw error;
    }
  }

  /**
   * Fetch all real-time data from all sources
   */
  async fetchAllData(): Promise<DashboardData> {
    const dashboardData: DashboardData = {
      gbpData: { lastUpdated: new Date().toISOString() },
      socialMediaData: { lastUpdated: new Date().toISOString() },
      websiteData: { lastUpdated: new Date().toISOString() },
    };

    try {
      // Fetch GBP data
      if (this.gbpLocationId) {
        try {
          dashboardData.gbpData.profile = await googleBusinessProfileAPI.getBusinessProfile(
            this.gbpLocationId
          );
        } catch (error) {
          console.warn('Error fetching GBP profile:', error);
        }

        try {
          const today = new Date();
          const thirtyDaysAgo = new Date(today.getTime() - 30 * 24 * 60 * 60 * 1000);
          const startDate = thirtyDaysAgo.toISOString().split('T')[0];
          const endDate = today.toISOString().split('T')[0];

          dashboardData.gbpData.insights =
            await googleBusinessProfileAPI.getInsights(
              this.gbpLocationId,
              startDate,
              endDate,
              [
                'QUERY_DIRECT',
                'QUERY_INDIRECT',
                'CALL',
                'WEBSITE_CLICKS',
                'DIRECTION_REQUESTS',
              ]
            );
        } catch (error) {
          console.warn('Error fetching GBP insights:', error);
        }

        try {
          dashboardData.gbpData.posts = await googleBusinessProfileAPI.getPosts(
            this.gbpLocationId
          );
        } catch (error) {
          console.warn('Error fetching GBP posts:', error);
        }

        try {
          dashboardData.gbpData.reviews = await googleBusinessProfileAPI.getReviews(
            this.gbpLocationId
          );
        } catch (error) {
          console.warn('Error fetching GBP reviews:', error);
        }
      }

      // Fetch Social Media data
      if (this.facebookPageId) {
        try {
          dashboardData.socialMediaData.facebook = {
            insights: await facebookAPI.getPageInsights(),
            posts: await facebookAPI.getPosts(5),
          };
        } catch (error) {
          console.warn('Error fetching Facebook data:', error);
        }
      }

      if (this.instagramAccountId) {
        try {
          dashboardData.socialMediaData.instagram = {
            insights: await instagramAPI.getAccountInsights(),
            posts: await instagramAPI.getPosts(5),
          };
        } catch (error) {
          console.warn('Error fetching Instagram data:', error);
        }
      }

      if (this.linkedinOrgId) {
        try {
          dashboardData.socialMediaData.linkedin = {
            insights: await linkedinAPI.getOrganizationInsights(),
          };
        } catch (error) {
          console.warn('Error fetching LinkedIn data:', error);
        }
      }

      if (this.twitterUserId) {
        try {
          dashboardData.socialMediaData.twitter = {
            tweets: await twitterAPI.getTweets(this.twitterUserId, 5),
          };
        } catch (error) {
          console.warn('Error fetching Twitter data:', error);
        }
      }

      // Fetch Website data
      if (this.websiteUrl) {
        try {
          dashboardData.websiteData = await websiteAnalyticsDashboard.getComprehensiveDashboard(
            this.websiteUrl
          );
        } catch (error) {
          console.warn('Error fetching website data:', error);
        }
      }

      return dashboardData;
    } catch (error) {
      console.error('Error fetching all data:', error);
      throw error;
    }
  }

  /**
   * Start auto-syncing data at specified interval (in seconds)
   */
  startAutoSync(intervalSeconds: number = 300): void {
    if (this.syncInterval) {
      clearInterval(this.syncInterval);
    }

    console.log(
      `Starting real-time sync every ${intervalSeconds} seconds`
    );

    this.syncInterval = setInterval(async () => {
      try {
        const data = await this.fetchAllData();
        // Dispatch event or update store with new data
        window.dispatchEvent(
          new CustomEvent('realtimeDataUpdate', { detail: data })
        );
      } catch (error) {
        console.error('Error during auto-sync:', error);
      }
    }, intervalSeconds * 1000);
  }

  /**
   * Stop auto-syncing
   */
  stopAutoSync(): void {
    if (this.syncInterval) {
      clearInterval(this.syncInterval);
      this.syncInterval = null;
    }
  }

  /**
   * Publish content across all platforms
   */
  async publishAcrossAllPlatforms(
    content: string,
    imageUrl?: string
  ): Promise<any> {
    const results: Record<string, any> = {};

    try {
      // Publish to GBP
      if (this.gbpLocationId) {
        try {
          results.gbp = await googleBusinessProfileAPI.createPost(
            this.gbpLocationId,
            content
          );
        } catch (error) {
          results.gbpError = error;
        }
      }

      // Publish to Facebook
      if (this.facebookPageId) {
        try {
          results.facebook = await facebookAPI.publishPost(content, imageUrl);
        } catch (error) {
          results.facebookError = error;
        }
      }

      // Publish to Instagram
      if (this.instagramAccountId && imageUrl) {
        try {
          results.instagram = await instagramAPI.publishPost(content, imageUrl);
        } catch (error) {
          results.instagramError = error;
        }
      }

      // Publish to LinkedIn
      if (this.linkedinOrgId) {
        try {
          results.linkedin = await linkedinAPI.publishPost(content);
        } catch (error) {
          results.linkedinError = error;
        }
      }

      // Publish to Twitter
      if (this.twitterUserId) {
        try {
          results.twitter = await twitterAPI.publishTweet(content);
        } catch (error) {
          results.twitterError = error;
        }
      }

      return results;
    } catch (error) {
      console.error('Error publishing across platforms:', error);
      throw error;
    }
  }
}

export const realtimeSyncDashboard = new RealtimeSyncDashboard();
export type { DashboardData };
