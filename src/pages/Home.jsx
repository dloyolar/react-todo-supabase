import React from 'react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TaskForm } from '../components/TaskForm';
import { TaskList } from '../components/TaskList';
import { supabase } from '../supabase/client';

export const Home = () => {
  const navigate = useNavigate();
  const [showTaskDone, setShowTaskDone] = useState(false);

  useEffect(() => {
    async function getUser() {
      const { data } = await supabase.auth.getUser();

      if (!data?.user) {
        navigate('/login');
      }
    }
    getUser();
  }, [navigate]);

  return (
    <div>
      Home <button onClick={() => supabase.auth.signOut()}>Logout</button>
      <TaskForm />
      <header>
        <span>Task pending</span>
        <button onClick={() => setShowTaskDone(!showTaskDone)}>Show Tasks Done</button>
      </header>
      <TaskList done={showTaskDone} />
    </div>
  );
};
