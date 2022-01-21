import { VIcon } from "vuetify/lib";
import { FIconLink4P } from "@foxone/icons";

export function bT(obj: any, field: string) {
  const defaultLocale = obj.language || "en";
  let locale = navigator.language.toLowerCase() || defaultLocale;
  if (locale.length > 2) {
    locale = locale.substr(0, 2);
  }
  if (obj[field][locale]) {
    return obj[field][locale];
  }
  return obj[field][defaultLocale];
}

export function $a(vm, text, url) {
  return vm.$createElement("span", {}, [
    vm.$createElement("a", {
      domProps: {
        href: url,
        target: "_blank",
        innerText: text,
      },
    }),
    vm.$createElement(FIconLink4P, {
      style: {
        "padding-top": "2px",
        "margin-left": "2px",
        "margin-bottom": "-2px",
      },
    }),
  ]);
}

export function $span(vm, text) {
  return vm.$createElement("span", {
    domProps: {
      innerText: text,
    },
  });
}

export function $tag(vm, text) {
  return vm.$createElement("span", {
    domProps: {
      className: "tag caption mr-1",
      innerText: text,
    },
  });
}
