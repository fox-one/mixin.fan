<template>
  <div class="bots-area">
    <div class="bots pt-4">
      <v-row>
        <v-col
          v-for="(group, ix) in starBotsInGroups"
          :key="`group-${ix}`"
          cols="6"
          md="4"
          lg="3"
        >
          <star-bot-group :group="group" :group-idx="ix" />
        </v-col>
      </v-row>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import StarBotGroup from "@/components/StarBotGroup.vue";
import _ from "lodash";
import { bT } from "@/utils/fmt";
import { BOTS } from "~/bots";

@Component({
  components: {
    StarBotGroup,
  },
})
class BotsArea extends Vue {
  @Prop({ default: 1 }) viewMode;
  @Prop({ default: "" }) filterText;
  @Prop({ default: "" }) lang;

  modal = false;

  curBot = null;

  addBotModal = false;

  get formalizedFitlerText() {
    return this.filterText ? this.filterText.toLowerCase() : "";
  }

  get starBotsInGroups() {
    const ret = _.cloneDeep(this.$store.getters["cache/GET_STAR_GROUPS"]);
    for (let ix = 0; ix < ret.length; ix++) {
      const group = ret[ix];
      for (let iy = 0; iy < group.items.length; iy++) {
        const botId = group.items[iy];
        if (botId !== null) {
          const bot = this.getBotById(botId);
          ret[ix].items.splice(iy, 1, bot);
        }
      }
    }
    return ret;
  }

  get isMixinMessenger() {
    return this.$utils.helper.isMixinMessenger();
  }

  getBotById(id) {
    const ret = _.find(BOTS, { id: id });
    if (ret) {
      return ret;
    }
    return null;
  }

  getGroupTitle(obj) {
    return bT(obj, "name");
  }
}
export default BotsArea;
</script>

<style lang="scss" scoped></style>
