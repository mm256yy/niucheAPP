<template>
	<view>
		 <view class="content-center" :class="curThemeType ==='driver'?'driver-content':'company-content'">
			<view class="">
				<u-avatar :src="curThemeType ==='driver'?driverSrc:comnpanySrc" size="260" @click="toCenter"></u-avatar>
				</view>
			<view class="company-name">纽  车  科  技 </view>
			<view class="company-yw" :class="curThemeType ==='driver'?'driver-color':'company-color'">网约车  |  租车  |  招聘  |  卖车</view>
			<view class="company-phone">服务电话:0571-87815287</view>
		 </view>
		 <view class="company-version">
			 <view style="padding: 5pt 0;">
				 <text @click="toYs" style="color: #0873DE;">《隐私政策》</text>
			 <text @click="toXy" style="color: #0873DE;padding-left: 8pt;">《用户协议》</text></view>
			 <view class="login-out" v-show="curThemeType ==='company' && tokenFlag" @click="showLogut=true">退出</view>
			 <view>当前版本 1.5.1.6</view>
		 </view>
		 <u-modal v-model="showLogut" title="提示" :show-cancel-button="true" confirm-text="是" cancel-text="否"
		  @confirm="loginOut">
		 	<view class="slot-content" style="padding: 10pt;font-size: 10pt;">
		         是否确定要退出当前账号？
		 	</view>
		 </u-modal>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				comnpanySrc: '../../static/touxx.png',
				driverSrc: '../../static/driverSrc.png',
				showLogut:false,
				tokenFlag:false,
			}
		},
		mounted() {
			let token = uni.getStorageSync('token');
			if(token){
				this.tokenFlag = true
			}
		},
		methods: {
			toCenter(){
				this.$u.route({url:'/pages/mycenter/mycenter',type:'switchTab'})
			},
			toXy(){
				this.$u.route('/pages/company/registrationAgreement/registrationAgreement')
			},
			toYs(){
				this.$u.route('/pages/driver/agreement/agreement')
			},
			loginOut(){
				this.$u.api.logout({}).then(res=>{
					if (res.code === 200){
						this.$u.toast(res.msg);
						// uni.removeStorageSync('telephone');
						uni.removeStorageSync('token');
						uni.removeStorageSync('isauthencation');
						uni.removeStorageSync('loginNum');
						this.$u.route('/pages/login/login')
						// uni.reLaunch({
						//     url: '/pages/login/login'
						// })
					}
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
  .content-center{
	  min-height: 100vh;
	  display: flex;
	  justify-content: center;
	  align-items:center;
	  flex-direction: column;
	  width: 100%;
	  color: #FFFFFF;
  }
  .driver-content{
  		background: linear-gradient(55deg, $bg-grad-FE, $bg-grad-FCD),
  }
  .company-content{
  		background: linear-gradient(55deg, $bg-grad-AB, $bg-grad-DDC),
  }
  .company-name{
	  font-size: 24pt;
	  padding: 10pt 0;
  }
  .company-phone{
	  padding: 10pt 0;
  }
  .company-yw{
	 font-size: 10pt;
	 padding: 10pt;
	 background: #fff;
	 border-radius: 5pt; 
  }
  .driver-color{
	 color: #FEB62D;  
  }
  .company-color{
	 color: #4ED69B; 
  }
  .company-version{
	  position: fixed;
	  bottom: 8pt;
	  width: 100%;
	  text-align: center;
	  color: #fff;
	  z-index: 2;
  }
  .login-out{
	  color: #C0C4CC;padding-bottom: 30rpx;font-size: 12pt;
  }
</style>
