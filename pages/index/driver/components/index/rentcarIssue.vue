<template>
	<view class="issue">
		<view class="bg" v-for="(item, index) in detail" :key="index">
			<view class="border">
				<view class="box">
					<u-icon class="question" name="question" size="28" color="#fff"></u-icon>
				</view>
				<view class="limit">{{item.mobanquestionname}}</view>
			</view>
			<view class="bottom">
				<view class="box">答</view>
				<view class="limit">{{item.mobandaan}}</view>
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
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		props: {
			detail: {
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
			other() {
				this.$u.route('/pages/index/driver/components/index/other',{id:this.id});
			}
		}
	}
</script>
<style lang="scss" scoped>
   .issue {
	   .bg {
		   width: 670rpx;
		   height: 213rpx;
		   background: #fff;
		   padding: 0 36rpx;
		   margin-left: 40rpx;
		   margin-top: 42rpx;
		   .border {
			   width: 600rpx;
			   height: 106rpx;
			   padding: 20rpx 0;
			   border-bottom: 1rpx solid rgba(0,0,0,0.06);
			   .box {
			   		   width: 66rpx;
			   		   height: 66rpx;
			   		   line-height: 66rpx;
			   		   text-align: center;
			   		   border-radius: 50%;
			   		   background: linear-gradient(115deg, $bg-grad-FE, $bg-grad-FCD);
			   		   float: left;
			   }
			   .limit {
			   		   width: 504rpx;
			   		   float: left;
			   		   font-size: 20rpx;
			   		   font-weight: 600;
			   		   margin-left: 19rpx;
			   }
		   }
		   .bottom {
			   width: 600rpx;
			   height: 106rpx;
			   padding: 20rpx 0;
			   .box {
			   		   width: 66rpx;
			   		   height: 66rpx;
			   		   line-height: 66rpx;
			   		   text-align: center;
			   		   border-radius: 50%;
			   		   background: rgba(0,0,0,0.015);
					   color: rgba(0,0,0,0.08);
					   font-size: 40rpx;
					   font-weight: 900;
			   		   float: left;
			   }
			   .limit {
			   		   width: 504rpx;
			   		   float: left;
			   		   font-size: 20rpx;
			   		   margin-left: 19rpx;
			   }
		   }
	   }
	   .ask {
	   	width: 670rpx;
	   	height: 118rpx;
	   	padding: 26rpx 40rpx;
	   	background: #fff;
	   	margin-bottom: 40rpx;
	   	margin-top: 40rpx;
		margin-left: 40rpx;
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


