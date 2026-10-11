import { useState, useEffect } from 'react';
import { Search, Bell, Plus, Terminal, Sparkles, Check, ChevronDown, Activity, LogIn, LogOut, User as UserIcon } from 'lucide-react';
import { Project, EnvironmentType } from '../../types';
import { auth, googleProvider } from '../../lib/firebase';
import { signInWithPopup, signOut, onAuthStateChanged, User } from 'firebase/auth';

interface CommandBarProps {
  projects: Project[];
  selectedProjectId: string;
  onSelectProject: (projectId: string) => void;
  selectedEnv: EnvironmentType;
  onChangeEnv: (env: EnvironmentType) => void;
  onGoHome: () => void;
  onOpenNewProject: () => void;
  onOpenSearch?: () => void;
}

export const CommandBar = ({
  projects,
  selectedProjectId,
  onSelectProject,
  selectedEnv,
  onChangeEnv,
  onGoHome,
  onOpenNewProject,
  onOpenSearch
}: CommandBarProps) => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
    });
    return () => unsubscribe();
  }, []);

  const handleGoogleSignIn = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (error) {
      console.error('Sign-in error:', error);
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      setShowProfileMenu(false);
    } catch (error) {
      console.error('Sign-out error:', error);
    }
  };

  const mockNotifications = [
    { id: '1', title: 'AI Audit Completed', desc: '0 high severity vulnerabilities found', time: '2m ago', type: 'success' },
    { id: '2', title: 'GitHub Sync Active', desc: 'Main branch synced with commit e8f910', time: '12m ago', type: 'info' },
    { id: '3', title: 'Database Migration', desc: 'Firebase Firestore synchronized cleanly', time: '1h ago', type: 'info' },
  ];

  return (
    <header className="h-14 border-b border-white/10 flex items-center justify-between px-5 bg-[#09090C] shrink-0 z-30 relative select-none">
      {/* Left: Brand & Selector */}
      <div className="flex items-center gap-4">
        <button
          onClick={onGoHome}
          className="flex items-center gap-2.5 group text-left cursor-pointer focus:outline-none"
        >
          <div className="w-6 h-6 bg-[#D4AF37] rounded flex items-center justify-center shrink-0 shadow-[0_0_12px_rgba(212,175,55,0.3)] group-hover:scale-105 transition-transform">
            <div className="w-3 h-3 border-2 border-black rotate-45"></div>
          </div>
          <div className="flex flex-col">
            <span className="text-[11px] font-bold tracking-[0.2em] text-[#D4AF37] font-mono group-hover:text-amber-300 transition-colors">
              RK AGENT FAYEAFINITY
            </span>
            <span className="text-[8px] font-mono text-neutral-500 tracking-wider uppercase">
              AI Project Studio
            </span>
          </div>
        </button>

        <div className="h-5 w-[1px] bg-white/10 mx-1"></div>

        {/* Project Dropdown */}
        <div className="flex items-center gap-2">
          <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_#34d399]"></div>
          <div className="relative">
            <select
              value={selectedProjectId}
              onChange={(e) => onSelectProject(e.target.value)}
              className="bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg pl-3 pr-8 py-1 text-[10px] font-bold tracking-wider text-white uppercase focus:outline-none focus:ring-1 focus:ring-[#D4AF37] cursor-pointer appearance-none transition-colors"
            >
              {projects.map((p) => (
                <option key={p.id} value={p.id} className="bg-[#121215] text-white font-mono">
                  {p.name.toUpperCase()}
                </option>
              ))}
            </select>
            <ChevronDown className="w-3 h-3 text-neutral-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
        </div>

        {/* Environment Tag */}
        <div className="hidden sm:flex items-center gap-1.5 bg-[#D4AF37]/10 border border-[#D4AF37]/30 rounded-lg px-2.5 py-0.5">
          <Activity className="w-3 h-3 text-[#D4AF37]" />
          <select
            value={selectedEnv}
            onChange={(e) => onChangeEnv(e.target.value as EnvironmentType)}
            className="bg-transparent text-[10px] font-bold tracking-widest text-[#D4AF37] font-mono uppercase focus:outline-none cursor-pointer"
          >
            <option value="LOCAL" className="bg-[#121215] text-white">LOCAL</option>
            <option value="PREVIEW" className="bg-[#121215] text-white">PREVIEW</option>
            <option value="PRODUCTION" className="bg-[#121215] text-white">PRODUCTION</option>
          </select>
        </div>
      </div>

      {/* Right: Actions, Search, Notifications & Profile */}
      <div className="flex items-center gap-3.5">
        <button
          onClick={onOpenNewProject}
          className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#D4AF37] hover:bg-amber-400 text-black text-[10px] font-bold uppercase tracking-wider transition-all shadow-[0_0_15px_rgba(212,175,55,0.25)] hover:scale-105 active:scale-95"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>New Project</span>
        </button>

        {/* Search Bar Button */}
        <button
          onClick={onOpenSearch}
          className="relative flex items-center gap-2 bg-[#121216] hover:bg-[#181820] border border-white/10 hover:border-[#D4AF37]/40 rounded-lg pl-3 pr-8 py-1.5 text-[11px] text-neutral-400 transition-all cursor-pointer w-44 lg:w-64 text-left group"
        >
          <Search className="w-3.5 h-3.5 text-neutral-500 group-hover:text-[#D4AF37] transition-colors" />
          <span className="truncate">Search projects, files, tasks...</span>
          <span className="absolute right-2 top-1/2 -translate-y-1/2 text-[9px] font-mono text-neutral-500 bg-white/5 px-1.5 py-0.5 rounded border border-white/5">
            ⌘K
          </span>
        </button>

        {/* Live Agent Status */}
        <div className="hidden lg:flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-1 rounded-lg text-emerald-400">
          <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-ping"></div>
          <span className="text-[10px] font-mono font-bold tracking-wider uppercase">AI Assistant Ready</span>
        </div>

        <div className="h-4 w-[1px] bg-white/10"></div>

        {/* Notifications */}
        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="p-1.5 text-neutral-400 hover:text-white hover:bg-white/5 rounded-lg transition-colors relative"
            title="Notifications"
          >
            <Bell className="w-4 h-4" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-[#D4AF37] rounded-full ring-2 ring-[#09090C]"></span>
          </button>

          {showNotifications && (
            <div className="absolute right-0 mt-2 w-72 bg-[#0E0E12] border border-white/10 rounded-xl shadow-2xl p-3 z-50 animate-fadeIn">
              <div className="flex items-center justify-between pb-2 mb-2 border-b border-white/5">
                <span className="text-xs font-mono font-bold text-white uppercase">SYSTEM NOTIFICATIONS</span>
                <span className="text-[9px] text-[#D4AF37] font-mono">3 NEW</span>
              </div>
              <div className="space-y-2">
                {mockNotifications.map((n) => (
                  <div key={n.id} className="p-2 rounded-lg bg-white/[0.02] border border-white/5 hover:border-white/10 transition-colors">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-neutral-200">{n.title}</span>
                      <span className="text-[9px] font-mono text-neutral-500">{n.time}</span>
                    </div>
                    <p className="text-[10px] text-neutral-400 mt-0.5">{n.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* User Profile */}
        <div className="relative">
          <button
            onClick={() => setShowProfileMenu(!showProfileMenu)}
            className="flex items-center gap-2 pl-1 cursor-pointer focus:outline-none group"
            title={currentUser ? currentUser.email || 'Authenticated' : 'Click to Sign In'}
          >
            {currentUser?.photoURL ? (
              <img src={currentUser.photoURL} alt="Avatar" className="w-7 h-7 rounded-lg border border-[#D4AF37]/40 object-cover" />
            ) : (
              <div className="w-7 h-7 rounded-lg border border-[#D4AF37]/40 bg-gradient-to-tr from-[#1a1812] to-[#2a2416] flex items-center justify-center text-[10px] font-bold text-[#D4AF37] tracking-widest font-mono shadow-sm group-hover:border-[#D4AF37] transition-colors">
                {currentUser ? (currentUser.displayName?.substring(0, 2).toUpperCase() || 'RK') : 'RK'}
              </div>
            )}
          </button>

          {showProfileMenu && (
            <div className="absolute right-0 mt-2 w-64 bg-[#0E0E12] border border-white/10 rounded-xl shadow-2xl p-4 z-50 animate-fadeIn">
              {currentUser ? (
                <div className="space-y-3">
                  <div className="pb-3 border-b border-white/10">
                    <p className="text-xs font-bold text-white truncate">{currentUser.displayName || 'Agent User'}</p>
                    <p className="text-[10px] text-neutral-400 truncate mt-0.5">{currentUser.email}</p>
                    <span className="inline-block mt-2 px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 text-[9px] font-mono border border-emerald-500/20">
                      Firebase Auth Connected
                    </span>
                  </div>
                  <button
                    onClick={handleSignOut}
                    className="w-full flex items-center justify-center gap-2 py-2 px-3 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 text-xs font-bold tracking-wider uppercase transition-colors border border-red-500/20 cursor-pointer"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                    <span>Sign Out</span>
                  </button>
                </div>
              ) : (
                <div className="space-y-3">
                  <div className="pb-3 border-b border-white/10">
                    <p className="text-xs font-bold text-white">Agent FayaFinity Auth</p>
                    <p className="text-[10px] text-neutral-400 mt-0.5">Sign in with Google to sync your projects and secure workspace.</p>
                  </div>
                  <button
                    onClick={handleGoogleSignIn}
                    className="w-full flex items-center justify-center gap-2 py-2 px-3 rounded-lg bg-[#D4AF37] hover:bg-amber-400 text-black text-xs font-bold tracking-wider uppercase transition-all shadow-[0_0_15px_rgba(212,175,55,0.2)] cursor-pointer"
                  >
                    <LogIn className="w-3.5 h-3.5" />
                    <span>Sign In with Google</span>
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

