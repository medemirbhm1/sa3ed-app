import { getItem, removeItem, setItem } from "../../storage";

const USER = "user";

export type UserType = {
  id: number;
  email: string;
  firstname: string;
  lastname: string;
  type: string;
  phone: string;
  city: string;
  sexe: string;
  available: boolean;
  createdAt: string;
  address: string;
  town: string;
  birthdate: string;
  imgUrl: string;
  jobTitle: string;
  description: string;
  exigences: string;
  token: string;
};

export const getUser = () => getItem<UserType>(USER);
export const removeUser = () => removeItem(USER);
export const setUser = (value: UserType) => setItem<UserType>(USER, value);
