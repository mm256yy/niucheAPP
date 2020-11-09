<template>
	<view class="range-price">
		<view class="padding">
			<v-tabs v-model="firstCurrent" :scroll="false" lineHeight='0rpx' :pills="true" pillsColor="#ffffff" pillsBorderRadius="0rpx"
			 inactive-color="#7f7f7f" activeColor="#FF6501" :tabs="tab" @change="change"></v-tabs>
			 <view v-for="(item, index) in detail.pricesectionlist" :key="index" class="" v-show="firstCurrent === index">
			    <view class="bg">
			        <view class="year">车龄：<8个月</view>
			    	<view class="distance">10-20万公里</view>
			    	<view class="clear"></view>
			    </view>
			    <view class="box">
			    	<view class="left">
			    		<view class="price"><text>￥3100</text></view>
			    		<view>-月租-</view>
			    	</view>
			    	<view class="right">
			    		<view class="price"><text>￥3000</text></view>
			    		<view>-2人拼租价-</view>
			    	</view>
			    	<view class="clear"></view>
			    	<view class="deposit">押金：<text>￥8000</text></view>
			    </view>
			 </view>
			 <view class="discount">
				 <text>优惠</text>
				 租满12个月，免费送3个月！
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
			 <view class="ask">
			 	<u-image class="question" width="66rpx" height="66rpx" src="@/static/question.png"></u-image>
			 	<view class="problem">
			 		<view class="everyone">问问大家</view>
			 		<view class="how">谁买过？怎么样？</view>
			 	</view>
			 	<view class="small">></view>
			 </view>
			 <view @click="other()" class="more">上拉加载该公司其他信息</view>
		</view>
		<view class="last">
			<view class="left">预约看车</view>
			<!-- <view class="icon-box"><u-image class="img" width="53rpx" height="45rpx" src="@/static/chat.png"></u-image></view> -->
			<u-image class="img" width="96rpx" height="96rpx" src="@/static/chatDri.png"></u-image>
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
		props: {
			detail: {
			    type: Object,
			    default: function (){return {}}
			},
			tab: {
			    type: Array,
			    default: function (){return []}
			},
		},
		mounted() {
			this.getList()
		},
		methods: {
			getList() {
				this.$u.api.getCarSystem().then(res=>{
					if(res.code === 200){
						 this.list = res.rows;
						 this.total= res.total;
					}else {
						 this.$u.toast(res.msg);
					}
				})
			},
			change(index) {
				this.firstCurrent = index;
			},
			other() {
				this.$u.route('/pages/index/driver/components/index/other');
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
				height: 304rpx;
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
					background: linear-gradient(115deg, $bg-grad-FCD, $bg-grad-FE);
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
						color: #FF6501;
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
					color: #FF6501;
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
				margin-bottom: 70rpx;
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
		.last {
				   width: 100%;
				   height: 144rpx;
				   padding: 55rpx 80rpx;
				   background: linear-gradient(115deg, $bg-grad-FE, $bg-grad-FCD);
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


