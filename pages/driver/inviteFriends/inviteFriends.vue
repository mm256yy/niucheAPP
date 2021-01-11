<template>
	<view>
		<u-navbar back-text="返回" back-icon-size="0" :background="background" title="邀请好友" height='44' title-color="#333333"></u-navbar>
		<view class="view_content" style="position: relative;">
			<view style="position: absolute;
				right: 0;
				width: 30px;
				top: 150px;
				background: linear-gradient(91deg, #FFD328 0%, #FFBC3F 99%);
				border-radius: 6px 0px 0px 6px;
				color: #9E6138;
				text-align: center;"
			 @click="showTips()">
				<view style="display: flex;flex-direction: column;">
					<text>规</text>
					<text>则</text>
				</view>
			</view>
			<view class="flex_view">

				<view class="" style="position: relative;">
					<view class="yqhy" @click="inviteFriends">立即邀请好友助力</view>
				</view>
				<view style="padding: 0 10pt;margin: 210px 0 20px;">
					<view class="" style="background: #FFFFFF;padding: 15px;border-radius: 10px;">
						<view @click="toCashAccount()" class="wdsy" style="display: flex;justify-content: space-between;background: #FFF7F2;padding: 15px;color: #FF652B;border-radius: 6px;">
							<view>我的收益<text style="color: #FF2B49;font-size: 16px;">{{myAccount}}</text>元</view>
							<view>去提现<u-icon name="arrow-right"></u-icon>
							</view>
						</view>
					</view>
					<view style="position: relative;" class="bgImg-common wdjl">
						<view style="position: absolute;top: 51%;left: 28%;z-index: 8;">
							<view style="color: #FF652B;">驾照认证</view>
							<view><text style="font-size: 16px;color: #FF3333;">{{registerCount}}</text><text style="color: #FF2B49;">人</text></view>
						</view>
						<view style="position: absolute;top: 51%;right: 10%;z-index: 8;">
							<view style="color: #FF652B;">执业认证</view>
							<view style="font-size: 16px;color: #FF3333;"><text>{{authCount}}</text><text style="color: #FF2B49;">人</text></view>
						</view>
					</view>
					<view class="">
						<u-image src="@/static/ruhezhaunqushangjin@3x.png" width="100%" height="470px"></u-image>

					</view>
					<view style="margin-top: 22px;">
						<u-image src="@/static/ruhezhaunqushangjin2@3x.png" width="100%" height="470px"></u-image>
					</view>
					<view style="margin-top: 22px;">
						<u-image src="@/static/jianglimingxi@3x.png" width="100%" height="687px"></u-image>
					</view>

				</view>
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
		<Auth></Auth>
	</view>
</template>
<script>
	import Auth from '@/components/auth.vue'
	import {
		shareUrl
	} from '@/utils/constant.js'
	export default {
		components:{
			Auth
		},
		data() {
			return {
				background: {
					'background-image': 'linear-gradient(to bottom, #000000 34%,#ffffff 0%)'
				},
				show: false,
				shareId: '',
				registerCount: 0,
				authCount: 0,
				myAccount:0
			}
		},
		onLoad(option) {
			let shareId = option.shareId;
			if (shareId) {
				this.shareId = shareId;
			} else {
				this.initId()
			}
		},
		onShow() {
			this.getNumber()
		},
		methods: {
			toCashAccount(){
				let token = uni.getStorageSync('token')
				if (token){
					this.$u.route("/pages/driver/cashAccount/cashAccount",{money:this.myAccount})
				}else{
					this.toLogin()
				}
			},
			inviteFriends() {
				uni.share({
					provider: "weixin",
					scene: "WXSceneSession",
					type: 0,
					href: shareUrl + this.shareId,
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
			getNumber() {
				this.$u.api.statistics({
					shareId: this.shareId
				}).then(res => {
					if (res.code === 200) {
						let data = res.object;
						this.authCount = data.certAuthNum
						this.registerCount = data.driverAuthNum;
						this.myAccount = data.account;
					} else {
						this.$u.toast(res.msg)
					}
				}).catch(res => {
					this.$u.toast(res.msg)
				})
			},
			initId() {
				this.$u.api.listUserMessage().then(res => {
					if (res.code === 200) {
						let data = res.object;
						if (data.shareId) {
							this.shareId = data.shareId;
						}
					} else {
						this.$u.toast(res.msg);
					}
				})
			},
			showTips() {
				this.show = true
			}
		}
	}
</script>

<style lang="scss">
	page {
		background-image: url(../../../static/c@3x.png);
		background-repeat: no-repeat;
		background-size: 100%;
	}
</style>
<style lang="scss" scoped>
	.bgImg-common {
		background-position: center;
		background-repeat: no-repeat;
		background-size: 100%;
	}

	.flex_view {
		position: absolute;
		top: 400px;
		width: 100%;
	}

	.yqhy {
		background: linear-gradient(0deg, #FFCC33 0%, #FFCC33 100%);
		box-shadow: -1px 3px 0px 0px #FF6633;
		border-radius: 20px;
		width: 68%;
		position: absolute;
		top: 60px;
		left: 18.5%;
		text-align: center;
		line-height: 50px;
		color: #FB0F37;
	}

	.wdjl {
		background-image: url(../../../static/wodechengguo@3x.png);
		min-height: 210pt;
	}
</style>
