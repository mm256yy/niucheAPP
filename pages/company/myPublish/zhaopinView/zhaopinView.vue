<template>
	<view>
	  <u-navbar back-text="返回" back-icon-size="0" title="预览" :background="backgroundCom" :back-text-style="backTextStyle" title-color="#FFFFFF">
		<view class="navbar-right" slot="right">
			<view class="message-box right-item">
				<!-- <u-icon name="zhuanfa" color="#ffffff" size="40" @click="shared"></u-icon> -->
			</view>
		</view>
	  </u-navbar>
		<view class="" style="padding: 10pt;">
		  <scroll-view scroll-y style="height: 100%;width: 100%;">
			<view class="" style="background: #FFFFFF;padding: 20rpx;">	
				<u-row>
					<u-col span="12" style="text-align: right;">
						<u-icon name="heart-fill" color="#3FB26C" size="36"></u-icon>
						   <text style="color:#3FB26C ;padding-left: 5px;">{{obj.collectionnum}}</text>
					</u-col>
					<u-col span="10">
						<view style="font-size: 16pt;color: #000000;">{{obj.texttitle}}</view>
					</u-col>
					<u-col span="10" style="padding: 20rpx;">
						<text style="color: #40B36C;font-size: 16pt;padding-right: 5pt;font-weight: bold;">¥{{obj.pay}} </text><text>月薪</text>
					</u-col>
					<!-- <u-col span="12">
						工作城市：{{obj.city}}
					</u-col> -->
					<!-- <u-col span="1"></u-col> -->
					<u-col span="12" style="margin-top: 10rpx;">
						招聘人数：{{obj.invitepeoplenum}}人 
					</u-col>
				</u-row>
		 	</view>
			<view style="margin-top: 20pt;">
                 <v-tabs v-model="current" :scroll="false" @change="changeTab" activeColor="#ffffff"
				  lineHeight='0rpx' color="#000000" :pills="true" pillsColor="#40B36C" pillsBorderRadius="0rpx" 
				   :tabs="['职位详情', '公司介绍']"></v-tabs>
			     <view class="" style="padding: 10pt;background: #FFFFFF;min-height: 100pt;" v-show="current === 0">
						{{obj.jobText}}
				 </view>
				 <view style="padding: 10pt;background: #FFFFFF;min-height: 100pt;" v-show="current === 1">
                       {{obj.comparyIntroduce}}
				 </view>
			</view>
			<view style="font-size: 10pt;padding: 20pt 5pt;">面试地址：{{obj.city}}</view>
		  </scroll-view> 
		</view>
		 <PubBottom v-show="show" :isopen.sync="obj.isopen" :ids="inviteid" :type="2"></PubBottom>
	</view>
</template>

<script>
	import PubBottom from '@/components/pubBottom.vue'
	export default {
		components: {
			PubBottom
		  },
		data() {
			return {
				backTextStyle:{
					'color':'#ffffff'
				},
				inviteid:'',
				current: 0,
				obj:{},
				show: true
			}
		},
		onLoad(option) {
			this.inviteid = option.id;
			if(option.show){
				this.show = false
			}
		},
		mounted() {
			this.init()
		},
		methods: {
			changeTab(index) {
				this.current = index;
			},
			init(){
				this.$u.api.ComparyMyInviteForOne({inviteid:this.inviteid}).then(res=>{
					if(res.code === 200){
						this.obj = res.object
					}else {
						 this.$u.toast(res.msg);
					}
				})
			},
			shared(){
				uni.share({
				    provider: "weixin",
				    scene: "WXSenceTimeline",
				    type: 0,
				    href: "http://uniapp.dcloud.io/",
				    title: "uni-app分享",
				    summary: "我正在使用HBuilderX开发uni-app，赶紧跟我一起来体验！",
				    imageUrl: "https://img-cdn-qiniu.dcloud.net.cn/uniapp/images/uni@2x.png",
				    success: function (res) {
				        console.log("success:" + JSON.stringify(res));
				    },
				    fail: function (err) {
				        console.log("fail:" + JSON.stringify(err));
				    }
				});
			}
			
		}
	}
</script>
<style lang="scss">
page{
	height: 100%;
	background-color:#f5f5f8 ;
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
</style>


