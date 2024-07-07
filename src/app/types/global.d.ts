//! API

interface ICompare {
  doppiatore: string;
  name: string;
  works: ICompareWork[];
}

interface ICompareWork {
  work: string;
  character: string;
  characterImg: string;
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
