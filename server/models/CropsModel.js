import mongoose from "mongoose";

const CropSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      required: true,
    },
    description: [
      {
        type: Object,
      },
    ],

    category: {
      type: mongoose.ObjectId, //to get the id of the id of the category
      ref: "Category", //same as the name of the category
      required: true,
    },
  },
  { timestamps: true }
);
export default mongoose.model("Crops", CropSchema);
