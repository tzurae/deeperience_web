import mongoose from 'mongoose'
import { DailyTripSchema } from './DailyTrip'
import TripStates from '../../common/constants/TripStates'
import TripDayInfos from '../../common/i18n/zh-tw/TripDayInfos'
import TripElements from '../../common/i18n/zh-tw/TripElements'
import flattenMessages from '../../common/i18n/utils/flattenMessages'

export const TripSchema = new mongoose.Schema({
  guide: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  name: {
    type: String,
    required: true,
  },
  allSites: {
    type: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'GuideSite',
    }],
    default: [],
  },
  price: {
    type: Number,
    default: 0,
    required: true,
  },
  dayInfo: {
    type: String,
    enum: Object.keys(TripDayInfos),
    required: true,
  },
  coverPic: {
    type: String,
    required: true,
  },
  tags: {
    type: [{
      type: String,
      enum: Object.keys(flattenMessages(TripElements)),
    }],
    default: [],
  },
  departDate: Date,
  dailyTrips: {
    type: [DailyTripSchema],
    default: [],
  },
  state: {
    type: String,
    enum: Object.keys(TripStates),
    default: TripStates.DRAFT,
  },
}, {
  versionKey: false,
  timestamps: {
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
  },
})

const Trip = mongoose.model('Trip', TripSchema)
export default Trip
