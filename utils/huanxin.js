import WebIM from '@/sdk/wxsdk3.3.1.js'
import config from '@/sdk/WebIMConfig.js'
 let conn = {};
 WebIM.config = config;
 conn = WebIM.conn = new WebIM.connection({
	 appKey: WebIM.config.appkey,
	 isHttpDNS: WebIM.config.isHttpDNS,
	 isMultiLoginSessions: WebIM.config.isMultiLoginSessions,
	 https: WebIM.config.https,
	 url: WebIM.config.socketServer,
	 apiUrl: WebIM.config.restServer,
	 isAutoLogin: WebIM.config.isAutoLogin,
	 heartBeatWait: WebIM.config.heartBeatWait,
	 autoReconnectNumMax: WebIM.config.autoReconnectNumMax,
	 autoReconnectInterval: WebIM.config.autoReconnectInterval,
	 delivery: WebIM.config.delivery,
	 useOwnUploadFun: WebIM.config.useOwnUploadFun
 })
 export default {conn}