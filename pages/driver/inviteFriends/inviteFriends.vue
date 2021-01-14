<template>
	<view>
		<u-navbar back-text="返回" back-icon-size="0" :background="background" title="邀请好友" height='44' title-color="#333333"></u-navbar>
		<view class="" style="position: relative;">
			<u-image height="580px" mode="scaleToFill" src="@/static/c@3x.png" @click="toPage"></u-image>
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
				<view class="yqhy"><view  @click="inviteFriends">立即邀请好友助力</view></view>
			<view class="flex_view">
				<view style="padding: 0 10pt;margin: 20px 0 20px;">
					<view class="" style="background: #FFFFFF;padding: 15px;border-radius: 10px;">
						<view @click="toCashAccount()" class="wdsy" style="display: flex;justify-content: space-between;background: #FFF7F2;padding: 15px;color: #FF652B;border-radius: 6px;">
							<view>我的收益<text style="color: #FF2B49;font-size: 16px;">{{obj.inviteAccount}}</text>元</view>
							<view>去提现<u-icon name="arrow-right"></u-icon>
							</view>
						</view>
					</view>
					<view style="position: relative;" class="bgImg-common wdjl">
						<view style="position: absolute;top: 51%;left: 28%;z-index: 8;">
							<view style="color: #FF652B;">驾照认证</view>
							<view><text style="font-size: 18px;color: #FF3333;">{{obj.driverAuthNum}}</text><text style="color: #333333;font-size: 14px;">人</text></view>
						</view>
						<view style="position: absolute;top: 51%;right: 10%;z-index: 8;">
							<view style="color: #FF652B;">从业认证</view>
							<view style="font-size: 18px;color: #FF3333;"><text>{{obj.certAuthNum}}</text><text style="color: #333333;font-size: 14px;">人</text></view>
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
				<view style="padding-bottom: 20px;">
					<view style="color: #000000;">推荐规则:</view>
					<view>1.完成驾驶证认证成功即可获取推荐资格。</view>
					<view>2.账号注册成功，代表建立链接关系，驾驶证认证成功，即可获得推广奖励，完成从业资格认证则完成全部奖励</view>
					<view>3.推广奖励不设上限</view>
                </view>
				<view style="padding-bottom: 20px;">
					<view style="color: #000000;">活动规则:</view>
					<view>1.本人注册成为纽车APP认证用户，并与被推荐人建立链接关系。</view>
					<view>2.被推荐人推荐新用户进行注册，且认证通过，推荐人可再获得推广奖励。</view>
					<view>3.活动时间：2021年1月15日-3月17日</view>
					<view>4.活动城市：杭州</view>
				</view>
				<view style="padding-bottom: 20px;">
					<view style="color: #000000;">奖励使用规则:</view>
					<view>1.推广奖励仅限于租赁车辆使用。</view>
					<view>2.推广奖励使用需完成驾驶证和从业资格认证成功。</view>
					<view>3.租赁月租金和推广奖励兑换比例为：租赁月租金10:推广奖励1兑换</view>
					<view>4.租赁公司签订租赁合同，通过后台上传合同信息至纽车平台</view>
					<view>5.每月需要上传凭证，需保证信息的真实性，包含网约车平台注册资料、月度跑单流水、次月租金缴纳账单、等辅助信息。</view>
					<view>6.在缴纳成功第二个月租金后，由纽车平台发放第一期抵扣推广奖励金额到司机指定账户中，并扣除平台推广奖励相应金额。</view>
					<view>
						7.	需保证纽车注册认证人信息、租赁合同人信息、网约车平台注册信息，三方合一，如不满足，则推广奖励不生效。
					</view>
				</view>
				<view style="padding-bottom: 20px;">
					<view style="color: #000000;">新用户说明：</view>
					<view>1.	新人奖励：用户注册和认证完成时间需要在20天以内，认证需要提交驾驶证和网约车人证（驾驶证需要满三年）,新用户推广奖励：当前仅限抵扣租金，其他用途不开放</view>
					<view>2.新用户定义：从未注册过纽车相关等产品，一个手机号码对应一个驾驶证且驾照满三年，通过平台认证审核即可。</view>
					<view>3.推荐奖励说明：推荐人需要通过平台认证，才具备推荐资格，每位推荐人仅限一次</view>
					<view>4.被推荐人注册和认证需要在活动时间内，奖励才会发放。</view>
				</view>
				<view style="padding-bottom: 20px;">
					<view style="color: #000000;">九、补充说明</view>
					<view>1.如参与纽车拉新的用户出现任何违规行为（如作弊领取拉新费用等），一经发现，纽车有权视行为严重程度采取取消参与活动资格、取消或扣掉拉新奖励等措施。</view>
					<view>2.如出现不可抗力或情势变更的情况（如重大灾害事件、活动受政府机关指令需要停止举办或调整的、活动遭受严重网络攻击或因系统故障需要暂停举办的），则纽车可依相关法律法规等规定主张免责。</view>
					<view>3.纽车可根据活动的实际举办情况依法依规对活动规则进行变更或调整（如有），相关变动或调整将公布在活动页面上或以合适的方式及时通知。</view>
					<view>4.若您获得的奖金需依法缴纳相应税款，纽车将根据税务法律法规要求向税务机关提供必要的税务申报信息（包括您的身份信息、奖金金额等税务机关要求的信息），并由纽车依法为您完成相应税款的代扣代缴。</view>
					<view>
						5.有问题请咨询客服
					</view>
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
				obj:{
					account: 0,//账户金额
					certAuthNum: 0,//资格证认证数量
					driverAuthNum: 0,//驾照认证数量
					inviteAccount: 0,//邀请账户金额
				}
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
					this.$u.route("/pages/driver/cashAccount/cashAccount",{money:this.obj.account})
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
					title: "赚租金上纽车APP",
					summary: "注册认证就送100元，成为纽车推广人，赚租金，上不封顶！",
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
						this.obj = data; 
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
		background-color: #fe012f;
	}
</style>
<style lang="scss" scoped>
	.view_content{
		background-image: url(../../../static/c@2x.png);
		background-repeat: no-repeat;
		background-size: 100%;
		height: 605px;
	}
	.bgImg-common {
		background-position: center;
		background-repeat: no-repeat;
		background-size: 100%;
	}

	.flex_view {
		// position: absolute;
		// top: 68%;
		width: 100%;
	}

	.yqhy {
		background: linear-gradient(0deg, #FFCC33 0%, #FFCC33 100%);
		box-shadow: -1px 3px 0px 0px #FF6633;
		border-radius: 20px;
		width: 68%;
		position: absolute;
		top: 446px;
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
