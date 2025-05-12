import mongoose from 'mongoose';

const connectDB = async (url) => {
  try {
    const connection = await mongoose.connect(url, { dbName: 'VideGen_Ai' });
    console.log(`Db is connected to ${connection.connection.host}`);
  } catch (error) {
    console.log(`Database connection failed ${error.message}`);
    process.exit(1);
  }
};

export default connectDB;
