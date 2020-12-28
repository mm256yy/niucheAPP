<template>
	<view>
		<u-navbar back-text="返回"  back-icon-size="0" title="企业身份认证(3/3)" :back-text-style="backTextStyle" :background="backgroundCom" height='44' title-color="#FFFFFF"></u-navbar>
		<view class="top-content">
			<view class="top-content-base">企业联系人身份认证</view>
			<view class="top-content-base" style="font-size: 12pt;">身份证照片</view>
			<view class="top-content-upload">
				<u-upload :custom-btn="true" :action="action" @on-success='uploadChange1' upload-text="" :file-list="fileList"
				 :max-size="8 * 1024 * 1024" max-count="1" style="width: 100%;justify-content: center;" >
					<view slot="addBtn" class="slot-btn" hover-class="slot-btn__hover" hover-stay-time="150">
						<u-icon name="plus" size="60" :color="$u.color['lightColor']"></u-icon>
					</view>
				</u-upload>
			</view>
			<view class="top-content-uploadTips" style="padding:10pt 0 5pt;">1.必须为jpg格式,单张不得超过8M</view>
			<view class="top-content-uploadTips">2.上传后自动或手动识别文字信息</view>
		</view>
		<view class="middle-content">
			<u-form :model="form" ref="uForm" label-width="180" :border-bottom="false">
				<u-form-item label="姓名" prop="username"><u-input maxlength="10" v-model="form.username" :border="true"/></u-form-item>
				<u-form-item label="性别" prop="sex">
				<u-radio-group v-model="form.sex" :active-color="'#6DD99C'" style="text-align: right;">
					<u-radio name="0" style="margin-left: 10pt;">女</u-radio>
					<u-radio name="1" style="margin-left: 10pt;">男</u-radio>
				</u-radio-group>
				</u-form-item>
				<u-form-item label="出生日期" prop="birthday"><u-input v-model="form.birthday" :border="true" :disabled="true" @click="show = true" placeholder=""/><u-icon style=";position: absolute;right: 10rpx;" name="calendar" color="#6DD99B" size="40"></u-icon></u-form-item>
				<u-form-item label="身份证号" prop="idcardid"><u-input maxlength="18" v-model="form.idcardid" :border="true"/></u-form-item>
				<u-form-item label="手机号码" prop="telephone"><u-input type="number" maxlength="11" v-model="form.telephone" :border="true"/></u-form-item>
				<u-form-item label="输入验证码" prop="identifyCode"><u-input v-model="form.identifyCode" type="number" maxlength="4" :border="true" />
				<u-button type="success" size="mini " shape='circle' @click="getCode" style="position: absolute;right: 10rpx;">{{codeTips}}</u-button>
				</u-form-item>
			</u-form>
			<u-picker v-model="show" mode="time" :end-year="today.year" :params="params" @confirm="dataChange"></u-picker>
		</view>
		<view class="top-content">
			<view class="top-content-base">联系人工作认证</view>
			<view class="top-content-base">
			        <u-row>
						<u-col span="6">
							<view style="font-size: 12pt;">工作证明照片</view>
						</u-col>
<!-- 						<u-col span="6">
							<view style="font-size: 10pt;color: #0096FF;text-align: right;" @click="wenanTips = true">查看工作证明文案</view>
						</u-col> -->
					</u-row>
			</view>
			<view class="top-content-upload">
				<u-upload :custom-btn="true" :action="action" @on-success='uploadChange'
				 upload-text="" :file-list="fileList1" :max-size="8 * 1024 * 1024" max-count="1" style="width: 100%;justify-content: center;" >
					<view slot="addBtn" class="slot-btn" hover-class="slot-btn__hover" hover-stay-time="150">
						<u-icon name="plus" size="60" :color="$u.color['lightColor']"></u-icon>
					</view>
				</u-upload>
			</view>
			<view class="top-content-uploadTips" style="padding:10pt 0 5pt;">1.工牌，名片或书面证明</view>
			<view class="top-content-uploadTips" >2.必须为jpg格式,单张不得超过8M</view>
			
		</view>
		<u-verification-code seconds="60" ref="uCode" unique-key="page-a" @change="codeChange"></u-verification-code>
		<u-modal v-model="showTips" @confirm="confirm" confirm-text="我知道了">
				<view class="slot-content" style="padding: 10pt;font-size: 10pt;">
					您的信息已提交审核
				</view>
		</u-modal>
		<view style="text-align: center; padding: 12pt 20pt;">
			<u-button type="success" shape='circle' class="btn-agree" @click="toNext">提交审核</u-button>
		</view>
		<u-modal v-model="wenanTips" @confirm="wenanTips = false" title="" confirm-text="我知道了">
				<view class="slot-content" style="padding: 10pt;font-size: 10pt;">
					<view>兹证明_______是我公司员工(身份证号码_______________)，在______部门任________职务，已有_______年。</view>
					特此证明。
					<view>单位名称(盖章)：____________________</view>
					<view style="text-align: right;">日期：______年___月___日</view>
				</view>
		</u-modal>

	</view>
</template>

<script>
	import {phoneRule,codeRule,passwordRule,requiredRule,IDNumberRule} from '@/common/rule.js'
	import {action} from '@/utils/constant.js'
	export default {
		data() {
			return {
				wenanTips:false,
				labelStyle:{
					'color':'#7F7F7F'
				},
				backTextStyle:{
					'color':'#ffffff'
				},
				action: action,
				headerObj:{Authorization:''},
				formDataObj:{phone:''},
				fileList: [],
				fileList1:[],
				form: {
					idcardphoto:'',
					username: '',
					birthday: '',
					sex: '',
					telephone:'',
					idcardid:'',
					identifyCode:'',
					comparypeoplephoto:''
				},
				rules:{
					username: requiredRule,
					birthday: requiredRule,
					sex: requiredRule,
					telephone:phoneRule,
					idcardid:IDNumberRule,
					identifyCode:requiredRule	
				},
				show: false,
				params: {
					year: true,
					month: true,
					day: true,
					hour: false,
					minute: false,
					second: false
				},
				comparyid:'',
				codeTips: '',
				showTips:false,
				companyFirst:{},
				companySecond:{},
				companyThree:{},
				peopleCard:'',
				shengfenzheng:'',
				today:{},
			}
		},
		onReady() {
		    this.$refs.uForm.setRules(this.rules);
		},
	  mounted() {
			let today = uni.getStorageSync('today');
			if(today){
				this.today = today
			} else{
				this.initDate()
			}
			this.initStorage()
		},
		methods: {
			initDate(){
				let date = new Date();
				let year = date.getFullYear();
				let month = date.getMonth()+1;
				let day = date.getDate();
				let obj = {year:year,month:month,day:day};
				uni.setStorage('today',obj)
				this.today = obj;
			},
			initStorage(){
				    this.companyFirst = uni.getStorageSync('companyFirst');
					this.companySecond = uni.getStorageSync('companySecond');
					this.companyThree = uni.getStorageSync('companyThree');
					this.peopleCard = uni.getStorageSync('peopleCard');
					this.shengfenzheng = uni.getStorageSync('shengfenzheng');
					this.today = uni.getStorageSync('today')
					if (this.companyThree){
						this.form = this.companyThree;
					}
					if (this.shengfenzheng){
						this.fileList = []
						this.fileList = [{url:this.shengfenzheng[0].url}];
					}
					if (this.peopleCard){
						this.fileList1 = []
						this.fileList1 =[{url:this.peopleCard[0].url}]
					}
			},
			setStorage(data){
					 uni.setStorageSync('companySecond', data);
			},
			dataChange(obj){
				let birthday = obj.year+"-"+obj.month+"-"+obj.day;
				this.form.birthday = birthday;
			},
			// 获取验证码
			getCode() {
				if(this.$refs.uCode.canGetCode) {
					if(this.form.telephone === ''){
						this.$u.toast('请输入手机号码');
						return
					}
					this.$u.api.getIdentifyCode({phone:this.form.telephone,codeType:'authCode'}).then(res=>{			
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
			setPicToken(){
				this.headerObj.Authorization = this.token;
				this.formDataObj.phone = this.telephone;

			},
			uploadChange(res,index,lists,name){
               if(res.code === 200) {
				   this.form.comparypeoplephoto = res.object;
			   }
			},
			uploadChange1(res,index,lists,name){
               if(res.code === 200) {
				   this.form.idcardphoto = res.object;
			   }
			},
			toNext(){
				this.$refs.uForm.validate(valid=>{
					if(valid) {
						 this.saveSubmit()	
					} 
				})
			},
			saveSubmit(){
				let obj = {businesscard:'',comparyname:'',societyid:'',chuangjiantime:'',registeredcapital:'',faname:'',area:'',
				comparylogophoto:'',comparynickname:'',comparypeoplenum:'',comparycarnum:'',mainbusiness:'',userid:'',
				comparytext:'',idcardphoto:'',username:'',sex:'',birthday:'',idcardid:'',telephone:'',comparypeoplephoto:'',identifyCode:''};
				obj.businesscard = this.companyFirst.businesscard;//营业执照
				obj.comparyname = this.companyFirst.companyName;//公司名称
				obj.chuangjiantime = this.companyFirst.companyCreateTime;//成立日期
				obj.societyid = this.companyFirst.socialCode;//社会统一信用代码
				obj.registeredcapital = this.companyFirst.registeredPrice;//注册资本
				obj.faname = this.companyFirst.legalPerson;//法人姓名
				obj.area = this.companyFirst.area;//地区
				if (!this.companySecond){
					this.companySecond = uni.getStorageSync('companySecond')
				}
				obj.comparylogophoto = this.companySecond.comparylogophoto;//公司logo
				obj.comparynickname = this.companySecond.companyEasyName;//公司简称
				obj.comparypeoplenum = this.companySecond.memberNumber;//公司成员
				obj.comparycarnum = this.companySecond.carNum;//经营车辆
				obj.mainbusiness = this.companySecond.mainBusiness;//主营业务
				obj.comparytext = this.companySecond.companyIntroduce;//公司介绍
				obj.idcardphoto = this.form.idcardphoto; //身份证照片
				obj.comparypeoplephoto = this.form.comparypeoplephoto; //联系人照片
				obj.username = this.form.username; //姓名
				obj.sex = this.form.sex;//性别
				obj.birthday = this.form.birthday; //出生日期
				obj.idcardid = this.form.idcardid;//身份证号
			    obj.telephone = this.form.telephone;//手机号
				obj.identifyCode = this.form.identifyCode;
                 
				if (this.form.userid){
					//修改
					obj.userid = this.form.userid;
					this.$u.api.saveAuthAll(obj).then(res => {
							if(res.code === '200'){
								uni.setStorageSync('isauthencation',1)
					            this.showTips = true
							}else{
								  this.$u.toast(res.msg);
							}
						}).catch(res=>{
							  this.$u.toast(res.msg);
						})
				} else {
					//新增
					obj.userid = this.telephone;
					let xunfei = uni.getStorageSync('xunfei');
					if(xunfei){
						obj.xunFei = xunfei;
					}
					this.$u.api.saveAuth(obj).then(res => {
							if(res.code === '200'){
					            this.showTips = true
							}else{
								this.$u.toast(res.msg);
							}
						}).catch(res=>{
							  this.$u.toast(res.msg);
						})
				}
			},
			confirm(){
				uni.removeStorageSync('companyFirst');
				uni.removeStorageSync('companySecond');
				uni.removeStorageSync('companyThree');
				uni.removeStorageSync('peopleCard');
				uni.removeStorageSync('shengfenzheng');
				uni.removeStorageSync('comparyLogo');
				this.$u.route({url:'/pages/mycenter/mycenter',type:'switchTab'})
			},
		}
	}
</script>

<style lang="scss" scoped>
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
		.top-content-uploadTips{
			font-size: 10pt;
			color: #000000;
		}
	}
	.middle-content{
	  padding: 10pt 20pt;	
	  .middle-content-label{
		  position: absolute;bottom: 10px;right: 10px;
	  }
	}
	 .btnFcd{
		background: linear-gradient(55deg, $bg-grad-AB, $bg-grad-DDC);
	 }
</style>

