<template>
	<view :class="curThemeType ==='driver'?'driver-content':'company-content'">
        <u-navbar back-text="返回" back-icon-size="0" title="登录/注册" :background="curThemeType ==='driver'?backgroundDri:backgroundCom" :back-text-style="backTextStyle" height='44' title-color="#FFFFFF">
         	<view class="navbar-right" slot="right">
         		<view class="message-box right-item">
					<text>跳过</text>
         		</view>
         	</view>
         </u-navbar>
		 
		<view class="u-tabs-box" >
		    <u-tabs :list="list" :is-scroll="false" bg-color='c' bar-height='0' active-color="#ffffff" inactive-color="#e5e5e5" :current="current" @change="change"></u-tabs>
		  </view>
		<view class="" v-show="current === 0">
			<view class="" style="display: flex;justify-content: center;margin-top: -36px;padding-bottom: 40pt;">
				<u-avatar :src="curThemeType ==='driver'?driverSrc:comnpanySrc" size="150"></u-avatar>
			</view>
			<view class="" style="padding: 5pt 30pt">
				<u-form :model="form" :label-style="labelStyle" :error-type="errorType" ref='uForm'>
					<u-form-item label="" prop="telephone" label-width='0' style="border-bottom: 1px solid #f6f6f6;">
						<u-input v-model="form.telephone" placeholder="请输入手机号" placeholder-style="color:'#7F7F7F'"/>
						<u-button type="curThemeType ==='driver'?warning:success" size="mini" shape='circle' class="btnFcd" @click="getPhoneNumber('dirverCodeChange')">{{driverNumText}}</u-button>
					</u-form-item>
					<u-form-item label="" prop="code" label-width='0' style="border-bottom: 1px solid #f6f6f6;">
						<u-input v-model="form.code" placeholder="请输入验证码" placeholder-style="color:'#7F7F7F'"/>
						<u-button type="curThemeType ==='driver'?warning:success" size="mini " shape='circle' @click="getCode" class="btnFcd">{{codeTips}}</u-button>
					</u-form-item>
					<u-form-item label="登录身份" prop="role" label-width='100pt'>
						<u-radio-group v-model="form.role" :active-color="curThemeType ==='driver'?'#FF9F31':'#6DD99C'"  style="text-align: right;">
							<u-radio name="1" style="margin-left: 10pt;">司机</u-radio>
							<u-radio name="2" style="margin-left: 10pt;">公司</u-radio>
						</u-radio-group>
					</u-form-item>
				</u-form>
				<view style="margin-top: 100pt;text-align: center;">
					<u-button type="curThemeType ==='driver'?warning:success" shape='circle' class="btnFcd" @click="login('uForm')">登录</u-button>
				</view>
			</view>
		</view>
		<view :class="curThemeType ==='driver'?'driver-content':'company-content'" v-show="current === 1">
			<view class="" style="display: flex;justify-content: center;margin-top: -36px;padding-bottom: 40pt;">
				<u-avatar :src="curThemeType ==='driver'?driverSrc:comnpanySrc" size="150"></u-avatar>
			</view>
			<view class="" style="padding: 5pt 30pt">
				<u-form :model="formPwd" :label-style="labelStyle1" ref="uFormPwd" :error-type="errorType" label-width='50pt'>
					<u-form-item label="手机号" prop="telephone" >
						<u-input v-model="formPwd.telephone" placeholder="" border style="border-radius: 18px;"/>
						<u-button type="curThemeType ==='driver'?warning:success" size="mini" shape='circle' class="btnFcd" @click="getPhoneNumber('companyNumChange')" style="position: absolute;right: 10rpx;">{{companyNumText}}</u-button>
					</u-form-item>
					<u-form-item label="密码" prop="password">
						<u-input v-model="formPwd.password" placeholder="" border style="border-radius: 18px;"/>
					</u-form-item>
					<u-form-item label="登录身份" prop="role" label-width='100pt'>
						<u-radio-group v-model="formPwd.role" :active-color="curThemeType ==='driver'?'#FF9F31':'#6DD99C'" style="text-align: right;">
							<u-radio name="1" style="margin-left: 10pt;">司机</u-radio>
							<u-radio name="2" style="margin-left: 10pt;">公司</u-radio>
						</u-radio-group>
					</u-form-item>
				</u-form>
				<u-verification-code seconds="60" ref="uCode" unique-key="page-a" @change="codeChange"></u-verification-code>
				<u-verification-code seconds="60" ref="dirverCodeChange" unique-key="page-b" :start-text='driverNumText' @change="dirverCodeChange"></u-verification-code>
				<u-verification-code seconds="60" ref="companyNumChange" unique-key="page-b" :start-text='companyNumText' @change="companyNumChange"></u-verification-code>
				<view style="margin-top: 100pt;text-align: center;">
					<u-button type="curThemeType ==='driver'?warning:success" shape='circle' class="btnFcd" @click="login('uFormPwd')">登录</u-button>
				</view>
				<view style="font-size: 10pt;color: #7F7F7F;margin-top: 30pt;">
					   1、请注意，同一个手机号只能注册一个账号（个人或公司）。
					若您除了公事之外还有私事的使用需求，请更换手机号后再注册个人账号。
				</view>
				<view style="font-size: 10pt;color: #7F7F7F;margin-top: 10pt;">
					2、注册或登录后，您即已同意《注册协议》内容。
				</view>
			 </view>
		</view>
	</view>
</template>

<script>
	import {phoneRule,codeRule,passwordRule} from '@/common/rule.js'
	import {mapGetters,mapActions} from 'vuex'
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
				list: [{name: '验证码登录'},
					   {name: '密码登录'}],
				form:{
					telephone:'',
					code:'',
					role:1
				},
				formPwd:{
					telephone:'',
					password:'',
					role:1
				},
				codeTips: '',
				rules:{
					telephone:phoneRule,
					password:passwordRule,
					code:codeRule,
				},
				uuid:'',
				captcha_codes:'',
				errorType:[
					'toast'
				]
			}
		},
		onReady() {
		    this.$refs.uForm.setRules(this.rules);
			this.$refs.uFormPwd.setRules(this.rules);
		},
		mounted() {
			this.getUid()
		},
		methods: {
			...mapActions([
				'Login','UUid'
			]),
			change(index) {
				this.current = index;
			},
			getUid(){
			 this.$u.api.GetUUID().then(res => {
				if(res.code === 200){
					this.captcha_codes = res.captcha_codes;
					this.uuid = res.uuid;
					this.UUid(res.uuid)
				 }
				}).catch(res=>{
					console.log(res)
				})
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
					this.$u.api.getIdentifyCode({phone:this.form.telephone}).then(res=>{			
						 if (res.code === 1){
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
			login(ref){
				this.$refs[ref].validate(valid=>{
					if(valid) {
						let obj = {
							telephone:'',
							code:'',
							role:'',
							uuid:'',
							captcha_codes:''
						}
						if(ref === 'uForm') {
                             obj = this.form;
							 obj.uuid = this.uuid;
							 obj.captcha_codes = this.captcha_codes;
						} else{
							obj.telephone = this.formPwd.telephone;
							obj.code = this.formPwd.Password;
							obj.role = this.formPwd.role;
							obj.uuid = this.uuid;
							obj.captcha_codes = this.captcha_codes;
						}
						this.$u.api.loginSubmit(obj).then(res => {
								if(res.code === '1') {
									let userInfo = obj;
									userInfo.token = res.token;
									this.Login(userInfo)
									// this.$u.route({url:'/pages/index/index',type:'switchTab'})
									// this.$u.route('/pages/company/registrationAgreement/registrationAgreement')
									this.$u.api.geList().then(res=>{
										console.log(res)
									})
								}
							}).catch(res=>{
								console.log(res)
							})
					} else {
						
					}
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
</style>
