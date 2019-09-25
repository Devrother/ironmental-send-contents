import mongoose, { Schema } from 'mongoose';

const InterviewSchema = new Schema({
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  question: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 50,
  },
  answer: {
    type: String,
    required: true,
    minlength: 10,
  },
  tags: {
    type: Array,
    default: [],
  },
  keywords: {
    type: Array,
    default: [],
  }
});

export default mongoose.model('Interview', InterviewSchema);
