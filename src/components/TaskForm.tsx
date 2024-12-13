import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { Task } from '../types/task';

interface TaskFormProps {
  onAddTask: (task: Omit<Task, 'id' | 'completed'>) => void;
}

export function TaskForm({ onAddTask }: TaskFormProps) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [timeSlot, setTimeSlot] = useState('09:00');
  const [priority, setPriority] = useState<Task['priority']>('medium');
  const [category, setCategory] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    onAddTask({
      title,
      description,
      timeSlot,
      priority,
      category: category || undefined,
    });

    setTitle('');
    setDescription('');
    setTimeSlot('09:00');
    setPriority('medium');
    setCategory('');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded-lg shadow-md">
      <div>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Названия задачи"
          className="w-full px-4 py-2 rounded border border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
        />
      </div>
      
      <div className="flex gap-4">
        <input
          type="time"
          value={timeSlot}
          onChange={(e) => setTimeSlot(e.target.value)}
          className="px-4 py-2 rounded border border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
        />
        
        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value as Task['priority'])}
          className="px-4 py-2 rounded border border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"

        >
          <option value="low">Низький пріоритет</option>
          <option value="medium">Середній пріоритет</option>
          <option value="high">Високий пріоритет</option>
        </select>
      </div>

      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Опис (необов'язково)"
        className="w-full px-4 py-2 rounded border border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
      />

      <input
        type="text"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        placeholder="Категорія (необов'язково)"
        className="w-full px-4 py-2 rounded border border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
      />

      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
      >
        <Plus size={20} />
        Добавить задачу
      </button>
    </form>
  );
}