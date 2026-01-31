import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user'
  },
  // Access Window Fields
  accessStart: {
    type: Date,
    default: null
  },
  accessEnd: {
    type: Date,
    default: null
  }
});

export default mongoose.model('User', UserSchema);