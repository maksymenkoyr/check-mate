import mongoose, { Schema } from "mongoose"

const userSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  password: { type: String, required: true, select: false },
  email: { type: String, required: true, unique: true },
  tasks: [{ type: Schema.Types.ObjectId, ref: 'Task' }],
  friends: [{ type: Schema.Types.ObjectId, ref: 'User' }]
})

export default mongoose.model('User', userSchema) 