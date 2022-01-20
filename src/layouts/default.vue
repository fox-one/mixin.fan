<template>
  <v-app>
    <default-app-bar />

    <v-main>
      <nuxt />
      <div class="footer greyscale_3--text text-center pa-4">
        <div class="caption">The listings portal for Mixin Ecosystem.</div>
        <div class="caption copyright">©2022, Pando.im</div>
      </div>
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
class DefaultLayout extends Vue {}
export default DefaultLayout;
</script>

<style lang="scss" scoped></style>
