// Post Automation Service - AI-powered daily post scheduling
import { generateMarketingPost } from './geminiService';
import { AutomatedPost, PostScheduleTemplate, SocialPlatform } from '../types';
import gbpDataService from './gbpDataService';

class PostAutomationService {
  private schedules: Map<string, PostScheduleTemplate> = new Map();
  private activeJobs: Map<string, ReturnType<typeof setTimeout>> = new Map();

  constructor() {
    this.loadSchedulesFromStorage();
  }

  /**
   * Create a new post schedule template
   */
  async createScheduleTemplate(template: Omit<PostScheduleTemplate, 'id'>): Promise<PostScheduleTemplate> {
    const id = `schedule_${Date.now()}`;
    const fullTemplate: PostScheduleTemplate = {
      ...template,
      id,
    };

    this.schedules.set(id, fullTemplate);
    this.saveSchedulesToStorage();

    if (template.active) {
      this.startScheduleJob(id);
    }

    return fullTemplate;
  }

  /**
   * Get all schedule templates
   */
  getScheduleTemplates(): PostScheduleTemplate[] {
    return Array.from(this.schedules.values());
  }

  /**
   * Get schedule template by ID
   */
  getScheduleTemplate(id: string): PostScheduleTemplate | undefined {
    return this.schedules.get(id);
  }

  /**
   * Update schedule template
   */
  updateScheduleTemplate(id: string, updates: Partial<PostScheduleTemplate>): PostScheduleTemplate {
    const template = this.schedules.get(id);
    if (!template) throw new Error(`Schedule ${id} not found`);

    const updated = { ...template, ...updates };

    if (template.active && !updated.active) {
      this.stopScheduleJob(id);
    } else if (!template.active && updated.active) {
      this.startScheduleJob(id);
    }

    this.schedules.set(id, updated);
    this.saveSchedulesToStorage();
    return updated;
  }

  /**
   * Delete schedule template
   */
  deleteScheduleTemplate(id: string): void {
    this.stopScheduleJob(id);
    this.schedules.delete(id);
    this.saveSchedulesToStorage();
  }

  /**
   * Generate and publish a post immediately
   */
  async generateAndPublishPost(
    topic: string,
    businessProfileId: string,
    platforms: SocialPlatform[],
    businessName: string,
    contentTemplate?: string
  ): Promise<AutomatedPost> {
    try {
      // Generate content using AI
      const generatedContent = await generateMarketingPost(
        contentTemplate || topic,
        businessName,
        platforms[0] || 'Google'
      );

      // Create post on GBP (first platform is typically Google)
      const [accountId, locationId] = businessProfileId.split('/');
      const post = await gbpDataService.createPost(
        accountId,
        locationId,
        generatedContent,
        [],
        undefined
      );

      return post;
    } catch (error) {
      console.error('Error generating and publishing post:', error);
      throw error;
    }
  }

  /**
   * Schedule a post for future publishing
   */
  async schedulePost(
    topic: string,
    businessProfileId: string,
    platforms: SocialPlatform[],
    businessName: string,
    scheduledTime: Date,
    contentTemplate?: string
  ): Promise<AutomatedPost> {
    try {
      // Generate content using AI
      const generatedContent = await generateMarketingPost(
        contentTemplate || topic,
        businessName,
        platforms[0] || 'Google'
      );

      // For now, we'll create a draft post
      // In production, this would use the Post Resource API with scheduleAction
      const post: AutomatedPost = {
        id: `post_${Date.now()}`,
        businessProfileId,
        contentTemplate: contentTemplate || topic,
        scheduledTime: scheduledTime.toISOString(),
        status: 'scheduled',
        platforms,
        generatedContent,
        mediaUrls: [],
        createdAt: new Date().toISOString(),
      };

      // Store scheduled post
      this.saveScheduledPost(post);

      return post;
    } catch (error) {
      console.error('Error scheduling post:', error);
      throw error;
    }
  }

  /**
   * Start a schedule job
   */
  private startScheduleJob(scheduleId: string): void {
    const template = this.schedules.get(scheduleId);
    if (!template) return;

    if (this.activeJobs.has(scheduleId)) {
      this.stopScheduleJob(scheduleId);
    }

    const executeSchedule = async () => {
      try {
        console.log(`Executing scheduled post: ${scheduleId}`);
        // In production, this would actually publish the post
        // For now, just log the execution
      } catch (error) {
        console.error(`Error executing schedule ${scheduleId}:`, error);
      }
    };

    // Calculate next execution time
    const nextExecTime = this.calculateNextExecutionTime(template);
    const delayMs = nextExecTime.getTime() - Date.now();

    if (delayMs > 0) {
      const timeoutId = setTimeout(() => {
        executeSchedule();
        
        // For daily/weekly schedules, set up recurring execution
        if (template.frequency === 'daily') {
          const intervalId = setInterval(executeSchedule, 24 * 60 * 60 * 1000);
          this.activeJobs.set(scheduleId, intervalId);
        } else if (template.frequency === 'weekly') {
          const intervalId = setInterval(executeSchedule, 7 * 24 * 60 * 60 * 1000);
          this.activeJobs.set(scheduleId, intervalId);
        }
      }, delayMs);

      this.activeJobs.set(scheduleId, timeoutId);
    }
  }

  /**
   * Stop a schedule job
   */
  private stopScheduleJob(scheduleId: string): void {
    const jobId = this.activeJobs.get(scheduleId);
    if (jobId) {
      clearTimeout(jobId);
      clearInterval(jobId);
      this.activeJobs.delete(scheduleId);
    }
  }

  /**
   * Calculate next execution time for a schedule
   */
  private calculateNextExecutionTime(template: PostScheduleTemplate): Date {
    const now = new Date();
    const next = new Date();

    if (template.frequency === 'daily') {
      const [hours, minutes] = (template.timeOfDay || '09:00').split(':').map(Number);
      next.setHours(hours, minutes, 0, 0);
      
      if (next <= now) {
        next.setDate(next.getDate() + 1);
      }
    } else if (template.frequency === 'weekly' && template.dayOfWeek !== undefined) {
      const currentDay = now.getDay();
      const targetDay = template.dayOfWeek;
      const daysUntilTarget = (targetDay - currentDay + 7) % 7 || 7;
      
      next.setDate(next.getDate() + daysUntilTarget);
      const [hours, minutes] = (template.timeOfDay || '09:00').split(':').map(Number);
      next.setHours(hours, minutes, 0, 0);
      
      if (next <= now) {
        next.setDate(next.getDate() + 7);
      }
    }

    return next;
  }

  /**
   * Get suggested post topics based on category
   */
  getPostTopicSuggestions(category: 'promotional' | 'educational' | 'engagement' | 'seasonal'): string[] {
    const suggestions: Record<string, string[]> = {
      promotional: [
        'Feature a special offer or discount',
        'Highlight a new product or service',
        'Announce a limited-time promotion',
        'Showcase customer success stories',
      ],
      educational: [
        'Share industry tips and best practices',
        'Explain how to use your services',
        'Share industry news and insights',
        'Provide step-by-step guides',
      ],
      engagement: [
        'Ask a question to your community',
        'Share behind-the-scenes content',
        'Host a Q&A session',
        'Create a poll or survey',
      ],
      seasonal: [
        'Holiday-themed content',
        'Seasonal product recommendations',
        'Weather-related tips',
        'Upcoming event announcements',
      ],
    };

    return suggestions[category] || [];
  }

  /**
   * Save scheduled posts to storage
   */
  private saveScheduledPost(post: AutomatedPost): void {
    const posts = JSON.parse(localStorage.getItem('scheduled_posts') || '[]');
    posts.push(post);
    localStorage.setItem('scheduled_posts', JSON.stringify(posts));
  }

  /**
   * Load schedules from storage
   */
  private loadSchedulesFromStorage(): void {
    const stored = localStorage.getItem('post_schedules');
    if (stored) {
      try {
        const schedules = JSON.parse(stored) as PostScheduleTemplate[];
        schedules.forEach(schedule => {
          this.schedules.set(schedule.id, schedule);
          if (schedule.active) {
            this.startScheduleJob(schedule.id);
          }
        });
      } catch (error) {
        console.error('Error loading schedules:', error);
      }
    }
  }

  /**
   * Save schedules to storage
   */
  private saveSchedulesToStorage(): void {
    const schedules = Array.from(this.schedules.values());
    localStorage.setItem('post_schedules', JSON.stringify(schedules));
  }
}

export const postAutomationService = new PostAutomationService();
export default postAutomationService;
