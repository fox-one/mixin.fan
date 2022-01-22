import type { RootState } from "./types";
import type { ModuleTree } from "vuex";

import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";
import app from "./app";
import auth from "./auth";
import cache from "./cache";

export default function () {
  Vue.use(Vuex);

  const modules: ModuleTree<RootState> = {
    app,
    auth,
    cache,
  };

  return new Vuex.Store({
    state: {},
    modules,
    plugins: [
      createPersistedState({
        key: "vuex",
        paths: ["auth", "app.settings", "app.bottomNav", "cache"],
      }),
    ],
  });
}
