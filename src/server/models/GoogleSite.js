import mongoose from 'mongoose'
import URL from './plugins/URLType'

export const GoogleSiteSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  website: URL,
  phone: String,
  placeId: {
    type: String,
    required: true,
  },
  position: {
    type: {
      lat: { type: Number, default: 0 },
      lng: { type: Number, default: 0 },
    },
    required: true,
  },
  openPeriod: [{
    close: {
      day: Number,
      time: String,
    },
    open: {
      day: Number,
      time: String,
    },
  }],
  types: [String],
}, {
  versionKey: false,
  timestamps: {
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
  },
})

const GoogleSite = mongoose.model('GoogleSite', GoogleSiteSchema)
export default GoogleSite
