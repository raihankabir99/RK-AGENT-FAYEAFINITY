import { useState, useEffect } from 'react';
import { Shell } from './components/layout/Shell';
import { Sidebar } from './components/layout/Sidebar';
import { CommandBar } from './components/layout/CommandBar';
import { Home } from './components/workspace/Home';
import { ProjectsCenter } from './components/projects/ProjectsCenter';
import { NewProjectModal } from './components/projects/NewProjectModal';
import { ProjectWorkspace } from './components/project-workspace/ProjectWorkspace';
import { GlobalSearchModal } from './components/common/GlobalSearchModal';
import { mockProjects } from './data';
import { Project, EnvironmentType } from './types';

export function App() {
  const [projects, setProjects] = useState<Project[]>(mockProjects);
  const [activeView, setActiveView] = useState<string>('home');
  const [selectedProjectId, setSelectedProjectId] = useState<string>('1');
  const [selectedEnv, setSelectedEnv] = useState<EnvironmentType>('PRODUCTION');
  const [projectWorkspaceTab, setProjectWorkspaceTab] = useState<string>('overview');

  // Modals state
  const [isNewProjectOpen, setIsNewProjectOpen] = useState<boolean>(false);
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);

  // Global Keyboard Shortcuts (e.g. Cmd+K for Search)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchOpen(true);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const selectedProject = projects.find((p) => p.id === selectedProjectId) || projects[0];

  const handleSelectProject = (projectId: string) => {
    setSelectedProjectId(projectId);
    setActiveView('project-workspace');
    setProjectWorkspaceTab('overview');
  };

  const handleCreateProject = (newProject: Project) => {
    setProjects([newProject, ...projects]);
    setSelectedProjectId(newProject.id);
    setActiveView('project-workspace');
    setProjectWorkspaceTab('overview');
  };

  const handleDeleteProject = (projectId: string) => {
    const updated = projects.filter((p) => p.id !== projectId);
    setProjects(updated);
    if (updated.length > 0) {
      setSelectedProjectId(updated[0].id);
      setActiveView('projects');
    } else {
      setActiveView('home');
    }
  };

  const handleSelectSidebarView = (viewId: string) => {
    if (viewId === 'home') {
      setActiveView('home');
    } else if (viewId === 'projects') {
      setActiveView('projects');
    } else if (viewId === 'ai-agent') {
      setActiveView('project-workspace');
      setProjectWorkspaceTab('ai-agent');
    } else if (['tasks', 'repositories', 'database', 'deployments', 'audits', 'security', 'settings'].includes(viewId)) {
      setActiveView('project-workspace');
      const tabMap: Record<string, string> = {
        tasks: 'tasks',
        repositories: 'repository',
        database: 'database',
        deployments: 'deployments',
        audits: 'audits',
        security: 'audits',
        settings: 'settings'
      };
      setProjectWorkspaceTab(tabMap[viewId] || 'overview');
    }
  };

  return (
    <Shell
      sidebar={
        <Sidebar
          activeView={activeView}
          onSelectView={handleSelectSidebarView}
        />
      }
      commandBar={
        <CommandBar
          projects={projects}
          selectedProjectId={selectedProjectId}
          onSelectProject={handleSelectProject}
          selectedEnv={selectedEnv}
          onChangeEnv={setSelectedEnv}
          onGoHome={() => setActiveView('home')}
          onOpenNewProject={() => setIsNewProjectOpen(true)}
          onOpenSearch={() => setIsSearchOpen(true)}
        />
      }
    >
      {/* View Switcher */}
      {activeView === 'home' && (
        <Home
          projects={projects}
          onOpenProject={handleSelectProject}
          onOpenNewProject={() => setIsNewProjectOpen(true)}
        />
      )}

      {activeView === 'projects' && (
        <ProjectsCenter
          projects={projects}
          onOpenProject={handleSelectProject}
          onOpenNewProject={() => setIsNewProjectOpen(true)}
        />
      )}

      {activeView === 'project-workspace' && selectedProject && (
        <ProjectWorkspace
          project={selectedProject}
          onDeleteProject={handleDeleteProject}
          activeTab={projectWorkspaceTab}
          onTabChange={setProjectWorkspaceTab}
        />
      )}

      {/* Global Modals */}
      <NewProjectModal
        isOpen={isNewProjectOpen}
        onClose={() => setIsNewProjectOpen(false)}
        onCreateProject={handleCreateProject}
      />

      <GlobalSearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        projects={projects}
        onSelectProject={handleSelectProject}
      />
    </Shell>
  );
}

export default App;
