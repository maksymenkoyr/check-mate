import mongoose, { Schema } from "mongoose"

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true, },
  email: { type: String, required: true, unique: true },
  tasks: [{ type: Schema.Types.ObjectId, ref: 'Task' }],
  friends: [{ type: Schema.Types.ObjectId, ref: 'Friend' }]
})

userSchema.path('username').validate(async (value) => {
  const usernameCount = await mongoose.models.User.countDocuments({ username: value });
  return !usernameCount;
}, 'username already exists');

export default mongoose.model('User', userSchema)