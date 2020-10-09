<template>
    <view>
		<u-navbar back-text="返回"  back-icon-size="0" title="租车价格" :background="{}" :back-text-style="backTextStyle" height='44' title-color="#FFFFFF"></u-navbar>
		<view class="zlcontent" >
		   <view class="zlcontent-mid" style="margin: 20pt 0;">
			   <u-input v-model="value"  :border="true" />
			 <view style="font-size:10pt;">*“拼租价”为2人拼单（1人1辆车）时的价格。建议拼单时给予一定 </view>
			 <view style="font-size:10pt;"> 优惠有利于成交。拼单时长为发起后的3天。3天后未拼满则失败。</view>
		   </view>
		   
		   <view class="">
		   	 
		   </view>
	    </view>
		
		<view style="text-align: center; padding: 26pt 20pt;">
			<u-button type="success" shape='circle' class="btn-agree" @click="toNext">下一步</u-button>
		</view>

    </view>
</template>

<script>


export default {
  data(){
	return {
		backTextStyle:{
			'color':'#ffffff'
		},
		show:false,
		value:'',
		xttjList:[
			{text:'纯电动'},{text:'3厢5座'},{text:'手动'}
		],
		
	}  
  },
  methods: {
   confirm(){
	   if(this.value === ''){
		   this.$u.toast('请输入新标签内容')
		   setTimeout(() => {
                 this.$refs.uModal.clearLoading();
		   	}, 100)
		  return false
	   }
	   this.xttjList.push({text:this.value})
	   this.show = false;
    },
	
  }
}
</script>
<style lang="scss">
.scroll-container {height: 100%;}
page{
	background-image: url(@/static/lease.png);
	background-position: 40% 40%;
	background-repeat: no-repeat;
	height: 100%;
}
.zlyjdr{
	background-image: url(@/static/leasebg.png);
	background-repeat: no-repeat;
	height: 40pt;
	line-height: 35pt;
	margin: 20pt 0;
	color: #fff;
}
.zlcontent{

}
.zlcontent-mid{
	padding: 0 20pt;
}
 .btn-agree{
	background: linear-gradient(55deg, $bg-grad-AB, $bg-grad-DDC);
 }
</style>