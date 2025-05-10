import mongoose, { Schema, Document } from 'mongoose';

export interface ITask extends Document {
  tasks: string[];
  createdAt: Date;
}

const TaskSchema = new Schema<ITask>({
  tasks: {
    type: [String],
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export const TaskModel = mongoose.model<ITask>('Task', TaskSchema);