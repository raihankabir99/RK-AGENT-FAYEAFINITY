import { useState } from 'react';
import { Search, X, Folder, FileCode, CheckSquare, ShieldAlert } from 'lucide-react';
import { Project } from '../../types';

interface GlobalSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  projects: Project[];
  onSelectProject: (projectId: string) => void;
}

export const GlobalSearchModal = ({ isOpen, onClose, projects, onSelectProject }: GlobalSearchModalProps) => {
  const [query, setQuery] = useState('');

  if (!isOpen) return null;

  const filteredProjects = projects.filter(
    (p) => p.name.toLowerCase().includes(query.toLowerCase()) || p.description.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div className="bg-[#0A0A0A] border border-white/10 rounded-2xl max-w-xl w-full overflow-hidden shadow-2xl">
        <div className="p-4 border-b border-white/10 flex items-center gap-3 bg-[#121212]">
          <Search className="w-4 h-4 text-neutral-500" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search projects, system tasks, code files..."
            className="flex-1 bg-transparent text-sm text-white placeholder-neutral-600 focus:outline-none"
          />
          <button onClick={onClose} className="text-neutral-500 hover:text-white">
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-4 max-h-96 overflow-y-auto space-y-2 text-xs font-mono">
          <span className="text-[10px] text-neutral-500 uppercase tracking-widest block font-bold mb-2">
            PROJECTS ({filteredProjects.length})
          </span>

          {filteredProjects.map((p) => (
            <div
              key={p.id}
              onClick={() => {
                onSelectProject(p.id);
                onClose();
              }}
              className="p-3 bg-[#121212] hover:bg-white/5 border border-white/5 hover:border-[#D4AF37]/30 rounded-lg cursor-pointer transition-colors flex items-center justify-between"
            >
              <div className="flex items-center gap-3">
                <Folder className="w-4 h-4 text-[#D4AF37]" />
                <div>
                  <div className="text-white font-bold">{p.name}</div>
                  <div className="text-[10px] text-neutral-500 font-sans">{p.description}</div>
                </div>
              </div>

              <span className="text-[10px] text-neutral-400 bg-white/5 px-2 py-0.5 rounded border border-white/10">
                {p.environment}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
