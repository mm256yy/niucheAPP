<template>
	<view class="detail">
		<u-navbar back-text="返回" back-icon-size="0" title="司机租车需求详情" :background="backgroundDri" 
		:back-text-style="backTextStyle" height='44' title-color="#FFFFFF">
		 </u-navbar>
		 <view class="list">
		 	<u-image class="left" width="152rpx" height="152rpx"  shape="circle" src="https://cdn.uviewui.com/uview/example/fade.jpg"></u-image>
		 	<view class="right">
				<u-icon class="reload" name="reload" color="#ffffff" size="50" @click="shared"></u-icon>
		 		<view class="name">吴司机</view>
				<view class="special">加急</view>
				<view class="clear"></view>
				<u-icon class="clock" name="clock"></u-icon>
		 		<view class="year">驾龄4年</view>
				<view class="clear"></view>
				<u-icon class="car" name="car" width="42" height="37"></u-icon>
		 		<view class="type">杭州出租车认证</view>
		 		<view class="clear"></view>
				<view class="box">
				    <view>准驾类型</view>
				    <view style="font-weight: bold;">C1</view>	
				</view>
		 	</view>
			<view class="clear"></view>
			<view class="time">刷新时间：刚刚</view>
		 </view>
		  <view style="color: #7F7F7F;text-align: right;padding:2pt 20pt;font-size: 12px;">*刷新需求可提高曝光率哦</view>
		 <view class="content">
<!-- 		 <u-cell-group >
			<u-cell-item :arrow="false" :title-style="titleStyle" :value-style="titleStyle"
			 value="1111" style="background-color: #F5F5F8;border-bottom: 0.5px solid rgba(0, 0, 0, 0.06);">
			   <view slot="title">
				  <view>1111</view>
				   <view>3333</view>
			  </view>
			</u-cell-item>
		 </u-cell-group> -->
		  <u-form label-width="150" label-align="left" :model="form" ref="uForm">
			<u-form-item label="是否允许租车公司主动联系我？" label-width="600">
				<u-input :disabled="true" height="80" input-align="right" v-model="form.name" />
			</u-form-item>  
			<u-form-item label="租车城市:">
				<u-input :disabled="true" height="80" input-align="right" v-model="form.name" />
			</u-form-item>
			<u-form-item label="业务类型:"><u-input :disabled="true" height="80" type="textarea" input-align="right" v-model="form.name" /></u-form-item>
			<u-form-item label="意向品牌:"><u-input :disabled="true" height="80" type="textarea" input-align="right" v-model="form.name" /></u-form-item>
			<u-form-item label="月租:"><u-input :disabled="true" height="80" type="textarea" input-align="right" v-model="form.name" /></u-form-item>
			<u-form-item label="行驶里程:"><u-input :disabled="true" height="80" type="textarea" input-align="right" v-model="form.name" /></u-form-item>
			<u-form-item label="动力类型:"><u-input :disabled="true" height="80" type="textarea" input-align="right" v-model="form.name" /></u-form-item>
		   </u-form>
		 </view>
		 <view class="fixed-btn" style="">
		   <view class="btn-inline">
				<view class="">
					<u-icon size="80" :name="xxSrc" @click="delSubmit"></u-icon>
				</view>
				<view class="btn-edit" @click="toNext">编辑</view>
				<view class="btn-edit">|</view>
				<view style="width: 30%;">
					<u-subsection :current="1" @change="switchChange(item)" vibrateShort button-color="#FE9B1C" 
					bg-color="#fff" active-color="#fff" :list="['公开', '不公开']"></u-subsection>
				</view>
           </view>
		 </view>
		 <u-modal v-model="showTips" @confirm="tipsConfirm"  confirm-text="我知道了">
		 	<view class="slot-content" style="padding: 10pt;font-size: 10pt;">
		         删除成功,点击我知道了,跳转到我的发布列表
		 	</view>
		 </u-modal>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				backTextStyle:{
					'color':'#ffffff'
				},
				driverDemandId:'',
				showTips:false,
				titleStyle:{'fontSize': '12pt','color':'#000000'},
				xxSrc:"../../../../static/lajitongshanchu.png",
				form: {
					name: '杭州'
				}
			}
		},
		onLoad(option) {
			let id = option.id;
			if(id){
			 this.driverDemandId = id;
			}
		},
		mounted() {
			this.getDetail();
		},
		methods: {
		    recommend() {
				this.$u.route("/pages/index/company/components/index/carRentRecommend")
			},
			switchChange(item){
				let isOpen = item.isOpen=== 0?1:0;
				this.$u.api.updateUserWantedState({driverDemandId:this.driverDemandId,isOpen:isOpen}).then(res=>{
					if(res.code === 200){
						 this.$u.toast(res.msg);
					}else {
						this.$u.toast(res.msg);
					}
				})
			},
			refresh(){
				this.$u.api.refreshUserJobWanted({driverDemandId:this.driverDemandId}).then(res=>{
					if(res.code === 200){
						 this.$u.toast(res.msg);
					}else {
						 this.$u.toast(res.msg);
					}
				})
			},

			delSubmit(){
				this.$u.api.getUserWanted({driverDemandId:this.driverDemandId}).then(res=>{
						if(res.code === 200){
							console.log(res)
						}else {
							 this.$u.toast(res.msg);
						}
					})
			},
			getDetail(){
				this.$u.api.getUserWanted({driverDemandId:this.driverDemandId}).then(res=>{
					if(res.code === 200){
						console.log(res)
					}else {
						 this.$u.toast(res.msg);
					}
				})
			},
			toNext(){
				this.$u.route("/pages/driver/myPub/children/children",{id:this.driverDemandId})
			},
			tipsConfirm(){
			   this.$u.route("/pages/driver/myPub/myPub",{index:0})
			},
			timeZ(value){
				let nowTime = new Date().getTime();
				let oneDay= 86400000;
				let timeDiff = nowTime-value;//时间差
				let tian =parseInt(timeDiff/oneDay);
				let day6 = oneDay*6;
				if(timeDiff>day6){
					return this.$u.timeFormat(value, 'yyyy-mm-dd');
				} else if (timeDiff>oneDay && timeDiff < day6){
					return tian+"天前"
				} else if (timeDiff<oneDay){
					return '刚刚'
				} else {
					console.log(timeDiff)
				 }
			},
			
		}
	}
</script>
<style lang="scss" scoped>
page{
	height: 100%;
	background-color: #F5F5F8;
}
	/deep/ .u-border-bottom:after{
		border-bottom-width:0;
	}
	.navbar-right {
		margin-right: 24rpx;
		display: flex;
	}
	.right-item {
		margin: 0 12rpx;
		position: relative;
		color: #ffffff;
		display: flex;
	}
	.detail {
		.list{
			width: 670rpx;
			height: 257rpx;
			padding: 40rpx;
			color: #fff;
			font-size: 20rpx;
			margin-left: 40rpx;
			margin-top: 40rpx;
			background: linear-gradient(115deg,#FE9217, #FCD03C);
			.clear {
				clear: both;
			}
			.left, .right{
				float: left;
			}
			.right {
				width: 432rpx;
				height: 152rpx;
				padding: 0 30rpx;
			}
			.name {
				font-weight: 900;
				font-size: 36rpx;
				float: left;
			}
			.special {
				width: 73rpx;
				height: 34rpx;
				line-height: 34rpx;
				text-align: center;
				border-radius: 16rpx;
				background: orange;
				font-size: 10rpx;
				float: left;
				margin-left: 16rpx;
				margin-top: 8rpx;
			}
			.clock,.year,.car,.type {
				float: left;
				margin-top: 6rpx;
			}
			.clock {
				font-size: 40rpx;
			}
			.car {
				font-size: 36rpx;
			}
			.year,.type {
				margin-left: 10rpx;
				margin-top: 10rpx;
			}
			.time {
				margin-top: 19rpx;
			}
			.box {
				background-color: #FFFFFF;
				overflow: hidden;
				margin-right: -25px;
				padding: 0 8px;
				float: right;
				color: #FE9217;
				margin-top: -32rpx;
				font-size: 32rpx;
			}
			.reload {
				float: right;
				margin-right: 10rpx;
				margin-top: -20rpx;
				margin-right: -60rpx;
			}
		}
		.content {
			font-size: 28rpx;
			font-weight: 900;
			padding: 40rpx;
			margin-bottom: 80px;
			.u-form-item{
				border-bottom: 1rpx solid rgba(0,0,0,0.06);
			}
		}
	}
	.fixed-btn{
	    box-sizing: border-box;
	    position: fixed;
	    left: 0;
	    bottom: 0;
	    width: 100%;
	    z-index: 98;
		background: linear-gradient(115deg,#FE9217, #FCD03C)
	}
	.btn-inline{
		display: flex;
		justify-content:space-around ;
		 flex-direction: row;
         padding: 10pt 0;
	}
	.btn-edit{
		
		height: 40px;line-height: 40px;color: #FFFFFF;
	}
</style>


