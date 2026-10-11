import { useState } from 'react';
import { GitBranch, Database, Rocket, Cloud, ShieldCheck, RefreshCw, CheckCircle2, AlertCircle } from 'lucide-react';
import { Project, Connector } from '../../../types';

interface ConnectorsTabProps {
  project: Project;
}

export const ConnectorsTab = ({ project }: ConnectorsTabProps) => {
  const [testingId, setTestingId] = useState<string | null>(null);
  const [connectors, setConnectors] = useState<Connector[]>(project.connectors);

  const handleTestConnection = (id: string) => {
    setTestingId(id);
    setTimeout(() => {
      setTestingId(null);
      setConnectors((prev) =>
        prev.map((c) => (c.id === id ? { ...c, lastSync: 'Just now', status: 'ACTIVE' } : c))
      );
    }, 1200);
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="flex items-center justify-between border-b border-white/5 pb-4">
        <div>
          <h3 className="text-xs font-mono font-bold text-[#D4AF37] uppercase tracking-wider">CONNECTED SYSTEMS</h3>
          <p className="text-neutral-500 text-xs">External integrations providing context and deployment targets.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {connectors.map((conn) => (
          <div key={conn.id} className="bg-[#121212] border border-white/5 rounded-xl p-5 flex flex-col justify-between space-y-4 font-mono text-xs">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-bold text-white uppercase">{conn.name}</span>
                <span className={`text-[10px] px-2 py-0.5 rounded font-bold ${
                  conn.connected ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-neutral-800 text-neutral-500'
                }`}>
                  {conn.connected ? 'CONNECTED' : 'DISCONNECTED'}
                </span>
              </div>

              <div className="space-y-2 bg-[#0A0A0A] p-3 rounded border border-white/5 text-[11px]">
                <div className="flex justify-between">
                  <span className="text-neutral-500">Mapping:</span>
                  <span className="text-neutral-300 truncate max-w-[150px]">{conn.mapping || 'N/A'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-500">Last Sync:</span>
                  <span className="text-neutral-400">{conn.lastSync}</span>
                </div>
              </div>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => handleTestConnection(conn.id)}
                disabled={testingId === conn.id}
                className="flex-1 py-1.5 bg-white/5 hover:bg-white/10 text-white rounded text-[10px] font-bold uppercase transition-all flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <RefreshCw className={`w-3 h-3 ${testingId === conn.id ? 'animate-spin text-[#D4AF37]' : ''}`} />
                <span>{testingId === conn.id ? 'TESTING...' : 'TEST CONNECTION'}</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
