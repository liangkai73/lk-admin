<!--
/**
* Copyright (c) 2017 Copyright taijin All Rights Reserved.
* Author: fanbingkun
* Date: 2018-07-11 17:34
* Desc: 支持断点续传.
*/

接收的属性
- tip 右边的提示语句
- serverUrl 上传服务器的地址
- fileType 接受文件的类型
- maxFileSize 允许上传的最大文件.0表示无限制.默认为0

emit事件:
- uploadSuccess: 上传成功返回图片地址
-->


<template>
  <div class="file-content" @click.stop="onClickUpload">
    <div class="progress" :style="{ width: percentage }"></div>
    <div class="center" style="width: 100%; height: 100%">
      <!-- <uiLayout  warp row align_center justify_center style="width:100%; height:100%;">
        <i class="add-icon fa fa-plus-circle"></i>
      </uiLayout> -->

      <slot />
      <form
        method="post"
        ref="fileForm"
        class="fileform"
        role="form"
        enctype="multipart/form-data"
      >
        <input
          :id="_uid + 'file'"
          type="file"
          ref="fileInput"
          name="file"
          accept="*/*"
          @change="upload"
          class="img_input"
        />
      </form>
    </div>

    <i
      v-if="(!video_url_real || video_url_real.length == 0) && inUploading"
      class="far fa-times-circle"
      title="cancel"
      style="align-self: flex-start; display: none"
      @click.stop="cancelUpload()"
    ></i>
    <i
      v-if="video_url_real && video_url_real.length > 0"
      class="far fa-retweet"
      title="upload"
      style="align-self: flex-start"
      @click.stop="$refs.fileInput.click()"
    ></i>
  </div>
</template>

<script lang="ts">
import {
  Vue,
  Component,
  Ref,
  Prop,
  Emit,
  Provide,
  Watch,
} from "vue-property-decorator";
import * as febsui from "febs-ui";
import * as febs from "febs";
// import uiApi from "@/components/ui/uiApi";
// import errCode from "@/api/errCode";
// import storeToken from "@/api/store/storeToken";
import _token from "@/api/_token";

// import { uiLayout, uiFlex } from "@/components/ui/uiLayout";

const KEY_HEADER_UPLOAD_BREAKPOINT = "X-Upload-Breakpoint";
const KEY_HEADER_UPLOAD_BREAKPOINT_SIZE = "X-Upload-Breakpoint-Size";
const KEY_HEADER_UPLOAD_BREAKPOINT_HASH = "X-Upload-Breakpoint-Hash";
const KEY_HEADER_UPLOAD_BREAKPOINT_OFFSET = "X-Upload-Breakpoint-Offset";

const UPLOAD_BLOCK_SIZE = 1024 * 1024 * 2;

@Component({
  components: {},
})
export default class extends Vue {
  @Ref() fileInput: any;
  @Ref() fileForm: any;

  //   @Emit()
  uploadSuccess(serverData: any) {}

  @Prop({ default: 30000 }) timeout?: number;
  @Prop({ default: "" }) tip?: string;
  @Prop({ default: "" }) fileType?: string;
  @Prop({ default: 0 }) maxFileSize?: number;
  @Prop({ default: "" }) img_url?: string;
  @Prop({ default: "" }) video_url?: string;
  private _stopUpload: boolean = false;

  @Provide() inUploading: boolean = false;
  @Provide() img_url_real: any = "";
  @Provide() video_url_real: any = "";

  @Watch("img_url")
  onImgUrlChanged(val: any) {
    this.img_url_real = val;
  }
  @Watch("video_url")
  onVideoUrlChanged(val: any) {
    this.video_url_real = val;
  }

  @Provide() percentage: string = "0%";
  private server_url: string = "/file-service/api/v1/uploadContinued";

  mounted() {
    this.img_url_real = this.img_url;
    this.video_url_real = this.video_url;
    this.percentage = "0%";
  }

  /**
   * @desc: 取消上传.
   * @return:
   */
  cancelUpload() {
    this._stopUpload = true;
    this.percentage = "0%";
    this.inUploading = false;
  }

  upload() {
    // const token = storeToken.getToken();
    let accessToken = _token._getToken();
    // const token = storeAuth.state.token.value
    let headers: any = {
      Authorization: "Bearer " + accessToken,
    };

    // 增加断点续传信息.
    let fileObj = this.fileInput.files[0];
    // debugger
    if (fileObj) {
      this.inUploading = true;
      this._stopUpload = false;

      // febs
      let filename = fileObj.name;

      //   uiApi.loading.show("正在验证文件");

      febs.crypt.crc32_file(fileObj, (crc32: number) => {
        // uiApi.loading.hide();
        if (crc32 == 0) {
          this.inUploading = false;
          this._stopUpload = false;
          this.fileInput.value = "";
          //   uiApi.dialog.alert("无法校验视频文件, 请重试!");
          return;
        }

        // 标记断点续传.
        headers[KEY_HEADER_UPLOAD_BREAKPOINT] = encodeURIComponent(filename);
        headers[KEY_HEADER_UPLOAD_BREAKPOINT_SIZE] = fileObj.size.toString();
        headers[KEY_HEADER_UPLOAD_BREAKPOINT_HASH] = crc32.toString();

        $UINetwork
          .get(this.server_url, {}, { headers })
          .then((res: any) => {
            console.log(res);
            if (res.offset >= 0) {
              this.img_url_real = null;
              this.video_url_real = null;
              this._uploadSegment(
                res.offset,
                crc32,
                fileObj.size,
                filename,
                this.fileForm,
                this.fileInput
              );
            } else {
              this.fileInput.value = "";
              this.inUploading = false;
              this._stopUpload = false;
              this.uploadSuccess(res);
            }
          })
          .catch((e: any) => {
            this.inUploading = false;
            this._stopUpload = false;
            this._reupload($i18n('ui.uiploader.网络错误'));
          });
      });
    } // if.
  }

  private _reupload(errMsg: string) {
    // uiApi.dialog.confirm({
    //   title: errMsg,
    //   content: "是否重新上传?",
    //   okText: "重传",
    //   confirm: (dialog: any) => {
    //     this.upload();
    //     uiApi.dialog.hide(dialog);
    //   },
    //   cancel: () => {
    //     this.percentage = "0%";
    //     this.fileInput.value = "";
    //   },
    // });
  }

  /**
   * @desc: 上传文件片段, 直到完成.
   * @return:
   */
  private _uploadSegment(
    offset: number,
    crc32: number,
    filesize: number,
    filename: string,
    fileForm: any,
    fileInput: any
  ) {
    const KEY_HEADER_REQ_SID = "X-Requested-Sid";
    const KEY_HEADER_REP_SID = "X-Response-Sid";

    // const token = storeToken.getToken();

    if (this._stopUpload) {
      this._stopUpload = false;
      this.percentage = "0%";
      return;
    }

    this.inUploading = true;
    // const token = storeAuth.state.token.value
    let accessToken = _token._getToken();
    let headers: any = {
      "Content-Type": "application/json",
      Authorization: "Bearer " + accessToken,
    };
    // if (token) {
    //   headers[KEY_HEADER_REQ_SID] = token;
    // } else {
    //   headers[KEY_HEADER_REQ_SID] = "true";
    // }

    // 增加断点续传信息.
    if (fileInput.files[0]) {
      // 标记断点续传.
      headers[KEY_HEADER_UPLOAD_BREAKPOINT] = encodeURIComponent(filename);
      headers[KEY_HEADER_UPLOAD_BREAKPOINT_SIZE] = filesize.toString();
      headers[KEY_HEADER_UPLOAD_BREAKPOINT_HASH] = crc32.toString();
      headers[KEY_HEADER_UPLOAD_BREAKPOINT_OFFSET] = offset.toString();

      let _fileInput = fileInput;
      let _fileForm = fileForm;
      let _filename = filename;
      let _filesize = filesize;
      let _crc32 = crc32;

      // 开始上传.
      let options: any = {
        timeout: this.timeout,
        crossDomain: true,
        headers: headers,
        // formObj: $(fileForm),
        formObj: document.getElementsByClassName("fileform")[0],
        // fileObj: $(fileInput),
        fileObj: document.getElementsByClassName("img_input")[0],
        fileType: "*/*",
        // uploadUrl: process.env.VUE_APP_URL.toString() + this.server_url,
        uploadUrl: process.env.VUE_APP_URL + "/file-service/api/v1/upload",
        maxFileSize: this.maxFileSize,
        withCredentials: false,
        finishCB: (err: any, fileObj: any, serverData: any) => {
          serverData = serverData.data;
          if (err) {
            let inputDom = fileObj[0];
            inputDom.value = "";
            // let str = inputDom.outerHTML;
            // inputDom.outerHTML = str;
            // console.log(inputDom);
          }
          if (serverData.offset > 0) {
            this._uploadSegment(
              serverData.offset,
              _crc32,
              _filesize,
              _filename,
              _fileForm,
              fileObj[0]
            );
          } else {
            let inputDom = fileObj[0];
            inputDom.value = "";
            console.log(inputDom);
            this.$emit("uploadSuccess", serverData);
          }
        },
        progressCB: (fileObj: any, percent: any) => {
          percent = percent == 0 ? 0.01 : percent;
          this.percentage = Math.ceil(percent * 100) + "%";
          this.$emit("getPercentage", this.percentage);
        },
        sliceOffset: offset, // 上传数据偏移地址. (ie9及以下不支持).
        sliceLength: UPLOAD_BLOCK_SIZE, // 上传数据段长度 (-1表示到结尾). (ie9及以下不支持).
      };

      febsui.upload(options);
    } else {
      this.inUploading = false;
    }
  }

  private onClickUpload() {
    // if (this.percentage != "0%") return false;
    let fileInput: any = this.$refs.fileInput;
    fileInput.click();
    return false;
  }
}
</script>


<style lang="scss" scoped>
.file-content {
  box-sizing: border-box;
  font-size: 14px;
  display: flex;
  align-items: flex-end;
  padding: 5px;
  .progress {
    height: 3px;
    width: 0%;
    position: absolute;
    background: #48a68e;
    transition: width 0.1s;
    top: 0;
    left: 0;
    right: 0;
  }
  .center {
    width: 100%;
    position: relative;
    .fileform {
      visibility: hidden;
      position: absolute;
      width: 100%;
      height: 100%;
      top: 0;
      left: 0;
      right: 0;
      opacity: 0;
      background: transparent;
      cursor: pointer;
    }
    .add-icon {
      font-size: 30px;
      color: #999;
    }
  }
  .tip {
    color: #999;
    margin-left: 20px;
  }
}

.img_input {
  width: 100% !important;
  height: 100% !important;
  visibility: hidden;
}
</style>
