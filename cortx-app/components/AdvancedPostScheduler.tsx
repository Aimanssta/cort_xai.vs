import React, { useState, useEffect } from 'react';
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
  MapPin,
  Target,
  TrendingUp,
} from 'lucide-react';
import {
  discoverLocationKeywords,
  generateKeywordTargetedPost,
  generateMultiAreaContentCalendar,
  analyzeKeywordGaps,
  generateLocationHashtags,
  analyzePostOptimization,
  type ServingArea,
  type LocationKeywordCluster,
  type OptimizedPost,
} from '../services/advancedContentGeneration';
import { SocialPlatform } from '../types';

interface AdvancedPostSchedulerProps {
  businessName?: string;
  businessType?: string;
  servingAreas?: ServingArea[];
}

const AdvancedPostScheduler: React.FC<AdvancedPostSchedulerProps> = ({
  businessName = 'Your Business',
  businessType = 'Local Service',
  servingAreas = [
    { name: 'Downtown', zipCodes: ['10001'], radius: 2 },
    { name: 'Uptown', zipCodes: ['10028'], radius: 2 },
    { name: 'Brooklyn', zipCodes: ['11201'], radius: 3 },
  ],
}) => {
  const [activeTab, setActiveTab] = useState<'discover' | 'generate' | 'calendar' | 'analyze'>('discover');
  const [keywordClusters, setKeywordClusters] = useState<LocationKeywordCluster[]>([]);
  const [generatedPosts, setGeneratedPosts] = useState<OptimizedPost[]>([]);
  const [selectedArea, setSelectedArea] = useState<string>(servingAreas[0]?.name || '');
  const [selectedPlatform, setSelectedPlatform] = useState<SocialPlatform>('Google');
  const [loading, setLoading] = useState(false);
  const [contentAnalysis, setContentAnalysis] = useState<any>(null);
  const [previewPost, setPreviewPost] = useState<string>('');

  // Discover keywords for all serving areas
  const handleDiscoverKeywords = async () => {
    try {
      setLoading(true);
      const clusters = await discoverLocationKeywords(businessType, servingAreas);
      setKeywordClusters(clusters);
    } catch (error) {
      console.error('Error discovering keywords:', error);
    } finally {
      setLoading(false);
    }
  };

  // Generate single post for selected area
  const handleGeneratePost = async () => {
    if (!selectedArea || keywordClusters.length === 0) return;

    try {
      setLoading(true);
      const post = await generateKeywordTargetedPost(
        businessName,
        businessType,
        keywordClusters,
        selectedArea,
        selectedPlatform
      );
      setGeneratedPosts(prev => [post, ...prev]);
      setPreviewPost(post.content);
    } catch (error) {
      console.error('Error generating post:', error);
    } finally {
      setLoading(false);
    }
  };

  // Generate calendar for all areas
  const handleGenerateCalendar = async () => {
    if (keywordClusters.length === 0) return;

    try {
      setLoading(true);
      const areaNames = servingAreas.map(a => a.name);
      const calendar = await generateMultiAreaContentCalendar(
        businessName,
        businessType,
        keywordClusters,
        areaNames,
        30,
        selectedPlatform
      );
      setGeneratedPosts(calendar);
    } catch (error) {
      console.error('Error generating calendar:', error);
    } finally {
      setLoading(false);
    }
  };

  // Analyze keyword gaps
  const handleAnalyzeGaps = async () => {
    try {
      setLoading(true);
      const gaps = await analyzeKeywordGaps(businessType, servingAreas);
      setContentAnalysis({ gaps });
    } catch (error) {
      console.error('Error analyzing gaps:', error);
    } finally {
      setLoading(false);
    }
  };

  // Analyze post optimization
  const handleAnalyzePost = async (post: OptimizedPost) => {
    try {
      setLoading(true);
      const analysis = await analyzePostOptimization(
        post.content,
        post.keywords,
        selectedPlatform
      );
      setContentAnalysis(analysis);
    } catch (error) {
      console.error('Error analyzing post:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white">Advanced Content Strategy</h2>
          <p className="text-gray-400 text-sm mt-1">
            AI-powered multi-keyword targeting for serving areas
          </p>
        </div>
        <div className="flex items-center gap-2 bg-blue-600/20 border border-blue-500/30 rounded-lg px-4 py-2">
          <Target size={20} className="text-blue-400" />
          <span className="text-blue-300 font-medium">Semrush-Style Strategy</span>
        </div>
      </div>

      {/* Serving Areas Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {servingAreas.map(area => (
          <div
            key={area.name}
            className={`p-4 rounded-lg border cursor-pointer transition-all ${
              selectedArea === area.name
                ? 'bg-indigo-600/20 border-indigo-500'
                : 'bg-surface border-surfaceHighlight hover:border-indigo-500/50'
            }`}
            onClick={() => setSelectedArea(area.name)}
          >
            <div className="flex items-center gap-2 mb-2">
              <MapPin size={18} className="text-indigo-400" />
              <h3 className="text-white font-semibold">{area.name}</h3>
            </div>
            {area.zipCodes && (
              <p className="text-gray-400 text-sm">ZIP: {area.zipCodes.join(', ')}</p>
            )}
            {area.radius && <p className="text-gray-400 text-sm">Radius: {area.radius}km</p>}
          </div>
        ))}
      </div>

      {/* Tab Navigation */}
      <div className="flex gap-2 border-b border-surfaceHighlight">
        {(['discover', 'generate', 'calendar', 'analyze'] as const).map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 font-medium transition-all border-b-2 ${
              activeTab === tab
                ? 'text-indigo-400 border-indigo-500'
                : 'text-gray-400 border-transparent hover:text-gray-300'
            }`}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      {/* Content Sections */}
      {activeTab === 'discover' && (
        <div className="bg-surface border border-surfaceHighlight rounded-lg p-6 space-y-4">
          <h3 className="text-lg font-semibold text-white flex items-center gap-2">
            <Target size={20} className="text-blue-400" />
            Keyword Discovery by Location
          </h3>
          <p className="text-gray-400 text-sm">
            Discover high-intent, location-specific keywords for each serving area
          </p>

          {keywordClusters.length === 0 ? (
            <button
              onClick={handleDiscoverKeywords}
              disabled={loading}
              className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-medium disabled:opacity-50 transition-all flex items-center justify-center gap-2"
            >
              <Sparkles size={18} />
              {loading ? 'Discovering Keywords...' : 'Discover Location Keywords'}
            </button>
          ) : (
            <div className="space-y-4">
              {keywordClusters.map(cluster => (
                <div
                  key={cluster.area}
                  className="bg-surface/50 border border-surfaceHighlight/50 rounded-lg p-4"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h4 className="text-white font-semibold text-lg">{cluster.area}</h4>
                      <p className="text-indigo-400 font-medium text-sm">{cluster.primaryKeyword}</p>
                    </div>
                    <button
                      onClick={() => setSelectedArea(cluster.area)}
                      className="px-3 py-1 bg-indigo-600/20 text-indigo-400 rounded text-sm hover:bg-indigo-600/30 transition-all"
                    >
                      Select
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div>
                      <p className="text-gray-400 text-xs font-semibold mb-1">RELATED KEYWORDS</p>
                      <div className="flex flex-wrap gap-2">
                        {cluster.relatedKeywords.map(kw => (
                          <span
                            key={kw}
                            className="px-2 py-1 bg-blue-600/20 text-blue-300 text-xs rounded"
                          >
                            {kw}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div>
                      <p className="text-gray-400 text-xs font-semibold mb-1">CONTENT THEMES</p>
                      <div className="space-y-1">
                        {cluster.contentThemes.map(theme => (
                          <p key={theme} className="text-gray-300 text-sm">• {theme}</p>
                        ))}
                      </div>
                    </div>
                  </div>

                  {cluster.seasonality && (
                    <p className="text-gray-400 text-xs mt-2">
                      <strong>Seasonality:</strong> {cluster.seasonality}
                    </p>
                  )}
                </div>
              ))}

              <button
                onClick={handleDiscoverKeywords}
                className="w-full py-2 text-indigo-400 hover:text-indigo-300 font-medium text-sm transition-all"
              >
                Refresh Keywords
              </button>
            </div>
          )}
        </div>
      )}

      {activeTab === 'generate' && (
        <div className="bg-surface border border-surfaceHighlight rounded-lg p-6 space-y-4">
          <h3 className="text-lg font-semibold text-white flex items-center gap-2">
            <Sparkles size={20} className="text-purple-400" />
            Generate SEO-Optimized Posts
          </h3>

          {keywordClusters.length === 0 ? (
            <div className="bg-yellow-600/10 border border-yellow-500/30 rounded-lg p-4 flex gap-3">
              <AlertCircle size={20} className="text-yellow-400 flex-shrink-0" />
              <div>
                <p className="text-yellow-300 font-medium">First, discover keywords</p>
                <p className="text-yellow-200 text-sm">Run keyword discovery before generating posts</p>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              {/* Platform Selection */}
              <div>
                <label className="block text-gray-400 text-sm font-medium mb-2">
                  Platform
                </label>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
                  {['Google', 'Facebook', 'Instagram', 'LinkedIn', 'Twitter'].map(platform => (
                    <button
                      key={platform}
                      onClick={() => setSelectedPlatform(platform as SocialPlatform)}
                      className={`py-2 rounded-lg font-medium text-sm transition-all ${
                        selectedPlatform === platform
                          ? 'bg-indigo-600 text-white'
                          : 'bg-surface border border-surfaceHighlight text-gray-400 hover:border-indigo-500'
                      }`}
                    >
                      {platform}
                    </button>
                  ))}
                </div>
              </div>

              {/* Generate Button */}
              <button
                onClick={handleGeneratePost}
                disabled={loading || !selectedArea}
                className="w-full py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-medium disabled:opacity-50 transition-all flex items-center justify-center gap-2"
              >
                <Sparkles size={18} />
                {loading ? 'Generating...' : 'Generate Post for ' + selectedArea}
              </button>

              {/* Preview Post */}
              {previewPost && (
                <div className="bg-surface/50 border border-surfaceHighlight/50 rounded-lg p-4">
                  <p className="text-gray-400 text-xs font-semibold mb-2">PREVIEW</p>
                  <p className="text-white leading-relaxed">{previewPost}</p>
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {activeTab === 'calendar' && (
        <div className="bg-surface border border-surfaceHighlight rounded-lg p-6 space-y-4">
          <h3 className="text-lg font-semibold text-white flex items-center gap-2">
            <Calendar size={20} className="text-green-400" />
            30-Day Content Calendar
          </h3>

          {keywordClusters.length === 0 ? (
            <div className="bg-yellow-600/10 border border-yellow-500/30 rounded-lg p-4 flex gap-3">
              <AlertCircle size={20} className="text-yellow-400 flex-shrink-0" />
              <p className="text-yellow-300 font-medium">Discover keywords first</p>
            </div>
          ) : (
            <div className="space-y-4">
              <p className="text-gray-400 text-sm">
                Generate a 30-day calendar with posts targeting different areas and keywords
              </p>

              <button
                onClick={handleGenerateCalendar}
                disabled={loading}
                className="w-full py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium disabled:opacity-50 transition-all flex items-center justify-center gap-2"
              >
                <Calendar size={18} />
                {loading ? 'Generating Calendar...' : 'Generate 30-Day Calendar'}
              </button>

              {generatedPosts.length > 0 && (
                <div className="space-y-2">
                  <p className="text-gray-400 text-sm font-semibold">{generatedPosts.length} posts generated</p>
                  <div className="grid gap-2 max-h-96 overflow-y-auto">
                    {generatedPosts.map((post, idx) => (
                      <div
                        key={idx}
                        className="bg-surface/50 border border-surfaceHighlight/50 rounded p-3 cursor-pointer hover:border-green-500/50 transition-all"
                        onClick={() => {
                          setPreviewPost(post.content);
                          handleAnalyzePost(post);
                        }}
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-1 min-w-0">
                            <p className="text-white text-sm line-clamp-2">{post.content}</p>
                            <div className="flex gap-2 mt-2 flex-wrap">
                              {post.servingAreas.map(area => (
                                <span key={area} className="px-2 py-0.5 bg-blue-600/20 text-blue-300 text-xs rounded">
                                  {area}
                                </span>
                              ))}
                            </div>
                          </div>
                          <div className="text-right ml-2">
                            <p className="text-green-400 text-sm font-semibold">{post.optimizationScore}%</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {activeTab === 'analyze' && (
        <div className="bg-surface border border-surfaceHighlight rounded-lg p-6 space-y-4">
          <h3 className="text-lg font-semibold text-white flex items-center gap-2">
            <TrendingUp size={20} className="text-orange-400" />
            Content Analysis
          </h3>

          {contentAnalysis ? (
            <div className="space-y-4">
              {contentAnalysis.score !== undefined && (
                <div className="bg-surface/50 border border-surfaceHighlight/50 rounded-lg p-4">
                  <p className="text-gray-400 text-sm font-semibold mb-2">OPTIMIZATION SCORE</p>
                  <div className="flex items-center gap-4">
                    <div className="flex-1 h-3 bg-surface rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-green-500 to-blue-500"
                        style={{ width: `${contentAnalysis.score}%` }}
                      />
                    </div>
                    <span className="text-xl font-bold text-white">{contentAnalysis.score}%</span>
                  </div>
                </div>
              )}

              {contentAnalysis.keywordsFound && (
                <div className="bg-surface/50 border border-surfaceHighlight/50 rounded-lg p-4">
                  <p className="text-gray-400 text-sm font-semibold mb-2">KEYWORDS FOUND</p>
                  <div className="flex flex-wrap gap-2">
                    {contentAnalysis.keywordsFound.map((kw: string) => (
                      <span key={kw} className="px-2 py-1 bg-green-600/20 text-green-400 text-sm rounded">
                        ✓ {kw}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {contentAnalysis.keywordsMissing && contentAnalysis.keywordsMissing.length > 0 && (
                <div className="bg-surface/50 border border-surfaceHighlight/50 rounded-lg p-4">
                  <p className="text-gray-400 text-sm font-semibold mb-2">KEYWORDS MISSING</p>
                  <div className="flex flex-wrap gap-2">
                    {contentAnalysis.keywordsMissing.map((kw: string) => (
                      <span key={kw} className="px-2 py-1 bg-red-600/20 text-red-400 text-sm rounded">
                        ✗ {kw}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {contentAnalysis.suggestions && (
                <div className="bg-surface/50 border border-surfaceHighlight/50 rounded-lg p-4">
                  <p className="text-gray-400 text-sm font-semibold mb-2">SUGGESTIONS</p>
                  <ul className="space-y-1">
                    {contentAnalysis.suggestions.map((suggestion: string, idx: number) => (
                      <li key={idx} className="text-gray-300 text-sm flex gap-2">
                        <span className="text-indigo-400">→</span>
                        {suggestion}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {contentAnalysis.gaps && (
                <div className="bg-surface/50 border border-surfaceHighlight/50 rounded-lg p-4">
                  <p className="text-gray-400 text-sm font-semibold mb-2">KEYWORD GAP OPPORTUNITIES</p>
                  <div className="flex flex-wrap gap-2">
                    {contentAnalysis.gaps.slice(0, 8).map((gap: string) => (
                      <span key={gap} className="px-2 py-1 bg-purple-600/20 text-purple-300 text-sm rounded">
                        {gap}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="space-y-4">
              <p className="text-gray-400 text-sm">
                Select a post from the calendar or generate content to analyze
              </p>
              <button
                onClick={handleAnalyzeGaps}
                disabled={loading || keywordClusters.length === 0}
                className="w-full py-3 bg-orange-600 hover:bg-orange-700 text-white rounded-lg font-medium disabled:opacity-50 transition-all flex items-center justify-center gap-2"
              >
                <TrendingUp size={18} />
                {loading ? 'Analyzing...' : 'Analyze Keyword Gaps'}
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default AdvancedPostScheduler;
