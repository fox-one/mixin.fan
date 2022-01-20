/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable prefer-promise-reject-errors */
import { NuxtAppOptions } from "@nuxt/types";
import createApis from "./apis/index";
import Http from "@/services/http";
import { API_BASE } from "@/constants";

function generateStructureInterceptor(app: NuxtAppOptions) {
  return [
    (res) => {
      if (res?.data?.code) {
        return Promise.reject(res.data);
      }
      return res.data;
    },
    (error) => {
      if (error?.response?.data) {
        const status = error.response.status;
        if (status === 401) {
          app.store!.dispatch("auth/logout");
        }
        const { code, message } = error.response.data;
        return Promise.reject({ code, message });
      } else {
        return Promise.reject(error);
      }
    },
  ];
}

function generateAuthInterceptor(app: NuxtAppOptions) {
  return [
    (configs) => {
      const token = app.store!.getters["auth/getToken"];
      if (token) {
        configs.headers.Authorization = `Bearer ${token}`;
      }
      return configs;
    },
    () => {},
  ];
}

export default function createApiSerivce(app: NuxtAppOptions) {
  const http = new Http(
    { baseURL: API_BASE },
    [generateAuthInterceptor(app)],
    [generateStructureInterceptor(app)],
  );
  return createApis(http);
}
