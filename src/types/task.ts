export interface Task {
  id: string;
  title: string;
  description?: string;
  timeSlot: string;
  completed: boolean;
  priority: 'low' | 'medium' | 'high';
  category?: string;
}