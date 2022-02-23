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
              :class="!$vuetify.breakpoint.mdAndUp ? 'py-2 px-2' : ''"
              :key="bot.client_id"
            >
              <bot-card :bot="bot" />
            </v-col>
          </v-row>
        </div>
      </template>
    </div>

    <div class="submit-apps text-center pa-0">
      <div class="submit-apps-content pa-4">
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
        const cat = this.catMap.get(bot.category);
        if (cat) {
          const groupTitle = this.getGroupTitle(cat);
          groups[bot.category] = {
            id: bot.category,
            title: groupTitle,
            items: [],
          };
        } else {
          continue;
        }
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
    return arr;
  }

  get isMixinMessenger() {
    return this.$utils.helper.isMixinMessenger();
  }

  getGroupTitle(obj) {
    return bT(obj, "name");
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
}
.submit-apps {
  padding: 10px 20px;
  position: relative;
  .submit-apps-content {
    transform: translateX(0);
    border: 2px dashed #aaa;
  }
}
</style>
