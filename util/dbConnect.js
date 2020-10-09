import mongoose from "mongoose";

const dbConnect = async () => {
  if (mongoose.connections[0].readyState) return;

  await mongoose.connect(
    process.env.MONGODB_URI,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    },
    () => {
      console.log("MongoDB Connected");
    }
  );
};

export default dbConnect;
