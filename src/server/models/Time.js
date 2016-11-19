import mongoose from 'mongoose'

export const TimeSchema = new mongoose.Schema({
  hour: Number,
  minute: Number,
})

const Time = mongoose.model('Time', TimeSchema)
export default Time
