<template>
	<view>
		<u-navbar back-icon-color="#111111" title="验车单(1/2)" :background="background" title-color="#111111"></u-navbar>
		<view class="check_content">
			<view style="background: #F5F5F5;padding: 20rpx 30rpx 30rpx;">
				<view class="head_tips">
					提示：为保障您的合法权益，务必按要求上传车辆信息，车辆信息上传后将锁定到《汽车租赁合同》中。
				</view>
				<view class="title">车辆身份验证</view>
			</view>
			<view class="upload_content">
				<view class="title">上传车辆行驶证（必填）</view>
				<view class="bg_idcard">
					<u-upload :custom-btn="true" :action="recognicedUrl" @on-success="uploadLicenseChange"  @on-remove="removeLicense" 
					upload-text="" :file-list="uploadLicenseList" max-count="1" class="upload">
						<view slot="addBtn" class="slot-btn" hover-class="slot-btn__hover" hover-stay-time="150">
							<u-icon name="plus" size="160" color="#FFFFFF"></u-icon>
						</view>
					</u-upload>
				</view>
				<view v-show="flag">
					<view class="parse_view">
						<text class="label">号牌号码：</text><text class="value">{{form.number}}</text>
					</view>
					<view class="parse_view">
						<text class="label">车辆类型：</text><text class="value">{{form.type}}</text>
					</view>
					<view class="parse_view">
						<text class="label" style="letter-spacing: 28rpx;">住    址：</text><text class="value">{{form.address}}</text>
					</view>
					<view class="parse_view">
						<text class="label">使用性质：</text><text class="value">{{form.character}}</text>
					</view>
					<view class="parse_view">
						<text class="label">品牌型号：</text><text class="value">{{form.model}}</text>
					</view>
					<view class="parse_view">
						<text class="label" style="letter-spacing: 1rpx;">车辆识别代号：</text><text class="value">{{form.vin}}</text>
					</view>
					<view class="parse_view">
						<text class="label" style="letter-spacing: 6rpx;">发动机号码：</text><text class="value">{{form.engine}}</text>
					</view>
					<view class="parse_view">
						<text class="label">注册日期：</text><text class="value">{{form.register_date}}</text>
					</view>
					<view class="parse_view">
						<text class="label">发证日期：</text><text class="value">{{form.issue_date}}</text>
					</view>
				</view>
			</view>
			<u-gap height="20" bg-color="#F5F5F5"></u-gap>
			<view class="upload_content">
				<view class="title">车辆铭牌（1张）</view>
				<view class="bg_min">
					<u-upload :custom-btn="true" :action="action" @on-success="uploadChange" upload-text="" :file-list="fileList"
					  index="nameplateImg" @on-remove="removeOne" max-count="1" class="upload">
						<view slot="addBtn" class="slot-btn" hover-class="slot-btn__hover" hover-stay-time="150">
							<u-icon name="plus" size="160" color="#FFFFFF"></u-icon>
						</view>
					</u-upload>
					<view style="color:#939393 ;padding-top: 14rpx;">车辆铭牌一般位于车辆右侧B柱下方</view>
				</view>
			</view>
			<u-gap height="20" bg-color="#F5F5F5"></u-gap>
			<view class="upload_content">
				<view class="title">中控仪表盘（1张）</view>
				<view class="bg_yibiao">
					<u-upload :custom-btn="true" :action="action" @on-success="uploadChange" @on-remove="removeOne" upload-text="" :file-list="fileList1"
					  index="meterImg" max-count="1" class="upload">
						<view slot="addBtn" class="slot-btn" hover-class="slot-btn__hover" hover-stay-time="150">
							<u-icon name="plus" size="160" color="#FFFFFF"></u-icon>
						</view>
					</u-upload>
				</view>
				<!-- <view class="mileage">
					<text class="label">表显里程</text>
					<u-input class="input" v-model="form.licenseNumber" placeholder="请输入" maxlength="18" />
					<text class="label">KM</text>
				</view> -->
			</view>
			<view class="bottom_content">
				<view class="btn orange" @click="toNext">下一步 车况详细登记</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {action,recognicedUrl} from '@/utils/constant.js'
	export default {
		data() {
			return {
				background: {
					'background-image': 'linear-gradient(to bottom, #000000 39%,#ffffff 0%)'
				},
				action: action,
				recognicedUrl:recognicedUrl,
				uploadLicenseList:[],
				fileList: [],
				fileList1:[],
				form: {
					orderId:'',
					number: '',
					type: '',
					address: '',
					character: '',
					model: '',
					vin: '',
					engine: '',
					register_date: '',
					issue_date: '',
					drivingImg:'',
					nameplateImg:'',
					meterImg:'',
				},
				flag:false, //解析标识

			}
		},
		onLoad(option) {
			let orderId = option.orderId;
			this.form.orderId = orderId;
		},
		methods: {
			uploadLicenseChange(res, index, lists){
				if (res.code === 200) {
					let data = res.data;
					this.form.number = data.number;
					this.form.type = data.type;
					this.form.address = data.address;
					this.form.character = data.character;
					this.form.model = data.model;
					this.form.vin = data.vin;
					this.form.engine = data.engine;
					this.form.issue_date = data.issue_date;
					this.form.register_date = data.register_date;
					this.form.drivingImg = data.drivingImg;
					this.flag = true;
				} else {
					this.$u.toast('识别失败')
				}
			},
			removeLicense(){
				this.form.number ="";
				this.form.type ="";
				this.form.address ="";
				this.form.character ="";
				this.form.model ="";
				this.form.vin ="";
				this.form.engine ="";
				this.form.issue_date ="";
				this.form.register_date ="";
				this.form.drivingImg ="";
				this.flag = false
			},
			uploadChange(data, index, lists, name) {
				this.form[name] =data.object;
				this.$u.toast(data.msg);
			},
			removeOne(index, lists, name) {
				this.form[name] = ""
			},
            toNext(){
				if (this.form.drivingImg === '' || this.form.nameplateImg === '' || this.form.meterImg === ''){
					this.$u.toast("请上传图片")
					return false
				}
				if (!this.flag){
					this.$u.toast('未识别到行驶证信息,请重新上传');
					return
				}
				uni.setStorageSync('orderFirst', this.form);
				this.$u.route('/pages/driver/myOrder/checkSingle')
			}
		}
	}
</script>

<style lang="scss" scoped>
	.head_tips {
		padding: 16rpx 30rpx;
		background: #FFFFFF;
		color: #666666;
		font-size: 26rpx;
		box-shadow: 0px 0px 0px 0px #DEDEDE;
		border-radius: 12rpx;
	}

	.title {
		color: #111111;
		font-size: 36rpx;
		font-weight: 700;
		padding: 20rpx 0 30rpx;
	}

	.upload_content {
		background-color: #FFFFFF;
		padding: 30rpx;

		.upload {
			width: 100%;
			justify-content: center;
			align-items: center;
			height: 386rpx;
			/deep/.u-preview-wrap{
				width: 100%!important;
				height: 100%!important;
				margin: 0;
			}
		}

		.bg_idcard {
			background: url(../../../static/order/idcard.png) no-repeat;
			background-size: 100%;
		}

		.bg_yibiao {
			background: url(../../../static/order/yibiaopan2x.png) no-repeat;
			background-size: 100%;
		}

		.bg_min {
			background: url(../../../static/order/mingpai2x.png) no-repeat;
			background-size: 100%;
		}

		.mileage {
			display: flex;
			align-items: center;
			border-bottom: 1px solid #DEDEDE;
            padding-top: 16rpx;
			.label {
				color: #111111;
				font-size: 28rpx;
				font-weight: 700;
			}
			.input {
				margin: 0 20rpx;
			}
		}

	}
	.bottom_content{
		border-top: 1px solid #DEDEDE;
		margin-top: 16rpx;
		padding: 40rpx 60rpx;
		.btn{
			padding: 24rpx 28rpx;
			font-size: 32rpx;
			border-radius: 8rpx;
			text-align: center;
		}
		.orange{
			background: linear-gradient(270deg, #FFC600 0%, #FFA900 47%, #FF9100 100%);
			color: #FFFFFF;
		}
	}
	.parse_view{
		padding: 20rpx 0;
		.label{
			color: #939393;
			display: inline-block;
			letter-spacing: 14rpx;
		}
		.value{
			color: #333333;
		}
	}
</style>
