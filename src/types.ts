export type EnvironmentType = 'LOCAL' | 'PREVIEW' | 'PRODUCTION';
export type HealthStatus = 'OPERATIONAL' | 'WARNING' | 'CRITICAL' | 'OFFLINE' | 'SETUP REQUIRED';

export interface Connector {
  id: string;
  name: string;
  type: 'GITHUB' | 'SUPABASE' | 'VERCEL' | 'CLOUDFLARE' | 'SENTRY' | 'SLACK' | 'LINEAR' | 'JIRA' | 'FIGMA';
  connected: boolean;
  status: 'ACTIVE' | 'INACTIVE' | 'WARNING';
  lastSync: string;
  mapping?: string;
  permissions?: string[];
}

export interface Task {
  id: string;
  title: string;
  description?: string;
  status: 'QUEUED' | 'RUNNING' | 'WAITING' | 'COMPLETED' | 'FAILED' | 'APPROVAL REQUIRED';
  createdAt: string;
  priority?: 'P0' | 'P1' | 'P2' | 'P3';
  assignedAgent?: string;
}

export interface ApprovalRequest {
  id: string;
  title: string;
  type: 'CODE_PATCH' | 'DATABASE_MIGRATION' | 'DEPLOYMENT' | 'SECURITY_POLICY' | 'ENV_CHANGE';
  requestedBy: string;
  affectedSystem: string;
  risk: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  reason: string;
  diffPreview?: {
    file: string;
    before: string;
    after: string;
  };
  createdAt: string;
}

export interface AuditRecord {
  id: string;
  name: string;
  type: 'Repository' | 'Database' | 'Security' | 'API' | 'Performance' | 'Architecture';
  startedAt: string;
  completedAt: string;
  findingsCount: number;
  severity: 'P0' | 'P1' | 'P2' | 'INFO';
  status: 'Completed' | 'In Progress' | 'Reviewed' | 'Failed';
  findings?: {
    severity: 'P0' | 'P1' | 'P2' | 'INFO';
    file: string;
    functionName: string;
    line: number;
    evidence: string;
    recommendation: string;
  }[];
}

export interface ActivityItem {
  id: string;
  timestamp: string;
  action: string;
  source: 'AI' | 'GitHub' | 'Supabase' | 'Vercel' | 'User';
  status: 'SUCCESS' | 'WARNING' | 'INFO' | 'FAILED';
}

export interface AIProjectContext {
  purpose: string;
  techStack: string[];
  architectureNotes: string;
  rules: string[];
  importantFiles: string[];
}

export interface ArchitectureNode {
  id: string;
  label: string;
  type: 'USER' | 'APP' | 'API' | 'GITHUB' | 'SUPABASE' | 'VERCEL' | 'DATABASE' | 'SERVICES';
  status: 'HEALTHY' | 'WARNING' | 'CRITICAL';
  details: string;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  type: 'Web Application' | 'E-Commerce' | 'SaaS' | 'Mobile' | 'API' | 'Internal Tool' | 'Other';
  environment: EnvironmentType;
  status: HealthStatus;
  branch?: string;
  connectors: Connector[];
  lastActivity: string;
  lastDeployment: string;
  openTasksCount: number;
  pendingApprovalsCount: number;
  openAuditsCount: number;
  aiContext: AIProjectContext;
  tasks: Task[];
  approvals: ApprovalRequest[];
  audits: AuditRecord[];
  activities: ActivityItem[];
  architectureNodes: ArchitectureNode[];
}

export interface Agent {
  id: string;
  name: string;
  status: 'IDLE' | 'ANALYZING' | 'DEPLOYING' | 'ERROR';
}
