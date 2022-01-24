<template>
  <v-container>
    <toolbar
      :lang.sync="selectedLang"
      :filter-text.sync="filterText"
      :view-mode.sync="viewMode"
    />

    <star-bot-area v-if="viewModeStar" />

    <bot-area
      v-else
      :view-mode="viewMode"
      :filter-text="filterText"
      :lang="selectedLang"
    />
  </v-container>
</template>

<script lang="ts">
import { Component, Mixins } from "vue-property-decorator";
import BotArea from "@/components/BotArea.vue";
import StarBotArea from "@/components/StarBotArea.vue";
import Toolbar from "@/components/Toolbar.vue";
import mixins from "@/mixins";

@Component({
  components: {
    StarBotArea,
    BotArea,
    Toolbar,
  },
})
class IndexPage extends Mixins(mixins.page) {
  selectedLang = "";
  filterText = "";
  viewMode = "bot";

  get title() {
    return "Mixin.fan";
  }

  get viewModeStar() {
    return this.viewMode === "star";
  }

  mounted() {
    // this.$store.commit(AuthModuleKey + MutationTypes.SET_TOKEN, "sadf");
  }
}
export default IndexPage;
</script>

<style lang="scss" scoped></style>
