import mongoose from 'mongoose';

export const ConnectDB = async () => {
  try {
    if (mongoose.connections[0].readyState) {
      console.log('Already connected to DB');
      return;
    }

    const mongoUri = process.env.MONGODB_URI;
    if (!mongoUri) throw new Error('MONGODB_URI not set. Create a .env.local file.');

    await mongoose.connect(mongoUri, {
      bufferCommands: false,
    });

    console.log('DB Connected');
  } catch (error) {
    console.error('DB Connection Error:', error);
    throw error;
  }
};
