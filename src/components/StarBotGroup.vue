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
          <div
            class="icon-wrapper"
            :class="isEditMode ? 'shaking' : ''"
            @click="op(bot, ix)"
          >
            <v-avatar class="icon">
              <v-img :src="`/bots/${bot.id}/icon.png`" />
            </v-avatar>
          </div>
        </template>
        <div v-else class="icon-wrapper" @click="openAddPopup(ix)">
          <v-icon :color="isEditMode ? 'greyscale_4' : 'greyscale_5'">{{
            $icons.mdiPlus
          }}</v-icon>
        </div>
      </v-col>
    </v-row>

    <template v-if="curBot">
      <bot-info-popup v-model="infoModal" :bot="curBot" />
    </template>

    <f-bottom-sheet
      v-model="editModal"
      :adaptive="true"
      :title="'Edit'"
      wapper-in-desktop="dialog"
      content-class=""
    >
      <f-list>
        <f-list-item @click="viewBot()">
          <template #head>
            <v-icon>$FIconDocumentHelp</v-icon>
          </template>
          <template #body>
            <div class="body">{{ $t("bot.view_info") }}</div>
          </template>
          <template #tail>&nbsp;</template>
        </f-list-item>
        <f-list-item @click="removeBot()">
          <template #head>
            <v-icon color="error">$FIconCloseBold</v-icon>
          </template>
          <template #body>
            <div class="body error--text">{{ $t("bot.remove") }}</div>
          </template>
          <template #tail>&nbsp;</template>
        </f-list-item>
      </f-list>
    </f-bottom-sheet>

    <f-bottom-sheet
      v-model="addModal"
      :adaptive="true"
      :title="'Add'"
      wapper-in-desktop="dialog"
      content-class=""
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
import _ from "lodash";
import { bT } from "@/utils/fmt";
import { BOTS } from "~/bots";
import BotInfoPopup from "./BotInfoPopup.vue";

@Component({
  components: {
    BotInfoPopup,
  },
})
class StarBotGroup extends Vue {
  @Prop({ default: null }) group;
  @Prop({ default: 0 }) groupIdx;
  @Prop({ default: "" }) filterText;

  bT = bT;

  addModal = false;

  editModal = false;

  infoModal = false;

  addFilterText = "";

  curItemIdx = 0;

  curBot = null;

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

  get isEditMode() {
    return this.$store.getters["app/GET_EDIT_MODE"];
  }

  openAddPopup(ix) {
    this.curItemIdx = ix;
    this.addModal = true;
  }

  openEditPopup(ix) {
    this.curItemIdx = ix;
    this.editModal = true;
  }

  addBot(bot) {
    this.addModal = false;
    this.$store.commit("cache/SET_STAR_ITEM", {
      group_idx: this.groupIdx,
      item_idx: this.curItemIdx,
      item: bot.id,
    });
  }

  removeBot() {
    this.editModal = false;
    this.$store.commit("cache/SET_STAR_ITEM", {
      group_idx: this.groupIdx,
      item_idx: this.curItemIdx,
      item: null,
    });
  }

  viewBot() {
    console.log(this.curBot);
    this.infoModal = true;
    this.editModal = false;
  }

  op(bot, ix) {
    if (this.isEditMode) {
      this.curBot = bot;
      return this.openEditPopup(ix);
    }
    return this.isMixinMessenger ? this.openHome(bot) : this.openUrl(bot);
  }

  openUrl(bot) {
    window.open(bot.url);
  }

  openHome(bot) {
    window.open(`https://mixin.one/apps/${bot.client_id}?action=open`);
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
    .icon {
      transition: all 0.3s ease;
    }
    &.shaking {
      animation: shaking 0.3s infinite;
      .icon {
        box-shadow: 0 0 6px rgba(0, 0, 0, 0.08);
      }
    }
  }
}
.add-bot-list {
  overflow: auto;
  height: 70vh;
}

@keyframes shaking {
  0% {
    transform: rotate(0deg);
  }
  25% {
    transform: rotate(-3deg);
  }
  75% {
    transform: rotate(3deg) scale(1.01);
  }
  99.99% {
    transform: rotate(0deg);
  }
}
</style>
