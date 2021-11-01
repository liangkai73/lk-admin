<!--
/**
* Copyright (c) 2021 Originforest Co.,Ltd. All Rights Reserved.
* Author: linchengshu
* Date: 2021-05-27 15:55
* Desc: 新增容器
*/
 -->
<template>
  <div>
    <div class="line1" style="margin: 0;border-color:transparent"></div>
    <back-header :header-title="$i18n('cloudProvider.container.newContainer.新建集群')" jump-url="/cloudProvider/container" class="backHeaderComponent">
      <div class="inner-step  flex_r_c">
        <ui-step :active="stepNum" :stepArr="stepArr"></ui-step>
      </div>
    </back-header>
    <!-- dialog-page0-->
    <div class="inner-area-items" v-show="stepNum == 0">
      <div class="cloudCount">
        <span class="redStar">{{ $i18n('cloudProvider.container.newContainer.云商账号') }}</span>
        <div class="w600">
          <form-select v-model="accountId"
            :placeholder-txt="$i18n('cloudProvider.container.newContainer.选择云商')"
            paint-label="acctName"
            paint-val="id"
            :be-must="true"
            :show-icon="true"
            cloud-type-icon="cloudTypeId"
            ref="formEl0"
            :prop-list="acctList"></form-select>
        </div>
      </div>
      <div class="cardList">
        <div class="title">{{ $i18n('cloudProvider.container.newContainer.应用场景') }}</div>
        <ul class="cards">
          <li v-for="(item,i) in applicationScenario" @click="chooseScenario(i)" :key="i" :class="[ scenarioI === i?'active':'',scale(item.name) ]">
            <div class="cardItem">
              <h3>
                <bp-icon name="clusterTem"></bp-icon>
                {{$i18n(item.name)}}
              </h3>
              <div>{{$i18n(item.description)}}</div>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <div class="inner-area-items" v-show="stepNum == 1">
      <div class="panelInfo">
        <h3>{{ $i18n('cloudProvider.container.newContainer.基础配置') }}</h3>
        <ul>
          <li>
            <div>{{ $i18n('cloudProvider.container.newContainer.Kubernetes版本') }}</div>
            <div class="w600">
              <form-select v-model="createClusterReq.kubernetesVersion"
                :default-value="defaultTem.kubernetesVersion"
                ref="formEl11"
                :be-must="requiredTem.kubernetesVersion"
                :prop-list="k8sVersionAllowedVal"></form-select>
            </div>
          </li>
          <li>
            <div>{{ $i18n('cloudProvider.container.newContainer.容器运行时') }}</div>
            <div class="w600">
              <form-select v-model="specialRuntime"
                ref="formEl12"
                :default-value="runtimeDefault"
                :be-must="requiredTem.specialRuntime"
                :prop-list="runtimeAllowedVal"></form-select>
            </div>
          </li>
          <li>
            <div>{{ $i18n('cloudProvider.container.newContainer.容器网段') }}</div>
            <div class="w600">
              <form-input v-model="createClusterReq.containerCidr"
                ref="formEl13"
                :default-value="defaultTem.containerCidr"
                :be-must="requiredTem.containerCidr"
                :placeholder-txt="$i18n('cloudProvider.container.newContainer.请输入网段')"></form-input>
            </div>
          </li>
          <li>
            <div>{{ $i18n('cloudProvider.container.newContainer.服务转发模式') }}</div>
            <div class="w600">
              <form-select v-model="createClusterReq.proxyMode"
                ref="formEl14"
                :default-value="defaultTem.proxyMode"
                :be-must="requiredTem.proxyMode"
                :prop-list="proxyModeAllowedVal"></form-select>
            </div>
          </li>
        </ul>
      </div>
      <ul class="formItems">
        <li>
          <div class="redStar">{{ $i18n('cloudProvider.container.newContainer.集群名称') }}</div>
          <div class="w600">
            <form-input v-model="createClusterReq.name"
              :be-must="requiredTem.name"
              ref="formEl15"
              :placeholder-txt="$i18n('cloudProvider.container.newContainer.请输入集群名称')"></form-input>
          </div>
        </li>
        <li>
          <div class="redStar">{{ $i18n('cloudProvider.container.newContainer.所在地域') }}</div>
          <div class="w600">
            <form-select v-model="createClusterReq.regionId"
              :prop-list="vpcRegionList"
              ref="formEl16"
              :be-must="requiredTem.regionId"
              :paint-label="$inEnglish?'regionId':'localName'"
              :placeholder-txt="$i18n('cloudProvider.container.newContainer.请选择')"
              paint-val="regionId"></form-select>
          </div>
        </li>
        <li>
          <div class="redStar">{{ $i18n('cloudProvider.container.newContainer.VPC网络') }}</div>
          <div class="w600">
            <form-select v-model="createClusterReq.vpcid"
              paint-label="vpcName"
              :be-must="requiredTem.vpcid"
              ref="formEl17"
              :placeholder-txt="$i18n('cloudProvider.container.newContainer.请选择')"
              paint-val="vpcId"
              :prop-list="vpcCanuseList"></form-select>
          </div>
        </li>
        <li>
          <div class="redStar">{{ $i18n('cloudProvider.container.newContainer.虚拟交换机') }}</div>
          <div class="w600">
            <form-select v-model="createClusterReq.vswitchIds"
              :be-must="requiredTem.vswitchIds"
              :multiple="true"
              :multiple-limit="3"
              ref="formEl18"
              :placeholder-txt="$i18n('cloudProvider.container.newContainer.请选择')"
              :prop-list="vswitchIdsArr"></form-select>
          </div>
        </li>
        <li>
          <div class="pl10">{{ $i18n('cloudProvider.container.newContainer.集群描述') }}</div>
          <div class="w600">
            <form-input v-model="createClusterReq.name"
              :be-must="false"
              ref="formEl19"
              :placeholder-txt="$i18n('cloudProvider.container.newContainer.集群描述')"></form-input>
          </div>
        </li>
      </ul>
    </div>
    <div class="inner-area-items" v-show="stepNum == 2">
      <div class="panelInfo">
        <h3>{{ $i18n('cloudProvider.container.newContainer.节点配置') }}</h3>
        <ul>
          <!-- <li>
            <div>节点管理规模</div>
            <div>{{'饿饿额'}}</div>
          </li> -->
          <li>
            <div>{{ $i18n('cloudProvider.container.newContainer.密钥对') }}</div>
            <div style="width:503px">
              <form-select v-model="createClusterReq.keyPair"
                :be-must="requiredTem.keyPair"
                ref="formEl21"
                :prop-list="keyPairArr"></form-select>
            </div>
          </li>
          <li>
            <div>{{ $i18n('cloudProvider.container.newContainer.节点规格') }}</div>
            <div style="width:503px">
              <form-select v-model="specialInsTypes"
                :multiple="true"
                :be-must="requiredTem.specialInsTypes"
                ref="formEl22"
                :default-value="InsTypesDefault"
                :prop-list="workerInsTypesArr"></form-select>
            </div>
          </li>
        </ul>
      </div>
      <ul class="formItems">
        <li>
          <div class="redStar">{{ $i18n('cloudProvider.container.newContainer.付费类型') }}</div>
          <bp-radio-group v-model="createClusterReq.workerInstanceChargeType" class="buttonStyle">
            <bp-radio value="PostPaid">{{ $i18n('cloudProvider.container.newContainer.按量付费') }}</bp-radio>
            <bp-radio value="PrePaid">{{ $i18n('cloudProvider.container.newContainer.包年包月') }}</bp-radio>
          </bp-radio-group>
        </li>
        <template v-if="createClusterReq.workerInstanceChargeType==='PrePaid'">
          <li>
            <div class="redStar">{{ $i18n('cloudProvider.container.newContainer.自动续费') }}</div>
            <div class="inputContainer">
              <div style="width:100px;margin-right:3px;">
                <bp-switch class="switchBtn" v-model="prePaidReq.workerAutoRenew"></bp-switch>
              </div>
              <div style="width:400px">
                <form-input v-model="prePaidReq.workerAutoRenewPeriod"
                  input-type="int"
                  default-value="1"
                  :suffix-label="$i18n('cloudProvider.container.newContainer.月')"
                  :placeholder-txt="$i18n('cloudProvider.container.newContainer.续费时长')"></form-input>
              </div>
            </div>
          </li>
          <li>
            <div class="redStar">{{ $i18n('cloudProvider.container.newContainer.时长类型') }}</div>
            <bp-radio-group v-model="prePaidReq.workerPeriodUnit" class="buttonStyle">
              <bp-radio value="Year">{{ $i18n('cloudProvider.container.newContainer.按年') }}</bp-radio>
              <bp-radio value="Month">{{ $i18n('cloudProvider.container.newContainer.按月') }}</bp-radio>
              <!-- <bp-radio value="Week">按周</bp-radio>
              <bp-radio value="Hour">按小时</bp-radio> -->
            </bp-radio-group>
          </li>
          <li>
            <div class="redStar">{{ $i18n('cloudProvider.container.newContainer.购买时长') }}</div>
            <div style="width:503px">
              <form-input
                input-type="int"
                default-value="1"
                v-model="prePaidReq.workerPeriod"
                :suffix-label="prePaidReq.workerPeriodUnit === 'Month'?$i18n('cloudProvider.container.newContainer.月'):$i18n('cloudProvider.container.newContainer.年')"
                :max="prePaidReq.workerPeriodUnit === 'Month'?9:Infinity"
                :placeholder-txt="$i18n('cloudProvider.container.newContainer.请输入月数')"></form-input>
            </div>
          </li>
        </template>
        <li>
          <div class="redStar">{{ $i18n('cloudProvider.container.newContainer.数量') }}</div>
          <div style="width:203px">
            <form-input v-model="createClusterReq.numOfNodes"
              :default-value="defaultTem.numOfNodes"
              ref="formEl23"
              :be-must="requiredTem.numOfNodes"
              input-type="int"
              :min="numOfNodesMinVal"
              :max="numOfNodesMaxVal"
              :placeholder-txt="$i18n('cloudProvider.container.newContainer.请输入')"></form-input>
          </div>
        </li>
        <li>
          <div class="redStar">{{ $i18n('cloudProvider.container.newContainer.系统盘') }}</div>
          <div class="inputContainer">
            <div style="width:300px;margin-right:3px">
              <form-select v-model="createClusterReq.workerSystemDiskCategory"
                :default-value="defaultTem.workerSystemDiskCategory"
                ref="formEl24"
                :be-must="requiredTem.workerSystemDiskCategory"
                :prop-list="systemDiskCategoryAllowedVal"></form-select>
            </div>
            <div style="width:200px">
              <form-input v-model="createClusterReq.workerSystemDiskSize"
                :default-value="defaultTem.workerSystemDiskSize"
                :be-must="requiredTem.workerSystemDiskSize"
                input-type="int"
                ref="formEl25"
                suffix-label="G"
                :min="systemDiskSizeMin"
                :max="systemDiskSizeMax"
                :placeholder-txt="$i18n('cloudProvider.container.newContainer.磁盘大小')"></form-input>
            </div>
          </div>
        </li>
        <li>
          <data-disk :prop-list="diskList" v-model="workerDataDisks"></data-disk>
        </li>
      </ul>
    </div>
    <div class="inner-area-items" v-show="stepNum == 3">
      <div style="padding:16px">
        <el-table
          ref="multipleTable"
          :data="pluginList"
          tooltip-effect="dark"
          class="clusterTable faas-table-group"
          style="width: 100%">
          <el-table-column class-name="tableColume" :label="$i18n('cloudProvider.container.newContainer.插件名称')" prop="name" width="200"></el-table-column>
          <el-table-column class-name="tableColume" :label="$i18n('cloudProvider.container.newContainer.产品编码')" prop="productCode" width="150"></el-table-column>
          <el-table-column class-name="tableColume" :label="$i18n('cloudProvider.container.newContainer.插件代码')" prop="pluginCode" width="120"></el-table-column>
          <el-table-column class-name="tableColume" :label="$i18n('cloudProvider.container.newContainer.插件参数配置')" prop="config"></el-table-column>
          <el-table-column class-name="tableColume" :label="$i18n('cloudProvider.container.newContainer.插件描述')" prop="descn"></el-table-column>
        </el-table>
      </div>

    </div>
    <div class="inner-area-items" v-show="stepNum == 4">
      <div class="panelInfo" id="info-pannel">
        <h3>{{ $i18n('cloudProvider.container.newContainer.已选配置') }}</h3>
        <div class="step4">
          <h3>{{ $i18n('cloudProvider.container.newContainer.基础配置') }}</h3>
          <ul>
            <li>
              <div>{{ $i18n('cloudProvider.container.newContainer.Kubernetes版本') }}</div>
              <div>{{createClusterReq.kubernetesVersion}}</div>
            </li>
            <li>
              <div>{{ $i18n('cloudProvider.container.newContainer.容器运行时') }}</div>
              <div>{{specialRuntime}}</div>
            </li>
            <li>
              <div>{{ $i18n('cloudProvider.container.newContainer.容器网段') }}</div>
              <div>{{createClusterReq.containerCidr}}</div>
            </li>
            <li>
              <div>{{ $i18n('cloudProvider.container.newContainer.服务转发模式') }}</div>
              <div>{{createClusterReq.proxyMode}}</div>
            </li>
            <li>
              <div>{{ $i18n('cloudProvider.container.newContainer.集群名称') }}</div>
              <div>{{createClusterReq.name}}</div>
            </li>
            <li>
              <div>{{ $i18n('cloudProvider.container.newContainer.所在地域') }}</div>
              <div>{{createClusterReq.regionId}}</div>
            </li>
            <li>
              <div>{{ $i18n('cloudProvider.container.newContainer.VPC网络') }}</div>
              <div>{{createClusterReq.vpcid}}</div>
            </li>
            <li>
              <div>{{ $i18n('cloudProvider.container.newContainer.虚拟交换机') }}</div>
              <div>{{createClusterReq.vswitchIds}}</div>
            </li>
          </ul>
        </div>
        <div class="line1" style="margin: 0"></div>
        <div class="step4">
          <h3>{{ $i18n('cloudProvider.container.newContainer.节点配置') }}</h3>
          <ul>
            <li>
              <div>{{ $i18n('cloudProvider.container.newContainer.密钥对') }}</div>
              <div>{{createClusterReq.keyPair}}</div>
            </li>
            <li>
              <div>{{ $i18n('cloudProvider.container.newContainer.节点规格') }}</div>
              <div>{{specialInsTypes}}</div>
            </li>
            <li>
              <div>{{ $i18n('cloudProvider.container.newContainer.付费类型') }}</div>
              <div>{{createClusterReq.workerInstanceChargeType}}</div>
            </li>
            <li>
              <div>{{ $i18n('cloudProvider.container.newContainer.数量') }}</div>
              <div>{{createClusterReq.numOfNodes}}</div>
            </li>
            <li>
              <div>{{ $i18n('cloudProvider.container.newContainer.系统盘') }}</div>
              <div>{{createClusterReq.workerSystemDiskCategory}}</div>
            </li>
          </ul>
        </div>
        <div class="line1" style="margin: 0"></div>
        <!-- <div class="step4">
          <h3>插件安装</h3>
          <ul>
            <li>ghrjytutyrter</li>
          </ul>
        </div> -->
      </div>
    </div>
    <footer>
      <div class="cost" :class="{show:stepNum===4}">
        <span>{{ $i18n('cloudProvider.container.newContainer.费用估算：') }}</span>
        <template v-if="tradePrice">
          <span class="timeMoney">{{tradePrice}}</span>
          <span>{{calcPeriodUnit}}</span>
        </template>
      </div>
      <div>
        <button class="bp-btn faas-btn-primary"
          @click="lastStep" v-if="stepNum>0">{{ $i18n('cloudProvider.container.newContainer.上一步:') }}{{stepArr[stepNum-1].lable}}</button>
        <button class="bp-btn faas-btn-primary" @click="nextStep" v-if="stepNum<4">{{ $i18n('cloudProvider.container.newContainer.下一步:') }}{{stepArr[stepNum+1].lable}}</button>
        <button class="bp-btn" style="color:#1baaf5" @click="createdNew" :disabled="stepNum<4">{{ $i18n('cloudProvider.container.newContainer.新建集群') }}</button>
      </div>
    </footer>
  </div>
</template>
<script lang="ts">
import {
  Component,
  Vue,
  // Prop,
  Watch,
  // Provide,
  // Emit,
} from "vue-property-decorator";

import contentView from "@/components/layout/contentView.vue";
import uiPagination from "@/components/ui/uiPagination.vue";
import uiDialog from "@/components/ui/uiDialogView.vue";
import uiStep from "@/components/ui/uiStep2.vue";
import bpui from "bpui.js";
import formInput from "./components/formeInput.vue"
import formSelect from "./components/formSelect.vue"
import api from "@/api";
import dataDisk from "../containerDetail/components/dataDisk.vue"

import backHeader from '@/pages/cloudProvider/containerDetail/components/backHeader.vue';

@Component({
  name: 'newContainer',
  components: {
    contentView,
    uiPagination,
    uiDialog,
    uiStep,
    formInput,
    formSelect,
    backHeader,
    dataDisk,
    bpInput: bpui.bpInput,
    bpSwitch: bpui.bpSwitch,
    bpRadioGroup: bpui.bpRadioGroup,
    bpRadio: bpui.bpRadio,
  },
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
  tradePrice: number = 0
  applicationScenario: any[] = []
  scenarioI = 0; // 选中的应用场景的index
  scenarioObj: any = {}
  pageDta = {
    pageNum: 1,
    pageSize: 20,
    pages: 5,
    total: 85,
  };
  createClusterReq = {
    name: "",
    regionId: "",
    vswitchIds: [],
    kubernetesVersion: "",
    proxyMode: "",
    keyPair: "",
    workerInstanceChargeType: "PostPaid",
    runtime: {
      name: "",
      version: ""
    },
    workerInstanceTypes: [''],
    numOfNodes: 1,
    workerSystemDiskCategory: "",
    workerSystemDiskSize: 0,
    vpcid: "",
    containerCidr: "",
  }
  workerDataDisks = [
    {
      category: "",
      size: 0,
    }
  ]
  diskList: {}[] = [
    {
      val: 'cloud_efficiency',
      key: $i18n('cloudProvider.container.newContainer.高效云盘')
    },
    {
      val: 'cloud_ssd',
      key: $i18n('cloudProvider.container.newContainer.SSD云盘')
    },
    {
      val: 'cloud_essd',
      key: $i18n('cloudProvider.container.newContainer.ESSD云盘')
    }
  ]
  pluginList: any[] = []
  prePaidReq = {
    workerPeriod: 12,
    workerAutoRenew: true,
    workerAutoRenewPeriod: 1,
    workerPeriodUnit: "Month",
  }
  stepNum = 0;
  dialogShow = false;
  private accountId: string = '';
  private specialRuntime: string = '';
  private specialInsTypes: [] = [];
  acctList = [];
  keyPairArr: [] = []; // 密钥对
  workerInsTypesArr: [] = [] // 节点规格
  vpcRegionList = [] // vpc 所在地域
  vpcCanuseList = [] // vpc 网络 即 可用的vpc列表
  stepArr = [
    { lable: $i18n('cloudProvider.container.newContainer.集群模板'), sum: 1 },
    { lable: $i18n('cloudProvider.container.newContainer.基础配置'), sum: 2 },
    { lable: $i18n('cloudProvider.container.newContainer.节点配置'), sum: 3 },
    { lable: $i18n('cloudProvider.container.newContainer.插件安装'), sum: 4 },
    { lable: $i18n('cloudProvider.container.newContainer.确认配置'), sum: 5 },
  ];

  list_status = {
    nitial: $i18n('cloudProvider.container.newContainer.创建中'),
    failed: $i18n('cloudProvider.container.newContainer.创建失败'),
    running: $i18n('cloudProvider.container.newContainer.运行中'),
    updating: $i18n('cloudProvider.container.newContainer.升级中'),
    updating_failed: $i18n('cloudProvider.container.newContainer.升级失败'),
    scaling: $i18n('cloudProvider.container.newContainer.伸缩中'),
    stopped: $i18n('cloudProvider.container.newContainer.停止运行'),
    deleting: $i18n('cloudProvider.container.newContainer.删除中'),
    deleted: $i18n('cloudProvider.container.newContainer.删除'),
    delete_failed: $i18n('cloudProvider.container.newContainer.删除失败'),
  };

  list_acct = [];
  list_regions = [];

  choose_cluster = {} as any;

  show_btn_enter = false;

  list_cluster = [];
  //
  // computed.
  get calcPeriodUnit() {
    let priceUnitobj: any = {
      Year: $i18n('cloudProvider.container.newContainer.年'),
      Month: $i18n('cloudProvider.container.newContainer.月'),
      Week: $i18n('cloudProvider.container.newContainer.周'),
      Hour: $i18n('cloudProvider.container.newContainer.小时'),
    }
    return this.createClusterReq.workerInstanceChargeType === 'PrePaid' ? ' /' + this.prePaidReq.workerPeriod + priceUnitobj[this.prePaidReq.workerPeriodUnit] : $i18n('cloudProvider.container.newContainer./小时')
  }
  get defaultTem() {
    let obj: any = {}, targetObj = this.scenarioObj?.parameters
    if (!targetObj) return {}
    for (let key in targetObj) {
      obj[key] = targetObj[key].default
    }
    obj.productCode = this.scenarioObj.productCode
    return obj
  }

  get requiredTem() {
    let obj: any = {}, targetObj = this.scenarioObj?.parameters
    if (!targetObj) return {}
    for (let key in targetObj) {
      obj[key] = targetObj[key].required
    }
    return obj
  }

  get k8sVersionAllowedVal() { return this.scenarioObj.parameters?.kubernetesVersion.allowedValues }

  get proxyModeAllowedVal() { return this.scenarioObj.parameters?.proxyMode.allowedValues }

  get systemDiskCategoryAllowedVal() { return this.scenarioObj.parameters?.workerSystemDiskCategory.allowedValues }

  get systemDiskSizeMin() { return this.scenarioObj.parameters?.workerSystemDiskSize.minValue }
  get systemDiskSizeMax() { return this.scenarioObj.parameters?.workerSystemDiskSize.maxValue }

  get numOfNodesMinVal() { return this.scenarioObj.parameters?.numOfNodes.minValue }
  get numOfNodesMaxVal() { return this.scenarioObj.parameters?.numOfNodes.maxValue }

  get runtimeDefault() {
    let obj = this.scenarioObj.parameters?.runtime.default
    return obj?.name + '/' + obj?.version
  }
  get runtimeAllowedVal() {
    return this.scenarioObj.parameters?.runtime.allowedValues.map((item: any) => {
      return item?.name + '/' + item?.version
    })
  }
  get vpcProductCode() {
    let arr = this.scenarioObj.parameters?.vpcid.type.split('::')
    return arr && arr[0] + '::' + arr[1]
  }
  get keyPairCode() {
    let arr = this.scenarioObj.parameters?.keyPair.type.split('::')
    return arr && arr[0] + '::' + arr[1]
  }
  get instanceTypeFamily() {
    let arr = this.scenarioObj.parameters?.workerInstanceTypes.default.split('.')
    return arr && arr[0] + '.' + arr[1]
  }
  get InsTypesDefault() { return [this.scenarioObj.parameters?.workerInstanceTypes.default] }

  get vswitchIdsArr() {
    if (this.createClusterReq.vpcid === '') {
      this.createClusterReq.vswitchIds = []
      return []
    } else {
      let arr = (this.vpcCanuseList.find((item: any) => item.vpcId === this.createClusterReq.vpcid) as any).vswitchIds
      this.createClusterReq.vswitchIds = [].concat(arr[0])
      return arr
    }
  }
  //
  // watch.
  @Watch('createClusterReq.regionId')
  fun1(val: string, oldVal: string) {
    this.createClusterReq.vpcid = ''
    this.getvpcList()
  }
  @Watch('specialRuntime', { immediate: true })
  fun3(val: string, oldVal: string) {
    if (!val) return null
    let arr = val.split('/')
    this.createClusterReq.runtime = this.scenarioObj.parameters?.runtime.allowedValues.find((item: any) => {
      return arr[0] === item.name && arr[1] === item.version
    })
  }
  @Watch('specialInsTypes', { immediate: true })
  fun4(val: string[], oldVal: []) {
    if (!val) return []
    this.createClusterReq.workerInstanceTypes = val.map((item: string) => {
      if (!item) return '';
      return item.split('/')[0]
    })
  }

  //
  // lifecycle hook.
  constructor() {
    super();
  }

  created() {
    this.gettemplateList();
    this.getAcctList();

  }

  mounted() { }
  scale(val: string) {
    if (val.includes($i18n('小'))) return 'scale1';
    if (val.includes($i18n('中'))) return 'scale2';
    if (val.includes($i18n('大'))) return 'scale3';
  }
  gettemplateList() {
    api.cmp.cluster
      .template().then((data: any) => {
        this.applicationScenario = data
        this.scenarioObj = data[0]
      }).catch((err: any) => {
        throw err;
      });
  }
  getvpcRegion() {
    api.cmp.cluster
      .vpcRegion({
        accountId: this.accountId,
        productCode: this.vpcProductCode
      }).then((data: any) => {
        this.vpcRegionList = data
      }).catch((err: any) => {
        throw err;
      });
  }
  getinsTypesList() {
    api.cmp.cluster
      .insTypesList({
        accountId: this.accountId,
        instanceTypeFamily: this.instanceTypeFamily,
        regionId: this.createClusterReq.regionId,
        productCode: this.keyPairCode
      }).then((data: any) => {
        this.workerInsTypesArr = data.map((item: any) => item.instanceTypeId + '/' + item.cpuCoreCount + 'vcpu/' + item.memorySize + 'g')
      }).catch((err: any) => {
        throw err;
      });
  }
  getkeypair() {
    api.cmp.cluster
      .keyPair({
        accountId: this.accountId,
        regionId: this.createClusterReq.regionId,
        productCode: this.keyPairCode
      }).then((data: any) => {
        this.keyPairArr = data
        this.createClusterReq.keyPair = data[0]
      }).catch((err: any) => {
        throw err;
      });
  }
  getvpcList() {
    api.cmp.cluster
      .vpcList(this.vpcProductCode, {
        accountId: this.accountId,
        region: this.createClusterReq.regionId
      }).then((data: any) => {
        this.vpcCanuseList = data
        this.createClusterReq.vpcid = (this.vpcCanuseList[0] as any).vpcId
      }).catch((err: any) => {
        throw err;
      });
  }


  getAcctList() {
    api.cmp.acct
      .listAcct({})
      .then((data: any) => {
        this.acctList = data;
      })
      .catch((err: any) => {
        throw err;
      });
  }
  handleSync() {
    api.cmp.cluster
      .sync()
      .then((data: any) => {
        $UIToast({
          type: "success",
          content: $i18n('cloudProvider.container.newContainer.同步成功，稍后刷新页面'),
        });
      })
      .catch((err: any) => {
        throw err;
      });
  }


  showBtnEnter() {
    if (this.stepNum == 0) {
      if (this.choose_cluster.cloud) return true;
    } else if (this.stepNum == 1) {
      if (this.choose_cluster.accountId) return true;
    } else if (this.stepNum == 2) {
      if (this.choose_cluster.sceneId) return true;
    } else if (this.stepNum == 3) {
      if (this.choose_cluster.region) return true;
    }

    return false;
  }
  chooseScenario(i: number) {
    this.scenarioI = i
    this.scenarioObj = this.applicationScenario[i]
  }
  createdNew(): void {
    let obj = Object.assign(this.defaultTem, this.createClusterReq)
    if (this.createClusterReq.workerInstanceChargeType === 'PrePaid') {
      obj = Object.assign(obj, this.prePaidReq)
    }
    if (this.workerDataDisks[0].category !== '') {
      obj.workerDataDisks = this.workerDataDisks
    }
    if (this.pluginList.length) {
      obj.addons = this.pluginList.map((item: any) => {
        return { name: item.name }
      })
    }
    obj.accountId = this.accountId

    api.cmp.cluster.createNew(obj).then((data: any) => {
      $UIStorage.namespace_session().set("resultType", 'cluster_create');
      let temStore = $UIStorage.namespace('CLUSTER_OPS');
      temStore.set('clusterId', data.clusterId);
      this.$navbar.push({
        path: "/cloudProvider/containerDetail/resultTable",
        query: { hidSidebar: 1 }
      });
    }).catch((err: any) => {
      throw err;
    });
  }
  getPlugin() {
    let reqObj = {
      productCode: this.scenarioObj.productCode,
      pageNum: 1,
      pageSize: 10
    }
    api.cmp.cluster.plugin(reqObj).then((data: any) => {
      this.pluginList = data.list
    }).catch((err: any) => {
      throw err;
    });
  }
  calcPrice(): void {
    let obj: any = {
      accountId: this.accountId,
      productCode: this.keyPairCode,
      regionId: this.createClusterReq.regionId,
      amount: this.createClusterReq.numOfNodes,
      instanceType: this.createClusterReq.workerInstanceTypes[0],
      systemDisk: {
        category: this.createClusterReq.workerSystemDiskCategory,
        size: this.createClusterReq.workerSystemDiskSize,
      },
    }
    if (this.createClusterReq.workerInstanceChargeType === 'PrePaid') {
      obj.period = this.prePaidReq.workerPeriod
      obj.priceUnit = this.prePaidReq.workerPeriodUnit
    }
    if (this.workerDataDisks[0].category) {
      obj.dataDisk = this.workerDataDisks
    }
    api.cmp.cluster.calcPrice(obj).then((data: any) => {
      this.tradePrice = data.tradePrice
    }).catch((err: any) => {
      throw err;
    });
  }
  nextStep(item: any) {
    if (this.judgeRequire()) return;
    this.stepNum++;
    if (this.stepNum === 1 && this.vpcRegionList.length === 0) {
      this.getvpcRegion()
    }
    if (this.stepNum === 2 && this.workerInsTypesArr.length === 0) {
      this.getinsTypesList()
      this.getkeypair()
    }
    if (this.stepNum === 3) {
      this.getPlugin()
    }
    if (this.stepNum === 4) {
      this.calcPrice()
    }
    if (this.stepNum >= this.stepArr.length)
      this.stepNum = this.stepArr.length - 1;

    this.show_btn_enter = this.showBtnEnter();
  }
  judgeRequire() {
    let elRef = 'formEl' + this.stepNum

    let elChildren: any = this.$refs[elRef]
    if (this.stepNum === 0) return elChildren.judgeMust();
    for (let i = 1; this.$refs[elRef + i]; i++) {
      let elChild: any = this.$refs[elRef + i]
      if (elChild.judgeMust()) {
        return true
      }
    }
    return false
  }
  lastStep() {
    this.stepNum--;

    if (this.stepNum < 0) this.stepNum = 0;

    this.show_btn_enter = this.showBtnEnter();
  }

  handleAdd() {
    this.stepNum = 4;

    api.cmp.cluster
      .cluster(this.choose_cluster)
      .then((data: any) => {
        this.list_acct = data;

        $UIToast({
          type: "success",
          content: $i18n('cloudProvider.container.newContainer.创建成功！'),
        });

        this.stepNum = 0;
        this.choose_cluster = {};

        this.dialogShow = false;

      })
      .catch((err: any) => {
        $UIToast({
          type: "error",
          content: $i18n('cloudProvider.container.newContainer.创建失败!'),
        });
      });
  }
}
</script>
<style lang="scss" scoped>
.w600 {
  width: 500px;
}
@mixin commonWrap {
  background-color: #fff;
  padding: 16px;
  margin: 0 24px;
}
.backHeaderComponent {
  padding: 0 24px;
  .inner-step {
    text-align: center;
    flex-grow: 1;
  }
}
.cards {
  margin-top: 24px;
  display: flex;
  li {
    padding: 16px;
    margin-right: 24px;
    width: 32%;
    height: 180px;
    border: 1px solid #e5e5e5;
    cursor: pointer;
    border-left-width: 3px;
    .iconfont {
      font-weight: 400;
    }
    &.scale1 {
      border-left-color: #5392c4;
      .iconfont {
        color: #5392c4;
      }
    }
    &.scale2 {
      border-left-color: #986cbd;
      .iconfont {
        color: #986cbd;
      }
    }
    &.scale3 {
      border-left-color: #f7c91e;
      .iconfont {
        color: #f7c91e;
      }
    }
    &.active,
    &:hover {
      border-right-color: #07f;
      border-top-color: #07f;
      border-bottom-color: #07f;
    }
    .cardItem {
      div {
        margin-top: 10px;
        padding-left: 27px;
      }
    }
  }
}
.cloudCount {
  // height: 104px;
  @include commonWrap;
  display: flex;
  // align-items: center;
  > span {
    margin-right: 100px;
    line-height: 32px;
  }
}
.cardList {
  min-height: 266px;
  @include commonWrap;
  .title {
    font-size: 16px;
    font-weight: 600;
    color: #333333;
  }
}
.inner-area-items {
  height: calc(100vh - 210px);
  overflow: auto;
}
#info-pannel {
  li {
    margin-bottom: 0;
    > div:first-child {
      margin-right: 50px;
    }
  }
}
.panelInfo {
  @include commonWrap;
  h3 {
    font-size: 16px;
    font-weight: 600;
    color: #333333;
  }
  ul {
    margin-top: 24px;
    li {
      font-size: 14px;
      color: #000;
      display: flex;
      // align-items: center;
      margin-bottom: 16px;
      > div {
        line-height: 32px;
      }
      > div:first-child {
        width: 105px;
        color: #8c8c8c;
        margin-right: 105px;
      }
    }
  }
}
.step4 {
  padding: 60px;
  padding-bottom: 10px;
  display: flex;
  ul {
    margin-top: 0;
    margin-left: 80px;
  }
}
.formItems {
  @include commonWrap;
  li {
    display: flex;
    margin-bottom: 10px;
    justify-content: flex-start;
    > div:first-child {
      width: 105px;
      line-height: 32px;
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
}
footer {
  /* box-shadow: 0px 3px 10px 0px rgba(152, 162, 179, 0.5),
    0px 2px 2px -1px rgba(152, 162, 179, 0.3);
    background-color: #fff; */
  .cost {
    opacity: 0;
    .timeMoney {
      color: #ff3b30;
      margin-left: 16px;
    }
    &.show {
      opacity: 1;
    }
  }
  display: flex;
  padding: 16px;
  padding-left: 30px;
  justify-content: space-between;
  height: 70px;
  align-items: center;
}
</style>
