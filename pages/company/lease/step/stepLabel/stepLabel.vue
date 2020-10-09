<template>
    <view>
		<u-navbar back-text="返回"  back-icon-size="0" title="车辆特色标签" :background="{}" :back-text-style="backTextStyle" height='44' title-color="#FFFFFF"></u-navbar>
		<view class="zlcontent" >
		   <view class="zlcontent-mid" style="margin: 20pt 0;">
			 <view style="font-size:10pt;">* 根据您已经提交的车辆信息，您已经获得如下标签。</view>
			 <view style="font-size:10pt;"> 这些标签自动授予，不可取消哦。</view>
			 <view style="font-size:10pt;"> 若提交信息有误，请返回上一页修改。</view>
		   </view>
		   <view class="zlcontent-mid" style="padding-bottom: 15pt;">
                <u-tag text="纯电动" type="info" style="margin-right: 8pt;"/><u-tag text="续航400公里" type="info" style="margin-right: 8pt;"/><u-tag text="SUV" type="info" />
		   </view>
		   <view class="zlcontent-mid" style="margin: 0 20pt;padding:10pt;background: #FFFFFF;">
			   <view style="font-size: 16pt;color: #000000;padding-bottom: 10pt;">系统推荐标签</view>
			   <view>
				  <u-tag :text="item.text"  type="info" mode="dark" style="margin-right: 8pt;margin-bottom: 5pt;" v-for="(item,index) in xttjList" :key="index"/>
			   </view>
		   </view>
		   <u-gap height="80" bg-color="#f5f5f8"></u-gap>
		   <view class="zlcontent-mid" style="margin: 0 20pt;padding:10pt;background: #FFFFFF;">
			   <view style="font-size: 16pt;color: #000000;padding-bottom: 10pt;">自定义标签</view>
			   <view>
				  <u-tag :text="item.text"  type="info" mode="dark" style="margin-right: 8pt;margin-bottom: 5pt;" v-for="(item,index) in xttjList" :key="index"/>
			   </view>

		   </view>
	    </view>
		<view @click="show=true" style="padding: 20pt;">
			<u-icon name="plus-circle-fill" color="#6DD99B" size="40"></u-icon><text style="vertical-align: top;">添加自定义标签</text>
		</view>
		<view style="text-align: center; padding: 26pt 20pt;">
			<u-button type="success" shape='circle' class="btn-agree" @click="toNext">下一步</u-button>
		</view>
	  <u-modal v-model="show" @confirm="confirm" ref="uModal" :async-close="true" title="添加新标签" :show-cancel-button="true" confirm-text="添加" cancel-text="放弃">
		<view class="slot-content" style="padding: 10pt;">
			<u-input v-model="value"  :border="true" />
		</view>
	 </u-modal>
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
	toNext(){
		this.$u.route("/pages/company/lease/step/stepInterior/stepInterior")
	}
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
/deep/ .u-border-bottom:after{
	border-bottom-width:0;
}
.zlcontent-mid{
	padding: 0 20pt;
}
 .btn-agree{
	background: linear-gradient(55deg, $bg-grad-AB, $bg-grad-DDC);
 }
</style>