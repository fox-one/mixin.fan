import Vue from "vue";
import Uikit from "@foxone/uikit";
import VueGtag from "vue-gtag";
import { GA } from "@/constants";

// styles
import "@foxone/uikit/build/index.min.css";

export default ({ app }) => {
  Vue.use(Uikit);
  Vue.use(Uikit.Toast, app.vuetify, {
    // Toast global options
    top: false,
    centered: true,
  });
  Vue.use(Uikit.Dialog, app.vuetify, {
    // Dialog global options
    flat: true,
  });

  Vue.use(
    VueGtag,
    {
      config: { id: GA },
    },
    app.router,
  );
};
