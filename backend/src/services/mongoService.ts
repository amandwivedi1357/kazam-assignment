import mongoose from 'mongoose';
import { TaskModel } from '../models/Task';
import dotenv from 'dotenv';
dotenv.config();

export const connectMongoDB = async (): Promise<void> => {
  try {
    const mongoUrl = process.env.MONGODB_URI || '';
    
    await mongoose.connect(mongoUrl);
    
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    throw error;
  }
};

export const saveTasksToMongoDB = async (tasks: string[], userName: string): Promise<void> => {
  try {
    const taskDoc = new TaskModel({
      userName: userName.toUpperCase(),
      tasks,
      createdAt: new Date()
    });
    
    await taskDoc.save();
    console.log(`Tasks saved to MongoDB for user: ${userName}`);
  } catch (error) {
    console.error('Error saving tasks to MongoDB:', error);
    throw error;
  }
};

export const getTasksFromMongoDB = async (userName: string): Promise<string[]> => {
  try {
    const taskDocs = await TaskModel.find({ 
      userName: userName.toUpperCase() 
    }).sort({ createdAt: -1 });
    
    const allTasks = taskDocs.reduce((acc: string[], doc) => {
      return acc.concat(doc.tasks);
    }, []);
    
    return allTasks;
  } catch (error) {
    console.error('Error getting tasks from MongoDB:', error);
    throw error;
  }
};