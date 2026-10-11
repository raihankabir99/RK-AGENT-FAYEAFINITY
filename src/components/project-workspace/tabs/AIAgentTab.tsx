import { useState } from 'react';
import { Send, Terminal, CheckCircle2, AlertTriangle, Sparkles, Cpu, Play, BrainCircuit, Copy, Check, ShieldCheck, Database, Rocket, RefreshCw, Zap, Layers, Code, ChevronRight } from 'lucide-react';
import { Project } from '../../../types';

interface AIAgentTabProps {
  project: Project;
}

export const AIAgentTab = ({ project }: AIAgentTabProps) => {
  const [input, setInput] = useState('');
  const [selectedModel, setSelectedModel] = useState('Claude 3.5 Sonnet');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [activeSubTab, setActiveSubTab] = useState<'chat' | 'actions' | 'logs'>('chat');

  const [messages, setMessages] = useState<Array<{
    sender: 'user' | 'agent';
    text: string;
    time: string;
    model?: string;
    codeSnippet?: string;
    findings?: boolean;
    statusBadge?: string;
  }>>([
    {
      sender: 'agent',
      text: `Hello! I have loaded the full engineering context for ${project.name} (${project.environment}). All connected infrastructure (GitHub, Supabase RLS, Vercel Edge) are verified and responding cleanly.`,
      time: '10:00 AM',
      model: 'Claude 3.5 Sonnet',
      codeSnippet: `// Environment Context
const projectConfig = {
  name: "${project.name}",
  framework: "React 18 + Vite",
  database: "Supabase Postgres (RLS Enabled)",
  hosting: "Vercel Edge Network",
  securityStatus: "OPTIMAL"
};`,
      statusBadge: 'Context Loaded'
    }
  ]);

  const handleSend = (cmdText?: string) => {
    const textToSend = cmdText || input;
    if (!textToSend.trim()) return;

    const userMsg = {
      sender: 'user' as const,
      text: textToSend,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setIsAnalyzing(true);

    setTimeout(() => {
      let agentReply = `Executed analysis for "${textToSend}". All components for ${project.name} are synchronized.`;
      let snippet: string | undefined = undefined;
      let badge = 'Verified';

      const lower = textToSend.toLowerCase();
      if (lower.includes('security') || lower.includes('audit')) {
        agentReply = `Completed full security audit for ${project.name}.\n• Checked 18 Row Level Security policies\n• Verified CORS headers & API token scopes\n• 0 high severity risks found.`;
        snippet = `// Security Audit Log
✔ Database RLS: 18/18 Policies Active
✔ API Token Encryption: AES-256 Valid
✔ Environment Secrets: Sanitized`;
        badge = 'Security Pass';
      } else if (lower.includes('db') || lower.includes('database')) {
        agentReply = `Inspected Supabase database schema & RLS rules for ${project.name}.\n• Table 'users' policy verified\n• Table 'projects' policy verified\n• Indexed keys optimized for 12ms query execution.`;
        snippet = `SELECT table_name, row_security 
FROM information_schema.tables 
WHERE table_schema = 'public';
-- Result: RLS Enabled across all 6 tables`;
        badge = 'Database Synced';
      } else if (lower.includes('deploy') || lower.includes('vercel') || lower.includes('publish')) {
        agentReply = `Triggered deployment pipeline for ${project.name}.\n• Building bundle via Vite...\n• Optimizing assets...\n• Deployed to Vercel Edge LHR1.`;
        snippet = `✓ Deployment ID: dpl_8x92fa801
✓ Production URL: https://faye-affinity.vercel.app
✓ Latency: 11ms (Global Edge)`;
        badge = 'Deployed';
      } else {
        agentReply = `Processed "${textToSend}". Codebase, DB schemas, and Vercel edge deployment updated smoothly.`;
        snippet = `// Action Execution Summary
command: "${textToSend}"
status: "Success"
project: "${project.name}"`;
      }

      const agentMsg = {
        sender: 'agent' as const,
        text: agentReply,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        model: selectedModel,
        codeSnippet: snippet,
        findings: true,
        statusBadge: badge
      };

      setMessages((prev) => [...prev, agentMsg]);
      setIsAnalyzing(false);
    }, 1100);
  };

  const handleCopy = (text: string, idx: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(idx);
    setTimeout(() => setCopiedIndex(null), 1500);
  };

  return (
    <div className="bg-[#0B0B0E] border border-white/10 rounded-2xl p-5 lg:p-6 flex flex-col h-[700px] shadow-2xl relative overflow-hidden animate-fadeIn">
      {/* Background Lighting */}
      <div className="absolute top-0 right-0 w-72 h-72 bg-[#D4AF37]/5 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl pointer-events-none"></div>

      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/5 relative z-10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#D4AF37]/20 to-[#D4AF37]/5 border border-[#D4AF37]/30 flex items-center justify-center text-[#D4AF37] shadow-[0_0_20px_rgba(212,175,55,0.25)]">
            <BrainCircuit className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-sm font-mono font-bold text-white uppercase tracking-wider">
                AI ENGINEERING AGENT
              </h3>
              <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-0.5 rounded-full font-bold flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                ACTIVE
              </span>
            </div>
            <p className="text-[11px] font-mono text-neutral-400 mt-0.5">
              Target Project: <span className="text-[#D4AF37] font-bold">{project.name}</span> ({project.environment})
            </p>
          </div>
        </div>

        {/* AI Model Controls */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 bg-[#121216] border border-white/10 px-3 py-1.5 rounded-xl font-mono text-xs">
            <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span className="text-neutral-400 text-[10px] uppercase">Model:</span>
            <select
              value={selectedModel}
              onChange={(e) => setSelectedModel(e.target.value)}
              className="bg-transparent text-white font-bold focus:outline-none cursor-pointer text-xs"
            >
              <option value="Claude 3.5 Sonnet" className="bg-[#121215] text-white">Claude 3.5 Sonnet</option>
              <option value="GPT-4o" className="bg-[#121215] text-white">GPT-4o</option>
              <option value="Gemini 1.5 Pro" className="bg-[#121215] text-white">Gemini 1.5 Pro</option>
            </select>
          </div>

          <div className="hidden lg:flex items-center gap-1 bg-white/5 border border-white/10 p-1 rounded-xl">
            <button
              onClick={() => setActiveSubTab('chat')}
              className={`px-3 py-1 rounded-lg text-xs font-mono font-bold transition-all ${
                activeSubTab === 'chat' ? 'bg-[#D4AF37] text-black' : 'text-neutral-400 hover:text-white'
              }`}
            >
              Assistant
            </button>
            <button
              onClick={() => setActiveSubTab('actions')}
              className={`px-3 py-1 rounded-lg text-xs font-mono font-bold transition-all ${
                activeSubTab === 'actions' ? 'bg-[#D4AF37] text-black' : 'text-neutral-400 hover:text-white'
              }`}
            >
              Actions
            </button>
          </div>
        </div>
      </div>

      {/* Live System Gauges */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 my-4 bg-[#07070A] p-3 rounded-xl border border-white/5 font-mono text-[10px]">
        <div className="bg-white/[0.02] p-2.5 rounded-lg border border-white/5">
          <div className="flex justify-between text-neutral-400 mb-1.5">
            <span className="flex items-center gap-1"><Code className="w-3 h-3 text-emerald-400" /> REPOSITORY</span>
            <span className="text-emerald-400 font-bold">100%</span>
          </div>
          <div className="h-1 bg-white/5 rounded-full overflow-hidden">
            <div className="w-full h-full bg-emerald-500"></div>
          </div>
        </div>

        <div className="bg-white/[0.02] p-2.5 rounded-lg border border-white/5">
          <div className="flex justify-between text-neutral-400 mb-1.5">
            <span className="flex items-center gap-1"><Database className="w-3 h-3 text-emerald-400" /> DATABASE</span>
            <span className="text-emerald-400 font-bold">100%</span>
          </div>
          <div className="h-1 bg-white/5 rounded-full overflow-hidden">
            <div className="w-full h-full bg-emerald-500"></div>
          </div>
        </div>

        <div className="bg-white/[0.02] p-2.5 rounded-lg border border-white/5">
          <div className="flex justify-between text-neutral-400 mb-1.5">
            <span className="flex items-center gap-1"><ShieldCheck className="w-3 h-3 text-blue-400" /> SECURITY</span>
            <span className="text-blue-400 font-bold">98/100</span>
          </div>
          <div className="h-1 bg-white/5 rounded-full overflow-hidden">
            <div className="w-[98%] h-full bg-blue-500"></div>
          </div>
        </div>

        <div className="bg-white/[0.02] p-2.5 rounded-lg border border-white/5">
          <div className="flex justify-between text-neutral-400 mb-1.5">
            <span className="flex items-center gap-1"><Rocket className="w-3 h-3 text-[#D4AF37]" /> RUNTIME</span>
            <span className="text-[#D4AF37] font-bold">14ms</span>
          </div>
          <div className="h-1 bg-white/5 rounded-full overflow-hidden">
            <div className="w-[90%] h-full bg-[#D4AF37]"></div>
          </div>
        </div>
      </div>

      {/* Main Conversation Feed */}
      {activeSubTab === 'chat' ? (
        <div className="flex-1 overflow-y-auto custom-scrollbar space-y-4 mb-4 pr-2 font-mono text-xs">
          {messages.map((msg, i) => (
            <div key={i} className={`flex gap-3 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
              {msg.sender === 'agent' && (
                <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#D4AF37] to-amber-500 text-black font-bold text-xs flex items-center justify-center shrink-0 shadow-md">
                  AI
                </div>
              )}

              <div className={`p-4 rounded-2xl max-w-2xl transition-all ${
                msg.sender === 'user'
                  ? 'bg-gradient-to-r from-blue-600/20 to-indigo-600/20 text-white border border-blue-500/30 shadow-lg'
                  : 'bg-[#121217] text-neutral-200 border border-white/5 shadow-xl'
              }`}>
                <div className="flex items-center justify-between text-[10px] text-neutral-400 mb-2 pb-1.5 border-b border-white/5">
                  <div className="flex items-center gap-2 font-bold uppercase">
                    <span>{msg.sender === 'user' ? 'YOU' : 'ENGINEERING AGENT'}</span>
                    {msg.statusBadge && (
                      <span className="text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-md text-[9px]">
                        {msg.statusBadge}
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-2 text-neutral-500">
                    {msg.model && <span className="text-[9px] bg-white/5 px-1.5 py-0.5 rounded">{msg.model}</span>}
                    <span>{msg.time}</span>
                  </div>
                </div>

                <p className="whitespace-pre-line leading-relaxed text-xs font-sans text-neutral-300">
                  {msg.text}
                </p>

                {msg.codeSnippet && (
                  <div className="mt-3 p-3 bg-[#060609] border border-white/10 rounded-xl font-mono text-xs text-[#D4AF37] relative group/code">
                    <div className="flex items-center justify-between mb-2 text-[9px] text-neutral-500 uppercase pb-1 border-b border-white/5">
                      <span className="flex items-center gap-1"><Terminal className="w-3 h-3 text-[#D4AF37]" /> CODE / TERMINAL OUTPUT</span>
                      <button
                        onClick={() => handleCopy(msg.codeSnippet!, i)}
                        className="text-neutral-400 hover:text-[#D4AF37] transition-colors flex items-center gap-1 cursor-pointer font-bold"
                      >
                        {copiedIndex === i ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                        <span>{copiedIndex === i ? 'COPIED' : 'COPY'}</span>
                      </button>
                    </div>
                    <pre className="whitespace-pre-wrap leading-relaxed overflow-x-auto custom-scrollbar text-[11px] text-emerald-300">
                      {msg.codeSnippet}
                    </pre>
                  </div>
                )}
              </div>
            </div>
          ))}

          {isAnalyzing && (
            <div className="flex items-center gap-3 p-4 bg-[#121216] border border-white/5 rounded-2xl text-xs font-mono text-neutral-300 animate-pulse">
              <Cpu className="w-4 h-4 animate-spin text-[#D4AF37]" />
              <span>Analyzing codebase, checking database rules, and formulating AI response...</span>
            </div>
          )}
        </div>
      ) : (
        /* Quick Action Grid SubTab */
        <div className="flex-1 overflow-y-auto custom-scrollbar grid grid-cols-1 md:grid-cols-2 gap-4 p-2">
          {[
            { title: 'Run Full Security Audit', desc: 'Scan all 18 database RLS policies and CORS rules', cmd: 'Run Security Scan', icon: ShieldCheck },
            { title: 'Sync Database Schema', desc: 'Inspect tables and verify column permissions', cmd: 'Check Database Rules', icon: Database },
            { title: 'Publish Edge Build', desc: 'Deploy latest commit to Vercel production edge', cmd: 'Publish Preview Site', icon: Rocket },
            { title: 'Optimize Bundle Performance', desc: 'Inspect React bundle size and lazy loading', cmd: 'Optimize Bundle Size', icon: Zap }
          ].map((act, idx) => (
            <div
              key={idx}
              onClick={() => {
                setActiveSubTab('chat');
                handleSend(act.cmd);
              }}
              className="bg-[#121216] border border-white/5 hover:border-[#D4AF37]/40 p-5 rounded-xl flex items-start gap-4 transition-all cursor-pointer group"
            >
              <div className="p-3 rounded-xl bg-[#D4AF37]/10 text-[#D4AF37] group-hover:scale-110 transition-transform">
                <act.icon className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-white group-hover:text-[#D4AF37] transition-colors">{act.title}</h4>
                <p className="text-xs text-neutral-400 mt-1">{act.desc}</p>
                <span className="text-[10px] font-mono text-[#D4AF37] mt-3 inline-flex items-center gap-1">
                  Execute Action <ChevronRight className="w-3 h-3" />
                </span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Quick Prompts Strip */}
      <div className="flex items-center gap-2 overflow-x-auto custom-scrollbar pb-2 mb-3">
        {[
          'Run Security Scan',
          'Check Database Rules',
          'Publish Preview Site',
          'Audit Repository',
          'Find Performance Bottlenecks'
        ].map((cmd) => (
          <button
            key={cmd}
            onClick={() => {
              setActiveSubTab('chat');
              handleSend(cmd);
            }}
            className="text-[10px] font-mono font-bold uppercase tracking-wider px-3 py-1.5 bg-white/5 hover:bg-[#D4AF37] hover:text-black rounded-lg text-neutral-400 transition-all border border-white/5 whitespace-nowrap cursor-pointer flex items-center gap-1 group"
          >
            <span>{cmd}</span>
            <ChevronRight className="w-3 h-3 opacity-60 group-hover:translate-x-0.5 transition-transform" />
          </button>
        ))}
      </div>

      {/* Command Input Bar */}
      <div className="relative z-10">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          placeholder={`Ask AI agent to analyze or update ${project.name}...`}
          className="w-full bg-[#070709] border border-white/10 hover:border-white/20 focus:border-[#D4AF37] rounded-xl pl-4 pr-24 py-3.5 text-xs text-white placeholder-neutral-500 focus:outline-none transition-all font-mono shadow-inner"
        />
        <button
          onClick={() => handleSend()}
          className="absolute right-2 top-1/2 -translate-y-1/2 px-4 py-2 bg-[#D4AF37] hover:bg-amber-400 text-black text-xs font-bold uppercase tracking-wider rounded-lg transition-all flex items-center gap-1.5 cursor-pointer shadow-[0_0_15px_rgba(212,175,55,0.3)]"
        >
          <span>SEND</span>
          <Send className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};

