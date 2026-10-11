import { useState } from 'react';
import { Folder, FileCode, AlertTriangle, CheckCircle2, ShieldAlert, Sparkles } from 'lucide-react';
import { Project } from '../../../types';

interface RepositoryTabProps {
  project: Project;
}

export const RepositoryTab = ({ project }: RepositoryTabProps) => {
  const [selectedFile, setSelectedFile] = useState('src/lib/orders.ts');

  const files = [
    { path: 'src/lib/orders.ts', risk: 'HIGH', label: 'orders.ts' },
    { path: 'src/App.tsx', risk: 'LOW', label: 'App.tsx' },
    { path: 'server.ts', risk: 'LOW', label: 'server.ts' },
    { path: 'supabase/migrations/001.sql', risk: 'MEDIUM', label: '001.sql' },
    { path: 'package.json', risk: 'LOW', label: 'package.json' }
  ];

  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="flex items-center justify-between border-b border-white/5 pb-4">
        <div>
          <h3 className="text-xs font-mono font-bold text-[#D4AF37] uppercase tracking-wider">CODE INSPECTOR</h3>
          <p className="text-neutral-500 text-xs">Repository analysis, static file verification, and AI risk detection.</p>
        </div>
        <span className="text-[10px] font-mono text-neutral-400 bg-white/5 px-2 py-1 rounded border border-white/10">
          BRANCH: main
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 h-[550px]">
        {/* File Tree */}
        <div className="bg-[#121212] border border-white/5 rounded-xl p-4 flex flex-col font-mono text-xs">
          <span className="text-[10px] text-neutral-500 uppercase tracking-widest block mb-3 font-bold">
            FILE EXPLORER
          </span>
          <div className="space-y-1 overflow-y-auto flex-1">
            {files.map((f) => (
              <button
                key={f.path}
                onClick={() => setSelectedFile(f.path)}
                className={`w-full text-left px-3 py-2 rounded flex items-center justify-between transition-colors ${
                  selectedFile === f.path ? 'bg-[#D4AF37]/10 text-[#D4AF37] font-bold border border-[#D4AF37]/20' : 'text-neutral-400 hover:bg-white/5 hover:text-white'
                }`}
              >
                <div className="flex items-center gap-2 truncate">
                  <FileCode className="w-3.5 h-3.5 shrink-0" />
                  <span className="truncate">{f.label}</span>
                </div>
                {f.risk === 'HIGH' && <span className="w-2 h-2 rounded-full bg-amber-500"></span>}
              </button>
            ))}
          </div>
        </div>

        {/* Code Viewer */}
        <div className="lg:col-span-2 bg-[#0A0A0A] border border-white/10 rounded-xl p-4 flex flex-col font-mono text-xs overflow-hidden">
          <div className="flex items-center justify-between pb-3 border-b border-white/5 text-neutral-400 text-[11px] mb-3">
            <span>{selectedFile}</span>
            <span className="text-neutral-600">UTF-8 / TypeScript</span>
          </div>

          <div className="flex-1 overflow-y-auto bg-black p-4 rounded border border-white/5 text-neutral-300 font-mono leading-relaxed space-y-1">
            <div className="text-neutral-600">// File: {selectedFile}</div>
            <div>import &#123; db &#125; from '../database';</div>
            <div className="text-neutral-600">// Order processing concurrency protection</div>
            <div>export async function processOrderQueue(orderId: string) &#123;</div>
            <div className="pl-4 text-amber-300 bg-amber-500/10 p-1 rounded border-l-2 border-amber-500">
              const order = await db.orders.findFirst(&#123; id: orderId &#125;);
            </div>
            <div className="pl-4 text-neutral-400">// Warning: Race condition detected under simultaneous requests</div>
            <div className="pl-4">await db.orders.update(&#123; status: 'PROCESSING' &#125;);</div>
            <div>&#125;</div>
          </div>
        </div>

        {/* AI Analysis Inspector */}
        <div className="bg-[#121212] border border-white/5 rounded-xl p-4 flex flex-col justify-between text-xs font-mono">
          <div>
            <div className="flex items-center gap-2 text-[#D4AF37] font-bold mb-3 uppercase">
              <Sparkles className="w-4 h-4" />
              <span>AI ANALYSIS</span>
            </div>

            <div className="bg-[#0A0A0A] p-3 rounded border border-white/5 space-y-2 mb-4">
              <div className="flex justify-between">
                <span className="text-neutral-500">Risk Severity:</span>
                <span className="text-amber-400 font-bold">HIGH</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-500">Line:</span>
                <span className="text-white">4821</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-500">Issue:</span>
                <span className="text-white">Concurrency Lock</span>
              </div>
            </div>

            <div className="space-y-2 text-neutral-300 font-sans">
              <span className="font-mono text-[10px] text-neutral-500 uppercase block font-bold">Recommendation:</span>
              <p className="text-xs leading-relaxed text-neutral-400">
                Replace un-isolated read with explicit <code className="text-amber-300 font-mono">findFirstForUpdate()</code> transaction to prevent duplicate status updates.
              </p>
            </div>
          </div>

          <button className="w-full py-2 bg-[#D4AF37] hover:bg-amber-400 text-black font-bold uppercase tracking-wider text-[10px] rounded transition-all cursor-pointer">
            CREATE PATCH & PR
          </button>
        </div>
      </div>
    </div>
  );
};
