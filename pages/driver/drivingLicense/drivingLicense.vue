<template>
	<view>
		<u-navbar back-text="返回"  back-icon-size="0" title="驾照上传" :back-text-style="backTextStyle" :background="backgroundDri"
		 title-color="#FFFFFF"></u-navbar>
		<view class="top-content">
			<view class="top-content-base">驾照认证</view>
			<view class="top-content-base" style="font-size: 12pt;">驾驶证正本照片</view>
			<view class="top-content-upload">
				<view></view>
				<u-upload :custom-btn="true" :action="action" :header="headerObj" :form-data="formDataObj" 
				@on-success='uploadChange' upload-text="" :file-list="fileList" :max-size="4 * 1024 * 1024"
				 max-count="2" style="width: 100%;justify-content: center;">
					<view slot="addBtn" class="slot-btn" hover-class="slot-btn__hover" hover-stay-time="150">
						<u-icon name="plus" size="60" :color="$u.color['lightColor']"></u-icon>
					</view>
				</u-upload>
			</view>
			<view class="top-content-uploadTips" style="padding:10pt 0 5pt;">1.必须为jpg格式,单张不得超过4M</view>
			<view class="top-content-uploadTips">2.上传后自动或手动识别文字信息</view>
		</view>
		<view class="middle-content">
			<u-form :model="form" ref="uForm" label-width="260" :error-type="errorType" :border-bottom="false">
				<u-form-item label="姓名" prop="username"><u-input v-model="form.username" :border="true"/></u-form-item>
				<u-form-item label="驾驶证号" prop="username"><u-input v-model="form.username" :border="true"/></u-form-item>
				<u-form-item label="性别" prop="username">
				<u-radio-group v-model="form.sex" :active-color="'#6DD99C'" style="text-align: right;">
					<u-radio name="0" style="margin-left: 10pt;">女</u-radio>
					<u-radio name="1" style="margin-left: 10pt;">男</u-radio>
				</u-radio-group>
				</u-form-item>
				<u-form-item label="初次领证" prop="username">
					<u-input v-model="form.username" :border="true" :disabled="true" @click="showPicker()" placeholder=""/>
				    <u-icon style=";position: absolute;right: 10rpx;" name="calendar" color="#FFA032" size="40"></u-icon>
				</u-form-item>
				<u-form-item label="有效起始时间" prop="username">
					<u-input v-model="form.username" :border="true" :disabled="true" @click="showPicker()" placeholder=""/>
					<u-icon style=";position: absolute;right: 10rpx;" name="calendar" color="#FFA032" size="40"></u-icon>
				</u-form-item>
				<u-form-item label="有效截止时间" prop="username">
					<u-input v-model="form.username" :border="true" :disabled="true" @click="showPicker()" placeholder=""/>
					<u-icon style=";position: absolute;right: 10rpx;" name="calendar" color="#FFA032" size="40"></u-icon>
				</u-form-item>
				<u-form-item label="车龄" label-position="top">
					<u-radio-group v-model="form.username" :active-color="'#FFA032'" style="text-align: right;">
						<u-radio :name="item.text" style="margin-left: 10pt;" v-for="(item,index) in List" :key="index">{{item.text}}</u-radio>
					</u-radio-group>
				</u-form-item>
			</u-form>
			<view style="padding-top: 30pt;color:#E10000;">
				*以上项目都是必填项，未完成不能提交！ 
			</view>
			<u-picker v-model="show" mode="time" :end-year="today.year" :params="params" @confirm="dataChange"></u-picker>
		</view>
		<view style="text-align: center; padding: 5pt 20pt;">
			<u-button type="success" shape='circle' class="btn-orange" @click="toNext">下一步</u-button>
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
					username: '',
				},
				rules: {
					companyName:requiredRule,
					socialCode:requiredRule,
					companyCreateTime:requiredRule,
					registeredPrice:requiredRule,
					legalPerson:requiredRule,
					area:requiredRule,			
                },
				pickerName:'',
				List:[{text:'A1'},{text:'A2'},{text:'A3'},{text:'B1'},{text:'B2'},{text:'C1'},{text:'C2'}],
				show: false,
				params: {
					year: true,
					month: true,
					day: true,
					hour: false,
					minute: false,
					second: false
				},
				errorType:[
					'message'
				]
			}
		},
		onReady() {
		    // this.$refs.uForm.setRules(this.rules);
		},
		onLoad(option) {
			// let comparyid = option.id;
			// if(comparyid){
			// 	this.comparyid = comparyid;
			// }
		},
		mounted() {
	      this.setPicToken()
		  // this.getInfo()
		},
		computed:{
			...mapGetters(['token','telephone','today'])
		},
		methods: {
			getInfo(){
				if(this.comparyid){
					this.$u.api.getCompanyAll({comparyid:this.comparyid}).then(res => {
						if(res.code === 200){
							
						 }
						}).catch(res=>{
							console.log(res)
					})
				}
			},
			showPicker(name){
				this.pickerName = '';
				this.show = true;
			},
			setPicToken(){
				this.headerObj.Authorization = this.token;
				this.formDataObj.phone = this.telephone;
			},
			setForm(){
				 let data = this.form;
				 // this.COMPANYFIRST(data)
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
				if (obj.month > this.today.month || obj.day > this.today.day){
					return false
				}
				let companyDate = obj.year+"-"+obj.month+"-"+obj.day;
				this.form.companyCreateTime = companyDate;
			},
			uploadChange(res,index,lists,name){
				let data = res.data;
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

	 .btn-orange{
		background: linear-gradient(55deg, $bg-grad-FE, $bg-grad-FCD);
	 }
</style>

