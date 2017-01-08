import mongoose from 'mongoose'
import { RangeSchema } from './Range'
import HotelTypes from '../../common/i18n/zh-tw/HotelTypes'
// import TripElements from '../../common/i18n/zh-tw/TripElements'
import FoodElements from '../../common/i18n/zh-tw/FoodElements'
import TravelWays from '../../common/i18n/zh-tw/TravelWays'
import TripLocations from '../../common/i18n/zh-tw/TripLocations'
import flattenMessages from '../../common/i18n/utils/flattenMessages'

const PostSchema = new mongoose.Schema({
  people: { type: Number, default: 1 },
  residentFee: RangeSchema,
  tripFee: RangeSchema,
  allFee: RangeSchema,
  foodFee: Number, // maxmimum
  hotelType: {
    value: [{
      type: String,
      enum: Object.keys(HotelTypes),
    }],
    other: String,
  },
  tripElement: {
    value: [{
      type: String,
      // enum: Object.keys(flattenMessages(TripElements)), // todo
    }],
    other: String,
  },
  foodElement: {
    value: [{
      type: String,
      enum: Object.keys(FoodElements),
    }],
    other: String,
  },
  otherDemand: String,
  tripLocation: {
    type: String,
    enum: Object.keys(flattenMessages(TripLocations)),
    // ex: 886.01.01 = 台北      ANY = 嚮導推薦
  },
  bookHotel: Boolean,
  bookRestaurant: Boolean,
  startDate: Date,
  endDate: Date,
  travelWay: {
    value: [{
      type: String,
      enum: Object.keys(TravelWays),
    }],
    other: String,
  },
}, {
  versionKey: false,
  timestamps: {
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
  },
})

const Post = mongoose.model('Post', PostSchema)
export default Post
