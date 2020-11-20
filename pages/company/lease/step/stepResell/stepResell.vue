<template>
    <view>
		<u-navbar back-text="返回"  back-icon-size="0" title="卖车价格(3/3)" :background="backgroundCom" :back-text-style="backTextStyle" height='44' title-color="#FFFFFF"></u-navbar>
		<view class="zlcontent" >
		   <view class="zlcontent-mid price-list" v-for="(item,index) in form.sellCarPrice" :key='index'>
			   <view style="font-size: 14pt;color: #000000;padding-bottom: 10pt;">价格{{index+1}}</view>
			   <view>
				<u-form :model="item" label-width="130">
				 <u-form-item label="起售量">
					  <u-input v-model="item.shoplow" type="number" @input="startValChange(index)" :clearable="false" :border="true" placeholder="请输入"/>
					  <text style="padding: 0 10pt;">至</text>
					  <u-input v-model="item.shophigh" type="number" @input="endValChange(index)" :clearable="false" :border="true" placeholder="请输入"/>
					  <text style="padding-left: 15pt;">台</text>
				 </u-form-item>
				 <u-form-item label="价格">
				 	 <u-input v-model="item.packprice" type="number" :clearable="false" :border="true" placeholder="请输入"/>
					 <text style="position: absolute;right: 10px;">元/台</text>
				 </u-form-item>
				</u-form>	
			   </view>
		   </view>
		   <view @click="addPriceObj" style="padding: 20pt;">
		   	<u-icon name="plus-circle-fill" color="#6DD99B" size="40"></u-icon><text style="vertical-align: top;">添加价格</text>
		   </view>
	    </view>
		<view style="text-align: center; padding: 26pt 20pt;">
			<u-button type="success" shape='circle' class="btn-agree" @click="toNext">下一步</u-button>
		</view>
		<auth></auth>
    </view>
</template>
<script>
import auth from '@/components/auth.vue'
export default {
	components:{
		auth
	},
  data(){
	return {
		backTextStyle:{
			'color':'#ffffff'
		},
		show:false,
		form:{
			sellCarPrice:[{
					shoplow:'',shophigh:'',packprice:''
				}
			],
		},
		editId:'',
		telephone:'',
		carPubType:'',
		carPubFirst:{},
		carPubSecond:{},
		carPubThree:{}
	}  
  },
  mounted() {
  	this.initStorage()
  	let id = uni.getStorageSync('editId');
  	if(id){
  		this.editId = id;
  		if(this.carPubFirst.isOneclickAndAdd === 3){
  			this.form = this.carPubThree;
  		}
  	}
  },
  methods: {
	  initStorage(){
		  this.telephone = uni.getStorageSync('telephone');
		  this.carPubType = uni.getStorageSync('carPubType');
		  this.carPubFirst = uni.getStorageSync('carPubFirst');
		  this.carPubSecond = uni.getStorageSync('carPubSecond');
		  this.carPubThree = uni.getStorageSync('carPubThree');
	  },
	  clearStorage(){
	  	uni.removeStorageSync('carPubType');
	  	uni.removeStorageSync('carPubFirst');
	  	uni.removeStorageSync('carPubSecond');
	  	uni.removeStorageSync('carPubThree');
	  	uni.removeStorageSync('editId');
	  	this.form = {
			sellCarPrice:[{
					shoplow:'',shophigh:'',packprice:''
				}
			],
		 }
	  },
	  addPriceObj(){
		this.form.sellCarPrice.push({
				shoplow:'',shophigh:'',packprice:''
			}) 
	 },
	 startValChange(index){
		 // let obj = this.form.sellCarPrice[index];
		 // let startV = Number(obj.startVal);
		 // let endV = Number(obj.endVal)
		 // if ( startV > endV && endV >0){
		 //    this.$set(this.form.sellCarPrice,index,{startVal:endV-1,endVal:endV,text:obj.text})
		 // }
	 },
	 endValChange(index){
		// let obj = this.form.sellCarPrice[index];
		// let startV = Number(obj.startVal);
		// let endV = Number(obj.endVal)
		// if ( endV < startV && startV >0){
		//    this.$set(this.form.sellCarPrice,index,{startVal:startV,endVal:startV+1,text:obj.text})
		// }
	 },
	toNext(){
		console.log(this.form.sellCarPrice)
		let obj = this.form.sellCarPrice[0];
		if (obj.shoplow === '' || obj.shophigh === '' || obj.packprice === '') {
			this.$u.toast('请填写完整');
			return
		}
		this.toSubmit()
	  },
	  toSubmit(){
		 let obj = Object.assign(this.carPubFirst,this.carPubSecond,this.form)
			  obj.businesstype = 1;
			  obj.mainbusinesstype = 3;
		  this.$u.api.saveMainBusiness(obj).then(res=>{
			if(res.code === 200){
			   this.clearStorage()
			   uni.reLaunch({ url: '/pages/company/myPublish/myPublish?index=2'});
			}else {
				 this.$u.toast(res.msg);
			}
		 })
	  },
  }
}
</script>
<style lang="scss">
.scroll-container {height: 100%;}
page{
	// background-image: url(@/static/lease.png);
	background-size: cover;
	background-repeat: no-repeat;
	background-color:#f5f5f8 ;
	height: 100%;
}
/deep/ .u-border-bottom:after{
	border-bottom-width:0;
}
.zlcontent{

}
.zlcontent-mid{
	padding: 0 20pt;
}
.input-radius{
	background: #FFFFFF;border-radius: 20pt;
}
.price-list{
	margin: 10pt;padding:8pt;background: #FFFFFF;
}
 .btn-agree{
	background: linear-gradient(55deg, $bg-grad-AB, $bg-grad-DDC);
 }
</style>