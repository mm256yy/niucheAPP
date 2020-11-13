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
					<u-tag :text="item" type="info" class="tag-style" v-for="(item,index) in xttjList" :key="index"/>
			</view>
		   </view>
		   <u-gap height="40" bg-color="#f5f5f8"></u-gap>
		   <view class="tag-info" v-show="zdyList.length>0">
			   <view class="tag-title">自定义标签</view>
			   <view>
				  <u-tag :text="item.text" :type="item.info" mode="dark"
				   @click="changeType(index,item.info)" v-for="(item,index) in zdyList" :key="index" class="tag-style"/>
			   </view>
		   </view>
		   <view style="margin: 5pt 0;padding: 0 20pt;"><text style="color: #FF0000">*</text>标签选中后为深色,取消选中为浅色。
	    </view>
		<view @click="showDialog" style="padding: 20pt;">
			<u-icon name="plus-circle-fill" color="#6DD99B" size="40"></u-icon><text style="vertical-align: top;">添加自定义标签</text>
		</view>
		<view style="text-align: center; padding: 26pt 20pt;">
			<u-button type="success" shape='circle' class="btn-agree" @click="setForm">下一步</u-button>
		</view>
	  <u-modal v-model="show" @confirm="confirm" ref="uModal" :async-close="true" title="添加新标签" :show-cancel-button="true" 
	  confirm-text="添加" cancel-text="放弃">
		<view class="slot-content" style="padding: 10pt;">
			<u-input v-model="value"  :border="true" />
		</view>
	  </u-modal>
	  <u-modal v-model="showTips" confirm-text="我知道了">
	  		<view class="slot-content" style="padding: 10pt;font-size: 10pt;">
	  			“车辆特色标签”是指:用简短的文字描述车辆特色。例如“3厢5座”,"1.6T涡轮增压", "自动挡"等。您可自定义，也可选择系统推荐的标签。
	  		</view>
	  </u-modal>
	  <NotLogin></NotLogin>
	  <auth></auth>
    </view>
</template>

<script>
	import NotLogin from '@/components/notlogin/notlogin.vue'
	import auth from '@/components/auth.vue'
export default {
	components:{
		NotLogin,
		auth
	},
  data(){
	return {
		backTextStyle:{'color':'#ffffff'},
		show:false,
		showTips:true,
		value:'',
		xttjList:[],
		zdyList:[],
		carPubFirst:{},
		carPubSecond:{},
		carPubType:1
		
	}  
  },
  onShow() {
	  this.initStorage()
	  let id = uni.getStorageSync('editId');
	  if(id){
		   this.xttjList = this.carPubSecond.SystemTag
		   let list = this.carPubSecond.UserTag;
		   list.forEach(item=>{
			   this.zdyList.push({text:item,info:'success'})
		   })
	  }else {
		  this.getSysTags()
	  }
  },
  methods: {
	initStorage(){
		this.carPubFirst = uni.getStorageSync('carPubFirst');
		this.carPubSecond = uni.getStorageSync('carPubSecond');
		this.carPubType = uni.getStorageSync('carPubType');
	},
	setStorage(data){
		  uni.setStorageSync('carPubSecond', data);
	},
	 getSysTags(){
		let data = this.carPubFirst;
		let obj = {	cartype:data.cartype,power:data.power,firsttime:data.firsttime,firstkm:data.firstkm,endKm:data.endKm};
		this.$u.api.getSystemTag(obj).then(res=>{
			if(res.code === 200){
				this.xttjList = res.systemTagVo;
			}else {
				 this.$u.toast(res.msg);
			}
		})
	},
	changeType(index,type){
		let info = type === 'info'?'success':'info' 
			this.zdyList[index].info = info;
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
	setForm(){
		let that = this;
		let zdylist = []
		this.zdyList.forEach((item)=>{
			if(item.info === 'success'){
				zdylist.push(item.text)
			}
		})
		let data = {SystemTag:this.xttjList,UserTag:zdylist}
        this.setStorage(data)
		if(this.carPubType === 1) {
			this.$u.route("/pages/company/lease/step/stepCost/stepCost")
		} else {
			this.$u.route("/pages/company/lease/step/stepResell/stepResell")
		}
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