const mongoose = require("mongoose");

module.exports = mongoose.connect(
  process.env.MONGODB_URI,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  },
  () => console.log(`MongoDB connected`)
);
