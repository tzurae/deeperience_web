import mongoose from 'mongoose'

export const SiteSchema = new mongoose.Schema({
  name: { type: String, default: '' }, // site name
  introduction: { type: String, default: '' },
  audioURL: String,
  mapSite: [{
    address: String,
    introduction: String,
    name: { type: String, default: '' },
    placeId: String,
    position: {
      type: {
        lat: Number,
        lng: Number,
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
