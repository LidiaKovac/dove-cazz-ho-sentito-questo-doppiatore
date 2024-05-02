interface MongoDBObject {
  _id: import("mongodb").ObjectId
  __v: number
}

interface Doppiatore extends MongoDBObject {
  name: string
  img: string
  wikiSlug: string
}

interface Character extends MongoDBObject {
  name: string
  img: string
  wikiSlug: string
}

interface Work extends MongoDBObject {
  title: string
  year: number
  poster: string
  doppiatori: {
    doppiatore: Doppiatore[] | import("mongodb").ObjectId[]
    character: Character[] | import("mongodb").ObjectId[]
  }
  wikiSlug: string
}

interface Links {
  movies: string[]
  characters: string[]
}
