<template>
    <view class="wrap">
		<u-navbar back-text="返回"  back-icon-size="0" title="工作车型列表" :background="backgroundCom" 
		:back-text-style="backTextStyle" height='44' title-color="#FFFFFF"></u-navbar>
		<view class="zlcontent" style="margin-bottom: 20pt;">
		   <!-- <view class="zlyjdr" @click="handleClick">一键导入已有车辆为“在租”车辆</view> -->
		   <view @click="toNewCar" style="padding:10pt 10pt;">
		   	<u-icon name="plus-circle-fill" color="#6DD99B" size="40"></u-icon>
		   	<text style="vertical-align: top;">添加新车辆</text>
		   </view>
			<u-card :show-head="false" v-for="(item,index) in list" :key="index">
				<view style="position: relative;" slot="body">
					<view class="u-flex">
					 <image :src="item.carModelPhoto" class="card-img"></image>
					 <view class="u-line-2 card-title">
						 <view class="">
						 	 {{item.carBrand}} {{item.carmodel}}
						 </view>
						 <view>
						 	 {{item.CarBrand}} {{item.CarModel}} 
						 </view>
					 </view>
					</view>
					 <u-icon name="trash" color="#6DD99B" class="iconAbs" @click="delList(index)"></u-icon>
				</view>
			</u-card>
		<u-gap height="80" bg-color="#f5f5f8"></u-gap>
	    </view>
		<view class="fixed-btn">
			<view class="btn-inline">
			 <u-button type="success" class="btn-agree" style="width: 100%;" @click="toNext">完成</u-button>
			</view>
		</view>
		<!-- <ChildPopup  ref='importShow' :childType='childType' :carPubType='carPubType'  @handleId = 'getChildId'></ChildPopup> -->
		<auth></auth>
     </view>
</template>

<script>
// import ChildPopup from '@/components/importCar.vue'
import auth from '@/components/auth.vue'
export default {
  data(){
	return {
		errorType:[
			'message'
		],
		backTextStyle:{
			'color':'#ffffff'
		},
		list:[],
		importShow:false,
		childType:false,
		carPubType:2,
		carPubUpload:{},
	
	}  
  },
   components:{
	   // ChildPopup,
	   auth
   },
    onShow() {
	   this.initStorage()
	  let list = this.carPubUpload;
  	  if(list){
		 this.list = list
	  }
   },
  methods: {
	initStorage(){
		this.carPubUpload = uni.getStorageSync('carPubUpload');
	},
	setStorage(data){
		uni.setStorageSync('carPubUpload', data);
	},
	handleClick(){
		this.$refs.importShow.importShow = true
	},
	getChildId(item){
		let arr = this.list;
		item.forEach((info)=>{
			arr.push(info)
		})
		this.list =Array.from(new Set(arr)) 
        this.setStorage(this.list)
	},
	delList(index){
	   this.list.splice(index,1)
	   this.setStorage(this.list)	  
	},
	toNext(){
		this.setStorage(this.list)
		this.$u.route('/pages/company/recruit/recruit')
	},
	toNewCar(){
		this.$u.route('/pages/company/recruit/carOther/carOther')
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
.zlyjdr{
	background-image: url(@/static/leasebg.png);
	background-repeat: no-repeat;
	height: 40pt;
	line-height: 35pt;
	margin: 20pt 0;
	color: $u-bg-color;
}
/deep/ .u-border-bottom:after{
	border-bottom-width:0;
}
.u-card-wrap { 
	background-color: $u-bg-color;
	padding: 1px;
}
.card-img{
	width: 120rpx;
	flex: 0 0 120rpx;
	height: 120rpx;
	border-radius: 8rpx;
	margin-left: 12rpx;
	padding-right:15pt;
}
.card-title{
	// font-size: 16pt;
	color: #333;
	padding: 20rpx 10pt;
	position: relative;
	border-left: 1px solid #F5F5F7;

}
.iconAbs{
	position: absolute;
	right: 6pt;
	bottom: 0;	
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
	 padding: 0 20pt;
}
 .btn-agree{
	background: linear-gradient(55deg, $bg-grad-AB, $bg-grad-DDC);
 }
</style>