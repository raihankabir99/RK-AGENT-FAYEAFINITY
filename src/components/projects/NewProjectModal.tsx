import { useState } from 'react';
import { X, Check, ArrowRight, ArrowLeft, GitBranch, Database, Rocket, BrainCircuit, ShieldAlert, Sparkles } from 'lucide-react';
import { Project, EnvironmentType, Connector } from '../../types';

interface NewProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreateProject: (newProject: Project) => void;
}

export const NewProjectModal = ({ isOpen, onClose, onCreateProject }: NewProjectModalProps) => {
  const [step, setStep] = useState<number>(1);

  // Form State
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [type, setType] = useState<Project['type']>('Web Application');
  const [environment, setEnvironment] = useState<EnvironmentType>('PRODUCTION');

  // Source Control State
  const [githubRepo, setGithubRepo] = useState('org/new-engineering-project');
  const [githubBranch, setGithubBranch] = useState('main');
  const [githubConnected, setGithubConnected] = useState(true);

  // Database State
  const [supabaseConnected, setSupabaseConnected] = useState(true);
  const [supabaseProject, setSupabaseProject] = useState('prj_db_prod_2026');

  // Deployment State
  const [vercelConnected, setVercelConnected] = useState(true);
  const [vercelProject, setVercelProject] = useState('new-project-prod');

  // AI Context State
  const [purpose, setPurpose] = useState('High performance core service with automated AI audit pipelines.');
  const [techStack, setTechStack] = useState('React 19, TypeScript, Express, Supabase, Vercel');
  const [architectureNotes, setArchitectureNotes] = useState('Microservice routing via cloud edge CDN.');
  const [rules, setRules] = useState('ZERO DATA LOSS\nNO UNCHECKED MIGRATIONS\nMANUAL REVIEW MANDATORY');

  if (!isOpen) return null;

  const handleCreate = () => {
    const connectors: Connector[] = [];
    if (githubConnected) {
      connectors.push({
        id: 'c_' + Date.now() + '_1',
        name: 'GitHub',
        type: 'GITHUB',
        connected: true,
        status: 'ACTIVE',
        lastSync: 'Just now',
        mapping: githubRepo,
        permissions: ['READ', 'WRITE', 'PR']
      });
    }
    if (supabaseConnected) {
      connectors.push({
        id: 'c_' + Date.now() + '_2',
        name: 'Supabase',
        type: 'SUPABASE',
        connected: true,
        status: 'ACTIVE',
        lastSync: 'Just now',
        mapping: supabaseProject,
        permissions: ['SELECT', 'INSERT', 'MIGRATE']
      });
    }
    if (vercelConnected) {
      connectors.push({
        id: 'c_' + Date.now() + '_3',
        name: 'Vercel',
        type: 'VERCEL',
        connected: true,
        status: 'ACTIVE',
        lastSync: 'Just now',
        mapping: vercelProject,
        permissions: ['DEPLOY']
      });
    }

    const newProject: Project = {
      id: Date.now().toString(),
      name: name || 'New Enterprise Project',
      description: description || 'Next-generation engineering service',
      type,
      environment,
      status: 'OPERATIONAL',
      lastActivity: 'Just now',
      lastDeployment: 'Just now',
      openTasksCount: 1,
      pendingApprovalsCount: 0,
      openAuditsCount: 0,
      connectors,
      aiContext: {
        purpose,
        techStack: techStack.split(',').map(s => s.trim()),
        architectureNotes,
        rules: rules.split('\n').filter(Boolean),
        importantFiles: ['/src/App.tsx', '/package.json']
      },
      tasks: [
        { id: 't_init', title: 'Initialize automated architecture audit', status: 'QUEUED', createdAt: 'Just now', priority: 'P1' }
      ],
      approvals: [],
      audits: [],
      activities: [
        { id: 'act_init', timestamp: 'Just now', action: 'Project environment created', source: 'AI', status: 'SUCCESS' }
      ],
      architectureNodes: [
        { id: 'n_a1', label: 'APPLICATION CONTAINER', type: 'APP', status: 'HEALTHY', details: 'Initialized' },
        { id: 'n_a2', label: 'GITHUB REPOSITORY', type: 'GITHUB', status: 'HEALTHY', details: githubRepo }
      ]
    };

    onCreateProject(newProject);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div className="bg-[#0A0A0A] border border-white/10 rounded-2xl w-full max-w-3xl overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.9)] flex flex-col max-h-[90vh]">
        
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-white/10 flex items-center justify-between bg-[#121212]">
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-[#D4AF37] animate-pulse"></div>
            <span className="text-[10px] font-mono font-bold uppercase tracking-[0.2em] text-[#D4AF37]">
              PROJECT INITIALIZATION WIZARD
            </span>
          </div>
          <button
            onClick={onClose}
            className="text-neutral-500 hover:text-white p-1 rounded hover:bg-white/5 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Step Indicator Progress Bar */}
        <div className="px-6 py-3 bg-[#080808] border-b border-white/5 flex items-center justify-between text-[10px] font-mono text-neutral-500 overflow-x-auto">
          {[
            { num: 1, label: '01 IDENTITY' },
            { num: 2, label: '02 GITHUB' },
            { num: 3, label: '03 SUPABASE' },
            { num: 4, label: '04 VERCEL' },
            { num: 5, label: '05 AI CONTEXT' },
            { num: 6, label: '06 REVIEW' }
          ].map((s) => (
            <div
              key={s.num}
              onClick={() => s.num < step && setStep(s.num)}
              className={`flex items-center gap-2 px-2 py-1 rounded cursor-pointer transition-colors whitespace-nowrap ${
                step === s.num
                  ? 'text-[#D4AF37] font-bold border-b border-[#D4AF37]'
                  : step > s.num
                  ? 'text-emerald-400'
                  : 'text-neutral-600'
              }`}
            >
              <span>{s.label}</span>
              {step > s.num && <Check className="w-3 h-3 text-emerald-400" />}
            </div>
          ))}
        </div>

        {/* Step Content */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6 text-xs text-neutral-300">
          
          {/* STEP 1: IDENTITY */}
          {step === 1 && (
            <div className="space-y-4 animate-fadeIn">
              <h3 className="text-base font-semibold text-white">01 / Project Identity</h3>
              <p className="text-neutral-500">Define the core identification and classification for this engineering project.</p>

              <div>
                <label className="block text-[10px] font-mono text-neutral-400 uppercase tracking-wider mb-1.5">
                  Project Name *
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. ZOAL Platform v2"
                  className="w-full bg-[#121212] border border-white/10 rounded-lg p-3 text-sm text-white placeholder-neutral-700 focus:outline-none focus:ring-1 focus:ring-[#D4AF37]"
                />
              </div>

              <div>
                <label className="block text-[10px] font-mono text-neutral-400 uppercase tracking-wider mb-1.5">
                  Description
                </label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Short architectural summary..."
                  rows={2}
                  className="w-full bg-[#121212] border border-white/10 rounded-lg p-3 text-xs text-white placeholder-neutral-700 focus:outline-none focus:ring-1 focus:ring-[#D4AF37]"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-mono text-neutral-400 uppercase tracking-wider mb-1.5">
                    Project Type
                  </label>
                  <select
                    value={type}
                    onChange={(e) => setType(e.target.value as any)}
                    className="w-full bg-[#121212] border border-white/10 rounded-lg p-3 text-xs text-white focus:outline-none focus:ring-1 focus:ring-[#D4AF37]"
                  >
                    <option value="Web Application">Web Application</option>
                    <option value="E-Commerce">E-Commerce</option>
                    <option value="SaaS">SaaS</option>
                    <option value="Mobile">Mobile</option>
                    <option value="API">API</option>
                    <option value="Internal Tool">Internal Tool</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[10px] font-mono text-neutral-400 uppercase tracking-wider mb-1.5">
                    Target Environment
                  </label>
                  <select
                    value={environment}
                    onChange={(e) => setEnvironment(e.target.value as any)}
                    className="w-full bg-[#121212] border border-white/10 rounded-lg p-3 text-xs text-white focus:outline-none focus:ring-1 focus:ring-[#D4AF37]"
                  >
                    <option value="PRODUCTION">PRODUCTION</option>
                    <option value="PREVIEW">PREVIEW</option>
                    <option value="LOCAL">LOCAL</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* STEP 2: SOURCE CONTROL */}
          {step === 2 && (
            <div className="space-y-4 animate-fadeIn">
              <div className="flex items-center gap-2">
                <GitBranch className="w-5 h-5 text-[#D4AF37]" />
                <h3 className="text-base font-semibold text-white">02 / Source Control (GitHub)</h3>
              </div>
              <p className="text-neutral-500">Connect a GitHub repository to enable code audits, branch inspection, and PR automation.</p>

              <div className="bg-[#121212] border border-white/10 rounded-lg p-4 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs text-white">GitHub Connection</span>
                  <button
                    onClick={() => setGithubConnected(!githubConnected)}
                    className={`px-3 py-1 rounded text-[10px] font-mono font-bold uppercase tracking-wider ${
                      githubConnected ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-neutral-800 text-neutral-500'
                    }`}
                  >
                    {githubConnected ? 'CONNECTED ✓' : 'DISCONNECTED'}
                  </button>
                </div>

                {githubConnected && (
                  <>
                    <div>
                      <label className="block text-[10px] font-mono text-neutral-400 uppercase mb-1">
                        Repository
                      </label>
                      <input
                        type="text"
                        value={githubRepo}
                        onChange={(e) => setGithubRepo(e.target.value)}
                        className="w-full bg-[#0A0A0A] border border-white/10 rounded p-2 text-xs text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-mono text-neutral-400 uppercase mb-1">
                        Default Branch
                      </label>
                      <input
                        type="text"
                        value={githubBranch}
                        onChange={(e) => setGithubBranch(e.target.value)}
                        className="w-full bg-[#0A0A0A] border border-white/10 rounded p-2 text-xs text-white"
                      />
                    </div>
                  </>
                )}
              </div>
            </div>
          )}

          {/* STEP 3: DATABASE */}
          {step === 3 && (
            <div className="space-y-4 animate-fadeIn">
              <div className="flex items-center gap-2">
                <Database className="w-5 h-5 text-emerald-400" />
                <h3 className="text-base font-semibold text-white">03 / Database (Supabase)</h3>
              </div>
              <p className="text-neutral-500">Optionally pair a Supabase instance to inspect tables, RLS security policies, and migrations.</p>

              <div className="bg-[#121212] border border-white/10 rounded-lg p-4 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs text-white">Supabase Integration</span>
                  <button
                    onClick={() => setSupabaseConnected(!supabaseConnected)}
                    className={`px-3 py-1 rounded text-[10px] font-mono font-bold uppercase tracking-wider ${
                      supabaseConnected ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-neutral-800 text-neutral-500'
                    }`}
                  >
                    {supabaseConnected ? 'CONNECTED ✓' : 'SKIPPED'}
                  </button>
                </div>

                {supabaseConnected && (
                  <div>
                    <label className="block text-[10px] font-mono text-neutral-400 uppercase mb-1">
                      Project Reference
                    </label>
                    <input
                      type="text"
                      value={supabaseProject}
                      onChange={(e) => setSupabaseProject(e.target.value)}
                      className="w-full bg-[#0A0A0A] border border-white/10 rounded p-2 text-xs text-white"
                    />
                  </div>
                )}
              </div>
            </div>
          )}

          {/* STEP 4: DEPLOYMENT */}
          {step === 4 && (
            <div className="space-y-4 animate-fadeIn">
              <div className="flex items-center gap-2">
                <Rocket className="w-5 h-5 text-blue-400" />
                <h3 className="text-base font-semibold text-white">04 / Deployment (Vercel)</h3>
              </div>
              <p className="text-neutral-500">Connect Vercel runtime to audit builds, track deployment health, and verify preview URLs.</p>

              <div className="bg-[#121212] border border-white/10 rounded-lg p-4 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs text-white">Vercel Integration</span>
                  <button
                    onClick={() => setVercelConnected(!vercelConnected)}
                    className={`px-3 py-1 rounded text-[10px] font-mono font-bold uppercase tracking-wider ${
                      vercelConnected ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-neutral-800 text-neutral-500'
                    }`}
                  >
                    {vercelConnected ? 'CONNECTED ✓' : 'SKIPPED'}
                  </button>
                </div>

                {vercelConnected && (
                  <div>
                    <label className="block text-[10px] font-mono text-neutral-400 uppercase mb-1">
                      Vercel Project ID
                    </label>
                    <input
                      type="text"
                      value={vercelProject}
                      onChange={(e) => setVercelProject(e.target.value)}
                      className="w-full bg-[#0A0A0A] border border-white/10 rounded p-2 text-xs text-white"
                    />
                  </div>
                )}
              </div>
            </div>
          )}

          {/* STEP 5: AI CONTEXT */}
          {step === 5 && (
            <div className="space-y-4 animate-fadeIn">
              <div className="flex items-center gap-2">
                <BrainCircuit className="w-5 h-5 text-[#D4AF37]" />
                <h3 className="text-base font-semibold text-white">05 / AI Context & Engineering Rules</h3>
              </div>
              <p className="text-neutral-500">The AI agent will strictly respect these guidelines when performing audits, proposing code changes, or running tasks.</p>

              <div>
                <label className="block text-[10px] font-mono text-neutral-400 uppercase mb-1">
                  Project Purpose
                </label>
                <input
                  type="text"
                  value={purpose}
                  onChange={(e) => setPurpose(e.target.value)}
                  className="w-full bg-[#121212] border border-white/10 rounded p-2.5 text-xs text-white"
                />
              </div>

              <div>
                <label className="block text-[10px] font-mono text-neutral-400 uppercase mb-1">
                  Tech Stack (Comma-separated)
                </label>
                <input
                  type="text"
                  value={techStack}
                  onChange={(e) => setTechStack(e.target.value)}
                  className="w-full bg-[#121212] border border-white/10 rounded p-2.5 text-xs text-white"
                />
              </div>

              <div>
                <label className="block text-[10px] font-mono text-neutral-400 uppercase mb-1">
                  Strict Engineering Rules (One per line)
                </label>
                <textarea
                  value={rules}
                  onChange={(e) => setRules(e.target.value)}
                  rows={3}
                  className="w-full bg-[#121212] border border-white/10 rounded p-2.5 text-xs text-amber-300 font-mono focus:outline-none"
                />
              </div>
            </div>
          )}

          {/* STEP 6: REVIEW */}
          {step === 6 && (
            <div className="space-y-4 animate-fadeIn">
              <h3 className="text-base font-semibold text-white">06 / Final Review & Summary</h3>
              <p className="text-neutral-500">Verify your configuration before creating the project command context.</p>

              <div className="bg-[#121212] border border-white/10 rounded-xl p-5 space-y-3 font-mono text-xs">
                <div className="flex justify-between border-b border-white/5 pb-2">
                  <span className="text-neutral-500">Project Name:</span>
                  <span className="text-white font-bold">{name || 'New Project'}</span>
                </div>
                <div className="flex justify-between border-b border-white/5 pb-2">
                  <span className="text-neutral-500">Type / Env:</span>
                  <span className="text-neutral-300">{type} ({environment})</span>
                </div>
                <div className="flex justify-between border-b border-white/5 pb-2">
                  <span className="text-neutral-500">GitHub:</span>
                  <span className={githubConnected ? 'text-emerald-400' : 'text-neutral-600'}>
                    {githubConnected ? githubRepo : 'Disabled'}
                  </span>
                </div>
                <div className="flex justify-between border-b border-white/5 pb-2">
                  <span className="text-neutral-500">Supabase:</span>
                  <span className={supabaseConnected ? 'text-emerald-400' : 'text-neutral-600'}>
                    {supabaseConnected ? supabaseProject : 'Disabled'}
                  </span>
                </div>
                <div className="flex justify-between border-b border-white/5 pb-2">
                  <span className="text-neutral-500">Vercel:</span>
                  <span className={vercelConnected ? 'text-emerald-400' : 'text-neutral-600'}>
                    {vercelConnected ? vercelProject : 'Disabled'}
                  </span>
                </div>
                <div className="pt-2">
                  <span className="text-neutral-500 block mb-1">AI Engineering Rules:</span>
                  <div className="bg-[#0A0A0A] p-3 rounded border border-white/5 text-amber-300/80 text-[11px] space-y-1">
                    {rules.split('\n').filter(Boolean).map((r, i) => (
                      <div key={i}>• {r}</div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer Controls */}
        <div className="px-6 py-4 bg-[#121212] border-t border-white/10 flex items-center justify-between">
          <button
            onClick={() => step > 1 && setStep(step - 1)}
            disabled={step === 1}
            className={`px-4 py-2 rounded text-xs font-bold uppercase tracking-wider flex items-center gap-2 border border-white/10 ${
              step === 1 ? 'opacity-30 cursor-not-allowed text-neutral-600' : 'text-neutral-300 hover:bg-white/5'
            }`}
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back</span>
          </button>

          {step < 6 ? (
            <button
              onClick={() => setStep(step + 1)}
              className="px-5 py-2 bg-[#D4AF37] hover:bg-amber-400 text-black text-xs font-bold uppercase tracking-wider rounded flex items-center gap-2 transition-all cursor-pointer"
            >
              <span>Next Step</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          ) : (
            <button
              onClick={handleCreate}
              className="px-6 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-black text-xs font-bold uppercase tracking-wider rounded shadow-[0_0_20px_rgba(16,185,129,0.3)] flex items-center gap-2 transition-all cursor-pointer"
            >
              <Sparkles className="w-4 h-4" />
              <span>CREATE PROJECT</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
