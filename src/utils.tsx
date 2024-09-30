import AsyncStorage from '@react-native-async-storage/async-storage';
import {Task} from './types';

export const fetchQuote = async (): Promise<string> => {
  try {
    const response = await fetch('https://zenquotes.io/api/random');
    const data = await response.json();
    if (data && data[0] && data[0].q) {
      return data[0].q;
    }
    return 'Stay inspired!';
  } catch (error) {
    console.error('Failed to fetch quote', error);
    return 'Stay inspired!';
  }
};

export const saveTasks = async (tasks: Task[]): Promise<void> => {
  try {
    await AsyncStorage.setItem('tasks', JSON.stringify(tasks));
  } catch (e) {
    console.error('Failed to save tasks.', e);
  }
};

export const loadTasks = async (): Promise<Task[]> => {
  try {
    const tasks = await AsyncStorage.getItem('tasks');
    return tasks ? JSON.parse(tasks) : [];
  } catch (e) {
    console.error('Failed to load tasks.', e);
    return [];
  }
};
