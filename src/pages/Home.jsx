import React from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { TaskForm } from '../components/TaskForm';
import { supabase } from '../supabase/client';

export const Home = () => {
  const navigate = useNavigate();
  useEffect(() => {
    async function getUser() {
      const { data } = await supabase.auth.getUser();
      console.log(Boolean(data));
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
    </div>
  );
};
