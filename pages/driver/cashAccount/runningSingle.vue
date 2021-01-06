<template>
	<view>
		<u-navbar back-icon-color="#111111" title="上传凭证" :background="background" title-color="#111111"></u-navbar>
		<view>
			<view class="view-content">
				<view style="padding-bottom: 10pt;">1.上传车辆租赁合同(照片)</view>
				<view class="top-content-upload">
					<u-upload :custom-btn="true" :action="action" ref="upload" @on-success='uploadChange' index="onephoto"
					 upload-text="" @on-remove="removeOne" :file-list="fileList" :max-size="4 * 1024 * 1024" style="width: 100%;justify-content: center;">
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
				<view style="text-align: center;padding: 10px 0;">输入验证码</view>
				<view class="slot_tips">
					<u-message-input active-color="#FFA000" :focus="true" :breathe="true" mode="box" @finish="finishInput"></u-message-input>
				</view>
				<view style="padding: 15px 20px;text-align: center;">
					重发短信
				</view>
			</view>
		</u-modal>
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
				action:action,
				fileList: [],
				fileList1: [],
				form: {},
				showCode:true
			}
		},
		methods: {
			uploadChange(data, index, lists, name) {
				this.form[name].push(data.object);
				this.$u.toast(data.msg);
			},
			removeOne(index, lists, name) {
				this.form[name].splice(index, 1);
			},
			finishInput(value){
				console.log(value)
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
	.fixed-btn{
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
</style>
