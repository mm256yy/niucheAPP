<template>
	<view>
		<u-navbar back-icon-color="#111111" title="注销账号" :background="backgrounds" title-color="#111111"></u-navbar>
		<view class="cont">
			<h4 style='text-align: center;padding: 20rpx 0;'>申请注销账号</h4>
			<view style="padding: 20rpx 0;">你提交的注销申请生效前，纽车团队将进行以下验证，以保证你的帐号、财产安全：</view>
			<view>
				<view v-for="(item,index) in list" :key="index" style="padding: 20rpx 0;">
					{{item}}
				</view>
			</view>
			<view style="padding-top: 40rpx;">
				提交申请，删除所有数据，永久注销纽车帐号；点击下方的“申请注销”按钮，即表示你已知晓以上事项
			</view>
				<view style="margin: 60px 60px 0;text-align: center;">
					<u-button type="warning" @click="btnAClick()">申请注销</u-button>
				</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				backgrounds: {
					'background-image': 'linear-gradient(to bottom, #000000 39%,#ffffff 0%)'
				},
				list:[
					'1、帐号处于安全状态；','2、纽车帐户财产结清；','3、纽车租凭订单完结状态；','4、卡卷及红包清空和权限解除；','5、第三方支付平台绑定解除；','6、电子合同签约授权解除；'
				]
			}
		},
		methods: {
			btnAClick(){
				let phone = uni.getStorageSync('telephone')
				this.$u.api.cancelAccount({phone: phone}).then(res=>{
					 if (res.code === 200){
						 if(!res.object){
							 this.$u.toast('由于以下原因1、纽车帐户财产未结清；2、纽车租凭订单未完结；3、卡卷及红包未使用；4、第三方支付平台绑定未解除；5、电子合同签约授权未解除;清联系客服人员')
						 } else{
							this.$u.toast(res.msg) 
						 }
					 } else {
						this.$u.toast(res.msg)
					 }
				})
			}
		}
	}
</script>

<style>
 .cont{
	 padding: 40rpx;
	 
 }
</style>
