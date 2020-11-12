<template>
	<view>
		<u-navbar back-text="返回"  back-icon-size="0" title="公司基本信息(2/3)" :background="backgroundCom" :back-text-style="backTextStyle" height='44' title-color="#FFFFFF"></u-navbar>
		<view class="top-content">
			<view class="top-content-base">公司信息补充</view>
			<view class="top-content-base" >公司logo或经营场所照片</view>
			<view class="top-content-upload">
				<view></view>
				<u-upload :custom-btn="true" :action="action" :header="headerObj" :form-data="formDataObj" @on-success="uploadChange" upload-text="" :file-list="fileList" :max-size="4 * 1024 * 1024" max-count="6" style="width: 100%;justify-content: center;" >
					<view slot="addBtn" class="slot-btn" hover-class="slot-btn__hover" hover-stay-time="150">
						<u-icon name="plus" size="60" :color="$u.color['lightColor']"></u-icon>
					</view>
				</u-upload>
			</view>
			<view class="top-content-uploadTips" style="padding:10pt 0 5pt;">1.必须为jpg格式,单张不得超过4M</view>
			<view class="top-content-uploadTips">2.上传后自动或手动识别文字信息</view>
		</view>
		<view class="middle-content">
			<u-form :model="form" ref="uForm" label-width="150" :border-bottom="false">
				<u-form-item label="公司简称" prop="companyEasyName"><u-input v-model="form.companyEasyName" :border="true"/></u-form-item>
				<u-form-item label="公司成员" prop="memberNumber"><u-input maxlength='7' :clearable='false' type="number"
				 v-model="form.memberNumber" :border="true"/><text class="middle-content-label">人</text></u-form-item>
				<u-form-item label="经营车辆" prop="carNum"><u-input maxlength="8" :clearable='false' type="number"
				 v-model="form.carNum" :border="true"/><text class="middle-content-label">辆</text></u-form-item>
				<u-form-item label="主营业务" prop="mainBusiness" label-position="top">
					<u-checkbox-group active-color="#6DD99C" width="33%"  @change="radioGroupChange" shape="circle">
						<u-checkbox v-model="item.checked" v-for="(item, index) in checkboxList" :key="index" :name="item.name">
							{{ item.name }}
						</u-checkbox>
					</u-checkbox-group>
					<text style="position: absolute;top: 8pt;left: 50pt;font-size: 10pt;color: #7E7E7E;">（必选一项）</text>
				</u-form-item>
				<u-form-item label="公司介绍" label-position="top" prop="companyIntroduce">
					<u-input v-model="form.companyIntroduce" type="textarea" :border="true" :height="150" :auto-height="true" />
			    </u-form-item>		
			</u-form>
		</view>
		<view style="text-align: center; padding: 5pt 20pt;">
			<u-button type="success" shape='circle' class="btn-agree" @click="toNext">下一步</u-button>
		</view>
	</view>
</template>

<script>
	import {requiredRule,ruleMainBusiness} from '@/common/rule.js'
	import {action} from '@/utils/constant.js'
	export default {
		data() {
			return {

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
				rules: {
					companyEasyName: requiredRule,
					memberNumber: requiredRule,
					carNum: requiredRule,
					mainBusiness:ruleMainBusiness,
					companyIntroduce:requiredRule
				},
				form: {
					companyEasyName: '',
					memberNumber: '',
					carNum: '',
					mainBusiness:[],
					companyIntroduce:'',
					comparylogophoto:'',
				},
				comparyid:'',
				checkboxList: [
					{name: '网约车',checked: false,disabled: false},{name: '出租车',checked: false,disabled: false},
					{name: '长短组',checked: false,disabled: false},
					{name: '汽车生产',checked: false,disabled: false},{name: '车辆销售',checked: false,disabled: false},
					{name: '维修与保养',checked: false,disabled: false},
					{name: '汽车金融',checked: false,disabled: false},{name: '汽车保险',checked: false,disabled: false},
					{name: '装修与美容',checked: false,disabled: false},
					{name: '其他',checked: false,disabled: false}
					],
				companySecond:{},
				comparyLogo:''
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
			this.initStorage()
			this.getInfo()
		},
	methods: {
		initStorage(){
				this.companySecond = uni.getStorageSync('companySecond');
				this.comparyLogo = uni.getStorageSync('comparyLogo');
				if (this.companySecond){
						this.form = this.companySecond;
				}
				if (this.comparyLogo.length>0){
					this.fileList.push(this.comparyLogo[0])
				}
		},
		setStorage(data){
				 uni.setStorageSync('companySecond', data);
		},
		getInfo(){
			if(this.comparyid){
				this.$u.api.getCompanyAll({comparyid:this.comparyid}).then(res => {
					if(res.code === 200){
						let data = res.usercomparypeople;
					 }else {
						 this.$u.toast(res.msg)
					 }
					}).catch(res=>{this.$u.toast(res.msg)})
			}
		},
		setForm(){
			let data = this.form;
			this.setStorage(data)
			this.$u.route("/pages/company/personAuth/personAuth")
		},
		radioGroupChange(e) {
			this.form.mainBusiness = e;
		},
		uploadChange(res,index,lists,name){
		   if(res.code === 200) {
			   this.form.comparylogophoto = res.text;
		   }
		},
		toNext(){
			this.$refs.uForm.validate(valid=>{
				if(valid) {
					this.setForm()
				} 
			})
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
