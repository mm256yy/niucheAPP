<template>
	<view>
		<u-navbar back-icon-color="#111111" title="上传凭证" :background="background" title-color="#111111"></u-navbar>
		<view>
			<view class="view-content">
				<view style="padding-bottom: 10pt;">1.上传车辆租赁合同(照片)</view>
				<view class="top-content-upload">
					<u-upload :custom-btn="true" :action="action" ref="upload" @on-success='uploadChange' index="onephoto" upload-text=""
					 @on-remove="removeOne" :file-list="fileList" :max-size="4 * 1024 * 1024" style="width: 100%;justify-content: center;">
						<view slot="addBtn" class="slot-btn" hover-class="slot-btn__hover" hover-stay-time="150">
							<u-icon name="plus" size="60" :color="$u.color['lightColor']"></u-icon>
						</view>
					</u-upload>
				</view>
				<view style="margin-top: 10pt;font-size: 10pt;padding-left: 5pt;color: #666666;">
					上传图片必须包含：1、合同全部内容页；2、合同内容清晰可见；
				</view>
			</view>
			<u-gap height="20" bg-color="#F5F5F5"></u-gap>
			<view class="view-content">
				<view style="padding-bottom: 10pt;">2.上传上月跑单流水(截图）</view>
				<view class="top-content-upload">
					<u-upload :custom-btn="true" :action="action" ref='upload1' @on-success='uploadChange' index="oneneishiphoto"
					 upload-text="" @on-remove="removeOne" :file-list="fileList1" :max-size="4 * 1024 * 1024" style="width: 100%;justify-content: center;">
						<view slot="addBtn" class="slot-btn" hover-class="slot-btn__hover" hover-stay-time="150">
							<u-icon name="plus" size="60" :color="$u.color['lightColor']"></u-icon>
						</view>
					</u-upload>
				</view>
				<view style="margin-top: 5pt;font-size: 10pt;padding-left: 5pt;color: #666666;">
					<view>请上传网约车平台上一月份跑单记录！</view>
				</view>
			</view>
		</view>
		<view class="fixed-btn">
			<view class="btn-inline" style="padding: 0 20px;">
				<u-button type="warning" shape='circle' class="btn_orange" @click="applyAccount">提现申请</u-button>
			</view>
		</view>
		<u-modal v-model="showCode" :show-confirm-button="false" title="">
			<view class="slot_content">
				<view style="padding-left: 20px;" @click="showCode = false"><u-icon name="arrow-left" color="#939393" ></u-icon></view>
				<view style="text-align: center;padding: 10px 0 15px;color: #333333;font-weight: bold;">输入验证码</view>
				<view style="text-align: center;color: #939393;padding-bottom: 10px;">已发送短信验证码到您的手机号</view>
				<view class="slot_tips">
					<u-message-input active-color="#FFA000" :focus="true" :breathe="true" mode="box" @finish="finishInput"></u-message-input>
				</view>
				<view class="send_message" @click="getCode" :style="{color:sendFlag?'#FF9500':'#939393'}">重发短信</view>
			</view>
		</u-modal>
		<u-modal v-model="showTips" :show-confirm-button="false" title="">
			<view class="slot_content">
				<view class="slot_tips">
					您的提现申请已经提交审核，预计2个工作日内提现成功！
				</view>
				<view style="padding: 15px 20px 0;text-align: center;">
					<u-button type="warning" shape='circle' class="btn_orange" @click="toRoute">好的</u-button>
				</view>
			</view>
		</u-modal>
		<u-verification-code seconds="60" ref="uCode" @end="endCode" @start="startCode"></u-verification-code>
	</view>
</template>

<script>
	import {
		action
	} from '@/utils/constant.js'
	export default {
		data() {
			return {
				background: {
					'background-image': 'linear-gradient(to bottom, #000000 39%,#ffffff 0%)'
				},
				action: action,
				fileList: [],
				fileList1: [],
				form: {},
				showCode: false,
				sendFlag:false,
				showTips:false,
			}
		},
		methods: {
			// uni.showLoading({
			// 	title: '正在获取验证码'
			// })
			// 	uni.hideLoading();
			uploadChange(data, index, lists, name) {
				this.form[name].push(data.object);
				this.$u.toast(data.msg);
			},
			removeOne(index, lists, name) {
				this.form[name].splice(index, 1);
			},
			getCode() {
				if (this.$refs.uCode.canGetCode) {
					this.$u.api.getIdentifyCode({
						codeType: 'verificationCode'
					}).then(res => {
						if (res.code === 200) {
							this.$refs.uCode.start();
						} else {
							this.$u.toast(res.msg);
						}
					})
				} 
			},
			startCode(){
				this.sendFlag = false
			},
			endCode(){
				this.sendFlag = true
			},
			finishInput(value) {
				console.log(value)
			},
			toRoute(){
				this.showTips = false;
				this.$u.route({url:'/pages/mycenter/mycenter',type:'switchTab'})
			}
		}
	}
</script>
<style lang="scss" scoped>
	.view-content {
		margin-top: 20pt;
		padding: 0 10pt;
	}

	.top-content-upload {
		border: 1px dotted #dedede;
		width: 100%;
		background: #FFFFFF;
		position: relative;
	}

	.slot-btn {
		width: 230rpx;
		height: 100pt;
		display: flex;
		justify-content: center;
		align-items: center;
		background: #fff;
		border-radius: 10rpx;
	}

	.slot-btn__hover {
		background-color: rgb(235, 236, 238);
	}

	.fixed-btn {
		box-sizing: border-box;
		position: fixed;
		left: 0;
		bottom: 20px;
		width: 100%;
		z-index: 998;
	}

	.btn_orange {
		background: linear-gradient(270deg, #FFC700 0%, #FF9000 100%);
		border-radius: 6px;
	}
	.send_message{
		padding:20px 0 30px;text-align: center;font-size: 12px;
	}
	.slot_content {
		padding: 15px 0;
		.slot_tips {
			color: #333333;
			text-align: center;
			font-size: 16px;
			font-weight: 600;
			padding-bottom: 40px;
			border-bottom: 1rpx solid #E0E0E0;
		}
	}
</style>
