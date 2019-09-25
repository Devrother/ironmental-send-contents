import mongoose from 'mongoose';

const { MONGODB_URL, MONGODB_NAME } = process.env;

export default {
  connect: () => {
    mongoose
      .connect(`mongodb://${MONGODB_URL}/${MONGODB_NAME}`, {
        useNewUrlParser: true,
        useFindAndModify: false,
      })
      .catch(console.log);
  },
};
