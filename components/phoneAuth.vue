<template>
	<view>
		<u-modal v-model="showTips" @confirm="tipsConfirm" title="提示" :show-cancel-button="showCancel" @cancel="toIndex" cancel-text="否" :confirm-text="confirmText">
			<view class="slot-content" style="padding: 10pt;font-size: 10pt;">
		       {{showMsg}}
			</view>
		</u-modal>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				showTips:false,
				showCancel:true,
				confirmText:'是',
				showMsg:'亲，您尚未认证，是否立即去认证?',
				loginStatus:true,
				authFlag:0,//认证状态统一  0未认证 1审核中 2已认证 3审核驳回
			};
		},
		props: {
			status: {
			    type: Number,
			    default: '2'
			}
		},
		methods:{
			getStatus(){
				let token = uni.getStorageSync('token');
				if(token){
					this.loginStatus = true;
					this.$u.api.getStatus().then(res=>{
						if(res.code === 200){
							let role = uni.getStorageSync('role');
							let data = res.object;
							let flag = 0
							if (role === 2){//公司
								flag = Number(data.checkstate)
							 } else {
								flag = data.driverphotostate
							}
							this.authFlag = flag;
							uni.setStorageSync('isauthencation',flag)
							if(flag === 0){
								this.showMsg = '亲，您尚未认证，是否立即去认证'
								this.confirmText = '是';
								this.showCancel = true;
								this.showTips = true;
							} else if (flag === 1){
								this.showMsg = '亲，您提交的认证信息，正在审核中,将跳转到我的页面'
								this.confirmText = '好的'
								this.showCancel = false;
								this.showTips = true;
							} else if (flag === 2) {
								this.showTips = false;
								console.log(this.status)
								if(this.status == 1){
									this.$parent.$parent.jumpPhone();
								}
								if(this.status == 3){
									console.log(this.$parent)
									this.$parent.$parent.jumpOther();
								}
							} else if (flag === 3 ){
								this.showMsg = '亲，您提交的认证信息,未通过,将跳转到我的页面'
								this.confirmText = '好的'
								this.showCancel = false;
								this.showTips = true;
								
							} else {
				
							}
						}//
					})
				} else {
					this.showMsg = ' 亲，您尚未登录不能使用该功能，现在去登录'
					this.confirmText = '好的';
					this.loginStatus = false;
					this.showTips = true;
				}
			},
			tipsConfirm(){
				let loginStatus = this.loginStatus;//登录状态 true 已登录 false 未登录
				if (loginStatus) {
					let role = uni.getStorageSync('role');
					let flag = this.authFlag;
					if(flag === 0){
					   if (role == 2) {
							this.$u.route('/pages/company/identityAuth/identityAuth')
						} else {
							this.$u.route('/pages/driver/drivingLicense/drivingLicense')
						}
					} else if (flag === 1){
						this.$u.route({url:'/pages/mycenter/mycenter',type:'switchTab'})
					} else if (flag === 3 ){
						this.$u.route({url:'/pages/mycenter/mycenter',type:'switchTab'})
					} else {}
				} else {
					  this.$u.route('/pages/login/login');
				}
			},
			toIndex(){
			   this.$u.route({url:'/pages/index/index',type:'switchTab'})	
			}
		}
	}
</script>

<style lang="less">

</style>
