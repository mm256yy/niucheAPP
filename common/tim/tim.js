import TIM from 'tim-js-sdk';
// import COS from "cos-js-sdk-v5";
import {SDKAPPID,SECRETKEY} from '@/utils/constant.js'

const options = {
  SDKAppID: SDKAPPID // 接入时需要将0替换为您的即时通信应用的 SDKAppID
};
// 创建 SDK 实例，TIM.create() 方法对于同一个 SDKAppID 只会返回同一份实例
const tim = TIM.create(options); // SDK 实例通常用 tim 表示
const TIMData = TIM
// 注册 COS SDK 插件
// tim.registerPlugin({'cos-js-sdk': COS});



/* eslint-disable require-jsdoc */
function genTestUserSig(userID) {
    const EXPIRETIME = 31536000;
    const SDKAPPID = SDKAPPID;
    const SECRETKEY = SECRETKEY
 
  if (SDKAPPID === '' || SECRETKEY === '') {
    console.log('请先配置好您的账号信息： SDKAPPID 及 SECRETKEY ')
  }
  const generator = new LibGenerateTestUserSig(SDKAPPID, SECRETKEY, EXPIRETIME);
  const userSig = generator.genTestUserSig(userID);
  return {
    sdkAppId: SDKAPPID,
    userSig: userSig
  };
}

export default {
	tim,
	TIMData,
	genTestUserSig
}