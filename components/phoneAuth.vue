<template>
	<view>
		<u-modal v-model="showTips" @confirm="tipsConfirm" title="提示" :show-cancel-button="showCancel" @cancel="toIndex"
		 cancel-text="否" :confirm-text="confirmText">
			<view class="slot-content" style="padding: 10pt;font-size: 10pt;">
				{{showMsg}}
			</view>
		</u-modal>
	</view>
</template>

<script>
		import {
			mapState
		} from "vuex";
	export default {
		data() {
			return {
				showTips: false,
				showCancel: true,
				confirmText: '是',
				showMsg: '亲，您尚未认证，是否立即去认证?',
				loginStatus: true,
				authFlag: 0, //认证状态统一  0未认证 1审核中 2已认证 3审核驳回
			};
		},
		props: {
			status: {
				type: Number,
				default: 2
			},
			phone: {
				type: String,
				default: ''
			},
			ids: {
				type: String,
				default: ''
			},
			title: {
				type: String,
				default: ''
			}
		},
		methods: {
			getStatus() {
				let token = uni.getStorageSync('token');
				if (token) {
					this.loginStatus = true;
					this.$u.api.getStatus().then(res => {
						if (res.code === 200) {
							let role = uni.getStorageSync('role');
							let data = res.object;
							let flag = 0
							if (role === 2) { //公司
								flag = Number(data.checkstate)
							} else {
								flag = data.driverphotostate
							}
							this.authFlag = flag;
							uni.setStorageSync('isauthencation', flag)
							if (flag === 0) {
								this.showMsg = '亲，您尚未认证，是否立即去认证'
								this.confirmText = '是';
								this.showCancel = true;
								this.showTips = true;
							} else if (flag === 1) {
								this.showMsg = '亲，您提交的认证信息，正在审核中,将跳转到我的页面'
								this.confirmText = '好的'
								this.showCancel = false;
								this.showTips = true;
							} else if (flag === 2) {
								this.showTips = false;
								console.log(this.status)
								if (this.status == 1) {
									this.chatYour()
									// if(this.phone){
									// 	uni.makePhoneCall({ phoneNumber: this.phone });
									// }else{
									// 	this.$u.toast('未获取到手机号');
									// }
								}
								if (this.status == 3) {
									this.$u.route('/pages/mymessage/company/components/index/other', {
										id: this.ids,
										title: this.title
									});
								}
								if (this.status == 4) {
									this.$u.route('/pages/index/driver/components/index/other', {
										id: this.ids,
									});
								}
							} else if (flag === 3) {
								this.showMsg = '亲，您提交的认证信息,未通过,将跳转到我的页面'
								this.confirmText = '好的'
								this.showCancel = false;
								this.showTips = true;

							} else {

							}
						} //
					})
				} else {
					this.showMsg = ' 亲，您尚未登录不能使用该功能，现在去登录'
					this.confirmText = '好的';
					this.loginStatus = false;
					this.showTips = true;
					this.setEvent()
				}
			},
			tipsConfirm() {
				let loginStatus = this.loginStatus; //登录状态 true 已登录 false 未登录
				if (loginStatus) {
					let role = uni.getStorageSync('role');
					let flag = this.authFlag;
					if (flag === 0) {
						if (role == 2) {
							this.$u.route('/pages/company/identityAuth/identityAuth')
						} else {
							this.$u.route('/pages/driver/drivingLicense/drivingLicense')
						}
					} else if (flag === 1) {
						this.$u.route({
							url: '/pages/mycenter/mycenter',
							type: 'switchTab'
						})
					} else if (flag === 3) {
						this.$u.route({
							url: '/pages/mycenter/mycenter',
							type: 'switchTab'
						})
					} else {}
				} else {
					this.$u.route('/pages/login/login');
				}
			},
			setEvent() {
				try {
					const res = uni.getSystemInfoSync();
					this.$u.api.setEvent({
						eventId: "Login_watch",
						type: 3,
						params:res
					})
				} catch (e) {}
			},
			toIndex() {
				this.$u.route({
					url: '/pages/init/init',
					type: 'switchTab'
				})
			},
			chatYour() {
				this.$store.commit('createConversationActive', 'yangke')
				this.$u.route('/pages/tim/room')
				// uni.navigateTo({
				// 	url: './room'
				// })
			}
		}
	}
</script>

<style lang="less">

</style>
