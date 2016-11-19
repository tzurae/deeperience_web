import mongoose from 'mongoose'

export const SiteSchema = new mongoose.Schema({
  googleInfo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'GoogleSite',
  },
  introduction: {
    type: String,
    default: '',
  },
  fee: String,
  remind: String,
}, {
  versionKey: false,
  timestamps: {
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
  },
})

const Site = mongoose.model('Site', SiteSchema)
export default Site
