<template>
    <view class="wrap">
		<u-navbar back-text="返回"  back-icon-size="0" title="租赁车辆发布" :background="backgroundCom" :back-text-style="backTextStyle" height='44' title-color="#FFFFFF"></u-navbar>
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
					 placeholder="请选择车辆品牌" :placeholder-style="style" @click="showSelect('carbrand')" />
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
					<u-checkbox-group active-color="#6DD99C" @change="radioGroupChange" shape="circle">
						<u-checkbox v-model="item.checked" v-for="(item, index) in checkboxList" :key="index" :name="item.name">
							{{ item.name }}
						</u-checkbox>
					</u-checkbox-group>
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
						 <u-input v-model="form.carnbumber" :border="true"/><text style="position: absolute;right: 10px;">辆</text>
					 </u-form-item>
			      </u-form>	
				<u-picker v-model="timeShow" mode="time" :params="params" @confirm="dataChange"></u-picker>
				<view style="text-align: center; padding: 26pt 20pt;">
					<u-button type="success" shape='circle' class="btn-agree" @click="toNext">下一步</u-button>
				</view>
			</view>
	    </view>
		<u-action-sheet :list="selectObj[selectObjType]" v-model="show" @click="actionSheetCallback"></u-action-sheet>
		<u-popup v-model="importShow" length="60%" >
			<!-- <view v-for="item in 10">出淤泥而不染，濯清涟而不妖</view> -->
			<view style="background-color: #f5f5f8;min-height: 100%;">
				<u-card :show-head="false" margin='0 0 20rpx' border-radius='0' padding='10' v-for="i in 10">
					<view class="" slot="body">
						<view class="u-flex u-row-between">
						 <image :src="src" class="card-img"></image>
						 <view class="u-line-2 card-title">
							 <view class="">
							 	吉利帝豪GL
							 </view>
							 <view>
							 	吉利帝豪GL 1.5L CVT运动版吉利帝豪GL 1.5L CVT运动版
							 </view>
						  </view>
						</view>
						<view>
							 <u-tag text="在租" type="success" mode="dark" class="tag-style"/>
							 <u-tag text="在售" type="success" mode="dark" class="tag-style"/>
							 <u-tag text="在招" type="success" mode="dark" class="tag-style"/>
							 <!-- <u-checkbox v-model="checked" shape="circle" active-color="#6DD99B"></u-checkbox> -->
						</view>
					</view>
					<view slot="foot" style="text-align: right;">
						<u-checkbox v-model="checked" shape="circle" active-color="#6DD99B"></u-checkbox>
					</view>
				</u-card>
				<view class="fixed-btn">
					<view class=" btn-inline">
					 <u-button type="success" class="btn-agree" style="width: 100%;" @click="toNext">选择完成</u-button>
					</view>
				</view>
			</view>
		</u-popup>
     </view>
</template>

<script>
import {requiredRule} from '@/common/rule.js'
import {mapGetters,mapActions} from 'vuex'
export default {
  data(){
	return {
		errorType:[
			'message'
		],
		checked:false,
		backTextStyle:{
			'color':'#ffffff'
		},
		src:'https://img12.360buyimg.com/n7/jfs/t1/102191/19/9072/330688/5e0af7cfE17698872/c91c00d713bf729a.jpg',
		style:"color:#000000",
		form:{
			carbrand:'',
			carmodel:'',
			carxinghao:'',
			cartype:'',
			power:'',
			businesstype:[],
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
		checkboxList: [{name: '网约车',checked:false},{name: '出租车',checked:false}],
		params: {
			year: true,
			month: true,
			day: true,
			hour: false,
			minute: false,
			second: false
		},
		// type:1,//标识（租赁1 转卖3）
		show: false,
		timeShow:false,
		importShow:false,
	}  
  },
  onReady() {
       this.$refs.uForm.setRules(this.rules);
       this.$refs.uForm2.setRules(this.rules);
  },
  computed:{
  	...mapGetters(['carPubType'])
  },
  mounted() {
 
  },
  methods: {
	  ...mapActions(['CARPUBFIRST']),
	showSelect(type){
		this.selectObjType = type;
		this.show = true;
	},  
	actionSheetCallback(index) {
		let type = this.selectObjType;
		let val = this.selectObj[type][index].text;
		if (type === 'carbrand' || type === 'carmodel') {
			this.getSelect(type)
		}
		this.form[type] = val;
	},
	getSelect(type){
		console.log(type)
	},
	radioGroupChange(e) {
		this.form.businesstype = e;
	},
	dataChange(obj){
		let companyDate = obj.year+"-"+obj.month+"-"+obj.day;
		this.form.firsttime = companyDate;
	},
    handleClick(){
        this.importShow = true;
    },
	toNext(){
		this.CARPUBFIRST(this.form)
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