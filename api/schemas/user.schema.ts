import { Schema, model } from "mongoose";

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
    },
    letterboxdID: {
      type: String,
      required: false,
    },
    traktID: {
        type: String,
        required: false,
      },
    username: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
      unique: true,
    },
    watchlist: [{ type: Schema.Types.ObjectId, ref: "work" }],
  },
  { collection: "users" }
);

export default model("user", userSchema);
