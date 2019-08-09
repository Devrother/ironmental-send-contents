import mongoose, { Schema } from 'mongoose';

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

SubscriberSchema.statics.getSubscribers = async function() {
  const subscribers = await this.find()
    .where('isCertify')
    .equals(true)
    .select('email received favoriteTags')
    .lean();

  subscribers.forEach(sub => {
    sub._id = sub._id.toString();
    sub.received = new Set(sub.received.map(objectId => objectId.toString()));
  });

  return subscribers;
}

export default mongoose.model('Subscriber', SubscriberSchema);
