<template>
  <f-bottom-sheet
    v-model="settingDialog"
    :title="$t('settings')"
    min-width="500"
    wapper-in-desktop="dialog"
    content-class="f-bottom-sheet--no-padding"
  >
    <template #activator="{ on }">
      <v-btn icon v-on="on">
        <v-icon size="20">$FIconMenuBold</v-icon>
      </v-btn>
    </template>
    <v-sheet>
      <f-list>
        <f-list-item>
          <template #body>
            <v-list-item-content>
              <v-list-item-title>{{
                $t("settings.tap_to_launch")
              }}</v-list-item-title>
            </v-list-item-content>
          </template>
          <template #tail>
            <f-switch color="blue" v-model="tapToLaunch" hide-details />
          </template>
        </f-list-item>
        <a href="https://donate.cafe/lyric" target="_blank">
          <f-list-item>
            <template #body>
              <v-list-item-content>
                <v-list-item-title>{{
                  $t("settings.donate")
                }}</v-list-item-title>
              </v-list-item-content>
            </template>
          </f-list-item>
        </a>
      </f-list>

      <foot />
    </v-sheet>
  </f-bottom-sheet>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Foot from "~/components/Foot.vue";

@Component({
  components: {
    Foot,
  },
})
class Settings extends Vue {
  settingDialog = false;

  get tapToLaunch() {
    const settings = this.$store.getters["app/GET_SETTINGS"];
    return settings.tap_to_launch;
  }

  set tapToLaunch(value) {
    this.$store.commit("app/SET_SETTINGS", { tap_to_launch: value });
  }
}
export default Settings;
</script>

<style lang="scss" scoped></style>
