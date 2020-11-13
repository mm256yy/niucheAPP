<template>
	<view class="setting">
		<view class="top">
			<view class="new">新</view>
			<view class="year">车龄：≤{{detail.carage}}年</view>
			<view class="distance">行驶里程：{{detail.carkm}}万公里</view>
		</view>
		<view class="content">
			<u-form label-width="200" label-align="left" :model="detail" ref="uForm">
				<u-form-item style="margin-left: 39rpx;margin-right: 46rpx;padding: 6rpx 0;" label="长*宽*高(mm)"><u-input :disabled="true" height="30" input-align="right" v-model="detail.specification" placeholder=""/></u-form-item>
				<!-- <u-form-item style="margin-left: 39rpx;margin-right: 46rpx;padding: 6rpx 0;" label="手机号"><u-input :disabled="true" height="30" input-align="right" v-model="detail.specification" /></u-form-item> -->
				<u-form-item style="margin-left: 39rpx;margin-right: 46rpx;padding: 6rpx 0;" label="续航里程(km)"><u-input :disabled="true" height="30" input-align="right" v-model="detail.trunk" placeholder=""/></u-form-item>
				<u-form-item style="margin-left: 39rpx;margin-right: 46rpx;padding: 6rpx 0;" label="轴距(mm)"><u-input :disabled="true" height="30" input-align="right" v-model="detail.wheel" placeholder=""/></u-form-item>
				<u-form-item style="margin-left: 39rpx;margin-right: 46rpx;padding: 6rpx 0;" label="环保标准"><u-input :disabled="true" height="30" input-align="right" v-model="detail.environmental" placeholder=""/></u-form-item>
				<u-form-item style="margin-left: 39rpx;margin-right: 46rpx;padding: 6rpx 0;" label="排量(L)"><u-input :disabled="true" height="30" input-align="right" v-model="detail.displacement" placeholder=""/></u-form-item>
			</u-form>
		</view>
		<view class="other">其他参数</view>
		<view class="list">
			<!-- <u-form label-width="200" label-align="left" :model="detail" ref="uForm">
				<u-form-item v-for="(item, index) in detail.otherparam" :key="index" style="margin-left: 39rpx;margin-right: 46rpx;padding: 6rpx 0;" :label="车门个数(个)"><u-input :disabled="true" height="30" input-align="right" v-model="detail.otherparam[0]" /></u-form-item>
				<u-form-item style="margin-left: 39rpx;margin-right: 46rpx;padding: 6rpx 0;" label="驱动方式"><u-input :disabled="true" height="30" input-align="right" v-model="detail.otherparam[1]" /></u-form-item>
			</u-form> -->
			<view class="params" v-for="(item, index) in detail.otherparam" :key="index">
				<text class="left">{{item.paramtername}}</text><text class="left">({{item.paramterunit}})</text>
				<text class="right">{{item.paramtertext}}</text>
				<view class="clear"></view>
			</view>
		</view>
<!-- 		<view class="ask">
			<u-image class="question" width="66rpx" height="66rpx" src="@/static/question.png"></u-image>
			<view class="problem">
				<view class="everyone">问问大家</view>
				<view class="how">谁买过？怎么样？</view>
			</view>
			<view class="small">></view>
		</view> -->
	</view>
</template>

<script>
	export default {
		data() {
			return {
				form: {
					name: '杭州'
				}
			}
		},
		props: {
			detail: {
			    type: Object,
			    default: function (){return {}}
			},
			id: {
			    type: String,
			    default: ''
			}
		},
		mounted() {
			
		},
		methods: {
			other() {
				this.$u.route('/pages/index/driver/components/index/other',{id:this.id});
			}
		}
	}
</script>
<style lang="scss" scoped>
    .setting {
		.clear {
			clear: both;
		}
		.top {
			width: 670rpx;
			height: 84rpx;
			background: #FFF;
			margin-left: 40rpx;
			margin-top: 42rpx;
			margin-bottom: 33rpx;
			padding: 9rpx 0;
			font-size: 28rpx;
			font-weight: 900;
			.new {
				width: 66rpx;
				height: 66rpx;
				line-height: 66rpx;
				text-align: center;
				font-size: 20rpx;
				font-weight: 900;
				color: #fff;
				border-radius: 50%;
				background: linear-gradient(115deg, #37AB63, #6DD99C);
				margin-left: 40rpx;
				float: left;
			}
			.year {
				margin-left: 25rpx;
				margin-right: 85rpx;
				float: left;
				margin-top: 18rpx;
			}
			.distance {
				float: left;
				margin-top: 18rpx;
			}
		}
	    .content {
			width: 670rpx;
			height: 485rpx;
			background: #fff;
			margin-left: 40rpx;
		}
		.other {
			margin-left: 40rpx;
			margin-top: 40rpx;
			margin-bottom: 40rpx;
			font-size: 28rpx;
			color: #7f7f7f;
		}
		.list {
			width: 670rpx;
			// height: 162rpx;
			background: #fff;
			margin-left: 40rpx;
			.params {
				padding: 20rpx 46rpx 20rpx 38rpx;
				.left {
					float: left;
				}
				.right {
					float: right;
				}
			}
		}
		.ask {
			width: 670rpx;
			height: 118rpx;
			padding: 26rpx 40rpx;
			background: #fff;
			margin-bottom: 40rpx;
			margin-top: 40rpx;
			margin-left: 40rpx;
			.question {
				float: left;
			}
			.problem {
				float: left;
				margin-left: 40rpx;
				.everyone {
					font-size: 28rpx;
					font-weight: 600;
				}
				.how {
					font-size: 20rpx;
					color: #7f7f7f;
				}
			}
			.small {
				float: right;
				margin-top: 10rpx;
				font-size: 32rpx;
				color: #7f7f7f;
			}
		}
	}
</style>


