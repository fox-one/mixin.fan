import type { GetterTree, MutationTree } from "vuex";
import type { State, Mutations } from "./types";
import type { RootState } from "../types";

import { GetterTypes, MutationTypes } from "./types";

const state = (): State => ({
  token: "",
});

const getters: GetterTree<State, RootState> = {
  [GetterTypes.IS_LOGGED](state) {
    return Boolean(state.token);
  },
};

export const mutations: MutationTree<State> & Mutations = {
  [MutationTypes.SET_TOKEN](state, token) {
    state.token = token;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
};
