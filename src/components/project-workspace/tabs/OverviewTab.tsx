import { CheckCircle2, ShieldCheck, Activity, Cpu, Sparkles, Terminal } from 'lucide-react';
import { Project } from '../../../types';
import { ArchitectureMap } from './ArchitectureMap';

interface OverviewTabProps {
  project: Project;
  onNavigateTab: (tab: string) => void;
}

export const OverviewTab = ({ project, onNavigateTab }: OverviewTabProps) => {
  return (
    <div className="space-y-8 animate-fadeIn">
      {/* System Health Panel */}
      <div className="bg-[#121212] border border-white/5 rounded-xl p-6">
        <h3 className="text-xs font-mono font-bold tracking-widest text-[#D4AF37] uppercase mb-4 flex items-center gap-2">
          <Cpu className="w-4 h-4 text-[#D4AF37]" />
          SYSTEM HEALTH DIAGNOSTICS
        </h3>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          <div className="bg-[#0A0A0A] p-4 rounded-lg border border-white/5">
            <span className="text-[10px] font-mono text-neutral-500 uppercase block mb-1">Repository</span>
            <div className="flex items-center gap-2 text-emerald-400 font-mono text-xs font-bold">
              <CheckCircle2 className="w-4 h-4" />
              <span>HEALTHY</span>
            </div>
            <span className="text-[10px] text-neutral-600 block mt-2 font-mono">Synced to main</span>
          </div>

          <div className="bg-[#0A0A0A] p-4 rounded-lg border border-white/5">
            <span className="text-[10px] font-mono text-neutral-500 uppercase block mb-1">Database</span>
            <div className="flex items-center gap-2 text-emerald-400 font-mono text-xs font-bold">
              <CheckCircle2 className="w-4 h-4" />
              <span>HEALTHY</span>
            </div>
            <span className="text-[10px] text-neutral-600 block mt-2 font-mono">RLS Active</span>
          </div>

          <div className="bg-[#0A0A0A] p-4 rounded-lg border border-white/5">
            <span className="text-[10px] font-mono text-neutral-500 uppercase block mb-1">Deployment</span>
            <div className="flex items-center gap-2 text-emerald-400 font-mono text-xs font-bold">
              <CheckCircle2 className="w-4 h-4" />
              <span>HEALTHY</span>
            </div>
            <span className="text-[10px] text-neutral-600 block mt-2 font-mono">Production SSL</span>
          </div>

          <div className="bg-[#0A0A0A] p-4 rounded-lg border border-white/5">
            <span className="text-[10px] font-mono text-neutral-500 uppercase block mb-1">Runtime</span>
            <div className="flex items-center gap-2 text-blue-400 font-mono text-xs font-bold">
              <Activity className="w-4 h-4 animate-pulse" />
              <span>MONITORING</span>
            </div>
            <span className="text-[10px] text-neutral-600 block mt-2 font-mono">Latency 24ms</span>
          </div>

          <div className="bg-[#0A0A0A] p-4 rounded-lg border border-white/5 col-span-2 sm:col-span-1">
            <span className="text-[10px] font-mono text-neutral-500 uppercase block mb-1">Security</span>
            <div className="flex items-center gap-2 text-emerald-400 font-mono text-xs font-bold">
              <ShieldCheck className="w-4 h-4" />
              <span>GOOD</span>
            </div>
            <span className="text-[10px] text-neutral-600 block mt-2 font-mono">0 Vulnerabilities</span>
          </div>
        </div>
      </div>

      {/* Architecture Topology Map */}
      <ArchitectureMap project={project} />

      {/* Grid: Activity Timeline & AI Context Rules */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Activity Timeline */}
        <div className="bg-[#121212] border border-white/5 rounded-xl p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xs font-mono font-bold tracking-widest text-[#D4AF37] uppercase flex items-center gap-2">
                <Terminal className="w-4 h-4" />
                SYSTEM ACTIVITY TIMELINE
              </h3>
              <button
                onClick={() => onNavigateTab('activity')}
                className="text-[10px] font-mono text-neutral-400 hover:text-white uppercase"
              >
                View All
              </button>
            </div>

            <div className="space-y-3 relative pl-4 border-l border-white/10 my-4">
              {project.activities.map((act) => (
                <div key={act.id} className="relative text-xs">
                  <div className="absolute -left-[21px] top-1 w-2.5 h-2.5 rounded-full bg-[#D4AF37] border-2 border-[#121212]"></div>
                  <div className="flex items-center justify-between font-mono text-[10px] text-neutral-500">
                    <span>{act.timestamp}</span>
                    <span className="text-neutral-600 uppercase">[{act.source}]</span>
                  </div>
                  <p className="text-neutral-200 mt-0.5">{act.action}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* AI Project Context & Strict Rules */}
        <div className="bg-[#121212] border border-white/5 rounded-xl p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xs font-mono font-bold tracking-widest text-[#D4AF37] uppercase flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#D4AF37]" />
                AI PROJECT CONTEXT & CONSTRAINTS
              </h3>
            </div>

            <p className="text-xs text-neutral-400 mb-4">{project.aiContext.purpose}</p>

            <div className="mb-4">
              <span className="text-[10px] font-mono text-neutral-500 uppercase block mb-1.5">Tech Stack:</span>
              <div className="flex flex-wrap gap-1.5">
                {project.aiContext.techStack.map((tech, idx) => (
                  <span key={idx} className="text-[10px] font-mono px-2 py-0.5 bg-white/5 border border-white/10 rounded text-neutral-300">
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            <div className="bg-[#0A0A0A] p-4 rounded-lg border border-amber-500/20">
              <span className="text-[10px] font-mono text-[#D4AF37] font-bold uppercase tracking-wider block mb-2">
                STRICT AI PRODUCTION RULES
              </span>
              <div className="space-y-1.5 text-[11px] font-mono text-amber-200/90">
                {project.aiContext.rules.map((rule, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <span className="text-[#D4AF37]">•</span>
                    <span>{rule}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
