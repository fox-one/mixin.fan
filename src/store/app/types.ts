export const AppModuleKey = "app/";

export type State = {
  dark: boolean;
  toast: APP.ToastState;
};

export enum MutationTypes {
  SET_TOAST = "SET_TOAST",
}

export type Mutations = {
  [MutationTypes.SET_TOAST]: (s: State, data: Partial<APP.ToastState>) => void;
};
