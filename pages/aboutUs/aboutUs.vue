<template>
	<view>
		 <view class="content-center" :class="curThemeType ==='driver'?'driver-content':'company-content'">
			<view class="">
				<u-avatar :src="curThemeType ==='driver'?driverSrc:comnpanySrc" size="260" @click="toCenter"></u-avatar>
				</view>
			<view class="company-name">纽  车  科  技 </view>
			<view class="company-yw" :class="curThemeType ==='driver'?'driver-color':'company-color'">网约车  |  租车  |  招聘  |  卖车</view>
			<view class="company-phone">服务电话:0571-88888888 </view>
		 </view>
		 <view class="company-version">当前版本 1.00 </view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				comnpanySrc: '../../static/touxx.png',
				driverSrc: '../../static/driverSrc.png',
			}
		},
		methods: {
			toCenter(){
				this.$u.route({url:'/pages/mycenter/mycenter',type:'switchTab'})
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
</style>
