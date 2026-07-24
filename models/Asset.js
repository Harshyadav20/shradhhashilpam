import mongoose from 'mongoose';

const assetSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Title is required'],
    trim: true,
    minlength: [3, 'Title must be at least 3 characters'],
    maxlength: [100, 'Title cannot exceed 100 characters']
  },
  description: {
    type: String,
    required: [true, 'Description is required'],
    maxlength: [2000, 'Description cannot exceed 2000 characters']
  },
  category: {
    type: String,
    required: [true, 'Category is required'],
    enum: ['meme-pack', 'sound-effects', 'glitch-transitions', 'presets', 'templates', 'other']
  },
  price: {
    type: Number,
    required: [true, 'Price is required'],
    min: [0, 'Price cannot be negative']
  },
  discountPrice: {
    type: Number,
    min: [0, 'Discount price cannot be negative']
  },
  thumbnail: {
    type: String,
    required: [true, 'Thumbnail is required']
  },
  previewFiles: [{
    type: String
  }],
  downloadUrl: {
    type: String,
    required: [true, 'Download URL is required']
  },
  fileSize: {
    type: String,
    default: '0 MB'
  },
  tags: [{
    type: String,
    trim: true
  }],
  featured: {
    type: Boolean,
    default: false
  },
  trending: {
    type: Boolean,
    default: false
  },
  downloads: {
    type: Number,
    default: 0
  },
  rating: {
    type: Number,
    min: 0,
    max: 5,
    default: 0
  },
  reviewCount: {
    type: Number,
    default: 0
  },
  software: [{
    type: String,
    enum: ['Premiere Pro', 'After Effects', 'DaVinci Resolve', 'CapCut', 'Final Cut Pro', 'Other']
  }],
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
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

assetSchema.index({ title: 'text', description: 'text', tags: 'text' });

assetSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

export default mongoose.model('Asset', assetSchema);
