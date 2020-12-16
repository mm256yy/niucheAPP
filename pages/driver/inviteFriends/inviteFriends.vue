<template>
	<view style="padding: 0 20pt;">
		<u-navbar back-text="返回" back-icon-size="0" title="邀请好友" height='44' title-color="#333333">
			<view class="navbar-right" slot="right">
				<view class="message-box right-item">
					<text @click="showTips">规则</text>
				</view>
			</view>
		</u-navbar>
		<view class="flex_view">
			<view class="bgImg-common oneImg">
				<view class="bgImg-common yqhy" @click="inviteFriends">立即邀请好友助力</view>
			</view>
			<view style="position: relative;" class="bgImg-common wdjl">
				<text style="position: absolute;top: 100pt;left: 81pt;z-index: 8;">20</text>
				<text style="position: absolute;top: 100pt;right: 51pt;z-index: 8;">20</text>
			</view>
			<view class="bgImg-common hdsm">
				
			</view>
			<view class="bgImg-common jlmx">
				
			</view>
			<view class="bgImg-common jlsm">
				
			</view>
		</view>
		<u-popup v-model="show" mode="right" border-radius="14" length="70%">
			<view style="padding: 14px 20px;color: #939393;">
				<view style="color:#000000 ;font-size: 16px;padding: 10px 0;font-weight: bold;">
					补充说明
				</view>
				<view style="padding-bottom: 20px;">
					1.如参与纽车拉新的用户出现任何违规行为（如作弊领取拉新费用等），一经发现，纽车有权视行为严重程度采取取消参与活动资格、取消或扣掉拉新奖励等措施。
				</view>
				<view style="padding-bottom: 20px;">
					2.如出现不可抗力或情势变更的情况（如重大灾害事件、活动受政府机关指令需要停止举办或调整的、活动遭受严重网络攻击或因系统故障需要暂停举办的），
					则纽车可依相关法律法规等规定主张免责。</view>
				<view style="padding-bottom: 20px;">
					3.纽车可根据活动的实际举办情况依法依规对活动规则进行变更或调整（如有），相关变动或调整将公布在活动页面上或以合适的方式及时通知。
				</view>
				<view style="padding-bottom: 20px;">
					4.若您获得的奖金需依法缴纳相应税款，纽车将根据税务法律法规要求向税务机关提供必要的税务申报信息（包括您的身份信息、奖金金额等税务机关要求的信息），并由纽车依法为您完成相应税款的代扣代缴。
				</view>
				<view style="padding-bottom: 20px;">
					5.有问题请咨询客服
				</view>
				<view style="text-align: center;color: #3E3D3E;font-size: 12px;">
					最终解释权归纽车（杭州）科技有限公司
				</view>
			</view>
		</u-popup>
	</view>
</template>
<script>
	export default {
		data() {
			return {
               show:false,
			   shareId:''
			}
		},
		onLoad(option) {
			let shareId  = option.shareId;
			if(shareId){
			 this.shareId = shareId;
			} else{
				this.initId()
			} 
		},
		methods: {
			inviteFriends() {
				 uni.share({ 
					provider: "weixin",
					scene: "WXSceneSession",
					type: 0,
					href: "http://dev-share.neocab.cn?shareId="+this.shareId,
					title: "看车租车上纽车APP",
					summary: "限时推广拉新，享更多福利，点击即可领取！",                         
					imageUrl: "http://niuche-default.neocab.cn/256_256.png",
					success: function(res) {
						console.log("success:" + JSON.stringify(res));
					},
					fail: function(err) {
						console.log("fail:" + JSON.stringify(err));
					}
				});
			},
			initId(){
				this.$u.api.listUserMessage().then(res=>{
					if(res.code === 200){
						let data = res.object;
						if (data.shareId){
							 this.shareId = data.shareId; 
						}
					}else {
						 this.$u.toast(res.msg);
					}
				})
			},
			showTips(){
				this.show = true
			}
		}
	}
</script>

<style lang="scss">
	page {
		background-image: url(../../../static/beijing.png);
		background-position: center;
		background-repeat: no-repeat;
		// background-size: contain;
	}
</style>
<style lang="scss" scoped>
	.navbar-right {
		margin-right: 24rpx;
		display: flex;
	}
    .bgImg-common{
		background-position: center;
		background-repeat: no-repeat;
		background-size: 100%;
	}
	.right-item {
		margin: 0 12rpx;
		position: relative;
		color: #555555;
		display: flex;
	}
	.oneImg {
		background-image: url(../../../static/toutu@2x.png);
		min-height: 420pt;
		height: 100%;
		position: relative;
	}
	.yqhy {
		background-image: url(../../../static/yuanjiaojuxing@2x.png);
		min-height: 70pt;
		width: 160pt;
		position: absolute;
		top: 225pt;
		left: 39pt;
		text-align: center;
		line-height: 60pt;
		color: #FFFFFF;
	}
    .wdjl{
		background-image: url(../../../static/wodejianglijindu@3x.png);
		min-height: 200pt;
	}
	.hdsm{
		background-image: url(../../../static/huodongzhuoming@3x.png);
		min-height: 290pt;
	}
	.jlmx{
		background-image: url(../../../static/jianglimingxi@3x.png);
		min-height: 240pt;
	}
	.jlsm{
		background-image: url(../../../static/jianglishuoming@3x.png);
		min-height: 300pt;
	}
	.flex_view {
		// min-height: 40vh;

	}
</style>
