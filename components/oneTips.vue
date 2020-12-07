<template>
	<view>
		<u-modal v-model="show" confirm-text="我知道了" title="用户协议和隐私政策声明" @confirm="confirm">
			<view class="u-update-content">
				<view style="padding: 10px;">纽车（杭州）科技有限公司（简称“纽车”）深知隐私对您的重要性，并会尊重您的隐私。请在向纽车提交个人数据之前，阅读、了解本《隐私政策》。本政策适用于显示本隐私政策、或链接至本<text class="driLink" @click="toYs">《隐私政策》</text>及<text class="driLink" @click="toXy">《用户协议》</text>内容的纽车网站和产品、服务。
					 </view>
			</view>
		</u-modal>
	</view>
</template>

<script>
	export default {
		data() {
			return {
               show:false
			};
		},
		methods:{
			confirm(){
				uni.setStorageSync('oneTipsFlag',true)
			},
			toXy(){
				this.$u.route('/pages/company/registrationAgreement/registrationAgreement')
			},
			toYs(){
				this.$u.route('/pages/driver/agreement/agreement')
			},
		}
	}
</script>

<style>
	.driLink{
		color:#FF9F31
	}
	.comLink{
		color:#6DD99C
	}
</style>
