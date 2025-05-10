import { Loader } from 'lucide-react';

export interface Task {
  _id?: string;
  text: string;
  timestamp?: string | Date;
  createdAt?: string | Date;
}

interface TaskListProps {
  tasks: Task[]; 
  isLoading: boolean;
}

const TaskList = ({ tasks, isLoading }: TaskListProps) => {
  if (isLoading) {
    return (
      <div className="my-4 flex justify-center">
        <Loader className="animate-spin h-6 w-6 text-amber-700" />
      </div>
    );
  }

  if (tasks.length === 0) {
    return (
      <div className="text-center py-6 text-gray-500">
        No notes yet. Add your first note!
      </div>
    );
  }

  return (
    <div>
      <h2 className="font-medium mb-2 text-gray-700">Notes</h2>
      <div className="space-y-2 max-h-[400px] overflow-y-auto pr-2">
        {tasks.map((task, index) => {
          const key = task._id || `${task.text}-${task.timestamp || task.createdAt || index}`;
          return (
            <div
              key={key}
              className="p-3 border-b border-gray-200 rounded-md hover:bg-gray-50 transition-colors"
            >
              {task.text}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TaskList;