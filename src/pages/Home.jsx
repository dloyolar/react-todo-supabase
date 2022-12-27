import React from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { TaskForm } from '../components/TaskForm';
import { TaskList } from '../components/TaskList';
import { supabase } from '../supabase/client';

export const Home = () => {
  const navigate = useNavigate();

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
      <TaskList />
    </div>
  );
};
