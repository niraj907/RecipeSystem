import mongoose from "mongoose";

const itemSchema = new mongoose.Schema({
  images: [
    {
      public_id: {
        type: String,
        required: true,
      },
      url: {
        type: String,
        required: true,
      },
    },
  ],
  name: {
    type: String,
    required: true,
  },
});

const itemModel = mongoose.models.item || mongoose.model("item", itemSchema);

export default itemModel;
