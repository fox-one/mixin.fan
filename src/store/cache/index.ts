import { MutationTypes, GetterTypes } from "./types";

import type { MutationTree, GetterTree } from "vuex";
import type { State, Mutations } from "./types";
import { MAX_STAR_GROUP_COUNT } from "@/constants";

const MAX_ITEM_IDX = 4;

const state = (): State => ({
  starGroups: [],
});

const getters: GetterTree<State, Record<string, any>> = {
  [GetterTypes.GET_STAR_GROUPS](state) {
    return state.starGroups;
  },
};

const mutations: MutationTree<State> & Mutations = {
  [MutationTypes.SET_STAR_GROUPS](state, groups) {
    state.starGroups = groups;
  },
  [MutationTypes.SET_STAR_ITEM](state, { group_idx, item_idx, item }) {
    if (group_idx > MAX_STAR_GROUP_COUNT || item_idx > MAX_ITEM_IDX) {
      return;
    }
    if (state.starGroups.length < group_idx + 1) {
      return;
    }
    if (state.starGroups[group_idx]?.items.length < item_idx + 1) {
      return;
    }
    const items = state.starGroups[group_idx].items.slice();
    items.splice(item_idx, 1, item);
    const g = state.starGroups[group_idx];
    g.items = items;
    state.starGroups.splice(group_idx, 1, g);
  },
};

export default { namespaced: true, state, mutations, getters };
