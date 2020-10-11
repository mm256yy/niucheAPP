<template>
	<view>
		<u-navbar back-text="返回"  back-icon-size="0" title="公司信息" :background="backgroundCom" :back-text-style="backTextStyle" height='44' title-color="#FFFFFF"></u-navbar>
		<view style="padding: 10pt 0;">
			<view class="" style="display: flex;text-align: center;flex-direction:column;">
				<view class="">
					<u-avatar :src="comnpanySrc" size="150"></u-avatar>
				</view>
				<view >xxx租车公司</view>
			</view>
		</view>
         <view style="padding: 0 20pt; ">
			<u-row style="padding: 8pt;border-bottom: 1rpx solid #dedede;background: #FFFFFF;">
				<u-col span="4">企业身份认证</u-col>
				<u-col span="8" style="text-align: right;color: #7E7E7E;">去认证>></u-col>
			</u-row>
         </view>
		 <view style="padding: 0 20pt; margin-top: 20pt;">
            <view style="padding:0 10pt;background: #FFFFFF;">
			  <u-form :model="form" ref="uForm" label-width="160pt">
				<u-form-item label="公司简介">
					<u-input v-model="value" :disabled="true" :border="false" placeholder=""/>
				</u-form-item>
				<u-form-item label="公司成员">
					<u-input v-model="value" :disabled="true" :border="false" placeholder=""/> <u-icon name="edit-pen"></u-icon>
				</u-form-item>
				<u-form-item label="经营车辆">
					<u-input v-model="value" :disabled="true" :border="false" placeholder=""/> <u-icon name="edit-pen"></u-icon>
				</u-form-item>
			   </u-form>
             </view>
		 </view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				backTextStyle:{
					'color':'#ffffff'
				},
				form:{
					
				},
				value:'111111',
				comnpanySrc: '../../static/touxx.png',
			}
		},

		methods: {

		}
	}
</script>

<style lang="scss" scoped>
	page{
		background-color:#f5f5f8 ;
		height: 100%;
	}
	.btn-refuse{
		background: #C0C4CC;
	}
	 .btn-agree{
		background: linear-gradient(55deg, $bg-grad-AB, $bg-grad-DDC);
	 }
</style>
