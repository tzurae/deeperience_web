import mongoose from 'mongoose'

export const RangeSchema = new mongoose.Schema({
  max: {
    type: Number,
    required: true,
  },
  min: {
    type: Number,
    required: true,
  },
})

const Range = mongoose.model('Range', RangeSchema)
export default Range
