<template>
  <v-container>
    <toolbar
      :lang.sync="selectedLang"
      :filter-text.sync="filterText"
      :view-mode.sync="viewMode"
    />
    <bot-area
      :view-mode="viewMode"
      :filter-text="filterText"
      :lang="selectedLang"
    />
  </v-container>
</template>

<script lang="ts">
import { Component, Mixins } from "vue-property-decorator";
import { AuthModuleKey, MutationTypes } from "@/store/auth/types";
import BotArea from "@/components/BotArea.vue";
import Toolbar from "@/components/Toolbar.vue";
import mixins from "@/mixins";

@Component({
  components: {
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

  mounted() {
    this.$store.commit(AuthModuleKey + MutationTypes.SET_TOKEN, "sadf");
  }
}
export default IndexPage;
</script>

<style lang="scss" scoped></style>
