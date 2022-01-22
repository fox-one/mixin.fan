<template>
  <div v-if="group" class="bot-group pa-2">
    <div class="caption text-center">{{ group.title }}</div>
    <v-row :no-gutters="true">
      <v-col
        v-for="(bot, ix) in group.items"
        cols="6"
        class="text-center py-2 px-2"
        :key="ix"
      >
        <template v-if="bot">
          <div class="icon-wrapper">
            <v-avatar>
              <v-img :src="`/bots/${bot.id}/icon.png`" />
            </v-avatar>
          </div>
        </template>
        <div v-else class="icon-wrapper" @click="openAddPopup(ix)">
          <v-icon color="greyscale_4">{{ $icons.mdiPlus }}</v-icon>
        </div>
      </v-col>
    </v-row>
    <f-bottom-sheet
      v-model="modal"
      :adaptive="true"
      :title="'Add'"
      wapper-in-desktop="dialog"
      content-class="bot"
    >
      <f-bottom-sheet-subtitle class="pt-0">
        <f-search-input v-model="addFilterText" :hide-details="true" />
      </f-bottom-sheet-subtitle>
      <div class="add-bot-list">
        <f-list>
          <f-list-item
            v-for="(bot, ix) in availableBots"
            :key="`bot-${ix}`"
            :title="bT(bot, 'name')"
            :subtitle="bot.id"
            @click="addBot(bot)"
          >
            <template #head>
              <v-avatar size="32">
                <v-img
                  width="32"
                  height="32"
                  :src="`/bots/${bot.id}/icon.png`"
                ></v-img>
              </v-avatar>
            </template>
          </f-list-item>
        </f-list>
      </div>
    </f-bottom-sheet>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import BotCard from "@/components/BotCard.vue";
import _ from "lodash";
import { bT } from "@/utils/fmt";
import { CATS, BOTS } from "~/bots";

@Component({
  components: {
    BotCard,
  },
})
class StarBotGroup extends Vue {
  @Prop({ default: null }) group;
  @Prop({ default: 0 }) groupIdx;
  @Prop({ default: "" }) filterText;

  bT = bT;

  modal = false;

  addFilterText = "";

  curItemIdx = 0;

  get formalizedFitlerText() {
    return this.filterText ? this.filterText.toLowerCase() : "";
  }

  get availableBots() {
    let ret = BOTS;
    if (this.addFilterText.trim().length !== 0) {
      ret = BOTS.filter((bot: any) => {
        if (bT(bot, "name").toLowerCase().includes(this.addFilterText)) {
          return true;
        }
        return false;
      });
    }

    return ret;
  }

  get starBotsInGroup() {
    return {
      title: "Group 1",
      items: [null, null, null, null],
    };
  }

  get isMixinMessenger() {
    return this.$utils.helper.isMixinMessenger();
  }

  openAddPopup(ix) {
    this.curItemIdx = ix;
    this.modal = true;
  }

  getGroupTitle(obj) {
    return bT(obj, "name");
  }

  addBot(bot) {
    // add bot to selected location
    this.modal = false;
    this.$store.commit("cache/SET_STAR_ITEM", {
      group_idx: this.groupIdx,
      item_idx: this.curItemIdx,
      item: bot.id,
    });
  }
}
export default StarBotGroup;
</script>

<style lang="scss" scoped>
.bot-group {
  background: rgba(0, 0, 0, 0.02);
  border-radius: 8px;
  .icon-wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 64px;
    cursor: pointer;
  }
}
.add-bot-list {
  overflow: auto;
  height: 70vh;
}
</style>
