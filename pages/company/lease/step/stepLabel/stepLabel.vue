<template>
    <view>
		<u-navbar back-text="返回"  back-icon-size="0" title="车辆特色标签" :background="backgroundCom" :back-text-style="backTextStyle" height='44' title-color="#FFFFFF"></u-navbar>
		<view class="zlcontent" >
		   <view style="margin: 15pt 0;font-size:10pt;padding: 0 20pt;">
			 <view >* 根据您已经提交的车辆信息，您已经获得如下标签。</view>
			 <view > 这些标签自动授予，不可取消哦。</view>
			 <view > 若提交信息有误，请返回上一页修改。</view>
		   </view>
		   <view style="margin: 10pt 0;padding: 0 20pt;">
                <u-tag text="纯电动" type="info" class="tag-style"/><u-tag text="续航400公里" type="info" class="tag-style"/><u-tag text="SUV" type="info" class="tag-style"/>
		   </view>
		   <view class="tag-info">
			   <view class="tag-title">系统推荐标签</view>
			   <view>
				  <u-tag :text="item.text" :type="item.info" class="tag-style" @click="changeType(index,item.info,true)" mode="dark"  v-for="(item,index) in xttjList" :key="index"/>
			   </view>
			   
			   </view>
		   </view>
		   <u-gap height="80" bg-color="#f5f5f8"></u-gap>
		   <view class="tag-info" v-show="zdyList.length>0">
			   <view class="tag-title">自定义标签</view>
			   <view>
				  <u-tag :text="item.text" :type="item.info" mode="dark" @click="changeType(index,item.info,false)" v-for="(item,index) in zdyList" :key="index" class="tag-style"/>
			   </view>
		   </view>
		   <view style="margin: 5pt 0;padding: 0 20pt;"><text style="color: #FF0000">*</text>标签选中后为深色,取消选中为浅色。
	    </view>
		<view @click="showDialog" style="padding: 20pt;">
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
	  <u-modal v-model="showTips" confirm-text="我知道了">
	  		<view class="slot-content" style="padding: 10pt;font-size: 10pt;">
	  			“车辆特色标签”是指:用简短的文字描述车辆特色。例如“3厢5座”,"1.6T涡轮增压", "自动挡"等。您可自定义，也可选择系统推荐的标签。
	  		</view>
	  </u-modal>
    </view>
</template>

<script>
export default {
  data(){
	return {
		backTextStyle:{'color':'#ffffff'},
		show:false,
		showTips:true,
		value:'',
		xttjList:[{text:'3厢5座',info:'success'},{text:'手动',info:'success'}],
		zdyList:[{text:'纯电动',info:'info'},{text:'3厢5座',info:'info'},{text:'自动',info:'success'}]
		
	}  
  },
  methods: {
	changeType(index,type,flag){
		let info = type === 'info'?'success':'info' 
		if(flag){
			this.xttjList[index].info = info;
		} else {
			this.zdyList[index].info = info;
		}
	},
	showDialog(){
		this.value = '';
		this.show = true;
	},
    confirm(){
	   if(this.value === ''){
		   this.$u.toast('请输入新标签内容')
		   setTimeout(() => {
                 this.$refs.uModal.clearLoading();
		   	}, 100)
		  return false
	   }
	   this.zdyList.push({text:this.value,info:'info'})
	   this.show = false;
    },
	toNext(){
		this.$u.route("/pages/company/lease/step/stepCost/stepCost")
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
.tag-info{
	margin: 0 10pt;padding:10pt;background-color: #FFFFFF;
}
.tag-title{
	font-size: 16pt;color: #000000;padding-bottom: 10pt;
}
.tag-style{
	margin-right: 8pt;margin-bottom: 5pt;
}
.zlcontent{

}
/deep/ .u-border-bottom:after{
	border-bottom-width:0;
}
 .btn-agree{
	background: linear-gradient(55deg, $bg-grad-AB, $bg-grad-DDC);
 }
</style>