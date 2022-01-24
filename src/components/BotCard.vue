<template>
  <div
    v-if="bot"
    class="bot d-flex"
    :class="
      $vuetify.breakpoint.mdAndUp ? 'align-begin' : 'align-center flex-column'
    "
    @click="popup(bot)"
  >
    <div
      class="icon-wrapper"
      :class="$vuetify.breakpoint.mdAndUp ? 'mr-4' : 'mb-1'"
    >
      <v-avatar size="44">
        <v-img
          height="44"
          width="44"
          :src="`/bots/${bot.id}/icon.png`"
          :alt="botName"
        />
      </v-avatar>
    </div>

    <div class="content">
      <div
        :class="
          $vuetify.breakpoint.mdAndUp
            ? 'body-2 font-weight-bold mb-1'
            : 'bot-caption-name caption text-center'
        "
      >
        {{ botName }}
      </div>

      <div
        v-if="$vuetify.breakpoint.mdAndUp"
        class="desc caption greyscale_3--text"
      >
        {{ botShortDesc }}
      </div>
    </div>

    <bot-info-popup v-model="modal" :bot="bot" />
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import { bT, $a, $span, $tag } from "@/utils/fmt";
import { CATS } from "~/bots";
import BotInfoPopup from "./BotInfoPopup.vue";

@Component({
  components: {
    BotInfoPopup,
  },
})
class BotCard extends Vue {
  @Prop({ default: null }) bot;

  modal = false;

  get isMixinMessenger() {
    return this.$utils.helper.isMixinMessenger();
  }

  get botName() {
    return bT(this.bot, "name");
  }

  get botShortDesc() {
    if (this.bot.text) {
      return bT(this.bot, "text")[0];
    }
    return "";
  }

  get tapToLaunch() {
    return this.$store.getters["app/GET_SETTINGS"].tap_to_launch;
  }

  popup(bot) {
    if (this.tapToLaunch) {
      return this.isMixinMessenger ? this.openHome(bot) : this.openUrl(bot);
    }
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
export default BotCard;
</script>

<style lang="scss" scoped>
.bot {
  overflow: hidden;
  max-height: 82px;
  .icon-wrapper {
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);
    border-radius: 99em;
    height: 44px;
  }
  .content {
    flex: 1;
    .bot-caption-name {
      line-height: 1rem;
    }
    .desc {
      line-height: 1.1rem;
    }
  }
  .detail {
    width: 100%;
    ::v-deep {
      .f-info-grid-item__content {
        font-weight: normal !important;
      }
      .tag {
        background: rgba(0, 0, 0, 0.08);
        border-radius: 6px;
        padding: 1px 3px;
      }
      .inline-icon {
        padding-top: 2px;
        margin-left: 2px;
        margin-bottom: -2px;
      }
    }
  }
}
</style>
