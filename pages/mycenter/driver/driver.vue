<template>
	<view>
		<view class="content">
			<view style="padding: 15pt;">
				<view class="avater">
					<u-row style="margin-top: 10pt;background-color: #FFFFFF;padding: 6pt 0;">
						<u-col span="3" v-show="!tokenFlag">
							<u-avatar src="../../static/driverSrc.png" mode="circle" size="large" ></u-avatar>
						</u-col>
						<u-col span="3" v-show="tokenFlag" >
							<u-avatar :src="driverPub.headPhoto" mode="circle" size="large" ></u-avatar>
						</u-col>
						<u-col span="8" v-show="!tokenFlag">
							<view style="font-size: 14pt;">欢迎来到纽车科技</view>
							<text class="btn-mini bg" @click="toLogin">登录/注册</text>
						</u-col>
						<u-col span="8" v-show="tokenFlag" >
							<view @click="toMyInfo">
							<view style="font-size: 14pt;">{{driverPub.name}}</view>
							<text style="font-size: 12pt;">{{driverPub.telephone}}</text>
							</view>
						</u-col>
						<u-col span="1" @click="toMyInfo" v-show="tokenFlag">
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
				<u-row class="my_title">
					<u-col span="4">我的发布</u-col>
					<u-col span="8" style="text-align: right;color: rgb(252, 187, 48);font-size: 14px;" @click="toPublishPage">发布需求</u-col>
				</u-row>
				<view class="bgf">
					<u-cell-group >
						<u-cell-item title="租车需求" @click="toMyPub(0)" :title-style="titleStyle" :value="driverPub.carNum == 0?'未发布':'已发布'">
							<u-icon size="60" :name="zcxuSrc" slot="icon"></u-icon>
						</u-cell-item>
						<u-cell-item title="求职需求" @click="toMyPub(1)" :title-style="titleStyle" :value="driverPub.jobNum == 0?'未发布':'已发布'">
							<u-icon size="60" :name="qzxuSrc" slot="icon"></u-icon>
						</u-cell-item>
						<u-cell-item title="收藏" :title-style="titleStyle" @click="toCollect()">
							<u-icon size="60" :name="scSrc" slot="icon"></u-icon>
						</u-cell-item>
					</u-cell-group>
				</view>
				<view class="my_title">
					其他
				</view>
				<view class="colorF">
					<u-cell-group>
						
					   <u-cell-item  title="客服" value="0571-87815287" @click="toCustomer" :title-style="titleStyle">
							<u-icon size="60" :name="xxSrc" slot="icon"></u-icon>
						</u-cell-item>
						<u-cell-item  title="用户帮助" :title-style="titleStyle" @click="tohelps">
							<u-icon size="60" name="question-circle-fill" color="#FF9400" slot="icon"></u-icon>
						</u-cell-item>
						<u-cell-item  title="意见反馈" @click="toFeedback" :title-style="titleStyle">
							<u-icon size="60" name="edit-pen-fill" color="#FF9400" slot="icon"></u-icon>
						</u-cell-item>
						<u-cell-item  title="邀请好友" :title-style="titleStyle" @click="toInvite">
							<u-icon size="60" name="man-add-fill" color="#FF9400" slot="icon"></u-icon>
						</u-cell-item>
						<!-- <u-cell-item title="我的拼单" :title-style="titleStyle">
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
						</u-cell-item> -->
					</u-cell-group>
				</view>
			</view>
		</view>
		<u-modal v-model="showTips" :show-cancel-button="true" :mask-close-able="true" confirm-text="出租车驾驶证" cancel-text="网约车驾驶证"
		 @confirm="tipsConfirm" @cancel="tipsCancel" >
			<view class="slot-content" style="padding: 10pt;font-size: 10pt;">
		        <view class="">
		        	请选择要上传的职业资格证件!
		        </view>
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
					certificationType:"",
					shareId:''
				},
				token:''
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
		props:["authFlag","tokenFlag"],
		methods: {
			getUser(){
			this.token = uni.getStorageSync('token')
              if (this.token){
				 this.$u.api.listUserMessage().then(res=>{
					if(res.code === 200){
						let data = res.object;
						// uni.setStorageSync('isauthencation',data.driverState)
						this.driverPub = data
						this.driverPub.jobNum = this.driverPub.jobNum.toString()
						this.driverPub.carNum = this.driverPub.carNum.toString()
					}else {
						 this.$u.toast(res.msg);
					}
				})
			  }
			},
			toFeedback(){
				this.$u.route('/pages/mycenter/driver/feedback');
			},
			tohelps(){
				this.$u.route('/pages/driver/helps/helps')
			},
			toCustomer(){
				uni.makePhoneCall({
				    phoneNumber: '0571-87815287' 
				});
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
				}else{
					this.toLogin()
				}
			},
			toInvite(){
				let token = uni.getStorageSync('token')
				if (token){
					if(this.driverPub.driverState === 2){
						this.$u.route("/pages/driver/inviteFriends/inviteFriends",{shareId:this.driverPub.shareId})
					} else{
						this.$u.toast('请先进行认证')
					}
				}else{
					this.toLogin()
				}
			},
			toCollect(){
				let token = uni.getStorageSync('token')
				if (token){
					if(this.driverPub.driverState === 2){
						this.$u.route("/pages/mycollect/mycollect")
					} else{
						this.$u.toast('请先进行认证')
					}
				}else{
					this.toLogin()
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
				}else{
					this.toLogin()
				}
			},
			toCard(){
				let token = uni.getStorageSync('token')
				if (token){
					if(this.driverPub.driverState ===9 || this.driverPub.driverState === 0){
						this.$u.toast('请先认证驾照')
						return
					}
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
			},
			toPublishPage(){
				let token = uni.getStorageSync('token');
				   if (token){
					   let role = uni.getStorageSync('role');
						   uni.navigateTo({
							   url: '/pages/driver/release/release'
						   });
				   } else {
						uni.showToast({
							title:"请先登录，认证" 
						  })
				   }
			},
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
		font-size: 14pt;
		padding-left: 3pt;
		margin: 19pt 0 12pt;
	}
</style>
