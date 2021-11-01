<!--
/**
* Copyright (c) 2021 Copyright originforest All Rights Reserved.
* Author: lanck
* Date: 2021-04-08 11:36
* Desc: 详情-操作指南
*/
 -->

<template>
  <div class="manual-content">
    <div class="header">{{ $i18n('cloudProvider.mirror.store.components.manual.1__登录Docker_Registry') }}</div>
    <ui-note class="note">
      <div>
        $ sudo docker login --username="hi3000******@aliyun.com"
        registry.cn-hangzhou.aliyuns.com
      </div>
    </ui-note>
    <div class="describe">{{ $i18n('cloudProvider.mirror.store.components.manual.用于登录的用户名为账号全名，密码为开通服务时设置的密码') }}</div>
    <div class="describe">{{ $i18n('cloudProvider.mirror.store.components.manual.您可以在访问凭证页面修改凭证密码') }}</div>
    <div class="header" style="margin-top: 20px">{{ $i18n('cloudProvider.mirror.store.components.manual.2__从Registry中拉取镜像') }}</div>
    <ui-note class="note">
      <div>
{{ $i18n('cloudProvider.mirror.store.components.manual.$_sudo_docker_pull_registry_cn-hangzhou_aliyuns_com/brainpoint/concourse-var(镜像版本号)') }}
      </div>
    </ui-note>
    <div class="header">{{ $i18n('cloudProvider.mirror.store.components.manual.3__将镜像推送到Registry') }}</div>
    <ui-note class="note">
      <div>
        $ sudo docker login --username="hi3000@aliyun.com" registry.cn-hangzhou.aliyuns.com
      </div>
       <div>
{{ $i18n('cloudProvider.mirror.store.components.manual.$_sudo_docker_tag_[ImageId]_registry_cn-hangzhou_aliyuns_com/brainpoint/concourse-var(镜像版本号)') }}
      </div>
       <div>
        $ sudo docker push registry.cn-hangzhou.aliyuns.com/brainpoint/concourse-var
      </div>
    </ui-note>
     <div class="describe">{{ $i18n('cloudProvider.mirror.store.components.manual.请根据实际镜像信息替换示例中的[ImageId]和[镜像版本号]参数') }}</div>
      <div class="header" style="margin-top: 20px">{{ $i18n('cloudProvider.mirror.store.components.manual.4__选择合适的镜像仓库地址') }}</div>
    <div class="describe">{{ $i18n('cloudProvider.mirror.store.components.manual.从ECS推送镜像时，可以选择使用镜像仓库的内网地址，推送速度将得到提升并且将不会损耗您的公网流量') }}</div>
    <div class="describe">{{ $i18n('cloudProvider.mirror.store.components.manual.如果您使用的及其位于VPC网络，请使用registry-vpc_cn-hangzhou_aliyuns_com作为Registry的域名登录') }}</div>
      <div class="header" style="margin-top: 20px">{{ $i18n('cloudProvider.mirror.store.components.manual.5__示例') }}</div>
    <div class="describe">{{ $i18n('cloudProvider.mirror.store.components.manual.使用_docker_tag_命令重命名镜像，并将它通过专有网络地址推送至Registry') }}</div>
    <ui-note class="note">
      <div>
        $ sudo docker images
      </div>
    </ui-note>
  </div>
</template>

<script lang="ts">
import {
  Component,
  Vue,
  // Prop,
  // Watch,
  // Provide,
  // Emit,
} from "vue-property-decorator";


@Component({
  components: {},
})
export default class extends Vue {
  //
  // event.
  // @Emit()
  // demoEvent(type: string) { }

  //
  // state.
  // @State(state=>state.demo) demo:DEMO_TYPE;

  //
  // Prop
  // @Prop({ type: number }) demo: number;

  //
  // data.
  // @Provide() demo:number = 1;

  //
  // computed.
  // get demo() { return xxxx; }

  //
  // watch.
  // @Watch('child')
  // onChildChanged(val: string, oldVal: string) { }

  //
  // lifecycle hook.
  constructor() {
    super();
  }

  mounted() {}
}
</script>

<style lang='scss' scoped>
.manual-content {
  padding: 20px;

  .header {
    font-size: 16px;
    height: 30px;
  }

  .describe {
    font-size: 12px;
    height: 20px;
    color: rgba($color: #000000, $alpha: 0.58);
  }

  .note {
    color: rgba($color: #000000, $alpha: 1.0) !important;
  }
}
</style>
