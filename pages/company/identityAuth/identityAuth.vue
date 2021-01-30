<template>
	<view>
		<u-navbar back-text="返回"  back-icon-size="0" title="企业身份认证(1/3)" :back-text-style="backTextStyle" :background="backgroundCom" height='44' title-color="#FFFFFF"></u-navbar>
		<view class="top-content">
			<view class="top-content-base">公司信息补充</view>
			<view class="top-content-base" style="font-size: 12pt;">营业执照照片</view>
			<view class="top-content-upload">
				<view></view>
				<u-upload :custom-btn="true" ref="uUpload" :action="action" :before-upload="beforeUpload" @on-change ="hideLoadings"
				@on-success='uploadChange' upload-text="" :limitType="['png','jpg',]" @on-remove="removeFile"  :file-list="fileList" :max-size="4 * 1024 * 1024" 
				max-count="1" style="width: 100%;justify-content: center;" >
					<view slot="addBtn" class="slot-btn" hover-class="slot-btn__hover" hover-stay-time="150">
						<u-icon name="plus" size="60" :color="$u.color['lightColor']"></u-icon>
					</view>
				</u-upload>
			</view>
			<view class="top-content-uploadTips" style="padding:10pt 0 5pt;">1.必须为jpg格式,单张且不得超过4M</view>
			<view class="top-content-uploadTips">2.上传后自动或手动识别文字信息</view>
		</view>
		<view class="middle-content">
			<u-form :model="form" ref="uForm" label-width="260" :error-type="errorType" :border-bottom="false">
				<u-form-item label="公司名称" prop="companyName"><u-input v-model="form.companyName" :border="true" maxlength="100"/></u-form-item>
				<u-form-item label="社会统一信用代码" prop="socialCode"><u-input v-model="form.socialCode" :border="true" maxlength="100"/></u-form-item>
				<u-form-item label="成立日期" prop="companyCreateTime"><u-input v-model="form.companyCreateTime" :border="true" :disabled="true" @click="show = true" placeholder=""/><u-icon style=";position: absolute;right: 10rpx;" name="calendar" color="#6DD99B" size="40"></u-icon></u-form-item>
				<u-form-item label="注册资本" prop="registeredPrice"><u-input v-model="form.registeredPrice" :clearable="false" :border="true" maxlength="10"/>
				<text class="middle-content-label">万元</text></u-form-item>
				<u-form-item label="法人姓名" prop="legalPerson"><u-input v-model="form.legalPerson" :border="true" maxlength="30"/></u-form-item>
				<u-form-item label="所在地区" prop="area"><u-input v-model="form.area" :border="true" maxlength="180"/></u-form-item>
				<u-form-item label="经营所在地区" label-position="top">
					<SearchTags :list="listCity" :active="activeCityType" :singleType="true" @onClick="cityTypeListChange"></SearchTags>
				</u-form-item>
			</u-form>
			<view style="padding-top: 30pt;color:#E10000;">
				*以上信息提交过审后不可更改
			</view>
			<u-picker v-model="show" mode="time" :end-year="today.year" :params="params" @confirm="dataChange"></u-picker>
		</view>
		<view style="text-align: center; padding: 5pt 20pt;">
			<u-button type="success" shape='circle' class="btn-agree" @click="toNext">下一步</u-button>
		</view>
	</view>
</template>

<script>
	import {requiredRule} from '@/common/rule.js'
	import {actionJx} from '@/utils/constant.js'
	import SearchTags from '@/components/searchTags.vue'
	export default {
		components:{
			SearchTags
		},
		data() {
			return {
				labelStyle:{'color':'#7F7F7F'},
				backTextStyle:{'color':'#ffffff'},
				action: actionJx,
				headerObj:{Authorization:''},
				formDataObj:{phone:''},
				fileList: [],
				listCity:[
					{id: '0',text: '杭州'},{id: '1',text: '宁波'},{id: '2',text: '温州'},{id: '3',text: '金华'}
				],
				activeCityType:0,
				form: {
					companyName: '',
					socialCode: '',
					companyCreateTime: '',
					registeredPrice: '',
					legalPerson: '',
					area: '',
					businesscard:'',
					city:'杭州'
				},
				rules: {
					companyName:requiredRule,
					socialCode:requiredRule,
					companyCreateTime:requiredRule,
					registeredPrice:requiredRule,
					legalPerson:requiredRule,
					area:requiredRule,			
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
				errorType:[
					'message'
				],
				today:{}
			}
		},
		onReady() {
		    this.$refs.uForm.setRules(this.rules);
		},
		onLoad(option) {
			
			let comparyid = option.id;
			if(comparyid){
				this.comparyid = comparyid;
			}
		},
		mounted() {
			let today = uni.getStorageSync('today');
			if(today){
				this.today = today
			} else{
				this.initDate()
			}
			this.getInfo()
		},
		methods: {
			initDate(){
				let date = new Date();
				let year = date.getFullYear();
				let month = date.getMonth()+1;
				let day = date.getDate();
				let obj = {year:year,month:month,day:day};
				uni.setStorageSync('today',obj)
				this.today = obj;
			},
			cityTypeListChange(obj){
				this.form.city = obj.text;
				this.activeCityType = obj.index;
			},
			getInfo(){
				if(this.comparyid){
					this.$u.api.getCompanyAll({comparyid:this.comparyid}).then(res => {
						if(res.code === 200){
							let data = res.comparyAuthenticationVo;
							this.form.companyName = data.comparyname;
							this.form.businesscard = data.businesscard;
							this.form.socialCode = data.societyid;
							this.form.companyCreateTime = data.chuangjiantime;
							this.form.registeredPrice = data.registeredcapital;
							this.form.legalPerson = data.faname;
							this.form.area = data.area;
							if (data.city){
								this.form.city = data.city;
							}
							let obj = {
								comparylogophoto:data.comparylogophoto,
								companyEasyName: data.comparynickname,
								memberNumber:data.comparypeoplenum,
								carNum: data.comparycarnum,
								mainBusiness:data.mainbusiness,
								companyIntroduce:data.comparytext
							};
							let objF = {
								userid:data.userid,
								idcardphoto:data.idcardphoto,
								username: data.username,
								birthday: data.birthday,
								sex: data.sex,
								telephone:data.telephone,
								idcardid:data.idcardid,
								identifyCode:'',
								comparypeoplephoto:data.comparypeoplephoto
							};
							 uni.setStorageSync('companySecond', obj);
							 uni.setStorageSync('companyThree', objF);
							 if(data.comparylogophoto){
							 	let comparyLogo = [{url:data.comparylogophoto}]
							 	 uni.setStorageSync('comparyLogo', comparyLogo);
							 }
							 if(data.comparypeoplephoto){
							 	let peopleCard = [{url:data.comparypeoplephoto}]
							 	 uni.setStorageSync('peopleCard', peopleCard);
							 }
							 if(data.idcardphoto){
							 	let shengfenzheng = [{url:data.idcardphoto}]
							 	 uni.setStorageSync('shengfenzheng', shengfenzheng);
							 }
							 if(data.businesscard){
							 	this.fileList= [{url:data.businesscard}]
							 }
						  }
						}).catch(res=>{this.$u.toast(res.msg)})
				}
			},
			setStorage(data){
					 uni.setStorageSync('companyFirst', data);
			},
			removeFile(){
				this.fileList = [];
				this.form.businesscard = ''
			},
			setForm(){
				 let data = this.form;
				 if(data.businesscard === ''){
					 this.$u.toast('请上传营业执照图片')
					 return
				 }
				 this.setStorage(data)
				 this.$u.route("/pages/company/basicInfo/basicInfo")
			},
			toNext(){
				console.log(this.fileList)
				this.$refs.uForm.validate(valid=>{
					if(valid) {
						this.setForm()
					} else {
						
					}
				})
			},
			dataChange(obj){
				let companyDate = obj.year+"-"+obj.month+"-"+obj.day;
				this.form.companyCreateTime = companyDate;
			},
			beforeUpload(index, list) {
					uni.showLoading({
						title: '识别中'  
					});
			 },
			 hideLoadings(){
				 uni.hideLoading();
			 },
			uploadChange(res,index,lists,name){
				uni.hideLoading();
				if (res.code === 200){
					let data = res.data;
					uni.setStorageSync('xunfei',data)
					 this.form.companyName = data.biz_license_company_name;
					  this.form.socialCode = data.biz_license_credit_code;
					   this.form.companyCreateTime = data.biz_license_start_time;
					    this.form.registeredPrice = data.biz_license_reg_capital;
						 this.form.legalPerson = data.biz_license_owner_name;
						  this.form.area = data.biz_license_address;
						  this.form.businesscard  = data.imagename;
				}else if(res.code === 100){
					this.form.businesscard = res.data;
				} else {
					this.$u.toast(res.msg)
				}
			}
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
	  padding: 10pt 20pt;	
	  .middle-content-label{
		  position: absolute;right: 10px;
	  }
	}

	 .btn-agree{
		background: linear-gradient(55deg, $bg-grad-AB, $bg-grad-DDC);
	 }
</style>

