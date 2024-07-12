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
