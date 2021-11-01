<template>
  <div class="wrap21">
    <br>
    <back-header :header-title="$i18n('cloudProvider.containerDetail.newNode.返回节点管理')" jump-url="/cloudProvider/containerDetail/nodeManage"></back-header>
    <div class="panel">
      <h3>{{ $i18n('cloudProvider.containerDetail.newNode.填写节点实例信息') }}</h3>
      <ul class="formContainer">
        <li>
          <div class="redStar2">{{ $i18n('cloudProvider.containerDetail.newNode.所在地域') }}</div>
          <div>{{reqObj.regionId}}</div>
        </li>
        <li>
          <div class="redStar">{{ $i18n('cloudProvider.containerDetail.newNode.付费类型') }}</div>
          <bp-radio-group v-model="reqObj.workerInstanceChargeType" class="buttonStyle">
            <bp-radio value="PostPaid">{{ $i18n('cloudProvider.containerDetail.newNode.按量付费') }}</bp-radio>
            <bp-radio value="PrePaid">{{ $i18n('cloudProvider.containerDetail.newNode.包年包月') }}</bp-radio>
          </bp-radio-group>
        </li>
        <template v-if="reqObj.workerInstanceChargeType==='PrePaid'">
          <li>
            <div class="redStar2">{{ $i18n('cloudProvider.containerDetail.newNode.自动续费') }}</div>
            <div class="inputContainer">
              <div style="width:100px;margin-right:3px;">
                <bp-switch class="switchBtn" v-model="prePaidReq.workerAutoRenew"></bp-switch>
              </div>
              <div style="width:400px">
                <form-input v-model="prePaidReq.workerAutoRenewPeriod"
                  input-type="int"
                  default-value="1"
                  :placeholder-txt="$i18n('cloudProvider.containerDetail.newNode.续费时长')"></form-input>
              </div>
            </div>
          </li>
          <li>
            <div class="redStar">{{ $i18n('cloudProvider.containerDetail.newNode.时长类型') }}</div>
            <bp-radio-group v-model="prePaidReq.workerPeriodUnit" class="buttonStyle">
              <bp-radio value="Year">{{ $i18n('cloudProvider.containerDetail.newNode.按年') }}</bp-radio>
              <bp-radio value="Month">{{ $i18n('cloudProvider.containerDetail.newNode.按月') }}</bp-radio>
              <bp-radio value="Week">{{ $i18n('cloudProvider.containerDetail.newNode.按周') }}</bp-radio>
              <bp-radio value="Hour">{{ $i18n('cloudProvider.containerDetail.newNode.按小时') }}</bp-radio>
            </bp-radio-group>
          </li>
          <li>
            <div class="redStar2">{{ $i18n('cloudProvider.containerDetail.newNode.购买时长(月)') }}</div>
            <div style="width:503px">
              <form-input
                input-type="int"
                v-model="prePaidReq.workerPeriod"
                default-value="1"
                :max="prePaidReq.workerPeriodUnit === 'Month'?9:100"
                :placeholder-txt="$i18n('cloudProvider.containerDetail.newNode.请输入月数')"></form-input>
            </div>
          </li>
        </template>
        <li>
          <div class="redStar2">{{ $i18n('cloudProvider.containerDetail.newNode.开启云监控') }}</div>
          <bp-switch class="" v-model="reqObj.cloudMonitorFlags"></bp-switch>
        </li>
        <li>
          <div class="redStar">{{ $i18n('cloudProvider.containerDetail.newNode.数量') }}</div>
          <div style="width:203px">
            <form-input
              input-type="int"
              :default-value="preReqObj.count+''"
              v-model="reqObj.count"
              :placeholder-txt="$i18n('cloudProvider.containerDetail.newNode.请输入')"></form-input>
          </div>
        </li>
        <li>
          <div class="redStar">{{ $i18n('cloudProvider.containerDetail.newNode.节点规格') }}</div>
          <div style="width:503px">
            <form-select
              :multiple="true"
              :be-must="true"
              ref="nodeType11"
              v-model="specialInsTypes"
              :prop-list="workerInsTypesArr"></form-select>
          </div>
        </li>
        <li>
          <div class="redStar">{{ $i18n('cloudProvider.containerDetail.newNode.系统盘') }}</div>
          <div class="inputContainer">
            <div style="width:300px;margin-right:3px">
              <form-select v-model="reqObj.workerSystemDiskCategory"
                :default-value="preReqObj.workerSystemDiskCategory"
                :be-must="true"
                paint-label="key"
                paint-val="val"
                :prop-list="diskList"></form-select>
            </div>
            <div style="width:200px">
              <form-input v-model="reqObj.workerSystemDiskSize"
                :default-value="preReqObj.workerSystemDiskSize+''"
                :be-must="true"
                input-type="int"
                :placeholder-txt="$i18n('cloudProvider.containerDetail.newNode.磁盘大小')"></form-input>
            </div>
          </div>
        </li>
        <li>
          <data-disk :prop-list="diskList" v-model="reqObj.workerDataDisks"></data-disk>
        </li>
        <li>
          <div class="redStar">{{ $i18n('cloudProvider.containerDetail.newNode.登录方式') }}</div>
          <bp-radio-group v-model="nouse" class="buttonStyle">
            <bp-radio value="1">{{ $i18n('cloudProvider.containerDetail.newNode.设置密钥') }}</bp-radio>
            <bp-radio value="2" disabled>{{ $i18n('cloudProvider.containerDetail.newNode.设置密码') }}</bp-radio>
          </bp-radio-group>
        </li>
        <li>
          <div class="redStar">{{ $i18n('cloudProvider.containerDetail.newNode.密钥对') }}</div>
          <div class="w400">
            <form-select
              v-model="reqObj.keyPair"
              :prop-list="keyPairList"></form-select>
          </div>
          <button class="bp-btn" style="height:32px" @click="showPop">{{ $i18n('cloudProvider.containerDetail.newNode.新建密钥对') }}</button>
        </li>
      </ul>
    </div>
    <footer>
      <div>
        <span>{{ $i18n('cloudProvider.containerDetail.newNode.费用估算：') }}</span>
        <template v-if="tradePrice">
          <span class="moneySpan">{{tradePrice}}</span>
          <span>{{calcPeriodUnit}}</span>
        </template>
      </div>
      <button class="bp-btn faas-btn-primary" @click="mgtScaleout">{{ $i18n('cloudProvider.containerDetail.newNode.添加') }}</button>
    </footer>
  </div>
</template>

<script lang="ts">
import backHeader from './components/backHeader.vue';
import formInput from "../container/components/formeInput.vue"
import formSelect from "../container/components/formSelect.vue"
import dataDisk from "./components/dataDisk.vue"
import api from "@/api";

import bpui from "bpui.js";
import {
  MessageBox,
} from "element-ui";
import {
  Component,
  Vue,
  Mixins,
  Prop,
  Inject,
  Watch,
  // Provide,
  // Emit,
} from "vue-property-decorator";

@Component({
  components: {
    backHeader, formInput,
    formSelect, dataDisk,
    bpSwitch: bpui.bpSwitch,
    bpRadioGroup: bpui.bpRadioGroup,
    bpRadio: bpui.bpRadio,

  },
  name: 'nodeDetail.new'
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

  //
  // data.
  // @Provide() demo:number = 1;
  temStore: any = {}
  workerInsTypesArr: string[] = []
  keyPairList: string[] = []
  prodCode: string = ''
  tradePrice: number = 0
  private specialInsTypes: any = [];
  private nouse = 1
  diskList: {}[] = [
    {
      val: 'cloud_efficiency',
      key: $i18n('cloudProvider.containerDetail.newNode.高效云盘')
    },
    {
      val: 'cloud_ssd',
      key: $i18n('cloudProvider.containerDetail.newNode.SSD云盘')
    },
    {
      val: 'cloud_essd',
      key: $i18n('cloudProvider.containerDetail.newNode.ESSD云盘')
    }
  ]
  prePaidReq = {
    workerPeriod: 1,
    workerAutoRenew: true,
    workerAutoRenewPeriod: 1,
    workerPeriodUnit: "Month",
  }
  preReqObj: object = {
    count: 12,
    cloudMonitorFlags: true,
    cpuPolicy: "none",
    keyPair: "kp-test-01",
    vswitchIds: ["vsw-bp1jsvsayq4m0g20cm2q6"],
    workerInstanceChargeType: "PostPaid",
    workerInstanceTypes: ["ecs.g6e.large"],
    workerSystemDiskCategory: "cloud_essd",
    workerSystemDiskSize: 120,
  }
  reqObj = {
    count: 12,
    cloudMonitorFlags: true,
    cpuPolicy: "none",
    keyPair: "kp-test-01",
    regionId: '',
    clusterId: '',
    productCode: '',
    accountId: '',
    vswitchIds: [],
    workerInstanceChargeType: "PostPaid",
    workerInstanceTypes: [''],
    workerSystemDiskCategory: "",
    workerSystemDiskSize: 120,
    workerDataDisks: [
      {
        category: "",
        size: 0,
      }
    ]
  }
  //
  // computed.
  get calcPeriodUnit() {
    let priceUnitobj: any = {
      Year: $i18n('cloudProvider.containerDetail.newNode.年'),
      Month: $i18n('cloudProvider.containerDetail.newNode.月'),
      Week: $i18n('cloudProvider.containerDetail.newNode.周'),
      Hour: $i18n('cloudProvider.containerDetail.newNode.小时'),
    }
    return this.reqObj.workerInstanceChargeType === 'PrePaid' ? ' /' + this.prePaidReq.workerPeriod + priceUnitobj[this.prePaidReq.workerPeriodUnit] : $i18n('cloudProvider.containerDetail.newNode./小时')
  }
  //
  // watch.
  @Watch('specialInsTypes', { immediate: true })
  fun1(val: string[], oldVal: []) {
    if (!val) return []
    this.reqObj.workerInstanceTypes = val.map((item: string) => {
      if (!item) return '';
      return item.split('/')[0]
    })
  }
  @Watch('reqObj', { deep: true })
  @Watch('prePaidReq', { deep: true })
  fun2(val: string[], oldVal: []) {
    this.tradePrice = 0
    this.calcPrice()
  }
  newKeyPair(keyPairName: string) {
    api.cmp.cluster.newkeyPair({
      keyPairName,
      regionId: this.reqObj.regionId,
      accountId: this.reqObj.accountId,
      productCode: this.prodCode
    }).then((data: any) => {
      if (data.keyPairName === keyPairName) {
        this.getkeypair()
      }
    }).catch((err: any) => {
      throw err;
    });
  }
  showPop() {
    MessageBox.prompt($i18n('cloudProvider.containerDetail.newNode.请输入密钥名'), $i18n('cloudProvider.containerDetail.newNode.提示'), {
      confirmButtonText: $i18n('cloudProvider.containerDetail.newNode.确定'),
      cancelButtonText: $i18n('cloudProvider.containerDetail.newNode.取消'),
    }).then(({ value }: any) => {
      this.newKeyPair(value)
    }).catch(() => {
      this.$message({
        type: 'info',
        message: $i18n('cloudProvider.containerDetail.newNode.取消输入')
      });
    });
  }
  calcPrice(): void {
    if ((this.$refs.nodeType11 as any).judgeMust()) return;
    let obj: any = {
      accountId: this.reqObj.accountId,
      productCode: this.prodCode,
      regionId: this.reqObj.regionId,
      amount: this.reqObj.count,
      instanceType: this.reqObj.workerInstanceTypes[0],
      systemDisk: {
        category: this.reqObj.workerSystemDiskCategory,
        size: this.reqObj.workerSystemDiskSize,
      },
    }
    if (this.reqObj.workerDataDisks[0].category) {
      obj.dataDisk = this.reqObj.workerDataDisks
    }
    if (this.reqObj.workerInstanceChargeType === 'PrePaid') {
      obj.period = this.prePaidReq.workerPeriod
      obj.priceUnit = this.prePaidReq.workerPeriodUnit
    }
    api.cmp.cluster.calcPrice(obj).then((data: any) => {
      this.tradePrice = data.tradePrice
    }).catch((err: any) => {
      throw err;
    });
  }
  getkeypair() {
    api.cmp.cluster.keyPair({
      accountId: this.reqObj.accountId,
      regionId: this.reqObj.regionId,
      productCode: this.prodCode,
    }).then((data: any) => {
      this.keyPairList = data
      this.reqObj.keyPair = data[0]
    }).catch((err: any) => {
      throw err;
    });
  }

  mgtScaleout() {
    if ((this.$refs.nodeType11 as any).judgeMust()) return;
    let reqObj: any = { ...this.reqObj }
    if (reqObj.workerDataDisks[0].category === '') {
      reqObj.workerDataDisks = null
    }
    if (this.reqObj.workerInstanceChargeType === 'PrePaid') {
      reqObj = Object.assign(reqObj, this.prePaidReq)
    }
    api.cmp.cluster.mgtScaleout(reqObj).then((data: any) => {
      if (data.taskId) {
        $UIStorage.namespace_session().set("resultType", 'cluster_scaleout');
        this.$navbar.push({
          path: "/cloudProvider/containerDetail/resultTable",
          query: { hidSidebar: 1 }
        });
      }
    }).catch((err: any) => {
      throw err;
    });
  }
  getinsTypesList() {
    let instanceTypeFamily: string = this.temStore.get('instanceTypeFamily');
    api.cmp.cluster
      .insTypesList({
        accountId: this.reqObj.accountId,
        instanceTypeFamily,
        regionId: this.reqObj.regionId,
        productCode: this.prodCode
      }).then((data: any) => {
        this.workerInsTypesArr = data.map((item: any) => item.instanceTypeId + '/' + item.cpuCoreCount + 'vcpu/' + item.memorySize + 'g')
        let str = this.workerInsTypesArr.find((item: string) => {
          return item.includes($UIStorage.namespace_session().get("workerInstanceTypes"))
        })
        this.specialInsTypes = [str]
        this.calcPrice()
      }).catch((err: any) => {
        throw err;
      });
  }
  getInstInfo() {
    this.reqObj.clusterId = this.temStore.get('clusterId');
    api.cmp.cluster
      .instInfo(this.reqObj.clusterId).then((data: any) => {
        this.preReqObj = JSON.parse(data.workerInstInfo)
      }).catch((err: any) => {
        throw err;
      });
  }
  //
  // lifecycle hook.
  constructor() {
    super();
  }

  created() {
  }
  mounted() {
    this.temStore = $UIStorage.namespace('CLUSTER_OPS');
    this.reqObj.regionId = this.temStore.get('region');
    this.reqObj.productCode = this.temStore.get('productCode')
    this.prodCode = this.temStore.get('productCode').split('::')[0] + '::ECS'
    this.reqObj.accountId = this.temStore.get('accountId');
    this.reqObj.vswitchIds = this.temStore.get('vswitchIds');
    this.getInstInfo()
    this.getkeypair()
    this.getinsTypesList()
  }
}
</script>


<style lang="scss" scoped>
@mixin commonWrap {
  background-color: #fff;
  padding: 16px;
  margin: 0 24px;
}
.wrap21 {
  padding: 16px;
  .panel {
    background-color: #fff;
    padding: 16px;
    overflow: auto;
    height: calc(100vh - 210px);
    .formContainer {
      @include commonWrap;
      li {
        display: flex;
        margin-bottom: 6px;
        justify-content: flex-start;
        .w400 {
          width: 400px;
        }
        .redStar2 {
          padding-left: 11px;
        }
        > div {
          line-height: 32px;
        }
        > div:first-child {
          width: 105px;
          color: #8c8c8c;
          margin-right: 105px;
        }
        .inputContainer {
          display: flex;
          align-items: center;
          justify-content: flex-start;
          .smallSetect {
            margin: 0;
            width: 300px;
          }
          .switchBtn {
            transform: translateY(-5px);
          }
        }
      }
      .baseInput {
        /deep/ .el-input__inner,
        /deep/ .bp-input__inner {
          background-color: #e5e5e5;
          border: 0;
          box-sizing: border-box;
          width: 600px;
        }
        border: 0;
        margin: 0;
        background-color: #e5e5e5;
      }
    }
  }
  footer {
    display: flex;
    line-height: 32px;
    justify-content: space-between;
    padding: 24px 5px;
    .moneySpan {
      color: #ff3b30;
    }
  }
}
</style>
