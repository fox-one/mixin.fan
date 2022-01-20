export const AppModuleKey = "app/";

export type State = {
  dark: boolean;
  toast: APP.ToastState;
  appbar: any;
  config: any;
};

export enum MutationTypes {
  SET_TOAST = "SET_TOAST",
  SET_CONFIG = "SET_CONFIG",
  SET_APPBAR = "SET_APPBAR",
}

export type Mutations = {
  [MutationTypes.SET_TOAST]: (s: State, data: Partial<APP.ToastState>) => void;
  [MutationTypes.SET_CONFIG]: (s: State, data: any) => void;
  [MutationTypes.SET_APPBAR]: (s: State, data: any) => void;
};
