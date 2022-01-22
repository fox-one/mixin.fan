import zh from "vuetify/es5/locale/zh-Hans";
import en from "vuetify/es5/locale/en";
import ja from "vuetify/es5/locale/ja";

import UIKit from "@foxone/uikit";
import { mergeDeep } from "vuetify/lib/util/helpers";

import { FIconMenuBold, FIconStar4PFill } from "@foxone/icons";

export default function ({ store }) {
  const isDark = store.state.app?.dark || false;

  const opts = mergeDeep(UIKit.preset, {
    icons: {
      iconfont: "mdiSvg" as const,
      values: {
        FIconMenuBold: { component: FIconMenuBold },
        FIconStar4PFill: { component: FIconStar4PFill },
      },
    },
    theme: {
      dark: isDark,
      options: {
        customProperties: true,
      },
      themes: {
        light: {
          primary: "#000",
          accent: "#ee4596",
        },
        dark: {
          primary: "#3183FF",
          accent: "#f16aab",
        },
      },
    },
    lang: {
      locales: {
        zh: {
          ...zh,
        },
        en: {
          ...en,
        },
        ja: {
          ...ja,
        },
      },
    },
  });
  return opts;
}
