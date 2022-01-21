import { MutationTypes, GetterTypes } from "./types";

import type { MutationTree, GetterTree } from "vuex";
import type { State, Mutations } from "./types";

const state = (): State => ({
  dark: false,
  toast: {
    show: false,
    message: "",
    color: "info",
  },
  appbar: {
    title: "",
    style: "",
    show: true,
    back: true,
    flat: true,
    color: "",
  },
  settings: {
    tap_to_launch: false,
  },
});

const getters: GetterTree<State, Record<string, any>> = {
  [GetterTypes.GET_SETTINGS](state) {
    return state.settings;
  },
};

const mutations: MutationTree<State> & Mutations = {
  [MutationTypes.SET_TOAST](
    state,
    { message = "", color = "info", show = true },
  ) {
    state.toast.show = show;
    state.toast.message = message;
    state.toast.color = color;
  },
  [MutationTypes.SET_APPBAR](state, value) {
    const defaultValue = {
      title: "",
      style: "",
      show: true,
      back: true,
      flat: true,
      color: "",
    };
    state.appbar = { ...defaultValue, ...value };
  },
  [MutationTypes.SET_SETTINGS](state, { tap_to_launch = false }) {
    state.settings.tap_to_launch = tap_to_launch;
  },
};

export default { namespaced: true, state, mutations, getters };
