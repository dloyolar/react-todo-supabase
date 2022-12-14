import React from 'react';
import { useState } from 'react';
import { useContext } from 'react';
import { createContext } from 'react';
import { supabase } from '../supabase/client';

export const TaskContext = createContext();

export const useTasks = () => {
  const context = useContext(TaskContext);
  return context;
};

export const TaskContextProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);
  const [adding, setAdding] = useState(false);
  const [loading, setLoading] = useState(false);

  const getTasks = async (done = false) => {
    setLoading(true);
    const {
      data: { user },
    } = await supabase.auth.getUser();

    const { error, data } = await supabase
      .from('tasks')
      .select()
      .eq('userId', user.id)
      .eq('done', done)
      .order('id', { ascending: true });

    if (error) throw error;
    setTasks(data);
    setLoading(false);
  };

  const createTask = async (taskName) => {
    setAdding(true);
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      const { error, data } = await supabase
        .from('tasks')
        .insert({ name: taskName, userId: user.id })
        .select();

      if (error) throw error;

      setTasks([...tasks, ...data]);
    } catch (error) {
      console.error(error);
    } finally {
      setAdding(false);
    }
  };

  const deleteTask = async (taskId) => {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    const { error, data } = await supabase
      .from('tasks')
      .delete()
      .eq('userId', user.id)
      .eq('id', taskId)
      .select();

    if (error) throw error;

    const newTasks = tasks.filter((task) => task.id !== taskId);

    setTasks(newTasks);

    console.log(data);
  };

  const updateTask = async (id, updateFields) => {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    const { error, data } = await supabase
      .from('tasks')
      .update(updateFields)
      .eq('userId', user.id)
      .eq('id', id)
      .select();

    if (error) throw error;

    const updatedTasks = tasks.filter((task) => task.id !== id);

    setTasks(updatedTasks);
  };

  return (
    <TaskContext.Provider
      value={{ tasks, getTasks, createTask, adding, loading, deleteTask, updateTask }}
    >
      {children}
    </TaskContext.Provider>
  );
};
