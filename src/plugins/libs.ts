import Vue from "vue";
import Uikit from "@foxone/uikit";
import VueGtag from "vue-gtag";
import { GA } from "@/constants";

export default ({ app }) => {
  Vue.use(Uikit);

  Vue.use(
    VueGtag,
    {
      config: { id: GA },
    },
    app.router,
  );
};
