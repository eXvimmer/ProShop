import mongoose from "mongoose";

const connectDB = async () => {
  try {
    let DB;
    if (process.env.NODE_ENV === "production") {
      // ! MongoDB Atlas
      DB = process.env.DATABASE.replace(
        "<PASSWORD>",
        process.env.DATABASE_PASSWORD
      );
    } else {
      // ! Local Database
      DB = process.env.DATABASE_LOCAL;
    }

    const conn = await mongoose.connect(DB, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
    });

    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`❌ Error: ${error.message}`);
    process.exit(1);
  }
};

export default connectDB;
