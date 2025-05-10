import { 
  getRedisClient,
  getTasksFromRedis, 
  saveTasksToRedis,
  clearTasksFromRedis
} from './redisService';
import { 
  saveTasksToMongoDB, 
  getTasksFromMongoDB 
} from './mongoService';

const MAX_REDIS_TASKS = 50;

export const addTask = async (task: string, firstName: string): Promise<string> => {
  try {
    const currentRedisTasks = await getTasksFromRedis(firstName);
    
    const updatedRedisTasks = [task, ...currentRedisTasks];
    
    if (updatedRedisTasks.length > MAX_REDIS_TASKS) {
      const tasksToMove = updatedRedisTasks.slice(MAX_REDIS_TASKS);
      
      await saveTasksToMongoDB(tasksToMove, firstName);
      
      const finalRedisTasks = updatedRedisTasks.slice(0, MAX_REDIS_TASKS);
      
      await saveTasksToRedis(finalRedisTasks, firstName);
    } else {
      await saveTasksToRedis(updatedRedisTasks, firstName);
    }
    
    return task;
  } catch (error) {
    console.error('Error adding task:', error);
    throw error;
  }
};

export const fetchAllTasks = async (firstName: string): Promise<string[]> => {
  try {
    const redisTasks = await getTasksFromRedis(firstName);
    
    const mongoTasks = await getTasksFromMongoDB(firstName);
    
    return [...redisTasks, ...mongoTasks];
  } catch (error) {
    console.error('Error fetching tasks:', error);
    throw error;
  }
};