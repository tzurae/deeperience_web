import mongoose from 'mongoose';
import paginatePlugin from './plugins/paginate';

let Todo = new mongoose.Schema({
  text: String,
}, {
  versionKey: false,
  timestamps: {
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
  },
});

Todo.plugin(paginatePlugin);

export default mongoose.model('Todo', Todo);
