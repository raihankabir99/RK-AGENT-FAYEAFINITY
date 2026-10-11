import { useState } from 'react';
import {
  LayoutDashboard,
  BrainCircuit,
  FolderGit2,
  CheckSquare,
  ShieldCheck,
  GitBranch,
  Code,
  GitFork,
  GitPullRequest,
  Database,
  Rocket,
  BarChart3,
  Settings,
  ShieldAlert,
  ChevronLeft,
  ChevronRight,
  Maximize2
} from 'lucide-react';

interface SidebarProps {
  activeView: string;
  onSelectView: (view: string) => void;
}

const navSections = [
  {
    category: 'MAIN NAVIGATION',
    items: [
      { id: 'home', icon: LayoutDashboard, label: 'Overview' },
      { id: 'ai-agent', icon: BrainCircuit, label: 'AI Assistant' },
      { id: 'projects', icon: FolderGit2, label: 'Projects' },
      { id: 'tasks', icon: CheckSquare, label: 'Tasks' },
      { id: 'approvals', icon: ShieldCheck, label: 'Approvals' },
    ]
  },
  {
    category: 'CODE & REPOSITORY',
    items: [
      { id: 'repositories', icon: GitBranch, label: 'Repositories' },
      { id: 'code-explorer', icon: Code, label: 'Code Browser' },
      { id: 'branches', icon: GitFork, label: 'Branches' },
      { id: 'pull-requests', icon: GitPullRequest, label: 'Pull Requests' },
    ]
  },
  {
    category: 'SERVICES & CLOUD',
    items: [
      { id: 'database', icon: Database, label: 'Database' },
      { id: 'deployments', icon: Rocket, label: 'Deployments' },
      { id: 'audits', icon: BarChart3, label: 'Security & Health' },
    ]
  },
  {
    category: 'SETTINGS & SECURITY',
    items: [
      { id: 'security', icon: ShieldAlert, label: 'Security Checks' },
      { id: 'settings', icon: Settings, label: 'Settings' },
    ]
  }
];

export const Sidebar = ({ activeView, onSelectView }: SidebarProps) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(true);

  const handleDoubleClick = () => {
    setIsExpanded((prev) => !prev);
  };

  return (
    <aside
      onDoubleClick={handleDoubleClick}
      title="Double-click sidebar to expand or shrink"
      className={`${
        isExpanded ? 'w-60' : 'w-16'
      } border-r border-white/5 bg-[#09090B] flex flex-col justify-between py-5 shrink-0 z-20 transition-all duration-300 select-none relative group`}
    >
      {/* Top Header & Toggle */}
      <div>
        <div className="flex items-center justify-between px-4 mb-6">
          <div
            className="flex items-center gap-2.5 cursor-pointer"
            onClick={() => onSelectView('home')}
          >
            <div className="w-7 h-7 bg-[#D4AF37] rounded flex items-center justify-center shrink-0 shadow-[0_0_10px_rgba(212,175,55,0.3)]">
              <div className="w-3.5 h-3.5 border-2 border-black rotate-45"></div>
            </div>
            {isExpanded && (
              <div className="flex flex-col">
                <span className="text-xs font-bold tracking-wider text-white uppercase font-mono">
                  RK STUDIO
                </span>
                <span className="text-[9px] font-mono text-[#D4AF37]">
                  AI ASSISTANT
                </span>
              </div>
            )}
          </div>

          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="p-1 rounded text-neutral-500 hover:text-white hover:bg-white/5 transition-colors"
            title={isExpanded ? 'Shrink Sidebar (or Double-Click)' : 'Expand Sidebar (or Double-Click)'}
          >
            {isExpanded ? <ChevronLeft className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
          </button>
        </div>

        {/* Categories Navigation */}
        <div className="space-y-6 overflow-y-auto max-h-[calc(100vh-140px)] custom-scrollbar px-3">
          {navSections.map((section, idx) => (
            <div key={idx} className="space-y-1">
              {isExpanded ? (
                <span className="text-[10px] font-mono font-bold tracking-widest text-neutral-500 uppercase px-2 mb-2 block">
                  {section.category}
                </span>
              ) : (
                <div className="w-full h-px bg-white/5 my-2"></div>
              )}

              <div className="space-y-1">
                {section.items.map((item) => {
                  const isActive =
                    activeView === item.id ||
                    (activeView === 'project-workspace' && (item.id === 'projects' || item.id === 'home'));
                  const Icon = item.icon;

                  return (
                    <button
                      key={item.id}
                      onClick={() => onSelectView(item.id)}
                      className={`w-full flex items-center gap-3 transition-all duration-150 rounded-lg ${
                        isExpanded ? 'px-2.5 py-2 text-xs font-medium' : 'p-2.5 justify-center'
                      } ${
                        isActive
                          ? 'text-[#D4AF37] bg-[#D4AF37]/10 border border-[#D4AF37]/20 font-bold'
                          : 'text-neutral-400 hover:text-white hover:bg-white/[0.04]'
                      }`}
                      title={!isExpanded ? item.label : undefined}
                    >
                      <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-[#D4AF37]' : 'text-neutral-400'}`} />
                      {isExpanded && <span className="truncate">{item.label}</span>}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Hint Indicator */}
      <div className="px-3 pt-4 border-t border-white/5">
        <div
          onClick={() => setIsExpanded(!isExpanded)}
          className={`flex items-center gap-2 text-[10px] font-mono text-neutral-500 hover:text-neutral-300 cursor-pointer ${
            isExpanded ? 'px-2 py-1' : 'justify-center'
          }`}
        >
          <Maximize2 className="w-3 h-3 text-[#D4AF37]" />
          {isExpanded && (
            <span className="text-[9px] uppercase tracking-wider text-neutral-400">
              Dbl-Click To Toggle
            </span>
          )}
        </div>
      </div>
    </aside>
  );
};

