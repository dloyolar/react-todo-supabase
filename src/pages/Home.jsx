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
    <div className="row pt-4">
      <div className="col-md-4 offset-md-4">
        <TaskForm />
        <header className="d-flex justify-content-between my-3">
          <span className="h5">{showTaskDone ? 'Tasks Done' : 'Tasks to do'}</span>
          <button className="btn btn-dark btn-sm" onClick={() => setShowTaskDone(!showTaskDone)}>
            {showTaskDone ? 'Show tasks to do' : 'Show tasks done'}
          </button>
        </header>
        <TaskList done={showTaskDone} />
      </div>
    </div>
  );
};
