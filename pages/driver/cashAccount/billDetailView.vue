<template>
	<view>
		<u-navbar back-icon-color="#111111" title="账单详情" :background="background" title-color="#111111"></u-navbar>
		<view class="view_content">
			<view class="content_head">
				<view class="head_title">提现</view>
				<view class="head_money">¥300</view>
			</view>
			<view class="content_info" v-if="flag">
				<view class="info_item">
					<text class="info_title">当前状态：</text>
					<text>已到账/提现中/提现失败/审核失败</text>
					<view style="color: #FE3B31;font-size: 12px;">原因：跑单流水疑似造假！</view>
				</view>
				<view class="info_item">
					<text class="info_title">提现时间：</text>
					<text>2020-09-28 11:15:33</text>
				</view>
				<view class="info_item">
					<text class="info_title">资金去向：</text>
					<text>支付宝</text>
				</view>
				<view class="info_item">
					<text class="info_title">入账账号：</text>
					<text>支付宝账号</text>
				</view>
				<view class="info_item">
					<text class="info_title">到账时间：</text>
					<text>2020-09-28 11:15:33</text>
				</view>
			</view>
			<view class="content_info" v-else>
				<view class="info_item">
					<text class="info_title">当前状态：</text>
					<text>已到账</text>
				</view>
				<view class="info_item">
					<text class="info_title">交易单号：</text>
					<text>888888888888</text>
				</view>
				<view class="info_item">
					<text class="info_title">入帐时间：</text>
					<text>2020-09-28 11:15:33</text>
				</view>
			</view>
		</view>
		<u-gap height="20" bg-color="#F5F5F5" v-if="flag"></u-gap>
		<view class="view_content" style="padding-bottom: 12px;" v-if="flag">
			<view  style="padding: 10px 0;">车辆租赁合同照片</view>
			<u-row :gutter="20">
				<u-col span="6"><u-image width="100%" height="200rpx" :src="src"></u-image></u-col>
				<u-col span="6"><u-image width="100%" height="200rpx" :src="src"></u-image></u-col>
			</u-row>
			<view  style="padding: 10px 0;">网约车平台跑单流水截图</view>
			<u-row :gutter="20">
				<u-col span="6"><u-image width="100%" height="200rpx" :src="src"></u-image></u-col>
				<u-col span="6"><u-image width="100%" height="200rpx" :src="src"></u-image></u-col>
			</u-row>	
		</view>	
		<u-gap height="20" bg-color="#F5F5F5"></u-gap>
		<view class="bottom_help" @click="callPhone">
			<text>遇到问题？</text>
			<u-icon name="arrow-right" color="#333333" ></u-icon>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				background: {
					'background-image': 'linear-gradient(to bottom, #000000 39%,#ffffff 0%)'
				},
				flag:false,
				src: 'https://cdn.uviewui.com/uview/example/fade.jpg'
			}
		},
		methods: {
			callPhone(){
				uni.makePhoneCall({
					phoneNumber: '0571-87815287' 
				});
			},
		}
	}
</script>

<style lang="scss" scoped>
 .view_content{
	 padding: 0 20px;
	 .content_head{
		display: flex;
		 justify-content: center;
		 align-items: center;
		 flex-direction: column;
		 min-height: 150px;
		 border-bottom: 1px solid #E0E0E0;
		 color: #333333; 
		 .head_title{
			font-size: 14px;
			color: #333333; 
		 }
		 .head_money{
			font-size: 26px;
			 padding: 10px 0 20px;
		 }
	 }
	 .content_info{
		 padding: 20px 0;
		 .info_item{
			padding: 4px 0; 
			.info_title{
				 color:#939393 ;
				 font-size: 14px;
			}
		 }

	 }
 }
 .bottom_help{
	 color: #111111;
	 display: flex;
	 justify-content: space-between;
	 padding: 10px 20px;
	 border-bottom:1px solid #DEDEDE ;
 }
</style>
