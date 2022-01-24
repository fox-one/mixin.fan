<template>
  <v-toolbar class="bar" dense rounded outlined flat>
    <template v-if="!fullSearchBox">
      <v-toolbar-items>
        <v-btn
          text
          @click="chooseView('star')"
          :class="isStarActived ? 'primary--text' : 'greyscale_4--text'"
        >
          <v-icon size="16">$FIconStar4PFill</v-icon>
        </v-btn>
        <v-btn
          text
          @click="chooseView('bot')"
          :class="isBotActived ? 'primary--text' : 'greyscale_4--text'"
        >
          <v-icon small>{{ $icons.mdiRobotAngry }}</v-icon>
        </v-btn>
      </v-toolbar-items>

      <v-spacer />

      <v-toolbar-items v-if="isBotActived">
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

      <v-toolbar-items v-if="isStarActived">
        <v-btn
          v-if="isStarActived"
          text
          :ripple="false"
          @click="toggleEditMode"
        >
          <v-icon small :color="isEditMode ? 'blue' : 'primary'"
            >$FIconEdit4P</v-icon
          >
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
import { State } from "vuex-class";

@Component
class Toolbar extends Vue {
  @PropSync("view-mode", {}) bindViewMode;
  @PropSync("lang", {}) bindLang;
  @PropSync("filter-text", {}) bindFilterText;

  @State((state) => state.app.bottomNav.value) pageIndicator;

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
    return this.mode === "bot";
  }

  get isStarActived() {
    return this.mode === "star";
  }

  get isEditMode() {
    return this.$store.getters["app/GET_EDIT_MODE"];
  }

  mounted() {
    this.fullSearchBox = false;
    this.chooseView(this.pageIndicator || "bot");
  }

  toggleSearchBox() {
    if (!this.$vuetify.breakpoint.mdAndUp) {
      this.fullSearchBox = !this.fullSearchBox;
    }
  }

  chooseView(name) {
    this.bindViewMode = name;
    this.mode = name;
    this.$store.commit("app/SET_BOTTOM_NAV", name);
  }

  chooseLang(item) {
    this.bindLang = item.value;
    this.selectedLang = item;
  }

  toggleEditMode() {
    this.$store.commit("app/TOGGLE_EDIT_MODE");
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
