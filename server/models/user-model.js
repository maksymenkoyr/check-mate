import mongoose, { Schema } from "mongoose"

const userSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  password: { type: String, required: true, },
  email: { type: String, required: true, unique: true },
  tasks: [{ type: Schema.Types.ObjectId, ref: 'Task' }],
  friends: [{ type: Schema.Types.ObjectId, ref: 'Friend' }]
})

userSchema.path('name').validate(async (value) => {
  const nameCount = await mongoose.models.User.countDocuments({ name: value });
  return !nameCount;
}, 'name already exists');

export default mongoose.model('User', userSchema)