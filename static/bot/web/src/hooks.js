import {createContext, useContext} from 'react';

export const UserContext = createContext(null);
export const UserProvider = UserContext.Provider;

export function useUser() {
  return useContext(UserContext);
}
