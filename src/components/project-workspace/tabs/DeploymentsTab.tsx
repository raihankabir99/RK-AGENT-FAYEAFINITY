import { Rocket, CheckCircle2, Clock, Terminal, RotateCcw } from 'lucide-react';
import { Project } from '../../../types';

interface DeploymentsTabProps {
  project: Project;
}

export const DeploymentsTab = ({ project }: DeploymentsTabProps) => {
  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="flex items-center justify-between border-b border-white/5 pb-4">
        <div>
          <h3 className="text-xs font-mono font-bold text-[#D4AF37] uppercase tracking-wider">DEPLOYMENT CENTER</h3>
          <p className="text-neutral-500 text-xs">Vercel production deployments, build logs, and environment routing.</p>
        </div>
        <div className="flex items-center gap-2">
          <button className="px-3 py-1 bg-white/5 hover:bg-white/10 text-white rounded text-[10px] font-mono uppercase border border-white/10 flex items-center gap-1.5 cursor-pointer">
            <RotateCcw className="w-3 h-3" />
            <span>Rollback Version</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-[#121212] border border-white/5 rounded-xl p-5 space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-mono text-neutral-500 uppercase font-bold">LATEST DEPLOYMENT</span>
            <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
              ● READY
            </span>
          </div>

          <div className="font-mono text-xs space-y-2 bg-[#0A0A0A] p-3 rounded border border-white/5">
            <div className="flex justify-between">
              <span className="text-neutral-500">Version:</span>
              <span className="text-white">v2026.08.25.03</span>
            </div>
            <div className="flex justify-between">
              <span className="text-neutral-500">Commit:</span>
              <span className="text-amber-300">a82f91d</span>
            </div>
            <div className="flex justify-between">
              <span className="text-neutral-500">Duration:</span>
              <span className="text-white">38s</span>
            </div>
            <div className="flex justify-between">
              <span className="text-neutral-500">Deployed:</span>
              <span className="text-neutral-400">{project.lastDeployment}</span>
            </div>
          </div>
        </div>

        {/* Build Terminal Logs */}
        <div className="lg:col-span-2 bg-black border border-white/10 rounded-xl p-4 font-mono text-xs text-neutral-300 flex flex-col justify-between h-[350px]">
          <div className="flex items-center justify-between pb-2 border-b border-white/10 text-neutral-500 text-[10px]">
            <div className="flex items-center gap-2">
              <Terminal className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>BUILD & RUNTIME LOGS</span>
            </div>
            <span>STDOUT / STDERR</span>
          </div>

          <div className="flex-1 overflow-y-auto space-y-1 my-3 text-[11px] leading-relaxed text-neutral-400">
            <div className="text-neutral-600">[10:52:10] Cloning repository github.com/{project.name.toLowerCase().replace(/\s+/g, '-')}...</div>
            <div className="text-neutral-400">[10:52:12] Running build command: vite build && esbuild server.ts --bundle</div>
            <div className="text-emerald-400">[10:52:25] ✓ Vite build completed in 12.8s</div>
            <div className="text-emerald-400">[10:52:28] ✓ Server bundled to dist/server.cjs</div>
            <div className="text-blue-400">[10:52:30] Deploying build outputs to Vercel edge CDN nodes...</div>
            <div className="text-emerald-400 font-bold">[10:52:35] SUCCESS: Deployment verified operational.</div>
          </div>

          <div className="text-[10px] text-neutral-600 border-t border-white/5 pt-2 flex justify-between">
            <span>Container Ingress: 0.0.0.0:3000</span>
            <span>SSL Certificate Valid</span>
          </div>
        </div>
      </div>
    </div>
  );
};
