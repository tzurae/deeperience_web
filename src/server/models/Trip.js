import mongoose from 'mongoose'

export const TripSchema = new mongoose.Schema({
  guideId: { type: String, required: true },
  name: { type: String, default: '' }, // trip name
  allSites: { type: [String], default: [] },
  price: { type: Number, default: 0, required: true },
  dayInfo: { type: Number, required: true }, // how many days
  coverPic: String,
  treePic: String,
  tags: { type: [Number], default: [] },
  startSite: { type: [{
    depart: {
      day: Number,
      hour: Number,
      minute: Number,
    },
    from: String,
  }], default: [] },
  remind: { type: [String], default: [] },
  stats: {
    star: { type: Number, default: 0 },
    seen: { type: Number, default: 0 },
    purchase: { type: Number, default: 0 },
  },
  period: {
    start: {
      type: {
        day: { type: Number, default: 0 },
        hour: { type: Number, default: 0 },
        minute: { type: Number, default: 0 },
      },
    },
    end: {
      type: {
        day: { type: Number, default: 0 },
        hour: { type: Number, default: 0 },
        minute: { type: Number, default: 0 },
      },
    },
  },
  routes: [{
    depart: {
      type: {
        day: { type: Number, default: 0 },
        hour: { type: Number, default: 0 },
        minute: { type: Number, default: 0 },
      },
      required: true,
    },
    from: String,
    nextStopDepart: {
      type: {
        day: { type: Number, default: 0 },
        hour: { type: Number, default: 0 },
        minute: { type: Number, default: 0 },
      },
      required: true,
    },
    to: String,
  }],
}, {
  versionKey: false,
  timestamps: {
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
  },
})

const Trip = mongoose.model('Trip', TripSchema)
export default Trip

