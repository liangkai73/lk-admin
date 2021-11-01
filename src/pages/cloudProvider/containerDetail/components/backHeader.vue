<template>
  <div class="backHeadWrap">
    <span class="backIcon" @click="goBack">
      <bp-icon name="left"></bp-icon>
    </span>
    <span class="title">{{headerTitle}}</span>
    <slot></slot>
  </div>
</template>
<script>
export default {
  props: ['headerTitle', 'jumpUrl'],
  methods: {
    goBack () {
      if (this.jumpUrl) {
        this.$navbar.replace(this.jumpUrl)
      } else {
        this.$navbar.popTo(-1)

      }
    }
  },
}
</script>
<style lang="scss" scoped>
.backHeadWrap {
  display: flex;
  align-items: center;
  position: relative;
  margin-bottom: 16px;
  height: 36px;
  .title {
    font-size: 18px;
  }
  .backIcon {
    display: inline-block;
    cursor: pointer;
    height: 36px;
    width: 36px;
    background-color: rgba(0, 0, 0, 0.1);
    font-size: 16px;
    text-align: center;
    line-height: 36px;
    margin-right: 16px;
  }
}
</style>
