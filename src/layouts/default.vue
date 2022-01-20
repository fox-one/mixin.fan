<template>
  <v-app>
    <default-app-bar />

    <v-content>
      <nuxt />
    </v-content>

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
class DefaultLayout extends Vue {}
export default DefaultLayout;
</script>

<style lang="scss" scoped></style>
