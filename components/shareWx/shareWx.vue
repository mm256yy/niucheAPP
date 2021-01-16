<template>
	<view class="share_poper">
		<u-popup v-model="showShare" mode="bottom">
			<u-row justify="around" style="padding: 30rpx 0;">
				<u-col span="4" style="text-align: center;" @click="shared(item.method)" v-for="(item,index) in shareObject" :key="index">
					<view><u-icon :name="item.icon" size="60"></u-icon></view>
					<view>{{item.text}}</view>
				</u-col>
			</u-row>
			<view class="poper_bottom" @click="showShare = false">取消</view>
		</u-popup>
	</view>
</template>

<script>
	export default {
		props: {
		  href: {//分享的链接
		    type: String,
		    required: true,
			default: () => {
				return '';
			}
		  },
		  title:{//分享的标题
			  type:String,
			  required: true,
			  default: () => {
			  	return '';
			  }
		  },
		  summary:{//分享的摘要
			  type:String,
			  required: true,
			  default: () => {
			  	return '';
			  }
		  },
		  imageUrl:{//图片地址
			  type:String,
			  required: true,
			  default: () => {
			  	return '';
			  }
		  }
		},
		data() {
			return {
				 shareObject:[{
					 method:'WXSceneSession',icon:'http://image.neocab.cn/icon_weixin.png',text:'微信好友'
				 },{
					 method:'WXSenceTimeline',icon:'http://image.neocab.cn/icon_pengyouquan.png',text:'微信朋友圈'
				 },{
					 method:'qq',icon:'http://image.neocab.cn/icon_qq.png',text:'QQ'
				 }],
				showShare:false
			}
		},
		methods: {
			shared(scene){
				let shareObj = {
					    scene: scene,
					    href: this.href,
					    title: this.title,
					    summary: this.summary,
					    imageUrl: this.imageUrl,
						};
				if (scene === 'qq') { //qq
					shareObj =Object.assign(shareObj,{
					    provider: 'qq',
					    type: 1,
					}) 
				} else if (scene === 'WXSenceTimeline' || scene === 'WXSceneSession'){//wechat
				    shareObj = Object.assign(shareObj,{
					    provider: 'weixin',
					    type: 0,
					})
				} else {//面对面
					
				}
				console.log(shareObj)
				// uni.share(shareObj);
			},
			shareShow(){
				this.showShare = !this.showShare
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

<style scoped class="less">
 .poper_bottom{
	 padding: 10px 0;
	 border-top: 1px solid #C0C4CC;
	 text-align: center;
	 font-size: 14px;
 }
</style>
