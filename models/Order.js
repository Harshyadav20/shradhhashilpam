import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  assets: [{
    asset: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Asset'
    },
    title: String,
    price: Number,
    discountPrice: Number
  }],
  totalAmount: {
    type: Number,
    required: [true, 'Total amount is required']
  },
  paymentStatus: {
    type: String,
    enum: ['pending', 'completed', 'failed', 'refunded'],
    default: 'pending'
  },
  paymentMethod: {
    type: String,
    enum: ['stripe', 'razorpay', 'paypal', 'upi'],
    default: 'stripe'
  },
  stripePaymentIntentId: {
    type: String
  },
  status: {
    type: String,
    enum: ['processing', 'completed', 'cancelled'],
    default: 'processing'
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

orderSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

export default mongoose.model('Order', orderSchema);
