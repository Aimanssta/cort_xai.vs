import React, { useState } from 'react';
import { SocialMediaAccount, SocialPlatform, Post } from '../types';
import {
  Plus,
  Link,
  Trash2,
  Send,
  Image as ImageIcon,
  AlertCircle,
  CheckCircle2,
  Clock,
  Facebook,
  Instagram,
  Linkedin,
  Twitter,
  Share2,
  Eye,
  Heart,
  MessageCircle,
} from 'lucide-react';

interface SocialMediaManagerProps {
  accounts?: SocialMediaAccount[];
  posts?: Post[];
  onConnectAccount?: (platform: SocialPlatform) => void;
  onDisconnectAccount?: (accountId: string) => void;
  onCreatePost?: (content: string, platforms: SocialPlatform[], mediaUrls?: string[]) => void;
}

const PlatformIcon: React.FC<{ platform: SocialPlatform; size?: number }> = ({ platform, size = 24 }) => {
  const className = `text-${
    platform === 'Facebook' ? 'blue-500' :
    platform === 'Instagram' ? 'pink-500' :
    platform === 'LinkedIn' ? 'blue-400' :
    'sky-400'
  }`;

  switch (platform) {
    case 'Facebook':
      return <Facebook size={size} className="text-blue-500" />;
    case 'Instagram':
      return <Instagram size={size} className="text-pink-500" />;
    case 'LinkedIn':
      return <Linkedin size={size} className="text-blue-400" />;
    case 'Twitter':
      return <Twitter size={size} className="text-sky-400" />;
    default:
      return <Share2 size={size} className="text-gray-400" />;
  }
};

const SocialMediaManager: React.FC<SocialMediaManagerProps> = ({
  accounts = [],
  posts = [],
  onConnectAccount,
  onDisconnectAccount,
  onCreatePost,
}) => {
  const [isCreatingPost, setIsCreatingPost] = useState(false);
  const [postContent, setPostContent] = useState('');
  const [selectedPlatforms, setSelectedPlatforms] = useState<SocialPlatform[]>([]);
  const [charCount, setCharCount] = useState(0);

  const platforms: SocialPlatform[] = ['Facebook', 'Instagram', 'LinkedIn', 'Twitter'];
  const allAvailablePlatforms = ['Facebook', 'Instagram', 'LinkedIn', 'Twitter'] as const;

  const handleContentChange = (text: string) => {
    setPostContent(text);
    setCharCount(text.length);
  };

  const handleCreatePost = () => {
    if (postContent && selectedPlatforms.length > 0) {
      onCreatePost?.(postContent, selectedPlatforms);
      setPostContent('');
      setSelectedPlatforms([]);
      setIsCreatingPost(false);
      setCharCount(0);
    }
  };

  const togglePlatform = (platform: SocialPlatform) => {
    setSelectedPlatforms(prev =>
      prev.includes(platform)
        ? prev.filter(p => p !== platform)
        : [...prev, platform]
    );
  };

  const getConnectedCount = () => accounts.filter(a => a.connected).length;
  const getCharLimit = (): number => {
    if (selectedPlatforms.includes('Twitter')) return 280;
    return 2200;
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white">Social Media Manager</h2>
          <p className="text-gray-400 text-sm mt-1">
            Manage and cross-post content across your social media channels
          </p>
        </div>
        <button
          onClick={() => setIsCreatingPost(!isCreatingPost)}
          className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-medium flex items-center gap-2 transition-all"
        >
          <Plus size={20} />
          New Post
        </button>
      </div>

      {/* Connected Accounts */}
      <div>
        <h3 className="text-lg font-semibold text-white mb-4">Connected Accounts</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {allAvailablePlatforms.map(platform => {
            const account = accounts.find(a => a.platform === platform && a.connected);
            return (
              <div
                key={platform}
                className={`rounded-lg p-4 border transition-all ${
                  account
                    ? 'bg-surface border-surfaceHighlight'
                    : 'bg-surfaceHighlight/30 border-surfaceHighlight/50'
                }`}
              >
                <div className="flex items-center gap-3 mb-3">
                  <PlatformIcon platform={platform} size={28} />
                  <h4 className="text-white font-semibold">{platform}</h4>
                </div>

                {account ? (
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <CheckCircle2 className="text-green-400" size={16} />
                      <p className="text-green-400 text-sm font-medium">Connected</p>
                    </div>
                    <p className="text-gray-400 text-sm mb-3 truncate">@{account.accountName}</p>
                    {account.followers && (
                      <p className="text-gray-400 text-sm mb-3">{account.followers.toLocaleString()} followers</p>
                    )}
                    <button
                      onClick={() => onDisconnectAccount?.(account.id)}
                      className="w-full px-3 py-2 bg-red-600/20 border border-red-500/30 rounded-lg text-red-400 hover:bg-red-600/30 font-medium text-sm transition-all"
                    >
                      Disconnect
                    </button>
                  </div>
                ) : (
                  <div>
                    <p className="text-gray-400 text-sm mb-3">Not connected</p>
                    <button
                      onClick={() => onConnectAccount?.(platform)}
                      className="w-full px-3 py-2 bg-indigo-600/20 border border-indigo-500/30 rounded-lg text-indigo-400 hover:bg-indigo-600/30 font-medium text-sm transition-all flex items-center justify-center gap-2"
                    >
                      <Link size={16} />
                      Connect
                    </button>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {getConnectedCount() === 0 && (
          <div className="bg-yellow-600/10 border border-yellow-500/30 rounded-lg p-4 flex items-start gap-3 mt-4">
            <AlertCircle className="text-yellow-400 flex-shrink-0 mt-0.5" size={20} />
            <div>
              <p className="text-yellow-200 font-medium">No accounts connected</p>
              <p className="text-yellow-100/70 text-sm mt-1">Connect at least one social media account to start posting</p>
            </div>
          </div>
        )}
      </div>

      {/* Create Post */}
      {isCreatingPost && (
        <div className="bg-surface border border-surfaceHighlight rounded-lg p-6 space-y-4">
          <div className="flex items-center gap-2 mb-4">
            <Share2 className="text-indigo-400" size={20} />
            <h3 className="text-lg font-semibold text-white">Create New Post</h3>
          </div>

          {/* Post Content */}
          <div>
            <label className="block text-white font-medium mb-2">Post Content</label>
            <textarea
              value={postContent}
              onChange={(e) => handleContentChange(e.target.value)}
              placeholder="Write your post content here..."
              maxLength={getCharLimit()}
              className="w-full bg-surfaceHighlight border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-indigo-500 resize-none"
              rows={4}
            />
            <div className="flex items-center justify-between mt-2">
              <p className="text-gray-400 text-sm">
                {charCount} / {getCharLimit()} characters
              </p>
              {selectedPlatforms.includes('Twitter') && charCount > 280 && (
                <p className="text-red-400 text-sm">Exceeds Twitter limit</p>
              )}
            </div>
          </div>

          {/* Platform Selection */}
          <div>
            <label className="block text-white font-medium mb-3">Select Platforms</label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
              {allAvailablePlatforms.map(platform => {
                const isConnected = accounts.some(a => a.platform === platform && a.connected);
                return (
                  <button
                    key={platform}
                    onClick={() => isConnected && togglePlatform(platform)}
                    disabled={!isConnected}
                    className={`px-3 py-2 rounded-lg font-medium text-sm transition-all flex items-center justify-center gap-2 ${
                      isConnected
                        ? selectedPlatforms.includes(platform)
                          ? 'bg-indigo-600 text-white'
                          : 'bg-surfaceHighlight text-gray-300 hover:text-white'
                        : 'bg-surfaceHighlight/50 text-gray-500 cursor-not-allowed opacity-50'
                    }`}
                  >
                    <PlatformIcon platform={platform} size={16} />
                    {platform}
                  </button>
                );
              })}
            </div>
            {selectedPlatforms.length === 0 && (
              <p className="text-gray-400 text-sm mt-2">Select at least one platform</p>
            )}
          </div>

          {/* Media Upload */}
          <div>
            <label className="block text-white font-medium mb-2">Add Media</label>
            <div className="border-2 border-dashed border-gray-600 rounded-lg p-4 text-center hover:border-indigo-500 transition-all cursor-pointer">
              <ImageIcon className="mx-auto text-gray-400 mb-2" size={32} />
              <p className="text-gray-400 font-medium">Click to upload images</p>
              <p className="text-gray-500 text-sm mt-1">or drag and drop</p>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-4 border-t border-gray-700">
            <button
              onClick={handleCreatePost}
              disabled={!postContent || selectedPlatforms.length === 0}
              className="flex-1 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-medium disabled:opacity-50 transition-all flex items-center justify-center gap-2"
            >
              <Send size={18} />
              Post to {selectedPlatforms.length} Platform{selectedPlatforms.length !== 1 ? 's' : ''}
            </button>
            <button
              onClick={() => setIsCreatingPost(false)}
              className="px-4 py-2 bg-surfaceHighlight text-gray-300 rounded-lg font-medium hover:text-white transition-all"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Recent Posts */}
      <div>
        <h3 className="text-lg font-semibold text-white mb-4">Recent Posts</h3>
        {posts && posts.length > 0 ? (
          <div className="space-y-3">
            {posts.slice(0, 5).map(post => (
              <div key={post.id} className="bg-surface border border-surfaceHighlight rounded-lg p-4">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <PlatformIcon platform={post.platform} size={24} />
                    <div>
                      <h4 className="text-white font-semibold">{post.platform}</h4>
                      <p className="text-gray-400 text-sm">
                        {post.status === 'Published' ? '✓ Published' : '⏱ Scheduled'}
                      </p>
                    </div>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    post.status === 'Published'
                      ? 'bg-green-600/20 text-green-300'
                      : 'bg-yellow-600/20 text-yellow-300'
                  }`}>
                    {post.status}
                  </span>
                </div>

                <p className="text-gray-300 mb-3 line-clamp-3">{post.content}</p>

                {post.imageUrl && (
                  <img
                    src={post.imageUrl}
                    alt="Post"
                    className="w-full max-h-40 object-cover rounded-lg mb-3"
                  />
                )}

                <div className="flex items-center gap-4 text-sm text-gray-400 pt-2 border-t border-gray-700">
                  <div className="flex items-center gap-1">
                    <Eye size={16} />
                    {post.views || 0} views
                  </div>
                  <div className="flex items-center gap-1">
                    <Heart size={16} />
                    {Math.floor(Math.random() * 100)} likes
                  </div>
                  <div className="flex items-center gap-1">
                    <MessageCircle size={16} />
                    {Math.floor(Math.random() * 30)} comments
                  </div>
                  <p className="ml-auto text-xs">
                    {new Date(post.date).toLocaleDateString()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-surface border border-surfaceHighlight rounded-lg p-8 text-center">
            <Share2 className="mx-auto text-gray-500 mb-3" size={32} />
            <p className="text-gray-400">No posts yet</p>
            <p className="text-gray-500 text-sm mt-1">Create your first post to start engaging with your audience</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SocialMediaManager;
