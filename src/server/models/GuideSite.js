import mongoose from 'mongoose'
import { SiteSchema } from './Site'
import TripElements from '../../common/i18n/zh-tw/TripElements'
import flattenMessages from '../../common/i18n/utils/flattenMessages'

export const GuideSiteSchema = new mongoose.Schema({
  guide: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  name: {
    type: String,
    default: '',
  },
  introduction: {
    type: String,
    default: '',
  },
  audioURL: String,
  tags: [{
    type: String,
    enum: Object.keys(flattenMessages(TripElements)),
    required: true,
  }],
  fee: String,
  recentActivity: [{
    date: { type: String, required: true },
    content: { type: String, required: true },
  }],
  mainSite: SiteSchema,
  subSites: [SiteSchema],
})

const GuideSite = mongoose.model('GuideSite', GuideSiteSchema)
export default GuideSite
