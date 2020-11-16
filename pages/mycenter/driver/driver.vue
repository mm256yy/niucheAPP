<template>
	<view>
		<view class="content">
			<view style="padding: 15pt;">
				<view class="avater">
					<u-row style="margin-top: 10pt;background-color: #FFFFFF;padding: 6pt 0;">
						<u-col span="3">
							<u-avatar :src="driverPub.headPhoto" mode="circle" size="large" ></u-avatar>
						</u-col>
						<u-col span="8" v-show="!driverPub.telephone">
							<view style="font-size: 14pt;">欢迎来到纽车科技</view>
							<text class="btn-mini bg" @click="toLogin">登录/注册</text>
						</u-col>
						<u-col span="8" v-show="driverPub.telephone" @click="toMyInfo">
							<view style="font-size: 14pt;">{{driverPub.name}}</view>
							<text style="font-size: 12pt;">{{driverPub.telephone}}</text>
						</u-col>
						<u-col span="1" @click="toMyInfo">
							<u-icon name="arrow-right" color="#fcbb30" size="30"></u-icon>
						</u-col>
					</u-row>
					<view class="bg" style="padding: 4pt 0;" >
					 <u-row>
						<u-col span="2">
							<u-icon size="100" :name="jzrzSrc"></u-icon>
						</u-col>
						<u-col span="3">
								<text class="colorF">驾照认证</text>
								<view class="colorF" @click="toLicense">{{driverPub.driverState | stateV}}</view>
						</u-col>
						<u-col span="1">
							<view class="colorF" style="text-align: center;">|</view>
						</u-col>
						<u-col span="2">
							<u-icon size="100" :name="zyzgSrc"></u-icon>
						</u-col>
						<u-col span="4">
							<text class="colorF">职业资格认证</text>
							<view class="colorF" @click="toCard">{{driverPub.postState | stateV}}</view>
						</u-col>
					  </u-row>
					</view>
				</view>
				
				<view class="my_title">
					我的发布
				</view>
				<view class="bgf">
					<u-cell-group >
						<u-cell-item title="租车需求" @click="toMyPub(0)" :title-style="titleStyle" :value="driverPub.carNum == 0?'未发布':'已发布'">
							<u-icon size="60" :name="zcxuSrc" slot="icon"></u-icon>
						</u-cell-item>
						<u-cell-item title="求职需求" @click="toMyPub(1)" :title-style="titleStyle" :value="driverPub.jobNum == 0?'未发布':'已发布'">
							<u-icon size="60" :name="qzxuSrc" slot="icon"></u-icon>
						</u-cell-item>
					</u-cell-group>
				</view>
				<view class="my_title">
					其他
				</view>
				<view class="colorF">
					<u-cell-group>
						<u-cell-item title="我的拼单" :title-style="titleStyle">
							<u-icon size="60" :name="wdpdSrc" slot="icon"></u-icon>
						</u-cell-item>
						<u-cell-item title="收藏" :title-style="titleStyle">
							<u-icon size="60" :name="scSrc" slot="icon"></u-icon>
						</u-cell-item>
						<u-cell-item title="消息" :title-style="titleStyle">
							<u-icon size="60" :name="xxSrc" slot="icon"></u-icon>
						</u-cell-item>
						<u-cell-item title="通讯录" :title-style="titleStyle">
							<u-icon size="60" :name="txlSrc" slot="icon"></u-icon>
						</u-cell-item>
					</u-cell-group>
				</view>
			</view>
		</view>
		<u-modal v-model="showTips" :show-cancel-button="true" :mask-close-able="true" confirm-text="出租车驾驶证" cancel-text="网约车驾驶证"
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
				jzrzSrc:'../../static/jiazhao.png',
				zyzgSrc:'../../static/yingyezhizhao.png',
				zcxuSrc:'../../static/zuche.png',
				qzxuSrc:'../../static/qiuzhi-c.png',
				wdpdSrc:"../../static/pindan.png",
				scSrc:"../../static/shoucang.png",
				xxSrc:"../../static/xiaoxi.png",
				txlSrc:"../../static/tongxunlu.png",
				state:'',
				titleStyle:{'fontSize': '12pt','padding-left':'5pt','color':'#000000'},
				driverPub:{
					headPhoto:'../../static/driverSrc.png',
					name:'',
					telephone:'',
					driverState:9,
					postState:9,
					jobNum:0,
					carNum:0,
					certificationType:""
				},
			}
		},
		filters: {
		  stateV: function (value) {
		    if (value === 2) {
				return '已认证'
			} else if (value === 0){
				return '未认证'
			} else if (value === 1){
				return '审核中'
			} else if (value === 3){
				return '认证未通过'
			}else {
				return '不可见'
			}
		  }
		},
		mounted() {
			this.token = uni.getStorageSync('token')
			this.getUser()  
		},
		methods: {
			getUser(){
			this.token = uni.getStorageSync('token')
              if (this.token){
				 this.$u.api.listUserMessage().then(res=>{
					if(res.code === 200){
						let data = res.object;
						uni.setStorageSync('isauthencation',data.driverState)
						this.driverPub = data
						this.driverPub.jobNum = this.driverPub.jobNum.toString()
						this.driverPub.carNum = this.driverPub.carNum.toString()
					}else {
						 this.$u.toast(res.msg);
					}
				})
			  }
			},
			toLogin(){
				 this.$u.route('/pages/login/login');
			},
			tipsConfirm(){
				let token = uni.getStorageSync('token')
				if (token){
					this.$u.route("/pages/driver/taxiCar/taxiCar")
				}
			},
			tipsCancel(){
				let token = uni.getStorageSync('token')
				if (token){
					this.$u.route("/pages/driver/onlineCar/onlineCar")
				}
			},
			toMyInfo(){
				let token = uni.getStorageSync('token')
				if (token){
					this.$u.route("/pages/driver/baseInfo/baseInfo")
				}
			},
			toLicense(){
				   if (this.driverPub.driverState !==9){
					   	this.$u.route("/pages/driver/drivingLicense/drivingLicense")
				   }
			},
			toMyPub(index){
				let token = uni.getStorageSync('token')
				if (token){
					this.$u.route("/pages/driver/myPub/myPub",{index:index})
				}
			},
			toCard(){
				let token = uni.getStorageSync('token')
				if (token){
				if(this.driverPub.postState === 0 || this.driverPub.postState === 9){
					this.showTips = true
				} else {
					if(this.driverPub.certificationType === 1){
						this.$u.route("/pages/driver/onlineCar/onlineCar")
					}
					if(this.driverPub.certificationType === 2){
						this.$u.route("/pages/driver/taxiCar/taxiCar")
					}

				}
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
