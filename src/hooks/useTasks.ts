import { useState, useEffect, useCallback } from 'react';
import { Task } from '../types/task';
import { storage } from '../services/storage';

export function useTasks() {
  const [tasks, setTasks] = useState<Task[]>(() => storage.getTasks());

  useEffect(() => {
    storage.saveTasks(tasks);
  }, [tasks]);

  const addTask = useCallback((newTask: Omit<Task, 'id' | 'completed'>) => {
    setTasks((prev) => [
      ...prev,
      {
        ...newTask,
        id: crypto.randomUUID(),
        completed: false,
      },
    ]);
  }, []);

  const toggleTask = useCallback((id: string) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  }, []);

  const deleteTask = useCallback((id: string) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  }, []);

  return {
    tasks,
    addTask,
    toggleTask,
    deleteTask,
    completedTasks: tasks.filter((task) => task.completed).length,
    totalTasks: tasks.length,
  };
}