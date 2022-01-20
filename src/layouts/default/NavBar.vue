<template>
  <f-app-bar app custom-content flat color="white">
    <v-spacer />
    <v-toolbar-title class="text-center">
      <div class="body-1">
        <span class="font-weight-bold">Mixin</span
        ><span class="font-weight-light">.fan</span>
      </div>
    </v-toolbar-title>
    <v-spacer />
  </f-app-bar>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
class DefaultAppBar extends Vue {}
export default DefaultAppBar;
</script>

<style lang="scss" scoped>
.desc {
  margin-top: -4px;
}
</style>
