import { AppModuleKey, MutationTypes } from "@/store/app/types";
import { CONFIG, MAX_STAR_GROUP_COUNT } from "~/constants";

import BigNumber from "bignumber.js";
import Bridge from "@foxone/mixin-sdk-jsbridge";
import Base64 from "./base64";

import { v4 as uuid } from "uuid";

export const bridge = new Bridge({
  client_id: CONFIG.MIXIN_CLIENT_ID,
});

export function errorHandler(
  vue: Vue,
  error: { message?: string; msg?: string; code: string | number },
) {
  const fallback = "Unknown error";
  const message = `${error.code || ""} ${
    error.message || error.msg || fallback
  }`;
  toast(vue, { message, color: "error" });
}

export function toast(vue: Vue, data: { message: string; color?: string }) {
  vue.$store.commit(AppModuleKey + MutationTypes.SET_TOAST, data);
}

export function loadMixinTheme() {
  bridge.reloadTheme();
}

export function isMixinMessenger() {
  return bridge.isMixin;
}

export function getToken(store) {
  return store.getters["auth/getToken"];
}

export function getLocale() {
  let locale = "en";
  const supportedLocales = ["ja", "zh", "ko"];
  for (let ix = 0; ix < supportedLocales.length; ix++) {
    const l = supportedLocales[ix];
    if (navigator.language.includes(l)) {
      locale = l;
      break;
    }
  }
  return locale;
}

export function genPaymentUrl(data: {
  recipient: string;
  assetId: string;
  amount: string;
  traceId: string;
  memo: string;
}) {
  const { recipient, assetId, amount, traceId, memo } = data;
  return `mixin://pay?recipient=${recipient}&asset=${assetId}&amount=${amount}&trace=${traceId}&memo=${memo}`;
}

export function requestLogin(vue, norequest = false) {
  const host = window.location.origin;
  const redirectUrl = encodeURIComponent(host + "/#/auth");
  let path = `${CONFIG.OAUTH_BASE}/?client_id=${CONFIG.MIXIN_CLIENT_ID}&scope=PROFILE:READ+ASSETS:READ&response_type=code`;
  path += `&redirect_url=${redirectUrl}`;
  if (norequest) {
    return path;
  } else {
    window.location.href = path;
  }
}

export async function logout(vue) {
  if (vue.store) {
    await vue.store.dispatch("auth/logout");
  }
}

export function isDarkTheme() {
  try {
    const context = bridge.getContext();
    if (context?.appearance) {
      return context.appearance === "dark";
    }
  } catch (error) {}

  return window.matchMedia?.("(prefers-color-scheme: dark)").matches ?? false;
}

export function getUrlQuery() {
  const url = new URL(window.location.href);
  const ret: Record<string, any> = {};
  const it = (url.searchParams as any).entries();
  for (const pair of it) {
    ret[pair[0]] = pair[1];
  }
  return ret;
}

export function isMobile() {
  return /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
}

export function buildDefaultStarGroups() {
  const ret: any = [];
  for (let ix = 0; ix < MAX_STAR_GROUP_COUNT; ix++) {
    ret.push({
      title: `#${ix + 1}`,
      used: 0,
      items: [null, null, null, null],
    });
  }
  return ret;
}
