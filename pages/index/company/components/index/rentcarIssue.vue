<template>
	<view class="issue">
		<view class="bg">
			<view class="border">
				<view class="box">
					<u-icon class="question" name="question" size="28" color="#fff"></u-icon>
				</view>
				<view class="limit">租车要满足哪些条件？租车要满足哪些条件？租车要满足哪些条件？</view>
			</view>
			<view class="bottom">
				<view class="box">答</view>
				<view class="limit">年满18周岁年满18周岁年满18周岁年满18周岁年满18周岁年满18周岁</view>
			</view>
		</view>
		<view class="bg">
			<view class="border">
				<view class="box">
					<u-icon class="question" name="question" size="28" color="#fff"></u-icon>
				</view>
				<view class="limit">租车要满足哪些条件？租车要满足哪些条件？租车要满足哪些条件？</view>
			</view>
			<view class="bottom">
				<view class="box">答</view>
				<view class="limit">年满18周岁年满18周岁年满18周岁年满18周岁年满18周岁年满18周岁</view>
			</view>
		</view>
		<view class="bg">
			<view class="border">
				<view class="box">
					<u-icon class="question" name="question" size="28" color="#fff"></u-icon>
				</view>
				<view class="limit">租车要满足哪些条件？租车要满足哪些条件？租车要满足哪些条件？</view>
			</view>
			<view class="bottom">
				<view class="box">答</view>
				<view class="limit">年满18周岁年满18周岁年满18周岁年满18周岁年满18周岁年满18周岁</view>
			</view>
		</view>
		<view class="more">上拉加载该公司其他信息</view>
		<view class="last">
			<view class="left">预约看车</view>
			<view class="right">下单租车</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			
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
			   		   background: #40B36C;
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
	   .more {
		   font-size: 20rpx;
		   color: #7f7f7f;
		   margin-top: 83rpx;
		   margin-left: 220rpx;
		   margin-bottom: 40rpx;
	   }
	   .last {
		   width: 100%;
		   height: 144rpx;
		   padding: 55rpx 116rpx;
		   background: linear-gradient(115deg, #6DD99B, #37AB63);
		   font-size: 36rpx;
		   font-weight: 900;
		   color: #fff;
		   .left {
			   float: left;
		   }
		   .right {
			   float: right;
		   }
	   }
   }
</style>


