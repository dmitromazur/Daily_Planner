import React from 'react';
import { TaskForm } from './components/TaskForm';
import { TaskList } from './components/TaskList';
import { Calendar } from 'lucide-react';
import { useTasks } from './hooks/useTasks';

function App() {
  const {
    tasks,
    addTask,
    toggleTask,
    deleteTask,
    completedTasks,
    totalTasks,
  } = useTasks();

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-4xl mx-auto py-8 px-4">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <Calendar size={32} className="text-blue-600" />
            <h1 className="text-3xl font-bold text-gray-900">Daily Planner</h1>
          </div>
          {totalTasks > 0 && (
            <div className="text-sm text-gray-600">
              Completed: {completedTasks} / {totalTasks}
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-[350px,1fr] gap-8">
          <div>
            <TaskForm onAddTask={addTask} />
          </div>
          
          <div className="space-y-6">
            {tasks.length === 0 ? (
              <div className="text-center py-12 bg-white rounded-lg shadow-md">
                <Calendar size={48} className="mx-auto text-gray-400 mb-4" />
                <p className="text-gray-500">На сьогодны планыв немає</p>
                <p className="text-sm text-gray-400">Щоб почати, додайте</p>
              </div>
            ) : (
              <TaskList
                tasks={tasks}
                onToggleTask={toggleTask}
                onDeleteTask={deleteTask}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;