import { AppModuleKey, MutationTypes } from "@/store/app/types";

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
