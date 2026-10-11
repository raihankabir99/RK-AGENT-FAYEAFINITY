import { useState } from 'react';
import { ShieldAlert, CheckCircle2, Play, AlertTriangle, FileText, Sparkles } from 'lucide-react';
import { Project, AuditRecord } from '../../../types';

interface AuditsTabProps {
  project: Project;
}

export const AuditsTab = ({ project }: AuditsTabProps) => {
  const [running, setRunning] = useState(false);
  const [selectedAudit, setSelectedAudit] = useState<AuditRecord | null>(project.audits[0] || null);

  const handleRunAudit = () => {
    setRunning(true);
    setTimeout(() => {
      setRunning(false);
    }, 2000);
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="flex items-center justify-between border-b border-white/5 pb-4">
        <div>
          <h3 className="text-xs font-mono font-bold text-[#D4AF37] uppercase tracking-wider">FORENSIC AUDIT CENTER</h3>
          <p className="text-neutral-500 text-xs">Automated code, database schema, and security vulnerability inspection history.</p>
        </div>

        <button
          onClick={handleRunAudit}
          disabled={running}
          className="px-4 py-2 bg-[#D4AF37] hover:bg-amber-400 text-black text-xs font-bold uppercase tracking-wider rounded flex items-center gap-2 transition-all cursor-pointer"
        >
          <Play className={`w-3.5 h-3.5 ${running ? 'animate-spin' : ''}`} />
          <span>{running ? 'AUDITING...' : 'RUN NEW AUDIT'}</span>
        </button>
      </div>

      {/* Progress Bars for Audit Scanning */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 bg-[#121212] p-4 rounded-xl border border-white/5 font-mono text-xs">
        <div>
          <div className="flex justify-between text-neutral-400 mb-1.5 text-[10px]">
            <span>REPOSITORY CODE</span>
            <span className="text-emerald-400 font-bold">100%</span>
          </div>
          <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
            <div className="w-full h-full bg-emerald-500"></div>
          </div>
        </div>

        <div>
          <div className="flex justify-between text-neutral-400 mb-1.5 text-[10px]">
            <span>DATABASE SCHEMAS</span>
            <span className="text-emerald-400 font-bold">100%</span>
          </div>
          <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
            <div className="w-full h-full bg-emerald-500"></div>
          </div>
        </div>

        <div>
          <div className="flex justify-between text-neutral-400 mb-1.5 text-[10px]">
            <span>API CONTRACTS</span>
            <span className="text-blue-400 font-bold">82%</span>
          </div>
          <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
            <div className="w-[82%] h-full bg-blue-500"></div>
          </div>
        </div>

        <div>
          <div className="flex justify-between text-neutral-400 mb-1.5 text-[10px]">
            <span>SECURITY POLICIES</span>
            <span className="text-emerald-400 font-bold">100%</span>
          </div>
          <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
            <div className="w-full h-full bg-emerald-500"></div>
          </div>
        </div>
      </div>

      {/* Audit Records Table */}
      <div className="bg-[#121212] border border-white/5 rounded-xl overflow-hidden">
        {project.audits.length === 0 ? (
          <div className="p-12 text-center space-y-3">
            <ShieldAlert className="w-8 h-8 text-neutral-600 mx-auto" />
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">NO AUDIT HISTORY</h4>
            <p className="text-xs text-neutral-500 max-w-sm mx-auto">
              Run your first automated architectural, security, and schema audit on this project.
            </p>
            <button
              onClick={handleRunAudit}
              className="px-4 py-2 bg-[#D4AF37] text-black text-xs font-bold uppercase tracking-wider rounded mt-2 cursor-pointer"
            >
              RUN FIRST AUDIT
            </button>
          </div>
        ) : (
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-white/10 bg-[#0A0A0A] text-[10px] font-mono text-neutral-500 uppercase tracking-wider">
                <th className="p-4">Audit Name</th>
                <th className="p-4">Type</th>
                <th className="p-4">Started</th>
                <th className="p-4">Completed</th>
                <th className="p-4">Findings</th>
                <th className="p-4">Severity</th>
                <th className="p-4">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-xs text-neutral-300 font-mono">
              {project.audits.map((a) => (
                <tr
                  key={a.id}
                  onClick={() => setSelectedAudit(a)}
                  className={`hover:bg-white/[0.02] cursor-pointer transition-colors ${
                    selectedAudit?.id === a.id ? 'bg-[#D4AF37]/5' : ''
                  }`}
                >
                  <td className="p-4 font-bold text-white flex items-center gap-2">
                    <FileText className="w-3.5 h-3.5 text-[#D4AF37]" />
                    <span>{a.name}</span>
                  </td>
                  <td className="p-4 text-neutral-400">{a.type}</td>
                  <td className="p-4 text-neutral-500 text-[11px]">{a.startedAt}</td>
                  <td className="p-4 text-neutral-500 text-[11px]">{a.completedAt}</td>
                  <td className="p-4 text-white font-bold">{a.findingsCount} Findings</td>
                  <td className="p-4">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      a.severity === 'P0' ? 'bg-rose-500/10 text-rose-400 border border-rose-500/20' :
                      a.severity === 'P1' ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20' :
                      'bg-blue-500/10 text-blue-400 border border-blue-500/20'
                    }`}>
                      {a.severity}
                    </span>
                  </td>
                  <td className="p-4 text-emerald-400">{a.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Selected Audit Findings Breakdown */}
      {selectedAudit && selectedAudit.findings && selectedAudit.findings.length > 0 && (
        <div className="bg-[#121212] border border-white/5 rounded-xl p-5 space-y-4">
          <h4 className="text-xs font-mono font-bold text-[#D4AF37] uppercase tracking-wider flex items-center gap-2">
            <Sparkles className="w-4 h-4" />
            DETAILED FINDINGS: {selectedAudit.name.toUpperCase()}
          </h4>

          <div className="space-y-3">
            {selectedAudit.findings.map((f, idx) => (
              <div key={idx} className="bg-[#0A0A0A] p-4 rounded-lg border border-white/5 text-xs font-mono space-y-1">
                <div className="flex justify-between items-center text-[10px]">
                  <span className="text-amber-400 font-bold">[{f.severity}] {f.file}:{f.line}</span>
                  <span className="text-neutral-500">{f.functionName}()</span>
                </div>
                <p className="text-white font-sans text-xs mt-1">{f.evidence}</p>
                <p className="text-neutral-400 text-[11px] italic mt-1">Recommendation: {f.recommendation}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
