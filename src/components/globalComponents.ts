import Vue from "vue";

import uiCardComponent from "./ui/uiCard.vue";
import uiNoteComponent from "./ui/uiNote.vue";
import uiNoRecords from "./ui/uiNoRecords.vue";
// import contentViewComponent from "../layout/contentView.vue";
import uiCloudIconComponent from "./ui/uiCloudIcon.vue";


function install() {
  if ((install as any).installed) {
    return;
  }
  (install as any).installed = true;

  Vue.component("uiCard", uiCardComponent);
  Vue.component("uiNote", uiNoteComponent);
  Vue.component("uiCloudIcon", uiCloudIconComponent);
  Vue.component("uiNoRecords", uiNoRecords);
}
install();
