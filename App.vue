
<script>
	
	import Vue from 'vue'
	import {dirverPages,companyPages} from '@/utils/tabbar.js'
	import {updateUrl} from '@/utils/constant.js'
	// 环信
	require("sdk/libs/strophe");
	let msgStorage = require("comps/chat/msgstorage");
	let msgType = require("comps/chat/msgtype");
	let disp = require("utils/broadcast");
	let logout = false;
	let is_reconnect = false;
	export default {
		globalData: {
			unReadMessageNum: 0,
			userInfo: null,
			saveFriendList: [],
			saveGroupInvitedList: [],
			groupList: [],
			isIPX: false //是否为iphone X
		},
		onLaunch: function() {
			//初始化
			this.initSystem();
			//检测升级
			this.checkUpdate()
			//中间图标点击
			// this.midButtonTap()
			 var me = this;
			 var logs = uni.getStorageSync("logs") || [];
			 logs.unshift(Date.now());
			 uni.setStorageSync("logs", logs);
			 
			 disp.on("em.main.ready", function(){
				me.calcUnReadSpot();
			 });
			 //离开chatroom
			 disp.on("em.chatroom.leave", function(){
				console.log('em.chatroom.leave');
				me.calcUnReadSpot();
			 });
			 disp.on("em.chat.session.remove", function(){
				me.calcUnReadSpot();
			 });
			 disp.on('em.chat.audio.fileLoaded', function(){
				me.calcUnReadSpot()
			 });
			 
			 disp.on('em.main.deleteFriend', function(){
				me.calcUnReadSpot()
			 });
			 disp.on('em.chat.audio.fileLoaded', function(){
				me.calcUnReadSpot()
			 });
			
			this.initListen()
		},
		onShow() {
			this.setTabBar()
		},
		methods:{
			initListen(){
				this.$im.conn.listen({
					onOpened: (message)=>{
						this.$im.conn.setPresence();
						console.log('登录成功登录成功登录成功登录成功登录成功登录成功登录成功');
						message.accessToken && uni.setStorageSync("myToken", message.accessToken);
						if (is_reconnect) {
							is_reconnect = false;
						}
						// if(this.getCurrentRoute() == "pages/login/login" || getCurrentRoute() == "pages/login_token/login_token"){
						// 	this.onLoginSuccess();
						// }
						
					},
					onReconnect: ()=>{
						this.$helper.toast('loading', '重连中...', 2000)
					},
					onSocketConnected: ()=>{
						this.$helper.toast('success', '登陆成功', 2000)
					},
					onClosed: ()=>{
						this.$helper.toast('none', '网络已断开', 2000)
						this.$conn.closed = true;
						this.$im.conn.close();
					},
					onInviteMessage: (message)=>{
						this.$options.globalData.saveGroupInvitedList.push(message);
						disp.fire("em.xmpp.invite.joingroup", message);
					},
					onPresence: (message)=>{
						console.log("onPresence", message);
						switch(message.type){
						case "unsubscribe":
							// pages[0].moveFriend(message);
							break;
						// 好友邀请列表
						case "subscribe":
							if(message.status === "[resp:true]"){
								return;
							}
							else{
								// pages[0].handleFriendMsg(message);
								for (let i = 0; i < this.$options.globalData.saveFriendList.length; i ++) {
							      	if(this.$options.globalData.saveFriendList[i].from === message.from){
							      		this.$options.globalData.saveFriendList[i] = message
							      		disp.fire("em.xmpp.subscribe");
										return;
							 		}
							    }
								this.$options.globalData.saveFriendList.push(message);
								console.log(JSON.stringify(this.$options.globalData.saveFriendList));
								disp.fire("em.xmpp.subscribe");
							}
							break;
						case "subscribed":
							uni.showToast({
								title: "添加成功",
								duration: 1000
							});
							disp.fire("em.xmpp.subscribed");
							break;
						case "unsubscribed":
							uni.showToast({
								title: "已拒绝",
								duration: 1000
							});
							break;
						case "memberJoinPublicGroupSuccess":
							this.$helper.toast('none', '已进群', 1000)
							break;
						// 好友列表
						// case "subscribed":
						// 	let newFriendList = [];
						// 	for(let i = 0; i < me.$options.globalData.saveFriendList.length; i++){
						// 		if(me.$options.globalData.saveFriendList[i].from != message.from){
						// 			newFriendList.push(me.$options.globalData.saveFriendList[i]);
						// 		}
						// 	}
						// 	me.$options.globalData.saveFriendList = newFriendList;
						// 	break;
						// 删除好友
						case "unavailable":
							disp.fire("em.xmpp.contacts.remove");
							disp.fire("em.xmpp.group.leaveGroup", message);
							break;
				
						case 'deleteGroupChat':
							disp.fire("em.xmpp.invite.deleteGroup", message);
							break;
				
						case "leaveGroup": 
							disp.fire("em.xmpp.group.leaveGroup", message);
							break;
				
						case "removedFromGroup": 
							disp.fire("em.xmpp.group.leaveGroup", message);
							break;
						// case "joinChatRoomSuccess":
						// 	uni.showToast({
						// 		title: "JoinChatRoomSuccess",
						// 	});
						// 	break;
						// case "memberJoinChatRoomSuccess":
						// 	uni.showToast({
						// 		title: "memberJoinChatRoomSuccess",
						// 	});
						// 	break;
						// case "memberLeaveChatRoomSuccess":
						// 	uni.showToast({
						// 		title: "leaveChatRoomSuccess",
						// 	});
						// 	break;
				
						default:
							break;
						}
					},
				
					onRoster: (message)=>{
						// let pages = getCurrentPages();
						// if(pages[0]){
						// 	pages[0].onShow();
						// }
					},
				
					onVideoMessage: (message)=>{
						console.log("onVideoMessage: ", message);
						if(message){
							msgStorage.saveReceiveMsg(message, msgType.VIDEO);
						}
						this.calcUnReadSpot(message);
						this.ack(message);
					},
				
					onAudioMessage: (message)=>{
						console.log("onAudioMessage", message);
						if(message){
							if(this.onMessageError(message)){
								msgStorage.saveReceiveMsg(message, msgType.AUDIO);
							}
							this.calcUnReadSpot(message);
							this.ack(message);
						}
					},
					
					onCmdMessage: (message)=>{
						console.log("onCmdMessage", message);
						if(message){
							if(this.onMessageError(message)){
								msgStorage.saveReceiveMsg(message, msgType.CMD);
							}
							this.calcUnReadSpot(message);
							this.ack(message);
						}
					},
				
					// onLocationMessage: (message)=>{
					// 	console.log("Location message: ", message);
					// 	if(message){
					// 		msgStorage.saveReceiveMsg(message, msgType.LOCATION);
					// 	}
					// },
				
					onTextMessage: (message)=>{
						console.log("onTextMessage", message);
						if(message){
							if(this.onMessageError(message)){
								msgStorage.saveReceiveMsg(message, msgType.TEXT);
							}
							this.calcUnReadSpot(message);
							this.ack(message);
						}
					},
				
					onEmojiMessage: (message)=>{
						console.log("onEmojiMessage", message);
						if(message){
							if(this.onMessageError(message)){
								msgStorage.saveReceiveMsg(message, msgType.EMOJI);
							}
							this.calcUnReadSpot(message);
							this.ack(message);
						}
					},
				
					onPictureMessage: (message)=>{
						console.log("onPictureMessage", message);
						if(message){
							if(this.onMessageError(message)){
								msgStorage.saveReceiveMsg(message, msgType.IMAGE);
							}
							this.calcUnReadSpot(message);
							this.ack(message);
						}
					},
				
					onFileMessage: (message)=>{
						console.log('onFileMessage', message);
						if (message) {
							if(this.onMessageError(message)){
								msgStorage.saveReceiveMsg(message, msgType.FILE);
							}
							this.calcUnReadSpot(message);
							this.ack(message);
						}
					},
				
					// 各种异常
					onError: (error)=>{
						console.log(error)
						// 16: server-side close the websocket connection
						if(error.type == this.$im.statusCode.WEBIM_CONNCTION_DISCONNECTED && !logout){
							if(this.$im.conn.autoReconnectNumTotal < this.$im.conn.autoReconnectNumMax){
								return;
							}
							uni.showToast({
								title: "server-side close the websocket connection",
								duration: 1000
							});
							logout = true
							return;
						}
						// 8: offline by multi login
						if(error.type == this.$im.statusCode.WEBIM_CONNCTION_SERVER_ERROR){
							uni.showToast({
								title: "offline by multi login",
								duration: 1000
							});
						}
						if(error.type ==  this.$im.statusCode.WEBIM_CONNCTION_OPEN_ERROR){
							disp.fire("em.xmpp.error.passwordErr");
							// uni.showModal({
							// 	title: "用户名或密码错误",
							// 	confirmText: "OK",
							// 	showCancel: false
							// });
						}
						if (error.type == this.$im.statusCode.WEBIM_CONNCTION_AUTH_ERROR) {
							disp.fire("em.xmpp.error.tokenErr");
						}
						if (error.type == 'socket_error') {///sendMsgError
							console.log('socket_errorsocket_error', error)
							uni.showToast({
								title: "网络已断开",
								icon: 'none',
								duration: 2000
							});
							disp.fire("em.xmpp.error.sendMsgErr", error);
						}
					},
				});
			},
			calcUnReadSpot(message){
				let myName = uni.getStorageSync("myUsername");
				let members = uni.getStorageSync("member") || []; //好友
				var listGroups = uni.getStorageSync('listGroup')|| []; //群组
				let allMembers = members.concat(listGroups)
				let count = allMembers.reduce(function(result, curMember, idx){
					let chatMsgs;
					if (curMember.roomId) {
						chatMsgs = uni.getStorageSync(curMember.roomId + myName.toLowerCase()) || [];
					}else{
						chatMsgs = uni.getStorageSync(curMember.name.toLowerCase() + myName.toLowerCase()) || [];
					}
					return result + chatMsgs.length;
				}, 0);
				this.$options.globalData.unReadMessageNum = count;
				disp.fire("em.xmpp.unreadspot", message);
			},
			initSystem(){
				// #ifdef APP-PLUS
					setTimeout(() => {
						plus.navigator.closeSplashscreen();
					}, 2000);
				// #endif
				let date = new Date();
				let year = date.getFullYear();
				let month = date.getMonth()+1;
				let day = date.getDate();
				let obj = {year:year,month:month,day:day};
				 uni.setStorageSync('today', obj);
				 let type = uni.getStorageSync('curThemeType');
				 if(!type){
					 uni.setStorageSync('curThemeType', 'driver');
				 }
			},
			//检测升级
			checkUpdate(){
				const self = this
				uni.getSystemInfo({
					success: function(e) {
						// app整包更新检测
						self.appUpgrade(e.platform)
					}
				})
			},
			/**
			 * app整包更新检测
			 */
			appUpgrade(platform) {
				let that = this;
				if (platform !== 'android') {
					return
				}
				//#ifdef APP-PLUS
				plus.runtime.getProperty(plus.runtime.appid, (wgtinfo) => {
					uni.request({
					    url: updateUrl+wgtinfo.versionCode, 
						method:'POST',
					    data: {version: wgtinfo.versionCode},  
					    success: (res) => {
							if(res.data.code === 200){
							   let data = res.data.object;
							   if(data.checkState === 1 ){
								  that.showUpdateModel(data)
							   } //if
						   } //code 200
					 }
				   })//请求
				})
				//#endif
			},
			showUpdateModel(data){
				let that = this;
				uni.showModal({
					title: "下载更新提示",
					content: '检测到有新的版本，请升级',
					showCancel: false,
					confirmText: '确定',
					success: sucRes => {
						if (sucRes.confirm) {
                            that.downFile(data)
						}
					}//确定按钮
				})//model
			},
			downFile(data){
				uni.downloadFile({
					url: data.url,  
					success: (downloadResult) => {  
						if (downloadResult.statusCode === 200) {  
							plus.runtime.install(downloadResult.tempFilePath, {  
								force: false  
							}, function() {  
								console.log('install success...');  
								plus.runtime.restart();  
							}, function(e) {  
								console.error('install fail...');  
							});  
						}  
					}  
				}); //dowload
			},
			midButtonTap(){
				uni.onTabBarMidButtonTap(function(e){
				   let token = uni.getStorageSync('token');
				   if (token){
					   let role = uni.getStorageSync('role');
					   console.log(role)
					   if (role == 2){
						  uni.navigateTo({
							  url: '/pages/company/release/release'
						  });
					   } else{ 
						   uni.navigateTo({
							   url: '/pages/driver/release/release'
						   });
					   }
				   } else {
						uni.showToast({
							title:"请先登录，认证" 
						  })
					   uni.switchTab({
						   url: '/pages/mycenter/mycenter'
					   });
				   }
				})
			},
		    setTabBar(){
			  let type = uni.getStorageSync('curThemeType');
			  if (type === 'company'){
			  	companyPages.forEach(item=>{
			  		uni.setTabBarItem(item)
			  	})
			  	uni.setTabBarStyle({
			  	  selectedColor: '#46B773',
			  	})
			  } else {
			  	dirverPages.forEach(item=>{
			  		uni.setTabBarItem(item)
			  	})
			  	uni.setTabBarStyle({
			  	  selectedColor: '#FF9E00',
			  	})
			  }
		  },	
			
		},
		onHide: function() {
			console.log('App Hide')
			uni.removeStorageSync('popupFlag')
		},
	}
</script>

<style lang="scss">
	
	@import "uview-ui/index.scss";
	@font-face{
		font-family:"siyuan";
		src: url('~@/static/SourceHanSansCN-Medium.ttf');
	}
	// .uni-page-head{
	// 	background: linear-gradient(55deg, $bg-grad-FE, $bg-grad-FCD);
	// }
</style>

