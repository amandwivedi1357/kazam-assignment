import { Router } from 'express';
import { getAllTasks } from '../controllers/taskController';

const router = Router();

router.get('/fetchAllTasks', getAllTasks);

export default router;