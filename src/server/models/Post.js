import mongoose from 'mongoose'

export const PostSchema = new mongoose.Schema({
  people: { type: Number, default: 1 },
  residentFee: {
    type: [Number],
    validate: [(val) => val.length === 2,
                'array length not equal to 2!!!'],
  },
  tripFee: {
    type: [Number],
    validate: [(val) => val.length === 2,
      'array length not equal to 2!!!'],
  },
  allFee: {
    type: [Number],
    validate: [(val) => val.length === 2,
      'array length not equal to 2!!!'],
  },
  foodFee: Number,
  hotelType: [Boolean],
  tripLocation: Number,
  tripElement: [Boolean],
  foodElement: [Boolean],
  otherDemand: [String],
  bookHotel: Boolean,
  bookRestaurant: Boolean,
  startDate: Date,
  endDate: Date,
}, {
  versionKey: false,
  timestamps: {
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
  },
})

const Post = mongoose.model('Post', PostSchema)
export default Post
