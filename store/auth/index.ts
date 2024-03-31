import { create } from "zustand";

import { createSelectors } from "../../utils/store";
import { getUser, removeUser, setUser } from "./utils";
import { UserType } from "./utils";

interface AuthState {
  status: "idle" | "signOut" | "signIn";
  user: UserType | null;
  signIn: (data: UserType) => void;
  signOut: () => void;
  hydrate: () => void;
}

const _useAuth = create<AuthState>((set, get) => ({
  status: "idle",
  user: null,
  signIn: (user) => {
    setUser(user);
    set({ status: "signIn", user });
  },
  signOut: () => {
    removeUser();
    set({ status: "signOut", user: null });
  },
  hydrate: () => {
    try {
      const user = getUser();
      if (user !== null) {
        get().signIn(user);
      } else {
        get().signOut();
      }
    } catch (e) {
    }
  },
}));

export const useAuth = createSelectors(_useAuth);

export const signOut = () => _useAuth.getState().signOut();
export const signIn = (user: UserType) => _useAuth.getState().signIn(user);
export const hydrateAuth = () => _useAuth.getState().hydrate();
