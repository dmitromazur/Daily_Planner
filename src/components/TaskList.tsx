import React from 'react';
import { Check, Trash2, Clock } from 'lucide-react';
import { Task } from '../types/task';

interface TaskListProps {
  tasks: Task[];
  onToggleTask: (id: string) => void;
  onDeleteTask: (id: string) => void;
}

export function TaskList({ tasks, onToggleTask, onDeleteTask }: TaskListProps) {
  const sortedTasks = [...tasks].sort((a, b) => a.timeSlot.localeCompare(b.timeSlot));

  const getPriorityColor = (priority: Task['priority']) => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-800';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'low':
        return 'bg-green-100 text-green-800';
    }
  };

  return (
    <div className="space-y-4">
      {sortedTasks.map((task) => (
        <div
          key={task.id}
          className={`bg-white p-4 rounded-lg shadow-md transition-all ${
            task.completed ? 'opacity-75' : ''
          }`}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => onToggleTask(task.id)}
                className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${
                  task.completed
                    ? 'bg-green-500 border-green-500'
                    : 'border-gray-300 hover:border-green-500'
                }`}
              >
                {task.completed && <Check size={16} className="text-white" />}
              </button>
              <div>
                <h3
                  className={`font-medium ${
                    task.completed ? 'line-through text-gray-500' : ''
                  }`}
                >
                  {task.title}
                </h3>
                {task.description && (
                  <p className="text-sm text-gray-600 mt-1">{task.description}</p>
                )}
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <span className={`px-2 py-1 rounded-full text-xs ${getPriorityColor(task.priority)}`}>
                {task.priority}
              </span>
              {task.category && (
                <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded-full text-xs">
                  {task.category}
                </span>
              )}
              <div className="flex items-center text-gray-500">
                <Clock size={16} className="mr-1" />
                <span className="text-sm">{task.timeSlot}</span>
              </div>
              <button
                onClick={() => onDeleteTask(task.id)}
                className="text-red-500 hover:text-red-700 transition-colors"
              >
                <Trash2 size={18} />
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}