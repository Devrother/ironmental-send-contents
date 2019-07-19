import mongoose, { Schema } from 'mongoose';
import Joi from '@hapi/joi'

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
});

InterviewSchema.statics.findInterviewById = function(id) {
  return this.findOne({ _id: id }).orFail();
};

InterviewSchema.statics.findWithPagination = function(skipNum, limitNum) {
  return this.find()
    .skip(skipNum)
    .limit(limitNum);
};

InterviewSchema.statics.getInterviewsCnt = function() {
  return this.countDocuments();
};

export const validateQuery = (query) => {
  const schema = Joi.object({
    tag: Joi.string(),
    limit: Joi.number().integer(),
    offset: Joi.number().integer()
  })
  return schema.validate(query)
}

export default mongoose.model('Interview', InterviewSchema);
