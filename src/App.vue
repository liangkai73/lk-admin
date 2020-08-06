
<template>
  <component
    :is="layout"
    id="app"
  ></component>
</template>

<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
import * as ui from '@bpui/ui';
import layouts from './router/_tmpLayout';

@Component({
  components: {
  }
})
export default class extends Vue {
  layout: any = null;

  @Watch('$route')
  onRouteChange(newRoute: bp.Location, oldRoute?: bp.Location) {
    this.layout = ui.getLayout(layouts, newRoute, oldRoute);
  }

  beforeMount() {
    // theme.
    let theme = $UIStorage.namespace('theme').get('theme') || 'light';
    if (['dark', 'light'].indexOf(theme) < 0) {
      theme = 'light';
    }
    $('html').attr('data-theme', theme);
  }

  mounted() {
    this.onRouteChange(this.$route);
  }
}
</script>


<style lang="scss">
@import '~/src/components/style';
@import '~@bpui/ui/style';

</style>