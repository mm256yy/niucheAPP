<template>
	<view>
		<u-navbar back-text="返回"  back-icon-size="0" title="上传车辆证件" :background="backgroundCom" :back-text-style="backTextStyle" height='44' title-color="#FFFFFF"></u-navbar>
		<view class="view-content">
		  <view style="margin-top: 20pt;font-size: 10pt;padding: 5pt;background: #FFFFFF;">
		  	<view class="">车辆《行驶证》与《运输证》是哪种情况？</view>
		  	  <view class="">
		  	  	 <u-radio-group v-model="form.type" :wrap="true" active-color="#6DD99C">
		  	  	 	<u-radio name="1">营运车辆行驶证与运输证，两证合一为驾驶证</u-radio>
		  	  	 	<u-radio name="2">营运车辆行驶证与运输证，两证未合并</u-radio>
					<u-radio name="3">非营运车辆行驶证</u-radio>
		  	  	 </u-radio-group>
		  	  </view>
		  </view>
		</view>
		
		<view class="view-content">
		  <view style="margin-top: 20pt;font-size: 10pt;padding-left: 5pt;">
		  	<view class="">* 请注意，车辆所有人输入要与证件图片保持一致。</view>
		  	<view class="">不一致会致使审核不通过，信息不能发布。</view>
			<view class="" style="margin-top: 15pt;">
				 <u-input v-model="form.cardrivepeople" style="background: #FFFFFF;" placeholder="请输入《行驶证》中的车辆所有人" :border="true"/>
			</view>
		  </view>
		</view>
		<view class="view-content">
		   <view class="top-content-upload" >
			<u-upload :custom-btn="true" :action="action"
			@on-success='uploadChange' upload-text="" index="cardivephoto"
			 :file-list="fileList" :max-size="4 * 1024 * 1024" max-count="1" style="width: 100%;justify-content: center;" >
				<view slot="addBtn" class="slot-btn" hover-class="slot-btn__hover" hover-stay-time="150">
					<u-icon name="plus" size="60" :color="$u.color['lightColor']"></u-icon>
					<view class="slot-tips">
						<view>请上传批次中1辆车的《车辆行驶证》</view>
						<!-- <view>图片尺寸建议：xxxx*xxxx，大小不超过：XXX MB</view> -->
					</view>
				</view>
			</u-upload>
		  </view>
		</view>
		<view class="view-content" v-show="form.type!== '1'">
			<view class="" style="margin: 15pt 0;">
				 <u-input v-model="form.taxipeople" style="background: #FFFFFF;" placeholder="请输入《运输证》中的车辆所有人" :border="true"/>
			</view>
		   <view class="top-content-upload" >
			<u-upload :custom-btn="true" :action="action" :header="headerObj" :form-data="formDataObj" @on-success='uploadChange' index="taxiphoto"
			 upload-text="" :file-list="fileList1" :max-size="4 * 1024 * 1024" max-count="1" style="width: 100%;justify-content: center;" >
				<view slot="addBtn" class="slot-btn" hover-class="slot-btn__hover" hover-stay-time="150">
					<u-icon name="plus" size="60" :color="$u.color['lightColor']"></u-icon>
					<view class="slot-tips">
						 <view>请上传批次中1辆车的《网络预约出租汽车运输证》</view>
					</view>
				</view>
			</u-upload>
		  </view>
		</view>
		<view style="text-align: center; padding: 5pt 25pt;margin-top: 10pt;">
			<u-button type="success" shape='circle' class="btn-agree" @click="toNext">下一步</u-button>
		</view>
		<NotLogin></NotLogin>
		<auth></auth>
	</view>
</template>

<script>
	import {action} from '@/utils/constant.js'
	import NotLogin from '@/components/notlogin/notlogin.vue'
	import auth from '@/components/auth.vue'
	export default {
		components:{
			NotLogin,
			auth
		},
		data() {
			return {
				backTextStyle:{'color':'#ffffff'},
				type:2,
				action: action,
				headerObj:{Authorization:''},
				formDataObj:{phone:''},
				fileList:[],
				fileList1:[],
				form:{cardivephoto:'',cardrivepeople:'',taxiphoto:'',taxipeople:'',type:2},
				carPubSeven:{}
			}
		},
		mounted() {
			this.initStorage()
			let id = uni.getStorageSync('editId');
			if(id){
				this.form = this.carPubSeven;
				this.fileList = [{url:this.form.cardivephoto}]
				this.fileList1 = [{url:this.form.taxiphoto}]
			}
		},
		methods: {
			initStorage(){
				this.carPubSeven = uni.getStorageSync('carPubSeven');
			},
			setStorage(data){
				 uni.setStorageSync('carPubSeven', data);
			},
			  uploadChange(data, index, lists, name){
				this.form[name] = data.object;
				this.$u.toast(data.msg);
			  },
			 toNext(){
				if (this.form.cardivephoto === '' || this.form.cardrivepeople === ''){
					this.$u.toast('请填写完整');
					return
				}
				this.setStorage(this.form) 
				this.$u.route("/pages/company/lease/step/stepNumber/stepNumber")
			}
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
