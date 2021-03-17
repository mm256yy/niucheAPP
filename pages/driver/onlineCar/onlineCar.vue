<template>
	<view>
		<u-navbar back-text="返回"  back-icon-size="0" :title="title" :back-text-style="backTextStyle" :background="backgroundDri" title-color="#FFFFFF">
		 </u-navbar>
		<view class="top-content" >
			<view style="background-color: #dedede;padding: 8pt 0;" v-show="reason">
				<text>{{reason}}</text>
			</view>
			<view class="top-content-base">网约车驾驶员证认证</view>
			<view class="top-content-base" style="font-size: 12pt;">请拍照上传证件第2页的内容</view>
			<view class="top-content-upload" v-if="type">
				<view></view>
				<u-upload :custom-btn="true" :action="action" 
				@on-success='uploadChange' upload-text="" :file-list="fileList"
				 max-count="1" style="width: 100%;justify-content: center;background-color: #FFFFFF;">
					<view slot="addBtn" class="slot-btn" hover-class="slot-btn__hover" hover-stay-time="150">
						<u-icon name="plus" size="60" :color="$u.color['lightColor']"></u-icon>
					</view>
				</u-upload>
			</view>
			<view class="" v-else>
				<u-image width="100%" height="240rpx" :src="form.driverPhoto"></u-image>
			</view>
			<view class="top-content-uploadTips" style="padding:10pt 0 5pt;">1.必须为jpg格式,单张不得超过8M</view>
		</view>
		<view style="text-align: center; padding: 5pt 30pt;" v-show="type">
			<u-button type="warning" shape='circle' class="btn-orange" @click="toNext">提交</u-button>
		</view>
		<u-modal v-model="showTips" @confirm="confirm" confirm-text="我知道了">
			<view class="slot-content" style="padding: 10pt;font-size: 10pt;">
				您的信息已提交审核
			</view>
		</u-modal>
	</view>
</template>

<script>
	import {requiredRule} from '@/common/rule.js'
	import {action} from '@/utils/constant.js'
	export default {
		data() {
			return {
				labelStyle:{'color':'#7F7F7F'},
				backTextStyle:{'color':'#ffffff'},
				title:'证件上传',
				action: action,
				fileList: [],
				form: {
					type:1,//网约车1 出租车2 驾照0
					driverPhoto:''
				},
				show: false,
				showTips:false,
				type:true,//切换修改
				stateType:false,
				reason:'',
				id:'',
				errorType:[
					'message'
				],
			}
		},
		onBackPress(event) {
			 this.$u.api.setEvent({eventId:"attestation_Return_1",type:3,params:{souce:'网约车认证'}})
		},
		mounted() {
			this.getInfo()
		},
		methods: {
			getInfo(){
				this.$u.api.listDrivingLicense({state:1}).then(res => {
					if(res.code === 200){
					let data = res.object;
						this.form =data;
						this.form.type = 1;
					this.fileList= [{url:data.driverPhoto}]
						if (data.certificationstate === 3){
							this.type = true;
							this.reason ="驳回理由："+data.certificationrejectreason;
						}else if (data.certificationstate === 2){
							this.title = '证件已认证';
							this.reason = "* 证件已认证，不能更改 "
							this.stateType = false;
							this.type = false;
						} else if(data.certificationstate ===1){
							this.type = false;
							this.title = "证件审核中"
							this.reason = "* 信息已提交，在审核期间本页内容不能修改。"
						}
					 } else{
						// this.$u.toast(res.msg) 
					 }
				}).catch(res=>{this.$u.toast(res.msg)})
			},
			showPicker(name){
				this.pickerName = name;
				this.show = true;
			},
			confirm(){
				this.$u.route({url:'/pages/mycenter/mycenter',type:'switchTab'})
			},
			toNext(){
				if (this.form.driverPhoto === ''){
					this.$u.toast('请上传图片');
					return
				}
				this.$u.api.addDrivingLicense(this.form).then(res => {
					if(res.code === 200){
						this.showTips =true;
					 } else{
						this.$u.toast(res.msg) 
					 }
				})
			},
			uploadChange(res,index,lists,name){
				this.form.driverPhoto = res.object
			}
		}
	}
</script>

<style lang="scss" scoped>
	page{
		background-color: #F5F5F8;
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
	.top-content{
		padding: 10pt 15pt;
		.top-content-base{
			font-size:14pt ;
			color: #000000;
			padding: 10pt 0;
		}
		.top-content-upload{
			border: 1px dotted #dedede;
			width: 100%;
		}
		.slot-btn {
			width: 330rpx;
			height: 200rpx;
			display: flex;
			justify-content: center;
			align-items: center;
			background: #fff;
			border-radius: 10rpx;
		}
		.slot-btn__hover {
			background-color: rgb(235, 236, 238);
		}
		.top-content-uploadTips{
			font-size: 10pt;
			color: #000000;
		}
	}
	.middle-content{
	  padding: 10pt 15pt;	
	  .middle-content-label{
		  position: absolute;right: 10px;
	  }
	  .iconAbs{
		  position: absolute;right: 10rpx;
	  }
	  .input-radius{
		  background-color: #FFFFFF;
		  border-radius: 20pt;
	  }
	  .type-right{
		  width: 90%;
		  text-align: right;
	  }
	}

	 .btn-orange{
		background: linear-gradient(55deg, $bg-grad-FE, $bg-grad-FCD);
	 }
</style>

