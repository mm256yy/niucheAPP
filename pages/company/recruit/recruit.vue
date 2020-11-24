<template>
	<view>
	   <u-navbar back-text="返回" back-icon-size="0" title="招募发布" :background="backgroundCom" :back-text-style="backTextStyle" height='44' title-color="#FFFFFF"></u-navbar>
	   <view class="zlcontent-mid">
	   	 <text style="font-size:10pt;">* 请注意本页内容都是必填项！未填写不能提交审核</text>
	   </view>
	   <view class="view-content">
	   	 <view class="">
	   	 	<u-form :model="form" ref="uForm" :error-type="errorType" label-width="160" :border-bottom="false">
				<u-form-item label="" prop="carbrand" label-width='0'>
					 <u-input v-model="form.carbrand" class="input_select" type="select" :border="true"
					  placeholder="请选择车辆品牌" @click="toCarList" />
				 	</u-form-item>
					<u-form-item label="" prop="carmodel" label-width='0'>
						<u-input v-model="form.carmodel" class="input_select" type="select" :border="true"
						 placeholder="请选择车系" @click="showSelect = true" />
				</u-form-item>
				<u-form-item label="岗位名称" prop="workname">
					<u-input v-model="form.workname" class="input_select" type="select" :border="true" placeholder="请选择" @click="show = true" />
				</u-form-item>
				<u-form-item label="月薪(元)" label-position="top">
				  <u-input v-model="form.lowmonthprice" type="number" maxlength="7" class="input_select" @input="startValChange" 
				  :clearable="false" :border="true" placeholder="请输入最低值"/>
				  <text style="padding: 0 10pt;">-</text>
				  <u-input v-model="form.highmonthprice" type="number" maxlength="7" class="input_select" @input="endValChange" 
				  :clearable="false" :border="true" placeholder="请输入最高值"/>
				</u-form-item>
				<u-form-item label="招聘人数" prop="peoplenumber">
					<u-input v-model="form.peoplenumber" class="input_select" maxlength="7" type="number" :border="true"
					 placeholder="请输入招聘人数" />
				</u-form-item>
				<u-form-item label="职位详情" prop="worktext" label-position="top">
					<u-input v-model="form.worktext" class="input_textarea" type="textarea" maxlength="1000"
					 :border="true" placeholder="请输入(字数1000字以内) " />
				</u-form-item>
			</u-form>		
	   	 </view>
	   </view>
	   <!-- <view style="padding: 0 20pt;">正确的车辆照片和证件照片 可帮助您更快通过审核</view> -->
	   <view class="view-content">
	      <view class="top-content-upload">
	   	   <u-upload :custom-btn="true" :action="action" max-count="1" ref="upload"
	   	    @on-success='uploadChange' index="onephoto" upload-text="" @on-remove="removeOne"
	   	    :file-list="fileList" :max-size="4 * 1024 * 1024" style="width: 100%;justify-content: center;height: 100px;">
	   		<view slot="addBtn" class="slot-btn" hover-class="slot-btn__hover" hover-stay-time="150">
	   			<u-icon name="plus" size="60" :color="$u.color['lightColor']"></u-icon>
	   		</view>
	   	</u-upload>
	     </view>
	   </view>
	   <view class="fixed-btn">
	   	<view class=" btn-inline">
			<u-button type="success" class="btn-agree" style="width: 100%;" @click="toSubmit">提交审核</u-button>	
	   	</view>
	   </view>
	   <u-select v-model="showSelect" :list="carmodel" label-name='carseriesname' value-name='carseriesid' @confirm="actionCallback"></u-select>
		<u-action-sheet :list="list" v-model="show" @click="actionSheetCallback"></u-action-sheet>
		<u-modal v-model="showTips" @confirm="tipsConfirm"  confirm-text="我知道了">
			<view class="slot-content" style="padding: 10pt;font-size: 10pt;">
		        信息发布成功
			</view>
		</u-modal>
		<auth></auth>
	</view>
</template>

<script>
	import {requiredRule} from '@/common/rule.js'
		import {action} from '@/utils/constant.js'
	import auth from '@/components/auth.vue'
export default {
	components:{
		auth
	},
	data() {
		return {
			showSelect:false,
			backTextStyle:{'color':'#ffffff'},
			form:{
				carbrand:'',
				carmodel:'',
				workname:'',
				lowmonthprice:'',
				highmonthprice:'',
				peoplenumber:'',
				worktext:'',
				fivephoto:'',
			},
			action: action,
			fileList:[],
			rules:{
				carmodel:requiredRule,
				carbrand:requiredRule,
				workname:requiredRule,
				worktext:requiredRule,
			},
			carmodel:[],
			list: [{value: '1',text: '网约车司机'},{value: '2',text: '出租车司机'}],
			show:false,
			errorType:[
				'message'
			],
			showTips:false,
			editId:'',
			carPubPosition:{}
		}
	},
	onReady() {
	    this.$refs.uForm.setRules(this.rules);
	},
	onLoad(option) {
		let index = option.id;
		if(index){
			 this.initStorage()
			 this.form.carbrand =option.text;
			 this.getSelectFirst(index)
		}
		let editId = option.editId;
		this.editId = editId
	 },
	onShow() {	
		if(this.editId){
			this.editInit()
			
		}
	},
	methods: {
 	  initStorage(){
		this.carPubPosition = uni.getStorageSync('carPubPosition');
		this.editId = uni.getStorageSync('inviteid');
		this.form = this.carPubPosition;
		if(this.carPubPosition.fivephoto){
			this.fileList = [];
			this.fileList.push({url:this.form.fivephoto})
		}
	 },
	 setStorage(data){
		 uni.setStorageSync('carPubPosition', data);
	 },
	 getSelectFirst(id){
		this.$u.api.getCarSystem({carbrandid:id}).then(res=>{
			if(res.code === 200){
				 this.carmodel = res.object;
			}else {
				 this.$u.toast(res.msg);
			}
		}).catch(res=>{this.$u.toast(res.msg)})
	 },
	 editInit(){
		 let id = this.editId;
		 if(id){
			 this.$u.api.ComparyInviteEchoText({inviteid:id}).then(res=>{
				if(res.code === 200){
						let data = res.object;
						uni.setStorageSync('inviteid',id)
						this.form = data;
						if(data.fivephoto){
							this.fileList = [];
							this.fileList.push({url:this.form.fivephoto})
						}
						this.setStorage(data)
				}else {
					 this.$u.toast(res.msg);
				}
			 }).catch(res=>{this.$u.toast(res.msg)}) 
		 			 
		 } 
	 },
	 actionCallback(index) {
	  	let val = index[0].label;
	  	this.form.carmodel = val;
	  },
	 uploadChange(data, index, lists, name){
	 	this.form.fivephoto = data.object;
	 	this.$u.toast(data.msg);
	 },
	 removeOne(index,lists,name){
	 	this.form.fivephoto = '';
	 },
	 toCarList(){
	    this.setStorage(this.form)
	  	this.$u.route('/pages/company/lease/carList/carList',{source:2}) 
	 },
    setInfo(){
		let pubUpload = this.carPubUpload;
		let carPubPosition = this.carPubPosition;;
	},	
	 actionSheetCallback(index) {
		let value = this.list[index].text;
		this.form.workname = value
	 },
	 saveForm(){
			let obj = this.form;
			this.$u.api.saveCompanyInvite(obj).then(res=>{
				if(res.code === '200'){
					this.showTips = true
				}else {
					 this.$u.toast(res.msg);
				}
			}).catch(res=>{this.$u.toast(res.msg)}) 
	 },
	 saveFormEdit(){
		 let saveobject = this.form
		 this.$u.api.ComparyInviteUpdate(saveobject).then(res=>{
				if(res.code === 200){
					this.showTips = true
				}else {
					 this.$u.toast(res.msg);
				}
			}).catch(res=>{this.$u.toast(res.msg)})
	 },
	 clearStorage(){
		 uni.removeStorageSync('inviteid');
		 uni.removeStorageSync('carPubPosition');
		 this.form = {
			carbrand:'',
			carmodel:'',
			workname:'',
			lowmonthprice:'',
			highmonthprice:'',
			peoplenumber:'',
			worktext:'',
			fivephoto:'',
			};
			this.fileList = []
	 },
	 tipsConfirm(){
		 this.clearStorage()
	 	 this.$u.route('/pages/company/myPublish/myPublish', {index: 1});
	 },
	 toSubmit(){
		this.$refs.uForm.validate(valid=>{
			if(valid) {
				if (this.form.lowmonthprice === ''){
					this.$u.toast('请填写月薪最低值')
					return
				}
				if (this.form.highmonthprice === ''){
					this.$u.toast('请填写月薪最高值')
					return
				}
				let startPrice = Number(this.form.lowmonthprice);
				let endPrice = Number(this.form.highmonthprice);
				if (startPrice > endPrice){
					this.$u.toast('月薪填写有误');
					return
				}
				if(this.form.peoplenumber === ''){
					this.$u.toast('请填写招聘人数')
					return
				}
				if (this.form.fivephoto === ''){
					this.$u.toast('请上传图片')
					return
				}
				debugger
				let id = uni.getStorageSync('inviteid')
				if (id){
					this.saveFormEdit()
				} else {
					this.saveForm()
				}
			} 
		}) 
	 },
	 startValChange(){

	 },
	 endValChange(){

	 },
	}
}
</script>

<style lang="scss">
.scroll-container {height: 100%;}
page{
	background-color:#f5f5f8 ;
	height: 100%;
}
/deep/ .u-border-bottom:after{
	border-bottom-width:0;
}

.view-content{
	margin-top: 20pt;padding: 0 10pt;
}
.input_select{
	background: #FFFFFF;border-radius: 40rpx;
}
.input_textarea{
	background: #FFFFFF;
}
.fixed-btn{
     box-sizing: border-box;
    position: fixed;
    left: 0;
    bottom: 0;
    width: 100%;
    z-index: 998;
}
.top-content-upload{
	border: 1px dotted #dedede;
	width: 100%;
	background: #FFFFFF;
	position: relative;
	// height: 118pt;
}
.btn-inline{
	display: flex;
	justify-content: center;
	 flex-direction: row;
	// width: 40%;
}
 .btn-agree{
	 width: 50%;
	background: linear-gradient(55deg, $bg-grad-AB, $bg-grad-DDC);
 }
</style>
