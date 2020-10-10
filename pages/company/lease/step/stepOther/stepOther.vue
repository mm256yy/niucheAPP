<template>
	<view>
		<u-navbar back-text="返回"  back-icon-size="0" title="上传车辆外观" :background="{}" :back-text-style="backTextStyle" height='44' title-color="#FFFFFF">
			<view class="navbar-right" slot="right">
				<view class="message-box right-item">
					<text>跳过</text>
				</view>
			</view>
		</u-navbar>
		<view class="view-content">
		   <view class="top-content-upload" >
			<u-upload :custom-btn="true" :action="action" @on-success='uploadChange' upload-text="" :file-list="fileList" :max-size="4 * 1024 * 1024" max-count="5" style="width: 100%;justify-content: center;" >
				<view slot="addBtn" class="slot-btn" hover-class="slot-btn__hover" hover-stay-time="150">
					<u-icon name="plus" size="60" :color="$u.color['lightColor']"></u-icon>
					<view class="slot-tips">
						<view> 添加车辆其他图片或视频</view>
					</view>
				</view>
			</u-upload>
		  </view>
		  <view style="margin-top: 20pt;font-size: 10pt;padding-left: 5pt;">
		  	<view class="">
		  		* 其他图片指非平台指定拍摄角度或位置的图片。      
		  	</view>
		  	  <view class="">
		  	  	  您可以上传贵公司的车辆宣传视频，活动等。 
		  	  </view>
			<view class="">
				 您最多可以上传5张其他图
			</view>
		  </view>
		</view>
		<view style="text-align: center; padding: 5pt 20pt;margin-top: 10pt;">
			<u-button type="success" shape='circle' class="btn-agree" @click="toNext">下一步</u-button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				backTextStyle:{
					'color':'#ffffff'
				},
				action:'',
				fileList:[]
			}
		},
		methods: {
			toNext(){
				this.$u.route("/pages/company/lease/step/stepCards/stepCards")
			}
		}
	}
</script>

<style lang="scss">
.scroll-container {height: 100%;}
page{
	background-image: url(@/static/lease.png);
	background-size: cover;
	background-repeat: no-repeat;
	background-color:#f5f5f8 ;
	height: 100%;
}
/deep/ .u-border-bottom:after{
	border-bottom-width:0;
}
.navbar-right {
	margin-right: 24rpx;
	display: flex;
}
.right-item {
	margin: 0 12rpx;
	position: relative;
	color: #ffffff;
	display: flex;
}
.view-content{
	margin-top: 20pt;padding: 0 10pt;
}
.top-content-upload{
	border: 1px dotted #dedede;
	width: 100%;
	background: #FFFFFF;
	position: relative;
	height: 118pt;
}
.slot-btn {
	width: 230rpx;
	height: 100pt;
	display: flex;
	justify-content: center;
	align-items: center;
	background: #fff;
	border-radius: 10rpx;
}
.slot-btn__hover {
	background-color: rgb(235, 236, 238);
}
.slot-tips{
	position: absolute;top: 62pt;font-size: 10pt;text-align: center;
}
 .btn-agree{
	background: linear-gradient(55deg, $bg-grad-AB, $bg-grad-DDC);
 }
</style>
