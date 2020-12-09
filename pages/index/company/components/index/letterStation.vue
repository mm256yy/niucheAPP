<template>
	<view class="message">
		<u-navbar back-text="返回" back-icon-size="0" title="我的通知" title-width="300" height='44' title-color="#000000">
		</u-navbar>
		<view v-if="item.state==2" class="contentno" v-for="(item, index) in list" :key="index">
			<view @click="listMessage()" class="list">
				<view style="width: 14rpx;height: 14rpx;border-radius: 50%;background-color: #ff5644;"></view>
				<view class="title">{{item.title}}</view>
				<view class="time">{{item.begintime}}</view>
			</view>
			<view class="text">{{item.content}}</view>
		</view>
		<view v-if="item.state==1" class="content" v-for="(item, index) in list" :key="index">
			<view @click="listMessage()" class="list">
				<view class="title">{{item.title}}<text class="time">{{item.begintime}}</text></view>
			</view>
			<view class="text">{{item.content}}</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				list: []
			}
		},
		mounted() {
			this.getList();
		},
		methods: {
			format(time, format) {
			            var t = new Date(time);
			            var tf = function(i) {
			                return (i < 10 ? '0' : '') + i
			            };
			            return format.replace(/yyyy|MM|dd|HH|mm|ss/g, function(a) {
			                switch (a) {
			                case 'yyyy':
			                    return tf(t.getFullYear());
			                    break;
			                case 'MM':
			                    return tf(t.getMonth() + 1);
			                    break;
			                case 'mm':
			                    return tf(t.getMinutes());
			                    break;
			                case 'dd':
			                    return tf(t.getDate());
			                    break;
			                case 'HH':
			                    return tf(t.getHours());
			                    break;
			                case 'ss':
			                    return tf(t.getSeconds());
			                    break;
			                }
			            });
			        },
			getList(){
				this.$u.api.viewMessage().then(res=>{
					if(res.code === 200){
						 this.list = res.object;
						 this.list.forEach(item=>{
						 	item.begintime = this.format(item.begintime, 'yyyy-MM-dd HH:mm')
						 })
					}else {
						 this.$u.toast(res.msg);
					}
				})
			},
			listMessage(){
				this.$u.route("/pages/index/company/components/index/letterStation")
			}
	    },
	}
</script>
<style lang="scss" scoped>
	page{
		background-color: #f5f5f5;
	}
  .message{
	  .content{
	  		  width: 100%;
	  		  border-radius: 30rpx;
	  		  background-color: #fff;
	  		  padding: 30rpx;
	  		  display: flex;
	  		  flex-direction: column;
			  margin-top: 20rpx;
	  		 .list{
	  			 display: flex;
	  			 align-items: center;
	  			 margin-top: 20rpx;
	  			 font-family: PingFangSC-Medium, PingFang SC;
	  			 .title{ 
	  				 font-size: 30rpx;
	  				 font-weight: 900;
	  				 color: #666666;
	  				 margin-left: 12rpx;
	  				 margin-right: 20rpx;
	  			 }
	  			 .time{
	  				font-size: 24rpx;
	  				font-weight: 400;
	  				color: #C7C7C7;
					margin-left: 40rpx;
	  			 }
	  		 }
	  		 .text{
	  		 				font-size: 26rpx;
	  		 				font-weight: 500;
	  		 				color: #999999;
	  		 				margin-top: 20rpx;
	  		 }
	  }
	  .contentno{
	  		  width: 100%;
	  		  border-radius: 30rpx;
	  		  background-color: #fff;
	  		  padding: 30rpx;
	  		  display: flex;
	  		  flex-direction: column;
	  		  margin-top: 20rpx;
	  		 .list{
	  			 display: flex;
	  			 align-items: center;
	  			 margin-top: 20rpx;
	  			 font-family: PingFangSC-Medium, PingFang SC;
	  			 .title{ 
	  				 font-size: 30rpx;
	  				 font-weight: 900;
	  				 color: #111111;
	  				 margin-left: 12rpx;
	  				 margin-right: 20rpx;
	  			 }
	  			 .time{
	  				font-size: 24rpx;
	  				font-weight: 400;
	  				color: #C7C7C7; 
	  			 }
	  		 }
	  		 .text{
	  		 				font-size: 26rpx;
	  		 				font-weight: 500;
	  		 				color: #666666;
	  		 				margin-top: 20rpx;
	  		 }
	  }
  }
</style>


