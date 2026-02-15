import React, { useState, useRef, useEffect } from 'react';
import { 
  LayoutDashboard, 
  FileText, 
  BarChart2, 
  Search, 
  MapPin, 
  Users, 
  Megaphone,
  Folder,
  CheckCircle2,
  Bell,
  ChevronDown,
  Menu,
  Briefcase,
  Plus
} from 'lucide-react';
import { ViewState, BusinessProfile } from '../types';

interface SidebarItemProps {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
  onClick: () => void;
}

const SidebarItem: React.FC<SidebarItemProps> = ({ icon, label, active, onClick }) => (
  <div 
    onClick={onClick}
    className={`flex items-center gap-3 px-4 py-3 rounded-lg cursor-pointer transition-all duration-200 ${
      active 
        ? 'bg-surfaceHighlight text-white shadow-lg shadow-indigo-500/10 border border-surfaceHighlight' 
        : 'text-gray-400 hover:text-gray-200 hover:bg-surfaceHighlight/50'
    }`}
  >
    {icon}
    <span className="text-sm font-medium">{label}</span>
    {active && <div className="ml-auto w-1 h-4 bg-indigo-500 rounded-full shadow-[0_0_10px_rgba(99,102,241,0.5)]"></div>}
  </div>
);

interface LayoutProps {
  children: React.ReactNode;
  currentView: ViewState;
  onNavigate: (view: ViewState) => void;
  profiles: BusinessProfile[];
  currentProfile: BusinessProfile;
  onSwitchProfile: (profile: BusinessProfile) => void;
  onConnectClick: () => void;
}

const Layout: React.FC<LayoutProps> = ({ 
  children, 
  currentView, 
  onNavigate,
  profiles,
  currentProfile,
  onSwitchProfile,
  onConnectClick
}) => {
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsProfileMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="min-h-screen bg-background text-gray-200 font-sans flex overflow-hidden">
      {/* Sidebar */}
      <aside className="w-64 bg-background border-r border-surfaceHighlight flex-shrink-0 hidden md:flex flex-col z-20">
        <div className="p-6 flex items-center gap-2">
           <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-indigo-500 to-fuchsia-500 flex items-center justify-center font-bold text-white text-lg shadow-lg shadow-indigo-500/20">C</div>
           <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">Cort X AI</span>
        </div>

        <div className="px-4 mb-6 relative" ref={dropdownRef}>
           <div 
             onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
             className="bg-surfaceHighlight rounded-lg p-2 flex items-center gap-2 text-gray-200 hover:text-white cursor-pointer transition-colors border border-transparent hover:border-gray-700 select-none"
           >
              <div className={`w-5 h-5 rounded-md ${currentProfile.color} flex items-center justify-center text-[10px] font-bold text-white`}>
                {currentProfile.initials}
              </div>
              <span className="text-sm font-medium truncate flex-1">{currentProfile.name}</span>
              <ChevronDown className={`w-4 h-4 text-gray-500 transition-transform ${isProfileMenuOpen ? 'rotate-180' : ''}`} />
           </div>

           {/* Dropdown Menu */}
           {isProfileMenuOpen && (
             <div className="absolute top-full left-4 right-4 mt-2 bg-surface border border-surfaceHighlight rounded-lg shadow-xl overflow-hidden z-50">
               <div className="py-1">
                 <div className="px-3 py-2 text-xs text-gray-500 font-semibold uppercase tracking-wider">Switch Profile</div>
                 {profiles.map(profile => (
                   <div 
                     key={profile.id}
                     onClick={() => {
                       onSwitchProfile(profile);
                       setIsProfileMenuOpen(false);
                     }}
                     className={`px-3 py-2 flex items-center gap-2 cursor-pointer hover:bg-surfaceHighlight ${profile.id === currentProfile.id ? 'bg-surfaceHighlight/50' : ''}`}
                   >
                      <div className={`w-5 h-5 rounded-md ${profile.color} flex items-center justify-center text-[10px] font-bold text-white`}>
                        {profile.initials}
                      </div>
                      <span className="text-sm text-gray-300">{profile.name}</span>
                      {profile.id === currentProfile.id && <CheckCircle2 className="w-3 h-3 text-indigo-500 ml-auto" />}
                   </div>
                 ))}
                 <div className="h-px bg-surfaceHighlight my-1"></div>
                 <div 
                   onClick={() => {
                     onConnectClick();
                     setIsProfileMenuOpen(false);
                   }}
                   className="px-3 py-2 flex items-center gap-2 cursor-pointer hover:bg-surfaceHighlight text-indigo-400 hover:text-indigo-300"
                 >
                    <Plus className="w-4 h-4" />
                    <span className="text-sm font-medium">Connect New Profile</span>
                 </div>
               </div>
             </div>
           )}
        </div>

        <nav className="flex-1 px-4 space-y-1 overflow-y-auto">
          <SidebarItem 
            icon={<CheckCircle2 className="w-5 h-5" />} 
            label="Profile Audit" 
            active={currentView === 'audit'}
            onClick={() => onNavigate('audit')}
          />
          <SidebarItem 
            icon={<BarChart2 className="w-5 h-5" />} 
            label="GBP Dashboard" 
            active={currentView === 'gbp-dashboard'}
            onClick={() => onNavigate('gbp-dashboard')}
          />
          <SidebarItem 
            icon={<FileText className="w-5 h-5" />} 
            label="Post Scheduler" 
            active={currentView === 'post-scheduler'}
            onClick={() => onNavigate('post-scheduler')}
          />
          <SidebarItem 
            icon={<Megaphone className="w-5 h-5" />} 
            label="Advanced Strategy" 
            active={currentView === 'advanced-strategy'}
            onClick={() => onNavigate('advanced-strategy')}
          />
          <SidebarItem 
            icon={<Megaphone className="w-5 h-5" />} 
            label="Social Media" 
            active={currentView === 'social-media'}
            onClick={() => onNavigate('social-media')}
          />
          <SidebarItem 
            icon={<Search className="w-5 h-5" />} 
            label="Website Analysis" 
            active={currentView === 'website-analysis'}
            onClick={() => onNavigate('website-analysis')}
          />
          <div className="h-px bg-surfaceHighlight my-3"></div>
          <SidebarItem 
            icon={<MapPin className="w-5 h-5" />} 
            label="Locations" 
            active={currentView === 'locations'}
            onClick={() => onNavigate('locations')}
          />
          <SidebarItem 
            icon={<FileText className="w-5 h-5" />} 
            label="Content & Posts" 
            active={currentView === 'content'}
            onClick={() => onNavigate('content')}
          />
          <SidebarItem 
            icon={<BarChart2 className="w-5 h-5" />} 
            label="Performance" 
            active={currentView === 'performance'}
            onClick={() => onNavigate('performance')}
          />
          <SidebarItem 
            icon={<Search className="w-5 h-5" />} 
            label="Keywords" 
            active={currentView === 'keywords'}
            onClick={() => onNavigate('keywords')}
          />
          <SidebarItem 
            icon={<Users className="w-5 h-5" />} 
            label="Reviews" 
            active={currentView === 'reviews'}
            onClick={() => onNavigate('reviews')}
          />
          <SidebarItem 
            icon={<Megaphone className="w-5 h-5" />} 
            label="Promotions" 
            active={currentView === 'promotions'}
            onClick={() => onNavigate('promotions')}
          />
        </nav>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden relative">
        {/* Top Navbar */}
        <header className="h-16 border-b border-surfaceHighlight bg-background/50 backdrop-blur-sm flex items-center justify-between px-6 z-10">
           <div className="flex items-center gap-4 md:hidden">
              <Menu className="w-6 h-6" />
              <span className="font-bold">Cort X AI</span>
           </div>

           <div className="hidden md:flex flex-1 justify-center">
              {/* Center placeholder */}
           </div>

           <div className="flex items-center gap-4">
              <button className="p-2 text-gray-400 hover:text-white relative hover:bg-surfaceHighlight rounded-full transition-colors">
                 <Bell className="w-5 h-5" />
                 <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
              </button>
              <div className="relative">
                <button

                  className="flex items-center gap-3 pl-4 border-l border-surfaceHighlight hover:opacity-75 transition-opacity"
                >
                  <img src="https://picsum.photos/40/40" alt="Profile" className="w-8 h-8 rounded-full border border-surfaceHighlight" />
                  <div className="hidden lg:block">
                    <div className="text-xs font-semibold text-white">Olivia Rhye</div>
                    <div className="text-[10px] text-gray-500">olivia@cortx.ai</div>
                  </div>
                </button>
              </div>
           </div>
        </header>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-6 md:p-8 pb-32">
           {children}
        </div>
      </main>
    </div>
  );
};

export default Layout;