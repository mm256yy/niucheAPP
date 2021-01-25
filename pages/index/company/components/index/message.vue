<template>
	<view class="message">
		<u-navbar back-text="返回" back-icon-size="0" title="我的消息" title-width="300" height='44' title-color="#000000">
		</u-navbar>
		<view class="content">
			<view @click="listMessage()" class="list">
				<u-image class="img" width="104rpx" height="104rpx" shape="circle" src="@/static/logoIcon.png"></u-image>
				<!-- <img style="width: 104rpx;height: 104rpx;border-radius: 50%;" src="@/static/logoIcon.png" alt=""> -->
				<view class="box">
					<view style="display:flex;">
						<view class="title">站内信息</view>
						<view class="time">{{time}}</view>
					</view>
					<view class="join">尊敬的用户，现在加入纽车网约车</view>
				</view>
			</view>
			<view @click="listChat()" class="list">
				<u-image class="img" width="104rpx" height="104rpx" shape="circle" src="@/static/logoIcon.png"></u-image>
				<!-- <img style="width: 104rpx;height: 104rpx;border-radius: 50%;" src="@/static/logoIcon.png" alt=""> -->
				<view class="box">
					<view style="display:flex;">
						<view class="title">聊天记录</view>
						<view class="time">{{time}}</view>
					</view>
					<view class="join">尊敬的用户，现在加入纽车网约车</view>
				</view>
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
			listMessage(){
				this.$u.route("/pages/index/company/components/index/letterStation")
			},
			listChat(){
				this.$u.route("/pages/chat/chat")
			}
	    },
	}
</script>
<style lang="scss" scoped>
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


