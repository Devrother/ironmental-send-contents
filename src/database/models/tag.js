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

TagSchema.statics.getTags = async function() {
  return (await this.find()
    .select('name interviews')
    .lean()).reduce((acc, item) => {
      return {
        ...acc,
        [item.name]: new Set(
          item.interviews.map(objectId => objectId.toString()),
        ),
      };
    }, {});
}

export default mongoose.model('Tag', TagSchema);
