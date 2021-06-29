const mongoose = require("mongoose");

async function connectToDatabase() {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  } catch (error) {
    console.log("Could not connect to DB!", error);
  }
}

module.exports = async (req, res) => {
  await connectToDatabase();

  const categorySchema = new mongoose.Schema({
    name: String,
    icon: String,
    backgroundColor: String,
    color: String,
  });
  const Category = mongoose.model("Category", categorySchema);
  const categories = await Category.find();
  res.status(200).json({ categories });
};
