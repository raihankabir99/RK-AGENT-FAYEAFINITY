import { useState } from 'react';
import {
  GitBranch,
  Database,
  Rocket,
  Activity,
  Bot,
  ShieldCheck,
  ArrowRight,
  X,
  CheckCircle2,
  AlertTriangle,
  Network,
  Cpu,
  RefreshCw,
  Zap,
  Layers,
  Check
} from 'lucide-react';
import { Project } from '../../../types';

interface ArchitectureMapProps {
  project: Project;
}

interface NodeItem {
  id: string;
  label: string;
  subText: string;
  icon: any;
  status: 'HEALTHY' | 'WARNING' | 'SYNCING';
  details: string;
  gridPos: { col: number; row: number }; // 1..3 for cols (left, center, right), 1..3 for rows (top, mid, bot)
  metrics: { latency: string; uptime: string; protocol: string };
}

export const ArchitectureMap = ({ project }: ArchitectureMapProps) => {
  const [selectedNode, setSelectedNode] = useState<NodeItem | null>(null);
  const [activeAction, setActiveAction] = useState<string | null>(null);
  const [actionSuccess, setActionSuccess] = useState<string | null>(null);

  // Dynamic nodes tailored per project based on connectors & tech stack
  const getProjectNodes = (): NodeItem[] => {
    if (project.id === '2') {
      return [
        {
          id: 'ai-agent',
          label: 'AI AGENT',
          subText: 'Faye Affinity Bot',
          icon: Bot,
          status: 'HEALTHY',
          details: 'Autonomous workflow agent engine',
          gridPos: { col: 2, row: 1 },
          metrics: { latency: '12ms', uptime: '99.98%', protocol: 'gRPC' }
        },
        {
          id: 'github',
          label: 'GITHUB',
          subText: 'client-commerce/storefront',
          icon: GitBranch,
          status: 'HEALTHY',
          details: 'Repository & CI/CD webhook triggers',
          gridPos: { col: 1, row: 2 },
          metrics: { latency: '24ms', uptime: '100%', protocol: 'OAuth2 / Webhooks' }
        },
        {
          id: 'stripe',
          label: 'STRIPE API',
          subText: 'Payment Gateway',
          icon: Zap,
          status: 'WARNING',
          details: 'Webhook signature validation requires audit update',
          gridPos: { col: 2, row: 2 },
          metrics: { latency: '85ms', uptime: '99.90%', protocol: 'HTTPS REST' }
        },
        {
          id: 'runtime',
          label: 'RUNTIME',
          subText: 'Next.js Edge Worker',
          icon: Activity,
          status: 'HEALTHY',
          details: 'Vercel Edge functions runner',
          gridPos: { col: 2, row: 3 },
          metrics: { latency: '8ms', uptime: '99.99%', protocol: 'WSS / HTTP2' }
        },
        {
          id: 'vercel',
          label: 'VERCEL',
          subText: 'Production Deployment',
          icon: Rocket,
          status: 'HEALTHY',
          details: 'Edge CDN deployment target',
          gridPos: { col: 3, row: 2 },
          metrics: { latency: '18ms', uptime: '99.99%', protocol: 'HTTPS / SSL' }
        }
      ];
    }

    if (project.id === '3') {
      return [
        {
          id: 'ai-agent',
          label: 'AI AGENT',
          subText: 'Marketing Optimizer',
          icon: Bot,
          status: 'HEALTHY',
          details: 'Lighthouse & SEO auto-tuner',
          gridPos: { col: 2, row: 1 },
          metrics: { latency: '15ms', uptime: '99.99%', protocol: 'gRPC' }
        },
        {
          id: 'github',
          label: 'GITHUB',
          subText: 'org/marketing-web',
          icon: GitBranch,
          status: 'HEALTHY',
          details: 'Astro repository synced to main branch',
          gridPos: { col: 1, row: 2 },
          metrics: { latency: '20ms', uptime: '100%', protocol: 'HTTPS / SSH' }
        },
        {
          id: 'cloudflare',
          label: 'CLOUDFLARE',
          subText: 'CDN & DNS Zone',
          icon: Layers,
          status: 'HEALTHY',
          details: 'Global edge DNS & SSL caching layer',
          gridPos: { col: 2, row: 2 },
          metrics: { latency: '4ms', uptime: '100%', protocol: 'HTTP/3' }
        },
        {
          id: 'runtime',
          label: 'RUNTIME',
          subText: 'Workers Engine',
          icon: Activity,
          status: 'HEALTHY',
          details: 'Cloudflare Workers for SSR forms',
          gridPos: { col: 2, row: 3 },
          metrics: { latency: '10ms', uptime: '99.99%', protocol: 'V8 Isolate' }
        },
        {
          id: 'vercel',
          label: 'VERCEL',
          subText: 'SSG Hosting Target',
          icon: Rocket,
          status: 'HEALTHY',
          details: 'Static asset host',
          gridPos: { col: 3, row: 2 },
          metrics: { latency: '14ms', uptime: '99.99%', protocol: 'HTTPS' }
        }
      ];
    }

    // Default matching user screenshot (Project 1 & general)
    return [
      {
        id: 'ai-agent',
        label: 'AI AGENT',
        subText: 'Autonomous Agent Engine',
        icon: Bot,
        status: 'HEALTHY',
        details: 'Orchestrating system code changes, audits, and real-time execution',
        gridPos: { col: 2, row: 1 },
        metrics: { latency: '14ms', uptime: '99.99%', protocol: 'gRPC / SSE' }
      },
      {
        id: 'github',
        label: 'GITHUB',
        subText: 'rk-agent-fayeaffinity/core',
        icon: GitBranch,
        status: 'HEALTHY',
        details: 'Repository source, branch management, and automated PR synchronization',
        gridPos: { col: 1, row: 2 },
        metrics: { latency: '28ms', uptime: '100%', protocol: 'Git / OAuth2' }
      },
      {
        id: 'supabase',
        label: 'SUPABASE',
        subText: 'PostgreSQL Database',
        icon: Database,
        status: 'HEALTHY',
        details: 'PostgreSQL row-level security, connection pooling, and live migrations',
        gridPos: { col: 2, row: 2 },
        metrics: { latency: '32ms', uptime: '99.95%', protocol: 'Postgres SSL' }
      },
      {
        id: 'runtime',
        label: 'RUNTIME',
        subText: 'Cloud Run Edge Container',
        icon: Activity,
        status: 'HEALTHY',
        details: 'Active Express & Vite container node running on port 3000',
        gridPos: { col: 2, row: 3 },
        metrics: { latency: '16ms', uptime: '99.99%', protocol: 'WSS / HTTP' }
      },
      {
        id: 'vercel',
        label: 'VERCEL',
        subText: 'Production Deployment',
        icon: Rocket,
        status: 'HEALTHY',
        details: 'Global deployment target with instant SSL alias routing',
        gridPos: { col: 3, row: 2 },
        metrics: { latency: '22ms', uptime: '99.99%', protocol: 'HTTPS / TLS 1.3' }
      }
    ];
  };

  const nodes = getProjectNodes();

  const handleRunQuickAction = (actionId: string, actionName: string) => {
    setActiveAction(actionId);
    setTimeout(() => {
      setActiveAction(null);
      setActionSuccess(actionName);
      setTimeout(() => setActionSuccess(null), 3000);
    }, 1200);
  };

  const quickActions = [
    {
      id: 'ai-audit',
      label: 'Run Security Scan',
      icon: ShieldCheck,
      description: 'Scan your project for security issues and fixable bugs'
    },
    {
      id: 'sync-db',
      label: 'Sync Database',
      icon: Database,
      description: 'Ensure database tables and security rules are up to date'
    },
    {
      id: 'deploy-vercel',
      label: 'Publish Live Site',
      icon: Rocket,
      description: 'Deploy your latest changes live to the web'
    },
    {
      id: 'purge-cache',
      label: 'Refresh Site Cache',
      icon: RefreshCw,
      description: 'Clear cached files so visitors see the latest updates instantly'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Topology Canvas Card */}
      <div className="bg-[#0B0B0D] border border-white/10 rounded-2xl p-6 relative overflow-hidden shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-xs font-mono font-bold tracking-widest text-[#D4AF37] uppercase flex items-center gap-2">
              <Network className="w-4 h-4" />
              CONNECTED SERVICES & SITES
            </h3>
            <p className="text-neutral-400 text-xs mt-0.5">
              Visual map of connected services for <span className="text-white font-bold">{project.name}</span>
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="flex items-center gap-1.5 text-[10px] font-mono text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-1 rounded-full font-bold">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></div>
              ALL SERVICES CONNECTED
            </span>
          </div>
        </div>

        {/* Visual Canvas Diagram matching Screenshot */}
        <div className="relative bg-[#050506] border border-white/5 rounded-xl p-8 min-h-[380px] flex items-center justify-center overflow-hidden">
          {/* Subtle Grid Pattern */}
          <div
            className="absolute inset-0 opacity-15 pointer-events-none"
            style={{
              backgroundImage: 'radial-gradient(#D4AF37 1px, transparent 1px)',
              backgroundSize: '24px 24px'
            }}
          ></div>

          {/* SVG Connector Lines */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none z-0">
            {/* GITHUB (Left mid) -> AI AGENT (Top center) */}
            <path
              d="M 28% 50% Q 38% 28% 48% 28%"
              fill="none"
              stroke="#D4AF37"
              strokeWidth="1.5"
              strokeDasharray="4 4"
              className="opacity-60"
            />
            {/* AI AGENT (Top center) -> SUPABASE / CENTER NODE */}
            <path
              d="M 50% 32% L 50% 48%"
              fill="none"
              stroke="#D4AF37"
              strokeWidth="2"
              className="opacity-70"
            />
            {/* SUPABASE / CENTER NODE -> VERCEL (Right mid) */}
            <path
              d="M 52% 52% Q 65% 38% 72% 50%"
              fill="none"
              stroke="#D4AF37"
              strokeWidth="1.5"
              strokeDasharray="4 4"
              className="opacity-60"
            />
            {/* RUNTIME (Bottom center) -> SUPABASE / CENTER NODE */}
            <path
              d="M 50% 68% L 50% 54%"
              fill="none"
              stroke="#D4AF37"
              strokeWidth="2"
              className="opacity-70"
            />
          </svg>

          {/* Nodes Network Layout */}
          <div className="relative z-10 w-full max-w-2xl h-[300px] grid grid-cols-3 grid-rows-3 items-center justify-items-center gap-4">
            {nodes.map((node) => {
              const Icon = node.icon;
              const isSelected = selectedNode?.id === node.id;

              // Compute grid positioning
              const colStyle =
                node.gridPos.col === 1
                  ? 'col-start-1 justify-self-start'
                  : node.gridPos.col === 3
                  ? 'col-start-3 justify-self-end'
                  : 'col-start-2 justify-self-center';

              const rowStyle =
                node.gridPos.row === 1
                  ? 'row-start-1'
                  : node.gridPos.row === 3
                  ? 'row-start-3'
                  : 'row-start-2';

              return (
                <div
                  key={node.id}
                  onClick={() => setSelectedNode(node)}
                  className={`${colStyle} ${rowStyle} flex flex-col items-center gap-2 cursor-pointer group transition-all duration-300`}
                >
                  {/* Glowing Node Box */}
                  <div
                    className={`w-16 h-16 rounded-2xl flex items-center justify-center transition-all duration-300 relative border ${
                      node.status === 'WARNING'
                        ? 'bg-[#181208] border-amber-500/50 shadow-[0_0_20px_rgba(245,158,11,0.25)]'
                        : 'bg-[#0E0E11] border-[#D4AF37]/40 shadow-[0_0_20px_rgba(212,175,55,0.18)] hover:border-[#D4AF37] hover:scale-105'
                    } ${isSelected ? 'ring-2 ring-[#D4AF37] scale-110' : ''}`}
                  >
                    <Icon className="w-7 h-7 text-[#D4AF37] group-hover:drop-shadow-[0_0_8px_rgba(212,175,55,0.8)] transition-all" />

                    {/* Status Dot */}
                    <div className="absolute top-1.5 right-1.5 flex h-2 w-2">
                      <span
                        className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${
                          node.status === 'WARNING' ? 'bg-amber-400' : 'bg-emerald-400'
                        }`}
                      ></span>
                      <span
                        className={`relative inline-flex rounded-full h-2 w-2 ${
                          node.status === 'WARNING' ? 'bg-amber-500' : 'bg-emerald-500'
                        }`}
                      ></span>
                    </div>
                  </div>

                  {/* Node Label underneath matching screenshot */}
                  <span className="text-[11px] font-mono font-bold tracking-wider text-neutral-300 group-hover:text-[#D4AF37] transition-colors uppercase">
                    {node.label}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Live Status Summary Banner */}
        <div className="mt-4 flex flex-wrap items-center justify-between text-xs font-mono text-neutral-400 bg-white/[0.02] border border-white/5 rounded-lg px-4 py-2.5">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5 text-[#D4AF37]">
              <Cpu className="w-3.5 h-3.5" />
              Status: 5 Connected Services Active
            </span>
            <span className="text-neutral-600">|</span>
            <span className="text-emerald-400">All services working smoothly</span>
          </div>

          <span className="text-neutral-500">Click any icon to view details</span>
        </div>
      </div>

      {/* QUICK ACTIONS Section matching user's uploaded image */}
      <div className="bg-[#0B0B0D] border border-white/10 rounded-2xl p-6 shadow-xl">
        <div className="flex items-center justify-between mb-5">
          <h3 className="text-xs font-mono font-bold tracking-widest text-white uppercase flex items-center gap-2">
            <Zap className="w-4 h-4 text-[#D4AF37]" />
            QUICK ACTIONS
          </h3>
          {actionSuccess && (
            <span className="flex items-center gap-1.5 text-xs font-mono text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded border border-emerald-500/20 animate-fadeIn">
              <Check className="w-3.5 h-3.5" />
              {actionSuccess} Completed!
            </span>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          {quickActions.map((action) => {
            const Icon = action.icon;
            const isLoading = activeAction === action.id;

            return (
              <button
                key={action.id}
                onClick={() => handleRunQuickAction(action.id, action.label)}
                disabled={isLoading}
                className="flex items-center justify-between p-4 bg-[#121215] hover:bg-[#18181F] border border-white/5 hover:border-[#D4AF37]/30 rounded-xl transition-all cursor-pointer group text-left"
              >
                <div className="flex items-center gap-3.5">
                  <div className="p-2.5 rounded-lg bg-[#D4AF37]/10 text-[#D4AF37] group-hover:bg-[#D4AF37] group-hover:text-black transition-colors">
                    <Icon className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-white group-hover:text-[#D4AF37] transition-colors block">
                      {action.label}
                    </span>
                    <span className="text-[10px] text-neutral-400 block mt-0.5">
                      {action.description}
                    </span>
                  </div>
                </div>

                <div className="text-neutral-500 group-hover:text-[#D4AF37] transition-colors pl-2">
                  {isLoading ? (
                    <RefreshCw className="w-4 h-4 animate-spin text-[#D4AF37]" />
                  ) : (
                    <ArrowRight className="w-4 h-4" />
                  )}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Node Inspector Modal */}
      {selectedNode && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
          <div className="bg-[#0D0D10] border border-[#D4AF37]/30 rounded-2xl p-6 max-w-md w-full shadow-2xl relative">
            <button
              onClick={() => setSelectedNode(null)}
              className="absolute top-4 right-4 text-neutral-500 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-3 mb-5">
              <div className="p-3 rounded-xl bg-[#D4AF37]/10 text-[#D4AF37]">
                <selectedNode.icon className="w-6 h-6" />
              </div>
              <div>
                <span className="text-[10px] font-mono text-neutral-500 uppercase block">SERVICE DETAILS</span>
                <h4 className="text-base font-bold text-white">{selectedNode.label}</h4>
                <span className="text-xs text-[#D4AF37] font-mono">{selectedNode.subText}</span>
              </div>
            </div>

            <div className="space-y-3 bg-[#131317] p-4 rounded-xl border border-white/5 font-mono text-xs mb-5">
              <div className="flex justify-between items-center">
                <span className="text-neutral-500">Status:</span>
                <span className={`font-bold flex items-center gap-1.5 ${
                  selectedNode.status === 'WARNING' ? 'text-amber-400' : 'text-emerald-400'
                }`}>
                  {selectedNode.status === 'WARNING' ? (
                    <AlertTriangle className="w-3.5 h-3.5" />
                  ) : (
                    <CheckCircle2 className="w-3.5 h-3.5" />
                  )}
                  {selectedNode.status === 'WARNING' ? 'Needs Attention' : 'Healthy'}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-500">Latency:</span>
                <span className="text-white">{selectedNode.metrics.latency}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-500">Uptime:</span>
                <span className="text-white">{selectedNode.metrics.uptime}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-500">Protocol:</span>
                <span className="text-white">{selectedNode.metrics.protocol}</span>
              </div>
              <div className="pt-2 border-t border-white/5 text-neutral-300">
                <span className="text-neutral-500 block mb-1">What this service does:</span>
                <p className="text-neutral-300 font-sans text-xs leading-relaxed">{selectedNode.details}</p>
              </div>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => setSelectedNode(null)}
                className="w-full py-2.5 bg-[#D4AF37] text-black font-bold uppercase text-xs rounded-lg hover:bg-amber-400 transition-colors cursor-pointer"
              >
                Close Details
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

