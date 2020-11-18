<template>
	<view>
		<u-navbar back-text="返回"  back-icon-size="0" :back-text-style="backTextStyle" title="基本信息" :height="60" :background="backgroundDri" title-color="#FFFFFF">
			<view class="navbar-right" slot="right">
				<view class="message-box right-item">
					<u-icon name="edit-pen" size="38" v-if="!type" @click="type =true"></u-icon>
				</view>
			</view>
		 </u-navbar>
		<view class="top-content" >
            <view class="top-content-upload" v-if="type">
            	<u-upload :custom-btn="true" :action="action"
            	@on-success='uploadChange' :file-list="fileList" :max-size="8 * 1024 * 1024"
            	 max-count="1" style="width: 100%;justify-content: center;background-color: #FFFFFF;">
            		<view slot="addBtn" class="slot-btn" hover-class="slot-btn__hover" hover-stay-time="150">
            			<u-icon name="plus" size="60" :color="$u.color['lightColor']"></u-icon>
            		</view>
            	</u-upload>
            </view>
			<view v-else style="text-align: center;">
				<u-avatar :src="form.headPhoto" size="300"></u-avatar>
			</view>
		</view>
		<view class="middle-content">
			<u-form :model="form" ref="uForm" label-width="220" :error-type="errorType" :border-bottom="false">
				<u-form-item label="昵称" prop="nickName">
					<u-input class="input-radius" v-model="form.nickName" :border="true" v-if="type"/>
					<view v-else class="type-right">{{form.nickName}}</view>
				</u-form-item>
				<u-form-item label="手机号">
					<!-- <u-input class="input-radius" v-model="telephone" :disabled="true" :border="true" v-if="type"/> -->
					<view class="type-right">{{telephone}}</view>
				</u-form-item>
				<u-form-item label="微信号" prop="wechatNum">
					<u-input class="input-radius" v-model="form.wechatNum" :border="true" v-if="type"/>
					<view v-else class="type-right">{{form.wechatNum}}</view>
				</u-form-item>
				<u-form-item label="QQ号" prop="qqNum">
					<u-input class="input-radius" v-model="form.qqNum" :border="true" v-if="type"/>
					<view v-else class="type-right">{{form.qqNum}}</view>
				</u-form-item>
			</u-form>
		</view>
		<view style="text-align: center; padding: 15pt 30pt;">
			<u-button type="warning" shape='circle' class="btn-orange" @click="toNext" v-if="type">保存</u-button>
			<u-button type="warning" shape='circle' class="btn-orange" @click="showLogut = true" v-else>退出当前账号</u-button>
		</view>
         <u-modal v-model="showTips" @confirm="tipsConfirm"  confirm-text="我知道了">
			<view class="slot-content" style="padding: 10pt;font-size: 10pt;">
		        保存成功
			</view>
		</u-modal>
		<u-modal v-model="showLogut" title="提示" :show-cancel-button="true" confirm-text="是" cancel-text="否"
		 @confirm="loginOut">
			<view class="slot-content" style="padding: 10pt;font-size: 10pt;">
		        是否确定要退出当前账号？
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
				action: action,
				headerObj:{Authorization:''},
				formDataObj:{phone:''},
				fileList: [],
				form: {
					nickName:'',
					wechatNum:'',
					qqNum:'',
					headPhoto:'',
				},
				rules: {
					nickName:requiredRule,
					wechatNum:requiredRule,
					qqNum:requiredRule,
                },
				showTips:false,
				type:false,
				errorType:[
					'message'
				],
				telephone:'',
				showLogut:false
			}
		},
		onReady() {
		    this.$refs.uForm.setRules(this.rules);
		},
		mounted() {
			this.telephone = uni.getStorageSync('telephone');
			this.getInfo()
		},
		methods: {
			getInfo(){
				let token = uni.getStorageSync('token');
				if(token){
				  this.$u.api.listUserMessageInfo().then(res=>{
					if(res.code === 200){
						let data = res.object;
						if (data.headPhoto){
							this.fileList = []
							this.fileList.push({url:data.headPhoto})
						}
						if (!data.nickName && !data.telephone){
							this.type = false
						} else{
							this.form = data;
						}
					}else {
						 this.$u.toast(res.msg);
					}
				 })
				}
			},
			tipsConfirm(){
				this.$u.route({url:'/pages/mycenter/mycenter',type:'switchTab'})
			},
			edit(){
				this.type = true;
			},
			toNext(){
				this.$refs.uForm.validate(valid=>{
					if(valid) {
						this.$u.api.addUserMessageInfo(this.form).then(res => {
							if(res.code === 200){
								this.showTips =true;
							 } else{
								this.$u.toast(res.msg) 
							 }
						}).catch(res=>{this.$u.toast(res.msg)})
					} 
				})
			},
			uploadChange(res,index,lists,name){
				this.form.headPhoto = res.object
			},
			loginOut(){
				this.$u.api.logout({}).then(res=>{
					if (res.code === 200){
						this.$u.toast(res.msg);
						uni.removeStorageSync('telephone');
						uni.removeStorageSync('token');
						uni.removeStorageSync('isauthencation');
						uni.reLaunch({
						    url: '/pages/login/login'
						})
					}
				})
			},

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
		padding: 10pt 20pt;
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
	  margin-top: 20pt;
	  padding: 10pt 20pt;	
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

