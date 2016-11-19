import mongoose from 'mongoose'
import { TimeSchema } from './Time'

export const DailyTripSchema = new mongoose.Schema({
  treePic: String,
  startSite: {
    departedAt: TimeSchema,
    from: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'GuideSite',
      required: true,
    },
  },
  remind: String,
  period: {
    start: TimeSchema,
    end: TimeSchema,
  },
  routes: [{
    depart: {
      type: TimeSchema,
      required: true,
    },
    from: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'GuideSite',
      required: true,
    },
    nextStopDepart: {
      type: TimeSchema,
      required: true,
    },
    to: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'GuideSite',
      required: true,
    },
    remind: String,
  }],
}, {
  versionKey: false,
  timestamps: {
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
  },
})

const DailyTrip = mongoose.model('DailyTrip', DailyTripSchema)
export default DailyTrip
