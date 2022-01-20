<template>
  <div>
    <f-toast
      v-bind="toast"
      top
      :timeout="3000"
      style="top: 30px"
      @change="handleToastChange"
    />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { State } from "vuex-class";
import { AppModuleKey, MutationTypes } from "@/store/app/types";

@Component
class Modals extends Vue {
  @State((state) => state.app.toast)
  toast!: APP.ToastState;

  handleToastChange(value: boolean) {
    this.$store.commit(AppModuleKey + MutationTypes.SET_TOAST, { show: value });
  }
}
export default Modals;
</script>
