/**
 * Google Business Profile API Integration Service
 * Handles real-time connection with Google Business Profile API
 */

interface BusinessProfile {
  name: string;
  displayName: string;
  phoneNumbers: string[];
  websiteUri: string;
  metadata: {
    creationTime: string;
    lastModificationTime: string;
  };
}

interface BusinessInsights {
  totalMeasurements: number;
  metricValues: Array<{
    metric: string;
    totalValue: {
      value: number;
    };
  }>;
}

interface PostData {
  name: string;
  summary: string;
  creationTime: string;
  updateTime: string;
  callToAction: {
    actionType: string;
    url: string;
  };
}

class GoogleBusinessProfileAPI {
  private accessToken: string = '';
  private baseUrl = 'https://businessprofiles.googleapis.com/v1';
  private accountId: string = '';

  /**
   * Initialize with access token from OAuth
   */
  async initialize(token: string, accountId: string): Promise<void> {
    this.accessToken = token;
    this.accountId = accountId;
  }

  /**
   * Fetch business profile information in real-time
   */
  async getBusinessProfile(locationId: string): Promise<BusinessProfile> {
    try {
      const response = await fetch(
        `${this.baseUrl}/accounts/${this.accountId}/locations/${locationId}`,
        {
          headers: {
            Authorization: `Bearer ${this.accessToken}`,
            'Content-Type': 'application/json',
          },
        }
      );

      if (!response.ok) {
        throw new Error(`Failed to fetch business profile: ${response.statusText}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching business profile:', error);
      throw error;
    }
  }

  /**
   * Fetch real-time insights (views, calls, directions, website visits)
   */
  async getInsights(
    locationId: string,
    startDate: string,
    endDate: string,
    metrics: string[]
  ): Promise<BusinessInsights> {
    try {
      const metricsParam = metrics.map((m) => `metric=${m}`).join('&');
      const response = await fetch(
        `${this.baseUrl}/accounts/${this.accountId}/locations/${locationId}/insights/list?${metricsParam}&startDate.year=${startDate.split('-')[0]}&startDate.month=${startDate.split('-')[1]}&startDate.day=${startDate.split('-')[2]}&endDate.year=${endDate.split('-')[0]}&endDate.month=${endDate.split('-')[1]}&endDate.day=${endDate.split('-')[2]}`,
        {
          headers: {
            Authorization: `Bearer ${this.accessToken}`,
            'Content-Type': 'application/json',
          },
        }
      );

      if (!response.ok) {
        throw new Error(`Failed to fetch insights: ${response.statusText}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching insights:', error);
      throw error;
    }
  }

  /**
   * Fetch real-time posts
   */
  async getPosts(locationId: string): Promise<PostData[]> {
    try {
      const response = await fetch(
        `${this.baseUrl}/accounts/${this.accountId}/locations/${locationId}/posts`,
        {
          headers: {
            Authorization: `Bearer ${this.accessToken}`,
            'Content-Type': 'application/json',
          },
        }
      );

      if (!response.ok) {
        throw new Error(`Failed to fetch posts: ${response.statusText}`);
      }

      const data = await response.json();
      return data.posts || [];
    } catch (error) {
      console.error('Error fetching posts:', error);
      throw error;
    }
  }

  /**
   * Create a new post on Google Business Profile
   */
  async createPost(
    locationId: string,
    summary: string,
    callToActionType?: string,
    callToActionUrl?: string
  ): Promise<PostData> {
    try {
      const requestBody = {
        summary,
        ...(callToActionType &&
          callToActionUrl && {
            callToAction: {
              actionType: callToActionType,
              url: callToActionUrl,
            },
          }),
      };

      const response = await fetch(
        `${this.baseUrl}/accounts/${this.accountId}/locations/${locationId}/posts`,
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${this.accessToken}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(requestBody),
        }
      );

      if (!response.ok) {
        throw new Error(`Failed to create post: ${response.statusText}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error creating post:', error);
      throw error;
    }
  }

  /**
   * Fetch reviews in real-time
   */
  async getReviews(locationId: string): Promise<any[]> {
    try {
      const response = await fetch(
        `${this.baseUrl}/accounts/${this.accountId}/locations/${locationId}/reviews`,
        {
          headers: {
            Authorization: `Bearer ${this.accessToken}`,
            'Content-Type': 'application/json',
          },
        }
      );

      if (!response.ok) {
        throw new Error(`Failed to fetch reviews: ${response.statusText}`);
      }

      const data = await response.json();
      return data.reviews || [];
    } catch (error) {
      console.error('Error fetching reviews:', error);
      throw error;
    }
  }

  /**
   * Reply to a review
   */
  async replyToReview(locationId: string, reviewId: string, comment: string): Promise<void> {
    try {
      const response = await fetch(
        `${this.baseUrl}/accounts/${this.accountId}/locations/${locationId}/reviews/${reviewId}/reply`,
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${this.accessToken}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ comment }),
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
}

// Export singleton instance
export const googleBusinessProfileAPI = new GoogleBusinessProfileAPI();
export type { BusinessProfile, BusinessInsights, PostData };
