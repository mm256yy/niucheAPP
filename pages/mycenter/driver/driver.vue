<template>
	<view>
		<view class="content" v-show = "curThemeType ==='driver'">
			<view style="padding: 15pt;">
				<view class="avater">
					<u-row style="margin-top: 10pt;background-color: #FFFFFF;padding: 6pt 0;">
						<u-col span="3">
							<u-avatar :src="driverPub.photo" mode="circle" size="large" ></u-avatar>
						</u-col>
						<u-col span="5" v-show="!driverPub.name">
							<view>欢迎来到纽车科技</view>
							<text class="btn-mini bg" @click="toLogin">登录/注册</text>
						</u-col>
						<u-col span="5" v-show="driverPub.name">
							<view>{{driverPub.name}}</view>
							<text class="bg">{{driverPub.telephone}}</text>
						</u-col>
					</u-row>
					<view class="bg" style="padding: 4pt 0;" >
					 <u-row>
						<u-col span="2">
							<u-image width="100%" height="100rpx" :src="driverSrc"></u-image>
						</u-col>
						<u-col span="3">
								<text class="colorF">驾照认证</text>
								<view class="colorF" @click="toLicense">{{driverPub.driverState}}</view>
						</u-col>
						<u-col span="1">
							<view class="colorF" style="text-align: center;">|</view>
						</u-col>
						<u-col span="2">
							<u-image width="100%" height="100rpx" :src="driverSrc"></u-image>
						</u-col>
						<u-col span="3">
							<text class="colorF">职业资格认证</text>
							<view class="colorF" @click="toCard">{{driverPub.postState}}</view>
						</u-col>
					  </u-row>
					</view>
				</view>
				
				<view class="my_title">
					我的发布
				</view>
				<view class="bgf">
					<u-cell-group >
						<u-cell-item icon="setting-fill" title="租车需求" :title-style="titleStyle" :value="driverPub.jobNum"></u-cell-item>
						<u-cell-item icon="integral-fill" title="求职需求" :title-style="titleStyle" :value="driverPub.carNum"></u-cell-item>
					</u-cell-group>
				</view>
				<view class="my_title">
					其他
				</view>
				<view class="colorF">
					<u-cell-group>
						<u-cell-item icon="fingerprint" title="我的拼单" :title-style="titleStyle"></u-cell-item>
						<u-cell-item icon="volume-up" title="收藏" :title-style="titleStyle"></u-cell-item>
						<u-cell-item icon="tags-fill" title="消息" :title-style="titleStyle"></u-cell-item>
						<u-cell-item icon="map-fill" title="通讯录" :title-style="titleStyle"></u-cell-item>
					</u-cell-group>
				</view>
			</view>
		</view>
		<u-modal v-model="showTips" show-cancel-button="true" :mask-close-able="true" confirm-text="出租车驾驶证" cancel-text="网约车驾驶证"
		 @confirm="tipsConfirm" @cancel="tipsCancel" >
			<view class="slot-content" style="padding: 10pt;font-size: 10pt;">
		        <view class="">
		        	请选择要上传的职业资格证件是哪种?
		        </view>
				在不选择的情况下，想关闭本提示，可点击提示窗外阴影区域就可以了。
			</view>
		</u-modal>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				showTips:false,
				driverSrc: '../../static/driverSrc.png',
				state:'',
				titleStyle:{'fontSize': '12pt','padding-left':'5pt','color':'#000000'},
				driverPub:{
					photo:'',
					name:'',
					telephone:'',
					driverState:'不可见',
					postState:'不可见',
					jobNum:'',
					carNum:'',
				}
			}
		},
		filters: {
		  stateV: function (value) {
		    if (!value) return ''
		    if (value === 1) {
				return '已认证'
			} else if (value === 2){
				return '未认证'
			} else if (value === 3){
				return '审核中'
			} else if (value === 4){
				return '认证未通过'
			}else {
				return ''
			}
		  }
		},
		onShow(){
		    this.telephone = uni.getStorageSync('telephone')
			this.getDriver()  	
		},
		methods: {
			getDriver(){
				if (!this.telephone){
					return
				}
				this.$u.api.getUserInfo().then(res=>{
					if(res.code === 0){
						let data = res.data;
						this.driverPub = data
					}else {
						 this.$u.toast(res.msg);
					}
				})
			},
			tipsConfirm(){
				this.$u.route("/pages/driver/taxiCar/taxiCar")
			},
			tipsCancel(){
				this.$u.route("/pages/driver/onlineCar/onlineCar")
			},
			toLicense(){
				if(this.state){
					this.$u.route("/pages/driver/drivingLicense/drivingLicense")
				}
			},
			toCard(){
				if(this.state){
					if(this.form.postState){
						this.$u.route("/pages/driver/onlineCar/onlineCar")
					} else {
						this.$u.route("/pages/driver/taxiCar/taxiCar")
					}
				} else {
					this.showTips = true
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
.driver-content{
	.bg{
		background: linear-gradient(55deg, $bg-grad-FE, $bg-grad-FCD),
	 }
}
	.btn-mini{
		display: inline-block;
		color: #fff;
		padding: 3pt 5pt;
		border-radius: 6px;
		margin-top: 2pt;
	}
	.colorF{
		color: $common-FFF;
	}
	/deep/ .bgf{
		background: $common-FFF;
	}
	.my_title{
		color: #000000;
		font-size: 18pt;
		padding-left: 3pt;
		margin: 19pt 0 12pt;
	}
</style>
