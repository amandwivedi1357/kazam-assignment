import { useState } from 'react';

interface TaskInputProps {
  onAddTask: (task: string) => void;
}

const TaskInput = ({ onAddTask }: TaskInputProps) => {
  const [inputValue, setInputValue] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim()) {
      onAddTask(inputValue);
      setInputValue('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex space-x-2 mb-6">
      <input
        type="text"
        placeholder="New Note..."
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        className="flex-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-amber-500 focus:border-amber-500"
      />
     
     
     <button
  type="submit"
  className="bg-amber-800 hover:bg-amber-900 text-white px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 font-bold transition-colors flex items-center gap-2"
>
  <img src="/add-icon.svg" alt="Add Icon" className="w-4 h-4" />
  Add
</button>

       
    </form>
  );
};

export default TaskInput;