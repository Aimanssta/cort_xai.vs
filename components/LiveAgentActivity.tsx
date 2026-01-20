import React, { useState, useEffect } from 'react';
import { Phone, Mail, MessageSquare, CheckCircle, TrendingUp } from 'lucide-react';

interface Activity {
  id: string;
  type: 'call' | 'email' | 'message' | 'deal' | 'meeting';
  title: string;
  description: string;
  amount?: string;
  icon: React.ReactNode;
  color: string;
  time: string;
  isNew: boolean;
}

const LiveAgentActivity: React.FC = () => {
  const [activities, setActivities] = useState<Activity[]>([
    {
      id: '1',
      type: 'deal',
      title: 'Meeting Booked',
      description: '+$12,000 Deal',
      amount: '+$12,000',
      icon: <CheckCircle className="h-5 w-5" />,
      color: 'emerald',
      time: '2 mins ago',
      isNew: true,
    },
    {
      id: '2',
      type: 'call',
      title: 'Inbound Call',
      description: 'Tech Startup Co.',
      icon: <Phone className="h-5 w-5" />,
      color: 'blue',
      time: '5 mins ago',
      isNew: true,
    },
    {
      id: '3',
      type: 'email',
      title: 'Email Sequence',
      description: 'Sent to 142 prospects',
      icon: <Mail className="h-5 w-5" />,
      color: 'purple',
      time: '8 mins ago',
      isNew: false,
    },
    {
      id: '4',
      type: 'meeting',
      title: 'Deal Closed',
      description: '+$8,500 Contract Signed',
      amount: '+$8,500',
      icon: <TrendingUp className="h-5 w-5" />,
      color: 'amber',
      time: '12 mins ago',
      isNew: false,
    },
    {
      id: '5',
      type: 'message',
      title: 'SMS Delivered',
      description: 'Follow-up to 87 leads',
      icon: <MessageSquare className="h-5 w-5" />,
      color: 'indigo',
      time: '15 mins ago',
      isNew: false,
    },
  ]);

  useEffect(() => {
    // Simulate new activities
    const interval = setInterval(() => {
      const randomType: Activity['type'][] = ['call', 'email', 'message', 'deal', 'meeting'];
      const randomDescriptions = [
        'Meeting Booked: +$12,000 Deal',
        'Inbound Call: Tech Startup',
        'Email Sent to 142 leads',
        'Deal Closed: +$8,500',
        'SMS Follow-up: 87 leads',
      ];

      const newActivity: Activity = {
        id: Date.now().toString(),
        type: randomType[Math.floor(Math.random() * randomType.length)],
        title: randomDescriptions[Math.floor(Math.random() * randomDescriptions.length)],
        description: randomDescriptions[Math.floor(Math.random() * randomDescriptions.length)],
        icon: <CheckCircle className="h-5 w-5" />,
        color: ['emerald', 'blue', 'purple', 'amber', 'indigo'][Math.floor(Math.random() * 5)],
        time: 'just now',
        isNew: true,
      };

      setActivities((prev) => [newActivity, ...prev.slice(0, 4)]);
    }, 8000);

    return () => clearInterval(interval);
  }, []);

  const colorClasses = {
    emerald: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
    blue: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
    purple: 'bg-purple-500/10 text-purple-400 border-purple-500/20',
    amber: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
    indigo: 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20',
  };

  return (
    <div className="w-full">
      <div className="space-y-3 max-h-96 overflow-y-auto custom-scrollbar">
        {activities.map((activity, index) => (
          <div
            key={activity.id}
            className={`flex items-start gap-4 p-4 rounded-xl border transition-all duration-500 ${
              colorClasses[activity.color as keyof typeof colorClasses]
            } ${
              activity.isNew ? 'animate-slide-in' : ''
            } ${
              index === 0 ? 'ring-2 ring-cort-500/50' : ''
            }`}
            style={{
              animationDelay: `${index * 50}ms`,
            }}
          >
            <div className={`p-2 rounded-lg bg-${activity.color}-500/20`}>
              {activity.icon}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-white">{activity.title}</p>
              <p className="text-xs text-slate-300 mt-0.5">{activity.description}</p>
              {activity.amount && (
                <p className="text-sm font-bold text-emerald-400 mt-1">{activity.amount}</p>
              )}
            </div>
            <div className="flex items-center gap-2">
              {activity.isNew && (
                <div className="w-2 h-2 bg-cort-500 rounded-full animate-pulse"></div>
              )}
              <span className="text-xs text-slate-400 whitespace-nowrap">{activity.time}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LiveAgentActivity;
