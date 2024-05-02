import { Schema, model } from "mongoose"

const workSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    // year: {
    //   type: Number,
    //   required: true,
    // },
    poster: {
      type: String,
      required: true,
      default: "http://placehold.it/300",
    },
    wikiSlug: {
      type: String,
      required: true,
      unique: true,
    },
    doppiatori: [
      {
        doppiatore: { type: Schema.Types.ObjectId, ref: "doppiatore" },
        character: { type: Schema.Types.ObjectId, ref: "character" },
      },
    ],
  },
  { collection: "works" }
)

export default model("work", workSchema)
