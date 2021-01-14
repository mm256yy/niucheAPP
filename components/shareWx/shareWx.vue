<template>
	<view>
		<u-popup v-model="showShare" mode="bottom">
			<u-row justify="around" style="padding: 30rpx 0;">
				<u-col span="4" style="text-align: center;" @click="shared(item.method)" v-for="(item,index) in shareObject" :key="index">
					<view><u-icon :name="item.icon" size="60"></u-icon></view>
					<view>{{item.text}}</view>
				</u-col>
			</u-row>
			<!-- <view style="text-align: center;padding: 10rpx 0;">取消</view> -->
		</u-popup>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				 shareObject:[{
					 method:'WXSceneSession',icon:'@/static/weixin.png',text:'微信好友'
				 },{
					 method:'WXSenceTimeline',icon:'@/static/pengyouquan.png',text:'微信朋友圈'
				 },{
					 method:'qq',icon:'@/static/fuzhi.png',text:'QQ'
				 }],
				showShare:true
			}
		},
		props: {
		  href: {
		    type: String,
		    required: true,
			default: () => {
				return [];
			}
		  },
		  title:{
			  type:String,
			  required: true,
			  default: () => {
			  	return [];
			  }
		  },
		  summary:{
			  type:String,
			  required: true,
			  default: () => {
			  	return [];
			  }
		  },
		},
		methods: {
			shared(scene){
				let href = this.href;
				uni.share({
				    provider: "weixin",
				    scene: scene,
				    type: 0,
				    href: href,
				    title: this.title,
				    // summary: "我正在使用HBuilderX开发uni-app，赶紧跟我一起来体验！",
				    imageUrl: "https://img-cdn-qiniu.dcloud.net.cn/uniapp/images/uni@2x.png",
				    success: function (res) {
				        console.log("success:" + JSON.stringify(res));
				    },
				    fail: function (err) {
				        console.log("fail:" + JSON.stringify(err));
				    }
				});
			},
			copyd(){
				uni.setClipboardData({
				    data: 'hello',
				    success: function () {
				        console.log('success');
				    }
				});
			}
		}
	}
</script>

<style>

</style>
