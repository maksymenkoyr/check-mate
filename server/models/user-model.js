import mongoose, { Schema } from "mongoose"

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true, },
  tasks: [{ type: Schema.Types.ObjectId, ref: 'Task' }],
  friends: [{ type: Schema.Types.ObjectId, ref: 'Friend' }]
})

export default mongoose.model('User', userSchema)