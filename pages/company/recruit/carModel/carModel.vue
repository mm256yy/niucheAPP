<template>
    <view class="wrap">
		<u-navbar back-text="返回"  back-icon-size="0" title="工作车型列表" :background="backgroundCom" 
		:back-text-style="backTextStyle" height='44' title-color="#FFFFFF"></u-navbar>
		<view class="zlcontent">
		   <view class="zlyjdr" @click="handleClick">一键导入已有车辆为“在租”车辆</view>
			<u-card :show-head="false" v-for="(item,index) in list" :key="index">
				<view style="position: relative;" slot="body">
					<view class="u-flex">
					 <image :src="item.carModelPhoto" class="card-img"></image>
					 <view class="u-line-2 card-title">
						 <view class="">
						 	 {{item.carBrand}} {{item.carModel}} {{item.carxinghao}}
						 </view>
						 <view>
						 	 {{item.CarBrand}} {{item.CarModel}} {{item.CarXilie}}
						 </view>
					 </view>
					</view>
					 <u-icon name="trash" color="#6DD99B" class="iconAbs" @click="delList(index)"></u-icon>
				</view>
			</u-card>
			<view @click="toNewCar" style="padding:10pt 10pt;">
				<u-icon name="plus-circle-fill" color="#6DD99B" size="40"></u-icon>
				<text style="vertical-align: top;">添加新车辆</text>
			</view>
	    </view>
		<view class="fixed-btn">
			<view class=" btn-inline">
			 <u-button type="success" class="btn-agree" style="width: 100%;" @click="toNext">完成</u-button>
			</view>
		</view>
		<ChildPopup  ref='importShow' :childType='childType' :carPubType='carPubType'  @handleId = 'getChildId'></ChildPopup>
     </view>
</template>

<script>
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
		list:[],
		importShow:false,
		childType:false,
		carPubType:2,
	
	}  
  },
   components:{ChildPopup},
  computed:{
  	...mapGetters(['carPubUpload'])
  },
 mounted() {
	 this.list = this.carPubUpload;
 	console.log('ab')
 },
  methods: {
	...mapActions(['CARPUBUPLOAD']),
	handleClick(){
		this.$refs.importShow.importShow = true
	},
	getChildId(item){
		console.log(item)
		item.forEach((info)=>{
			this.list.push(info)
		})
        this.CARPUBUPLOAD(this.list)
	},
	delList(index){
	   this.list.splice(index,1)
	   this.CARPUBUPLOAD(this.list)	  
	},
	toNext(){
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
    bottom: 20pt;
    width: 100%;
    z-index: 98;
}
.btn-inline{
	display: flex;
	justify-content: center;
	 flex-direction: row;
	 padding: 30pt;
}
 .btn-agree{
	background: linear-gradient(55deg, $bg-grad-AB, $bg-grad-DDC);
 }
</style>