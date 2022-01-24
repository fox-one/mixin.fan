export const AppModuleKey = "app/";

export type State = {
  starGroups: any;
};

export enum MutationTypes {
  SET_STAR_GROUPS = "SET_STAR_GROUPS",
  SET_STAR_ITEM = "SET_STAR_ITEM",
}

export enum GetterTypes {
  GET_STAR_GROUPS = "GET_STAR_GROUPS",
}

export type Mutations = {
  [MutationTypes.SET_STAR_GROUPS]: (s: State, data: any) => void;
  [MutationTypes.SET_STAR_ITEM]: (s: State, data: any) => void;
};
