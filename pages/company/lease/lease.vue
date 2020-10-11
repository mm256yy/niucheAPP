<template>
    <view class="wrap">
		<u-navbar back-text="返回"  back-icon-size="0" title="租赁车辆发布" :background="backgroundCom" :back-text-style="backTextStyle" height='44' title-color="#FFFFFF"></u-navbar>
		<view class="zlcontent">
		   <view class="zlyjdr" @click="handleClick">一键导入已有车辆为“在租”车辆</view>
		   <view class="zlcontent-mid">
		   	 <text style="font-size:10pt;">* 请注意本页内容除“车辆在租总数”外，其他都是必填项！未填写不能进入下一步</text>
		   </view>
		   <view class="zlcontent-mid">
		   	 <u-form :model="form" ref='uForm' :error-type="errorType">
		   	 	<u-form-item label="" prop="brand" label-width='0'>
					<u-input v-model="form.brand" class="input_select" type="select" :border="true" placeholder="请选择车辆品牌" :placeholder-style="style" @click="showSelect('brand')" />
		   	 	</u-form-item>
				<u-form-item label="" prop="system" label-width='0'>
					<u-input v-model="form.system" class="input_select" type="select" :border="true" placeholder="请选择车系" :placeholder-style="style" @click="showSelect('system')" />
				</u-form-item>
				<u-form-item label="" prop="model" label-width='0'>
					<u-input v-model="form.model" class="input_select" type="select" :border="true" placeholder="请选择车辆型号" :placeholder-style="style" @click="showSelect('model')" />
				</u-form-item>
				<u-form-item label="" prop="car" label-width='0'>
					<u-input v-model="form.car" class="input_select" type="select" :border="true" placeholder="请选择车辆类型" :placeholder-style="style" @click="showSelect('car')" />
				</u-form-item>
				<u-form-item label="" prop="power" label-width='0'>
					<u-input v-model="form.power" class="input_select" type="select" :border="true" placeholder="请选择动力类型" :placeholder-style="style" @click="showSelect('power')" />
				</u-form-item>
		   	 	<u-form-item label="业务类型" prop="type" label-width='100pt'>
					<u-checkbox-group active-color="#6DD99C" @change="radioGroupChange" shape="circle">
						<u-checkbox v-model="item.checked" v-for="(item, index) in checkboxList" :key="index" :name="item.value">
							{{ item.name }}
						</u-checkbox>
					</u-checkbox-group>
		   	 	</u-form-item>
		   	 </u-form>
			 
		    </view>
			<view class="zlcontent-mid" style="background: #FFFFFF;">
				<view style="padding: 10pt 0;font-size: 14pt;color: #000000;">车况详情</view>
				 <u-form :model="form" ref='uForm2' label-width="220" :error-type="errorType">
					 <u-form-item label="首次上牌时间" prop="firstTime">
						 <u-input v-model="form.firstTime" :border="true" :disabled="true" @click="timeShow = true" placeholder=""/>
						 <u-icon style=";position: absolute;right: 10rpx;" name="calendar" color="#6DD99B" size="40"></u-icon>
					 </u-form-item>
					 <u-form-item label="行驶里程" prop="km">
					 	<u-input v-model="form.km" style="border-radius: 40rpx;" :border="true" placeholder="请输入网约车行驶里程" />
					 </u-form-item>
					 <u-form-item :label="type === 1?'车辆在租总数':'车辆在售总数'" prop="carNumber">
						 <u-input v-model="form.carNumber" :border="true"/><text style="position: absolute;right: 10px;">辆</text>
					 </u-form-item>
			      </u-form>	
				<u-picker v-model="timeShow" mode="time" :params="params" @confirm="dataChange"></u-picker>
				<view style="text-align: center; padding: 26pt 20pt;">
					<u-button type="success" shape='circle' class="btn-agree" @click="toNext">下一步</u-button>
				</view>
			</view>
	    </view>
		<u-action-sheet :list="selectObj[selectObjType]" v-model="show" @click="actionSheetCallback"></u-action-sheet>
		<u-popup v-model="importShow">
			<view>出淤泥而不染，濯清涟而不妖</view>
		</u-popup>
     </view>
</template>

<script>
import {requiredRule} from '@/common/rule.js'
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
			brand:'',
			system:'',
			model:'',
			car:'',
			power:'',
			type:[],
			firstTime:'',
			km:'',
			carNumber:'',
		},
		rules:{
			brand:requiredRule,
			system:requiredRule,
			model:requiredRule,
			car:requiredRule,
			power:requiredRule,
			type:requiredRule,
			firstTime:requiredRule,
			km:requiredRule,
			carNumber:requiredRule,
		},
		selectObj:{
			brand:[],
			system:[],
			model:[],
			car:[{value: '1',text: '轿车'},{value: '2',text: 'SUV'},{value: '3',text: 'MPV'},{value: '4',text: '其他'}],
			power:[{value: '1',text: '纯电动'},{value: '2',text: '插电混动'},{value: '3',text: '燃油车(含油电混动)'}]
		},
		selectObjType:'brand',
		checkboxList: [{name: '网约车',value:1},{name: '出租车',value:2}],
		params: {
			year: true,
			month: true,
			day: true,
			hour: false,
			minute: false,
			second: false
		},
		type:1,//标识（租赁1 转卖3）
		show: false,
		timeShow:false,
		importShow:false,
	}  
  },
  onLoad(option) {
  	let index  = Number(option.type)
  	 this.type = index;
  },
  onReady() {
       this.$refs.uForm.setRules(this.rules);
       this.$refs.uForm2.setRules(this.rules);
  },
  methods: {
	showSelect(type){
		this.selectObjType = type;
		this.show = true;
	},  
	actionSheetCallback(index) {
		let type = this.selectObjType;
		let val = this.selectObj[type][index].text;
		if (type === 'brand' || type === 'system') {
			this.getSelect(type)
		}
		this.form[type] = val;
	},
	getSelect(type){
		console.log(type)
	},
	radioGroupChange(e) {
		this.form.type = e;
		console.log(this.form)
	},
	dataChange(obj){
		let companyDate = obj.year+"-"+obj.month+"-"+obj.day;
		this.form.firstTime = companyDate;
	},
    handleClick(){
        this.importShow = true;
    },
	toNext(){
		this.$refs.uForm.validate(valid=>{
			if(valid) {
		        this.$refs.uForm.validate(valid=>{
		        	if(valid) {
		                // this.setForm()
		        	}
		        })
			}
		})
		this.$u.route('/pages/company/lease/step/stepLabel/stepLabel')
	}
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
	 .btn-agree{
		background: linear-gradient(55deg, $bg-grad-AB, $bg-grad-DDC);
	 }
</style>