import Redis from 'ioredis';
import dotenv from 'dotenv';
dotenv.config();

let redisClient: Redis | null = null;

export const connectRedis = async (): Promise<Redis> => {
  try {
    if (!redisClient) {
      redisClient = new Redis({
        host: process.env.REDIS_HOST!,
        port: Number(process.env.REDIS_PORT!),
        username: process.env.REDIS_USERNAME!,
        password: process.env.REDIS_PASSWORD!,
      });

      redisClient.on('connect', () => {
        console.log('✅ Connected to Redis');
      });

      redisClient.on('error', (err) => {
        console.error('❌ Redis connection error:', err);
      });
    }

    return redisClient;
  } catch (error) {
    console.error('❌ Failed to connect to Redis:', error);
    throw error;
  }
};

export const getRedisClient = async (): Promise<Redis> => {
  if (!redisClient) {
    return connectRedis();
  }
  return redisClient;
};

export const getTasksFromRedis = async (userName: string): Promise<string[]> => {
  try {
    const redis = await getRedisClient();
    const userKey = `tasks:${userName.toUpperCase()}`;
    const tasksJson = await redis.get(userKey);
    
    console.log(`Retrieving tasks for user: ${userName}`);
    
    if (!tasksJson) {
      return [];
    }
    
    return JSON.parse(tasksJson);
  } catch (error) {
    console.error(`Error getting tasks for ${userName} from Redis:`, error);
    throw error;
  }
};

export const saveTasksToRedis = async (tasks: string[], userName: string): Promise<void> => {
  try {
    const redis = await getRedisClient();
    const userKey = `tasks:${userName.toUpperCase()}`;
    
    console.log(`Saving tasks for user: ${userName}`);
    
    await redis.set(userKey, JSON.stringify(tasks));
  } catch (error) {
    console.error(`Error saving tasks for ${userName} to Redis:`, error);
    throw error;
  }
};

export const clearTasksFromRedis = async (userName: string): Promise<void> => {
  try {
    const redis = await getRedisClient();
    const userKey = `tasks:${userName.toUpperCase()}`;
    
    console.log(`Clearing tasks for user: ${userName}`);
    
    await redis.del(userKey);
  } catch (error) {
    console.error(`Error clearing tasks for ${userName} from Redis:`, error);
    throw error;
  }
};
