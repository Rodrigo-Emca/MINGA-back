import mongoose from "mongoose";

const DB_URI = process.env.MONGO;

mongoose.set('strictQuery', false);
mongoose.connect(DB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('Connected to database');
}).catch((err) => {
  console.log('Error connecting to database:', err);
});

export default mongoose.connection;
