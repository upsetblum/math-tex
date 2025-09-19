import mongoose from 'mongoose';

export const ConnectDB = async () => {
  await mongoose.connect(
    'mongodb+srv://blumSossa:wygo9651@cluster0.8wsyfpu.mongodb.net/blog-app'
  );
  console.log('DB Connected');
};
