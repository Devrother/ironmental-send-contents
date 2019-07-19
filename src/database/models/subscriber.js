import mongoose, { Schema } from 'mongoose';
import Joi from '@hapi/joi'

const SubscriberSchema = new Schema({
  createdAt: { type: Date, default: Date.now },
  email: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 50,
  },
  confirmCode: {
    type: String,
  },
  isCertify: {
    type: Boolean,
    required: true,
  },
  favoriteTags: [{ type: String }],
  received: [{ type: Schema.Types.ObjectId, ref: 'Interview' }],
});

SubscriberSchema.statics.updateSubByEmail = function(email, uuid_v4) {
  return this.findOneAndUpdate(
    { email },
    { confirmCode: uuid_v4 },
    { runValidators: true },
  ).orFail();
};

SubscriberSchema.statics.updateByConfirmCode = function(code) {
  return this.findOneAndUpdate(
    { confirmCode: code },
    { confirmCode: null, isCertify: true },
    { runValidators: true },
  ).orFail();
};

export const validateEmail = (body) => {
  const schema = Joi.object({
    email: Joi.string().email()
  })
  return schema.validate(body)
}

export const validateConfirmcode = (body) => {
  const schema = Joi.object({
    confirmCode: Joi.string().guid()
  })
  return schema.validate(body)
}

export default mongoose.model('Subscriber', SubscriberSchema);
