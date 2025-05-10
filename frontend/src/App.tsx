import { useState, useEffect } from 'react';
import Header from './components/Header';
import TaskInput from './components/TaskInput';
import TaskList, { Task } from './components/TaskList';
import { fetchAllTasks } from './services/api';
import { publishTask } from './services/mqtt';

function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadTasks = async () => {
      try {
        setIsLoading(true);
        const fetchedTasks = await fetchAllTasks();
        
       
        const convertedTasks: Task[] = fetchedTasks.map(task => ({
          text: task,
          timestamp: new Date().toISOString()
        }));
        
        setTasks(convertedTasks);
        setError(null);
      } catch (err) {
        setError('Failed to load tasks. Please try again later.');
        console.error('Error fetching tasks:', err);
      } finally {
        setIsLoading(false);
      }
    };

    loadTasks();
  }, []);

  const handleAddTask = async (task: string) => {
    if (!task.trim()) return;
    
    try {
      await publishTask(task);
      
      setTasks(prev => [
        { 
          text: task, 
          timestamp: new Date().toISOString() 
        },
        ...prev
      ]);
    } catch (err) {
      setError('Failed to add task. Please try again.');
      console.error('Error publishing task:', err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-start py-8 px-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md overflow-hidden">
        <Header />
        <div className="p-4">
          <TaskInput onAddTask={handleAddTask} />
          
          {error && (
            <div className="mt-4 p-2 bg-red-50 text-red-700 rounded-md text-sm">
              {error}
            </div>
          )}
          
          <TaskList tasks={tasks} isLoading={isLoading} />
        </div>
      </div>
    </div>
  );
}

export default App;