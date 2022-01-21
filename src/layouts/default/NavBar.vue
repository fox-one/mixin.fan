<template>
  <f-app-bar app custom-content flat color="white">
    <settings />
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
import { FIconMenuBold } from "@foxone/icons";
import Settings from "@/components/Settings.vue";
@Component({
  components: {
    Settings,
  },
})
class DefaultAppBar extends Vue {
  // settingIcon = this.$createElement(FIconMenuBold, {});
}
export default DefaultAppBar;
</script>

<style lang="scss" scoped>
.desc {
  margin-top: -4px;
}
</style>
