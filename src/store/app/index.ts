import { MutationTypes } from "./types";

import type { MutationTree } from "vuex";
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
  config: {
    quick_launch: false,
  },
});

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
  [MutationTypes.SET_CONFIG](state, { quick_launch = false }) {
    state.config.quick_launch = quick_launch;
  },
};

export default { namespaced: true, state, mutations };
