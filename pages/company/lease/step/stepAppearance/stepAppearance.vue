<template>
	<view>
		<u-navbar back-text="返回"  back-icon-size="0" title="上传车辆外观" :background="backgroundCom" :back-text-style="backTextStyle" height='44' title-color="#FFFFFF"></u-navbar>
		<view class="view-content">
		   <view class="top-content-upload" >
			<u-upload :custom-btn="true" :action="action" :header="headerObj" :form-data="formDataObj" 
			@on-success='uploadChange' index="onephoto" upload-text=""
			 :file-list="fileList" :max-size="4 * 1024 * 1024" max-count="1" style="width: 100%;justify-content: center;">
				<view slot="addBtn" class="slot-btn" hover-class="slot-btn__hover" hover-stay-time="150">
					<u-icon name="plus" size="60" :color="$u.color['lightColor']"></u-icon>
					<view class="slot-tips">
						<view> 拍摄前请注意遮挡号牌！</view>
						 <view>请上传车辆外观视频（绕车一周）</view>
					</view>
				</view>
			</u-upload>
		  </view>
		  <view style="margin-top: 20pt;font-size: 10pt;padding-left: 5pt;">
		  	<view class="">
		  		若上传外观图片，请按照如下指示位置拍照！
		  	</view>
		  	  <view class="">
		  	  	 拍摄时请注意遮挡号牌，保护您的隐私！
		  	  </view>
			<view class="">
				 您至少需要上传1张外观图片或1个外观视频。
			</view>
		  </view>
		</view>
		<view class="view-content" v-for="(item,index) in uploadList" :key='index'>
		   <view class="top-content-upload" >
			<u-upload :custom-btn="true" :action="action" :header="headerObj" :form-data="formDataObj"
			 @on-success='uploadChange' :index="item.resName" upload-text="" 
			:file-list="item.fileList" :max-size="4 * 1024 * 1024" max-count="1" style="width: 100%;justify-content: center;" >
				<view slot="addBtn" class="slot-btn" hover-class="slot-btn__hover" hover-stay-time="150">
					<u-icon name="plus" size="60" :color="$u.color['lightColor']"></u-icon>
					<view class="slot-tips">
						 <view style="color:#f00;" v-if="index ===0 ">此图必拍，否则无法进入下一步！</view>
						<view >{{item.tipText}}</view>
					</view>
				</view>
			</u-upload>
		  </view>
		</view>

		<view style="text-align: center; padding: 5pt 20pt;margin-top: 10pt;">
			<u-button type="success" shape='circle' class="btn-agree" @click="setForm">下一步</u-button>
		</view>
	</view>
</template>

<script>
	import {mapGetters,mapActions} from 'vuex'
	export default {
		data() {
			return {
				backTextStyle:{
					'color':'#ffffff'
				},
				action: 'http://161.189.168.218:9007/user/image/carotherphoto',
				headerObj:{Authorization:''},
				formDataObj:{phone:''},
				uploadList:[
					{fileList:[],tipText:'请上传车辆右前方或左前方45°照片',resName:'twophoto'},
					{fileList:[],tipText:'请上传车辆正前方照片',resName:'threephoto',},
					{fileList:[],tipText:'请上传车辆侧面照片',resName:'fourphoto'},
				],
				form:{onephoto:'',twophoto:'',threephoto:'',fourphoto:'',},
				fileList:[]
			}
		},
		computed:{
			...mapGetters(['carPubFour','token','telephone'])
		},
		mounted() {
			this.setPicToken()
		},
		methods: {
			  ...mapActions(['CARPUBFOUR']),
			  setPicToken(){
			  	this.headerObj.Authorization = this.token;
			  	this.formDataObj.phone = this.telephone;
			  },
			uploadChange(data, index, lists, name){
				this.form[name] = data.text;
				this.$u.toast(data.msg);
			},
			setForm(){
				if ( this.form.twophoto === ''){
					this.$u.toast('请上传图片');
					return
				}
				this.CARPUBFOUR(this.form) 
				this.$u.route("/pages/company/lease/step/stepInterior/stepInterior")
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
