import { useEffect } from 'react';
import { useTasks } from '../context/TaskContext';
import { TaskCard } from './TaskCard';

export const TaskList = ({ done = false }) => {
  const { tasks, getTasks, loading } = useTasks();

  console.log(tasks);

  useEffect(() => {
    getTasks(done);
  }, [done]);

  const renderTasks = () => {
    if (loading) {
      return <h1>Loading...</h1>;
    } else if (tasks.length === 0) {
      return <h1>No tasks found</h1>;
    } else {
      return (
        <div>
          {tasks.map((task) => (
            <TaskCard key={task.id} task={task} />
          ))}
        </div>
      );
    }
  };

  return <div>{renderTasks()}</div>;
};
