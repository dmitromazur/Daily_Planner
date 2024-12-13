import { Task } from '../types/task';

const STORAGE_KEY = 'daily-planner-tasks';

export const storage = {
  getTasks: (): Task[] => {
    try {
      const tasks = localStorage.getItem(STORAGE_KEY);
      return tasks ? JSON.parse(tasks) : [];
    } catch (error) {
      console.error('Error loading tasks:', error);
      return [];
    }
  },

  saveTasks: (tasks: Task[]): void => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
    } catch (error) {
      console.error('Error saving tasks:', error);
    }
  },
};