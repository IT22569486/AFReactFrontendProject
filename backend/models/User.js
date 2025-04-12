const mongoose = require('mongoose');

// Define the User Schema
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, 'Username is required'],
    unique: true,
    trim: true,
    minlength: [3, 'Username must be at least 3 characters long'],
    maxlength: [50, 'Username cannot exceed 50 characters'],
  },
  firstName: {
    type: String,
    trim: true,
    maxlength: [50, 'First name cannot exceed 50 characters'],
  },
  lastName: {
    type: String,
    trim: true,
    maxlength: [50, 'Last name cannot exceed 50 characters'],
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    trim: true,
    lowercase: true,
    match: [/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, 'Please enter a valid email address'],
  },
  phoneNumber: {
    type: String,
    // unique: true,
    // sparse: true, // Allows null values to not conflict with uniqueness
    // match: [/^\+?[1-9]\d{1,14}$/, 'Please enter a valid phone number (e.g., +1234567890)'],
    // validate: {
    //   validator: function (v) {
    //     return v === null || /^\+?[1-9]\d{1,14}$/.test(v);
    //   },
    //   message: 'Invalid phone number format',
    // },
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: [8, 'Password must be at least 8 characters long'],
  },
  role: {
    type: String,
    enum: {
      values: ['admin', 'user'],
      message: 'Role must be either "admin" or "user"',
    },
    default: 'user',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
}, {
  timestamps: true, 
});

userSchema.pre('save', function (next) {
  if (this.isModified()) {
    this.updatedAt = Date.now();
  }
  next();
});

userSchema.index({ email: 1 });
userSchema.index({ ussername: 1 });
// userSchema.index({ phoneNumber: 1 });


module.exports = mongoose.model('User', userSchema);