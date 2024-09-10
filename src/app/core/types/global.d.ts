//! API

interface ICompare {
  img: string
  name: string;
  characters: ICompareWork[];
}

interface ICompareWork {
  character: ICharacter[];
  title: string;
}

interface IImport {
  amount: number
  titles: string[]
}

interface IWork {
  _id: string;
  title: string;
  originalTitle?: string;
  poster: string;
  wikiSlug: string;
  doppiatori?: DoppiatoreCharacter[];
  seen?: boolean;
}

interface IWorkPaged {
  data: IWork[];
  page: number;
  total: number;
}

interface DoppiatoreCharacter {
  doppiatore: Doppiatore;
  character: ICharacter[];
}

interface Doppiatore {
  _id: string;
  name: string;
  img: string;
  wikiSlug: string;
}

//! AUTH

interface Login {
  email: string;
  password: string;
}

interface Signup {
  email: string;
  password: string;
  confirmPassword: string;
  name: string;
  lastName: string;
}

interface User extends Signup {
  _id: string;
  avatar: string;
  role: 'USER' | 'ADMIN';

  seen: any[];
}

interface ICharacter {
  _id: string,
  name: string,
  wikiSlug: string,
  img: string
}


//!UTILS

interface Alert {
  val: string,
  id: string,
  type: "info" | "error" | "alert"
}


type IValidator = (v: string) => boolean
