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
    id: "financial",
    name: {
      en: "Financial",
      zh: "金融",
    },
  },
  {
    id: "social",
    name: {
      en: "Social",
      zh: "社交",
    },
  },
  {
    id: "game",
    name: {
      en: "Game",
      zh: "游戏",
    },
  },
  {
    id: "entertainment",
    name: {
      en: "Entertainment",
      zh: "娱乐",
    },
  },
  {
    id: "shopping",
    name: {
      en: "Shopping",
      zh: "电商",
    },
  },
  {
    id: "news",
    name: {
      en: "News",
      zh: "新闻资讯",
    },
  },
  {
    id: "util",
    name: {
      en: "Utilities",
      zh: "工具",
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
