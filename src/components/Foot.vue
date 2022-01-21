<template>
  <div class="footer greyscale_3--text text-center pa-4">
    <!-- <div class="links">
      <a href="https://pando.im">Pando.im</a>・
      <nuxt-link to="settings">Settings</nuxt-link>
    </div> -->
    <div class="caption">The listings portal for Mixin Ecosystem.</div>
    <div class="caption copyright">©2022, Pando.im</div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
class Foot extends Vue {}
export default Foot;
</script>

<style lang="scss" scoped></style>
