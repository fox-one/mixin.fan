<template>
  <v-app>
    <default-app-bar />

    <v-main>
      <nuxt />
    </v-main>

    <modals />
  </v-app>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import DefaultAppBar from "./default/NavBar.vue";
import Modals from "./modals/index.vue";

@Component({
  components: {
    DefaultAppBar,
    Modals,
  },
})
class DefaultLayout extends Vue {
  mounted() {
    const groups = this.$store.getters["cache/GET_STAR_GROUPS"];
    if (groups === undefined || groups.length === 0) {
      this.$store.commit(
        "cache/SET_STAR_GROUPS",
        this.$utils.helper.buildDefaultStarGroups(),
      );
    }
    return groups;
  }
}
export default DefaultLayout;
</script>

<style lang="scss" scoped></style>
