<template>
	<view>
	  <u-navbar back-text="返回" back-icon-size="0" title="预览" :background="backgroundCom" :back-text-style="backTextStyle" title-color="#FFFFFF">
		<view class="navbar-right" slot="right">
			<view class="message-box right-item">
				<u-icon name="zhuanfa" color="#ffffff" size="40" @click="shared"></u-icon>
			</view>
		</view>
	  </u-navbar>
		<view class="" style="padding: 10pt;">
		  <scroll-view scroll-y style="height: 100%;width: 100%;">
			<view class="" style="background: #FFFFFF;padding: 20rpx;">	
				<u-row>
					<u-col span="12" style="text-align: right;"><u-icon name="heart-fill" color="#3FB26C" size="36"></u-icon>636</u-col>
						
					<u-col span="10">
						<view>高薪招聘网约车司机高薪招聘网约车司机</view>
					</u-col>
					<u-col span="10">
						<text>¥7000-10000 </text><text>月薪</text>
					</u-col>
					<u-col span="6">
						工作城市：杭州 
					</u-col>
					<u-col span="6">
						招聘：20人 
					</u-col>
					<u-col :span="12">
						<u-tag text="雪月夜" type="info" size="mini" style="margin-right: 5pt;margin-top: 5pt;" v-for="it in 5" :key="it"/>
					</u-col>
				</u-row>
		 	</view>
			<view style="margin-top: 20pt;">
                 <v-tabs v-model="current" :scroll="false" bgColor="#40B36C" lineHeight='0rpx' color="#ffffff" :pills="true" pillsColor="#ffffff" pillsBorderRadius="0rpx" activeColor="#000000" :tabs="['职位详情', '公司介绍']"></v-tabs>
			     <view class="" style="padding: 10pt;background: #FFFFFF;" v-show="current === 0">
 为什么要加入T3出行？ 更高的收入，多劳多得 我们提供（基础+提成+奖励+补贴）的薪酬体系，更有新人专享的保底薪资，每月发放5次薪水，只要够努力，就一定能打拼出属于自己的一片新天地； 司机薪资架构 基本工资、辛勤劳作奖励、流水奖励 冲单奖励、缴纳社保、充电补贴等。 更多的尊重，视你如家人 实力强大的合规平台，为每位司机提供完整的晋升体系和五险福利，让你时刻感受一家人的关怀和温暖； 更好的服务，无后顾之忧 我们提供全新的合规车辆，无需租金，车险和保养都由我们承担；只要带着一颗进取的心，即可加入我们。 全新网约车平台 一份稳定工作 央企背景、劳动合同、三证合规。 无需为车投入 车辆自营无需租金，灵活就业，平台维保； 更有社保关怀 劳动合同五险保障，入职即买，婚假丧假； 好司机好收入 优质司机流水奖励比例提高； 央企背景+社保+统一培训认证上岗+底薪+提成（周结） 有什么要求？ 1、取得驾驶证且拥有3年以上实际驾龄，驾驶技术娴熟，熟悉城市路况; 2、年龄在22周岁至55周岁之间。 3、较近连续3个记分周期内，每个记分周期无满12分记录； 4、无暴力犯罪记录，无交通肇事犯罪、危险驾驶犯罪记录，无吸毒记录，无酒驾记录，无精神病史； 5、退伍军人优先。 
				 </view>
				 <view style="padding: 10pt;background: #FFFFFF;" v-show="current === 1">

                                为什么要加入T3出行？


全新网约车平台

一份稳定工作 央企背景、劳动合同、三证合规。
无需为车投入 车辆自营无需租金，灵活就业，平台维保；
更有社保关怀 劳动合同五险保障，入职即买，婚假丧假；
好司机好收入 优质司机流水奖励比例提高；
央企背景+社保+统一培训认证上岗+底薪+提成（周结）

有什么要求？

1、取得驾驶证且拥有3年以上实际驾龄，驾驶技术娴熟，熟悉城市路况;
2、年龄在22周岁至55周岁之间。
3、较近连续3个记分周期内，每个记分周期无满12分记录；
4、无暴力犯罪记录，无交通肇事犯罪、危险驾驶犯罪记录，无吸毒记录，无酒驾记录，无精神病史；
5、退伍军人优先。
                            
				 </view>
			</view>
		  </scroll-view> 
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				backTextStyle:{
					'color':'#ffffff'
				},
				current: 0
			}
		},
		methods: {
			change(index) {
				this.current = index;
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
	// background-image: url(@/static/lease.png);
	background-repeat: no-repeat;
	height: 100%;
	background-size: cover;
	background-color:#f5f5f8 ;
	// background-position: 50% 50%;
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


