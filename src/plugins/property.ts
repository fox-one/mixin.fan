import { Plugin } from "@nuxt/types";
import createApiService from "~/services/create";
import utils from "@/utils";

declare module "vue/types/vue" {
  interface Vue {
    $utils: typeof utils;
    $apis: ReturnType<typeof createApiService>;
  }
}

declare module "@nuxt/types" {
  interface NuxtAppOptions {
    $utils: typeof utils;
    $apis: ReturnType<typeof createApiService>;
  }
}

declare module "vuex/types/index" {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface Store<S> {
    $utils: typeof utils;
    $apis: ReturnType<typeof createApiService>;
  }
}

const plugin: Plugin = ({ app }, inject) => {
  inject("apis", createApiService(app));
  inject("utils", utils);
};

export default plugin;
