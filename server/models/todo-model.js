import mongoose from "mongoose";

const TodoSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  todos: [
    {
      title: {
        type: String,
        required: true,
      },
      description: {
        type: String,
        required: true,
      },
      checked: {
        type: Boolean,
      },
    },
  ],
});

export default mongoose.model("Todo", TodoSchema);
