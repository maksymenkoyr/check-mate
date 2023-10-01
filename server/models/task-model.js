import { Schema, model } from 'mongoose'

const TaskSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User' },
  taskName: { type: String, required: true },
  description: {
    type: String
  },
  likes: [
    {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
  ],
})
export default model('Task', TaskSchema);