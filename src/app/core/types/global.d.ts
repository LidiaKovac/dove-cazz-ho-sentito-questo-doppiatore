//! API

interface APIResponse<T> {
  data: T;
  status: 'SUCCESS' | 'ERROR';
  message: string;
}

interface ICompare {
  img: string;
  name: string;
  characters: ICompareWork[];
}

interface ICompareWork {
  characterActor: ICharacter;
  work: IWork;
}

interface IImport {
  amount: number;
  titles: string[];
}

interface IWork {
  id: string;
  title: string;
  originalTitle?: string;
  poster: string;
  slug: string;
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
  id: string;
  name: string;
  img: string;
  slug: string;
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
  id: string;
  avatar: string;
  role: 'USER' | 'ADMIN';

  seen: any[];
}

interface ICharacter {
  id: string;
  name: string;
  slug: string;
  img: string;
}


//!UTILS

interface Alert {
  val: string,
  id: string,
  type: "info" | "error" | "alert"
}


type IValidator = (v: string) => boolean
