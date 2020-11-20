<template>
    <view>
		<u-navbar back-text="返回"  back-icon-size="0" title="租车价格(3/3)" :background="backgroundCom" :back-text-style="backTextStyle" height='44' title-color="#FFFFFF"></u-navbar>
		<view class="zlcontent" >
		   <view class="zlcontent-mid" style="margin: 20pt 0;">
			   <u-form-item label="押金">
			   	 <u-input v-model="form.yamoney" :clearable="false" class="input-radius" :border="true" placeholder="请输入"/><text style="position: absolute;right: 10px;">元</text>
			   </u-form-item>
			 <view style="font-size:10pt;">*“拼租价”为2人拼单（1人1辆车）时的价格。建议拼单时给予一定 </view>
			 <view style="font-size:10pt;">优惠有利于成交。拼单时长为发起后的3天。3天后未拼满则失败。</view>
		   </view>
		   
		   <view class="zlcontent-mid price-list" v-for="(item,index) in form.rentCarPrice" :key='index'>
			   <view style="font-size: 14pt;color: #000000;padding-bottom: 10pt;">价格{{index+1}}</view>
			   <view>
				<u-form :model="item" label-width="150">
				 <u-form-item label="租赁周期">
				 	<u-input v-model="item.RentTime" class="input-radius" type="select" :border="true" placeholder="请选择租赁周期" @click="showDialog(index)" />
				 </u-form-item>
				 <u-form-item label="租金">
				 	 <u-input v-model="item.Rentprice" type="number" :clearable="false" :border="true" placeholder="请输入"/><text style="position: absolute;right: 10px;">元/月</text>
				 </u-form-item>
				</u-form>	
			   </view>
		   </view>
		   <u-action-sheet :list="list" v-model="show" @click="actionSheetCallback"></u-action-sheet>
		   <view @click="addPriceObj" style="padding: 20pt;">
		   	<u-icon name="plus-circle-fill" color="#6DD99B" size="40"></u-icon><text style="vertical-align: top;">添加价格</text>
		   </view>
	    </view>
		
		<view style="text-align: center; padding: 26pt 20pt;">
			<u-button type="success" shape='circle' class="btn-agree" @click="setForm">提交审核</u-button>
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
		list: [
			{value: '1',text: '1个月'},{value: '2',text: '3个月'}, {value: '3',text: '6个月'}, {value: '4',text: '12个月'}
		],
		form:{
		  yamoney:'',
		  rentCarPrice:[{RentTime:'',Rentprice:''}],	  
		},
		
		priceIndex:0,
		show:false,
		deposit:'',
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
		  yamoney:'',
		  rentCarPrice:[{RentTime:'',Rentprice:''}],	  
		}
	  },
	 actionSheetCallback(index) {
		let value = this.list[index].text;
		this.form.rentCarPrice[this.priceIndex].RentTime = value
	 },
	 showDialog(index){
		 this.priceIndex = index;
		 this.show = true;
	 },
	 addPriceObj(){
		 console.log(this.form.rentCarPrice)
		this.form.rentCarPrice.push({RentTime:'',Rentprice:''}) 
	 },
	 setForm(){
		 if (this.form.yamoney === ''){
			 this.$u.toast('请填写押金');
			 return
		 }
		 let obj = this.form.rentCarPrice[0];
		 if (obj.RentTime === '' || obj.Rentprice === ''){
			 this.$u.toast('请至少填写一个价格');
			 return
		 }
		this.toSubmit() 
	 },
	 toSubmit(){
		 let obj = Object.assign(this.carPubFirst,this.carPubSecond,this.form)
		  obj.businesstype = 3;
		  obj.mainbusinesstype = 1;
		 this.$u.api.saveMainBusiness(obj).then(res=>{
		 	if(res.code === 200){
		 		this.clearStorage()
		 		 uni.reLaunch({
		 		     url: '/pages/company/myPublish/myPublish?index=0'
		 		 });
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
	margin: 10pt 20pt;padding:10pt;background: #FFFFFF;
}
 .btn-agree{
	background: linear-gradient(55deg, $bg-grad-AB, $bg-grad-DDC);
 }
</style>