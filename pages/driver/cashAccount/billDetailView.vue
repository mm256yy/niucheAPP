<template>
	<view>
		<u-navbar back-icon-color="#111111" title="账单详情" :background="background" title-color="#111111"></u-navbar>
		<view class="view_content">
			<view class="content_head">
				<view class="head_title">{{form.source | soureText}}</view>
				<view class="head_money" :style="{color:form.incomingAndOutgoingState === 'ADD'?'#FFA000':'#333333'}">
				{{form.incomingAndOutgoingState === 'ADD'?'+':'-'}}¥{{form.money}}</view>
			</view>
			<view class="content_info" v-if="flag">
				<view class="info_item">
					<text class="info_title">当前状态：</text>
					<text>{{form.auditState | audState}}</text>
					<view style="color: #FE3B31;font-size: 12px;" v-show="form.auditState == 'BE_FAILED' || form.auditState == 'AUDIT_FAILED'">原因：{{form.failCause}}</view>
				</view>
				<view class="info_item">
					<text class="info_title">提现时间：</text>
					<text>{{form.createTime}}</text>
				</view>
				<view class="info_item">
					<text class="info_title">资金去向：</text>
					<text>{{form.whereaboutsOfFund === 'ALIPAY'?'支付宝':'微信'}}</text>
				</view>
				<view class="info_item">
					<text class="info_title">入账账号：</text>
					<text>{{form.billingAccount}}</text>
				</view>
				<view class="info_item">
					<text class="info_title">到账时间：</text>
					<text>{{form.endDisposeTime}}</text>
				</view>
			</view>
			<view class="content_info" v-else>
				<view class="info_item">
					<text class="info_title">当前状态：</text>
					<text>{{form.auditState | audState}}</text>
				</view>
				<view class="info_item">
					<text class="info_title">交易单号：</text>
					<text>{{form.transactionId}}</text>
				</view>
				<view class="info_item">
					<text class="info_title">入账时间：</text>
					<text>{{form.endDisposeTime}}</text>
				</view>
			</view>
		</view>
		<u-gap height="20" bg-color="#F5F5F5" v-if="flag"></u-gap>
		<view class="view_content" style="padding-bottom: 12px;" v-if="flag">
			<view style="padding: 10px 0;">车辆租赁合同照片</view>
			<u-row :gutter="20">
				<u-col span="6" v-for="(item,index) in form.vehicleLeaseContract" :key="index" style="margin-bottom: 5px;">
					<u-image width="100%" height="200rpx" :src="item" @click="open(index)"></u-image>
				</u-col>
			</u-row>
			<view style="padding: 10px 0;">网约车平台跑单流水截图</view>
			<u-row :gutter="20">
				<u-col span="6" v-for="(item,index) in form.runSingerWater" :key="index" style="margin-bottom: 5px;">
					<u-image width="100%" height="200rpx" :src="item" @click="open(index+form.vehicleLeaseContract.length)"></u-image>
				</u-col>
			</u-row>
		</view>
		<u-gap height="20" bg-color="#F5F5F5"></u-gap>
		<view class="bottom_help" @click="callPhone">
			<text>遇到问题？</text>
			<u-icon name="arrow-right" color="#333333"></u-icon>
		</view>
		<u-gap height="40" bg-color="#FFFFFF"></u-gap>
		 <previewImage ref="previewImage" :saveBtn="false" :imgs="imgs"></previewImage>
	</view>
</template>

<script>
	 import previewImage from '@/components/kxj-previewImage/kxj-previewImage.vue';
	export default {
		 components: { previewImage}, //注册插件
		data() {
			return {
				background: {
					'background-image': 'linear-gradient(to bottom, #000000 39%,#ffffff 0%)'
				},
				flag: false,
				form: {},
				imgs:[],
				id:''
			}
		},
		onLoad(option) {
			this.id = option.id;
		},
		filters: {
			audState: function(value) {
				if (value === 'BE_BEING') {
					return '提现中'
				} else if (value === 'BE_FINISHED') {
					return '已到账'
				} else if (value === 'BE_FAILED') {
					return '到账失败'
				} else if (value === 'AUDIT_FAILED') {
					return '审核失败'
				} else {
					return ''
				}
			},
			soureText: function(value) {
				if (value === 'SOURCE_REGISTER_AUTH') {
					return '注册-认证有礼'
				} else if (value === 'SOURCE_INVITE') {
					return '推广拉新'
				} else if (value === 'SOURCE_WITHDRAW') {
					return '提现'
				} else if (value === 'SOURCE_REFUND') {
					return '提现退款'
				} else {
					return ''
				}
			}
		},
		mounted() {
			this.getDetails()
		},
		methods: {
			callPhone() {
				uni.makePhoneCall({
					phoneNumber: '0571-87815287'
				});
			},
			open(e){
				this.$refs.previewImage.open(e)
			},
			getDetails(){
				this.$u.api.getMyBillDetails({billingDetailsid:this.id}).then(res=>{
						if(res.code === 200){
							this.form = res.object
							this.imgs = res.object.vehicleLeaseContract.concat(res.object.runSingerWater)
							if (res.object.incomingAndOutgoingState === 'ADD'){
								this.flag = true
							} else{
								this.flag = false
							}
						}else {
							 this.$u.toast(res.msg);
						}
					})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.view_content {
		padding: 0 20px;

		.content_head {
			display: flex;
			justify-content: center;
			align-items: center;
			flex-direction: column;
			min-height: 150px;
			border-bottom: 1px solid #E0E0E0;
			color: #333333;

			.head_title {
				font-size: 14px;
				color: #333333;
			}

			.head_money {
				font-size: 26px;
				padding: 10px 0 20px;
			}
		}

		.content_info {
			padding: 20px 0;

			.info_item {
				padding: 4px 0;

				.info_title {
					color: #939393;
					font-size: 14px;
				}
			}

		}
	}

	.bottom_help {
		color: #111111;
		display: flex;
		justify-content: space-between;
		padding: 10px 20px;
		border-bottom: 1px solid #DEDEDE;
	}
</style>
