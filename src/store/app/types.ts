export const AppModuleKey = "app/";

export type State = {
  dark: boolean;
  toast: APP.ToastState;
  appbar: any;
  settings: any;
};

export enum MutationTypes {
  SET_TOAST = "SET_TOAST",
  SET_SETTINGS = "SET_SETTINGS",
  SET_APPBAR = "SET_APPBAR",
}

export enum GetterTypes {
  GET_SETTINGS = "GET_SETTINGS",
}

export type Mutations = {
  [MutationTypes.SET_TOAST]: (s: State, data: Partial<APP.ToastState>) => void;
  [MutationTypes.SET_SETTINGS]: (s: State, data: any) => void;
  [MutationTypes.SET_APPBAR]: (s: State, data: any) => void;
};
