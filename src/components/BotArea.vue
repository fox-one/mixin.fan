<template>
  <div class="bots-area">
    <div class="bots mb-10">
      <template v-if="viewModeCat">
        <div
          class="bots-group mb-4"
          v-for="group in botsInGroup"
          :key="group.title"
        >
          <v-subheader class="px-0">{{ group.title }}</v-subheader>
          <v-row>
            <v-col
              cols="3"
              md="4"
              lg="3"
              v-for="bot in group.items"
              :class="!$vuetify.breakpoint.mdAndUp ? 'pa-2' : ''"
              :key="bot.client_id"
            >
              <bot-card :bot="bot" />
            </v-col>
          </v-row>
        </div>
      </template>
    </div>

    <div class="submit-apps text-center pa-0">
      <div class="bg-image"></div>
      <div class="submit-apps-content pa-8">
        <div class="title mb-4">{{ $t("bot.add_dapp.title") }}</div>
        <div class="body-2 greyscale_3--text mb-4">
          {{ $t("bot.add_dapp.text") }}
        </div>
        <div class="buttons">
          <a
            href="https://github.com/fox-one/mixin.fan"
            title="submit your applications"
          >
            <f-button color="primary" large>
              <span class="">{{ $t("bot.add_dapp") }}</span>
            </f-button>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import { CATS, BOTS } from "~/bots";
import BotCard from "@/components/BotCard.vue";
import _ from "lodash";
import { bT } from "@/utils/fmt";

@Component({
  components: {
    BotCard,
  },
})
class BotsArea extends Vue {
  @Prop({ default: 1 }) viewMode;
  @Prop({ default: "" }) filterText;
  @Prop({ default: "" }) lang;

  modal = false;

  curBot = null;

  addBotModal = false;

  get viewModeCat() {
    return this.viewMode === "bot";
  }

  get formalizedFitlerText() {
    return this.filterText ? this.filterText.toLowerCase() : "";
  }

  get bots() {
    let ret = BOTS;
    if (this.formalizedFitlerText.trim().length !== 0) {
      ret = BOTS.filter((bot: any) => {
        if (bT(bot, "name").toLowerCase().includes(this.formalizedFitlerText)) {
          return true;
        }
        return false;
      });
    }

    if (this.lang !== "") {
      ret = ret.filter((bot: any) => {
        if (bot.languages.includes(this.lang)) {
          return true;
        }
        return false;
      });
    }
    return ret;
  }

  get catMap() {
    const m = new Map();
    for (let ix = 0; ix < CATS.length; ix++) {
      const c = CATS[ix];
      m.set(c.id, c);
    }
    return m;
  }

  get botsInGroup() {
    const groups: any = {};
    for (let ix = 0; ix < this.bots.length; ix++) {
      const bot = this.bots[ix];
      if (!groups[bot.category]) {
        const groupTitle =
          this.getGroupTitle(this.catMap.get(bot.category)) || bot.category;
        groups[bot.category] = {
          id: bot.category,
          title: groupTitle,
          items: [],
        };
      }
      groups[bot.category].items.push(bot);
    }
    // sort the groups
    const arr = Object.values(groups);
    arr.sort((a: any, b: any) => {
      if (a.title < b.title) {
        return -1;
      }
      if (a.title > b.title) {
        return 1;
      }
      return 0;
    });
    console.log(arr);
    return arr;
  }

  get isMixinMessenger() {
    return this.$utils.helper.isMixinMessenger();
  }

  getGroupTitle(obj) {
    return bT(obj, "name");
  }

  popup(bot) {
    this.curBot = bot;
    this.modal = true;
  }

  openUrl(bot) {
    window.open(bot.url);
  }

  openHome(bot) {
    window.open(`https://mixin.one/apps/${bot.client_id}?action=open`);
  }

  openProfile(bot) {
    window.open(`https://mixin.one/apps/${bot.client_id}`);
  }
}
export default BotsArea;
</script>

<style lang="scss" scoped>
.bots-area {
}
.bot {
  display: flex;
  cursor: pointer;
  .icon-wrapper {
  }
}
.submit-apps {
  padding: 20px;
  max-width: 1280px;
  padding-top: 0;
  padding-bottom: 0;
  position: relative;
  .bg-image {
    background: transparent url(@/assets/images/submit-apps-bg.png) no-repeat
      50%;
    background-size: auto;
    background-size: cover;
    height: 100%;
    width: 100vw;
    position: absolute;
    display: block;
    content: " ";
    left: 50%;
    transform: translateX(-50%);
    z-index: 0;
  }
  .submit-apps-content {
    transform: translateX(0);
  }
}
</style>
