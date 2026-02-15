import React, { useState } from 'react';
import { PostScheduleTemplate, AutomatedPost, SocialPlatform } from '../types';
import {
  Calendar,
  Clock,
  Send,
  Plus,
  Trash2,
  Edit2,
  ToggleLeft,
  ToggleRight,
  Sparkles,
  AlertCircle,
} from 'lucide-react';

interface PostSchedulerProps {
  schedules?: PostScheduleTemplate[];
  onCreateSchedule?: (template: Omit<PostScheduleTemplate, 'id'>) => void;
  onUpdateSchedule?: (id: string, updates: Partial<PostScheduleTemplate>) => void;
  onDeleteSchedule?: (id: string) => void;
  onGeneratePost?: (topic: string, platforms: SocialPlatform[]) => void;
}

const PostScheduler: React.FC<PostSchedulerProps> = ({
  schedules = [],
  onCreateSchedule,
  onUpdateSchedule,
  onDeleteSchedule,
  onGeneratePost,
}) => {
  const [isCreating, setIsCreating] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<'promotional' | 'educational' | 'engagement' | 'seasonal'>('promotional');
  const [contentTemplate, setContentTemplate] = useState('');
  const [selectedPlatforms, setSelectedPlatforms] = useState<SocialPlatform[]>(['Google']);
  const [frequency, setFrequency] = useState<'daily' | 'weekly'>('daily');
  const [timeOfDay, setTimeOfDay] = useState('09:00');
  const [dayOfWeek, setDayOfWeek] = useState(0);
  const [editingId, setEditingId] = useState<string | null>(null);

  const platforms: SocialPlatform[] = ['Google', 'Facebook', 'Instagram', 'LinkedIn', 'Twitter'];
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  const categoryTopics: Record<'promotional' | 'educational' | 'engagement' | 'seasonal', string[]> = {
    promotional: [
      'Feature a special offer or discount',
      'Highlight a new product or service',
      'Announce a limited-time promotion',
    ],
    educational: [
      'Share industry tips and best practices',
      'Explain how to use your services',
      'Provide step-by-step guides',
    ],
    engagement: [
      'Ask a question to your community',
      'Share behind-the-scenes content',
      'Host a Q&A session',
    ],
    seasonal: [
      'Holiday-themed content',
      'Seasonal product recommendations',
      'Weather-related tips',
    ],
  };

  const handleCreateSchedule = () => {
    if (contentTemplate && selectedPlatforms.length > 0) {
      onCreateSchedule?.({
        name: `${selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1)} Post`,
        contentTemplate,
        frequency,
        dayOfWeek: frequency === 'weekly' ? dayOfWeek : undefined,
        timeOfDay,
        platforms: selectedPlatforms,
        category: selectedCategory,
        active: true,
      });

      // Reset form
      setContentTemplate('');
      setSelectedPlatforms(['Google']);
      setIsCreating(false);
    }
  };

  const handleToggleActive = (id: string, current: boolean) => {
    onUpdateSchedule?.(id, { active: !current });
  };

  const togglePlatform = (platform: SocialPlatform) => {
    setSelectedPlatforms(prev =>
      prev.includes(platform)
        ? prev.filter(p => p !== platform)
        : [...prev, platform]
    );
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white">Daily Post Scheduler</h2>
          <p className="text-gray-400 text-sm mt-1">
            Create automated daily posts for your Google Business Profile and social media channels
          </p>
        </div>
        <button
          onClick={() => setIsCreating(!isCreating)}
          className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-medium flex items-center gap-2 transition-all"
        >
          <Plus size={20} />
          New Schedule
        </button>
      </div>

      {/* Create/Edit Form */}
      {isCreating && (
        <div className="bg-surface border border-surfaceHighlight rounded-lg p-6 space-y-6">
          <div className="flex items-center gap-2 mb-4">
            <Sparkles className="text-indigo-400" size={20} />
            <h3 className="text-lg font-semibold text-white">Create New Post Schedule</h3>
          </div>

          {/* Category Selection */}
          <div>
            <label className="block text-white font-medium mb-3">Post Category</label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
              {(['promotional', 'educational', 'engagement', 'seasonal'] as const).map(cat => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-lg font-medium transition-all ${
                    selectedCategory === cat
                      ? 'bg-indigo-600 text-white'
                      : 'bg-surfaceHighlight text-gray-300 hover:text-white'
                  }`}
                >
                  {cat.charAt(0).toUpperCase() + cat.slice(1)}
                </button>
              ))}
            </div>
          </div>

          {/* Content Template */}
          <div>
            <label className="block text-white font-medium mb-2">Content Template / Topic</label>
            <textarea
              value={contentTemplate}
              onChange={(e) => setContentTemplate(e.target.value)}
              placeholder="Describe your post topic or use a template from the suggestions below..."
              className="w-full bg-surfaceHighlight border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-indigo-500 resize-none"
              rows={4}
            />
            <p className="text-gray-400 text-sm mt-2">Suggested topics:</p>
            <div className="flex flex-wrap gap-2 mt-2">
              {categoryTopics[selectedCategory].map((topic, idx) => (
                <button
                  key={idx}
                  onClick={() => setContentTemplate(topic)}
                  className="px-3 py-1 bg-indigo-600/10 border border-indigo-500/30 rounded-full text-sm text-indigo-400 hover:bg-indigo-600/20 transition-all"
                >
                  {topic}
                </button>
              ))}
            </div>
          </div>

          {/* Scheduling */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-white font-medium mb-2">Frequency</label>
              <select
                value={frequency}
                onChange={(e) => setFrequency(e.target.value as 'daily' | 'weekly')}
                className="w-full bg-surfaceHighlight border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-indigo-500"
              >
                <option value="daily">Daily</option>
                <option value="weekly">Weekly</option>
              </select>
            </div>

            <div>
              <label className="block text-white font-medium mb-2">Time of Day</label>
              <div className="flex items-center gap-2">
                <Clock size={18} className="text-gray-400" />
                <input
                  type="time"
                  value={timeOfDay}
                  onChange={(e) => setTimeOfDay(e.target.value)}
                  className="w-full bg-surfaceHighlight border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-indigo-500"
                />
              </div>
            </div>

            {frequency === 'weekly' && (
              <div className="md:col-span-2">
                <label className="block text-white font-medium mb-2">Day of Week</label>
                <div className="grid grid-cols-7 gap-2">
                  {days.map((day, idx) => (
                    <button
                      key={idx}
                      onClick={() => setDayOfWeek(idx)}
                      className={`py-2 rounded-lg font-medium text-sm transition-all ${
                        dayOfWeek === idx
                          ? 'bg-indigo-600 text-white'
                          : 'bg-surfaceHighlight text-gray-300 hover:text-white'
                      }`}
                    >
                      {day.slice(0, 3)}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Platform Selection */}
          <div>
            <label className="block text-white font-medium mb-3">Posting Platforms</label>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
              {platforms.map(platform => (
                <button
                  key={platform}
                  onClick={() => togglePlatform(platform)}
                  className={`px-3 py-2 rounded-lg font-medium text-sm transition-all ${
                    selectedPlatforms.includes(platform)
                      ? 'bg-indigo-600 text-white'
                      : 'bg-surfaceHighlight text-gray-300 hover:text-white'
                  }`}
                >
                  {platform}
                </button>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-4 border-t border-gray-700">
            <button
              onClick={handleCreateSchedule}
              disabled={!contentTemplate || selectedPlatforms.length === 0}
              className="flex-1 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-medium disabled:opacity-50 transition-all flex items-center justify-center gap-2"
            >
              <Send size={18} />
              Create Schedule
            </button>
            <button
              onClick={() => setIsCreating(false)}
              className="px-4 py-2 bg-surfaceHighlight text-gray-300 rounded-lg font-medium hover:text-white transition-all"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Quick Post Generator */}
      <div className="bg-indigo-600/10 border border-indigo-500/30 rounded-lg p-4 flex items-start gap-3">
        <AlertCircle className="text-indigo-400 flex-shrink-0 mt-0.5" size={20} />
        <div className="flex-1">
          <p className="text-indigo-200 font-medium">AI-Powered Content Generation</p>
          <p className="text-indigo-100/70 text-sm mt-1">
            Each schedule uses AI to generate unique, optimized content for your selected topic and platforms automatically.
          </p>
        </div>
      </div>

      {/* Active Schedules */}
      <div>
        <h3 className="text-lg font-semibold text-white mb-4">Active Schedules</h3>
        {schedules && schedules.length > 0 ? (
          <div className="space-y-3">
            {schedules.map(schedule => (
              <div
                key={schedule.id}
                className="bg-surface border border-surfaceHighlight rounded-lg p-4 flex items-start justify-between"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h4 className="text-white font-semibold">{schedule.name}</h4>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      schedule.category === 'promotional' ? 'bg-blue-600/20 text-blue-300' :
                      schedule.category === 'educational' ? 'bg-green-600/20 text-green-300' :
                      schedule.category === 'engagement' ? 'bg-purple-600/20 text-purple-300' :
                      'bg-orange-600/20 text-orange-300'
                    }`}>
                      {schedule.category}
                    </span>
                  </div>
                  <p className="text-gray-400 text-sm line-clamp-2 mb-3">{schedule.contentTemplate}</p>
                  <div className="flex flex-wrap gap-3 text-sm">
                    <div className="flex items-center gap-1 text-gray-400">
                      <Calendar size={16} />
                      {schedule.frequency === 'daily' ? 'Daily' : `Weekly on ${['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'][schedule.dayOfWeek || 0]}`}
                    </div>
                    <div className="flex items-center gap-1 text-gray-400">
                      <Clock size={16} />
                      {schedule.timeOfDay}
                    </div>
                    <div className="flex gap-1 flex-wrap">
                      {schedule.platforms.map(p => (
                        <span key={p} className="px-2 py-0.5 bg-indigo-600/20 text-indigo-300 rounded text-xs">
                          {p}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 ml-4">
                  <button
                    onClick={() => handleToggleActive(schedule.id, schedule.active)}
                    className="p-2 hover:bg-surfaceHighlight rounded-lg transition-all"
                  >
                    {schedule.active ? (
                      <ToggleRight className="text-green-400" size={20} />
                    ) : (
                      <ToggleLeft className="text-gray-500" size={20} />
                    )}
                  </button>
                  <button
                    onClick={() => setEditingId(schedule.id)}
                    className="p-2 hover:bg-surfaceHighlight rounded-lg transition-all text-blue-400"
                  >
                    <Edit2 size={18} />
                  </button>
                  <button
                    onClick={() => onDeleteSchedule?.(schedule.id)}
                    className="p-2 hover:bg-surfaceHighlight rounded-lg transition-all text-red-400"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-surface border border-surfaceHighlight rounded-lg p-8 text-center">
            <Calendar className="mx-auto text-gray-500 mb-3" size={32} />
            <p className="text-gray-400">No schedules created yet</p>
            <p className="text-gray-500 text-sm mt-1">Create your first schedule to automate daily posts</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PostScheduler;
