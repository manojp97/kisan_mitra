import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  phone: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  location: { type: String },
  soilType: { type: String },
  createdAt: { type: Date, default: Date.now }
})

export default mongoose.model('User', userSchema)