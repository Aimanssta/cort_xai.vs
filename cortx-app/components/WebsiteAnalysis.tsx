import React, { useState } from 'react';
import { WebsiteMetrics, WebsiteIssue } from '../types';
import {
  Globe,
  Search,
  AlertTriangle,
  CheckCircle2,
  AlertCircle,
  TrendingUp,
  Zap,
  Shield,
  Accessibility,
  RefreshCw,
  Lightbulb,
  Target,
  ExternalLink,
} from 'lucide-react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

interface WebsiteAnalysisProps {
  metrics?: WebsiteMetrics;
  loading?: boolean;
  onAnalyze?: (url: string) => void;
}

const ScoreGauge: React.FC<{ score: number; label: string }> = ({ score, label }) => {
  const getColor = () => {
    if (score >= 80) return 'text-green-400';
    if (score >= 60) return 'text-yellow-400';
    return 'text-red-400';
  };

  const getBgColor = () => {
    if (score >= 80) return 'bg-green-600/10 border-green-500/30';
    if (score >= 60) return 'bg-yellow-600/10 border-yellow-500/30';
    return 'bg-red-600/10 border-red-500/30';
  };

  return (
    <div className={`rounded-lg border p-4 ${getBgColor()}`}>
      <p className="text-gray-400 text-sm font-medium mb-2">{label}</p>
      <div className="relative w-24 h-24 mx-auto">
        <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
          <circle
            cx="50"
            cy="50"
            r="45"
            fill="none"
            stroke="currentColor"
            strokeWidth="8"
            className="text-surfaceHighlight"
          />
          <circle
            cx="50"
            cy="50"
            r="45"
            fill="none"
            stroke="currentColor"
            strokeWidth="8"
            strokeDasharray={`${(score / 100) * 282.7} 282.7`}
            className={getColor()}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className={`text-2xl font-bold ${getColor()}`}>{score}</span>
        </div>
      </div>
    </div>
  );
};

const IssueCard: React.FC<{ issue: WebsiteIssue }> = ({ issue }) => {
  const getSeverityColor = () => {
    switch (issue.severity) {
      case 'critical':
        return 'bg-red-600/10 border-red-500/30';
      case 'high':
        return 'bg-orange-600/10 border-orange-500/30';
      case 'medium':
        return 'bg-yellow-600/10 border-yellow-500/30';
      default:
        return 'bg-blue-600/10 border-blue-500/30';
    }
  };

  const getSeverityIcon = () => {
    switch (issue.severity) {
      case 'critical':
      case 'high':
        return <AlertTriangle className="text-red-400" size={20} />;
      case 'medium':
        return <AlertCircle className="text-yellow-400" size={20} />;
      default:
        return <AlertCircle className="text-blue-400" size={20} />;
    }
  };

  const getSeverityLabel = () => {
    return issue.severity.charAt(0).toUpperCase() + issue.severity.slice(1);
  };

  return (
    <div className={`rounded-lg border p-4 ${getSeverityColor()}`}>
      <div className="flex items-start gap-3">
        {getSeverityIcon()}
        <div className="flex-1">
          <h4 className="text-white font-semibold mb-1 flex items-center gap-2">
            {issue.title}
            <span className={`px-2 py-0.5 rounded text-xs font-medium ${
              issue.severity === 'critical' ? 'bg-red-600/30 text-red-300' :
              issue.severity === 'high' ? 'bg-orange-600/30 text-orange-300' :
              issue.severity === 'medium' ? 'bg-yellow-600/30 text-yellow-300' :
              'bg-blue-600/30 text-blue-300'
            }`}>
              {getSeverityLabel()}
            </span>
          </h4>
          <p className="text-gray-300 text-sm mb-2">{issue.description}</p>
          <div className="bg-black/20 rounded p-2 mb-2">
            <p className="text-gray-300 text-xs">{issue.suggestion}</p>
          </div>
          {issue.affectedElements && (
            <p className="text-gray-400 text-xs">Affects {issue.affectedElements} element(s)</p>
          )}
        </div>
      </div>
    </div>
  );
};

const WebsiteAnalysis: React.FC<WebsiteAnalysisProps> = ({
  metrics = {
    url: 'https://example.com',
    loadTimeMs: 2500,
    mobileScore: 72,
    desktopScore: 85,
    seoScore: 78,
    accessibilityScore: 68,
    bestPracticesScore: 82,
    issues: [
      {
        id: '1',
        type: 'seo',
        severity: 'high',
        title: 'Missing meta descriptions',
        description: 'Several pages lack optimized meta descriptions',
        suggestion: 'Add unique meta descriptions (150-160 characters) to all pages',
        affectedElements: 15,
      },
      {
        id: '2',
        type: 'performance',
        severity: 'medium',
        title: 'Large images not optimized',
        description: 'Hero images could be optimized for web',
        suggestion: 'Use modern image formats (WebP) and lazy loading',
        affectedElements: 8,
      },
      {
        id: '3',
        type: 'accessibility',
        severity: 'medium',
        title: 'Low color contrast',
        description: 'Some text colors do not meet WCAG standards',
        suggestion: 'Ensure contrast ratio of at least 4.5:1 for text',
        affectedElements: 12,
      },
    ],
    lastAnalyzed: new Date().toISOString(),
  },
  loading = false,
  onAnalyze,
}) => {
  const [websiteUrl, setWebsiteUrl] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleAnalyze = async () => {
    if (websiteUrl) {
      setIsAnalyzing(true);
      await onAnalyze?.(websiteUrl);
      setIsAnalyzing(false);
    }
  };

  const criticalIssues = metrics.issues.filter(i => i.severity === 'critical');
  const highIssues = metrics.issues.filter(i => i.severity === 'high');

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-white">Website Analysis & Optimization</h2>
        <p className="text-gray-400 text-sm mt-1">
          Monitor your website's SEO, performance, and user experience metrics
        </p>
      </div>

      {/* Website URL Analysis */}
      <div className="bg-surface border border-surfaceHighlight rounded-lg p-6">
        <label className="block text-white font-medium mb-3">Analyze Website</label>
        <div className="flex gap-2">
          <div className="flex-1 flex gap-2 items-center">
            <Globe className="text-gray-400" size={20} />
            <input
              type="url"
              value={websiteUrl}
              onChange={(e) => setWebsiteUrl(e.target.value)}
              placeholder="https://example.com"
              className="flex-1 bg-surfaceHighlight border border-gray-600 rounded-lg px-4 py-2 text-white placeholder-gray-500 focus:outline-none focus:border-indigo-500"
            />
          </div>
          <button
            onClick={handleAnalyze}
            disabled={isAnalyzing || !websiteUrl}
            className="px-6 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-medium disabled:opacity-50 transition-all flex items-center gap-2"
          >
            <Search size={18} />
            Analyze
          </button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <ScoreGauge score={metrics.seoScore} label="SEO Score" />
        <ScoreGauge score={metrics.mobileScore} label="Mobile Score" />
        <ScoreGauge score={metrics.desktopScore} label="Desktop Score" />
        <ScoreGauge score={metrics.accessibilityScore} label="Accessibility" />
        <ScoreGauge score={metrics.bestPracticesScore} label="Best Practices" />
      </div>

      {/* Performance Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-surface border border-surfaceHighlight rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <Zap className="text-yellow-400" size={20} />
            <p className="text-gray-400 text-sm font-medium">Page Load Time</p>
          </div>
          <p className="text-2xl font-bold text-white">{metrics.loadTimeMs}ms</p>
          <p className="text-xs text-gray-400 mt-1">
            {metrics.loadTimeMs < 1000 ? '✓ Excellent' : metrics.loadTimeMs < 2500 ? '⚠ Good' : '✗ Needs improvement'}
          </p>
        </div>

        <div className="bg-surface border border-surfaceHighlight rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp className="text-blue-400" size={20} />
            <p className="text-gray-400 text-sm font-medium">Overall Score</p>
          </div>
          <p className="text-2xl font-bold text-white">
            {Math.round((metrics.seoScore + metrics.mobileScore + metrics.desktopScore) / 3)}
          </p>
          <p className="text-xs text-gray-400 mt-1">Average of all metrics</p>
        </div>

        <div className="bg-surface border border-surfaceHighlight rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <AlertCircle className="text-red-400" size={20} />
            <p className="text-gray-400 text-sm font-medium">Critical Issues</p>
          </div>
          <p className="text-2xl font-bold text-white">{criticalIssues.length}</p>
          <p className="text-xs text-gray-400 mt-1">Needs immediate attention</p>
        </div>
      </div>

      {/* Issues Section */}
      <div>
        <h3 className="text-lg font-semibold text-white mb-4">
          Issues & Recommendations ({metrics.issues.length})
        </h3>

        {criticalIssues.length > 0 && (
          <div className="mb-6">
            <h4 className="text-red-400 font-semibold mb-3 flex items-center gap-2">
              <AlertTriangle size={18} />
              Critical Issues ({criticalIssues.length})
            </h4>
            <div className="space-y-3">
              {criticalIssues.map(issue => (
                <IssueCard key={issue.id} issue={issue} />
              ))}
            </div>
          </div>
        )}

        {highIssues.length > 0 && (
          <div className="mb-6">
            <h4 className="text-orange-400 font-semibold mb-3 flex items-center gap-2">
              <AlertTriangle size={18} />
              High Priority ({highIssues.length})
            </h4>
            <div className="space-y-3">
              {highIssues.map(issue => (
                <IssueCard key={issue.id} issue={issue} />
              ))}
            </div>
          </div>
        )}

        {metrics.issues.filter(i => i.severity === 'low' || i.severity === 'medium').length > 0 && (
          <div>
            <h4 className="text-yellow-400 font-semibold mb-3 flex items-center gap-2">
              <AlertCircle size={18} />
              Other Issues ({metrics.issues.filter(i => i.severity === 'low' || i.severity === 'medium').length})
            </h4>
            <div className="space-y-3">
              {metrics.issues
                .filter(i => i.severity === 'low' || i.severity === 'medium')
                .map(issue => (
                  <IssueCard key={issue.id} issue={issue} />
                ))}
            </div>
          </div>
        )}
      </div>

      {/* Recommendations */}
      <div>
        <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
          <Lightbulb className="text-yellow-400" size={20} />
          Optimization Recommendations
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            {
              title: 'Implement Structured Data',
              description: 'Add Schema.org markup to improve SERP features and rich snippets',
              impact: 'High',
              effort: 'Medium',
            },
            {
              title: 'Optimize Core Web Vitals',
              description: 'Improve LCP, FID, and CLS scores for better ranking',
              impact: 'Critical',
              effort: 'High',
            },
            {
              title: 'Mobile-First Design',
              description: 'Ensure website is fully optimized for mobile devices',
              impact: 'High',
              effort: 'Medium',
            },
            {
              title: 'Content Optimization',
              description: 'Improve meta descriptions and heading structure',
              impact: 'High',
              effort: 'Low',
            },
            {
              title: 'Image Optimization',
              description: 'Use WebP format and implement lazy loading',
              impact: 'Medium',
              effort: 'Medium',
            },
            {
              title: 'Internal Linking',
              description: 'Build strategic internal link structure',
              impact: 'Medium',
              effort: 'Low',
            },
          ].map((rec, idx) => (
            <div key={idx} className="bg-surface border border-surfaceHighlight rounded-lg p-4">
              <h4 className="text-white font-semibold mb-2">{rec.title}</h4>
              <p className="text-gray-300 text-sm mb-3">{rec.description}</p>
              <div className="flex gap-2 text-xs">
                <span className={`px-2 py-1 rounded ${
                  rec.impact === 'Critical' ? 'bg-red-600/20 text-red-300' :
                  rec.impact === 'High' ? 'bg-orange-600/20 text-orange-300' :
                  'bg-yellow-600/20 text-yellow-300'
                }`}>
                  Impact: {rec.impact}
                </span>
                <span className={`px-2 py-1 rounded ${
                  rec.effort === 'Low' ? 'bg-green-600/20 text-green-300' :
                  rec.effort === 'Medium' ? 'bg-yellow-600/20 text-yellow-300' :
                  'bg-orange-600/20 text-orange-300'
                }`}>
                  Effort: {rec.effort}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Technical SEO Checklist */}
      <div>
        <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
          <Target className="text-indigo-400" size={20} />
          Technical SEO Checklist
        </h3>
        <div className="bg-surface border border-surfaceHighlight rounded-lg p-6 space-y-4">
          <div>
            <h4 className="text-indigo-400 font-semibold mb-2">✓ Indexing & Crawlability</h4>
            <ul className="space-y-1 text-sm text-gray-300">
              <li>✓ Robots.txt properly configured</li>
              <li>✓ Sitemap.xml submitted</li>
              <li>✓ No CSS/JS blocking</li>
            </ul>
          </div>
          <div className="border-t border-gray-700 pt-4">
            <h4 className="text-green-400 font-semibold mb-2">✓ Core Web Vitals</h4>
            <ul className="space-y-1 text-sm text-gray-300">
              <li>⚠ LCP needs improvement (target: &lt;2.5s)</li>
              <li>✓ FID excellent</li>
              <li>✓ CLS excellent</li>
            </ul>
          </div>
          <div className="border-t border-gray-700 pt-4">
            <h4 className="text-yellow-400 font-semibold mb-2">⚠ Mobile & Performance</h4>
            <ul className="space-y-1 text-sm text-gray-300">
              <li>✓ Responsive design</li>
              <li>⚠ Image optimization needed</li>
              <li>✓ CSS/JS minified</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WebsiteAnalysis;
