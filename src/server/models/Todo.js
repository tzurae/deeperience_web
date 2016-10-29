import mongoose from 'mongoose'

const Todo = new mongoose.Schema({
  text: String,
}, {
  versionKey: false,
  timestamps: {
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
  },
})

export default mongoose.model('Todo', Todo)
