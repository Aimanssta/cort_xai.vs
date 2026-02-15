// Social Media Integration Service
import { SocialMediaAccount, Post, SocialPlatform } from '../types';

export interface SocialMediaCredentials {
  platform: SocialPlatform;
  accountId: string;
  accessToken: string;
  refreshToken?: string;
  expiresAt?: string;
  accountName: string;
}

class SocialMediaService {
  private accounts: Map<string, SocialMediaAccount> = new Map();

  constructor() {
    this.loadAccountsFromStorage();
  }

  /**
   * Connect a social media account
   */
  async connectAccount(credentials: SocialMediaCredentials, businessProfileId: string): Promise<SocialMediaAccount> {
    try {
      // Verify account credentials by making a test API call
      await this.verifyAccountCredentials(credentials);

      const account: SocialMediaAccount = {
        id: `${credentials.platform}_${credentials.accountId}`,
        businessProfileId,
        platform: credentials.platform,
        accountName: credentials.accountName,
        accountId: credentials.accountId,
        accessToken: credentials.accessToken,
        refreshToken: credentials.refreshToken,
        expiresAt: credentials.expiresAt,
        connected: true,
        followers: 0,
        lastSync: new Date().toISOString(),
      };

      this.accounts.set(account.id, account);
      this.saveAccountsToStorage();

      return account;
    } catch (error) {
      console.error('Error connecting social media account:', error);
      throw error;
    }
  }

  /**
   * Disconnect a social media account
   */
  disconnectAccount(accountId: string): void {
    this.accounts.delete(accountId);
    this.saveAccountsToStorage();
  }

  /**
   * Get connected accounts for a business profile
   */
  getConnectedAccounts(businessProfileId: string): SocialMediaAccount[] {
    return Array.from(this.accounts.values()).filter(
      account => account.businessProfileId === businessProfileId
    );
  }

  /**
   * Post content to a social media platform
   */
  async postToSocialMedia(
    accountId: string,
    content: string,
    mediaUrls?: string[],
    hashTags?: string[]
  ): Promise<Post> {
    const account = this.accounts.get(accountId);
    if (!account || !account.connected) {
      throw new Error(`Account ${accountId} not found or not connected`);
    }

    try {
      let fullContent = content;
      if (hashTags && hashTags.length > 0) {
        fullContent += '\n\n' + hashTags.map(tag => `#${tag}`).join(' ');
      }

      const postData = await this.publishToApi(
        account,
        fullContent,
        mediaUrls
      );

      const post: Post = {
        id: postData.id,
        content: content,
        date: new Date().toISOString(),
        status: 'Published',
        imageUrl: mediaUrls?.[0],
        platform: account.platform,
      };

      return post;
    } catch (error) {
      console.error(`Error posting to ${account.platform}:`, error);
      throw error;
    }
  }

  /**
   * Cross-post to multiple platforms
   */
  async crossPost(
    businessProfileId: string,
    content: string,
    platforms: SocialPlatform[],
    mediaUrls?: string[]
  ): Promise<Map<string, Post>> {
    const results = new Map<string, Post>();
    const accounts = this.getConnectedAccounts(businessProfileId);

    for (const platform of platforms) {
      const account = accounts.find(a => a.platform === platform);
      if (!account) continue;

      try {
        const post = await this.postToSocialMedia(
          account.id,
          this.formatContentForPlatform(content, platform),
          mediaUrls
        );
        results.set(platform, post);
      } catch (error) {
        console.error(`Failed to post to ${platform}:`, error);
      }
    }

    return results;
  }

  /**
   * Format content for specific platform requirements
   */
  private formatContentForPlatform(content: string, platform: SocialPlatform): string {
    switch (platform) {
      case 'Twitter':
        // Truncate to 280 characters for Twitter
        return content.substring(0, 280);
      case 'LinkedIn':
        // Keep professional tone for LinkedIn
        return content;
      case 'Instagram':
        // Can use full content, UI handles hashtags
        return content;
      case 'Facebook':
        // Keep full content
        return content;
      default:
        return content;
    }
  }

  /**
   * Refresh access token for a platform
   */
  async refreshAccessToken(accountId: string): Promise<void> {
    const account = this.accounts.get(accountId);
    if (!account || !account.refreshToken) {
      throw new Error(`Account ${accountId} not found or no refresh token available`);
    }

    try {
      const newToken = await this.getNewAccessToken(
        account.platform,
        account.refreshToken
      );

      account.accessToken = newToken.accessToken;
      if (newToken.expiresAt) {
        account.expiresAt = newToken.expiresAt;
      }

      this.accounts.set(accountId, account);
      this.saveAccountsToStorage();
    } catch (error) {
      console.error(`Error refreshing token for ${accountId}:`, error);
      account.connected = false;
      this.accounts.set(accountId, account);
      this.saveAccountsToStorage();
      throw error;
    }
  }

  /**
   * Get OAuth authorization URL for a platform
   */
  getOAuthUrl(platform: SocialPlatform, redirectUri: string): string {
    const configs: Record<SocialPlatform, { clientId: string; scope: string; endpoint: string }> = {
      Facebook: {
        clientId: import.meta.env.VITE_FACEBOOK_APP_ID || '',
        scope: 'pages_manage_posts,pages_read_engagement',
        endpoint: 'https://www.facebook.com/v18.0/dialog/oauth',
      },
      Instagram: {
        clientId: import.meta.env.VITE_INSTAGRAM_APP_ID || '',
        scope: 'instagram_business_content_publish,instagram_business_manage_messages',
        endpoint: 'https://api.instagram.com/oauth/authorize',
      },
      LinkedIn: {
        clientId: import.meta.env.VITE_LINKEDIN_CLIENT_ID || '',
        scope: 'w_member_social,r_liteprofile',
        endpoint: 'https://www.linkedin.com/oauth/v2/authorization',
      },
      Twitter: {
        clientId: import.meta.env.VITE_TWITTER_API_KEY || '',
        scope: 'tweet.write tweet.read users.read',
        endpoint: 'https://twitter.com/i/oauth2/authorize',
      },
      Google: {
        clientId: '',
        scope: '',
        endpoint: '',
      },
    };

    const config = configs[platform];
    if (!config.clientId) {
      throw new Error(`${platform} OAuth not configured`);
    }

    const params = new URLSearchParams({
      client_id: config.clientId,
      redirect_uri: redirectUri,
      response_type: 'code',
      scope: config.scope,
      state: Math.random().toString(36).substring(7),
    });

    return `${config.endpoint}?${params.toString()}`;
  }

  /**
   * Verify account credentials (test API call)
   */
  private async verifyAccountCredentials(credentials: SocialMediaCredentials): Promise<void> {
    // In production, make an actual API call to verify the credentials
    // For now, we'll just validate the token format
    if (!credentials.accessToken || credentials.accessToken.length < 10) {
      throw new Error('Invalid access token');
    }
  }

  /**
   * Publish to API (mock implementation)
   */
  private async publishToApi(
    account: SocialMediaAccount,
    content: string,
    mediaUrls?: string[]
  ): Promise<{ id: string }> {
    // In production, this would make actual API calls to each platform
    // For demo purposes, we're returning a mock response
    return {
      id: `${account.platform}_${Date.now()}`,
    };
  }

  /**
   * Get new access token from refresh token
   */
  private async getNewAccessToken(
    platform: SocialPlatform,
    refreshToken: string
  ): Promise<{ accessToken: string; expiresAt?: string }> {
    // In production, this would make actual token refresh API calls
    // For now, return mock data
    return {
      accessToken: refreshToken, // In production, would be a new token
      expiresAt: new Date(Date.now() + 3600000).toISOString(),
    };
  }

  /**
   * Load accounts from storage
   */
  private loadAccountsFromStorage(): void {
    const stored = localStorage.getItem('social_media_accounts');
    if (stored) {
      try {
        const accounts = JSON.parse(stored) as SocialMediaAccount[];
        accounts.forEach(account => {
          this.accounts.set(account.id, account);
        });
      } catch (error) {
        console.error('Error loading accounts:', error);
      }
    }
  }

  /**
   * Save accounts to storage
   */
  private saveAccountsToStorage(): void {
    const accounts = Array.from(this.accounts.values());
    localStorage.setItem('social_media_accounts', JSON.stringify(accounts));
  }
}

export const socialMediaService = new SocialMediaService();
export default socialMediaService;
