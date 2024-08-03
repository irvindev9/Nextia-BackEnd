export interface User {
  id: number;
  names: string;
  lastnames: string;
  email: string;
  password: string;
  house_number: number;
}

export interface Users {
  [key: number]: User;
}