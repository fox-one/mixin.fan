export const AppModuleKey = "app/";

export type State = {
  dark: boolean;
  toast: APP.ToastState;
  appbar: any;
  settings: any;
  editMode: boolean;
  bottomNav: any;
};

export enum MutationTypes {
  SET_TOAST = "SET_TOAST",
  SET_SETTINGS = "SET_SETTINGS",
  SET_APPBAR = "SET_APPBAR",
  SET_BOTTOM_NAV = "SET_BOTTOM_NAV",
  TOGGLE_EDIT_MODE = "TOGGLE_EDIT_MODE",
}

export enum GetterTypes {
  GET_SETTINGS = "GET_SETTINGS",
  GET_EDIT_MODE = "GET_EDIT_MODE",
}

export type Mutations = {
  [MutationTypes.SET_TOAST]: (s: State, data: Partial<APP.ToastState>) => void;
  [MutationTypes.SET_SETTINGS]: (s: State, data: any) => void;
  [MutationTypes.SET_APPBAR]: (s: State, data: any) => void;
  [MutationTypes.SET_BOTTOM_NAV]: (s: State, data: any) => void;
  [MutationTypes.TOGGLE_EDIT_MODE]: (s: State) => void;
};
