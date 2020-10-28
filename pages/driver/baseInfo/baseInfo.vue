<template>
	<view>
		<u-navbar back-text="返回"  back-icon-size="0" title="基本信息" :back-text-style="backTextStyle" :height="60" :background="backgroundDri" title-color="#FFFFFF">
			<view class="navbar-right" slot="right">
				<view class="message-box right-item">
					<u-icon name="edit-pen" size="38" v-if="!type" @click="type =true"></u-icon>
				</view>
			</view>
		 </u-navbar>
		<view class="top-content" >
            <view class="top-content-upload" v-if="type">
            	<u-upload :custom-btn="true" :action="action" :header="headerObj" :form-data="formDataObj" 
            	@on-success='uploadChange' upload-text="" :file-list="fileList" :max-size="8 * 1024 * 1024"
            	 max-count="1" style="width: 100%;justify-content: center;background-color: #FFFFFF;">
            		<view slot="addBtn" class="slot-btn" hover-class="slot-btn__hover" hover-stay-time="150">
            			<u-icon name="plus" size="60" :color="$u.color['lightColor']"></u-icon>
            		</view>
            	</u-upload>
            </view>
			<view v-else style="text-align: center;">
				<u-avatar :src="form.photo" size="300"></u-avatar>
			</view>
		</view>
		<view class="middle-content">
			<u-form :model="form" ref="uForm" label-width="220" :error-type="errorType" :border-bottom="false">
				<u-form-item label="昵称" prop="name">
					<u-input class="input-radius" v-model="form.name" :border="true" v-if="type"/>
					<view v-else class="type-right">{{form.name}}</view>
				</u-form-item>
				<u-form-item label="手机号" prop="telephone">
					<u-input class="input-radius" v-model="form.telephone" :border="true" v-if="type"/>
				</u-form-item>
				<u-form-item label="微信号" prop="wechat">
					<u-input class="input-radius" v-model="form.wechat" :border="true" v-if="type"/>
				</u-form-item>
				<u-form-item label="QQ号" prop="qq">
					<u-input class="input-radius" v-model="form.qq" :border="true" v-if="type"/>
				</u-form-item>
			</u-form>
		</view>
		<view style="text-align: center; padding: 15pt 30pt;">
			<u-button type="success" shape='circle' class="btn-orange" @click="toNext" v-if="type">保存</u-button>
			<u-button type="success" shape='circle' class="btn-orange" @click="loginOut" v-else>退出当前账号</u-button>
		</view>

	</view>
</template>

<script>
	import {mapGetters,mapActions} from 'vuex'
	import {requiredRule} from '@/common/rule.js'
	export default {
		data() {
			return {
				labelStyle:{'color':'#7F7F7F'},
				backTextStyle:{'color':'#ffffff'},
				action: '/user/image/BusinessImagedemo',
				headerObj:{Authorization:''},
				formDataObj:{phone:''},
				fileList: [],
				form: {
					name:'',
					telephone: '',
					wechat:'',
					qq:'',
					photo:'../../../static/driverSrc.png',
				},
				rules: {
					name:requiredRule,
					telephone:requiredRule,
					wechat:requiredRule,
					qq:requiredRule,
                },
				type:false,
				id:'',
				errorType:[
					'message'
				]
			}
		},
		onReady() {
		    this.$refs.uForm.setRules(this.rules);
		},
		onLoad(option) {
			let id = option.id;
			if(id){
				this.id = id;
			}
		},
		mounted() {
		  this.setPicToken()
		  this.getInfo()
		},

		computed:{
			...mapGetters(['token','telephone'])
		},
		methods: {
			...mapActions(['CurThemeType']),
			setPicToken(){
				this.headerObj.Authorization = this.token;
				this.formDataObj.phone = this.telephone;
			},
			getInfo(){
				if(this.id){
					this.$u.api.getCompanyAll({id:this.id}).then(res => {
						if(res.code === 0){
							let data = res.data;
							this.from.name = data.name;
							this.from.sex = data.sex;
						 } else{
							this.$u.toast(res.msg) 
						 }
					}).catch(res=>{this.$u.toast(res.msg)})
				}
			},
			confirm(){
				this.$u.route({url:'/pages/mycenter/mycenter',type:'switchTab'})
			},
			edit(){
				this.type = true;
			},
			toNext(){
				this.$refs.uForm.validate(valid=>{
					if(valid) {
						this.$u.api.CompanyAll(this.form).then(res => {
							if(res.code === 0){
								this.showTips =true;
							 } else{
								this.$u.toast(res.msg) 
							 }
						}).catch(res=>{this.$u.toast(res.msg)})
					} 
				})
			},
			loginOut(){
				uni.clearStorage();
				this.CurThemeType('driver')
				this.$u.route('/pages/login/login');
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

