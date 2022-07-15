import mongoose from "mongoose";
import fs from "fs/promises";
import path from "path";

const connectDB = () => {
  const connectionParams = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  };
  try {
    mongoose.connect(process.env.MONGODB_URL, connectionParams);
  } catch (error) {
    const today = new Date();
    fs.writeFile(
      path.join(__dirname, "src", "logs.json"),
      `Db failed to connect on ${today.getDate()}\nError log: ${error}\n\n`
    ).then();
  }
};

export default connectDB;
