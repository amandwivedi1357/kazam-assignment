import mongoose, { Schema, Document } from 'mongoose';

export interface ITask extends Document {
  tasks: string[];
  createdAt: Date;
}

const TaskSchema = new Schema<ITask>({
  tasks: {
    type: [String],
    required: true
  }
},{
  timestamps: true
});

export const TaskModel = mongoose.model<ITask>('Task', TaskSchema);