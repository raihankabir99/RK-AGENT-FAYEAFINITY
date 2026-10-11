import { useState } from 'react';
import { ShieldAlert, Check, X, Eye, AlertTriangle } from 'lucide-react';
import { Project, ApprovalRequest } from '../../../types';

interface ApprovalsTabProps {
  project: Project;
}

export const ApprovalsTab = ({ project }: ApprovalsTabProps) => {
  const [approvals, setApprovals] = useState<ApprovalRequest[]>(project.approvals);
  const [selectedApproval, setSelectedApproval] = useState<ApprovalRequest | null>(project.approvals[0] || null);

  const handleAction = (id: string, action: 'approved' | 'rejected') => {
    setApprovals(approvals.filter((a) => a.id !== id));
    if (selectedApproval?.id === id) {
      setSelectedApproval(null);
    }
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="flex items-center justify-between border-b border-white/5 pb-4">
        <div>
          <h3 className="text-xs font-mono font-bold text-[#D4AF37] uppercase tracking-wider">PENDING HUMAN APPROVALS</h3>
          <p className="text-neutral-500 text-xs">High-risk patches, migrations, and deployments requiring explicit user sign-off.</p>
        </div>
        <span className="text-xs font-mono text-amber-400 font-bold bg-amber-500/10 px-2.5 py-1 rounded border border-amber-500/20">
          {approvals.length} PENDING
        </span>
      </div>

      {approvals.length === 0 ? (
        <div className="bg-[#121212] border border-white/5 rounded-xl p-12 text-center text-neutral-500 font-mono">
          NO PENDING APPROVALS REQUIRED
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* List of pending approvals */}
          <div className="space-y-3">
            {approvals.map((app) => (
              <div
                key={app.id}
                onClick={() => setSelectedApproval(app)}
                className={`p-4 rounded-xl border transition-all cursor-pointer ${
                  selectedApproval?.id === app.id
                    ? 'bg-[#121212] border-[#D4AF37]'
                    : 'bg-[#0A0A0A] border-white/5 hover:border-white/20'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-mono text-neutral-500 uppercase">{app.type}</span>
                  <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded ${
                    app.risk === 'HIGH' ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20' : 'bg-blue-500/10 text-blue-400'
                  }`}>
                    {app.risk} RISK
                  </span>
                </div>
                <h4 className="text-sm font-bold text-white mb-1">{app.title}</h4>
                <p className="text-xs text-neutral-400 mb-2">{app.reason}</p>
                <div className="text-[10px] font-mono text-neutral-500">
                  Requested by: {app.requestedBy} • {app.createdAt}
                </div>
              </div>
            ))}
          </div>

          {/* Diff preview and approval actions */}
          {selectedApproval && (
            <div className="bg-[#121212] border border-white/5 rounded-xl p-5 flex flex-col justify-between space-y-4">
              <div>
                <h4 className="text-sm font-bold text-white mb-2 uppercase font-mono">DIFF PREVIEW & INSPECTOR</h4>
                <p className="text-xs text-neutral-400 font-mono mb-3">Target: {selectedApproval.affectedSystem}</p>

                {selectedApproval.diffPreview && (
                  <div className="bg-black p-3 rounded border border-white/5 font-mono text-xs space-y-2 overflow-x-auto">
                    <div className="text-rose-400 bg-rose-500/10 p-2 rounded border-l-2 border-rose-500">
                      - {selectedApproval.diffPreview.before}
                    </div>
                    <div className="text-emerald-400 bg-emerald-500/10 p-2 rounded border-l-2 border-emerald-500">
                      + {selectedApproval.diffPreview.after}
                    </div>
                  </div>
                )}
              </div>

              <div className="flex gap-3 pt-3 border-t border-white/5">
                <button
                  onClick={() => handleAction(selectedApproval.id, 'rejected')}
                  className="flex-1 py-2 bg-rose-500/10 hover:bg-rose-500 text-rose-400 hover:text-white border border-rose-500/20 rounded font-mono font-bold text-xs uppercase transition-all cursor-pointer flex items-center justify-center gap-1.5"
                >
                  <X className="w-3.5 h-3.5" />
                  <span>REJECT</span>
                </button>

                <button
                  onClick={() => handleAction(selectedApproval.id, 'approved')}
                  className="flex-1 py-2 bg-emerald-500 hover:bg-emerald-400 text-black rounded font-mono font-bold text-xs uppercase transition-all cursor-pointer flex items-center justify-center gap-1.5"
                >
                  <Check className="w-3.5 h-3.5" />
                  <span>APPROVE</span>
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
