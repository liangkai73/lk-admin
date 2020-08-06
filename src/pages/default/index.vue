<template>
  <div>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import {
    Component,
  } from 'vue-property-decorator';
  import api from "@/api";

  @Component({
    components: {}
  })
  export default class extends Vue {

    //
    // lifecycle hook.
    constructor() {
      super();
    }

    created() {
    }

    async beforeMount() {
      const isLogin = await api.login.isLogin();
      if (isLogin === true) {
        this.$router.push('/console/overview');
      }
    }

    mounted() {
    }

    beforeDestroy() {
    }

    viewAppear(popData: any) {
    }

    viewDisappear() {
    }
  }

</script>


<style lang="scss" scoped>

</style>
