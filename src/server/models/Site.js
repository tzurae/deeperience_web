import mongoose from 'mongoose'
import Sites from '../../common/constants/Sites'

export const SiteSchema = new mongoose.Schema({
  name: { type: String, default: '' }, // site name
  introduction: { type: String, default: '' },
  audioURL: String,
  tags: [Number],
  mapSite: [{
    address: { type: String, default: '' },
    introduction: { type: String, default: '' },
    name: { type: String, default: '' },
    website: String,
    siteType: { type: String, default: Sites.Other },
    fee: String,
    recentActivity: [{
      date: Date,
      content: String,
    }],
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
