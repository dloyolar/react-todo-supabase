import { useState } from 'react';
import { supabase } from '../supabase/client';

export const TaskForm = () => {
  const [taskName, setTaskName] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(taskName);

    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      const res = await supabase.from('tasks').insert({ name: taskName, userId: user.id }).select();
      console.log(res);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="taskName"
          placeholder="Write a task name"
          onChange={(e) => setTaskName(e.target.value)}
        />
        <button>Add</button>
      </form>
    </div>
  );
};
