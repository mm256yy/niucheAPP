<template>
	<view class="search">
	  <u-navbar back-text="返回" back-icon-size="0" title="意见反馈" :background="backgroundDri" 
	   :back-text-style="backTextStyle" height='44' title-color="#FFFFFF"></u-navbar>
	   <view class="view-content">
	   	  <u-form :error-type="errorType" :model="form" ref="uForm" label-width="120" :border-bottom="false">
			<u-form-item label="标题" prop="title">
				<u-input class="inp" maxlength="2" type="number" style="height: 72rpx;line-height: 72rpx;border-radius: 30rpx;background: #fff;margin-right: 10rpx;text-indent: 31rpx;" placeholder="请输入" v-model="form.title" />
			</u-form-item>
			<u-form-item label="反馈内容" label-position="top" prop="content">
				<u-input type="textarea" maxlength="50" style="width: 607rpx;line-height: 72rpx;border-radius: 30rpx;background: #fff;text-indent: 31rpx;" placeholder="请输入反馈内容" v-model="form.content" />
			</u-form-item>
			<u-form-item label="手机号" prop="telephone">
				<u-input v-model="form.telephone" type="number" style="height: 72rpx;line-height: 72rpx;border-radius: 30rpx;background: #fff;margin-right: 10rpx;text-indent: 31rpx;" placeholder="请输入"/>
			</u-form-item>
		  </u-form>
	   </view>
		<view class="bottom">
			<view class="btn" @click="release()">提交</view>
		</view>
	</view>
</template>

<script>
	import {requiredRule} from '@/common/rule.js'
	export default {
		data() {
			return {
				backTextStyle:{
					'color':'#ffffff'
				},
				errorType:[
				  'message'
				],
				form:{
					businessType:1,
					isOpen: 1,
					monthprice:'',
					myok:'',
					taxiExperience:'',
					welfare:'',
					workexperience:'',
					worktime:'',
					workCity: '杭州'
				},
				rules:{
					monthprice:requiredRule,
					taxiExperience:requiredRule,
					workexperience:requiredRule,
					worktime:requiredRule
				}
			}
		},
		onReady() {
		     this.$refs.uForm.setRules(this.rules);
		},
		methods: {
			release(){
				this.$refs.uForm.validate(valid => {
					if (valid) {
						this.$u.api.releaseSearch(this.form).then(res=>{
								if(res.code === 200){
									this.showTips = true;
									this.form = {
							           businessType:1,
							           isOpen: 1,
							           monthprice:'',
							           myok:'',
							           taxiExperience:'',
							           workexperience:'',
							           worktime:'',
							           workCity: '杭州'
						            };
								    this.benefitList.forEach(item => {
									      item.checked=false;
								    })
								}else {
									this.$u.toast(res.msg);
								}
							})
						}
				});
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

.view-content{
	.public {
		color:rgb(126, 126, 126);
		margin-top: -10rpx;
		margin-bottom: 10rpx;
	}
	
	.rules {
		width: 630rpx;
		height: 71rpx;
		background: rgba(0,0,0,0.04);
		margin-left: 10rpx;
		font-size: 20rpx;
		color:rgb(126, 126, 126);
		padding: 4rpx;
	}
	.more {
		width: 630rpx;
		height: 71rpx;
		line-height: 71rpx;
		background: rgba(0,0,0,0.04);
		font-size: 20rpx;
		color:rgb(126, 126, 126);
		margin-left: 10rpx;
		padding-left: 16rpx;
	}
	margin-top: 20pt;padding: 0 10pt;
	.name {
		padding: 39rpx;
		width: 670rpx;
		height: 148rpx;
		font-size: 28rpx;
		background: #fff;
	}
}
 .btn-agree{
	background: linear-gradient(115deg, $bg-grad-FE, $bg-grad-FCD);
 }
 .search {
	 .u-form{
		 width: 700rpx;
	 }
	 .u-slot-content {
		 width: 100rpx;
		 color: #fff;
		 float: right;
	 }
	 .bottom {
		 width: 750rpx;
		 height: 100rpx;
		 line-height: 100rpx;
		 text-align: center;
		 font-size: 36rpx;
		 font-weight: 900;
		 color: #fff;
		 background: linear-gradient(115deg, $bg-grad-FE, $bg-grad-FCD);
		 margin-top: 400rpx;
	 }
	 .total {
		 line-height: 80rpx;
		 margin-left: 20rpx;
		 float: left;
	 }
 }
</style>
