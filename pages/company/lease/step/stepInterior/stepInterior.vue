<template>
	<view>
		<u-navbar back-text="返回"  back-icon-size="0" title="上传车辆内饰" :background="{}" :back-text-style="backTextStyle" height='44' title-color="#FFFFFF"></u-navbar>
		<view class="view-content">
		   <view class="top-content-upload" >
			<u-upload :custom-btn="true" :action="action" @on-success='uploadChange' upload-text="" :file-list="fileList" :max-size="4 * 1024 * 1024" max-count="1" style="width: 100%;justify-content: center;" >
				<view slot="addBtn" class="slot-btn" hover-class="slot-btn__hover" hover-stay-time="150">
					<u-icon name="plus" size="60" :color="$u.color['lightColor']"></u-icon>
					<view class="slot-tips">
						<view>图中应能清晰显示总行驶里程</view>
						 <view>请上传仪表盘照片</view>
						  <view style="color: #f00;">此图必拍，否则无法进入下一步！</view>
					</view>
				</view>
			</u-upload>
		  </view>
		</view>
		<view class="view-content">
		   <view class="top-content-upload" >
			<u-upload :custom-btn="true" :action="action" @on-success='uploadChange' upload-text="" :file-list="fileList" :max-size="4 * 1024 * 1024" max-count="1" style="width: 100%;justify-content: center;" >
				<view slot="addBtn" class="slot-btn" hover-class="slot-btn__hover" hover-stay-time="150">
					<u-icon name="plus" size="60" :color="$u.color['lightColor']"></u-icon>
					<view class="slot-tips">
						<view>拍摄前请注意收走会泄露隐私的物品(如挪车电话)！</view>
						 <view>请上传车辆前排内饰图片或视频</view>
					</view>
				</view>
			</u-upload>
		  </view>
		</view>
		<view class="view-content">
		   <view class="top-content-upload" >
			<u-upload :custom-btn="true" :action="action" @on-success='uploadChange' upload-text="" :file-list="fileList" :max-size="4 * 1024 * 1024" max-count="1" style="width: 100%;justify-content: center;" >
				<view slot="addBtn" class="slot-btn" hover-class="slot-btn__hover" hover-stay-time="150">
					<u-icon name="plus" size="60" :color="$u.color['lightColor']"></u-icon>
					<view class="slot-tips">
						<view>拍摄前请注意收走会泄露隐私的物品(如挪车电话)！</view>
						 <view>请上传车辆前排内饰图片或视频</view>
					</view>
				</view>
			</u-upload>
		  </view>
		</view>
		<view class="view-content">
		   <view class="top-content-upload" >
			<u-upload :custom-btn="true" :action="action" @on-success='uploadChange' upload-text="" :file-list="fileList" :max-size="4 * 1024 * 1024" max-count="1" style="width: 100%;justify-content: center;" >
				<view slot="addBtn" class="slot-btn" hover-class="slot-btn__hover" hover-stay-time="150">
					<u-icon name="plus" size="60" :color="$u.color['lightColor']"></u-icon>
					<view class="slot-tips">
						<view>请上传车辆后备箱照片或视频</view>
					</view>
				</view>
			</u-upload>
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
				this.$u.route("/pages/company/lease/step/stepAppearance/stepAppearance")
			}
		}
	}
</script>

<style lang="scss">
.scroll-container {height: 100%;}
page{
	background-image: url(@/static/lease.png);
	background-position: 40% 40%;
	background-repeat: no-repeat;
	height: 100%;
}
/deep/ .u-border-bottom:after{
	border-bottom-width:0;
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
