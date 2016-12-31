import mongoose from 'mongoose'
import { TimeSchema } from './Time'
import URL from './plugins/URLType'

export const DailyTripSchema = new mongoose.Schema({
  treePic: URL,
  startSite: {
    type: String,
    required: true,
  },
  remind: String,
  period: {
    start: TimeSchema,
    end: TimeSchema,
  },
  routes: [{
    from: {
      type: String,
      required: true,
    },
    to: {
      type: String,
      required: true,
    },
    remind: String,
  }],
  uuid2data: [{
    uuid: {
      type: String,
      required: true,
    },
    gid: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'GuideSite',
    },
    startTime: String,
    endTime: String,
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
