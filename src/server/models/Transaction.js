import mongoose from 'mongoose'

export const TransactionSchema = new mongoose.Schema({
  seller: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  buyer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  trip: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Trip',
  },
}, {
  versionKey: false,
  timestamps: {
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
  },
})

const Transaction = mongoose.model('Transaction', TransactionSchema)
export default Transaction
