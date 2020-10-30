<template>
	<view class="range-price">
		<view class="padding">
			<v-tabs v-model="firstCurrent" :scroll="false" lineHeight='0rpx' color="#40B36C" :pills="true" pillsColor="#ffffff" pillsBorderRadius="0rpx" activeColor="#000000" :tabs="['12个月', '6个月', '3个月','1个月']"></v-tabs>
			 <view class="" v-show="firstCurrent === 0">
				 <view class="bg">
					<view class="year">车龄：<8个月</view>
					<view class="distance">新车 <300公里</view>
					<view class="clear"></view>
				 </view>
				<view class="box">
					<view class="left">
						<view class="price"><span>3100</span>/辆</view>
						<view>打包价</view>
					</view>
					<view class="right">
						<view class="price"><span>30</span>辆</view>
						<view>起售</view>
					</view>
					<view class="clear"></view>
				</view>
			 </view>
			 <view class="" v-show="firstCurrent === 1">
				1
			 </view>
			 <view class="" v-show="firstCurrent === 2">
			 	2					
			 </view>
			 <view class="" v-show="firstCurrent === 3">
			 	3					
			 </view>
			 <view class="icon">
				<view>线上选车</view>
				<view>线上约谈</view>
				<view>线下看车</view>
				<view>线下签约</view>
			 </view>
			 <view @click="other()" class="more">上拉加载该公司其他信息</view>
		</view>
		<view class="last">
			<view class="left">预约看车</view>
			<!-- <view class="icon-box"><u-image class="img" width="53rpx" height="45rpx" src="@/static/chat.png"></u-image></view> -->
			<u-image class="img" width="96rpx" height="96rpx" src="@/static/chat-box.png"></u-image>
			<view class="right">下单租车</view>
			<view class="clear"></view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				firstCurrent:0
			}
		},
		methods: {
			other() {
				this.$u.route('/pages/mymessage/components/index/other');
			}
		}
	}
</script>
<style lang="scss" scoped>
    .range-price{
		.padding {
			padding: 0 40rpx;
			.bg {
				width: 667rpx;
				height: 80rpx;
				line-height: 80rpx;
				background: #fff;
				font-size: 36rpx;
				.year {
					margin-left: 43rpx;
					float: left;
				}
				.distance {
					margin-right: 43rpx;
					float: right;
				}
			}
			.box {
				width: 667rpx;
				height: 280rpx;
				background: #fff;
				.left {
					width: 279rpx;
					height: 159rpx;
					padding: 30rpx 0;
					text-align: center;
					background: rgba(0,0,0,0.02);
					font-size: 20rpx;
					color: #7f7f7f;
					margin-left: 43rpx;
					float: left;
					.price span {
						font-size: 46rpx;
						font-weight: 900;
					}
				}
				.right {
					width: 275rpx;
					height: 159rpx;
					padding: 30rpx 0;
					text-align: center;
					margin-right: 40rpx;
					font-size: 20rpx;
					color: #fff;
					background: linear-gradient(115deg,#6DD99C, #37AB63);
					float: right;
					.price span {
						font-size: 46rpx;
						font-weight: 900;
					}
				}
			}
			.icon {
				width: 667rpx;
				height: 200rpx;
				background: #fff;
				margin-top: 40rpx;
				view {
					float: left;
					margin-left: 35rpx;
					margin-right: 36rpx;
					font-size: 20rpx;
					margin-top: 120rpx;
				}
			}
			.more {
					   font-size: 20rpx;
					   color: #7f7f7f;
					   margin-top: 83rpx;
					   margin-left: 220rpx;
					   margin-bottom: 50rpx;
			}
		}
		.clear{
			clear: both;
		}
		.last {
				   width: 100%;
				   height: 144rpx;
				   padding: 55rpx 80rpx;
				   background: linear-gradient(115deg, #6DD99B, #37AB63);
				   font-size: 36rpx;
				   font-weight: 900;
				   color: #fff;
				   display: flex;
				   justify-content: space-around;
				   align-items: center;
				  //  .icon-box {
					 // width: 96rpx;
					 // height: 96rpx;
					 // border-radius: 50%;
					 // background: #fff;
				  //  }
		}
	}
</style>


