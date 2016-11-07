import mongoose from 'mongoose'
import Sites from '../../common/constants/Sites'

export const SiteSchema = new mongoose.Schema({
  guideId: { type: String, required: true },
  name: { type: String, default: '' }, // site name
  introduction: { type: String, default: '' },
  audioURL: String,
  tags: [Number],
  fee: String,
  recentActivity: [{
    date: String,
    content: String,
  }],
  openPeriod: [{
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
  }],
  mapSite: [{
    address: { type: String, default: '' },
    introduction: { type: String, default: '' },
    name: { type: String, default: '' },
    website: String,
    siteType: { type: String, default: Sites.Other },
    fee: String,
    remind: String,
    phone: String,
    placeId: { type: String, default: '', require: true },
    position: {
      type: {
        lat: { type: Number, default: 0 },
        lng: { type: Number, default: 0 },
      },
      required: true,
    },
    openPeriod: [{
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
    }],
  }],
}, {
  versionKey: false,
  timestamps: {
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
  },
})

const Site = mongoose.model('Site', SiteSchema)
export default Site
