export const isProduct = process.env.APP_ENV === "prod";

export const GA = "UA-112996081-18";

export const API_BASE = "";

export const CONFIG = {
  MIXIN_CLIENT_ID: "",

  OAUTH_BASE: process.env.OAUTH_BASE || "https://mixin.one/oauth/authorize",

  MIXIN_API_BASE: "https://api.mixin.one",
};

export const MAX_STAR_GROUP_COUNT = 16;
