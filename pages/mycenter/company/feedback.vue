<template>
	<view class="feedback">
	  <u-navbar back-text="返回" back-icon-size="0" title="意见反馈" :background="backgroundCom" 
	   :back-text-style="backTextStyle" height='44' title-color="#FFFFFF"></u-navbar>
	   <view class="view-content">
	   	  <u-form :error-type="errorType" :model="form" ref="uForm" label-width="120" :border-bottom="false">
			<u-form-item label="反馈内容" label-position="top" prop="content">
				<u-input type="textarea" maxlength="300" style="width: 607rpx;line-height: 72rpx;border-radius: 30rpx;background: #fff;text-indent: 31rpx;" placeholder="请输入反馈内容" v-model="form.content" />
			</u-form-item>
			<u-form-item label="手机号" prop="phone">
				<u-input v-model="form.phone" type="number" style="height: 72rpx;line-height: 72rpx;border-radius: 30rpx;background: #fff;margin-right: 10rpx;text-indent: 31rpx;" placeholder="请输入"/>
			</u-form-item>
		  </u-form>
	   </view>
		<view class="bottom">
			<view class="btn" @click="release()">提交</view>
		</view>
	</view>
</template>

<script>
	import {requiredRule,phoneRule} from '@/common/rule.js'
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
					content:'',
					phone:''
				},
				rules:{
					content:requiredRule,
					phone:phoneRule
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
						this.$u.api.feedback(this.form).then(res=>{
								if(res.code === 200){
									this.form = {
							           content:'',
							           phone:''
						            };
									this.$u.toast(res.msg);
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
	margin-top: 20pt;padding: 0 10pt;
}
 .feedback {
	 .u-form{
		 width: 700rpx;
	 }
	 .bottom {
		 width: 750rpx;
		 height: 100rpx;
		 line-height: 100rpx;
		 text-align: center;
		 font-size: 36rpx;
		 font-weight: 900;
		 color: #fff;
		 background: linear-gradient(115deg,#6DD99C, #37AB63);
		 margin-top: 400rpx;
		 position: fixed;
		 left: 0;
		 bottom: 0;
	 }
 }
</style>
