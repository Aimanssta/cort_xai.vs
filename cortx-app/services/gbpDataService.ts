// Google Business Profile Data Service
import { GBPStats, AutomatedPost, Review } from '../types';
import { getGBPAuthService } from './gbpAuthService';

const GBP_API_BASE = 'https://mybusinessapi.googleapis.com/v4';

export interface GBPInsightsResponse {
  name: string;
  metricValues: Array<{
    metric: string;
    totalValue: {
      value: number;
    };
  }>;
}

export interface GBPPostResponse {
  name: string;
  state: 'PUBLISHED' | 'DRAFT' | 'REJECTED' | 'SCHEDULED';
  topicType: string;
  languageCode: string;
  media: Array<{
    mediaFormat: string;
    sourceUrl: string;
  }>;
  summary: string;
  callToAction?: {
    actionType: string;
    url: string;
  };
  createTime: string;
  updateTime: string;
}

class GBPDataService {
  /**
   * Get business profile details
   */
  async getBusinessProfile(businessAccountId: string): Promise<any> {
    try {
      const accessToken = await getGBPAuthService().getValidAccessToken();
      const response = await fetch(
        `${GBP_API_BASE}/accounts/${businessAccountId}`,
        {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
          },
        }
      );

      if (!response.ok) {
        throw new Error(`Failed to fetch profile: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error fetching business profile:', error);
      throw error;
    }
  }

  /**
   * Get insights/statistics for a business location
   */
  async getInsights(
    accountId: string,
    locationId: string,
    dateRange: { startDate: string; endDate: string }
  ): Promise<GBPStats> {
    try {
      const accessToken = await getGBPAuthService().getValidAccessToken();
      
      const metrics = [
        'VIEWS',
        'CALLS',
        'DIRECTION_REQUESTS',
        'WEBSITE_CLICKS',
        'MESSAGE_CUSTOMER_RESPONSE_TIME',
        'MESSAGE_CUSTOMER_TO_BUSINESS_CONVERSATION_TIME',
      ];

      const response = await fetch(
        `${GBP_API_BASE}/accounts/${accountId}/locations/${locationId}/insights:list`,
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            locationNames: [`accounts/${accountId}/locations/${locationId}`],
            dateRange: {
              startDate: { year: parseInt(dateRange.startDate.split('-')[0]), month: parseInt(dateRange.startDate.split('-')[1]), day: parseInt(dateRange.startDate.split('-')[2]) },
              endDate: { year: parseInt(dateRange.endDate.split('-')[0]), month: parseInt(dateRange.endDate.split('-')[1]), day: parseInt(dateRange.endDate.split('-')[2]) },
            },
            pageSize: 50,
          }),
        }
      );

      if (!response.ok) {
        throw new Error(`Failed to fetch insights: ${response.statusText}`);
      }

      const data = await response.json();
      return this.parseInsightsData(data);
    } catch (error) {
      console.error('Error fetching insights:', error);
      throw error;
    }
  }

  /**
   * Get posts for a location
   */
  async getPosts(accountId: string, locationId: string): Promise<AutomatedPost[]> {
    try {
      const accessToken = await getGBPAuthService().getValidAccessToken();
      const response = await fetch(
        `${GBP_API_BASE}/accounts/${accountId}/locations/${locationId}/posts`,
        {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
          },
        }
      );

      if (!response.ok) {
        throw new Error(`Failed to fetch posts: ${response.statusText}`);
      }

      const data = await response.json();
      return (data.posts || []).map((post: GBPPostResponse, index: number) => ({
        id: post.name,
        businessProfileId: `${accountId}/${locationId}`,
        contentTemplate: post.summary,
        scheduledTime: post.createTime,
        status: post.state === 'PUBLISHED' ? 'published' : 
                post.state === 'SCHEDULED' ? 'scheduled' : 
                post.state === 'DRAFT' ? 'scheduled' : 'failed',
        platforms: ['Google'],
        generatedContent: post.summary,
        mediaUrls: post.media?.map(m => m.sourceUrl) || [],
        createdAt: post.createTime,
        publishedAt: post.state === 'PUBLISHED' ? post.updateTime : undefined,
      }));
    } catch (error) {
      console.error('Error fetching posts:', error);
      return [];
    }
  }

  /**
   * Create a new post on Google Business Profile
   */
  async createPost(
    accountId: string,
    locationId: string,
    content: string,
    mediaUrls?: string[],
    callToActionUrl?: string
  ): Promise<AutomatedPost> {
    try {
      const accessToken = await getGBPAuthService().getValidAccessToken();
      
      const postData: any = {
        summary: content,
        topicType: 'STANDARD_POST',
        languageCode: 'en',
      };

      if (mediaUrls && mediaUrls.length > 0) {
        postData.media = mediaUrls.map(url => ({
          mediaFormat: 'IMAGE',
          sourceUrl: url,
        }));
      }

      if (callToActionUrl) {
        postData.callToAction = {
          actionType: 'LEARN_MORE',
          url: callToActionUrl,
        };
      }

      const response = await fetch(
        `${GBP_API_BASE}/accounts/${accountId}/locations/${locationId}/posts`,
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(postData),
        }
      );

      if (!response.ok) {
        throw new Error(`Failed to create post: ${response.statusText}`);
      }

      const createdPost = await response.json() as GBPPostResponse;
      return {
        id: createdPost.name,
        businessProfileId: `${accountId}/${locationId}`,
        contentTemplate: content,
        scheduledTime: new Date().toISOString(),
        status: 'published',
        platforms: ['Google'],
        generatedContent: content,
        mediaUrls: mediaUrls || [],
        createdAt: createdPost.createTime,
        publishedAt: createdPost.updateTime,
      };
    } catch (error) {
      console.error('Error creating post:', error);
      throw error;
    }
  }

  /**
   * Get reviews for a location
   */
  async getReviews(accountId: string, locationId: string): Promise<Review[]> {
    try {
      const accessToken = await getGBPAuthService().getValidAccessToken();
      const response = await fetch(
        `${GBP_API_BASE}/accounts/${accountId}/locations/${locationId}/reviews`,
        {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
          },
        }
      );

      if (!response.ok) {
        throw new Error(`Failed to fetch reviews: ${response.statusText}`);
      }

      const data = await response.json();
      return (data.reviews || []).map((review: any) => ({
        id: review.name,
        author: review.reviewer?.displayName || 'Anonymous',
        rating: review.starRating,
        text: review.reviewText || '',
        date: review.reviewPublishTime || new Date().toISOString(),
        reply: review.ownerResponse?.responseText,
      }));
    } catch (error) {
      console.error('Error fetching reviews:', error);
      return [];
    }
  }

  /**
   * Reply to a review
   */
  async replyToReview(
    accountId: string,
    locationId: string,
    reviewId: string,
    replyText: string
  ): Promise<void> {
    try {
      const accessToken = await getGBPAuthService().getValidAccessToken();
      const response = await fetch(
        `${GBP_API_BASE}/accounts/${accountId}/locations/${locationId}/reviews/${reviewId}:reply`,
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            ownerResponse: {
              responseText: replyText,
            },
          }),
        }
      );

      if (!response.ok) {
        throw new Error(`Failed to reply to review: ${response.statusText}`);
      }
    } catch (error) {
      console.error('Error replying to review:', error);
      throw error;
    }
  }

  /**
   * Get business locations
   */
  async getLocations(accountId: string): Promise<any[]> {
    try {
      const accessToken = await getGBPAuthService().getValidAccessToken();
      const response = await fetch(
        `${GBP_API_BASE}/accounts/${accountId}/locations`,
        {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
          },
        }
      );

      if (!response.ok) {
        throw new Error(`Failed to fetch locations: ${response.statusText}`);
      }

      const data = await response.json();
      return data.locations || [];
    } catch (error) {
      console.error('Error fetching locations:', error);
      return [];
    }
  }

  /**
   * Parse insights data into GBPStats format
   */
  private parseInsightsData(data: any): GBPStats {
    const insights = data.locationInsights?.[0]?.metrics || [];
    
    const findMetricValue = (metricName: string): number => {
      const metric = insights.find((m: any) => m.metric === metricName);
      return metric?.totalValue?.value || 0;
    };

    // Generate mock daily trend data for demo
    const dayTrendData = Array.from({ length: 30 }, (_, i) => {
      const date = new Date();
      date.setDate(date.getDate() - (30 - i));
      return {
        date: date.toISOString().split('T')[0],
        views: Math.floor(Math.random() * 100) + 20,
        calls: Math.floor(Math.random() * 30) + 5,
        directions: Math.floor(Math.random() * 50) + 10,
      };
    });

    return {
      viewsLastMonth: findMetricValue('VIEWS'),
      callsLastMonth: findMetricValue('CALLS'),
      directionsLastMonth: findMetricValue('DIRECTION_REQUESTS'),
      websiteVisitsLastMonth: findMetricValue('WEBSITE_CLICKS'),
      messagesSent: 0,
      reviewsTotal: 0,
      averageRating: 4.5,
      dayTrendData,
    };
  }
}

export const gbpDataService = new GBPDataService();
export default gbpDataService;
