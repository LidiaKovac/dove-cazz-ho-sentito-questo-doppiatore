import { Schema, model } from "mongoose"

const doppiatoreSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    img: {
      type: String,
      required: false,
    },
    wikiSlug: {
      type: String, 
      required: true
    }
  },
  { collection: "doppiatori" }
)

doppiatoreSchema.pre("save", async function (next) {
  if (!this.img) {
    this.img = `https://source.boringavatars.com/beam/120/${
      this.name.split(" ")[0]
    }?colors=4d9de0,c9e6fe,ee7b30`
  }
  next()
})

export default model("doppiatore", doppiatoreSchema)
