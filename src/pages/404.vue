<template>
  <div class="flex_r_c _404 f18 f-italic">
    <span>404</span>
    <span>|</span>
    <span>Not Found</span>
  </div>
</template>

<script lang="ts">
import {
  Component,
  Vue,
  Prop,
  // Watch,
  // Provide,
  // Emit,
} from "vue-property-decorator";

@Component
export default class extends Vue {
  mounted() {
    $sys_navbar.hideSideBar();
  }
}
</script>

<style lang="scss" scoped>
._404 {
  height: calc( 100vh - 50px );
  span {
    padding-left: 5px;
  }
}
</style>
