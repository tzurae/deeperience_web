import mongoose from 'mongoose'

export const TripSchema = new mongoose.Schema({
  name: { type: String, default: '' }, // trip name
  guideId: { type: String, required: true },
  allSites: { type: String, default: [] },
  backgroundPic: String,
  dayInfo: { type: Number, required: 0 }, // how many days
  price: { type: Number, default: 0 },
  purchase: { type: Number, default: 0 },
  star: { type: Number, default: 0 },
  seen: { type: Number, default: 0 },
  tags: { type: [Number], default: 0 },
  startSite: { type: [String], default: 0 },
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

