import mongoose, { Schema } from 'mongoose';

const TagSchema = new Schema({
  createdAt: { type: Date, default: Date.now },
  name: {
    type: String,
    minlength: 1,
    maxlength: 30,
  },
  interviews: [{ type: Schema.Types.ObjectId, ref: 'Interview' }],
});

TagSchema.statics.findTagsSelect = function(atr) {
  return this.find()
    .select(atr)
    .orFail();
};

TagSchema.statics.joinInterviewsByName = function(
  tagName,
  limitNum,
  offsetNum,
) {
  return this.findOne({ name: tagName }, 'interviews')
    .populate({
      path: 'interviews',
      options: {
        limit: limitNum,
        sort: { createdAt: -1 },
        skip: offsetNum,
      },
    })
    .orFail();
};

TagSchema.statics.getInterviewsCntInTag = function() {
  return this.find()
    .select('interviews')
    .countDocuments();
};

export default mongoose.model('Tag', TagSchema);
