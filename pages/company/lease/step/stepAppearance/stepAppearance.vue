<template>
	<view>
		<u-navbar back-text="返回"  back-icon-size="0" title="车辆证照上传(2/3)" :background="backgroundCom" 
		:back-text-style="backTextStyle" height='44' title-color="#FFFFFF"></u-navbar>
		<view class="view-content">
		   <view style="padding-bottom: 10pt;">1.车辆照片上传</view>
		   <view class="top-content-upload" >
			<u-upload :custom-btn="true" :action="action" max-count="18" ref="upload"
			 @on-success='uploadChange' index="onephoto" upload-text="" @on-remove="removeOne"
			 :file-list="fileList" :max-size="4 * 1024 * 1024" style="width: 100%;justify-content: center;">
				<view slot="addBtn" class="slot-btn" hover-class="slot-btn__hover" hover-stay-time="150">
					<u-icon name="plus" size="60" :color="$u.color['lightColor']"></u-icon>
				</view>
			</u-upload>
		  </view>
		  <view style="margin-top: 10pt;font-size: 10pt;padding-left: 5pt;">
		  	    <view>上传图片必须包含：</view>
		  		<view>1、车外观左右前方45°照片；</view>
		  		<view>2、车外观正前正后方照片;</view>
		  		<view>3、车外观两侧照片；</view>
		  		<view>4、车外观右后方或左后方45°照片；</view>
		  		<view>5、车辆内部中控仪表盘照片；</view>
		  		<view>6、车辆内部前后排图片；</view>
		  		<view>7、车辆后备箱照片；</view>
		  		<view>8、该批次车辆集体照片；</view>
		  		<view style="color: #f00;padding-top: 5pt;font-size: 8pt;">*必须为jpg格式，最多18张</view>
		  </view>
		</view>
		<view class="view-content">
		   <view style="padding-bottom: 10pt;">2.车辆证件上传</view>
		    <view class="top-content-upload" >
				<u-upload :custom-btn="true" :action="action" max-count="100" ref='upload1'
				 @on-success='uploadChange' index="oneneishiphoto" upload-text=""  @on-remove="removeOne"
				 :file-list="fileList1" :max-size="4 * 1024 * 1024" style="width: 100%;justify-content: center;">
					<view slot="addBtn" class="slot-btn" hover-class="slot-btn__hover" hover-stay-time="150">
						<u-icon name="plus" size="60" :color="$u.color['lightColor']"></u-icon>
					</view>
				</u-upload>
		   </view>
		   <view style="margin-top: 10pt;font-size: 10pt;padding-left: 5pt;">
		   	    <view>请上传该批次车辆《行驶证》或《运输证》，建议每辆车上传一份！</view>
		   </view>
		</view>
        <view class="view-content" style="color: #f00;font-size: 8pt;">*上传的车辆证件须与认证主体名称一致，否则可能会造成审核失败。</view>
		<view style="text-align: center; padding: 5pt 20pt;margin-top: 10pt;">
			<u-button type="success" shape='circle' class="btn-agree" @click="setForm">下一步</u-button>
		</view>
		<auth></auth>
	</view>
</template>

<script>
	import {action} from '@/utils/constant.js'
	import auth from '@/components/auth.vue'
	export default {
		components:{
			auth
		},
		data() {
			return {
				backTextStyle:{
					'color':'#ffffff'
				},
				action: action,
				form:{onephoto:[],oneneishiphoto:[],},
				fileList:[],
				fileList1:[],
				carPubSecond:{},
				carPubType:1,
			}
		},
		mounted() {
			this.initStorage()
			let id = uni.getStorageSync('editId');
			if(id){
				let onephotoList = this.carPubSecond.onephoto;
				let oneneishiphotoList =this.carPubSecond.oneneishiphoto;
				onephotoList.forEach(item=>{
					this.fileList.push({url:item})
				})
				oneneishiphotoList.forEach(item=>{
					this.fileList1.push({url:item})
				})
				this.form = this.carPubSecond
			}
		},
		methods: {
		    initStorage(){
				this.carPubSecond = uni.getStorageSync('carPubSecond');
				this.carPubType = uni.getStorageSync('carPubType');
			},
			setStorage(data){
				 uni.setStorageSync('carPubSecond', data);
			},
			uploadChange(data, index, lists, name){
				this.form[name].push(data.object);
				this.$u.toast(data.msg);
			},
			removeOne(index,lists,name){
				this.form[name].splice(index,1);
				console.log(this.form[name])
			},
			setForm(){
				if ( this.form.onephoto.length ===0 || this.form.oneneishiphoto.length === 0){
					this.$u.toast('请上传图片');
					return
				}
				this.setStorage(this.form) 
				if(this.carPubType === 1) {
					this.$u.route("/pages/company/lease/step/stepCost/stepCost")
				} else {
					this.$u.route("/pages/company/lease/step/stepResell/stepResell")
				}
			},
		}
	}
</script>

<style lang="scss">
.scroll-container {height: 100%;}
page{
	// background-image: url(@/static/lease.png);
	background-size: cover;
	background-repeat: no-repeat;
	background-color:#f5f5f8 ;
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
	// height: 118pt;
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
