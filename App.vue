<script>
	import Vue from 'vue'
	import {
		dirverPages,
		companyPages
	} from '@/utils/tabbar.js'
	import {
		updateUrl
	} from '@/utils/constant.js'
	import commen from '@/common/commen.js'
	export default {
		onLaunch: function() {
			//初始化
			this.initSystem();
			//检测升级
			this.checkUpdate()
			//中间图标点击
			// this.midButtonTap()
		},
		mounted() {
			/**官网有很多关于关于sdk 其他的监听方法（比如：有新的消息，用户资料更新等等）
			 * 详情可对照： https://imsdk-1252463788.file.myqcloud.com/IM_DOC/Web/SDK.html
			 * 监听的含义：服务端发生了数据变更---前端全局可以接收到变更通知--前端就可以自动触发某个事件来更新相应数据
			 * */
			// 登录成功后会触发 SDK_READY 事件，该事件触发后，可正常使用 SDK 接口
			this.tim.on(this.$TIM.EVENT.SDK_READY, this.onReadyStateUpdate, this);
			// 收到新消息
			this.tim.on(this.$TIM.EVENT.MESSAGE_RECEIVED, this.onReceiveMessage);
			// 会话列表更新
			this.tim.on(this.$TIM.EVENT.CONVERSATION_LIST_UPDATED, event => {
				this.$store.commit("updateConversationList", event.data);
			});
		},
		onShow() {
			this.setTabBar()
		},
		methods: {
			onReadyStateUpdate({
				name
			}) {
				const isSDKReady = name === this.$TIM.EVENT.SDK_READY ? true : false;
				//自动监听并更新 sdk 的ready 状态 （未登录是 notReady  登录后是ready）
				this.$store.commit("toggleIsSDKReady", isSDKReady);
				console.log(isSDKReady)
				//sdk ready 后  肯定完成了登录操作    这里可以获取用户存储在im的基础信息/离线消息/黑名单列表
			},

			onReceiveMessage({
				data: messageList
			}) {
				 this.toChat()
				console.log(messageList.form,'我收到消息了')
				// this.handleAt(messageList);
				this.$store.commit("pushCurrentMessageList", messageList);
			},
			toChat(){
				var pages = getCurrentPages();
				var page = pages[pages.length - 1];
				let pageRouter = page.route
				// #ifdef APP-PLUS
				var currentWebview = page.$getAppWebview();
				console.log(currentWebview.id);//获得当前webview的id
				console.log(currentWebview.isVisible());//查询当前webview是否可见
				// #endif
				if (pageRouter !='pages/tim/room' && pageRouter!='pages/tim/record'){
					uni.showModal({
						title: "收到新的消息",
						content: '是否立即查看',
						showCancel: true,
						confirmText: '查看',
						success: sucRes => {
							if (sucRes.confirm) {
								this.$u.route('pages/tim/record')
							}
						} 
					}) 
				}
			},
			initSystem() {
				// #ifdef APP-PLUS
				setTimeout(() => {
					plus.navigator.closeSplashscreen();
				}, 2000);
				// #endif
				let date = new Date();
				let year = date.getFullYear();
				let month = date.getMonth() + 1;
				let day = date.getDate();
				let obj = {
					year: year,
					month: month,
					day: day
				};
				uni.setStorageSync('today', obj);
				let type = uni.getStorageSync('curThemeType');
				if (!type) {
					uni.setStorageSync('curThemeType', 'driver');
				}
			},
			//检测升级
			checkUpdate() {
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
						url: updateUrl + wgtinfo.versionCode,
						method: 'POST',
						data: {
							version: wgtinfo.versionCode
						},
						success: (res) => {
							if (res.data.code === 200) {
								let data = res.data.object;
								if (data.checkState === 1) {
									that.showUpdateModel(data)
								} //if
							} //code 200
						}
					}) //请求
				})
				//#endif
			},
			showUpdateModel(data) {
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
					} //确定按钮
				}) //model
			},
			downFile(data) {
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
			midButtonTap() {
				uni.onTabBarMidButtonTap(function(e) {
					let token = uni.getStorageSync('token');
					if (token) {
						let role = uni.getStorageSync('role');
						console.log(role)
						if (role == 2) {
							uni.navigateTo({
								url: '/pages/company/release/release'
							});
						} else {
							uni.navigateTo({
								url: '/pages/driver/release/release'
							});
						}
					} else {
						uni.showToast({
							title: "请先登录，认证"
						})
						uni.switchTab({
							url: '/pages/mycenter/mycenter'
						});
					}
				})
			},
			setTabBar() {
				let type = uni.getStorageSync('curThemeType');
				if (type === 'company') {
					companyPages.forEach(item => {
						uni.setTabBarItem(item)
					})
					uni.setTabBarStyle({
						selectedColor: '#46B773',
					})
				} else {
					dirverPages.forEach(item => {
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

	@font-face {
		font-family: "siyuan";
		src: url('~@/static/SourceHanSansCN-Medium.ttf');
	}

	// .uni-page-head{
	// 	background: linear-gradient(55deg, $bg-grad-FE, $bg-grad-FCD);
	// }
</style>
