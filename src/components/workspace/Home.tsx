import { mockProjects } from '../../data';
import { AIInterface } from './AIInterface';
import { Project } from '../../types';
import { ArrowRight, Plus, FolderGit2, ShieldCheck, Activity, Cpu, GitBranch, Layers, Zap, Clock } from 'lucide-react';

interface HomeProps {
  projects?: Project[];
  onOpenProject?: (projectId: string) => void;
  onOpenNewProject?: () => void;
}

export const Home = ({ projects = mockProjects, onOpenProject, onOpenNewProject }: HomeProps) => {
  const primaryProject = projects[0] || mockProjects[0];

  const stats = [
    { label: 'TOTAL PROJECTS', value: projects.length.toString(), icon: FolderGit2, change: '+1 added this week', color: 'text-[#D4AF37]', accent: 'from-[#D4AF37]/20 to-transparent' },
    { label: 'AI ASSISTANTS', value: '4 RUNNING', icon: Cpu, change: 'All systems ready', color: 'text-emerald-400', accent: 'from-emerald-500/20 to-transparent' },
    { label: 'SECURITY RATING', value: '98 / 100', icon: ShieldCheck, change: 'High security score', color: 'text-blue-400', accent: 'from-blue-500/20 to-transparent' },
    { label: 'RESPONSE SPEED', value: '14 MS', icon: Activity, change: 'Fast & responsive', color: 'text-purple-400', accent: 'from-purple-500/20 to-transparent' }
  ];

  const recentActivity = [
    { title: 'Security Scan Completed', desc: '0 security issues found on Faye Affinity Core', time: '10m ago', icon: ShieldCheck, tag: 'SECURITY', tagColor: 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400' },
    { title: 'GitHub Repository Synced', desc: 'Merged latest changes into main branch', time: '35m ago', icon: GitBranch, tag: 'GIT', tagColor: 'bg-blue-500/10 border-blue-500/30 text-blue-400' },
    { title: 'Database Security Updated', desc: 'Applied user privacy rules to database', time: '2h ago', icon: Layers, tag: 'DATABASE', tagColor: 'bg-[#D4AF37]/10 border-[#D4AF37]/30 text-[#D4AF37]' }
  ];

  return (
    <div className="space-y-8 animate-fadeIn pb-8">
      {/* Top Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 bg-gradient-to-r from-[#0E0E12] via-[#12121A] to-[#0A0A0E] border border-white/10 hover:border-[#D4AF37]/30 rounded-2xl p-6 lg:p-8 relative overflow-hidden shadow-2xl transition-all">
        <div className="absolute -right-10 -bottom-10 w-72 h-72 bg-[#D4AF37]/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#D4AF37]/40 to-transparent"></div>

        <div className="relative z-10 space-y-2">
          <div className="flex items-center gap-2.5">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="text-[10px] font-mono font-bold tracking-[0.25em] text-[#D4AF37] uppercase bg-[#D4AF37]/10 border border-[#D4AF37]/20 px-2.5 py-0.5 rounded-md">
              WELCOME BACK • AI ASSISTANT READY
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-display font-bold text-white tracking-tight">
            Project Overview & Dashboard
          </h1>
          <p className="text-neutral-400 text-xs sm:text-sm max-w-xl leading-relaxed">
            Easily manage your web projects, connected cloud services, and AI assistant actions all in one place.
          </p>
        </div>

        <div className="flex items-center gap-3 relative z-10 shrink-0">
          <button
            onClick={onOpenNewProject}
            className="flex items-center gap-2 px-5 py-3 rounded-xl bg-[#D4AF37] hover:bg-amber-400 text-black text-xs font-bold uppercase tracking-wider transition-all shadow-[0_0_25px_rgba(212,175,55,0.3)] hover:scale-105 active:scale-95 cursor-pointer font-mono"
          >
            <Plus className="w-4 h-4" />
            <span>New Project</span>
          </button>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <div
              key={i}
              className="bg-[#0B0B0E] border border-white/10 hover:border-[#D4AF37]/40 rounded-2xl p-5 transition-all shadow-lg hover:shadow-2xl relative group overflow-hidden"
            >
              <div className={`absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r ${stat.accent}`}></div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-[10px] font-mono font-bold tracking-widest text-neutral-400 uppercase">
                  {stat.label}
                </span>
                <div className="p-2.5 rounded-xl bg-white/[0.04] text-neutral-300 group-hover:text-[#D4AF37] group-hover:bg-[#D4AF37]/10 transition-colors">
                  <Icon className="w-4 h-4" />
                </div>
              </div>
              <div className={`text-2xl lg:text-3xl font-mono font-bold ${stat.color} mb-1 tracking-tight`}>
                {stat.value}
              </div>
              <div className="text-[10px] font-mono text-neutral-400 flex items-center gap-1.5 pt-1">
                <Zap className="w-3 h-3 text-[#D4AF37]" />
                <span>{stat.change}</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Primary Workspace Cards Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
        {/* Active Project Overview Card */}
        <div
          onClick={() => onOpenProject && onOpenProject(primaryProject.id)}
          className="bg-[#0B0B0E] border border-white/10 hover:border-[#D4AF37]/50 rounded-2xl p-6 lg:p-7 flex flex-col justify-between group transition-all cursor-pointer relative shadow-2xl overflow-hidden hover:bg-[#0E0E12]"
        >
          <div className="absolute top-0 right-0 w-48 h-48 bg-[#D4AF37]/5 rounded-full blur-3xl pointer-events-none group-hover:bg-[#D4AF37]/10 transition-all"></div>
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#D4AF37]/40 via-amber-200/20 to-transparent"></div>

          <div>
            <div className="flex items-center justify-between mb-4">
              <span className="text-[10px] font-mono font-bold tracking-widest text-[#D4AF37] bg-[#D4AF37]/10 border border-[#D4AF37]/30 px-3 py-1 rounded-full uppercase flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37] animate-pulse"></span>
                CURRENT ACTIVE PROJECT
              </span>
              <div className="p-2 rounded-xl bg-white/5 group-hover:bg-[#D4AF37] text-neutral-400 group-hover:text-black transition-all">
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </div>
            </div>

            <h3 className="text-2xl font-display font-bold text-white group-hover:text-[#D4AF37] transition-colors">
              {primaryProject.name}
            </h3>
            <p className="text-neutral-400 text-xs mt-2 leading-relaxed">
              {primaryProject.description}
            </p>
          </div>

          <div className="mt-8 pt-4 border-t border-white/10 space-y-4">
            <div className="grid grid-cols-3 gap-2 font-mono text-[11px]">
              <div className="bg-white/[0.02] border border-white/5 p-2.5 rounded-xl">
                <span className="text-neutral-400 block text-[9px] uppercase">Status</span>
                <span className="text-emerald-400 font-bold block mt-0.5">{primaryProject.status}</span>
              </div>
              <div className="bg-white/[0.02] border border-white/5 p-2.5 rounded-xl">
                <span className="text-neutral-400 block text-[9px] uppercase">Environment</span>
                <span className="text-white font-bold block mt-0.5">{primaryProject.environment}</span>
              </div>
              <div className="bg-white/[0.02] border border-white/5 p-2.5 rounded-xl">
                <span className="text-neutral-400 block text-[9px] uppercase">Branch</span>
                <span className="text-[#D4AF37] font-bold block mt-0.5">{primaryProject.branch || 'main'}</span>
              </div>
            </div>

            <div className="flex items-center justify-between text-xs text-neutral-400 font-mono pt-1">
              <span className="flex items-center gap-1.5 text-[11px]">
                <span className="w-2 h-2 rounded-full bg-blue-400"></span>
                Connected to GitHub, Supabase & Vercel
              </span>
              <span className="text-[#D4AF37] font-bold group-hover:underline flex items-center gap-1">
                Open Project &rarr;
              </span>
            </div>
          </div>
        </div>

        {/* AI Engineering Agent Interface */}
        <div className="h-full min-h-[360px]">
          <AIInterface />
        </div>
      </div>

      {/* Activity Log Stream */}
      <div className="bg-[#0B0B0E] border border-white/10 rounded-2xl p-6 shadow-2xl relative overflow-hidden">
        <div className="flex items-center justify-between mb-5 pb-3 border-b border-white/5">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-[#D4AF37]/10 text-[#D4AF37] border border-[#D4AF37]/20">
              <Clock className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-xs font-mono font-bold tracking-widest text-white uppercase">
                RECENT ACTIVITY LOG
              </h3>
              <p className="text-neutral-400 text-xs">Recent updates and automated checks for your projects</p>
            </div>
          </div>
          <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1 rounded-full font-bold flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span>
            Live Updates
          </span>
        </div>

        <div className="space-y-3">
          {recentActivity.map((act, idx) => {
            const Icon = act.icon;
            return (
              <div
                key={idx}
                className="flex flex-col sm:flex-row sm:items-center justify-between p-3.5 bg-[#121216] hover:bg-[#181820] border border-white/5 hover:border-white/10 rounded-xl transition-all font-mono text-xs gap-3"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-white/5 text-[#D4AF37] shrink-0">
                    <Icon className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-bold text-white block">{act.title}</span>
                    <span className="text-neutral-400 text-[11px] block">{act.desc}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between sm:justify-end gap-3 shrink-0 pt-1 sm:pt-0">
                  <span className={`text-[9px] border px-2.5 py-0.5 rounded-md font-bold uppercase ${act.tagColor}`}>
                    {act.tag}
                  </span>
                  <span className="text-neutral-500 text-[10px]">{act.time}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

