<template>
	<view>
	   <u-navbar back-text="返回" back-icon-size="0" title="职位详情" :background="backgroundCom" :back-text-style="backTextStyle" height='44' title-color="#FFFFFF"></u-navbar>
	   <view class="view-content">
<!-- 	   	 <view class="">* 点击文字区域进入编辑状态，修改内容。</view>
		 <view class="">此页内容都是必填项哦，没填写不能进入下一步！</view> -->
	   	 <view class="">
	   	 	<u-form :model="form" ref="uForm" :error-type="errorType" label-width="160" :border-bottom="false">
				<u-form-item label="岗位名称" prop="workname">
					<u-input v-model="form.workname" class="input_select" type="select" :border="true" placeholder="请选择" @click="show = true" />
				</u-form-item>
				<u-form-item label="月薪(元)" label-position="top" prop="lowmonthprice">
				  <u-input v-model="form.lowmonthprice" type="number" maxlength="7" class="input_select" @input="startValChange" 
				  :clearable="false" :border="true" placeholder="请输入最低值"/>
				  <text style="padding: 0 10pt;">-</text>
				  <u-input v-model="form.highmonthprice" type="number" maxlength="7" class="input_select" @input="endValChange" 
				  :clearable="false" :border="true" placeholder="请输入最高值"/>
				</u-form-item>
				<u-form-item label="招聘人数" prop="peoplenumber">
					<u-input v-model="form.peoplenumber" class="input_select" maxlength="7" type="number" :border="true" placeholder="请输入招聘人数" />
				</u-form-item>
				<u-form-item label="职位详情" prop="worktext" label-position="top">
					<u-input v-model="form.worktext" class="input_textarea" type="textarea" maxlength="1000"
					 :border="true" placeholder="请输入(字数1000字以内) " />
				</u-form-item>
				<u-form-item label="" label-width="0">
					<u-input v-model="value" class="input_select" :disabled="true" :border="true" placeholder="未添加" />
					<u-button type="success" size="medium" shape='circle' @click="toCarModel">添加工作车辆</u-button>
				</u-form-item>
			</u-form>		
	   	 </view> 
	   </view>
	   <view class="fixed-btn">
	   	<view class=" btn-inline">
			<u-button type="success" class="btn-agree" style="width: 50%;" @click="saveStorage">保存草稿</u-button>
			<u-button type="success" class="btn-agree" style="width: 50%;" @click="toSubmit">提交审核</u-button>	
	   	</view>
	   </view>
		<u-action-sheet :list="list" v-model="show" @click="actionSheetCallback"></u-action-sheet>
		<u-modal v-model="showTips" @confirm="tipsConfirm"  confirm-text="我知道了">
			<view class="slot-content" style="padding: 10pt;font-size: 10pt;">
		        信息发布成功
			</view>
		</u-modal>
	</view>
</template>

<script>
	import {mapGetters,mapActions} from 'vuex'
	import {requiredRule} from '@/common/rule.js'
export default {
	data() {
		return {
			backTextStyle:{'color':'#ffffff'},
			value:'',
			form:{
				userid:'',
				workname:'',
				lowmonthprice:'',
				highmonthprice:'',
				peoplenumber:'',
				worktext:'',
				AlreadHaveCarList:[],
				comparyInviteInsertCarVoList:[]
			},
			rules:{
				userid:requiredRule,
				workname:requiredRule,
				lowmonthprice:requiredRule,
				highmonthprice:requiredRule,
				peoplenumber:requiredRule,
				worktext:requiredRule,
				AlreadHaveCarList:requiredRule
			},
			list: [{value: '1',text: '网约车司机'},{value: '2',text: '出租车司机'}],
			show:false,
			errorType:[
				'message'
			],
			showTips:false,
			
		}
	},
	onReady() {
	    this.$refs.uForm.setRules(this.rules);
	},
	computed:{
		...mapGetters(['telephone','carPubUpload','carPubPosition'])
	},
	mounted() {
          this.setInfo()
	},
	onShow() {
		 this.setInfo()
	},
	methods: {
		...mapActions(['CARPUBUPOSITION']),
    setInfo(){
		let pubUpload = this.carPubUpload;
		let carPubPosition = uni.getStorageSync('carPubPosition');
		console.log(carPubPosition)
		if (carPubPosition){
			this.form = carPubPosition;
		}
			this.form.userid = this.telephone;
		if (pubUpload){
			let len = pubUpload.length;
			this.value= '已填加'+len+'辆';
			this.form.AlreadHaveCarList = [];
			this.form.comparyInviteInsertCarVoList = [];
			pubUpload.forEach((item)=>{
				if (item.id){
					this.form.AlreadHaveCarList.push(item.id)
				} else {
					this.form.comparyInviteInsertCarVoList.push(item)
				}
			})
		} else{
			this.value = ''
		}
	},		
	 actionSheetCallback(index) {
		let value = this.list[index].text;
		this.form.workname = value
	 },
	 toCarModel(){
		  this.CARPUBUPOSITION(this.form)
		this.$u.route('/pages/company/recruit/carModel/carModel') 
	 },
	 saveStorage(){
		 this.CARPUBUPOSITION(this.form)
		  this.$u.toast('草稿保存成功');
	 },
	 saveForm(){
		 let obj = this.form;
		 console.log(obj)
		 this.$u.api.saveCompanyInvite(obj).then(res=>{
		 	if(res.code === '200'){
				this.showTips = true
		 	}else {
		 		 this.$u.toast(res.msg);
		 	}
		 }).catch(res=>{this.$u.toast(res.msg)})
	 },
	 clearStorage(){
		 uni.removeStorageSync('carPubUpload');
		 uni.removeStorageSync('carPubPosition');
	 },
	 tipsConfirm(){
	 	this.$u.route('/pages/company/myPublish/myPublish', {index: 1});
	 },
	 toSubmit(){
		this.$refs.uForm.validate(valid=>{
			if(valid) {
				if (this.form.highmonthprice === ''){
					this.$u.toast('请填写月薪最高值')
					return
				}
				if (this.carPubUpload.length === 0){
					this.$u.toast('请添加工作车辆')
					return
				}
				this.saveForm()
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
