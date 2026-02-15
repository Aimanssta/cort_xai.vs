/**
 * Social Media Real-time API Integration Service
 * Handles connections with Facebook Graph API, Instagram Graph API, LinkedIn API v2, and Twitter API v2
 */

interface SocialPost {
  id: string;
  message: string;
  createdTime: string;
  engagementMetrics: {
    likes: number;
    comments: number;
    shares: number;
    reactions: number;
  };
}

interface SocialAccount {
  id: string;
  username: string;
  followers: number;
  engagementRate: number;
}

class FacebookGraphAPI {
  private accessToken: string = '';
  private pageId: string = '';
  private baseUrl = 'https://graph.facebook.com/v18.0';

  async initialize(token: string, pageId: string): Promise<void> {
    this.accessToken = token;
    this.pageId = pageId;
  }

  /**
   * Get real-time page insights
   */
  async getPageInsights(): Promise<any> {
    try {
      const response = await fetch(
        `${this.baseUrl}/${this.pageId}/insights?metric=page_fans,page_post_engagements,page_impressions&access_token=${this.accessToken}`,
        { headers: { 'Content-Type': 'application/json' } }
      );

      if (!response.ok) throw new Error(`Facebook API error: ${response.statusText}`);
      return await response.json();
    } catch (error) {
      console.error('Error fetching Facebook insights:', error);
      throw error;
    }
  }

  /**
   * Get real-time page posts and engagement
   */
  async getPosts(limit = 10): Promise<SocialPost[]> {
    try {
      const response = await fetch(
        `${this.baseUrl}/${this.pageId}/posts?fields=id,message,created_time,likes.summary(true),comments.summary(true),shares&access_token=${this.accessToken}&limit=${limit}`,
        { headers: { 'Content-Type': 'application/json' } }
      );

      if (!response.ok) throw new Error(`Facebook API error: ${response.statusText}`);
      const data = await response.json();

      return (data.data || []).map((post: any) => ({
        id: post.id,
        message: post.message,
        createdTime: post.created_time,
        engagementMetrics: {
          likes: post.likes?.summary?.total_count || 0,
          comments: post.comments?.summary?.total_count || 0,
          shares: post.shares?.count || 0,
          reactions: 0,
        },
      }));
    } catch (error) {
      console.error('Error fetching Facebook posts:', error);
      throw error;
    }
  }

  /**
   * Publish a post to Facebook page in real-time
   */
  async publishPost(message: string, imageUrl?: string): Promise<any> {
    try {
      const body: any = { message, access_token: this.accessToken };
      if (imageUrl) body.url = imageUrl;

      const response = await fetch(`${this.baseUrl}/${this.pageId}/feed`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      if (!response.ok) throw new Error(`Failed to publish: ${response.statusText}`);
      return await response.json();
    } catch (error) {
      console.error('Error publishing to Facebook:', error);
      throw error;
    }
  }
}

class InstagramGraphAPI {
  private accessToken: string = '';
  private instagramAccountId: string = '';
  private baseUrl = 'https://graph.instagram.com/v18.0';

  async initialize(token: string, accountId: string): Promise<void> {
    this.accessToken = token;
    this.instagramAccountId = accountId;
  }

  /**
   * Get real-time Instagram insights
   */
  async getAccountInsights(): Promise<any> {
    try {
      const response = await fetch(
        `${this.baseUrl}/${this.instagramAccountId}/insights?metric=impressions,reach,profile_views,follower_count&access_token=${this.accessToken}`,
        { headers: { 'Content-Type': 'application/json' } }
      );

      if (!response.ok) throw new Error(`Instagram API error: ${response.statusText}`);
      return await response.json();
    } catch (error) {
      console.error('Error fetching Instagram insights:', error);
      throw error;
    }
  }

  /**
   * Get real-time posts and engagement
   */
  async getPosts(limit = 10): Promise<SocialPost[]> {
    try {
      const response = await fetch(
        `${this.baseUrl}/${this.instagramAccountId}/media?fields=id,caption,media_type,timestamp,like_count,comments_count&access_token=${this.accessToken}&limit=${limit}`,
        { headers: { 'Content-Type': 'application/json' } }
      );

      if (!response.ok) throw new Error(`Instagram API error: ${response.statusText}`);
      const data = await response.json();

      return (data.data || []).map((post: any) => ({
        id: post.id,
        message: post.caption || '',
        createdTime: post.timestamp,
        engagementMetrics: {
          likes: post.like_count || 0,
          comments: post.comments_count || 0,
          shares: 0,
          reactions: 0,
        },
      }));
    } catch (error) {
      console.error('Error fetching Instagram posts:', error);
      throw error;
    }
  }

  /**
   * Publish a post to Instagram in real-time
   */
  async publishPost(caption: string, imageUrl: string): Promise<any> {
    try {
      const response = await fetch(`${this.baseUrl}/${this.instagramAccountId}/media`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          image_url: imageUrl,
          caption,
          access_token: this.accessToken,
        }),
      });

      if (!response.ok) throw new Error(`Failed to publish: ${response.statusText}`);
      return await response.json();
    } catch (error) {
      console.error('Error publishing to Instagram:', error);
      throw error;
    }
  }
}

class LinkedInAPI {
  private accessToken: string = '';
  private organizationId: string = '';
  private baseUrl = 'https://api.linkedin.com/v2';

  async initialize(token: string, organizationId: string): Promise<void> {
    this.accessToken = token;
    this.organizationId = organizationId;
  }

  /**
   * Get real-time organization insights
   */
  async getOrganizationInsights(): Promise<any> {
    try {
      const response = await fetch(
        `${this.baseUrl}/organizationalEntityAcls?q=organization&organization=urn:li:organization:${this.organizationId}`,
        {
          headers: {
            Authorization: `Bearer ${this.accessToken}`,
            'Content-Type': 'application/json',
            'X-Requested-With': 'XMLHttpRequest',
          },
        }
      );

      if (!response.ok) throw new Error(`LinkedIn API error: ${response.statusText}`);
      return await response.json();
    } catch (error) {
      console.error('Error fetching LinkedIn insights:', error);
      throw error;
    }
  }

  /**
   * Publish a post to LinkedIn
   */
  async publishPost(message: string): Promise<any> {
    try {
      const response = await fetch(`${this.baseUrl}/posts`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${this.accessToken}`,
          'Content-Type': 'application/json',
          'X-Requested-With': 'XMLHttpRequest',
        },
        body: JSON.stringify({
          author: `urn:li:organization:${this.organizationId}`,
          lifecycleState: 'PUBLISHED',
          specificContent: {
            'com.linkedin.ugc.Share': {
              shareCommentary: {
                text: message,
              },
              shareMediaCategory: 'NONE',
            },
          },
          visibility: {
            'com.linkedin.ugc.MemberNetworkVisibility': 'PUBLIC',
          },
        }),
      });

      if (!response.ok) throw new Error(`Failed to publish: ${response.statusText}`);
      return await response.json();
    } catch (error) {
      console.error('Error publishing to LinkedIn:', error);
      throw error;
    }
  }
}

class TwitterAPIv2 {
  private bearerToken: string = '';
  private baseUrl = 'https://api.twitter.com/2';

  async initialize(token: string): Promise<void> {
    this.bearerToken = token;
  }

  /**
   * Get real-time tweets and engagement
   */
  async getTweets(userId: string, maxResults = 10): Promise<SocialPost[]> {
    try {
      const response = await fetch(
        `${this.baseUrl}/users/${userId}/tweets?max_results=${maxResults}&tweet.fields=created_at,public_metrics`,
        {
          headers: {
            Authorization: `Bearer ${this.bearerToken}`,
            'Content-Type': 'application/json',
          },
        }
      );

      if (!response.ok) throw new Error(`Twitter API error: ${response.statusText}`);
      const data = await response.json();

      return (data.data || []).map((tweet: any) => ({
        id: tweet.id,
        message: tweet.text,
        createdTime: tweet.created_at,
        engagementMetrics: {
          likes: tweet.public_metrics?.like_count || 0,
          comments: tweet.public_metrics?.reply_count || 0,
          shares: tweet.public_metrics?.retweet_count || 0,
          reactions: tweet.public_metrics?.quote_count || 0,
        },
      }));
    } catch (error) {
      console.error('Error fetching Twitter posts:', error);
      throw error;
    }
  }

  /**
   * Post a tweet in real-time
   */
  async publishTweet(text: string): Promise<any> {
    try {
      const response = await fetch(`${this.baseUrl}/tweets`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${this.bearerToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text }),
      });

      if (!response.ok) throw new Error(`Failed to publish: ${response.statusText}`);
      return await response.json();
    } catch (error) {
      console.error('Error publishing to Twitter:', error);
      throw error;
    }
  }
}

export const facebookAPI = new FacebookGraphAPI();
export const instagramAPI = new InstagramGraphAPI();
export const linkedinAPI = new LinkedInAPI();
export const twitterAPI = new TwitterAPIv2();

export type { SocialPost, SocialAccount };
