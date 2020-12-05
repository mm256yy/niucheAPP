<template>
	<view class="range-price">
		<view class="padding">
			<v-tabs v-show="tab.length>1" v-model="firstCurrent" :scroll="true" lineHeight='0rpx' :pills="true" pillsColor="#40B36C" pillsBorderRadius="0rpx"
			 inactive-color="#000000" activeColor="#ffffff" :tabs="tab" @change="change"></v-tabs>
			 <view style="width: 300rpx;height: 60rpx;background-color: #40B36C;line-height: 60rpx;text-align: center;color: #fff;" v-show="tab.length==1" v-for="(item, index) in tab" key="-1">{{item}}</view>
			 <view v-for="(item, index) in detail.pricesectionlist" :key="index" class="" v-show="firstCurrent === index">
			    <view class="bg">
			        <view class="year">车龄：≤{{item.rentCarTime}}</view>
			    	<view class="distance">{{detail.carkm}}万公里</view>
			    	<view class="clear"></view>
			    </view>
			    <view class="box">
			    	<view class="left">
			    		<view class="price"><text>￥{{item.rentCarPrice}}</text></view>
			    		<view>-月租-</view>
			    	</view>
			    	<view class="right">
			    		<view class="price"><text style="color: #FFFFFF;">￥{{detail.packprice}}</text></view>
			    		<view>-押金-</view>
			    	</view>
			    	
			    </view>
			 </view>
			 <view class="icon">
				<view class="text-box">
					<view class="imgBox">
						<u-image width="45rpx" height="62rpx" src="@/static/selectCar.png"></u-image>
					</view>
					<view class="text">线上选车</view>
				</view>
				<view class="text-box">
					<view class="imgBox"><u-image width="56rpx" height="56rpx" src="@/static/interview.png"></u-image></view>
					<view class="text">线上约谈</view> 
				</view>
				<view class="text-box">
					<view class="imgBox">
						<u-image width="48rpx" height="42rpx" src="@/static/viewCar.png"></u-image>
					</view>
					<view class="text">线下看车</view>
				</view>
				<view class="text-box">
					<view class="imgBox">
						<u-image width="50rpx" height="49rpx" src="@/static/bi.png"></u-image>
					</view>
					<view class="text">线下签约</view>
				</view>
			 </view>
<!-- 			 <view class="ask">
			 	<u-image class="question" width="66rpx" height="66rpx" src="@/static/question.png"></u-image>
			 	<view class="problem">
			 		<view class="everyone">问问大家</view>
			 		<view class="how">谁买过？怎么样？</view>
			 	</view>
			 	<view class="small">></view>
			 </view> -->
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
			},
			id: {
			    type: String,
			    default: ''
			}
		},
		mounted() {
			
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
				width: 670rpx;
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
				width: 670rpx;
				height: 190rpx;
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
					.price text {
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
					background: linear-gradient(55deg, #37AB63, #6DD99C);
					float: right;
					.price text {
						font-size: 46rpx;
						font-weight: 900;
					}
				}
				.deposit {
					font-size: 28rpx;
					margin-top: 46rpx;
					margin-left: 42rpx;
					text {
						font-size: 40rpx;
						font-weight: 900;
						color: #40B36C;
					}
				}
			}
			.discount {
				width: 670rpx;
				height: 60rpx;
				line-height: 60rpx;
				padding: 0 47rpx;
				font-size: 28rpx;
				margin-top: 45rpx;
				background: #fff;
				text {
					font-weight: 900;
					color: #40B36C;
					margin-right: 35rpx;
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
				.imgBox{
						width: 56rpx;
						height: 62rpx;
						display: flex;
						justify-content: center;
						align-items: center;
					}
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
		}
		.clear{
			clear: both;
		}
		.ask {
			width: 670rpx;
			height: 118rpx;
			padding: 26rpx 40rpx;
			background: #fff;
			margin-bottom: 40rpx;
			margin-top: 40rpx;
			.question {
				float: left;
			}
			.problem {
				float: left;
				margin-left: 40rpx;
				.everyone {
					font-size: 28rpx;
					font-weight: 600;
				}
				.how {
					font-size: 20rpx;
					color: #7f7f7f;
				}
			}
			.small {
				float: right;
				margin-top: 10rpx;
				font-size: 32rpx;
				color: #7f7f7f;
			}
		}
	}
</style>


