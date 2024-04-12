import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
  shippingInfo: {
    hNo: {
      type: String,
      required: true,
    },
    area: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    postalCode: {
      type: Number,
      required: true,
    },
    phone: {
      type: Number,
      required: true,
    },
  },

  orderItems: [
    {
      item: {
        type: String,
        required: true,
      },
      price: {
        type: Number,
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
      },
    },
  ],

  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true,
  },

  subTotal: {
    type: Number,
    default: 0,
  },
  deliveryCharges: {
    type: Number,
    default: 0,
  },

  totalAmount: {
    type: Number,
    default: 0,
  },

  orderStatus: {
    type: String,
    enum: ['Preparing', 'Shipping', 'Delivered'],
    default: 'Preparing',
  },

  deliveredAt: Date,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Order = mongoose.model('Order', orderSchema);

export default Order;
