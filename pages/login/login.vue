<template>
	<view :class="curThemeType ==='driver'?'driver-content':'company-content'">
        <u-navbar back-text="返回" back-icon-size="0" title="登录/注册" :background="curThemeType ==='driver'?backgroundDri:backgroundCom" :back-text-style="backTextStyle" height='44' title-color="#FFFFFF"></u-navbar>
		
		<view class="" v-show="current === 0">
			<view class="" style="display: flex;justify-content: center;margin-top: 36px;padding-bottom: 40pt;">
				<u-avatar :src="curThemeType ==='driver'?driverSrc:comnpanySrc" size="180"></u-avatar>
			</view>
			<view class="" style="padding: 5pt 25pt">
				<u-form :model="form" :label-style="labelStyle" :error-type="errorType" ref='uForm'>
					<u-form-item label="" prop="telephone" label-width='0' style="border-bottom: 1px solid #f6f6f6;">
						<u-input v-model="form.telephone" type="number" placeholder="请输入手机号" placeholder-style="color:'#7F7F7F'"/>
					</u-form-item>
					<u-form-item label="" prop="code" label-width='0' style="border-bottom: 1px solid #f6f6f6;">
						<u-input v-model="form.code" type="number" placeholder="请输入验证码" maxlength="4" placeholder-style="color:'#7F7F7F'"/>
						<u-button type="curThemeType ==='driver'?warning:success" size="mini " shape='circle' @click="getCode" class="btnFcd">{{codeTips}}</u-button>
					</u-form-item>
					<u-form-item label="登录身份" prop="role" label-width='90pt'>
						<u-radio-group v-model="form.role" :active-color="curThemeType ==='driver'?'#FF9F31':'#6DD99C'"  style="text-align: right;">
							<u-radio name="1" style="margin-left: 10pt;">司机</u-radio>
							<u-radio name="2" style="margin-left: 10pt;">公司</u-radio>
						</u-radio-group>
					</u-form-item>
				</u-form>
				<view style="padding-top: 20pt;">
					<u-checkbox-group :active-color="curThemeType ==='driver'?'#FF9F31':'#6DD99C'" shape="circle">
						<u-checkbox v-model="xytype" shape="circle"></u-checkbox>
						<view class="u-line-2" style="font-size: 8pt;width: 88%;margin-left: -7px;">
							注册或登录后，即您已同意
							<text :class="curThemeType ==='driver'?'driLink':'comLink'" @click="toYs">《隐私政策》</text>及
							<text :class="curThemeType ==='driver'?'driLink':'comLink'" @click="toXy">《用户协议》</text>内容
						</view>
					</u-checkbox-group>
				</view>
				<view style="margin-top: 90pt;text-align: center;">
					<u-button type="curThemeType ==='driver'?warning:success" shape='circle' class="btnFcd" @click="login('uForm')">登录</u-button>
				</view>
				<view style="font-size: 8pt;color: #7F7F7F;margin-top: 30pt;">
					   1、请注意，同一个手机号只能注册一个账号（个人或公司）。
					若您除了公事之外还有私事的使用需求，请更换手机号后再注册个人账号。
				</view>
				<view style="font-size: 8pt;color: #7F7F7F;margin-top: 10pt;">
					2、注册或登录后，即您已同意《隐私政策》及《用户协议》内容。
				</view>
			</view>
		</view>
		<view :class="curThemeType ==='driver'?'driver-content':'company-content'" v-show="current === 1">
			<view class="" style="display: flex;justify-content: center;margin-top: -36px;padding-bottom: 40pt;">
				<u-avatar :src="curThemeType ==='driver'?driverSrc:comnpanySrc" size="150"></u-avatar>
			</view>
			<view class="" style="padding: 5pt 25pt">
				<u-form :model="formPwd" :label-style="labelStyle1" ref="uFormPwd" :error-type="errorType" label-width='50pt'>
					<u-form-item label="手机号" prop="telephone" >
						<u-input v-model="formPwd.telephone" type="number" placeholder="" border style="border-radius: 18px;"/>
<!-- 						<u-button type="curThemeType ==='driver'?warning:success" size="mini" shape='circle' class="btnFcd" @click="getPhoneNumber('companyNumChange')" style="position: absolute;right: 10rpx;">{{companyNumText}}</u-button> -->
					</u-form-item>
					<u-form-item label="密码" prop="code">
						<u-input v-model="formPwd.code" type="password" maxlength="18" placeholder="" border style="border-radius: 18px;"/>
					</u-form-item>
					<u-form-item label="登录身份" prop="role" label-width='90pt'>
						<u-radio-group v-model="formPwd.role" :active-color="curThemeType ==='driver'?'#FF9F31':'#6DD99C'" style="text-align: right;">
							<u-radio name="1" style="margin-left: 10pt;">司机</u-radio>
							<u-radio name="2" style="margin-left: 10pt;">公司</u-radio>
						</u-radio-group>
					</u-form-item>
				</u-form>
				<u-verification-code seconds="60" ref="uCode" unique-key="page-a" @change="codeChange"></u-verification-code>
				<u-verification-code seconds="60" ref="dirverCodeChange" unique-key="page-b" :start-text='driverNumText' @change="dirverCodeChange"></u-verification-code>
				<u-verification-code seconds="60" ref="companyNumChange" unique-key="page-b" :start-text='companyNumText' @change="companyNumChange"></u-verification-code>
				<view style="padding-top: 20pt;" class="u-line-3">
					<u-checkbox-group :active-color="curThemeType ==='driver'?'#FF9F31':'#6DD99C'" shape="circle" >
						<u-checkbox v-model="xytype" shape="circle"></u-checkbox>
						<view class="u-line-2" style="font-size: 8pt;width: 86%;">注册或登录后，您即已同意<text :class="curThemeType ==='driver'?'driLink':'comLink'" @click="toXy">《注册协议》</text>内容
						</view>
					</u-checkbox-group>
				</view>
				<view style="margin-top: 100pt;text-align: center;">
					<u-button type="curThemeType ==='driver'?warning:success" shape='circle' class="btnFcd" @click="login('uFormPwd')">登录</u-button>
				</view>
				<view style="font-size: 8pt;color: #7F7F7F;margin-top: 30pt;">
					   1、请注意，同一个手机号只能注册一个账号（个人或公司）。
					若您除了公事之外还有私事的使用需求，请更换手机号后再注册个人账号。
				</view>
				<view style="font-size: 8pt;color: #7F7F7F;margin-top: 10pt;">
					2、注册或登录后，您即已同意《注册协议》内容。
				</view>
			 </view>
		</view>
	</view>
</template>

<script>
	import {phoneRule,codeRule,passwordRule} from '@/common/rule.js'
	export default {
		data() {
			return {
				comnpanySrc: '../../static/touxx.png',
				driverSrc: '../../static/driverSrc.png',
				backTextStyle:{
					'color':'#ffffff'
				},
				labelStyle:{
					'color':'#7F7F7F'
				},
				labelStyle1:{
					'color':'#000000'
				},
				driverNumText:'一键获取本机号码',
				driverNumTextDis:false,
				companyNumText:'一键获取本机号码',
				companyNumTextDis:false,
				current:0,
				list: [{name: '验证码登录'}],
				form:{
					telephone:'',
					code:'',
					role:1
				},
				formPwd:{
					telephone:'',
					code:'',
					role:1
				},
				codeTips: '',
				rules:{
					telephone:phoneRule,
					code:codeRule,
				},
				rules1:{
					telephone:phoneRule,
					code:passwordRule,
				},
				errorType:[
					'toast'
				],
				xytype:false
			}
		},
		onReady() {
		    this.$refs.uForm.setRules(this.rules);
			this.$refs.uFormPwd.setRules(this.rules1);
		},
		mounted() {
			let token = uni.getStorageSync('token')
			let phone = uni.getStorageSync('telephone')
			let role = uni.getStorageSync('role')
			if (phone){
				this.form.telephone = phone;
				this.formPwd.telephone = phone;
			}
			if (role){
				this.form.role = role;
				this.formPwd.role = role;
			}
			if (token){
				this.$u.route({url:'/pages/mycenter/mycenter',type:'switchTab'})
			}
		},
		methods: {
			setStorage(userInfo){
				    let Authorization ='Bearer '+ userInfo.token;
					uni.setStorageSync('telephone', userInfo.telephone);
					uni.setStorageSync('token', Authorization);
					uni.setStorageSync('role', Number(userInfo.role));
					uni.setStorageSync('isauthencation',Number(userInfo.isauthencation))
			},
			change(index) {
				this.current = index;
			},
			//获取手机号
			getPhoneNumber(ref){
				if(this.$refs[ref].canGetCode) {
					this.$u.api.getTelephone().then(res=>{			
						 if (res.code === 1){
							 if(ref === 'dirverCodeChange'){
								 this.form.telephone = res.text;
							 } else {
								this.formPwd.telephone = res.text; 
							 }
							// uni.showLoading({title: '正在获取手机号'})
							  setTimeout(() => {
								uni.hideLoading();
								this.$refs[ref].start();
							  }, 2000);
							} else {
								this.$u.toast(res.msg);
							} 
						}).catch(res=>{
					      this.$u.toast(res.msg);
					  })
					} else {
					 this.$u.toast('倒计时结束后再发送');
				  }
			},
			// 获取验证码
			getCode() {
				if(this.$refs.uCode.canGetCode) {
					this.$u.api.getIdentifyCode({phone:this.form.telephone,codeType:'verificationCode'}).then(res=>{			
						 if (res.code === 200){
							uni.showLoading({
								title: '正在获取验证码'
							})
							 setTimeout(() => {
								uni.hideLoading();
								this.$u.toast('验证码已发送');
								this.$refs.uCode.start();
							 }, 2000);
							} else {
								this.$u.toast(res.msg);
							} 
						}).catch(res=>{
					      this.$u.toast(res.msg);
					  })
					} else {
					 this.$u.toast('倒计时结束后再发送');
				  }
			},
			codeChange(text) {
				this.codeTips = text;
			},
			dirverCodeChange(text) {
				this.driverNumText = text;
			},
			companyNumChange(text) {
				this.companyNumText = text;
			},
			toXy(){
				this.$u.route('/pages/company/registrationAgreement/registrationAgreement')
			},
			toYs(){
				this.$u.route('/pages/driver/agreement/agreement')
			},
			login(ref){
				this.$refs[ref].validate(valid=>{
					if(valid) {
						if(!this.xytype){
							this.$u.toast('请勾选用户协议');
							return false
						}
						let obj = this.form;
						if(ref === 'uFormPwd') {
                          obj = this.formPwd;
						} 
						this.$u.api.loginSubmit(obj).then(res => {
								if(res.code === '1') {
									let userInfo = obj;
									userInfo.token = res.token;
									userInfo.isauthencation = res.isauthencation
									this.setStorage(userInfo)
								
									if(res.userrole === 1){//司机
									    uni.setStorageSync('curThemeType', 'driver');
										
										// if(res.userstate === '0'){
										// 	this.$u.route({url:'/pages/mycenter/mycenter',type:'switchTab'})
										// } else {
											this.$u.route({url:'/pages/init/init',type:'switchTab'})
										// }
									} else {
										 uni.setStorageSync('curThemeType', 'company');
										// if(res.userstate ==='0'){
										// 	this.$u.route({url:'/pages/mycenter/mycenter',type:'switchTab'})
										// } else {
											this.$u.route({url:'/pages/init/init',type:'switchTab'})
										// }
									}
								}else {
									 this.$u.toast(res.msg);
								}
							}).catch(res=>{
								 this.$u.toast(res.msg);
							})} 
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
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
	.driver-content{
		.u-tabs{
			padding-top: 20px;
			background: linear-gradient(115deg,$bg-grad-FE, $bg-grad-FCD);
		}
		.btnFcd{
		  background: linear-gradient(-35deg, $bg-grad-FE, $bg-grad-FCD);
		}
	}
	.company-content{
		.u-tabs{
			padding-top: 20px;
			background: linear-gradient(115deg, $bg-grad-AB, $bg-grad-DDC);
		}
		.btnFcd{
		  background: linear-gradient(-35deg, $bg-grad-AB, $bg-grad-DDC);
		}
	}
	.btnFcd{
		border:none;
		color: #fff;
	}
	.swiper-item {
		height: 100%;
	}
	.driLink{
		color:#FF9F31
	}
	.comLink{
		color:#6DD99C
	}
</style>
