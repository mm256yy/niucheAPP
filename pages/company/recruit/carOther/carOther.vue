<template>
    <view class="wrap">
		<u-navbar back-text="返回"  back-icon-size="0" title="上传车辆其他" :background="backgroundCom" 
		:back-text-style="backTextStyle" height='44' title-color="#FFFFFF"></u-navbar>
		<view class="zlcontent">
			<u-form-item label="" prop="brand" label-width='0'>
				<u-input v-model="form.brand" class="input_select" type="select" :border="true" 
				placeholder="请选择车辆品牌"  @click="showSelect('brand')" />
				</u-form-item>
				<u-form-item label="" prop="system" label-width='0'>
					<u-input v-model="form.system" class="input_select" type="select" :border="true"
					 placeholder="请选择车系" @click="showSelect('system')" />
			</u-form-item>
	    </view>
		<view class="view-content">
		   <view class="top-content-upload" >
			<u-upload :custom-btn="true" :action="action" @on-success='uploadChange' upload-text="" :file-list="fileList" 
			:max-size="4 * 1024 * 1024" max-count="1" style="width: 100%;justify-content: center;" >
				<view slot="addBtn" class="slot-btn" hover-class="slot-btn__hover" hover-stay-time="150">
					<u-icon name="plus" size="60" :color="$u.color['lightColor']"></u-icon>
					<view class="slot-tips">
						<view>请上传车辆右前方或左前方45°照片</view>
					</view>
				</view>
			</u-upload>
		  </view>
		</view>
		<view class="view-content">
		   <view class="top-content-upload" >
			<u-upload :custom-btn="true" :action="action" @on-success='uploadChange' upload-text="" :file-list="fileList" 
			:max-size="4 * 1024 * 1024" max-count="1" style="width: 100%;justify-content: center;" >
				<view slot="addBtn" class="slot-btn" hover-class="slot-btn__hover" hover-stay-time="150">
					<u-icon name="plus" size="60" :color="$u.color['lightColor']"></u-icon>
					<view class="slot-tips">
						<view>请上传行驶证/运输证或二合一证件照片 </view>
					</view>
				</view>
			</u-upload>
		  </view>
		</view>
		<view class="view-content">
		   <view class="top-content-upload" >
			<u-upload :custom-btn="true" :action="action" @on-success='uploadChange' upload-text="" :file-list="fileList" 
			:max-size="4 * 1024 * 1024" max-count="1" style="width: 100%;justify-content: center;" >
				<view slot="addBtn" class="slot-btn" hover-class="slot-btn__hover" hover-stay-time="150">
					<u-icon name="plus" size="60" :color="$u.color['lightColor']"></u-icon>
					<view class="slot-tips">
						<view>请上传运输证件照片（如已上传二合一证请忽略） </view>
					</view>
				</view>
			</u-upload>
		  </view>
		</view>
		<view class="fixed-btn">
			<view class=" btn-inline">
			 <u-button type="success" class="btn-agree" style="width: 100%;" @click="toNext">完成</u-button>
			</view>
		</view>
		<u-action-sheet :list="selectObj[selectObjType]" v-model="show" @click="actionSheetCallback"></u-action-sheet>
     </view>
</template>

<script>

export default {
  data(){
	return {
		errorType:[
			'message'
		],
		selectObjType:'',
		selectObj:{
			brand:[],
			system:[]
		},
		backTextStyle:{
			'color':'#ffffff'
		},
		show:false,
		form:{
brand:'',system:''
		},
		action:'',
		fileList:[]
	
	}  
  },


  methods: {
	showSelect(type){
		this.selectObjType = type;
		this.show = true;
	}, 
	actionSheetCallback(index) {
		let type = this.selectObjType;
		let val = this.selectObj[type][index].text;
		if (type === 'brand' || type === 'system') {
			this.getSelect(type)
		}
		this.form[type] = val;
	},
	getSelect(type){
		console.log(type)
	},
	toNext(){
		
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
    bottom: 20pt;
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