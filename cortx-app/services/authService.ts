/**
 * Authentication Service with Email Login
 * Handles user authentication and business account management
 */

import { BusinessProfile } from '../types';

export interface AuthUser {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  businesses: BusinessProfile[];
  createdAt: string;
  lastLogin: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface SignupData extends LoginCredentials {
  name: string;
}

export type Business = BusinessProfile;

class AuthService {
  private currentUser: AuthUser | null = null;
  private isAuthenticated: boolean = false;
  private authToken: string | null = null;

  constructor() {
    this.loadAuthState();
  }

  /**
   * Sign up with email and password
   */
  async signup(data: SignupData): Promise<AuthUser> {
    try {
      // In production, this would call your backend API
      // For now, using localStorage for demo
      const userId = `user_${Date.now()}`;
      
      const newUser: AuthUser = {
        id: userId,
        email: data.email,
        name: data.name,
        avatar: `https://avatar.example.com/${data.email}`,
        businesses: [],
        createdAt: new Date().toISOString(),
        lastLogin: new Date().toISOString(),
      };

      // Save to localStorage (replace with API call in production)
      localStorage.setItem(`auth_user_${data.email}`, JSON.stringify(newUser));
      localStorage.setItem('currentAuthEmail', data.email);
      
      // Generate auth token
      const token = this.generateToken(data.email);
      localStorage.setItem('authToken', token);

      this.currentUser = newUser;
      this.authToken = token;
      this.isAuthenticated = true;

      return newUser;
    } catch (error) {
      console.error('Signup error:', error);
      throw new Error('Failed to create account');
    }
  }

  /**
   * Login with email and password
   */
  async login(credentials: LoginCredentials): Promise<AuthUser> {
    try {
      // In production, validate against backend
      // For demo: check localStorage
      const savedUser = localStorage.getItem(`auth_user_${credentials.email}`);
      
      if (!savedUser) {
        throw new Error('User not found. Please sign up first.');
      }

      const user: AuthUser = JSON.parse(savedUser);
      
      // In production, verify password hash
      // For demo, accept any non-empty password
      if (!credentials.password) {
        throw new Error('Password required');
      }

      // Update last login
      user.lastLogin = new Date().toISOString();
      localStorage.setItem(`auth_user_${credentials.email}`, JSON.stringify(user));
      localStorage.setItem('currentAuthEmail', credentials.email);

      // Generate auth token
      const token = this.generateToken(credentials.email);
      localStorage.setItem('authToken', token);

      this.currentUser = user;
      this.authToken = token;
      this.isAuthenticated = true;

      return user;
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  }

  /**
   * Logout current user
   */
  logout(): void {
    localStorage.removeItem('authToken');
    localStorage.removeItem('currentAuthEmail');
    this.currentUser = null;
    this.authToken = null;
    this.isAuthenticated = false;
  }

  /**
   * Get current authenticated user
   */
  getCurrentUser(): AuthUser | null {
    return this.currentUser;
  }

  /**
   * Check if user is authenticated
   */
  isLoggedIn(): boolean {
    return this.isAuthenticated && this.authToken !== null;
  }

  /**
   * Get auth token
   */
  getToken(): string | null {
    return this.authToken;
  }

  /**
   * Get Google OAuth login URL from backend
   */
  async getGoogleAuthUrl(): Promise<string> {
    try {
      const API_URL = (import.meta.env as any).VITE_API_URL || 'http://localhost:5000';
      const response = await fetch(`${API_URL}/auth/google-url`, {
        method: 'POST',
      });

      if (!response.ok) throw new Error('Failed to get auth URL');

      const data = await response.json();
      return data.authUrl;
    } catch (error) {
      console.error('Error getting Google auth URL:', error);
      // Fallback: return demo message
      throw new Error('Failed to initialize Google login. Make sure backend is running.');
    }
  }

  /**
   * Handle Google OAuth callback
   */
  async handleGoogleCallback(code: string): Promise<AuthUser> {
    try {
      const API_URL = (import.meta.env as any).VITE_API_URL || 'http://localhost:5000';
      const response = await fetch(`${API_URL}/auth/google-callback`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code }),
      });

      if (!response.ok) throw new Error('Google authentication failed');

      const data = await response.json();
      const { token, user, businesses } = data;

      const newUser: AuthUser = {
        id: `user_${Date.now()}`,
        email: user.email,
        name: user.name,
        businesses: businesses || [],
        createdAt: new Date().toISOString(),
        lastLogin: new Date().toISOString(),
      };

      localStorage.setItem(`auth_user_${user.email}`, JSON.stringify(newUser));
      localStorage.setItem('currentAuthEmail', user.email);
      localStorage.setItem('authToken', token);

      this.currentUser = newUser;
      this.authToken = token;
      this.isAuthenticated = true;

      return newUser;
    } catch (error) {
      console.error('Google callback error:', error);
      throw error;
    }
  }

  /**
   * Get all businesses for current user
   */
  getUserBusinesses(): BusinessProfile[] {
    return this.currentUser?.businesses || [];
  }

  /**
   * Add a business to user's account
   */
  async addBusiness(business: BusinessProfile): Promise<BusinessProfile> {
    if (!this.currentUser) {
      throw new Error('User not authenticated');
    }

    // In production, validate business ownership via API
    try {
      const updatedUser = {
        ...this.currentUser,
        businesses: [...this.currentUser.businesses, business],
      };

      // Save updated user
      localStorage.setItem(
        `auth_user_${this.currentUser.email}`,
        JSON.stringify(updatedUser)
      );

      this.currentUser = updatedUser;
      return business;
    } catch (error) {
      console.error('Error adding business:', error);
      throw new Error('Failed to add business');
    }
  }

  /**
   * Remove a business from user's account
   */
  async removeBusiness(businessId: string): Promise<void> {
    if (!this.currentUser) {
      throw new Error('User not authenticated');
    }

    try {
      const updatedUser = {
        ...this.currentUser,
        businesses: this.currentUser.businesses.filter(b => b.id !== businessId),
      };

      localStorage.setItem(
        `auth_user_${this.currentUser.email}`,
        JSON.stringify(updatedUser)
      );

      this.currentUser = updatedUser;
    } catch (error) {
      console.error('Error removing business:', error);
      throw new Error('Failed to remove business');
    }
  }

  /**
   * Update user profile
   */
  async updateProfile(updates: Partial<AuthUser>): Promise<AuthUser> {
    if (!this.currentUser) {
      throw new Error('User not authenticated');
    }

    try {
      const updatedUser = {
        ...this.currentUser,
        ...updates,
        id: this.currentUser.id, // Prevent ID change
        email: this.currentUser.email, // Prevent email change
      };

      localStorage.setItem(
        `auth_user_${this.currentUser.email}`,
        JSON.stringify(updatedUser)
      );

      this.currentUser = updatedUser;
      return updatedUser;
    } catch (error) {
      console.error('Error updating profile:', error);
      throw new Error('Failed to update profile');
    }
  }

  /**
   * Verify Google Business Profile ownership
   * In production, this would call Google My Business API
   */
  async verifyGBPOwnership(arg1: string, arg2?: string): Promise<boolean> {
    try {
      // Support flexible calling: verifyGBPOwnership(gbpId) or verifyGBPOwnership(email, gbpId)
      const gbpId = arg2 ?? arg1;

      // In production: Call Google API to verify ownership
      // For demo: Accept any GBP ID with a valid format
      if (!gbpId || gbpId.length < 3) {
        return false;
      }

      // Always succeed in demo environment
      return true;
    } catch (error) {
      console.error('Error verifying GBP ownership:', error);
      return false;
    }
  }

  /**
   * Connect business from Google My Business
   * Retrieves list of businesses associated with email
   */
  async connectGBPBusinesses(): Promise<BusinessProfile[]> {
    if (!this.currentUser) {
      throw new Error('User not authenticated');
    }

    try {
      // In production: Call Google My Business API
      // GET https://mybusiness.googleapis.com/v4/accounts/{accountId}/locations
      
      // For demo: Return sample businesses
      const demoBusinesses: BusinessProfile[] = [
        {
          id: 'demo_business_1',
          name: 'Downtown Pizza Place',
          type: 'Restaurant',
          location: 'Downtown, NY',
          color: 'bg-blue-500',
          initials: 'DP',
          isConnected: true,
          lastSync: new Date().toISOString(),
          websiteUrl: 'downtownpizza.example.com',
          socials: { facebook: true, instagram: true }
        },
        {
          id: 'demo_business_2',
          name: 'Brooklyn Cafe',
          type: 'Coffee Shop',
          location: 'Brooklyn, NY',
          color: 'bg-green-500',
          initials: 'BC',
          isConnected: true,
          lastSync: new Date().toISOString(),
          websiteUrl: 'brooklyncafe.example.com',
          socials: { facebook: false, instagram: true }
        },
      ];

      // Add to user if not already present (compare by id)
      const newBusinesses = demoBusinesses.filter(
        db => !this.currentUser!.businesses.find(ub => ub.id === db.id)
      );

      for (const business of newBusinesses) {
        await this.addBusiness(business);
      }

      return this.currentUser.businesses;
    } catch (error) {
      console.error('Error connecting GBP businesses:', error);
      throw new Error('Failed to connect Google Business Profile');
    }
  }

  /**
   * Private: Generate simple auth token
   * In production, use JWT with proper signing
   */
  private generateToken(email: string): string {
    const timestamp = Date.now();
    const randomStr = Math.random().toString(36).substring(2, 15);
    // Use browser-safe base64 when Buffer is not available
    let b64: string;
    try {
      if (typeof btoa === 'function') {
        b64 = btoa(email);
      } else if (typeof Buffer !== 'undefined') {
        // Node environment fallback
        // @ts-ignore
        b64 = Buffer.from(email).toString('base64');
      } else {
        b64 = encodeURIComponent(email);
      }
    } catch (e) {
      b64 = encodeURIComponent(email);
    }

    return `token_${b64}_${timestamp}_${randomStr}`;
  }

  /**
   * Private: Load auth state from localStorage
   */
  private loadAuthState(): void {
    try {
      const token = localStorage.getItem('authToken');
      const email = localStorage.getItem('currentAuthEmail');

      if (token && email) {
        const savedUser = localStorage.getItem(`auth_user_${email}`);
        if (savedUser) {
          this.currentUser = JSON.parse(savedUser);
          this.authToken = token;
          this.isAuthenticated = true;
        }
      }
    } catch (error) {
      console.warn('Error loading auth state:', error);
      this.isAuthenticated = false;
    }
  }

  /**
   * Social login (Google, Facebook, etc.)
   * In production: Integrate with Firebase/Auth0
   */
  async socialLogin(provider: 'google' | 'facebook'): Promise<AuthUser> {
    try {
      // In production: Use Firebase or similar
      throw new Error(`${provider} login not yet implemented`);
    } catch (error) {
      console.error('Social login error:', error);
      throw error;
    }
  }
}

export const authService = new AuthService();
