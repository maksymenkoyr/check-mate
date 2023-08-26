import mongoose, { Schema } from "mongoose"

const userSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  password: { type: String, required: true, },
  tasks: [{ type: Schema.Types.ObjectId, ref: 'Task' }],
  friends: [{ type: Schema.Types.ObjectId, ref: 'Friend' }]
})

export const User = mongoose.model('User', userSchema)