<template>
  <v-toolbar class="bar" dense rounded outlined flat>
    <template v-if="!fullSearchBox">
      <v-toolbar-items>
        <v-btn text @click="chooseView('bot')" :class="isBotActived">
          <v-icon small>{{ $icons.mdiRobotAngry }}</v-icon>
        </v-btn>
        <!-- <v-btn text @click="chooseView('group')" :class="isGroupActived">
          <v-icon small>{{ $icons.mdiAccountGroup }}</v-icon>
        </v-btn> -->
      </v-toolbar-items>

      <v-spacer />

      <v-toolbar-items>
        <v-menu offset-y>
          <template v-slot:activator="{ on, attrs }">
            <v-btn v-bind="attrs" v-on="on" text :ripple="false">
              <v-icon small>{{ $icons.mdiTranslate }}</v-icon>
              <span v-if="selectedLang && selectedLang.value" class="caption">{{
                selectedLang.label
              }}</span>
            </v-btn>
          </template>
          <v-list>
            <v-list-item
              v-for="(item, index) in languageItems"
              :key="index"
              @click="chooseLang(item)"
            >
              <v-list-item-title>{{ item.label }}</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>

        <v-divider vertical />

        <template v-if="$vuetify.breakpoint.mdAndUp">
          <f-search-input
            class="search-box"
            dense
            clearable
            block
            height="48"
            placeholder="Search"
            :hide-details="true"
            v-model="bindFilterText"
          />
        </template>
        <v-btn v-else text @click="toggleSearchBox">
          <v-icon small>{{ $icons.mdiMagnify }}</v-icon>
        </v-btn>
      </v-toolbar-items>
    </template>
    <template v-else>
      <v-toolbar-items>
        <f-search-input
          class="search-box"
          dense
          clearable
          block
          placeholder="Search"
          :hide-details="true"
          height="48"
          v-model="bindFilterText"
        />
      </v-toolbar-items>
      <v-spacer />

      <v-toolbar-items>
        <v-btn text @click="toggleSearchBox">
          <v-icon small color="blue">{{ $icons.mdiMagnify }}</v-icon>
        </v-btn>
      </v-toolbar-items>
    </template>
  </v-toolbar>
</template>

<script lang="ts">
import { Component, Vue, Watch, PropSync } from "vue-property-decorator";

@Component
class Toolbar extends Vue {
  @PropSync("view-mode", {}) bindViewMode;
  @PropSync("lang", {}) bindLang;
  @PropSync("filter-text", {}) bindFilterText;

  selectedLang = null;

  modal = false;

  mode = "bot";

  fullSearchBox = false;

  get languageItems() {
    return [
      {
        label: "All",
        value: "",
      },
      {
        label: this.$t("lang.en"),
        value: "en",
      },
      {
        label: this.$t("lang.ja"),
        value: "ja",
      },
      {
        label: this.$t("lang.es"),
        value: "es",
      },
      {
        label: this.$t("lang.de"),
        value: "de",
      },
      {
        label: this.$t("lang.zh"),
        value: "zh",
      },
      {
        label: this.$t("lang.ko"),
        value: "ko",
      },
    ];
  }

  get isBotActived() {
    return this.mode === "bot" ? "primary--text" : "greyscale_4--text";
  }

  get isGroupActived() {
    return this.mode === "group" ? "primary--text" : "greyscale_4--text";
  }

  mounted() {
    this.fullSearchBox = false;
  }

  toggleSearchBox() {
    if (!this.$vuetify.breakpoint.mdAndUp) {
      this.fullSearchBox = !this.fullSearchBox;
    }
  }

  chooseView(name) {
    this.bindViewMode = name;
    this.mode = name;
  }

  chooseLang(item) {
    this.bindLang = item.value;
    this.selectedLang = item;
  }
}
export default Toolbar;
</script>

<style lang="scss" scoped>
.bar {
  ::v-deep {
    .v-toolbar__content {
      padding-left: 0;
      padding-right: 0;
      padding-bottom: 2px;
    }
  }
  .search-box {
    ::v-deep {
      .v-input__slot {
        background: transparent !important;
      }
      .v-input__prepend-inner,
      .v-input__append-inner {
        margin-top: 12px !important;
      }
    }
  }
}
</style>
