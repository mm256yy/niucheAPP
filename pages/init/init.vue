<template>
	<view>
	    <DriverIndex ref="driver" v-if='curThemeType ==="driver"'></DriverIndex>
		<Company ref="driver" v-else></Company>
<!-- 		<u-popup v-model="show" mode="center" border-radius="22" :mask-close-able='false' z-index="10075">
			<view style="width: 580rpx;">
				<u-image height="780rpx" mode="aspectFill" :src="data.photo" @click="toPage"></u-image>
			</view>
			<view class="close_btn" @click="show=false">
				<img src="http://niuche-default.neocab.cn/guanbi.png" alt="">
			</view>
		</u-popup> -->
		<aui-poster
		    ref="poster"
		    :mask="auiPoster.mask"
		    :maskTapClose="auiPoster.maskTapClose"
		    :image="auiPoster.image"
		    @callback="auiPosterCallback"
		></aui-poster>
	</view>
</template>

<script>
	// chat
	import {mapState} from "vuex";
	// 
	import Company from '../index/company/company.vue'
	import DriverIndex from './driverIndex.vue'
	import {aui} from '@/components/aui-poster/common/aui/js/aui.js';
	import auiPoster from '@/components/aui-poster/aui-poster.vue';
	import {
		dirverPages,
		companyPages
	} from '@/utils/tabbar.js'
	export default {
		components: {
			Company,
			DriverIndex,
			auiPoster
		},
		data() {
			return {
				upOption: {},
				downOption: {},
				show: false,
				data: {},
				auiPoster: {
					mask: true,
					maskTapClose: false,
					image: 'https://xbjz1.oss-cn-beijing.aliyuncs.com/upload/default/share.png'
				  }
			}
		},
		computed:{
			...mapState({
				isLogin:state=>state.isLogin,
				isSDKReady:state=>state.isSDKReady
			})
		},
		onShow() {
			// this.$store.commit('reset')
			this.initChat()
			this.init()
			let type = uni.getStorageSync('curThemeType');
			if (type === 'company') {
				companyPages.forEach(item => {
					uni.setTabBarItem(item)
				})
				uni.setTabBarStyle({
					selectedColor: '#41B36D',
				})
			} else {
				dirverPages.forEach(item => {
					uni.setTabBarItem(item)
				})
				uni.setTabBarStyle({
					selectedColor: '#FE9217',
				})
			}
			if (this.$refs.driver != undefined) {
				this.$refs.driver.getList()
			}
			
		},
		methods: {
			initChat(){
				let isLogin = this.$store.state.isLogin;
				if (isLogin){
					return
				}
				this.initLogin()
			},
			// 登录tim
			initLogin(){
			  let token = uni.getStorageSync('token');
			  if (!token){
				  return false
			  }
				this.$u.api.getSing().then(res=>{
					if (res.code === 200){
						let userInfo = res.object;
						let promise = this.tim.login({userID: userInfo.userId,userSig: userInfo.singer});
						promise.then((res) => {
							//登录成功后 更新登录状态
							this.$store.commit("toggleIsLogin", true);
							//自己平台的用户基础信息
							uni.setStorageSync('userInfo', JSON.stringify(userInfo))
							//tim 返回的用户信息
							uni.setStorageSync('userTIMInfo', JSON.stringify(res.data))
						}).catch((err) => {
							console.warn('login error:', err); // 登录失败的相关信息
						});
					}
				}).catch((err) => {
						console.log(err)
				});
			},
			tipsConfirm() {
				let role = uni.getStorageSync('role');
				if (role === 2) {
					this.$u.route('/pages/company/identityAuth/identityAuth')
				} else {
					this.$u.route('/pages/driver/drivingLicense/drivingLicense')
				}
			},
			//初始化弹窗
			init() {
				let token = uni.getStorageSync('token');
				let curThemeType = uni.getStorageSync('curThemeType');
				let type = 'VISITOR'
				if (token) {
					if (curThemeType === 'driver') {
						type = 'DRIVER'
					} else {
						type = 'COMPANY'
					}
					this.popupShow(type)
				} else {
					let flag = uni.getStorageSync('popupFlag');
					if (flag === "") {
						this.popupShow(type)
					}
				}
			},
			toPage(){
				let url = this.data.url;
				if(url){
					this.$u.route(url)
					this.$u.api.setEvent({eventId:"sy-ggtc",type:3,params:{url:url}})
				}
			},
			popupShow(type) {
				this.$u.api.popupConfig({
					function: 'popup',
					type: type
				}).then(res => {
					if (res.code === 200) {
						let data = res.object;
						if (data && data.length > 0) {
							let param = "";
							if (type === 'DRIVER') {
								param = "popup_dirverPhoto";
							} else if (type === "COMPANY") {
								param = "popup_companyPhoto";
							} else {
								
								uni.setStorageSync('popupFlag', 100)
								param = "popup_visitorPhoto"
							}
							data.forEach(item => {
								if (item.param === "popup_isopen") {
									if (item.result === 'open') {
										// this.show = true
										this.showPoster()
									} else {
										// this.show = false
									}
								}
								if (item.param == param) {
									this.data = JSON.parse(item.result)
									this.auiPoster.image = this.data.photo;
								}
							})
						} else {
							// this.show = false
						}
					} else {
						this.$u.toast(res.msg);
					}
				})
			},
			 showPoster(){
			    this.$refs.poster.show();
			},
			auiPosterCallback(e){
				var _this = this;
				if(e.type === 'main'){
					this.toPage()
				}
			}
		}

	};
</script>
<style lang="scss">
	@import url("@/components/aui-poster/common/aui/css/aui.css");
	@import url("@/components/aui-poster/common/aui/css/aui.iconfont.css");
	page {
		// background-color: #F5F5F8;
	}
	.close_btn{
		position: fixed;
		bottom:  calc(var(--window-bottom,0) + 90rpx);
		text-align: center;
		left: 0;
		right: 0;
		
	}
</style>
