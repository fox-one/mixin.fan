import type { RootState } from "./types";
import type { ModuleTree } from "vuex";

import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";
import app from "./app";
import auth from "./auth";

export default function () {
  Vue.use(Vuex);

  const modules: ModuleTree<RootState> = {
    app,
    auth,
  };

  return new Vuex.Store({
    state: {},
    modules,
    plugins: [createPersistedState({ key: "vuex", paths: ["auth"] })],
  });
}
