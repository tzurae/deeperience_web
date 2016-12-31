import mongoose from 'mongoose'
import { SiteSchema } from './Site'
import TripElements from '../../common/i18n/zh-tw/TripElements'
import flattenMessages from '../../common/i18n/utils/flattenMessages'
import URL from './plugins/URLType'

export const GuideSiteSchema = new mongoose.Schema({
  guide: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  introduction: {
    type: String,
  },
  audioURL: URL,
  tags: [{
    type: String,
    enum: Object.keys(flattenMessages(TripElements)),
  }],
  fee: String,
  recentActivity: [{
    date: { type: String, required: true },
    content: { type: String, required: true },
  }],
  mainSite: {
    type: SiteSchema,
    required: true,
  },
  subSites: [SiteSchema],
  reminds: [{
    pic: String,
    words: String,
  }],
}, {
  versionKey: false,
  timestamps: {
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
  },
})

const GuideSite = mongoose.model('GuideSite', GuideSiteSchema)
export default GuideSite
