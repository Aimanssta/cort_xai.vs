
import React, { useState, useEffect } from 'react';
import Layout from './components/Layout';
import MetricsChart from './components/Charts';
import VoiceChat from './components/VoiceChat';
import GBPDashboard from './components/GBPDashboard';
import PostScheduler from './components/PostScheduler';
import SocialMediaManager from './components/SocialMediaManager';
import WebsiteAnalysis from './components/WebsiteAnalysis';
import AdvancedPostScheduler from './components/AdvancedPostScheduler';
import { SeoIssue, ViewState, Review, Post, Keyword, BusinessProfile, SocialPlatform, PostScheduleTemplate } from './types';
import { 
  generateProfileSuggestions, 
  generateReviewReply, 
  generateMarketingPost, 
  discoverKeywords 
} from './services/geminiService';
import { postAutomationService } from './services/postAutomationService';
import { socialMediaService } from './services/socialMediaService';
import { 
  Building2, 
  FileText, 
  Search, 
  CheckCircle,
  Loader2,
  MapPin,
  MessageSquare,
  Sparkles,
  Zap,
  ChevronDown,
  Star,
  Send,
  MoreVertical,
  Plus,
  Share2,
  ThumbsUp,
  Eye,
  TrendingUp,
  Globe,
  Phone,
  Megaphone,
  X,
  Store,
  Image as ImageIcon,
  ShoppingBag,
  Calendar,
  Briefcase,
  HelpCircle,
  Facebook,
  Instagram,
  Linkedin,
  Twitter,
  Link,
  Laptop
} from 'lucide-react';

// --- Reusable Components ---

const ViewHeader: React.FC<{ title: string; subtitle: string; action?: React.ReactNode }> = ({ title, subtitle, action }) => (
  <div className="flex items-center justify-between mb-8">
    <div>
      <h2 className="text-2xl font-bold text-white">{title}</h2>
      <p className="text-gray-400 text-sm mt-1">{subtitle}</p>
    </div>
    {action}
  </div>
);

const GbpActionItem: React.FC<{ icon: React.ReactNode; label: string; onClick: () => void; active?: boolean }> = ({ icon, label, onClick, active }) => (
  <button 
    onClick={onClick}
    className={`flex flex-col items-center justify-center p-4 rounded-xl border transition-all duration-200 group ${
      active 
        ? 'bg-indigo-600/20 border-indigo-500 text-white' 
        : 'bg-surface border-surfaceHighlight text-gray-400 hover:bg-surfaceHighlight hover:border-gray-600 hover:text-white'
    }`}
  >
    <div className={`mb-2 p-2 rounded-full ${active ? 'bg-indigo-600 text-white' : 'bg-surfaceHighlight group-hover:bg-gray-700 text-indigo-400'}`}>
      {icon}
    </div>
    <span className="text-xs font-medium text-center">{label}</span>
  </button>
);

const PlatformIcon: React.FC<{ platform: SocialPlatform; className?: string }> = ({ platform, className="w-4 h-4" }) => {
  switch(platform) {
    case 'Facebook': return <Facebook className={`${className} text-blue-500`} />;
    case 'Instagram': return <Instagram className={`${className} text-pink-500`} />;
    case 'LinkedIn': return <Linkedin className={`${className} text-blue-400`} />;
    case 'Twitter': return <Twitter className={`${className} text-sky-400`} />;
    case 'Google': default: return <Store className={`${className} text-indigo-500`} />;
  }
};

// --- Sub-Views ---

interface ViewProps {
  profile: BusinessProfile;
  onNavigate: (view: ViewState) => void;
}

const DashboardView: React.FC<ViewProps> = ({ profile, onNavigate }) => {
  const [issues, setIssues] = useState<SeoIssue[]>([
    {
      id: '1',
      url: '/info/description',
      currentTitle: 'Missing comprehensive business description',
      suggestedFix: `${profile.name} provides premier ${profile.type.toLowerCase()} services in ${profile.location}.`,
      status: 'Deployed',
      category: 'Business Info'
    },
    {
      id: '2',
      url: '/services/general',
      currentTitle: 'Generic service list detected',
      suggestedFix: `Detailed ${profile.type} Service Menu`,
      status: 'Not Deployed',
      category: 'Business Info'
    }
  ]);
  const [isLoading, setIsLoading] = useState(false);

  // Reset issues when profile changes
  useEffect(() => {
    setIssues([
        {
          id: '1',
          url: '/info/description',
          currentTitle: 'Missing comprehensive business description',
          suggestedFix: `${profile.name} provides premier ${profile.type.toLowerCase()} services in ${profile.location}.`,
          status: 'Deployed',
          category: 'Business Info'
        },
        {
            id: '2',
            url: '/services/general',
            currentTitle: 'Generic service list detected',
            suggestedFix: `Detailed ${profile.type} Service Menu`,
            status: 'Not Deployed',
            category: 'Business Info'
        }
    ]);
  }, [profile.id]);

  const handleScan = async () => {
    setIsLoading(true);
    try {
      const newIssues = await generateProfileSuggestions('Business Info', profile.name, profile.type);
      setIssues(prev => [...newIssues, ...prev]);
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeploy = (id: string) => {
    setIssues(prev => prev.map(issue => issue.id === id ? { ...issue, status: 'Deployed' } : issue));
  };

  return (
    <div className="space-y-8">
       {/* GBP Grid Menu */}
       <div className="bg-surface/50 border border-surfaceHighlight rounded-2xl p-6 backdrop-blur-sm">
          <div className="flex items-center justify-between mb-4">
             <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider">Your business on Google</h3>
             {profile.lastSync && <span className="text-xs text-green-500 flex items-center gap-1"><CheckCircle className="w-3 h-3" /> Synced {profile.lastSync}</span>}
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-3">
             <GbpActionItem icon={<Store className="w-5 h-5" />} label="Edit profile" onClick={() => onNavigate('locations')} />
             <GbpActionItem icon={<Star className="w-5 h-5" />} label="Read reviews" onClick={() => onNavigate('reviews')} />
             <GbpActionItem icon={<MessageSquare className="w-5 h-5" />} label="Messages" onClick={() => onNavigate('reviews')} />
             <GbpActionItem icon={<ImageIcon className="w-5 h-5" />} label="Photos" onClick={() => onNavigate('content')} />
             <GbpActionItem icon={<TrendingUp className="w-5 h-5" />} label="Performance" onClick={() => onNavigate('performance')} />
             <GbpActionItem icon={<Megaphone className="w-5 h-5" />} label="Advertise" onClick={() => onNavigate('promotions')} />
             <GbpActionItem icon={<ShoppingBag className="w-5 h-5" />} label="Edit products" onClick={() => onNavigate('products')} />
             <GbpActionItem icon={<Briefcase className="w-5 h-5" />} label="Edit services" onClick={() => onNavigate('services')} />
             <GbpActionItem icon={<Calendar className="w-5 h-5" />} label="Bookings" onClick={() => onNavigate('bookings')} />
             <GbpActionItem icon={<HelpCircle className="w-5 h-5" />} label="Q & A" onClick={() => onNavigate('qa')} />
          </div>
       </div>

       {/* Quick Performance & Presence Snapshot */}
       <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-surface border border-surfaceHighlight rounded-xl p-6 relative overflow-hidden group hover:border-indigo-500/50 transition-colors">
              <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                 <TrendingUp className="w-24 h-24 text-indigo-500" />
              </div>
              <div className="flex items-center justify-between mb-6">
                 <div>
                    <h3 className="text-lg font-bold">Performance</h3>
                    <p className="text-sm text-gray-400">Interactions with your profile</p>
                 </div>
                 <button onClick={() => onNavigate('performance')} className="text-xs bg-surfaceHighlight hover:bg-gray-700 px-3 py-1 rounded-full text-indigo-400 font-medium transition-colors">View Report</button>
              </div>
              <div className="grid grid-cols-3 gap-4">
                 <div>
                    <div className="text-2xl font-bold text-white">1.2k</div>
                    <div className="text-xs text-gray-500">Profile views</div>
                 </div>
                 <div>
                    <div className="text-2xl font-bold text-white">84</div>
                    <div className="text-xs text-gray-500">Calls</div>
                 </div>
                 <div>
                    <div className="text-2xl font-bold text-white">156</div>
                    <div className="text-xs text-gray-500">Website clicks</div>
                 </div>
              </div>
          </div>

          <div className="lg:col-span-1 bg-surface border border-surfaceHighlight rounded-xl p-6">
             <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-white">Online Presence</h3>
                <span className="text-xs bg-green-500/20 text-green-400 px-2 py-1 rounded-full">Active</span>
             </div>
             <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-surfaceHighlight/30 rounded-lg">
                   <div className="flex items-center gap-3">
                      <Laptop className="w-5 h-5 text-gray-400" />
                      <div className="text-sm">
                        <div className="font-medium text-white">Website</div>
                        <div className="text-xs text-gray-500 truncate max-w-[120px]">{profile.websiteUrl || 'Not connected'}</div>
                      </div>
                   </div>
                   <div className={`w-2 h-2 rounded-full ${profile.websiteUrl ? 'bg-green-500' : 'bg-red-500'}`}></div>
                </div>
                <div className="flex gap-2">
                   {['Facebook', 'Instagram', 'LinkedIn', 'Twitter'].map(p => {
                      const isConnected = profile.socials[p.toLowerCase() as keyof typeof profile.socials];
                      return (
                        <div key={p} className={`flex-1 p-2 rounded-lg flex items-center justify-center border ${isConnected ? 'bg-indigo-600/10 border-indigo-500/30' : 'bg-surfaceHighlight/30 border-transparent opacity-50'}`}>
                           <PlatformIcon platform={p as SocialPlatform} className="w-5 h-5" />
                        </div>
                      )
                   })}
                </div>
             </div>
          </div>
       </div>

       {/* Optimization Suggestions */}
       <div className="bg-surface border border-surfaceHighlight rounded-xl overflow-hidden">
          <div className="p-4 border-b border-surfaceHighlight flex items-center justify-between">
             <h3 className="font-semibold text-sm">Suggested Improvements</h3>
             <span className="text-xs text-gray-500">{issues.length} items</span>
          </div>
          <div className="overflow-x-auto">
             <table className="w-full text-left text-sm">
                <thead className="bg-background/50 text-gray-500 text-xs uppercase font-semibold">
                   <tr><th className="p-4 w-24">Status</th><th className="p-4 w-48">Section</th><th className="p-4">Suggestion</th></tr>
                </thead>
                <tbody className="divide-y divide-surfaceHighlight">
                   {issues.map((issue) => (
                      <tr key={issue.id} className="hover:bg-surfaceHighlight/30 transition-colors">
                         <td className="p-4">
                            {issue.status === 'Deployed' ? <div className="bg-green-500/20 text-green-400 px-2 py-1 rounded text-xs w-fit font-medium flex items-center gap-1"><CheckCircle className="w-3 h-3"/> Done</div> : <button onClick={() => handleDeploy(issue.id)} className="bg-blue-600/10 border border-blue-600/50 text-blue-400 px-3 py-1 rounded text-xs hover:bg-blue-600 hover:text-white transition-all">Apply Fix</button>}
                         </td>
                         <td className="p-4 text-gray-400">{issue.category}</td>
                         <td className="p-4 text-white font-medium">{issue.suggestedFix}</td>
                      </tr>
                   ))}
                </tbody>
             </table>
          </div>
       </div>
    </div>
  );
};

const LocationsView: React.FC<ViewProps> = ({ profile }) => (
  <>
    <ViewHeader title="Business Information" subtitle={`Manage profile details for ${profile.name}.`} />
    <div className="bg-surface border border-surfaceHighlight rounded-xl overflow-hidden hover:border-indigo-500/50 transition-colors group max-w-2xl">
      <div className="h-32 bg-gradient-to-r from-indigo-900 to-gray-900 relative">
          {profile.isConnected && <div className="absolute top-4 right-4 bg-green-500 text-white text-xs px-2 py-1 rounded-full font-bold shadow-lg flex items-center gap-1"><CheckCircle className="w-3 h-3" /> Verified on Google</div>}
          <div className="absolute -bottom-8 left-6 w-20 h-20 bg-surface rounded-full border-4 border-surface flex items-center justify-center shadow-xl">
             <div className={`w-full h-full rounded-full ${profile.color} flex items-center justify-center text-xl font-bold text-white`}>{profile.initials}</div>
          </div>
      </div>
      <div className="pt-10 p-6">
          <div className="flex justify-between items-start mb-4">
             <div>
                <h3 className="text-2xl font-bold text-white">{profile.name}</h3>
                <p className="text-gray-400">{profile.type}</p>
             </div>
             <button className="text-indigo-400 hover:text-indigo-300 text-sm font-medium">Edit</button>
          </div>
          <div className="space-y-4 text-sm text-gray-300">
            <div className="flex items-center gap-3 p-3 rounded-lg bg-surfaceHighlight/30"><MapPin className="w-4 h-4 text-indigo-400" /> {profile.location}</div>
            <div className="flex items-center gap-3 p-3 rounded-lg bg-surfaceHighlight/30"><Phone className="w-4 h-4 text-indigo-400" /> (555) 123-4567</div>
            <div className="flex items-center gap-3 p-3 rounded-lg bg-surfaceHighlight/30"><Globe className="w-4 h-4 text-indigo-400" /> {profile.websiteUrl || `${profile.name.toLowerCase().replace(/\s/g, '')}.com`}</div>
            <div className="flex items-center gap-3 p-3 rounded-lg bg-surfaceHighlight/30"><Calendar className="w-4 h-4 text-indigo-400" /> Open • Closes 6 PM</div>
          </div>
      </div>
    </div>
  </>
);

const ContentView: React.FC<ViewProps> = ({ profile }) => {
  const [posts, setPosts] = useState<Post[]>([
    { id: '1', content: `Check out our latest work at ${profile.name}! We love serving the ${profile.location} community. #LocalBusiness`, date: '2 days ago', status: 'Published', views: 245, platform: 'Google' },
  ]);
  const [topic, setTopic] = useState('');
  const [selectedPlatform, setSelectedPlatform] = useState<SocialPlatform>('Google');
  const [isGenerating, setIsGenerating] = useState(false);

  useEffect(() => {
    setPosts([
        { id: '1', content: `Check out our latest work at ${profile.name}! We love serving the ${profile.location} community. #LocalBusiness`, date: '2 days ago', status: 'Published', views: 245, platform: 'Google' },
    ]);
  }, [profile.id]);

  const handleGenerate = async () => {
    if (!topic) return;
    setIsGenerating(true);
    const content = await generateMarketingPost(topic, profile.name, selectedPlatform);
    if (content) {
      setPosts(prev => [{
        id: Date.now().toString(),
        content,
        date: 'Just now',
        status: 'Draft',
        views: 0,
        platform: selectedPlatform
      }, ...prev]);
      setTopic('');
    }
    setIsGenerating(false);
  };

  return (
    <>
      <ViewHeader title="Content Manager" subtitle={`Create and publish updates for ${profile.name} across all platforms.`} />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1">
          <div className="bg-surface border border-surfaceHighlight rounded-xl p-6 sticky top-6">
            <h3 className="font-semibold mb-4 flex items-center gap-2 text-white"><Sparkles className="w-4 h-4 text-fuchsia-500" /> AI Content Studio</h3>
            
            {/* Platform Selector */}
            <div className="flex gap-2 mb-4 overflow-x-auto pb-2 scrollbar-hide">
              {['Google', 'Facebook', 'Instagram', 'LinkedIn', 'Twitter'].map((p) => (
                <button
                  key={p}
                  onClick={() => setSelectedPlatform(p as SocialPlatform)}
                  className={`flex items-center justify-center p-2 rounded-lg border transition-all ${
                    selectedPlatform === p 
                      ? 'bg-indigo-600/20 border-indigo-500 text-white' 
                      : 'bg-surfaceHighlight border-transparent text-gray-500 hover:text-white'
                  }`}
                  title={`Create for ${p}`}
                >
                  <PlatformIcon platform={p as SocialPlatform} />
                </button>
              ))}
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-xs text-gray-400 font-medium mb-1 block">Topic or Announcement</label>
                <textarea 
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  placeholder={`What's new at ${profile.name}?`}
                  className="w-full bg-background border border-surfaceHighlight rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-indigo-500 h-24 resize-none"
                />
              </div>
              <button 
                onClick={handleGenerate}
                disabled={isGenerating || !topic}
                className="w-full bg-gradient-to-r from-indigo-600 to-fuchsia-600 text-white py-2 rounded-lg font-semibold text-sm hover:opacity-90 disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {isGenerating ? <Loader2 className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
                Generate {selectedPlatform} Post
              </button>
            </div>
            
            <div className="mt-8 pt-6 border-t border-surfaceHighlight">
               <h4 className="text-sm font-semibold mb-4 text-white">Upload Media</h4>
               <div className="border-2 border-dashed border-surfaceHighlight rounded-xl p-6 flex flex-col items-center justify-center text-gray-500 hover:border-indigo-500/50 hover:bg-surfaceHighlight/30 transition-all cursor-pointer">
                  <ImageIcon className="w-8 h-8 mb-2" />
                  <span className="text-xs">Drop photos here</span>
               </div>
            </div>
          </div>
        </div>
        <div className="lg:col-span-2 space-y-4">
          <h3 className="font-semibold text-gray-300">Content Feed</h3>
          {posts.map(post => (
             <div key={post.id} className="bg-surface border border-surfaceHighlight rounded-xl p-6 hover:border-gray-600 transition-colors">
                <div className="flex justify-between items-start mb-4">
                   <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold ${profile.color}`}>
                        {profile.initials}
                      </div>
                      <div>
                         <div className="font-semibold text-sm text-white flex items-center gap-2">
                           {profile.name} 
                           <span className="text-gray-500 font-normal text-xs flex items-center gap-1">• via <PlatformIcon platform={post.platform} className="w-3 h-3"/> {post.platform}</span>
                         </div>
                         <div className="text-xs text-gray-500">{post.date} • {post.status}</div>
                      </div>
                   </div>
                   <button className="text-gray-500 hover:text-white"><MoreVertical className="w-4 h-4" /></button>
                </div>
                <p className="text-gray-300 text-sm leading-relaxed mb-4 whitespace-pre-wrap">{post.content}</p>
                {post.imageUrl && <img src={post.imageUrl} alt="Post content" className="w-full h-48 object-cover rounded-lg mb-4" />}
                <div className="flex items-center gap-6 text-xs text-gray-500 border-t border-surfaceHighlight pt-4">
                   <div className="flex items-center gap-2"><Eye className="w-4 h-4" /> {post.views} Views</div>
                   <div className="flex items-center gap-2"><ThumbsUp className="w-4 h-4" /> {Math.floor((post.views || 0) * 0.1)} Likes</div>
                   <div className="flex items-center gap-2 ml-auto hover:text-white cursor-pointer"><Share2 className="w-4 h-4" /> Share</div>
                </div>
             </div>
          ))}
        </div>
      </div>
    </>
  );
};

const ReviewsView: React.FC<ViewProps> = ({ profile }) => {
  const [reviews, setReviews] = useState<Review[]>([
    { id: '1', author: 'Sarah Jenkins', rating: 5, text: `Absolutely love ${profile.name}! Professional and efficient.`, date: '1 day ago' },
    { id: '2', author: 'Michael Ross', rating: 4, text: 'Great work, but communication could be slightly better.', date: '3 days ago' },
  ]);
  const [loadingId, setLoadingId] = useState<string | null>(null);

  useEffect(() => {
     setReviews([
        { id: '1', author: 'Sarah Jenkins', rating: 5, text: `Absolutely love ${profile.name}! Professional and efficient.`, date: '1 day ago' },
        { id: '2', author: 'Michael Ross', rating: 4, text: 'Great work, but communication could be slightly better.', date: '3 days ago' },
     ]);
  }, [profile.id]);

  const handleReply = async (review: Review) => {
    setLoadingId(review.id);
    const reply = await generateReviewReply(review.text, review.rating, review.author, profile.name);
    setReviews(prev => prev.map(r => r.id === review.id ? { ...r, reply } : r));
    setLoadingId(null);
  };

  return (
    <>
      <ViewHeader title="Reviews" subtitle={`Manage customer feedback.`} />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {reviews.map(review => (
          <div key={review.id} className="bg-surface border border-surfaceHighlight rounded-xl p-6 flex flex-col h-full hover:border-indigo-500/30 transition-colors">
             <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                   <div className="flex text-yellow-500">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className={`w-3 h-3 ${i < review.rating ? 'fill-current' : 'text-gray-600'}`} />
                      ))}
                   </div>
                </div>
                <span className="text-xs text-gray-500">{review.date}</span>
             </div>
             <p className="text-sm font-semibold text-gray-200 mb-1">{review.author}</p>
             <p className="text-sm text-gray-400 mb-4 flex-1">"{review.text}"</p>
             
             {review.reply ? (
               <div className="bg-surfaceHighlight/50 rounded-lg p-3 text-xs text-gray-300 mt-auto border-l-2 border-indigo-500">
                  <span className="font-bold text-indigo-400 block mb-1">Your Reply:</span>
                  {review.reply}
               </div>
             ) : (
               <button 
                 onClick={() => handleReply(review)}
                 disabled={loadingId === review.id}
                 className="mt-auto w-full py-2 border border-indigo-500/50 text-indigo-400 rounded-lg text-sm hover:bg-indigo-500/10 flex items-center justify-center gap-2 transition-colors"
               >
                 {loadingId === review.id ? <Loader2 className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
                 Generate AI Reply
               </button>
             )}
          </div>
        ))}
      </div>
    </>
  );
};

const KeywordsView: React.FC<ViewProps> = ({ profile }) => {
  const [keywords, setKeywords] = useState<Keyword[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setKeywords([
        { term: `${profile.type.toLowerCase()} near me`, volume: '1.5k', difficulty: 'Hard', rank: 3 },
        { term: `best ${profile.type.toLowerCase()} in ${profile.location}`, volume: '500', difficulty: 'Medium', rank: 7 }
    ]);
  }, [profile.id]);

  const handleDiscover = async () => {
    setIsLoading(true);
    const newKeywords = await discoverKeywords(profile.type, profile.location);
    if (newKeywords.length) {
      setKeywords(prev => [...newKeywords, ...prev]);
    }
    setIsLoading(false);
  };

  return (
    <>
      <ViewHeader 
        title="Search Keywords" 
        subtitle={`See what queries drive traffic to ${profile.name}.`} 
        action={
          <button 
            onClick={handleDiscover}
            disabled={isLoading}
            className="bg-blue-600 px-4 py-2 rounded-lg text-sm font-semibold hover:bg-blue-700 flex items-center gap-2 disabled:opacity-50 text-white"
          >
            {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Search className="w-4 h-4" />}
            Discover Keywords
          </button>
        }
      />
      <div className="bg-surface border border-surfaceHighlight rounded-xl overflow-hidden">
        <table className="w-full text-left text-sm">
          <thead className="bg-background/50 text-gray-500 text-xs uppercase font-semibold">
             <tr><th className="p-4">Keyword</th><th className="p-4">Search Volume</th><th className="p-4">Difficulty</th><th className="p-4">Current Rank</th></tr>
          </thead>
          <tbody className="divide-y divide-surfaceHighlight">
             {keywords.map((kw, idx) => (
                <tr key={idx} className="hover:bg-surfaceHighlight/30">
                   <td className="p-4 font-medium text-white">{kw.term}</td>
                   <td className="p-4 text-gray-400">{kw.volume}</td>
                   <td className="p-4">
                      <span className={`px-2 py-1 rounded text-xs ${kw.difficulty === 'Easy' ? 'bg-green-500/20 text-green-400' : kw.difficulty === 'Medium' ? 'bg-yellow-500/20 text-yellow-400' : 'bg-red-500/20 text-red-400'}`}>
                        {kw.difficulty}
                      </span>
                   </td>
                   <td className="p-4 text-gray-300">{kw.rank ? `#${kw.rank}` : '-'}</td>
                </tr>
             ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

// Placeholder Views for other GBP Features
const PlaceholderView: React.FC<{ title: string; icon: React.ReactNode }> = ({ title, icon }) => (
    <div className="flex flex-col items-center justify-center h-[50vh] text-center">
        <div className="bg-surfaceHighlight p-6 rounded-full mb-6">
            {icon}
        </div>
        <h2 className="text-2xl font-bold text-white mb-2">{title}</h2>
        <p className="text-gray-400 max-w-md">This feature is synced with your Google Business Profile and will be available in the next dashboard update.</p>
    </div>
);


// --- Main App Component ---

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<ViewState>('audit');
  const [isConnectModalOpen, setIsConnectModalOpen] = useState(false);
  
  // Profile State
  const [profiles, setProfiles] = useState<BusinessProfile[]>([
    { 
      id: '1', 
      name: 'Avinoum Complex', 
      type: 'Construction & Design', 
      location: 'Washington, USA',
      initials: 'AC',
      color: 'bg-indigo-600',
      isConnected: true,
      lastSync: '2 hours ago',
      websiteUrl: 'avinoumcomplex.com',
      socials: { facebook: true, instagram: true, linkedin: false, twitter: false }
    }
  ]);
  const [activeProfileId, setActiveProfileId] = useState('1');

  const activeProfile = profiles.find(p => p.id === activeProfileId) || profiles[0];

  // Connect Profile Form
  const [step, setStep] = useState<1|2>(1); 
  const [newProfileName, setNewProfileName] = useState('');
  const [newProfileType, setNewProfileType] = useState('');
  const [newProfileLocation, setNewProfileLocation] = useState('');
  const [newProfileWebsite, setNewProfileWebsite] = useState('');
  const [newProfileSocials, setNewProfileSocials] = useState({
    facebook: false,
    instagram: false,
    linkedin: false,
    twitter: false
  });
  
  const [isConnecting, setIsConnecting] = useState(false);

  const toggleSocial = (platform: keyof typeof newProfileSocials) => {
    setNewProfileSocials(prev => ({ ...prev, [platform]: !prev[platform] }));
  };

  const handleConnectProfile = async () => {
      setIsConnecting(true);
      
      // Simulate Sync
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const newProfile: BusinessProfile = {
          id: Date.now().toString(),
          name: newProfileName || "New Business",
          type: newProfileType || "Local Business",
          location: newProfileLocation || 'Unknown Location',
          initials: (newProfileName || "NB").substring(0, 2).toUpperCase(),
          color: `bg-${['blue', 'green', 'purple', 'red'][Math.floor(Math.random() * 4)]}-600`,
          isConnected: true,
          lastSync: 'Just now',
          websiteUrl: newProfileWebsite || undefined,
          socials: newProfileSocials
      };

      setProfiles(prev => [...prev, newProfile]);
      setActiveProfileId(newProfile.id);
      setIsConnectModalOpen(false);
      setIsConnecting(false);
      setStep(1);
      
      // Reset form
      setNewProfileName('');
      setNewProfileType('');
      setNewProfileLocation('');
      setNewProfileWebsite('');
      setNewProfileSocials({ facebook: false, instagram: false, linkedin: false, twitter: false });
      setCurrentView('audit'); 
  };

  const renderView = () => {
    switch (currentView) {
      case 'gbp-dashboard': 
        return <GBPDashboard />;
      
      case 'post-scheduler':
        return (
          <PostScheduler
            schedules={postAutomationService.getScheduleTemplates()}
            onCreateSchedule={(template) => postAutomationService.createScheduleTemplate(template)}
            onUpdateSchedule={(id, updates) => postAutomationService.updateScheduleTemplate(id, updates)}
            onDeleteSchedule={(id) => postAutomationService.deleteScheduleTemplate(id)}
            onGeneratePost={(topic, platforms) => {
              postAutomationService.generateAndPublishPost(topic, activeProfile.id, platforms, activeProfile.name);
            }}
          />
        );
      
      case 'advanced-strategy':
        return (
          <AdvancedPostScheduler
            businessName={activeProfile.name}
            businessType={activeProfile.type}
            servingAreas={[
              { name: 'Downtown', zipCodes: ['10001'], radius: 2 },
              { name: 'Uptown', zipCodes: ['10028'], radius: 2 },
              { name: 'Brooklyn', zipCodes: ['11201'], radius: 3 },
            ]}
          />
        );
      
      case 'social-media':
        return (
          <SocialMediaManager
            accounts={socialMediaService.getConnectedAccounts(activeProfile.id)}
            onConnectAccount={(platform) => {
              console.log(`Connecting ${platform}`);
              // In production, open OAuth flow
            }}
            onDisconnectAccount={(accountId) => {
              socialMediaService.disconnectAccount(accountId);
            }}
            onCreatePost={(content, platforms, mediaUrls) => {
              socialMediaService.crossPost(activeProfile.id, content, platforms, mediaUrls);
            }}
          />
        );
      
      case 'website-analysis':
        return (
          <WebsiteAnalysis
            onAnalyze={(url) => {
              console.log(`Analyzing website: ${url}`);
              // In production, call websiteAnalysisService.analyzeWebsite(url)
            }}
          />
        );
      
      case 'locations': return <LocationsView profile={activeProfile} onNavigate={setCurrentView} />;
      case 'content': return <ContentView profile={activeProfile} onNavigate={setCurrentView} />;
      case 'reviews': return <ReviewsView profile={activeProfile} onNavigate={setCurrentView} />;
      case 'keywords': return <KeywordsView profile={activeProfile} onNavigate={setCurrentView} />;
      case 'performance': return (
          <>
            <ViewHeader 
                title="Performance" 
                subtitle={`Insights for ${activeProfile.name} (Last 6 months)`} 
                action={<div className="text-xs text-gray-500 bg-surface px-3 py-1 rounded border border-surfaceHighlight">Synced from Google</div>}
            />
            <MetricsChart />
            <div className="grid grid-cols-3 gap-6 mt-8">
               <div className="bg-surface p-6 rounded-xl border border-surfaceHighlight text-center hover:border-indigo-500/30 transition-colors">
                  <div className="text-3xl font-bold text-white mb-2">12.5k</div>
                  <div className="text-sm text-gray-400">Search Views</div>
               </div>
               <div className="bg-surface p-6 rounded-xl border border-surfaceHighlight text-center hover:border-indigo-500/30 transition-colors">
                  <div className="text-3xl font-bold text-white mb-2">842</div>
                  <div className="text-sm text-gray-400">Maps Directions</div>
               </div>
               <div className="bg-surface p-6 rounded-xl border border-surfaceHighlight text-center hover:border-indigo-500/30 transition-colors">
                  <div className="text-3xl font-bold text-white mb-2">156</div>
                  <div className="text-sm text-gray-400">Calls Initiated</div>
               </div>
            </div>
          </>
      );
      case 'promotions': return (
        <>
           <ViewHeader title="Advertise & Promotions" subtitle="Create Google Ads and Update Offers." />
           <div className="bg-surface border border-surfaceHighlight rounded-xl p-12 text-center">
              <Megaphone className="w-16 h-16 text-gray-600 mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2 text-white">Create Ad Campaign</h3>
              <p className="text-gray-400 mb-6 max-w-md mx-auto">Turn searches into customers. Cort X AI can draft your Google Ad copy in seconds.</p>
              <button className="bg-blue-600 px-6 py-3 rounded-xl font-bold hover:bg-blue-700 transition-colors text-white">Draft Campaign</button>
           </div>
        </>
      );
      case 'products': return <PlaceholderView title="Edit Products" icon={<ShoppingBag className="w-12 h-12 text-indigo-500" />} />;
      case 'services': return <PlaceholderView title="Edit Services" icon={<Briefcase className="w-12 h-12 text-indigo-500" />} />;
      case 'bookings': return <PlaceholderView title="Bookings" icon={<Calendar className="w-12 h-12 text-indigo-500" />} />;
      case 'qa': return <PlaceholderView title="Q & A" icon={<HelpCircle className="w-12 h-12 text-indigo-500" />} />;
      case 'audit':
      default: return <DashboardView profile={activeProfile} onNavigate={setCurrentView} />;
    }
  };

  return (
    <>
      <Layout 
        currentView={currentView} 
        onNavigate={setCurrentView}
        profiles={profiles}
        currentProfile={activeProfile}
        onSwitchProfile={(p) => setActiveProfileId(p.id)}
        onConnectClick={() => setIsConnectModalOpen(true)}
      >
         <div className="mb-8 flex items-center gap-4">
            <div className="w-14 h-14 bg-white rounded-xl flex items-center justify-center shadow-lg overflow-hidden border-2 border-surfaceHighlight">
               <div className={`w-full h-full flex items-center justify-center text-white font-bold text-xl ${activeProfile.color}`}>
                  {activeProfile.initials}
               </div>
            </div>
            <div>
               <h1 className="text-2xl font-bold flex items-center gap-2 text-white">
                 {activeProfile.name} <ChevronDown className="w-5 h-5 text-gray-500" />
               </h1>
               <div className="flex items-center gap-2 text-sm text-gray-400 mt-1">
                 <div className="flex items-center gap-1 bg-green-500/10 text-green-400 px-2 py-0.5 rounded text-xs border border-green-500/20">
                    <CheckCircle className="w-3 h-3" /> Verified
                 </div>
                 <span className="w-1 h-1 rounded-full bg-gray-600"></span>
                 <span>{activeProfile.type}</span>
                 <span className="w-1 h-1 rounded-full bg-gray-600"></span>
                 <span className="text-blue-400 hover:text-blue-300 cursor-pointer transition-colors">See your profile</span>
               </div>
            </div>
         </div>
         
         {renderView()}
         
         <VoiceChat />
      </Layout>

      {/* Connect Profile Modal */}
      {isConnectModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 animate-in fade-in duration-200">
           <div className="bg-surface border border-surfaceHighlight w-full max-w-md rounded-2xl p-8 shadow-2xl relative">
              <button 
                onClick={() => { setIsConnectModalOpen(false); setStep(1); }}
                className="absolute top-4 right-4 text-gray-500 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
              
              {step === 1 ? (
                <>
                  <div className="flex flex-col items-center mb-6">
                     <div className="w-12 h-12 bg-surfaceHighlight rounded-full flex items-center justify-center text-indigo-400 mb-3 shadow-inner">
                        <Store className="w-6 h-6" />
                     </div>
                     <h2 className="text-xl font-bold text-white">Business Details</h2>
                     <p className="text-xs text-gray-400 text-center mt-1">
                        Start by entering your basic business info.
                     </p>
                  </div>

                  <div className="space-y-3">
                     <div>
                        <label className="text-[10px] font-semibold text-gray-500 uppercase tracking-wider mb-1 block">Business Name</label>
                        <input 
                          type="text" 
                          value={newProfileName}
                          onChange={(e) => setNewProfileName(e.target.value)}
                          placeholder="e.g. Joe's Pizza" 
                          className="w-full bg-background border border-surfaceHighlight rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-indigo-500"
                        />
                     </div>
                     <div>
                        <label className="text-[10px] font-semibold text-gray-500 uppercase tracking-wider mb-1 block">Website URL (Optional)</label>
                        <input 
                          type="text" 
                          value={newProfileWebsite}
                          onChange={(e) => setNewProfileWebsite(e.target.value)}
                          placeholder="e.g. joespizza.com" 
                          className="w-full bg-background border border-surfaceHighlight rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-indigo-500"
                        />
                     </div>
                     <button 
                       onClick={() => setStep(2)}
                       disabled={!newProfileName}
                       className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 rounded-lg mt-4 flex items-center justify-center gap-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-indigo-500/20"
                     >
                       Next: Connect Accounts
                     </button>
                  </div>
                </>
              ) : (
                <>
                   <div className="flex flex-col items-center mb-6">
                     <div className="w-12 h-12 bg-surfaceHighlight rounded-full flex items-center justify-center mb-3 shadow-inner text-indigo-400">
                        <Link className="w-6 h-6" />
                     </div>
                     <h2 className="text-xl font-bold text-white">Connect Accounts</h2>
                     <p className="text-xs text-gray-400 text-center mt-1">
                        Select platforms to manage with Cort X AI.
                     </p>
                  </div>
                  
                  <div className="space-y-4 mb-6">
                     <div className="bg-surfaceHighlight/30 rounded-lg p-3">
                        <h4 className="text-xs font-semibold text-gray-500 uppercase mb-2">Social Media</h4>
                        <div className="space-y-2">
                           {['Facebook', 'Instagram', 'LinkedIn', 'Twitter'].map(p => (
                              <div key={p} 
                                onClick={() => toggleSocial(p.toLowerCase() as any)}
                                className={`flex items-center justify-between p-2 rounded cursor-pointer border transition-colors ${
                                  newProfileSocials[p.toLowerCase() as keyof typeof newProfileSocials] 
                                  ? 'bg-indigo-600/20 border-indigo-500 text-white' 
                                  : 'hover:bg-surfaceHighlight border-transparent text-gray-400'
                                }`}
                              >
                                 <div className="flex items-center gap-2">
                                    <PlatformIcon platform={p as SocialPlatform} />
                                    <span className="text-sm font-medium">{p}</span>
                                 </div>
                                 <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                                    newProfileSocials[p.toLowerCase() as keyof typeof newProfileSocials]
                                    ? 'bg-indigo-600 border-indigo-600'
                                    : 'border-gray-600'
                                 }`}>
                                    {newProfileSocials[p.toLowerCase() as keyof typeof newProfileSocials] && <CheckCircle className="w-3 h-3 text-white" />}
                                 </div>
                              </div>
                           ))}
                        </div>
                     </div>
                  </div>

                  <div className="space-y-3">
                     <button 
                       onClick={handleConnectProfile}
                       disabled={isConnecting}
                       className="w-full bg-white text-gray-900 font-bold py-3 rounded-lg flex items-center justify-center gap-3 hover:bg-gray-100 transition-colors"
                     >
                       {isConnecting ? (
                         <>
                           <Loader2 className="w-4 h-4 animate-spin text-gray-600" />
                           <span className="text-gray-600 text-sm">Syncing Data...</span>
                         </>
                       ) : (
                         <>
                           <div className="w-4 h-4"><svg viewBox="0 0 24 24"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg></div>
                           <span className="text-sm">Connect with Google</span>
                         </>
                       )}
                     </button>
                     <button 
                       onClick={() => setStep(1)}
                       className="w-full bg-transparent text-gray-400 font-medium py-3 rounded-lg hover:text-white transition-colors text-sm"
                     >
                       Back
                     </button>
                  </div>
                </>
              )}
           </div>
        </div>
      )}
    </>
  );
};

export default App;
