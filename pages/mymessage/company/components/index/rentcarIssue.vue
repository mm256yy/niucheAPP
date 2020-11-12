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
					   line-height: 66rpx;
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
					   line-height: 66rpx;
			   		   float: left;
			   		   font-size: 20rpx;
			   		   margin-left: 19rpx;
			   }
		   }
	   }
   }
</style>


