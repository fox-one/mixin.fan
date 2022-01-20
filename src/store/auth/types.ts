import type {} from "vuex";

export const AuthModuleKey = "auth/";

export interface State {
  token: string;
}

export enum GetterTypes {
  IS_LOGGED = "IS_LOGGED",
}

export enum MutationTypes {
  SET_TOKEN = "SET_TOKEN",
}

export type Mutations = {
  [MutationTypes.SET_TOKEN]: (s: State, value: string) => void;
};
