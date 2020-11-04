<template>
	<view style="padding-bottom: 20rpx;">
		<u-navbar back-text="返回"  back-icon-size="0" :title="title" :back-text-style="backTextStyle" :background="backgroundDri" title-color="#FFFFFF">
			<view class="navbar-right" slot="right">
				<view class="message-box right-item">
					<text v-show="stateType && !type" @click="edit">变更</text>
				</view>
			</view>
		 </u-navbar>
		<view class="top-content" >
			<view style="background-color: #dedede;padding: 8pt 0;" v-show="reason">
				<text style="padding-left: 6px;">{{reason}}</text>
			</view>
			<view class="top-content-base">驾照认证</view>
			<view class="top-content-base" style="font-size: 12pt;">驾驶证正本照片</view>
			<view class="top-content-upload" v-if='type'>
				<view></view>
				<u-upload :custom-btn="true" :action="action" :header="headerObj" :form-data="formDataObj" 
				@on-success='uploadChange' upload-text="" :file-list="fileList" :max-size="8 * 1024 * 1024"
				 max-count="1" style="width: 100%;justify-content: center;background-color: #FFFFFF;">
					<view slot="addBtn" class="slot-btn" hover-class="slot-btn__hover" hover-stay-time="150">
						<u-icon name="plus" size="60" :color="$u.color['lightColor']"></u-icon>
					</view>
				</u-upload>
			</view>
			<view class="" v-else>
				<u-image width="100%" height="240rpx" :src="form.driverPhoto"></u-image>
			</view>
			<view class="top-content-uploadTips" style="padding:10pt 0 5pt;">1.必须为jpg格式,单张不得超过4M</view>
			<view class="top-content-uploadTips">2.上传后自动或手动识别文字信息</view>
		</view>
		<view class="middle-content">
			<u-form :model="form" ref="uForm" label-width="220" :error-type="errorType" :border-bottom="false">
				<u-form-item label="姓名" prop="name">
					<u-input class="input-radius" v-model="form.name" :border="true" v-if="type"/>
					<view v-else class="type-right">{{form.name}}</view>
				</u-form-item>
				<u-form-item label="性别" prop="sex">
					<u-radio-group v-if="type" v-model="form.sex" :active-color="'#FFA032'" style="text-align: right;">
						<u-radio :name="item.name" style="margin-left: 10pt;" v-for="item in radioList" :key="item.name">{{item.text}}</u-radio>
					</u-radio-group>
					<view class="type-right" v-else>{{form.sex === '0' ? "女":"男"}}</view>
				</u-form-item>
				<u-form-item label="出生日期" prop="brithday">
					<u-input v-model="form.brithday" :border="true" v-show='type'
					 class="input-radius" :disabled="true" @click="showPicker('brithday')" placeholder=""/>
					<u-icon class="iconAbs" v-show='type' name="calendar" color="#FFA032" size="40"></u-icon>
					<view class="type-right" v-show='!type'>{{form.brithday}}</view>
				</u-form-item>
				<u-form-item label="驾驶证号" prop="licenseNumber">
					<u-input class="input-radius" v-model="form.licenseNumber" :border="true" v-if="type"/>
					<view class="type-right" v-else>{{form.licenseNumber}}</view>
				</u-form-item>
				<u-form-item label="初次领证" prop="username">
					<u-input v-model="form.issueDate" :border="true" v-show='type' 
					class="input-radius" :disabled="true" @click="showPicker('issueDate')" placeholder="" />
					<u-icon class="iconAbs" v-show='type' name="calendar" color="#FFA032" size="40" ></u-icon>	
					<view class="type-right" v-show='!type' >{{form.issueDate}}</view>
				</u-form-item>
				<u-form-item label="有效起始时间" prop="beginTime">
					<u-input v-model="form.beginTime" :border="true" v-show='type'
					 class="input-radius" :disabled="true" @click="showPicker('beginTime')" placeholder=""/>
					<u-icon class="iconAbs" v-show='type' name="calendar" color="#FFA032" size="40"></u-icon>
					<view class="type-right" v-show='!type'>{{form.beginTime}}</view>
				</u-form-item>
				<u-form-item label="有效截止时间" prop="endTime">
					<u-input v-model="form.endTime" :border="true" v-show='type' class="input-radius" :disabled="true"
					 @click="showEnd=true" placeholder=""/>
					<u-icon class="iconAbs" v-show='type' name="calendar" color="#FFA032" size="40"></u-icon>
					<view class="type-right" v-show='!type'>{{form.endTime}}</view>
				</u-form-item>
				<u-form-item label="准驾车型" :label-position="type?'top':''" prop="vehicleAge">
					<u-radio-group v-model="form.vehicleAge" :active-color="'#FFA032'" style="text-align: right;" v-if="type">
						<u-radio :name="item.text" style="margin-left: 10pt;" v-for="(item,index) in List" :key="index">{{item.text}}</u-radio>
					</u-radio-group>
					<view class="type-right" v-else>{{form.vehicleAge}}</view>
				</u-form-item>
			</u-form>
			<view style="padding-top: 30pt;color:#E10000;">
				*以上项目都是必填项，未完成不能提交！ 
			</view>
			<u-picker v-model="show" mode="time" :end-year="today.year" :params="params" @confirm="dataChange"></u-picker>
			<u-picker v-model="showEnd" mode="time" :start-year="today.year" :params="params" @confirm="dataChangeEnd"></u-picker>
		</view>
		<view style="text-align: center; padding: 5pt 30pt;" v-show="type">
			<u-button type="success" shape='circle' class="btn-orange"  @click="toNext">提交</u-button>
		</view>
		<u-modal v-model="showTips" @confirm="confirm" confirm-text="我知道了">
			<view class="slot-content" style="padding: 10pt;font-size: 10pt;">
				您的信息已提交审核
			</view>
		</u-modal>
	</view>
</template>

<script>
	import {mapGetters,mapActions} from 'vuex'
	import {requiredRule} from '@/common/rule.js'
	import {actionJx} from '@/utils/constant.js'
	export default {
		data() {
			return {
				labelStyle:{'color':'#7F7F7F'},
				backTextStyle:{'color':'#ffffff'},
				title:'驾照上传',
				action: actionJx,
				headerObj:{Authorization:''},
				formDataObj:{phone:''},
				fileList: [],
				radioList:[{name:'0',text:'女'},{name:'1',text:'男'}],
				form: {
					name:'',
					sex: '',
					brithday:'',
					licenseNumber:'',
					issueDate:'',
					beginTime:'',
					endTime:'',
					vehicleAge:'',
					driverPhoto:''
				},
				rules: {
					name:requiredRule,
					sex:requiredRule,
					brithday:requiredRule,
					licenseNumber:requiredRule,
					issueDate:requiredRule,
					beginTime:requiredRule,
					endTime:requiredRule,
					vehicleAge:requiredRule,
                },
				pickerName:'',
				List:[{text:'A1'},{text:'A2'},{text:'A3'},{text:'B1'},{text:'B2'},{text:'C1'},{text:'C2'}],
				show: false,
				showEnd:false,
				showTips:false,
				type:true,
				stateType:false,
				reason:'',
				params: {
					year: true,month: true,day: true,hour: false,minute: false,second: false
				},
				errorType:[
					'message'
				]
			}
		},
		onReady() {
		    this.$refs.uForm.setRules(this.rules);
		},
		mounted() {
	      this.setPicToken()
		  this.getInfo()
		},
		computed:{
			...mapGetters(['token','telephone','today'])
		},
		methods: {
			getInfo(){
				this.$u.api.listDrivingLicense({state:0}).then(res => {
					if(res.code === 200){
						let data = res.object;
						this.form =data;
						this.form.sex = data.sex.toString();
						this.fileList= [{url:data.driverPhoto}]
						if (data.state === 3){
							this.type = true;
							this.reason ="驳回理由："+data.reason;
						}else if (data.state === 2){
							this.title = '驾照已认证';
							this.reason = "* 驾照已认证，如有变更，请点击“变更”提交。 "
							this.stateType = true;
							this.type = false;
						} else if(data.state ===1){
							this.type = false;
							this.title = "驾照审核中"
							this.reason = "* 信息已提交，在审核期间本页内容不能修改。"
						}
					 } else{
						this.$u.toast(res.msg) 
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
			edit(){
				this.type = true;
			},
			setPicToken(){
				this.headerObj.Authorization = this.token;
				this.formDataObj.phone = this.telephone;
			},
			toNext(){
				this.$refs.uForm.validate(valid=>{
					if(valid) {
						this.form.type = 0
						this.$u.api.addDrivingLicense(this.form).then(res => {
							if(res.code === 200){
								this.showTips =true;
							 } else{
								this.$u.toast(res.msg) 
							 }
						}).catch(res=>{this.$u.toast(res.msg)})
					} 
				})
			},
			dataChange(obj){
				console.log(obj)
				if (obj.month > this.today.month || obj.day > this.today.day){
					this.$u.toast('选择日期大于当前日期')
					return false
				}
				let companyDate = obj.year+"-"+obj.month+"-"+obj.day;
				this.form[this.pickerName] = companyDate;
			},
			dataChangeEnd(obj){
				if (obj.month < this.today.month || obj.day < this.today.day){
					this.$u.toast('选择日期小于当前日期')
					return false
				}
				let companyDate = obj.year+"-"+obj.month+"-"+obj.day;
				this.form.endTime = companyDate;
			},
			uploadChange(res,index,lists,name){
				let data = res.data;
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

