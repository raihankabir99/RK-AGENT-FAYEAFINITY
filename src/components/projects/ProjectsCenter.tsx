import { useState } from 'react';
import { Search, Plus, LayoutGrid, List, SlidersHorizontal, ArrowUpDown, GitBranch, Database, Rocket, ExternalLink, ShieldAlert, CheckCircle2, AlertTriangle, XCircle, Clock } from 'lucide-react';
import { Project, HealthStatus } from '../../types';

interface ProjectsCenterProps {
  projects: Project[];
  onOpenProject: (projectId: string) => void;
  onOpenNewProject: () => void;
}

export const ProjectsCenter = ({ projects, onOpenProject, onOpenNewProject }: ProjectsCenterProps) => {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('ALL');
  const [sortBy, setSortBy] = useState<'activity' | 'name' | 'tasks'>('activity');

  const filteredProjects = projects
    .filter((p) => {
      const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.type.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesStatus = statusFilter === 'ALL' || p.status === statusFilter;
      return matchesSearch && matchesStatus;
    })
    .sort((a, b) => {
      if (sortBy === 'name') return a.name.localeCompare(b.name);
      if (sortBy === 'tasks') return b.openTasksCount - a.openTasksCount;
      return a.id.localeCompare(b.id);
    });

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
      case 'CRITICAL':
      case 'OFFLINE':
        return (
          <span className="flex items-center gap-1.5 text-rose-400 text-[10px] font-mono font-medium uppercase px-2 py-0.5 rounded bg-rose-500/10 border border-rose-500/20">
            <XCircle className="w-3 h-3" />
            {status}
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
    <div className="space-y-8 animate-fadeIn">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/5 pb-6">
        <div>
          <h2 className="text-[10px] font-bold tracking-[0.3em] text-[#D4AF37] mb-1 uppercase opacity-90">
            PROJECT COMMAND CENTER
          </h2>
          <h1 className="text-3xl font-light tracking-tight text-white">
            Engineering Projects
          </h1>
          <p className="text-neutral-500 text-sm mt-1">
            Manage every engineering environment from one intelligent workspace.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={onOpenNewProject}
            className="px-4 py-2 bg-[#D4AF37] hover:bg-amber-400 text-black text-xs font-bold uppercase tracking-wider rounded-md flex items-center gap-2 transition-all shadow-[0_0_15px_rgba(212,175,55,0.2)] cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>New Project</span>
          </button>
        </div>
      </div>

      {/* Control Bar: Search, Filter, Sort, View Switcher */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 bg-[#0A0A0A] p-3 rounded-lg border border-white/5">
        <div className="flex items-center gap-3 flex-1">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-2.5 w-3.5 h-3.5 text-neutral-500" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by project name, description or stack..."
              className="w-full bg-[#121212] border border-white/10 rounded-md pl-9 pr-4 py-1.5 text-xs text-white placeholder-neutral-600 focus:outline-none focus:ring-1 focus:ring-[#D4AF37]"
            />
          </div>

          <div className="flex items-center gap-2">
            <SlidersHorizontal className="w-3.5 h-3.5 text-neutral-500 hidden md:block" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="bg-[#121212] border border-white/10 rounded-md px-3 py-1.5 text-xs text-neutral-300 uppercase focus:outline-none focus:ring-1 focus:ring-[#D4AF37]"
            >
              <option value="ALL">All Statuses</option>
              <option value="OPERATIONAL">Operational</option>
              <option value="WARNING">Warning</option>
              <option value="SETUP REQUIRED">Setup Required</option>
            </select>
          </div>
        </div>

        <div className="flex items-center gap-3 justify-end">
          <div className="flex items-center gap-2">
            <ArrowUpDown className="w-3.5 h-3.5 text-neutral-500" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="bg-[#121212] border border-white/10 rounded-md px-3 py-1.5 text-xs text-neutral-300 focus:outline-none focus:ring-1 focus:ring-[#D4AF37]"
            >
              <option value="activity">Recent Activity</option>
              <option value="name">Project Name</option>
              <option value="tasks">Open Tasks</option>
            </select>
          </div>

          <div className="h-4 w-[1px] bg-white/10"></div>

          <div className="flex bg-[#121212] p-0.5 rounded-md border border-white/10">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-1.5 rounded ${viewMode === 'grid' ? 'bg-white/10 text-[#D4AF37]' : 'text-neutral-500 hover:text-white'}`}
              title="Grid View"
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-1.5 rounded ${viewMode === 'list' ? 'bg-white/10 text-[#D4AF37]' : 'text-neutral-500 hover:text-white'}`}
              title="List View"
            >
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Render Grid View */}
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project) => {
            const githubConn = project.connectors.find((c) => c.type === 'GITHUB');
            const supabaseConn = project.connectors.find((c) => c.type === 'SUPABASE');
            const vercelConn = project.connectors.find((c) => c.type === 'VERCEL');

            return (
              <div
                key={project.id}
                className="bg-[#121212] border border-white/5 rounded-xl p-6 flex flex-col justify-between hover:border-white/20 transition-all duration-300 group hover:shadow-[0_0_20px_rgba(0,0,0,0.8)] relative"
              >
                <div>
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-lg border border-white/10 bg-white/5 flex items-center justify-center text-[#D4AF37] font-mono font-bold text-xs uppercase">
                        {project.name.substring(0, 2)}
                      </div>
                      <div>
                        <h3 className="text-base font-semibold text-white group-hover:text-[#D4AF37] transition-colors leading-tight">
                          {project.name}
                        </h3>
                        <span className="text-[10px] font-mono text-neutral-500 tracking-wider uppercase">
                          {project.type}
                        </span>
                      </div>
                    </div>

                    <span className="text-[9px] font-mono font-bold uppercase tracking-widest px-2 py-0.5 rounded bg-white/5 text-neutral-400 border border-white/10">
                      {project.environment}
                    </span>
                  </div>

                  <p className="text-xs text-neutral-400 line-clamp-2 mb-4">
                    {project.description}
                  </p>

                  <div className="mb-4">
                    {getStatusBadge(project.status)}
                  </div>

                  {/* Connected Services Status */}
                  <div className="bg-[#0A0A0A] p-3 rounded-lg border border-white/5 space-y-2 mb-4 text-[11px] font-mono">
                    <div className="flex items-center justify-between">
                      <span className="flex items-center gap-2 text-neutral-400">
                        <GitBranch className="w-3.5 h-3.5 text-neutral-500" />
                        GitHub
                      </span>
                      <span className={githubConn?.connected ? 'text-emerald-400' : 'text-neutral-600'}>
                        {githubConn?.connected ? 'CONNECTED' : 'DISCONNECTED'}
                      </span>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="flex items-center gap-2 text-neutral-400">
                        <Database className="w-3.5 h-3.5 text-neutral-500" />
                        Supabase
                      </span>
                      <span className={supabaseConn?.connected ? 'text-emerald-400' : 'text-neutral-600'}>
                        {supabaseConn?.connected ? 'CONNECTED' : 'DISCONNECTED'}
                      </span>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="flex items-center gap-2 text-neutral-400">
                        <Rocket className="w-3.5 h-3.5 text-neutral-500" />
                        Vercel
                      </span>
                      <span className={vercelConn?.connected ? 'text-emerald-400' : 'text-neutral-600'}>
                        {vercelConn?.connected ? 'CONNECTED' : 'DISCONNECTED'}
                      </span>
                    </div>
                  </div>

                  {/* Summary Stats */}
                  <div className="grid grid-cols-3 gap-2 text-center text-[10px] font-mono bg-white/[0.02] p-2 rounded border border-white/5 mb-4">
                    <div>
                      <div className="text-neutral-500">TASKS</div>
                      <div className="text-white font-bold mt-0.5">{project.openTasksCount}</div>
                    </div>
                    <div>
                      <div className="text-neutral-500">APPROVALS</div>
                      <div className={project.pendingApprovalsCount > 0 ? 'text-[#D4AF37] font-bold mt-0.5' : 'text-neutral-400 mt-0.5'}>
                        {project.pendingApprovalsCount}
                      </div>
                    </div>
                    <div>
                      <div className="text-neutral-500">AUDITS</div>
                      <div className="text-white font-bold mt-0.5">{project.openAuditsCount}</div>
                    </div>
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between text-[10px] text-neutral-500 font-mono mb-3">
                    <span>Deploy: {project.lastDeployment}</span>
                    <span>Sync: {project.lastActivity}</span>
                  </div>

                  <button
                    onClick={() => onOpenProject(project.id)}
                    className="w-full py-2 bg-white/5 hover:bg-[#D4AF37] hover:text-black text-neutral-200 text-xs font-bold uppercase tracking-wider rounded-md border border-white/10 hover:border-[#D4AF37] transition-all flex items-center justify-center gap-2 group/btn cursor-pointer"
                  >
                    <span>OPEN PROJECT</span>
                    <ExternalLink className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 transition-transform" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        /* List View */
        <div className="bg-[#121212] border border-white/5 rounded-xl overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[800px]">
            <thead>
              <tr className="border-b border-white/10 bg-[#0A0A0A] text-[10px] font-mono text-neutral-500 uppercase tracking-wider">
                <th className="p-4">Project</th>
                <th className="p-4">Environment</th>
                <th className="p-4">Status</th>
                <th className="p-4">Connectors</th>
                <th className="p-4">Last Deployment</th>
                <th className="p-4">Tasks</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-xs text-neutral-300 font-sans">
              {filteredProjects.map((project) => (
                <tr key={project.id} className="hover:bg-white/[0.02] transition-colors">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded border border-white/10 bg-white/5 flex items-center justify-center text-[#D4AF37] font-mono font-bold text-xs">
                        {project.name.substring(0, 2)}
                      </div>
                      <div>
                        <div className="font-medium text-white">{project.name}</div>
                        <div className="text-[10px] text-neutral-500">{project.type}</div>
                      </div>
                    </div>
                  </td>

                  <td className="p-4">
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/5 text-neutral-300 border border-white/10">
                      {project.environment}
                    </span>
                  </td>

                  <td className="p-4">{getStatusBadge(project.status)}</td>

                  <td className="p-4">
                    <div className="flex items-center gap-2 text-[10px] font-mono">
                      <span className={project.connectors.some(c => c.type === 'GITHUB' && c.connected) ? 'text-emerald-400' : 'text-neutral-600'}>
                        GH
                      </span>
                      <span>/</span>
                      <span className={project.connectors.some(c => c.type === 'SUPABASE' && c.connected) ? 'text-emerald-400' : 'text-neutral-600'}>
                        SB
                      </span>
                      <span>/</span>
                      <span className={project.connectors.some(c => c.type === 'VERCEL' && c.connected) ? 'text-emerald-400' : 'text-neutral-600'}>
                        VC
                      </span>
                    </div>
                  </td>

                  <td className="p-4 text-neutral-400 font-mono text-[11px]">{project.lastDeployment}</td>

                  <td className="p-4">
                    <span className="font-mono text-neutral-300">{project.openTasksCount} open</span>
                  </td>

                  <td className="p-4 text-right">
                    <button
                      onClick={() => onOpenProject(project.id)}
                      className="px-3 py-1 bg-[#D4AF37]/10 text-[#D4AF37] hover:bg-[#D4AF37] hover:text-black rounded text-[10px] font-bold uppercase tracking-wider transition-all border border-[#D4AF37]/30"
                    >
                      OPEN
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};
