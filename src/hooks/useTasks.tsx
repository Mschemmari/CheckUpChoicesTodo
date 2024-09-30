import {useEffect, useState} from 'react';
import {Task} from '../types';
import {loadTasks, saveTasks, fetchQuote} from '../utils';

export const useTasks = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState<string>('');
  const [quote, setQuote] = useState<string>('');

  const initializeTasks = async () => {
    const storedTasks = await loadTasks();
    setTasks(storedTasks);
  };

  useEffect(() => {
    initializeTasks();
  }, []);

  const addTask = () => {
    if (newTask.trim() === '') {
      return;
    }

    const updatedTasks: Task[] = [
      ...tasks,
      {id: Date.now(), text: newTask, completed: false},
    ];
    setTasks(updatedTasks);
    setNewTask('');
    setQuote('');
    saveTasks(updatedTasks);
  };

  const completeTask = async (taskId: number) => {
    const updatedTasks: Task[] = tasks.map(task =>
      task.id === taskId ? {...task, completed: !task.completed} : task,
    );
    setTasks(updatedTasks);
    saveTasks(updatedTasks);
    setQuote('');
    const task = updatedTasks.find(taskItem => taskItem.id === taskId);
    if (task?.completed) {
      const newQuote = await fetchQuote();
      setQuote(newQuote);
    }
  };

  const deleteTask = (taskId: number) => {
    const updatedTasks: Task[] = tasks.filter(task => task.id !== taskId);
    setTasks(updatedTasks);
    saveTasks(updatedTasks);
    setQuote('');
  };

  return {tasks, newTask, setNewTask, addTask, completeTask, deleteTask, quote};
};
