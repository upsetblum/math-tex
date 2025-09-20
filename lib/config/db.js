import mongoose from 'mongoose';

export const ConnectDB = async () => {
  try {
    if (mongoose.connections[0].readyState) {
      console.log('Already connected to DB');
      return;
    }

    const mongoUri = process.env.MONGODB_URI || 'mongodb+srv://blumSossa:wygo9651@cluster0.8wsyfpu.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

    await mongoose.connect(mongoUri, {
      bufferCommands: false,
    });

    console.log('DB Connected');
  } catch (error) {
    console.error('DB Connection Error:', error);
    throw error;
  }
};
