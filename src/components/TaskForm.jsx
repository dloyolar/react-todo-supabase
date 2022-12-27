import { useState } from 'react';
import { useTasks } from '../context/TaskContext';

export const TaskForm = () => {
  const [taskName, setTaskName] = useState('');
  const { createTask, adding } = useTasks();

  console.log(adding);
  const handleSubmit = async (e) => {
    e.preventDefault();
    createTask(taskName);
    setTaskName('');
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="taskName"
          placeholder="Write a task name"
          onChange={(e) => setTaskName(e.target.value)}
          value={taskName}
        />
        <button disabled={adding}>{adding ? 'Adding...' : 'Add'}</button>
      </form>
    </div>
  );
};
