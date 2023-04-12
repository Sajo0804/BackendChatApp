import mongoose from "mongoose"

const BroadcastSchema = mongoose.Schema(
  {
    theme: String,
    messages: [
        {
            sender: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User",
                required: true,
            },
            fromName: String,
            text: { type: String, required: true },
            createdAt: Date,
        }
    ],
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    }
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Broadcasts", BroadcastSchema);
