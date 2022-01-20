export const CATS = [
  {
    id: "publishing",
    name: {
      en: "Publishing",
      zh: "内容出版",
    },
  },
  {
    id: "wallet",
    name: {
      en: "Wallet",
      zh: "钱包",
    },
  },
  {
    id: "exchange",
    name: {
      en: "Exchange",
      zh: "交易",
    },
  },
  {
    id: "fi",
    name: {
      en: "DeFi",
      zh: "去中心化金融",
    },
  },
];

export const BOTS = ((ctx) => {
  const values = ctx.keys().map(ctx);
  // const ret = keys.reduce((o, k, i) => {
  //   o[values[i].id] = values[i];
  //   return o;
  // }, {});
  return values;
})((require as any).context("./static/bots/", true, /\.json$/));
