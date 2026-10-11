import { Activity, Clock } from 'lucide-react';
import { Project } from '../../../types';

interface ActivityTabProps {
  project: Project;
}

export const ActivityTab = ({ project }: ActivityTabProps) => {
  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="flex items-center justify-between border-b border-white/5 pb-4">
        <div>
          <h3 className="text-xs font-mono font-bold text-[#D4AF37] uppercase tracking-wider">PROJECT ACTIVITY LOGS</h3>
          <p className="text-neutral-500 text-xs">Immutable audit trail of system events, commits, deployments, and AI runs.</p>
        </div>
      </div>

      <div className="bg-[#121212] border border-white/5 rounded-xl p-6 font-mono text-xs">
        <div className="space-y-4 relative pl-4 border-l border-white/10">
          {project.activities.map((act) => (
            <div key={act.id} className="relative pb-2">
              <div className="absolute -left-[21px] top-1 w-2.5 h-2.5 rounded-full bg-[#D4AF37] border-2 border-[#121212]"></div>
              <div className="flex items-center justify-between text-[10px] text-neutral-500 mb-1">
                <span>{act.timestamp}</span>
                <span className="text-neutral-600 uppercase">[{act.source}]</span>
              </div>
              <div className="text-white font-sans text-xs">{act.action}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
