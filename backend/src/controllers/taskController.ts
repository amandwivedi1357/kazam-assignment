import { Request, Response } from 'express';
import { fetchAllTasks } from '../services/taskService';

export const getAllTasks = async (req: Request, res: Response) => {
  try {
    const firstName = req.query.firstName || req.body.firstName || 'AMAN';
    const tasks = await fetchAllTasks(firstName as string);
    res.status(200).json({ tasks });
  } catch (error) {
    console.error('Error in getAllTasks controller:', error);
    res.status(500).json({ error: 'Failed to fetch tasks' });
  }
};