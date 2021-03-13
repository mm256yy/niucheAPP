<template>
	<view>
		<u-navbar back-icon-color="#111111" title="验车车辆信息浏览" :background="background" title-color="#111111"></u-navbar>
		<view class="content">
			<view class="title">车辆行驶证</view>
			<u-image @click="preview(index,arr)" width="694rpx" height="386rpx" v-for="(item,index) in arr" :key="index" :src="item"></u-image>
			<view style="display: flex;padding: 42rpx 0;">
				<view style="width: 240rpx;margin-right: 50rpx;color: #bcbcbc;">号牌号码：</view>
				<view style="width: 420rpx;text-align: right;">{{detail.number||'暂无数据'}}</view>
			</view>
			<view style="display: flex;padding: 42rpx 0;">
				<view style="width: 240rpx;margin-right: 50rpx;color: #bcbcbc;">车辆类型：</view>
				<view style="width: 420rpx;text-align: right;">{{detail.type||'暂无数据'}}</view>
			</view>
			<view style="display: flex;padding: 42rpx 0;">
				<view style="width: 240rpx;margin-right: 50rpx;color: #bcbcbc;">住址：</view>
				<view style="width: 420rpx;text-align: right;">{{detail.address||'暂无数据'}}</view>
			</view>
			<view style="display: flex;padding: 42rpx 0;">
				<view style="width: 240rpx;margin-right: 50rpx;color: #bcbcbc;">使用性质：</view>
				<view style="width: 420rpx;text-align: right;">{{detail.character||'暂无数据'}}</view>
			</view>
			<view style="display: flex;padding: 42rpx 0;">
				<view style="width: 240rpx;margin-right: 50rpx;color: #bcbcbc;">品牌型号：</view>
				<view style="width: 420rpx;text-align: right;">{{detail.model||'暂无数据'}}</view>
			</view>
			<view style="display: flex;padding: 42rpx 0;">
				<view style="width: 240rpx;margin-right: 50rpx;color: #bcbcbc;">车辆识别代号：</view>
				<view style="width: 420rpx;text-align: right;">{{detail.vin||'暂无数据'}}</view>
			</view>
			<view style="display: flex;padding: 42rpx 0;">
				<view style="width: 240rpx;margin-right: 50rpx;color: #bcbcbc;">发动机号码：</view>
				<view style="width: 420rpx;text-align: right;">{{detail.engine||'暂无数据'}}</view>
			</view>
			<view style="display: flex;padding: 42rpx 0;">
				<view style="width: 240rpx;margin-right: 50rpx;color: #bcbcbc;">注册日期：</view>
				<view style="width: 420rpx;text-align: right;">{{detail.register_date||'暂无数据'}}</view>
			</view>
			<view style="display: flex;padding: 42rpx 0;">
				<view style="width: 240rpx;margin-right: 50rpx;color: #bcbcbc;">发证日期：</view>
				<view style="width: 420rpx;text-align: right;">{{detail.issue_date||'暂无数据'}}</view>
			</view>
		</view>
		<view style="margin-top: 20rpx;" class="content">
			<view style="margin-top: 20rpx;" class="title">车辆铭牌（1张）</view>
			<u-image @click="preview(index,arrFirst)" width="694rpx" height="386rpx" v-for="(item,index) in arrFirst" :key="index" :src="item"></u-image>
		</view>
		<view style="margin-top: 20rpx;" class="content">
			<view style="margin-top: 20rpx;" class="title">中控仪表盘（必填）</view>
			<u-image @click="preview(index,arrSecond)" width="694rpx" height="386rpx" v-for="(item,index) in arrSecond" :key="index" :src="item"></u-image>
			<!-- <view style="margin-top: 32rpx;">表显里程：12333333KM</view> -->
		</view>
		<view style="margin-top: 20rpx;" class="content">
			<view style="margin-top: 20rpx;" class="title">车况详细登记</view>
			<view style="display: flex;justify-content: space-between;align-items: center;">
				<view style="margin-top: 20rpx;" class="title">一.外观漆面和碰撞登记</view>
				<view @click="showOrHide('openFlag')"><u-icon :name="openFlag?'arrow-up':'arrow-down'" size="36" color="#111111"></u-icon></view>
			</view>
			<view v-show="openFlag" style="margin-top: 60rpx;" v-for="(item,index) in detail.oneList" :key="index">
				<view style="display: flex;justify-content: space-between;">
					<view style="margin-top: 20rpx;" class="title">{{item.name}}</view>
					<view class="status" v-show='item.text'>{{item.text}}</view>
					<view class="status" v-show='!item.text'>无</view>
				</view>
				<view style="display: flex;justify-content: space-between;">
					<u-image @click="preview(index,item.photo)" width="208rpx" height="208rpx" v-for="(item,index) in item.photo" :key="index" :src="item"></u-image>
				</view>
			</view>
		</view>
		<view style="margin-top: 20rpx;" class="content">
			<view style="display: flex;justify-content: space-between;align-items: center;">
				<view style="margin-top: 20rpx;" class="title">二.常用功能登记</view>
				<view @click="showOrHide('twoFlag')"><u-icon :name="twoFlag?'arrow-up':'arrow-down'" size="36" color="#111111"></u-icon></view>
			</view>
			<view v-show="twoFlag">
				<view class="title">安全系统</view>
				<view style="padding-bottom: 42rpx;border-bottom: 2rpx solid rgba(0,0,0,0.08);">
					<view style="margin-top: 60rpx;" v-for="(item,index) in detail.safeList" :key="index">
						<view style="display: flex;justify-content: space-between;">
							<view style="margin-top: 20rpx;" class="title">{{item.name}}</view>
							<view class="status" v-show='item.text'>{{item.text}}</view>
							<view class="status" v-show='!item.text'>无</view>
						</view>
						<view style="display: flex;justify-content: space-between;">
							<u-image @click="preview(index,item.photo)" width="208rpx" height="208rpx" v-for="(item,index) in item.photo" :key="index" :src="item"></u-image>
						</view>
					</view>
				</view>
				<view style="margin-top: 42rpx;" class="title">外部配置</view>
				<view style="padding-bottom: 42rpx;border-bottom: 2rpx solid rgba(0,0,0,0.08);">
					<view style="margin-top: 60rpx;" v-for="(item,index) in detail.outsideList" :key="index">
						<view style="display: flex;justify-content: space-between;">
							<view style="margin-top: 20rpx;" class="title">{{item.name}}</view>
							<view class="status" v-show='item.text'>{{item.text}}</view>
							<view class="status" v-show='!item.text'>无</view>
						</view>
						<view style="display: flex;justify-content: space-between;">
							<u-image @click="preview(index,item.photo)" width="208rpx" height="208rpx" v-for="(item,index) in item.photo" :key="index" :src="item"></u-image>
						</view>
					</view>
				</view>
				<view style="margin-top: 42rpx;" class="title">内部配置</view>
				<view style="padding-bottom: 42rpx;border-bottom: 2rpx solid rgba(0,0,0,0.08);">
					<view style="margin-top: 60rpx;" v-for="(item,index) in detail.insideList" :key="index">
						<view style="display: flex;justify-content: space-between;">
							<view style="margin-top: 20rpx;" class="title">{{item.name}}</view>
							<view class="status" v-show='item.text'>{{item.text}}</view>
							<view class="status" v-show='!item.text'>无</view>
						</view>
						<view style="display: flex;justify-content: space-between;">
							<u-image @click="preview(index,item.photo)" width="208rpx" height="208rpx" v-for="(item,index) in item.photo" :key="index" :src="item"></u-image>
						</view>
					</view>
				</view>
				<view style="margin-top: 42rpx;" class="title">灯光系统</view>
				<view style="margin-top: 60rpx;" v-for="(item,index) in detail.lightList" :key="index">
					<view style="display: flex;justify-content: space-between;">
						<view style="margin-top: 20rpx;" class="title">{{item.name}}</view>
						<view class="status" v-show='item.text'>{{item.text}}</view>
						<view class="status" v-show='!item.text'>无</view>
					</view>
					<view style="display: flex;justify-content: space-between;">
						<u-image @click="preview(index,item.photo)" width="208rpx" height="208rpx" v-for="(item,index) in item.photo" :key="index" :src="item"></u-image>
					</view>
				</view>
			</view>
		</view>
		<view style="margin-top: 20rpx;" class="content">
			<view style="display: flex;justify-content: space-between;align-items: center;">
				<view style="margin-top: 20rpx;" class="title">三.启动检测</view>
				<view @click="showOrHide('threeFlag')"><u-icon :name="threeFlag?'arrow-up':'arrow-down'" size="36" color="#111111"></u-icon></view>
			</view>
			<view v-show="threeFlag">
				<view class="title">仪表台故障灯</view>
				<view style="padding-bottom: 42rpx;border-bottom: 2rpx solid rgba(0,0,0,0.08);">
					<view style="margin-top: 60rpx;" v-for="(item,index) in detail.faultList" :key="index">
						<view style="display: flex;justify-content: space-between;">
							<view style="margin-top: 20rpx;" class="title">{{item.name}}</view>
							<view class="status" v-show='item.text'>{{item.text}}</view>
							<view class="status" v-show='!item.text'>无</view>
						</view>
						<view style="display: flex;justify-content: space-between;">
							
							<u-image @click="preview(index,item.photo)" width="208rpx" height="208rpx" v-for="(item,index) in item.photo" :key="index" :src="item"></u-image>
						</view>
					</view>
				</view>
				<view style="margin-top: 42rpx;" class="title">发动力状态</view>
				<view style="padding-bottom: 42rpx;border-bottom: 2rpx solid rgba(0,0,0,0.08);">
					<view style="margin-top: 60rpx;" v-for="(item,index) in detail.powerStatusList" :key="index">
						<view style="display: flex;justify-content: space-between;">
							<view style="margin-top: 20rpx;" class="title">{{item.name}}</view>
							<view class="status" v-show='item.text'>{{item.text}}</view>
							<view class="status" v-show='!item.text'>无</view>
						</view>
						<view style="display: flex;justify-content: space-between;">
							<u-image @click="preview(index,item.photo)" width="208rpx" height="208rpx" v-for="(item,index) in item.photo" :key="index" :src="item"></u-image>
						</view>
					</view>
				</view>
				<view style="margin-top: 42rpx;" class="title">变速箱及转向</view>
				<view style="margin-top: 60rpx;" v-for="(item,index) in detail.speedList" :key="index">
					<view style="display: flex;justify-content: space-between;">
						<view style="margin-top: 20rpx;" class="title">{{item.name}}</view>
						<view class="status" v-show='item.text'>{{item.text}}</view>
						<view class="status" v-show='!item.text'>无</view>
					</view>
					<view style="display: flex;justify-content: space-between;">
						<u-image @click="preview(index,item.photo)" width="208rpx" height="208rpx" v-for="(item,index) in item.photo" :key="index" :src="item"></u-image>
					</view>
				</view>
			</view>
		</view>
		<view style="margin-top: 20rpx;" class="content">
			<view style="display: flex;justify-content: space-between;align-items: center;">
				<view style="margin-top: 20rpx;" class="title">四.随车工具</view>
				<view @click="showOrHide('fourFlag')"><u-icon :name="fourFlag?'arrow-up':'arrow-down'" size="36" color="#111111"></u-icon></view>
			</view>
			<view v-show="fourFlag" style="margin-top: 60rpx;" v-for="(item,index) in detail.toolList" :key="index">
				<view style="display: flex;justify-content: space-between;">
					<view style="margin-top: 20rpx;" class="title">{{item.name}}</view>
					<view class="status" v-show='item.text'>{{item.text}}</view>
					<view class="status" v-show='!item.text'>无</view>
				</view>
				<view style="display: flex;justify-content: space-between;">
					<u-image @click="preview(index,item.photo)" width="208rpx" height="208rpx" v-for="(item,index) in item.photo" :key="index" :src="item"></u-image>
				</view>
			</view>
		</view>
		<kxj-previewImage ref="preview" :saveBtn="false" :rotateBtn="false" :imgs="poslist"></kxj-previewImage>
	</view>
</template>

<script>
	import kxjPreviewImage from '@/components/kxj-previewImage/kxj-previewImage.vue'
	export default {
		components: {
			kxjPreviewImage
		  },
		data() {
			return {
				background: {
					'background-image': 'linear-gradient(to bottom, #000000 39%,#ffffff 0%)'
				},
				detail: {
				  
				},
				openFlag:true,
				twoFlag:true,
				threeFlag:true,
				fourFlag:true,
				arr:[],
				arrFirst:[],
				arrSecond:[],
				poslist:[]
			}
		},
		onLoad(option) {
			let id = option.id;
			if(id){
			 this.getMessage(id)
			}
		},
		methods: {
			showOrHide(name){
				this[name] = !this[name];
			},
			preview(e,name){
				this.poslist = name;
				this.$refs.preview.open(e)
			},
          getMessage(id){
          	let token = uni.getStorageSync('token');
          	if(token){
          		this.$u.api.checkCarList({
          			orderId:id
          		}).then(res=>{
          			if(res.code === 200){
          				 this.detail = JSON.parse(res.object);
						 this.arr.push(this.detail.drivingImg)
						 this.arrFirst.push(this.detail.nameplateImg)
						 this.arrSecond.push(this.detail.meterImg)
          			}else {
          				 this.$u.toast(res.msg);
          			}
          		})
          	}
          },
		}	
	}
</script>

<style lang="scss" scoped>
	page{
		background: #f5f5f5;
	}
	.content{
		padding: 28rpx;
		color: #111;
		background: #fff;
	}
	.title{
		font-size: 32rpx;
		color: #111;
		margin-bottom: 20rpx;
	}
	.status{
		min-width: 156rpx;
		height: 72rpx;
		line-height: 72rpx;
		text-align: center;
		background: #FFEBD0;
		border-radius: 8rpx;
		border: 1px solid #FF9B0F;
		font-size: 28rpx;
		color: #FF9B0F;
	}	
</style>
