import { useState } from 'react';
import { Project, EnvironmentType, HealthStatus } from '../../types';
import { OverviewTab } from './tabs/OverviewTab';
import { AIAgentTab } from './tabs/AIAgentTab';
import { RepositoryTab } from './tabs/RepositoryTab';
import { DatabaseTab } from './tabs/DatabaseTab';
import { DeploymentsTab } from './tabs/DeploymentsTab';
import { AuditsTab } from './tabs/AuditsTab';
import { TasksTab } from './tabs/TasksTab';
import { ApprovalsTab } from './tabs/ApprovalsTab';
import { ActivityTab } from './tabs/ActivityTab';
import { ConnectorsTab } from './tabs/ConnectorsTab';
import { SettingsTab } from './tabs/SettingsTab';
import {
  BrainCircuit,
  ShieldAlert,
  Settings as SettingsIcon,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  Clock,
  LayoutDashboard,
  GitBranch,
  Database,
  Rocket,
  CheckSquare,
  Activity,
  Layers
} from 'lucide-react';

interface ProjectWorkspaceProps {
  project: Project;
  onDeleteProject?: (projectId: string) => void;
  activeTab?: string;
  onTabChange?: (tab: string) => void;
}

export const ProjectWorkspace = ({ project, onDeleteProject, activeTab: externalTab, onTabChange }: ProjectWorkspaceProps) => {
  const [internalTab, setInternalTab] = useState<string>('overview');
  const activeTab = externalTab || internalTab;

  const handleSelectTab = (tab: string) => {
    setInternalTab(tab);
    if (onTabChange) onTabChange(tab);
  };

  const tabs = [
    { id: 'overview', label: 'OVERVIEW', icon: LayoutDashboard },
    { id: 'ai-agent', label: 'AI AGENT', icon: BrainCircuit },
    { id: 'repository', label: 'REPOSITORY', icon: GitBranch },
    { id: 'database', label: 'DATABASE', icon: Database },
    { id: 'deployments', label: 'DEPLOYMENTS', icon: Rocket },
    { id: 'audits', label: 'AUDITS', icon: ShieldAlert, badge: project.openAuditsCount },
    { id: 'tasks', label: 'TASKS', icon: CheckSquare, badge: project.openTasksCount },
    { id: 'approvals', label: 'APPROVALS', icon: AlertTriangle, badge: project.pendingApprovalsCount, badgeColor: 'bg-amber-500 text-black' },
    { id: 'activity', label: 'ACTIVITY', icon: Activity },
    { id: 'connectors', label: 'CONNECTORS', icon: Layers },
    { id: 'settings', label: 'SETTINGS', icon: SettingsIcon },
  ];

  const getStatusBadge = (status: HealthStatus) => {
    switch (status) {
      case 'OPERATIONAL':
        return (
          <span className="flex items-center gap-1.5 text-emerald-400 text-[10px] font-mono font-medium uppercase px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/20">
            <CheckCircle2 className="w-3 h-3" />
            OPERATIONAL
          </span>
        );
      case 'WARNING':
        return (
          <span className="flex items-center gap-1.5 text-amber-400 text-[10px] font-mono font-medium uppercase px-2 py-0.5 rounded bg-amber-500/10 border border-amber-500/20">
            <AlertTriangle className="w-3 h-3" />
            WARNING
          </span>
        );
      default:
        return (
          <span className="flex items-center gap-1.5 text-[#D4AF37] text-[10px] font-mono font-medium uppercase px-2 py-0.5 rounded bg-[#D4AF37]/10 border border-[#D4AF37]/20">
            <Clock className="w-3 h-3" />
            SETUP REQUIRED
          </span>
        );
    }
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Top Project Header Banner */}
      <div className="bg-[#0A0A0A] border border-white/5 rounded-2xl p-6 relative overflow-hidden">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <span className="text-[10px] font-mono font-bold tracking-[0.2em] text-[#D4AF37] uppercase">
                {project.type}
              </span>
              <span className="text-neutral-600">•</span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/5 text-neutral-300 border border-white/10 uppercase">
                {project.environment}
              </span>
              {getStatusBadge(project.status)}
            </div>

            <h1 className="text-3xl font-light tracking-tight text-white flex items-center gap-3">
              <span>{project.name}</span>
            </h1>

            <p className="text-neutral-400 text-xs mt-1.5 max-w-2xl">
              {project.description}
            </p>

            <div className="flex items-center gap-4 mt-3 text-[10px] font-mono text-neutral-500">
              <span>Last Deploy: {project.lastDeployment}</span>
              <span>•</span>
              <span>Last Activity: {project.lastActivity}</span>
            </div>
          </div>

          {/* Quick Action Buttons */}
          <div className="flex items-center gap-2.5 shrink-0">
            <button
              onClick={() => handleSelectTab('ai-agent')}
              className="px-3.5 py-2 bg-[#D4AF37] hover:bg-amber-400 text-black text-xs font-bold uppercase tracking-wider rounded-md flex items-center gap-2 transition-all cursor-pointer shadow-[0_0_15px_rgba(212,175,55,0.2)]"
            >
              <BrainCircuit className="w-4 h-4" />
              <span>AI AGENT</span>
            </button>

            <button
              onClick={() => handleSelectTab('audits')}
              className="px-3.5 py-2 bg-white/5 hover:bg-white/10 text-white text-xs font-bold uppercase tracking-wider rounded-md border border-white/10 flex items-center gap-2 transition-all cursor-pointer"
            >
              <ShieldAlert className="w-4 h-4 text-amber-400" />
              <span>AUDIT</span>
            </button>

            <button
              onClick={() => handleSelectTab('settings')}
              className="p-2 bg-white/5 hover:bg-white/10 text-neutral-400 hover:text-white rounded-md border border-white/10 transition-all cursor-pointer"
              title="Project Settings"
            >
              <SettingsIcon className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Inner Workspace Navigation Tabs */}
      <div className="flex items-center gap-1 border-b border-white/10 overflow-x-auto pb-px">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => handleSelectTab(tab.id)}
              className={`flex items-center gap-2 px-3.5 py-2.5 text-[11px] font-mono font-bold tracking-wider transition-all whitespace-nowrap cursor-pointer relative border-b-2 ${
                isActive
                  ? 'border-[#D4AF37] text-[#D4AF37] bg-white/[0.02]'
                  : 'border-transparent text-neutral-500 hover:text-neutral-300 hover:border-white/20'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{tab.label}</span>
              {typeof tab.badge === 'number' && tab.badge > 0 && (
                <span className={`text-[9px] px-1.5 py-0.2 rounded-full ${tab.badgeColor || 'bg-white/10 text-white'}`}>
                  {tab.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Active Tab Content Area */}
      <div className="pt-2">
        {activeTab === 'overview' && <OverviewTab project={project} onNavigateTab={handleSelectTab} />}
        {activeTab === 'ai-agent' && <AIAgentTab project={project} />}
        {activeTab === 'repository' && <RepositoryTab project={project} />}
        {activeTab === 'database' && <DatabaseTab project={project} />}
        {activeTab === 'deployments' && <DeploymentsTab project={project} />}
        {activeTab === 'audits' && <AuditsTab project={project} />}
        {activeTab === 'tasks' && <TasksTab project={project} />}
        {activeTab === 'approvals' && <ApprovalsTab project={project} />}
        {activeTab === 'activity' && <ActivityTab project={project} />}
        {activeTab === 'connectors' && <ConnectorsTab project={project} />}
        {activeTab === 'settings' && <SettingsTab project={project} onDeleteProject={onDeleteProject} />}
      </div>
    </div>
  );
};
