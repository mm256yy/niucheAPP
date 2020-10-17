<template>
    <view>
		<u-navbar back-text="返回"  back-icon-size="0" title="卖车价格" :background="backgroundCom" :back-text-style="backTextStyle" height='44' title-color="#FFFFFF"></u-navbar>
		<view class="zlcontent" >
		   <view class="zlcontent-mid price-list" v-for="(item,index) in sellCarPrice" :key='index'>
			   <view style="font-size: 14pt;color: #000000;padding-bottom: 10pt;">价格{{index+1}}</view>
			   <view>
				<u-form :model="item" label-width="130">
				 <u-form-item label="起售量">
					  <u-input v-model="item.shoplow" type="number" @input="startValChange(index)" :clearable="false" :border="true" placeholder="请输入"/>
					  <text style="padding: 0 10pt;">至</text>
					  <u-input v-model="item.shophigh" type="number" @input="endValChange(index)" :clearable="false" :border="true" placeholder="请输入"/>
					  <text style="padding-left: 15pt;">台</text>
				 </u-form-item>
				 <u-form-item label="租金">
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
    </view>
</template>

<script>

import {mapGetters,mapActions} from 'vuex'
export default {
  data(){
	return {
		backTextStyle:{
			'color':'#ffffff'
		},
		show:false,
		sellCarPrice:[{
				shoplow:'',shophigh:'',packprice:''
			}
		],
		
	}  
  },
  computed:{
  	...mapGetters(['carPubThree'])
  },
  methods: {
	  ...mapActions(['CARPUBTHREE']),
	  addPriceObj(){
		this.sellCarPrice.push({
				shoplow:'',shophigh:'',packprice:''
			}) 
	 },
	 startValChange(index){
		 // let obj = this.sellCarPrice[index];
		 // let startV = Number(obj.startVal);
		 // let endV = Number(obj.endVal)
		 // if ( startV > endV && endV >0){
		 //    this.$set(this.sellCarPrice,index,{startVal:endV-1,endVal:endV,text:obj.text})
		 // }
	 },
	 endValChange(index){
		// let obj = this.sellCarPrice[index];
		// let startV = Number(obj.startVal);
		// let endV = Number(obj.endVal)
		// if ( endV < startV && startV >0){
		//    this.$set(this.sellCarPrice,index,{startVal:startV,endVal:startV+1,text:obj.text})
		// }
	 },
	toNext(){
		console.log(this.sellCarPrice)
		let obj = this.sellCarPrice[0];
		if (obj.shoplow === '' || obj.shophigh === '' || obj.packprice === '') {
			this.$u.toast('请填写完整');
			return
		}
		this.CARPUBTHREE(this.sellCarPrice)
		this.$u.route("/pages/company/lease/step/stepInterior/stepInterior")
	}
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