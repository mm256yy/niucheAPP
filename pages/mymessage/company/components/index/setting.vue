<template>
	<view class="setting">
		<u-navbar back-text="返回" back-icon-size="0" title="基本参数"
		  height='44' title-color="#111"><!-- <view @click="history()" style="color: #fff;margin-right: 20rpx;font-size: 30rpx;" slot="right">
				   历史</view> --></u-navbar>
		<view class="content">
			<!-- <u-form label-width="200" label-align="left" :model="detail" ref="uForm">
				<u-form-item style="margin-left: 39rpx;margin-right: 46rpx;padding: 6rpx 0;" label="车型名称"><u-input :disabled="true" height="30" input-align="right" v-model="detail.specification" placeholder="暂无数据" /></u-form-item>
				<u-form-item style="margin-left: 39rpx;margin-right: 46rpx;padding: 6rpx 0;" label="厂商指导价(元)"><u-input :disabled="true" height="30" input-align="right" v-model="detail.specification" placeholder="暂无数据" /></u-form-item>
				<u-form-item style="margin-left: 39rpx;margin-right: 46rpx;padding: 6rpx 0;" label="厂商"><u-input :disabled="true" height="30" input-align="right" v-model="detail.trunk" placeholder="暂无数据" /></u-form-item>
				<u-form-item style="margin-left: 39rpx;margin-right: 46rpx;padding: 6rpx 0;" label="级别"><u-input :disabled="true" height="30" input-align="right" v-model="detail.wheel" placeholder="暂无数据" /></u-form-item>
				<u-form-item style="margin-left: 39rpx;margin-right: 46rpx;padding: 6rpx 0;" label="能源类型"><u-input :disabled="true" height="30" input-align="right" v-model="detail.environmental" placeholder="暂无数据"/></u-form-item>
				<u-form-item style="margin-left: 39rpx;margin-right: 46rpx;padding: 6rpx 0;" label="环保标准"><u-input :disabled="true" height="30" input-align="right" v-model="detail.displacement" placeholder="暂无数据" /></u-form-item>
				<u-form-item style="margin-left: 39rpx;margin-right: 46rpx;padding: 6rpx 0;" label="上市时间"><u-input :disabled="true" height="30" input-align="right" v-model="detail.displacement" placeholder="暂无数据" /></u-form-item>
				<u-form-item style="margin-left: 39rpx;margin-right: 46rpx;padding: 6rpx 0;" label="最大功率(kw)"><u-input :disabled="true" height="30" input-align="right" v-model="detail.displacement" placeholder="暂无数据" /></u-form-item>
				<u-form-item style="margin-left: 39rpx;margin-right: 46rpx;padding: 6rpx 0;" label="最大扭矩"><u-input :disabled="true" height="30" input-align="right" v-model="detail.displacement" placeholder="暂无数据" /></u-form-item>
				<u-form-item style="margin-left: 39rpx;margin-right: 46rpx;padding: 6rpx 0;" label="发动机"><u-input :disabled="true" height="30" input-align="right" v-model="detail.displacement" placeholder="暂无数据" /></u-form-item>
				<u-form-item style="margin-left: 39rpx;margin-right: 46rpx;padding: 6rpx 0;" label="变速箱"><u-input :disabled="true" height="30" input-align="right" v-model="detail.displacement" placeholder="暂无数据" /></u-form-item>
				<u-form-item style="margin-left: 39rpx;margin-right: 46rpx;padding: 6rpx 0;" label="长*宽*高(mm)"><u-input :disabled="true" height="30" input-align="right" v-model="detail.displacement" placeholder="暂无数据" /></u-form-item>
				<u-form-item style="margin-left: 39rpx;margin-right: 46rpx;padding: 6rpx 0;" label="车身结构"><u-input :disabled="true" height="30" input-align="right" v-model="detail.displacement" placeholder="暂无数据" /></u-form-item>
				<u-form-item style="margin-left: 39rpx;margin-right: 46rpx;padding: 6rpx 0;" label="最高车速(km/h)"><u-input :disabled="true" height="30" input-align="right" v-model="detail.displacement" placeholder="暂无数据" /></u-form-item>
				<u-form-item style="margin-left: 39rpx;margin-right: 46rpx;padding: 6rpx 0;" label="官方0-100km/h加速(s)"><u-input :disabled="true" height="30" input-align="right" v-model="detail.displacement" placeholder="暂无数据" /></u-form-item>
				<u-form-item style="margin-left: 39rpx;margin-right: 46rpx;padding: 6rpx 0;" label="实测0-100km/h加速(s)"><u-input :disabled="true" height="30" input-align="right" v-model="detail.displacement" placeholder="暂无数据" /></u-form-item>
				<u-form-item style="margin-left: 39rpx;margin-right: 46rpx;padding: 6rpx 0;" label="实测100-0km/h制动(m)"><u-input :disabled="true" height="30" input-align="right" v-model="detail.displacement" placeholder="暂无数据" /></u-form-item>
				<u-form-item style="margin-left: 39rpx;margin-right: 46rpx;padding: 6rpx 0;" label="工信部综合油耗(L/100km)"><u-input :disabled="true" height="30" input-align="right" v-model="detail.displacement" placeholder="暂无数据" /></u-form-item>
			</u-form> -->
		</view>
		<!-- <view class="other">其他参数</view> -->
		<!-- <view class="list"> -->
			<!-- <u-form label-width="200" label-align="left" :model="detail" ref="uForm">
				<u-form-item v-for="(item, index) in detail.otherparam" :key="index" style="margin-left: 39rpx;margin-right: 46rpx;padding: 6rpx 0;" :label="车门个数(个)"><u-input :disabled="true" height="30" input-align="right" v-model="detail.otherparam[0]" /></u-form-item>
				<u-form-item style="margin-left: 39rpx;margin-right: 46rpx;padding: 6rpx 0;" label="驱动方式"><u-input :disabled="true" height="30" input-align="right" v-model="detail.otherparam[1]" /></u-form-item>
			</u-form> -->
<!-- 			<view class="params" v-for="(item, index) in detail.otherparam" :key="index">
				<text class="left">{{item.paramtername}}</text><text class="left">({{item.paramterunit}})</text>
				<text class="right">{{item.paramtertext}}</text>
				<view class="clear"></view>
			</view> -->
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				id:''
			}
		},
		onLoad(option) {
			let id = option.id;
			if(id){
			 this.id = id;
			}
		},
		mounted() {
			this.getData()
		},
		methods: {
			getData() {
				this.$u.api.setting({carmodelid: this.id}).then(res=>{
					if(res.code === 200){
						 
					}else {
						 this.$u.toast(res.msg);
					}
				})
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
				background: linear-gradient(115deg, #6DD99B, #37AB63);
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
			// height: 485rpx;
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
		.more {
				   font-size: 20rpx;
				   color: #7f7f7f;
				   margin-top: 83rpx;
				   margin-left: 220rpx;
				   margin-bottom: 40rpx;
		}
		.last {
				   width: 100%;
				   height: 144rpx;
				   padding: 55rpx 116rpx;
				   background: linear-gradient(115deg, #6DD99B, #37AB63);
				   font-size: 36rpx;
				   font-weight: 900;
				   color: #fff;
				   display: flex;
				   justify-content: space-around;
				   align-items: center;
		}
	}
</style>


