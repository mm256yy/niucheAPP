<template>
	<view class="message">
		<u-navbar back-text="返回" back-icon-size="0" title="我的消息" title-width="300" height='44' title-color="#000000">
		</u-navbar>
		<view class="content">
			<view @click="listMessage()" class="list">
				<img style="width: 104rpx;height: 104rpx;border-radius: 50%;" src="@/static/logoIcon.png" alt="">
				<view class="box">
					<view class="title">站内信息</view>
					<view class="join">尊敬的用户，现在加入纽车网约车</view>
				</view>
				<view class="time">19:07</view>
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
		mounted() {
			// this.getList();
		},
		methods: {
			getList(){
				this.$u.api.getUserWanted({driverDemandId:this.driverDemandId}).then(res=>{
					if(res.code === 200){
						 this.form = res.object
						 this.xslc.forEach(item=>{
							 if(item.name == this.form.km){
								 this.form.kmStr = item.text;
							 }
						 })
						 this.ageList.forEach(item=>{
						    if(item.name == this.form.carAge){
						    	this.form.carAgeStr = item.text;
						    }
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
  .message{
	  .content{
		 .list{
		 		  margin: 36rpx;
		 		  font-family: PingFangSC-Regular, PingFang SC;
		 		  display: flex;
		 		  border-bottom: 1rpx solid #e0e0e0;
		 		 .box{
		 			 margin-left: 28rpx;
		 		 		  .title{
		 		 		  		 font-size: 32rpx;
		 		 		  		 font-weight: 400;
		 		 		  		 color: #333333;
		 						  margin-bottom: 16rpx;
		 		 		  }
		 		 		  .join{
		 					  width: 500rpx;
		 		 		  		 font-size: 26rpx;
		 		 		  		 font-weight: 400;
		 		 		  		 color: #999999;
		 						  margin-bottom: 40rpx;
		 		 		  }
		 		 }
		 		 .time{
		 		 			  font-size: 24rpx;
		 		 			  font-weight: 400;
		 		 			  color: #C7C7C7;
		 		 } 
		 } 
	  }
  }
</style>


