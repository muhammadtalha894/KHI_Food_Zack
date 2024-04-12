import mongoose from 'mongoose';

const itemSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  image: {
    public_id: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
  },

  overAllRating: {
    type: Number,
    default: 0,
  },

  rating: [
    {
      rate: {
        type: Number,
      },
      user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true,
      },
    },
  ],

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Item = mongoose.model('Item', itemSchema);
export default Item;
