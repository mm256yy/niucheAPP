<template>
	<view class="range-price">
		<view class="padding">
			<v-tabs v-model="firstCurrent" :scroll="true" lineHeight='0rpx' color="#7f7f7f" :pills="true" 
			pillsColor="#ffffff" pillsBorderRadius="0rpx" activeColor="#40B36C" :tabs="tab" @change="change"></v-tabs>
			 <view v-for="(item, index) in detail.pricesectionlist" :key="index" class="" v-show="firstCurrent === index">
				<view class="bg">
					<view class="year">{{detail.carage}}</view>
					<view class="distance">新车 <{{detail.carkm}}公里</view>
					<view class="clear"></view>
				</view>
				<view class="box">
					<view class="left">
						<view class="price"><text>{{item.packprice}}</text>/辆</view>
						<view>-打包价-</view>
					</view>
					<view class="right">
						<view class="price"><text>{{item.lowprice}}</text>辆</view>
						<view>-起售-</view>
					</view>
					<view class="clear"></view>
				</view>
			 </view>
			 <view class="icon">
			 				<view class="text-box">
			 					<u-image width="45rpx" height="62rpx" src="@/static/selectCar.png"></u-image>
			 					<view class="text">线上选车</view>
			 				</view>
			 				<view class="text-box">
			 					<u-image width="56rpx" height="56rpx" src="@/static/interview.png"></u-image>
			 					<view class="text">线上约谈</view> 
			 				</view>
			 				<view class="text-box">
			 					<u-image width="48rpx" height="42rpx" src="@/static/viewCar.png"></u-image>
			 					<view class="text">线下看车</view>
			 				</view>
			 				<view class="text-box">
			 					<u-image width="50rpx" height="49rpx" src="@/static/bi.png"></u-image>
			 					<view class="text">线下签约</view>
			 				</view>
			 </view>
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
		props: {
			detail: {
			    type: Object,
			    default: function (){return {}}
			},
			tab: {
			    type: Array,
			    default: function (){return []}
			}
		},
		methods: {
			change(index) {
				this.firstCurrent = index;
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
				display: flex;
				justify-content: center;
				// align-items: center;
				.left {
					width: 279rpx;
					height: 159rpx;
					padding: 30rpx 0;
					text-align: center;
					background: rgba(0,0,0,0.02);
					font-size: 20rpx;
					color: #7f7f7f;
					margin-right: 40rpx;
					display: flex;
					flex-direction: column;
					justify-content: center;
					align-items: center;
					// float: left;
					.price text {
						font-size: 46rpx;
						font-weight: 900;
						color: #7f7f7f;
					}
				}
				.right {
					width: 275rpx;
					height: 159rpx;
					padding: 30rpx 0;
					text-align: center;
					// margin-right: 40rpx;
					font-size: 20rpx;
					color: #fff;
					background: linear-gradient(115deg,#6DD99C, #37AB63);
					display: flex;
					flex-direction: column;
					justify-content: center;
					align-items: center;
					// float: right;
					.price text {
						font-size: 46rpx;
						font-weight: 900;
					}
				}
			}
			.icon {
				width: 667rpx;
				height: 211rpx;
				background: #fff;
				margin-top: 40rpx;
				display: flex;
				justify-content: space-around;
				align-items: center;
				.text-box {
					display: flex;
					flex-direction: column;
					justify-content: space-between;
					align-items: center;
					.text {
						margin-top: 35rpx;
					}
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


