import { useState } from 'react';
import { Database, ShieldCheck, Key, Table, RefreshCw, Play } from 'lucide-react';
import { Project } from '../../../types';

interface DatabaseTabProps {
  project: Project;
}

export const DatabaseTab = ({ project }: DatabaseTabProps) => {
  const [activeTable, setActiveTable] = useState('orders');

  const tables = [
    { name: 'orders', rows: '142,850', rls: true },
    { name: 'products', rows: '12,400', rls: true },
    { name: 'users', rows: '45,120', rls: true },
    { name: 'audit_logs', rows: '1,250,000', rls: true },
  ];

  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="flex items-center justify-between border-b border-white/5 pb-4">
        <div>
          <h3 className="text-xs font-mono font-bold text-[#D4AF37] uppercase tracking-wider">DATABASE COMMAND CENTER</h3>
          <p className="text-neutral-500 text-xs">Supabase PostgreSQL schema, RLS policies, and index health inspector.</p>
        </div>
        <div className="flex items-center gap-2 text-emerald-400 font-mono text-[10px] bg-emerald-500/10 px-2 py-1 rounded border border-emerald-500/20">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>RLS PROTECTED</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Tables Explorer */}
        <div className="bg-[#121212] border border-white/5 rounded-xl p-4 font-mono text-xs">
          <span className="text-[10px] text-neutral-500 uppercase tracking-widest block mb-3 font-bold">
            TABLE SCHEMAS
          </span>
          <div className="space-y-2">
            {tables.map((t) => (
              <div
                key={t.name}
                onClick={() => setActiveTable(t.name)}
                className={`p-3 rounded border transition-all cursor-pointer flex items-center justify-between ${
                  activeTable === t.name
                    ? 'bg-[#D4AF37]/10 border-[#D4AF37]/30 text-white font-bold'
                    : 'bg-[#0A0A0A] border-white/5 text-neutral-400 hover:text-white'
                }`}
              >
                <div className="flex items-center gap-2">
                  <Table className="w-4 h-4 text-neutral-500" />
                  <span>{t.name}</span>
                </div>
                <div className="text-right text-[10px]">
                  <span className="text-neutral-500 block">{t.rows} rows</span>
                  <span className="text-emerald-400">RLS ON</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ER Visual Map & SQL Console */}
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-[#0A0A0A] border border-white/10 rounded-xl p-5 font-mono text-xs">
            <div className="flex justify-between items-center mb-3">
              <span className="text-neutral-400 font-bold uppercase text-[10px]">ACTIVE TABLE: {activeTable.toUpperCase()}</span>
              <span className="text-neutral-600 text-[10px]">INDEX HEALTH: 98%</span>
            </div>

            <div className="bg-black p-4 rounded border border-white/5 space-y-2 text-neutral-300">
              <div className="text-neutral-500">// Schema for table: {activeTable}</div>
              <div className="text-blue-400">id <span className="text-neutral-500">uuid PRIMARY KEY DEFAULT gen_random_uuid()</span></div>
              <div className="text-blue-400">user_id <span className="text-neutral-500">uuid REFERENCES users(id)</span></div>
              <div className="text-blue-400">status <span className="text-neutral-500">varchar(50) DEFAULT 'PENDING'</span></div>
              <div className="text-blue-400">created_at <span className="text-neutral-500">timestamptz DEFAULT now()</span></div>
            </div>
          </div>

          <div className="bg-[#121212] border border-white/5 rounded-xl p-4 font-mono text-xs">
            <div className="flex justify-between items-center mb-2">
              <span className="text-[10px] text-neutral-500 uppercase font-bold">SQL CONSOLE SANDBOX</span>
              <button className="px-3 py-1 bg-emerald-500 text-black text-[10px] font-bold rounded flex items-center gap-1 cursor-pointer">
                <Play className="w-3 h-3" />
                <span>EXPLAIN ANALYZE</span>
              </button>
            </div>
            <textarea
              readOnly
              value={`EXPLAIN ANALYZE SELECT * FROM ${activeTable} WHERE status = 'PROCESSING' ORDER BY created_at DESC;`}
              rows={2}
              className="w-full bg-black border border-white/5 rounded p-3 text-amber-300 text-xs font-mono focus:outline-none"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
