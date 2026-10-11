import { Project } from './types';

export const mockProjects: Project[] = [
  {
    id: '1',
    name: 'RK AGENT FAYEAFINITY Platform',
    description: 'Enterprise AI orchestration engine and real-time command system',
    type: 'SaaS',
    environment: 'PRODUCTION',
    status: 'OPERATIONAL',
    lastActivity: '2 minutes ago',
    lastDeployment: '12 minutes ago',
    openTasksCount: 3,
    pendingApprovalsCount: 2,
    openAuditsCount: 1,
    connectors: [
      { id: 'c1', name: 'GitHub', type: 'GITHUB', connected: true, status: 'ACTIVE', lastSync: '2 minutes ago', mapping: 'rk-agent-fayeaffinity/core', permissions: ['READ', 'WRITE', 'PR'] },
      { id: 'c2', name: 'Supabase', type: 'SUPABASE', connected: true, status: 'ACTIVE', lastSync: '5 minutes ago', mapping: 'prj_prod_db_01', permissions: ['SELECT', 'INSERT', 'MIGRATE'] },
      { id: 'c3', name: 'Vercel', type: 'VERCEL', connected: true, status: 'ACTIVE', lastSync: '10 minutes ago', mapping: 'fayeaffinity-prod-v2', permissions: ['DEPLOY', 'ALIAS'] },
      { id: 'c4', name: 'Sentry', type: 'SENTRY', connected: true, status: 'ACTIVE', lastSync: '1 minute ago', mapping: 'fayeaffinity-sentry', permissions: ['READ_ERRORS'] },
      { id: 'c5', name: 'Slack', type: 'SLACK', connected: true, status: 'ACTIVE', lastSync: '15 minutes ago', mapping: '#ops-alerts', permissions: ['POST_MESSAGE'] },
    ],
    aiContext: {
      purpose: 'Autonomous AI Engineering agent runner and multi-project control hub',
      techStack: ['React 19', 'TypeScript 5.8', 'Tailwind CSS v4', 'Vite', 'Express', 'Supabase', 'Vercel'],
      architectureNotes: 'Distributed event-driven architecture with zero-trust IPC between edge nodes and AI engine.',
      rules: [
        'ZERO DATA LOSS',
        'ZERO BREAKING CHANGES',
        'NO PRODUCTION DATABASE MODIFICATION WITHOUT APPROVAL',
        'NO DEPLOYMENT WITHOUT HUMAN REVIEW'
      ],
      importantFiles: ['/src/App.tsx', '/server.ts', '/src/types.ts', '/package.json']
    },
    tasks: [
      { id: 't1', title: 'Audit Product Management concurrency', status: 'RUNNING', createdAt: '10 min ago', priority: 'P1', assignedAgent: 'Agent FAYE' },
      { id: 't2', title: 'Verify Supabase RLS policies for auth', status: 'APPROVAL REQUIRED', createdAt: '25 min ago', priority: 'P0' },
      { id: 't3', title: 'Review Vercel preview deployment logs', status: 'QUEUED', createdAt: '1 hour ago', priority: 'P2' },
      { id: 't4', title: 'Analyze dependency updates for security', status: 'COMPLETED', createdAt: '3 hours ago', priority: 'P3' }
    ],
    approvals: [
      {
        id: 'app1',
        title: 'Concurrency Lock Patch on Orders Module',
        type: 'CODE_PATCH',
        requestedBy: 'Agent FAYE',
        affectedSystem: 'src/lib/orders.ts',
        risk: 'HIGH',
        reason: 'Prevents potential race condition during simultaneous row updates under high concurrency.',
        createdAt: '15 min ago',
        diffPreview: {
          file: 'src/lib/orders.ts',
          before: 'const order = await db.orders.findFirst({ id });\nawait db.orders.update({ status: "PROCESSING" });',
          after: 'const order = await db.orders.findFirstForUpdate({ id });\nawait db.orders.update({ status: "PROCESSING" });'
        }
      },
      {
        id: 'app2',
        title: 'Add Indexes to User Audit Logs Table',
        type: 'DATABASE_MIGRATION',
        requestedBy: 'Database Audit Bot',
        affectedSystem: 'Supabase / PostgreSQL',
        risk: 'MEDIUM',
        reason: 'Migration 20260825_audit_idx.sql adds non-blocking B-tree index on user_id and timestamp.',
        createdAt: '1 hour ago',
        diffPreview: {
          file: 'supabase/migrations/20260825_audit_idx.sql',
          before: '-- No index on audit_logs(user_id, created_at)',
          after: 'CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_audit_logs_user_ts ON audit_logs (user_id, created_at DESC);'
        }
      }
    ],
    audits: [
      {
        id: 'aud1',
        name: 'Product Management System Audit',
        type: 'Architecture',
        startedAt: '2026-08-25 10:30',
        completedAt: '2026-08-25 10:42',
        findingsCount: 3,
        severity: 'P1',
        status: 'Completed',
        findings: [
          { severity: 'P1', file: 'src/lib/orders.ts', functionName: 'processOrderQueue', line: 4821, evidence: 'Missing transaction isolation level declaration', recommendation: 'Wrap in explicit serializable transaction.' },
          { severity: 'P2', file: 'package.json', functionName: 'dependencies', line: 12, evidence: 'Sentry SDK version mismatch v7 vs v8', recommendation: 'Upgrade @sentry/node to ^8.12.0.' },
          { severity: 'INFO', file: 'vite.config.ts', functionName: 'defineConfig', line: 8, evidence: 'HMR disabled in production container context', recommendation: 'Normal behavior for AI Studio runner.' }
        ]
      },
      {
        id: 'aud2',
        name: 'Database Security & RLS Audit',
        type: 'Security',
        startedAt: '2026-08-24 18:00',
        completedAt: '2026-08-24 18:15',
        findingsCount: 0,
        severity: 'INFO',
        status: 'Reviewed'
      }
    ],
    activities: [
      { id: 'act1', timestamp: '20:42', action: 'AI completed Product Management audit', source: 'AI', status: 'SUCCESS' },
      { id: 'act2', timestamp: '20:38', action: 'GitHub synchronization completed', source: 'GitHub', status: 'SUCCESS' },
      { id: 'act3', timestamp: '20:31', action: 'Vercel preview deployment created v2026.08.25-pre1', source: 'Vercel', status: 'INFO' },
      { id: 'act4', timestamp: '20:24', action: 'Supabase schema inspected (42 tables verified)', source: 'Supabase', status: 'SUCCESS' },
      { id: 'act5', timestamp: '20:17', action: 'Human approval requested for concurrency patch', source: 'User', status: 'WARNING' }
    ],
    architectureNodes: [
      { id: 'n1', label: 'USER CLIENT', type: 'USER', status: 'HEALTHY', details: 'Web & Mobile Clients connected over SSL/TLS 1.3' },
      { id: 'n2', label: 'APPLICATION', type: 'APP', status: 'HEALTHY', details: 'React 19 SPA served via Cloud Run Container Edge' },
      { id: 'n3', label: 'API GATEWAY', type: 'API', status: 'HEALTHY', details: 'Express REST Router with JWT Verification' },
      { id: 'n4', label: 'SUPABASE DB', type: 'DATABASE', status: 'HEALTHY', details: 'PostgreSQL 15 with RLS & Connection Pooling' },
      { id: 'n5', label: 'EXTERNAL SERVICES', type: 'SERVICES', status: 'HEALTHY', details: 'GitHub, Vercel, Cloudflare, Sentry' }
    ]
  },
  {
    id: '2',
    name: 'Client Commerce',
    description: 'High-volume e-commerce storefront with real-time inventory management',
    type: 'E-Commerce',
    environment: 'PREVIEW',
    status: 'WARNING',
    lastActivity: '1 hour ago',
    lastDeployment: '2 hours ago',
    openTasksCount: 5,
    pendingApprovalsCount: 1,
    openAuditsCount: 2,
    connectors: [
      { id: 'c6', name: 'GitHub', type: 'GITHUB', connected: true, status: 'ACTIVE', lastSync: '1 hour ago', mapping: 'client-commerce/storefront', permissions: ['READ', 'WRITE'] },
      { id: 'c7', name: 'Vercel', type: 'VERCEL', connected: true, status: 'ACTIVE', lastSync: '2 hours ago', mapping: 'client-commerce-preview', permissions: ['DEPLOY'] },
      { id: 'c8', name: 'Supabase', type: 'SUPABASE', connected: false, status: 'INACTIVE', lastSync: 'Never', mapping: 'Not connected', permissions: [] }
    ],
    aiContext: {
      purpose: 'Client e-commerce engine with Stripe integration and dynamic catalog filtering',
      techStack: ['Next.js 14', 'Tailwind CSS', 'Stripe API', 'Shopify Storefront API'],
      architectureNotes: 'SSR edge-cached catalog with client-side checkout modal',
      rules: [
        'MUST NOT STORE RAW CREDIT CARD DATA',
        'STRIPE WEBHOOK SIGNATURE MANDATORY',
        'CATALOG CACHE TTL 60 SECONDS'
      ],
      importantFiles: ['/src/app/page.tsx', '/src/lib/stripe.ts', '/middleware.ts']
    },
    tasks: [
      { id: 't5', title: 'Fix checkout webhook signature validation', status: 'RUNNING', createdAt: '40 min ago', priority: 'P0' },
      { id: 't6', title: 'Optimize product catalog bundle size', status: 'QUEUED', createdAt: '2 hours ago', priority: 'P2' }
    ],
    approvals: [
      {
        id: 'app3',
        title: 'Stripe Webhook Handler Edge Middleware Update',
        type: 'CODE_PATCH',
        requestedBy: 'Agent FAYE',
        affectedSystem: 'src/app/api/webhooks/stripe/route.ts',
        risk: 'HIGH',
        reason: 'Fixes signature verification failure on Stripe live events.',
        createdAt: '45 min ago',
        diffPreview: {
          file: 'src/app/api/webhooks/stripe/route.ts',
          before: 'const sig = req.headers.get("stripe-signature");',
          after: 'const sig = headers().get("stripe-signature");\nif (!sig) return new Response("Missing signature", { status: 400 });'
        }
      }
    ],
    audits: [
      {
        id: 'aud3',
        name: 'Stripe API Security Audit',
        type: 'Security',
        startedAt: '2026-08-25 09:10',
        completedAt: '2026-08-25 09:20',
        findingsCount: 1,
        severity: 'P1',
        status: 'Completed',
        findings: [
          { severity: 'P1', file: 'src/lib/stripe.ts', functionName: 'getStripeSession', line: 42, evidence: 'Hardcoded test key fallback detected', recommendation: 'Remove string literal fallback.' }
        ]
      }
    ],
    activities: [
      { id: 'act6', timestamp: '09:20', action: 'Stripe API Security Audit completed with 1 finding', source: 'AI', status: 'WARNING' },
      { id: 'act7', timestamp: '08:50', action: 'GitHub sync completed', source: 'GitHub', status: 'SUCCESS' }
    ],
    architectureNodes: [
      { id: 'n6', label: 'STOREFRONT CLIENT', type: 'USER', status: 'HEALTHY', details: 'Mobile-first PWA' },
      { id: 'n7', label: 'VERCEL EDGE', type: 'VERCEL', status: 'HEALTHY', details: 'Next.js App Router' },
      { id: 'n8', label: 'STRIPE API', type: 'SERVICES', status: 'WARNING', details: 'Webhook signature verification requires update' }
    ]
  },
  {
    id: '3',
    name: 'Marketing Platform',
    description: 'Growth analytics, landing page builder, and customer engagement portal',
    type: 'Web Application',
    environment: 'PRODUCTION',
    status: 'OPERATIONAL',
    lastActivity: '3 hours ago',
    lastDeployment: '1 day ago',
    openTasksCount: 1,
    pendingApprovalsCount: 0,
    openAuditsCount: 0,
    connectors: [
      { id: 'c9', name: 'GitHub', type: 'GITHUB', connected: true, status: 'ACTIVE', lastSync: '3 hours ago', mapping: 'org/marketing-web', permissions: ['READ', 'WRITE'] },
      { id: 'c10', name: 'Vercel', type: 'VERCEL', connected: true, status: 'ACTIVE', lastSync: '1 day ago', mapping: 'mktg-production', permissions: ['DEPLOY'] },
      { id: 'c11', name: 'Cloudflare', type: 'CLOUDFLARE', connected: true, status: 'ACTIVE', lastSync: '3 hours ago', mapping: 'zone_mktg_com', permissions: ['DNS', 'CACHE_PURGE'] }
    ],
    aiContext: {
      purpose: 'Marketing landing pages and newsletter subscription service',
      techStack: ['Astro', 'Tailwind CSS', 'Cloudflare Workers'],
      architectureNotes: 'Static site generation with Cloudflare Workers for form submissions',
      rules: ['MAXIMUM LIGHTHOUSE SCORE > 95', 'IMAGE WEBP OPTIMIZATION MANDATORY'],
      importantFiles: ['/astro.config.mjs', '/src/pages/index.astro']
    },
    tasks: [
      { id: 't7', title: 'Purge Cloudflare CDN edge cache after blog update', status: 'COMPLETED', createdAt: '3 hours ago', priority: 'P3' }
    ],
    approvals: [],
    audits: [],
    activities: [
      { id: 'act8', timestamp: 'Yesterday', action: 'Production deployment succeeded v1.8.4', source: 'Vercel', status: 'SUCCESS' }
    ],
    architectureNodes: [
      { id: 'n9', label: 'CLOUDFLARE CDN', type: 'SERVICES', status: 'HEALTHY', details: 'Global edge DNS & SSL' },
      { id: 'n10', label: 'ASTRO STATIC', type: 'APP', status: 'HEALTHY', details: 'SSG Build Output' }
    ]
  },
  {
    id: '4',
    name: 'Internal Analytics',
    description: 'Corporate executive dashboard and data pipeline aggregator',
    type: 'Internal Tool',
    environment: 'LOCAL',
    status: 'SETUP REQUIRED',
    lastActivity: '1 day ago',
    lastDeployment: 'Never',
    openTasksCount: 2,
    pendingApprovalsCount: 0,
    openAuditsCount: 0,
    connectors: [
      { id: 'c12', name: 'GitHub', type: 'GITHUB', connected: true, status: 'ACTIVE', lastSync: '1 day ago', mapping: 'org/analytics-dashboard', permissions: ['READ'] },
      { id: 'c13', name: 'Supabase', type: 'SUPABASE', connected: false, status: 'INACTIVE', lastSync: 'Never', mapping: 'Pending setup', permissions: [] }
    ],
    aiContext: {
      purpose: 'Executive reporting metrics aggregator',
      techStack: ['React', 'D3.js', 'DuckDB WASM'],
      architectureNotes: 'In-browser columnar database calculations',
      rules: ['SENSITIVE FINANCIAL DATA MUST REMAIN LOCAL'],
      importantFiles: ['/src/data/aggregator.ts']
    },
    tasks: [
      { id: 't8', title: 'Connect Supabase data warehouse connector', status: 'WAITING', createdAt: '1 day ago', priority: 'P1' }
    ],
    approvals: [],
    audits: [],
    activities: [
      { id: 'act9', timestamp: '1 day ago', action: 'Repository initialized on GitHub', source: 'GitHub', status: 'INFO' }
    ],
    architectureNodes: [
      { id: 'n11', label: 'LOCAL DEV CONTAINER', type: 'APP', status: 'WARNING', details: 'Awaiting database connection setup' }
    ]
  },
  {
    id: '5',
    name: 'Experimental Microservices',
    description: 'R&D sandbox for custom MCP servers and agent tool plugins',
    type: 'API',
    environment: 'PREVIEW',
    status: 'OPERATIONAL',
    lastActivity: '4 hours ago',
    lastDeployment: '5 hours ago',
    openTasksCount: 0,
    pendingApprovalsCount: 0,
    openAuditsCount: 0,
    connectors: [
      { id: 'c14', name: 'GitHub', type: 'GITHUB', connected: true, status: 'ACTIVE', lastSync: '4 hours ago', mapping: 'org/mcp-plugins', permissions: ['READ', 'WRITE'] }
    ],
    aiContext: {
      purpose: 'Model Context Protocol server implementations for AI Studio agents',
      techStack: ['Node.js', 'TypeScript', 'Docker'],
      architectureNotes: 'JSON-RPC over SSE transport protocol',
      rules: ['ALL TOOLS MUST STRICTLY VALIDATE JSON SCHEMAS'],
      importantFiles: ['/src/server.ts']
    },
    tasks: [],
    approvals: [],
    audits: [],
    activities: [
      { id: 'act10', timestamp: '4 hours ago', action: 'MCP tools validated against schema v2', source: 'AI', status: 'SUCCESS' }
    ],
    architectureNodes: [
      { id: 'n12', label: 'MCP SERVER EDGE', type: 'API', status: 'HEALTHY', details: 'JSON-RPC Transport Active' }
    ]
  }
];
