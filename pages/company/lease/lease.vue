<template>
    <view class="wrap">
		<u-navbar back-text="返回" :custom-back='customBack'  back-icon-size="0" title="租赁车辆发布" 
		:background="backgroundCom" :back-text-style="backTextStyle" height='44' title-color="#FFFFFF"></u-navbar>
		<view class="zlcontent">
		   <view class="zlyjdr" @click="handleClick">一键导入已有车辆为“在租”车辆</view>
		   <view class="zlcontent-mid">
		   	 <text style="font-size:10pt;">* 请注意本页内容除 
			 <text v-if="carPubType===1">“车辆在租总数”</text><text v-else>“车辆在售总数”</text>外，其他都是必填项！未填写不能进入下一步</text>
		   </view>
		   <view class="zlcontent-mid">
		   	 <u-form :model="form" ref='uForm' :error-type="errorType">
		   	 	<u-form-item label="" prop="carbrand" label-width='0'>
				 <u-input v-model="form.carbrand" class="input_select" type="select" :border="true"
				  placeholder="请选择车辆品牌" :placeholder-style="style" @click="toCarList" />
		   	 	</u-form-item>
				<u-form-item label="" prop="carmodel" label-width='0'>
					<u-input v-model="form.carmodel" class="input_select" type="select" :border="true" 
					placeholder="请选择车系" :placeholder-style="style" @click="showSelect('carmodel')" />
				</u-form-item>
				<u-form-item label="" prop="carxinghao" label-width='0'>
					<u-input v-model="form.carxinghao" class="input_select" type="select" :border="true" 
					placeholder="请选择车辆型号" :placeholder-style="style" @click="showSelect('carxinghao')" />
				</u-form-item>
				<u-form-item label="" prop="cartype" label-width='0'>
					<u-input v-model="form.cartype" class="input_select" type="select" :border="true" 
					placeholder="请选择车辆类型" :placeholder-style="style" @click="showSelect('cartype')" />
				</u-form-item>
				<u-form-item label="" prop="power" label-width='0'>
					<u-input v-model="form.power" class="input_select" type="select" :border="true"
					 placeholder="请选择动力类型" :placeholder-style="style" @click="showSelect('power')" />
				</u-form-item>
		   	 	<u-form-item label="业务类型" prop="businesstype" label-width='100pt'>
					<u-radio-group v-model="form.businesstype" active-color="#6DD99C" style="text-align: right;">
						<u-radio name="1" style="margin-left: 10pt;">网约车</u-radio>
						<u-radio name="2" style="margin-left: 10pt;">出租车</u-radio>
					</u-radio-group>
		   	 	</u-form-item>
		   	 </u-form>
			 
		    </view>
			<view class="zlcontent-mid" style="background: #FFFFFF;">
				<view style="padding: 10pt 0;font-size: 14pt;color: #000000;">车况详情</view>
				 <u-form :model="form" ref='uForm2' label-width="220" :error-type="errorType">
					 <u-form-item label="首次上牌时间" prop="firsttime">
						 <u-input v-model="form.firsttime" :border="true" :disabled="true" @click="timeShow = true" placeholder=""/>
						 <u-icon style=";position: absolute;right: 10rpx;" name="calendar" color="#6DD99B" size="40"></u-icon>
					 </u-form-item>
					 <u-form-item label="行驶里程" prop="km">
					 	<u-input v-model="form.km" style="border-radius: 40rpx;" :border="true" placeholder="请输入网约车行驶里程" />
					 </u-form-item>
					 <u-form-item :label="carPubType === 1?'车辆在租总数':'车辆在售总数'">
						 <u-input v-model="form.carnbumber" :clearable="false" :border="true"/><text style="position: absolute;right: 10px;">辆</text>
					 </u-form-item>
			      </u-form>	
				<u-picker v-model="timeShow" mode="time" :end-year="today.year" :params="params" @confirm="dataChange"></u-picker>
				<view style="text-align: center; padding: 26pt 20pt;">
					<u-button type="success" shape='circle' class="btn-agree" @click="toNext">下一步</u-button>
				</view>
			</view>
	    </view>
		<u-select v-model="show" :list="selectObj[selectObjType]" label-name='text' value-name='id' @confirm="actionSheetCallback"></u-select>
		<ChildPopup  ref='importShow' :childType='childType' :carPubType='carPubType'  @handleId = 'getChildId'></ChildPopup>
		
     </view>
</template>

<script>
import {requiredRule,businessTypeRule} from '@/common/rule.js'
import {mapGetters,mapActions} from 'vuex'
import ChildPopup from '@/components/importCar.vue'

export default {
  data(){
	return {
		errorType:[
			'message'
		],
		backTextStyle:{
			'color':'#ffffff'
		},
		style:"color:#000000",
		form:{
			carbrand:'',
			carmodel:'',
			carxinghao:'',
			cartype:'',
			power:'',
			businesstype:'',
			firsttime:'',
			km:'',
			carnbumber:'',
		},
		rules:{
			carbrand:requiredRule,
			carmodel:requiredRule,
			carxinghao:requiredRule,
			cartype:requiredRule,
			power:requiredRule,
			businesstype:requiredRule,
			firsttime:requiredRule,
			km:requiredRule,
			carnbumber:requiredRule,
		},
		selectObj:{
			carbrand:[],
			carmodel:[],
			carxinghao:[],
			cartype:[{value: '1',text: '轿车'},{value: '2',text: 'SUV'},{value: '3',text: 'MPV'},{value: '4',text: '其他'}],
			power:[{value: '1',text: '纯电动'},{value: '2',text: '插电混动'},{value: '3',text: '燃油车(含油电混动)'}]
		},
		selectObjType:'carbrand',
		params: {
			year: true,
			month: true,
			day: true,
			hour: false,
			minute: false,
			second: false
		},
		firstId:'',
		show: false,
		timeShow:false,
		childType:true,
	}  
  },
  components:{ChildPopup},
  onReady() {
       this.$refs.uForm.setRules(this.rules);
       this.$refs.uForm2.setRules(this.rules);
  },
  computed:{
  	...mapGetters(['carPubType','today'])
  },
  onLoad(option) {
  	let index = option.id;
	this.form.carbrand = option.text;
	this.firstId = index;
	if(index){
		 this.getSelectFirst(this.firstId)
	}
  },
  mounted() {
    // this.getSelect()
  },
  methods: {
	  ...mapActions(['CARPUBFIRST']),
	 toCarList(){
		this.$u.route('/pages/company/lease/carList/carList',{source:1}) 
	 }, 
	  customBack(){
		  this.$u.route('/pages/company/release/release') 
	  },
	getChildId(item){
		console.log(item)
		let obj = item[0];
		this.form.carbrand = obj.carBrand;
		// this.selectObj.carbrand.forEach((item)=>{
		// 	if(item.text = obj.carBrand) {
		// 		this.getSelectFirst(item.id)
		// 	}
		// })
		this.form.carmodel = obj.carModel;
		this.form.carxinghao = obj.carxinghao;
		this.form.cartype = obj.carType;
	    this.form.power = obj.power;
	},
	setInfo(){
		
	},
	showSelect(type){
		this.selectObjType = type;
		this.show = true;
	},
	actionSheetCallback(index) {
		let type = this.selectObjType;
		let val = index[0].label;
		let id = index[0].value;
		if (type === 'carbrand') {
			this.form.carmodel = '';
			this.form.carxinghao = '';
			this.getSelectFirst(id)
		}
		if (type === 'carmodel') {
			this.form.carxinghao = '';
			this.getSelectSecond(id)
		}
		this.form[type] = val;
	},
	getSelect(){
		this.$u.api.getCarBrand({}).then(res=>{
			if(res.code === 200){
	           this.selectObj.carbrand = res.alibabaCarModelVoList;
			}else {
				 this.$u.toast(res.message);
			}
		})
	},
	getSelectFirst(id){
		console.log(id)
		this.$u.api.getCarSystem({parentid:id}).then(res=>{
			if(res.code === 200){
	           this.selectObj.carmodel = res.alibabaCarModelVoList;
			}else {
				 this.$u.toast(res.msg);
			}
		}).catch(res=>{console.log(res)})
	},
	getSelectSecond(id){
		this.$u.api.getCarModel({parentid:id}).then(res=>{
			if(res.code === 200){
			   this.selectObj.carxinghao = res.alibabaCarModelVoList;
			}else {
				 this.$u.toast(res.message);
			}
		})	
	},
	dataChange(obj){
		if (obj.month > this.today.month || obj.day > this.today.day){
			return false
		}
		let companyDate = obj.year+"-"+obj.month+"-"+obj.day;
		this.form.firsttime = companyDate;
	},
    handleClick(){
		this.$refs.importShow.importShow = true
    },
	toNext(){
		this.CARPUBFIRST(this.form)
		this.$refs.uForm.validate(valid=>{
			if(valid) {
		        this.$refs.uForm2.validate(valid=>{
		        	if(valid) {
		             this.$u.route('/pages/company/lease/step/stepLabel/stepLabel')
		        	}
		        })
			}
		})
	},
  }
}
</script>
<style lang="scss">
.scroll-container {height: 100%;}
page{
	// background-image: url(../../../static/lease.png);
	background-size: cover;
	background-repeat: no-repeat;
	background-color:#f5f5f8 ;
	height: 100%;
}
.zlyjdr{
	background-image: url(../../../static/leasebg.png);
	background-repeat: no-repeat;
	height: 40pt;
	line-height: 35pt;
	margin: 20pt 0;
	color: #fff;
}
.zlcontent-mid{
	padding: 0 20pt;
}
/deep/ .u-border-bottom:after{
	border-bottom-width:0;
}
.input_select{
	background: #FFFFFF;border-radius: 40rpx;
}
.u-card-wrap { 
	background-color: #000000;
	padding: 1px;
}
.card-img{
	width: 120rpx;
	flex: 0 0 120rpx;
	height: 120rpx;
	// border-radius: 8rpx;
	// margin-left: 12rpx;
	// padding-right:15pt;
}
.card-title{
	font-size: 12pt;
	color: #333;
	padding-left: 5pt;
	position: relative;
	.iconAbs{
	    position: absolute;
	    right: 0;
	    bottom: 0;	
	}
}
.tag-style{
	margin: 8pt 8pt 0 0;
}
.fixed-btn{
    box-sizing: border-box;
    position: fixed;
    left: 0;
    bottom: 0;
    width: 100%;
    z-index: 98;
}
 .btn-agree{
	background: linear-gradient(55deg, $bg-grad-AB, $bg-grad-DDC);
 }
</style>