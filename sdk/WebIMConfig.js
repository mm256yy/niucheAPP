
import SDK from "./wxsdk3.3.1.js";

const WebIM = SDK;
const config = {
		socketServer: '//im-api-v2.easemob.com/ws',    // socket Server地址
		restServer: '//a1.easemob.com',               // rest Server地址
		appkey: '1110201016040548#demo',        // App key
		https : false,                            // 是否使用https
		isHttpDNS: true,                          // 3.0 SDK支持，防止DNS劫持从服务端获取XMPPUrl、restUrl 
		isMultiLoginSessions: false,              // 是否开启多页面同步收消息，注意，需要先联系商务开通此功能
		isDebug: false,                           // 打开调试，会自动打印log，在控制台的console中查看log
		autoReconnectNumMax: 2,                   // 断线重连最大次数
		heartBeatWait: 30000,                     // 心跳间隔（只在小程序中使用）
		delivery: false,                           // 是否发送已读回执
		useOwnUploadFun: false         // 是否使用自己的上传方式（如将图片文件等上传到自己的服务器，构建消息时只传url）	
	};
WebIM.config = config;
WebIM.conn = new WebIM.connection({
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
});

const login = options => {
	WebIM.conn.open(options);
}

const logout = () => {
	WebIM.conn.close();
}

// 环信的监听
WebIM.conn.listen({
	onOpened: function(message) { //连接成功回调
	     debugger
		console.log(message);
		uni.setStorageSync("hxToken", message.accessToken);
		console.log(uni.getStorageSync("hxToken"));
		console.log("登录环信服务器")
	},

	onClosed: function(message) {
		console.log(message);
		console.log("退出环信服务器")
	},

	onTextMessage: function(message) {
		console.log(message);
		console.log("接收到的消息是：" + message.data);
	},

	onOnline: function() {
		console.log("本机网络连接成功");
	},

	onOffline: function() {
		console.log("本机网络掉线");
		uni.showToast({
			title: '您的网络有点不太良好哦',
			duration: 2000,
			icon: "none"
		})
	},

	onRoster: function(message) {
		console.log("添加成功了新的好友");
	}
});
module.exports = {
	conn: WebIM.conn,
	SDKlogin: login,
	SDKlogout: logout,
	WebIM: WebIM
};

