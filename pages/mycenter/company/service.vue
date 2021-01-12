<template>
	<view class="message">
		<u-navbar back-text="返回" back-icon-size="0" title="纽车客户服务中心" title-width="300" height='44' title-color="#111" title-bold="true">
		</u-navbar>
		<view style="width: 680rpx;margin-left: 36rpx;background: #fff;border-radius: 20rpx 20rpx 0 0;margin-top: 36rpx;">
<!-- 			<view style="display: flex;width: 680rpx;height: 140rpx;justify-content: space-between;align-items: center;border-bottom: 2rpx solid rgba(0,0,0,0.03);">
				<view style="margin-left: 36rpx;font-size: 30rpx;color: #333;">线上客服</view>
				<view style="border-radius: 12rpx;border: 1px solid #4ABA75;line-height: 62rpx;text-align: center;
				font-size: 30rpx;color: #4aba75;margin-right: 36rpx;padding: 2rpx 16rpx;">联系客服</view>
			</view> -->
			<view style="display: flex;width: 680rpx;height: 140rpx;justify-content: space-between;align-items: center;border-bottom: 2rpx solid rgba(0,0,0,0.03);">
				<view style="margin-left: 36rpx;font-size: 30rpx;color: #333;">微信号：niuchekeji</view>
				<view style="border-radius: 12rpx;border: 1px solid #4ABA75;line-height: 62rpx;text-align: center;
				font-size: 30rpx;color: #4aba75;margin-right: 36rpx;padding: 2rpx 16rpx;" @click="copyd()">复制加友</view>
			</view>
			<view style="display: flex;width: 680rpx;height: 140rpx;justify-content: space-between;align-items: center;">
				<view style="margin-left: 36rpx;font-size: 30rpx;color: #333;">客服电话：0571-878115287</view>
				<view @click="dial" style="border-radius: 12rpx;border: 1px solid #4ABA75;line-height: 62rpx;text-align: center;
				font-size: 30rpx;color: #4aba75;margin-right: 36rpx;padding: 2rpx 16rpx;">拨打电话</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				time:''
			}
		},
		onLoad(option) {
			let time = option.time;
			if(time){
			 this.time = time;
			}
		},
		methods: {
			dial(){
				uni.makePhoneCall({
				    phoneNumber: '0571-878115287' 
				});
			},
			copyd(){
				uni.setClipboardData({
				    data: 'niuchekeji',
				    success: function () {
				        console.log('success');
				    }
				});
			}
	    },
	}
</script>
<style lang="scss" scoped>
	page{
		background: #f5f5f5;
	}
  .message{
	  .content{
		 .list{
		 		  margin: 0 36rpx;
				  padding: 36rpx 0 0 0;
		 		  font-family: PingFangSC-Regular, PingFang SC;
		 		  display: flex;
		 		  border-bottom: 1rpx solid #e0e0e0;
		 		 .box{
		 			 margin-left: 28rpx;
		 		 		  .title{
							     width: 340rpx;
		 		 		  		 font-size: 32rpx;
		 		 		  		 font-weight: 400;
		 		 		  		 color: #333333;
		 						  margin-bottom: 16rpx;
		 		 		  }
		 		 		  .join{
		 		 		  		 font-size: 26rpx;
		 		 		  		 font-weight: 400;
		 		 		  		 color: #999999;
		 						  margin-bottom: 40rpx;
		 		 		  }
						  .time{
						  			  font-size: 24rpx;
						  			  font-weight: 400;
						  			  color: #C7C7C7;
						  }
		 		 } 
		 } 
	  }
  }
</style>


