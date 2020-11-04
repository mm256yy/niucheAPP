<template>
    <view class="wrap">
		<u-navbar back-text="返回"  back-icon-size="0" title="上传其他车辆" :background="backgroundCom" 
		:back-text-style="backTextStyle" height='44' title-color="#FFFFFF"></u-navbar>
		<view class="zlcontent">
			<u-form-item label="" prop="CarModel" label-width='0'>
				 <u-input v-model="form.CarModel" class="input_select" type="select" :border="true"
				  placeholder="请选择车辆品牌" @click="toCarList" />
		   	 	</u-form-item>
				<u-form-item label="" prop="CarXilie" label-width='0'>
					<u-input v-model="form.CarXilie" class="input_select" type="select" :border="true"
					 placeholder="请选择车系" @click="showSelect" />
			</u-form-item>
	    </view>
		<view class="zlcontent">正确的车辆照片和证件照片 可帮助您更快通过审核</view>
		<view class="view-content" v-for="(item,index) in uploadList" :key='index'>
		   <view class="top-content-upload" >
			<u-upload :custom-btn="true" :action="action" :header="headerObj" :form-data="formDataObj"
			@on-success='uploadChange' upload-text="" :file-list="item.fileList" :index="item.resName" :max-size="4 * 1024 * 1024" max-count="1" 
			style="width: 100%;justify-content: center;" >
				<view slot="addBtn" class="slot-btn" hover-class="slot-btn__hover" hover-stay-time="150">
					<u-icon name="plus" size="60" :color="$u.color['lightColor']"></u-icon>
					<view class="slot-tips">
						<view>{{item.tipText}}</view>
					</view>
				</view>
			</u-upload>
		  </view>
		</view>
		<view class="" style="height: 20pt;">
			
		</view>
		<view class="fixed-btn">
			<view class=" btn-inline">
			 <u-button type="success" class="btn-agree" style="width: 100%;" @click="toNext">添加</u-button>
			</view>
		</view>
		<u-select v-model="show" :list="carmodel" label-name='text' value-name='id' @confirm="actionSheetCallback"></u-select>
     </view>
</template>

<script>
	import {mapGetters,mapActions} from 'vuex'
	import {action} from '@/utils/constant.js'
export default {
  data(){
	return {
		errorType:['message'],
		carmodel:[],
		backTextStyle:{'color':'#ffffff'},
		show:false,
		form:{
			CarModel:'',CarXilie:'',
			onephoto:'',CarNamePlate:'',drivephoto:'',TransportationCard:''
		},
		action: action,
		headerObj:{Authorization:''},
		formDataObj:{phone:''},
		uploadList:[
			{fileList:[],tipText:'请上传车辆右前方或左前方45°照片',resName:'onephoto'},
			{fileList:[],tipText:'请上传车辆铭牌',resName:'CarNamePlate'},
			{fileList:[],tipText:'请上传行驶证/运输证或二合一证件照片',resName:'drivephoto'},
			{fileList:[],tipText:'请上传运输证件照片（如已上传二合一证请忽略）',resName:'TransportationCard',},
		],
	
	}  
  },
  onLoad(option) {
  	let index = option.id;
	if(index){
		 this.form.CarModel =option.text;
		 this.getSelectFirst(index)
	}
  },
  computed:{
  	...mapGetters(['token','telephone','carPubUpload'])
  },
  mounted() {
  	this.setPicToken()
  },
  methods: {
	  ...mapActions(['CARPUBUPLOAD']),
	  setPicToken(){
		this.headerObj.Authorization = this.token;
		this.formDataObj.phone = this.telephone;
	  },
	  uploadChange(data, index, lists, name){
		this.form[name] = data.text;
	  },
	 getSelectFirst(id){
		this.$u.api.getCarSystem({parentid:id}).then(res=>{
			if(res.code === 200){
				 this.carmodel = res.alibabaCarModelVoList;
			}else {
				 this.$u.toast(res.msg);
			}
		}).catch(res=>{this.$u.toast(res.msg)})
	  },
	actionSheetCallback(index) {
	  	let val = index[0].label;
	  	this.form.CarXilie = val;
	  },
	showSelect(){
		this.show = true;
	},
	toCarList(){
		this.$u.route('/pages/company/lease/carList/carList',{source:2}) 
	}, 
	toNext(){
		 let list = this.carPubUpload || [];
		 console.log(list)
		 this.$u.api.getCarLogo({CarBrand:this.form.CarModel,CarModel:this.form.CarXilie}).then(res=>{
		 	if(res.code === 200){
				let data = this.form;
				data.carModelPhoto = res.data;
		 		 list.push(data)
				 this.CARPUBUPLOAD(list)
				 this.$u.route('/pages/company/recruit/carModel/carModel') 
		 	}else {
		 		 this.$u.toast(res.msg);
		 	}
		 }).catch(res=>{this.$u.toast(res.msg)})
	}
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
.input_select{
	background: #FFFFFF;border-radius: 40rpx;
}
.zlcontent{
	padding: 0 20pt;
}
.view-content{
	margin-top: 20pt;padding: 0 20pt;
}
.top-content-upload{
	border: 1px dotted #dedede;
	width: 100%;
	background: #FFFFFF;
	position: relative;
	height: 118pt;
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
.slot-tips{
	position: absolute;top: 62pt;font-size: 10pt;text-align: center;
}
.fixed-btn{
    box-sizing: border-box;
    position: fixed;
    left: 0;
    bottom: 10pt;
    width: 100%;
    z-index: 98;
}
.btn-inline{
	display: flex;
	justify-content: center;
	 flex-direction: row;
	 padding:0 40pt ;
}
 .btn-agree{
	background: linear-gradient(55deg, $bg-grad-AB, $bg-grad-DDC);
 }
</style>