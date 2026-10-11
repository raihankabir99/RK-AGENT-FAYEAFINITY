import { useState } from 'react';
import { CheckSquare, Plus, Clock, AlertTriangle, CheckCircle2 } from 'lucide-react';
import { Project, Task } from '../../../types';

interface TasksTabProps {
  project: Project;
}

export const TasksTab = ({ project }: TasksTabProps) => {
  const [tasks, setTasks] = useState<Task[]>(project.tasks);
  const [newTaskTitle, setNewTaskTitle] = useState('');

  const handleAddTask = () => {
    if (!newTaskTitle.trim()) return;
    const task: Task = {
      id: 't_' + Date.now(),
      title: newTaskTitle,
      status: 'QUEUED',
      createdAt: 'Just now',
      priority: 'P2'
    };
    setTasks([task, ...tasks]);
    setNewTaskTitle('');
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="flex items-center justify-between border-b border-white/5 pb-4">
        <div>
          <h3 className="text-xs font-mono font-bold text-[#D4AF37] uppercase tracking-wider">PROJECT TASKS</h3>
          <p className="text-neutral-500 text-xs">Automated engineering sub-tasks assigned to AI runners and developers.</p>
        </div>
      </div>

      {/* Add Task Control */}
      <div className="flex gap-3 bg-[#121212] p-2 rounded-lg border border-white/5">
        <input
          type="text"
          value={newTaskTitle}
          onChange={(e) => setNewTaskTitle(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleAddTask()}
          placeholder="Queue new engineering task (e.g. Audit API contracts)..."
          className="flex-1 bg-[#0A0A0A] border border-white/10 rounded px-3 py-2 text-xs text-white placeholder-neutral-600 focus:outline-none focus:ring-1 focus:ring-[#D4AF37]"
        />
        <button
          onClick={handleAddTask}
          className="px-4 py-2 bg-[#D4AF37] text-black text-xs font-bold uppercase rounded flex items-center gap-1.5 cursor-pointer"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Queue Task</span>
        </button>
      </div>

      {/* Task List */}
      <div className="bg-[#121212] border border-white/5 rounded-xl divide-y divide-white/5 font-mono text-xs">
        {tasks.length === 0 ? (
          <div className="p-8 text-center text-neutral-500">
            NO ACTIVE TASKS
          </div>
        ) : (
          tasks.map((task) => (
            <div key={task.id} className="p-4 flex items-center justify-between hover:bg-white/[0.02] transition-colors">
              <div className="flex items-center gap-3">
                <CheckSquare className="w-4 h-4 text-neutral-500" />
                <div>
                  <div className="text-white font-medium">{task.title}</div>
                  <div className="text-[10px] text-neutral-500">Created: {task.createdAt}</div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <span className="px-2 py-0.5 rounded bg-white/5 text-[10px] text-neutral-400 border border-white/10">
                  {task.priority || 'P2'}
                </span>

                <span className={`px-2.5 py-1 rounded text-[10px] font-bold uppercase ${
                  task.status === 'RUNNING' ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20' :
                  task.status === 'APPROVAL REQUIRED' ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20' :
                  task.status === 'COMPLETED' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' :
                  'bg-neutral-800 text-neutral-400'
                }`}>
                  {task.status}
                </span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
