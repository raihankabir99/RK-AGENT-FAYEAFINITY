import { useState } from 'react';
import { Settings, ShieldAlert, Trash2, Archive, Save } from 'lucide-react';
import { Project } from '../../../types';

interface SettingsTabProps {
  project: Project;
  onDeleteProject?: (projectId: string) => void;
}

export const SettingsTab = ({ project, onDeleteProject }: SettingsTabProps) => {
  const [name, setName] = useState(project.name);
  const [description, setDescription] = useState(project.description);
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);

  return (
    <div className="space-y-8 animate-fadeIn max-w-3xl">
      <div className="border-b border-white/5 pb-4">
        <h3 className="text-xs font-mono font-bold text-[#D4AF37] uppercase tracking-wider">PROJECT SETTINGS</h3>
        <p className="text-neutral-500 text-xs mt-0.5">Manage project attributes, AI constraints, and workspace lifecycle.</p>
      </div>

      <div className="bg-[#121212] border border-white/5 rounded-xl p-6 space-y-4">
        <h4 className="text-xs font-mono font-bold text-white uppercase">GENERAL CONFIGURATION</h4>

        <div>
          <label className="block text-[10px] font-mono text-neutral-400 uppercase mb-1">Project Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full bg-[#0A0A0A] border border-white/10 rounded p-2.5 text-xs text-white font-sans focus:outline-none focus:ring-1 focus:ring-[#D4AF37]"
          />
        </div>

        <div>
          <label className="block text-[10px] font-mono text-neutral-400 uppercase mb-1">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={2}
            className="w-full bg-[#0A0A0A] border border-white/10 rounded p-2.5 text-xs text-white font-sans focus:outline-none focus:ring-1 focus:ring-[#D4AF37]"
          />
        </div>

        <button className="px-4 py-2 bg-[#D4AF37] hover:bg-amber-400 text-black font-mono font-bold text-xs uppercase tracking-wider rounded transition-all cursor-pointer flex items-center gap-2">
          <Save className="w-3.5 h-3.5" />
          <span>SAVE CHANGES</span>
        </button>
      </div>

      {/* Danger Zone */}
      <div className="bg-[#121212] border border-rose-500/20 rounded-xl p-6 space-y-4">
        <div className="flex items-center gap-2 text-rose-400 font-mono text-xs font-bold uppercase">
          <ShieldAlert className="w-4 h-4" />
          <span>DANGER ZONE</span>
        </div>

        <p className="text-xs text-neutral-400">
          Irreversible project lifecycle actions. Deleting a project will purge all local telemetry, task queues, and audit histories.
        </p>

        <div className="pt-2 flex items-center gap-3">
          <button
            onClick={() => setShowConfirmDelete(true)}
            className="px-4 py-2 bg-rose-500/10 hover:bg-rose-500 text-rose-400 hover:text-white border border-rose-500/30 rounded font-mono font-bold text-xs uppercase transition-all cursor-pointer flex items-center gap-2"
          >
            <Trash2 className="w-3 h-3" />
            <span>DELETE PROJECT</span>
          </button>
        </div>
      </div>

      {/* Confirm Delete Modal */}
      {showConfirmDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
          <div className="bg-[#0A0A0A] border border-rose-500/30 rounded-xl p-6 max-w-md w-full space-y-4">
            <h4 className="text-sm font-bold text-rose-400 uppercase font-mono">CONFIRM PROJECT DELETION</h4>
            <p className="text-xs text-neutral-300">
              Are you sure you want to delete <strong className="text-white">{project.name}</strong>? This action cannot be undone.
            </p>

            <div className="flex gap-3 pt-2">
              <button
                onClick={() => setShowConfirmDelete(false)}
                className="flex-1 py-2 bg-white/5 hover:bg-white/10 text-neutral-300 rounded font-mono font-bold text-xs uppercase"
              >
                CANCEL
              </button>
              <button
                onClick={() => {
                  if (onDeleteProject) onDeleteProject(project.id);
                  setShowConfirmDelete(false);
                }}
                className="flex-1 py-2 bg-rose-500 hover:bg-rose-600 text-white rounded font-mono font-bold text-xs uppercase"
              >
                CONFIRM DELETE
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
