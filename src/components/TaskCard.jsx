import React from 'react';
import { useTasks } from '../context/TaskContext';

export const TaskCard = ({ task }) => {
  const { deleteTask, updateTask } = useTasks();

  const handleDelete = () => {
    deleteTask(task.id);
  };

  const handleToggleDone = () => {
    updateTask(task.id, { done: !task.done });
  };

  return (
    <div>
      <h1>{task.name}</h1>
      <p>{JSON.stringify(task.done)}</p>
      <div>
        <button onClick={() => handleDelete()}>Delete</button>
        <button onClick={() => handleToggleDone()}>Done</button>
      </div>
    </div>
  );
};
