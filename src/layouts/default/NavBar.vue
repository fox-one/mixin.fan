<template>
  <f-app-bar app custom-content>
    <v-toolbar-title class="headline text-uppercase">
      <span>Vuetify</span>
      <span class="font-weight-light">MATERIAL DESIGN</span>
    </v-toolbar-title>

    <v-spacer />

    <v-btn
      text
      href="https://github.com/vuetifyjs/vuetify/releases/latest"
      target="_blank"
    >
      <span class="mr-2">Latest Release</span>
    </v-btn>
  </f-app-bar>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
class DefaultAppBar extends Vue {}
export default DefaultAppBar;
</script>
