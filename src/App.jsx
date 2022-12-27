import './App.css';
import { Login } from './pages/Login';
import { Routes, Route } from 'react-router-dom';
import { Home } from './pages/Home';
import { NotFound } from './pages/NotFound';
import { useEffect } from 'react';
import { supabase } from './supabase/client';
import { useNavigate } from 'react-router-dom';
import { TaskContextProvider } from './context/TaskContext';

function App() {
  const navigate = useNavigate();

  useEffect(() => {
    supabase.auth.onAuthStateChange((event, session) => {
      if (!session?.user) {
        navigate('/login');
      } else {
        navigate('/');
      }
    });
  }, []);

  return (
    <div className="App">
      <TaskContextProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </TaskContextProvider>
    </div>
  );
}

export default App;
