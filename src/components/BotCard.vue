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

    <f-bottom-sheet
      v-model="modal"
      :adaptive="true"
      :title="botName"
      wapper-in-desktop="dialog"
      content-class="bot"
    >
      <f-bottom-sheet-subtitle class="pt-0">
        <div class="d-flex flex-column align-center">
          <v-avatar size="48" class="mb-2">
            <img :src="`/bots/${bot.id}/icon.png`" />
          </v-avatar>
          <div class="caption mb-2">{{ bot.id }}</div>
          <div
            class="body-2 text-center greyscale_3--text mb-4"
            v-html="botDesc.join('<br />')"
          ></div>
          <div class="detail">
            <f-info-grid>
              <f-info-grid-item
                v-for="(item, ix) in detailItems"
                :key="ix"
                :index="ix"
                :title="item.title"
                :value="item.value"
                :value-unit="item.valueUnit"
                :color="item.valueColor"
                :hint="item.hint"
                :reverse="false"
              />
            </f-info-grid>
          </div>
        </div>
      </f-bottom-sheet-subtitle>

      <v-sheet v-if="isMixinMessenger">
        <div v-if="bot" class="buttons pa-4">
          <f-button
            color="primary"
            large
            block
            @click="openHome(bot)"
            class="mb-4"
            >{{ $t("bot.visit") }}</f-button
          >
          <f-button color="subtitle" large block @click="openProfile(bot)">
            {{ $t("bot.profile") }}
          </f-button>
        </div>
      </v-sheet>

      <v-sheet v-else>
        <div class="buttons pa-4">
          <f-button
            v-if="bot.url"
            large
            color="primary"
            block
            @click="openUrl(bot)"
            >{{ $t("bot.visit_website") }}</f-button
          >
          <div v-else class="body-2 text-center">
            {{ $t("hint.run_bot_in_mixin", { bot: bot.id }) }}
          </div>
        </div>
      </v-sheet>
    </f-bottom-sheet>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import { bT, $a, $span, $tag } from "@/utils/fmt";
import { CATS } from "~/bots";

@Component
class BotCard extends Vue {
  @Prop({ default: null }) bot;

  modal = false;

  get isMixinMessenger() {
    return this.$utils.helper.isMixinMessenger();
  }

  get catMap() {
    const m = new Map();
    for (let ix = 0; ix < CATS.length; ix++) {
      const c = CATS[ix];
      m.set(c.id, c);
    }
    return m;
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

  get botDesc() {
    if (this.bot.text) {
      return bT(this.bot, "text");
    }
    return [""];
  }

  get botCategory() {
    if (this.bot.category) {
      return bT(this.catMap.get(this.bot.category), "name");
    }
    return "";
  }

  get detailItems() {
    let ret = [
      {
        title: this.$t("bot.detail.category"),
        value: this.botCategory,
      },
      {
        title: this.$t("bot.detail.tags"),
        value: this.$createElement("span", {}, [
          bT(this.bot, "tags").map((x) => {
            return $tag(this, x);
          }),
        ]),
      },
      {
        title: this.$t("bot.detail.languages"),
        value: this.bot.languages
          .map((x) => {
            return this.$t(`lang.${x}`);
          })
          .join(", "),
      },
    ];

    if (this.bot.website || this.bot.support_url) {
      const value = this.$createElement("div", {}, [
        this.bot.website
          ? $a(this, this.$t("bot.detail.website"), this.bot.website)
          : null,
        this.bot.support_url ? ", " : "",
        this.bot.support_url
          ? $a(this, this.$t("bot.detail.support_url"), this.bot.support_url)
          : null,
      ]);
      ret.push({
        title: this.$t("bot.detail.url"),
        value: value,
      });
    }

    if (this.bot.developer) {
      let value = null;
      if (this.bot.developer.url) {
        value = $a(this, this.bot.developer.name, this.bot.developer.url);
      } else {
        value = $span(this, this.bot.developer.name);
      }
      ret.push({
        title: this.$t("bot.detail.developer"),
        value: value,
      });
    }

    if (this.bot.mtg) {
      ret.push({
        title: this.$t("bot.detail.mtg"),
        value: `${this.bot.mtg.threshold}/${this.bot.mtg.members.length}`,
      });
    }

    if (this.bot.mvm) {
      ret.push({
        title: this.$t("bot.detail.mvm"),
        value: this.$createElement("a", {
          domProps: {
            href: this.bot.mvm.contract_url,
            target: "_blank",
            innerText: "Contact Addr",
          },
        }),
      });
    }

    return ret;
  }

  get tapToLaunch() {
    return this.$store.getters["app/GET_SETTINGS"].tap_to_launch;
  }

  popup(bot) {
    console.log(this.tapToLaunch);
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
