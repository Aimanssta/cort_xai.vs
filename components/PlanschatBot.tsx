import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, Send, X, Minimize2, Maximize2, Bot } from 'lucide-react';

interface Message {
  id: string;
  text: string;
  isBot: boolean;
  timestamp: Date;
}

const plansData = {
  'sales agents': {
    title: 'Sales AI Agents',
    description: 'Autonomous sales agents that handle outreach, qualification, and booking.',
    features: [
      'Live phone calling via Retell AI',
      'Email & SMS outreach campaigns',
      'Lead qualification & scoring',
      'Calendar integration for booking',
      'Real-time agent performance analytics',
    ],
    pricing: 'Custom - Starting at $2,000/month',
    cta: '/solutions/sales-agents',
  },
  'lead generation': {
    title: 'Lead Generation Suite',
    description: 'Targeted lead capture, list building, and prospect enrichment.',
    features: [
      'Web form builders with lead capture',
      'Database management & enrichment',
      'Multi-channel outreach (email, SMS, calls)',
      'Lead scoring automation',
      'CRM integration',
    ],
    pricing: 'Custom - Starting at $1,500/month',
    cta: '/solutions/lead-gen',
  },
  'local seo': {
    title: 'Local SEO Services',
    description: 'Dominate local search results and Google Maps rankings.',
    features: [
      'Technical SEO audits',
      'On-page optimization',
      'Local citation building (70+ directories)',
      'Google Business Profile management',
      'Monthly rank tracking & reporting',
    ],
    pricing: 'Custom - Starting at $1,200/month',
    cta: '/solutions/local-seo',
  },
  'local aio': {
    title: 'Local AIO (AI Optimization)',
    description: 'Rank in AI search engines (Google Generative Engine, ChatGPT, Gemini).',
    features: [
      'Entity authority building',
      'AI Snapshot optimization',
      'Structured data implementation',
      'Authority site linking strategy',
      'Competitive AI visibility analysis',
    ],
    pricing: 'Custom - Starting at $1,500/month',
    cta: '/solutions/local-aio',
  },
};

const botResponses: { [key: string]: string } = {
  'plans': `We offer four main service categories: **Sales Agents**, **Lead Generation**, **Local SEO**, and **Local AIO**. What would you like to know more about?`,
  'pricing': `All our plans are custom based on your business needs, but here are starting price points:
- Sales AI: Starting at $2,000/month
- Lead Generation: Starting at $1,500/month
- Local SEO: Starting at $1,200/month
- Local AIO: Starting at $1,500/month

Would you like details on any specific plan?`,
  'sales agents': `**Sales AI Agents** handle your entire outbound process:
- Live phone calling (AI-powered)
- Email & SMS campaigns
- Lead qualification
- Calendar booking automation
- Real-time analytics

This is perfect if you need to scale your sales team without hiring. Would you like to schedule a demo?`,
  'lead generation': `**Lead Generation Suite** captures and nurtures prospects:
- Smart web forms
- Lead database management
- Automated enrichment
- Multi-channel outreach
- Lead scoring

Great for building targeted prospect lists and automating follow-up. Interested in learning more?`,
  'local seo': `**Local SEO Services** get your business found locally:
- Complete SEO audits
- On-page optimization
- 70+ directory citations
- Google Business Profile management
- Monthly ranking reports

Perfect for restaurants, contractors, medical offices, and service businesses. Need more info?`,
  'local aio': `**Local AIO** (AI Optimization) helps you rank in AI search results:
- Entity authority building
- AI Snapshot optimization
- Structured data setup
- Authority linking strategy
- AI visibility analysis

This is emerging as critical—AI is taking over search. Want to see how it works?`,
  'demo': `Great! I'd love to set up a demo for you. 
- Click "Start Your Pilot" on the homepage to book a 30-min strategy call
- Or email us at sales@cortxai.com
- Or call +1 (888) 555-0123

What would work best for you?`,
  'pricing details': `Our pricing depends on your business size and goals:
- **Small Business**: $1,200-2,000/month
- **Mid-Market**: $2,500-5,000/month
- **Enterprise**: Custom pricing

Each plan includes onboarding, monthly reporting, and strategy optimization. Want me to tell you more about a specific plan?`,
  'features': `Here's what makes us unique:
✅ AI-powered autonomous agents
✅ Real-time performance analytics
✅ Custom integrations (Zapier, Make, webhooks)
✅ Dedicated strategy team
✅ No setup fees
✅ 30-day performance guarantee

Which service interests you most?`,
  'support': `We offer 24/7 support:
- Email: daniel@cortxai.us
- Phone: +1 (305) 426-7663
- Hours: Mon-Fri 9am-6pm EST (emergency support available)
- Slack channel for Enterprise clients

How can we help you today?`,
  'hello': `👋 Hi there! I'm the Cort X AI assistant. I'm here to help you learn about our plans and services. You can ask me about:
- **Sales Agents** - AI phone calling & outreach
- **Lead Generation** - Smart prospect capture
- **Local SEO** - Dominate local search
- **Local AIO** - Rank in AI search engines

What would you like to know?`,
  'hi': `👋 Hi! I'm here to help. Ask me about our **Sales Agents**, **Lead Generation**, **Local SEO**, or **Local AIO** services. Or ask about pricing, features, and scheduling a demo!`,
  'hey': `🎯 Hey there! Welcome to Cort X AI. I can help you learn about our plans. What's your main business challenge?`,
  'help': `I can help you with:
📞 **Sales Agents** - Autonomous outreach & calling
📊 **Lead Generation** - Capture & nurture prospects
🗺️ **Local SEO** - Google Maps & local rankings
🤖 **Local AIO** - AI search engine optimization

Or ask about pricing, features, and how to get started!`,
  'what can you do': `I can explain:
✅ Our four main services and how they work
✅ Pricing and what's included
✅ Who each service is best for
✅ How to schedule a demo or consultation
✅ Integration capabilities
✅ Performance guarantees

Just ask! What interests you?`,
};

const getPlanInfo = (keyword: string): string | null => {
  const key = keyword.toLowerCase();
  for (const [k, v] of Object.entries(plansData)) {
    if (key.includes(k)) {
      return `**${v.title}**\n\n${v.description}\n\n**Key Features:**\n${v.features.map(f => `• ${f}`).join('\n')}\n\n**Starting Price:** ${v.pricing}`;
    }
  }
  return null;
};

const getResponse = (userMessage: string): string => {
  const msg = userMessage.toLowerCase().trim();

  // Check for plan-specific keywords
  const planInfo = getPlanInfo(msg);
  if (planInfo) return planInfo;

  // Check for exact or partial matches
  for (const [key, response] of Object.entries(botResponses)) {
    if (msg.includes(key)) {
      return response;
    }
  }

  // Default response
  return `Great question! I'm here to help. Try asking me about:
- Our **Sales Agents**, **Lead Generation**, **Local SEO**, or **Local AIO** services
- **Pricing** and what's included
- How to schedule a **demo**
- Our **features** and support options

What would you like to know?`;
};

const PlansChatBot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: `👋 Hi! I'm the Cort X AI assistant. I can help you learn about our **Sales Agents**, **Lead Generation**, **Local SEO**, and **Local AIO** services. What would you like to know?`,
      isBot: true,
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      text: input,
      isBot: false,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    // Simulate bot response delay
    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: getResponse(input),
        isBot: true,
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, botResponse]);
      setIsLoading(false);
    }, 600);
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-40 bg-gradient-to-br from-cort-500 to-cort-600 text-white p-4 rounded-full shadow-lg hover:shadow-xl hover:scale-110 transition-all duration-300 border border-cort-400/30 group"
        aria-label="Open chat"
      >
        <MessageCircle className="h-6 w-6 group-hover:rotate-12 transition-transform" />
        <span className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-white text-xs font-bold">1</span>
      </button>
    );
  }

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col shadow-2xl">
      {/* Chat Window */}
      {!isMinimized && (
        <div className="bg-slate-950 border border-slate-800 rounded-2xl w-96 max-h-[600px] flex flex-col overflow-hidden backdrop-blur-xl">
          {/* Header */}
          <div className="bg-gradient-to-r from-cort-600 to-cort-700 p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-white/20 p-2 rounded-lg">
                <Bot className="h-5 w-5 text-white" />
              </div>
              <div>
                <h3 className="font-bold text-white">Plans & Services</h3>
                <p className="text-xs text-cort-100">We're online!</p>
              </div>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setIsMinimized(true)}
                className="text-white hover:bg-cort-500/30 p-2 rounded-lg transition-colors"
              >
                <Minimize2 className="h-4 w-4" />
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="text-white hover:bg-cort-500/30 p-2 rounded-lg transition-colors"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-950/50">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${msg.isBot ? 'justify-start' : 'justify-end'}`}
              >
                <div
                  className={`max-w-xs px-4 py-3 rounded-xl ${
                    msg.isBot
                      ? 'bg-slate-800 text-slate-100 border border-slate-700'
                      : 'bg-cort-600 text-white'
                  }`}
                >
                  <p className="text-sm whitespace-pre-wrap">{msg.text}</p>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-slate-800 text-slate-100 px-4 py-3 rounded-xl border border-slate-700">
                  <div className="flex gap-2 items-center">
                    <div className="h-2 w-2 bg-cort-400 rounded-full animate-bounce"></div>
                    <div className="h-2 w-2 bg-cort-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                    <div className="h-2 w-2 bg-cort-400 rounded-full animate-bounce" style={{animationDelay: '0.4s'}}></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="border-t border-slate-800 p-4 bg-slate-900/50 backdrop-blur">
            <form onSubmit={handleSendMessage} className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about our plans..."
                className="flex-1 bg-slate-800 border border-slate-700 text-white px-4 py-2 rounded-lg focus:outline-none focus:border-cort-500 text-sm placeholder-slate-500"
              />
              <button
                type="submit"
                disabled={isLoading}
                className="bg-cort-600 hover:bg-cort-700 disabled:opacity-50 text-white p-2 rounded-lg transition-colors"
              >
                <Send className="h-4 w-4" />
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Minimized State */}
      {isMinimized && (
        <button
          onClick={() => setIsMinimized(false)}
          className="bg-gradient-to-br from-cort-500 to-cort-600 text-white px-6 py-3 rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 border border-cort-400/30 font-semibold flex items-center gap-2"
        >
          <Bot className="h-4 w-4" />
          Chat with us
          <Maximize2 className="h-4 w-4" />
        </button>
      )}
    </div>
  );
};

export default PlansChatBot;
