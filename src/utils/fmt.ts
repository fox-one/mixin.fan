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
  return vm.$createElement("a", {
    domProps: {
      href: url,
      target: "_blank",
      innerText: text,
    },
  });
}

export function $span(vm, text) {
  return vm.$createElement("span", {
    domProps: {
      innerText: text,
    },
  });
}
