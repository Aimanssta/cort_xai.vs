// Google Business Profile OAuth 2.0 Authentication Service

export interface GBPAuthConfig {
  clientId: string;
  clientSecret: string;
  redirectUri: string;
  scopes: string[];
}

export interface GBPTokenResponse {
  accessToken: string;
  refreshToken?: string;
  expiresIn: number;
  tokenType: string;
  expiresAt: number;
}

const GBP_AUTH_ENDPOINT = 'https://accounts.google.com/o/oauth2/v2/auth';
const GBP_TOKEN_ENDPOINT = 'https://oauth2.googleapis.com/token';
const DEFAULT_SCOPES = [
  'https://www.googleapis.com/auth/business.manage',
  'https://www.googleapis.com/auth/userinfo.email',
];

class GBPAuthService {
  private config: GBPAuthConfig;
  private tokenStorage: Map<string, GBPTokenResponse> = new Map();

  constructor(clientId: string, clientSecret: string, redirectUri: string) {
    this.config = {
      clientId,
      clientSecret,
      redirectUri,
      scopes: DEFAULT_SCOPES,
    };
    this.loadTokensFromStorage();
  }

  /**
   * Generate OAuth 2.0 authorization URL
   */
  getAuthorizationUrl(state?: string): string {
    const params = new URLSearchParams({
      client_id: this.config.clientId,
      redirect_uri: this.config.redirectUri,
      response_type: 'code',
      scope: this.config.scopes.join(' '),
      access_type: 'offline',
      state: state || this.generateRandomState(),
      prompt: 'consent',
    });

    return `${GBP_AUTH_ENDPOINT}?${params.toString()}`;
  }

  /**
   * Exchange authorization code for access token
   */
  async exchangeCodeForToken(code: string): Promise<GBPTokenResponse> {
    try {
      const response = await fetch(GBP_TOKEN_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
          client_id: this.config.clientId,
          client_secret: this.config.clientSecret,
          code,
          grant_type: 'authorization_code',
          redirect_uri: this.config.redirectUri,
        }).toString(),
      });

      if (!response.ok) {
        throw new Error(`Token exchange failed: ${response.statusText}`);
      }

      const data = await response.json();
      const tokenResponse: GBPTokenResponse = {
        accessToken: data.access_token,
        refreshToken: data.refresh_token,
        expiresIn: data.expires_in,
        tokenType: data.token_type,
        expiresAt: Date.now() + data.expires_in * 1000,
      };

      this.tokenStorage.set('gbp_token', tokenResponse);
      this.saveTokensToStorage();
      return tokenResponse;
    } catch (error) {
      console.error('Token exchange error:', error);
      throw error;
    }
  }

  /**
   * Refresh access token using refresh token
   */
  async refreshAccessToken(refreshToken?: string): Promise<GBPTokenResponse> {
    const tokenToRefresh = refreshToken || this.getRefreshToken();
    
    if (!tokenToRefresh) {
      throw new Error('No refresh token available');
    }

    try {
      const response = await fetch(GBP_TOKEN_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
          client_id: this.config.clientId,
          client_secret: this.config.clientSecret,
          refresh_token: tokenToRefresh,
          grant_type: 'refresh_token',
        }).toString(),
      });

      if (!response.ok) {
        throw new Error(`Token refresh failed: ${response.statusText}`);
      }

      const data = await response.json();
      const tokenResponse: GBPTokenResponse = {
        accessToken: data.access_token,
        refreshToken: data.refresh_token || tokenToRefresh,
        expiresIn: data.expires_in,
        tokenType: data.token_type,
        expiresAt: Date.now() + data.expires_in * 1000,
      };

      this.tokenStorage.set('gbp_token', tokenResponse);
      this.saveTokensToStorage();
      return tokenResponse;
    } catch (error) {
      console.error('Token refresh error:', error);
      throw error;
    }
  }

  /**
   * Get valid access token, refreshing if needed
   */
  async getValidAccessToken(): Promise<string> {
    const token = this.getAccessToken();
    
    if (!token) {
      throw new Error('No access token available. User must authenticate first.');
    }

    if (this.isTokenExpired()) {
      const refreshedToken = await this.refreshAccessToken();
      return refreshedToken.accessToken;
    }

    return token;
  }

  /**
   * Get stored access token
   */
  getAccessToken(): string | null {
    const token = this.tokenStorage.get('gbp_token');
    return token?.accessToken || null;
  }

  /**
   * Get stored refresh token
   */
  getRefreshToken(): string | null {
    const token = this.tokenStorage.get('gbp_token');
    return token?.refreshToken || null;
  }

  /**
   * Check if current token is expired
   */
  isTokenExpired(): boolean {
    const token = this.tokenStorage.get('gbp_token');
    if (!token) return true;
    return Date.now() > token.expiresAt - 60000; // Refresh 1 minute before expiry
  }

  /**
   * Check if user is authenticated
   */
  isAuthenticated(): boolean {
    return this.getAccessToken() !== null;
  }

  /**
   * Logout and clear tokens
   */
  logout(): void {
    this.tokenStorage.clear();
    localStorage.removeItem('gbp_auth_token');
    localStorage.removeItem('gbp_auth_token_expires');
    localStorage.removeItem('gbp_refresh_token');
  }

  /**
   * Save tokens to local storage
   */
  private saveTokensToStorage(): void {
    const token = this.tokenStorage.get('gbp_token');
    if (token) {
      localStorage.setItem('gbp_auth_token', token.accessToken);
      localStorage.setItem('gbp_auth_token_expires', token.expiresAt.toString());
      if (token.refreshToken) {
        localStorage.setItem('gbp_refresh_token', token.refreshToken);
      }
    }
  }

  /**
   * Load tokens from local storage
   */
  private loadTokensFromStorage(): void {
    const accessToken = localStorage.getItem('gbp_auth_token');
    const expiresAt = localStorage.getItem('gbp_auth_token_expires');
    const refreshToken = localStorage.getItem('gbp_refresh_token');

    if (accessToken && expiresAt) {
      this.tokenStorage.set('gbp_token', {
        accessToken,
        refreshToken: refreshToken || undefined,
        expiresIn: 3600,
        tokenType: 'Bearer',
        expiresAt: parseInt(expiresAt, 10),
      });
    }
  }

  /**
   * Generate random state for CSRF protection
   */
  private generateRandomState(): string {
    return Math.random().toString(36).substring(2, 15) + 
           Math.random().toString(36).substring(2, 15);
  }
}

// Export singleton instance
let authServiceInstance: GBPAuthService;

export const initGBPAuth = (clientId: string, clientSecret: string, redirectUri: string): GBPAuthService => {
  authServiceInstance = new GBPAuthService(clientId, clientSecret, redirectUri);
  return authServiceInstance;
};

export const getGBPAuthService = (): GBPAuthService => {
  if (!authServiceInstance) {
    throw new Error('GBP Auth service not initialized. Call initGBPAuth first.');
  }
  return authServiceInstance;
};

export default GBPAuthService;
