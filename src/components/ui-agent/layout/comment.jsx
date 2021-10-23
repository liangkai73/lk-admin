'use strict';

/**
* Copyright (c) 2021 bpui All Rights Reserved.
* Author: brian.li
* Date: 2021-09-14 11:16
* Desc: 
*/

// import styled from 'styled-components';
import styled from 'vue-styled-components';

const _UILayoutComment = {
  render(createElement) {
    let dataRender = getRenderData(this);
    let children = this.$slots.default;
    return createElement('div', dataRender, children);
  }
}

export const UILayoutComment = styled('div')`
  display: flex;
  flex-direction: row;
  width: 100%;
  background: #dfeaff;
  color: #486dab;
  padding: 15px 40px;
  font-size: 14px;
  border-radius: 3px;
  margin-top: 10px;
  margin-bottom: 10px;
  .ui-icon {
    color: #486dab;
    margin-right: 5px;
    width: 20px;
    height: 20px;
    font-size: 20px;
  }
`;