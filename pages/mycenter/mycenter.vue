<template>
	<view :class="curThemeType ==='driver'?'driver-content':'company-content'">
	        <u-navbar :is-back="false" title="我的" :background="curThemeType ==='driver'?backgroundDri:backgroundCom" height='44' title-color="#FFFFFF">
				<view class="navbar-right" slot="right">
					<view class="message-box right-item">
						<text v-show = "curThemeType !=='driver'" @click="toAboutUs">关于</text>
						<u-icon v-show = "curThemeType ==='driver'" name="info-circle" size="38" @click="toAboutUs"></u-icon>
					</view>
				</view>
			</u-navbar>
			<view class="content" v-show = "curThemeType ==='driver'">
				<view style="padding: 20pt 15pt;">
					<view class="avater">
						<u-row>
							<u-col span="3" style="margin: -10pt 5pt 5pt 9pt;">
								<u-avatar :src="driverSrc" mode="circle" size="large" ></u-avatar>
							</u-col>
							<u-col span="5" style="margin: 10pt 0pt">
								<view>欢迎来到纽车科技</view>
								<text class="btn-mini bg" @click="toLogin">登录/注册</text>
							</u-col>
						</u-row>
						<view class="bg" style="padding: 4pt 0;" >
						 <u-row>
							<u-col span="2">
								<u-image width="100%" height="100rpx" :src="driverSrc"></u-image>
							</u-col>
							<u-col span="3">
									<text class="colorF">驾照认证</text>
									<view class="colorF">未认证</view>
							</u-col>
							<u-col span="2">
								<view class="colorF" style="text-align: center;">|</view>
							</u-col>
							<u-col span="2">
								<u-image width="100%" height="100rpx" :src="driverSrc"></u-image>
							</u-col>
							<u-col span="3">
									<text class="colorF">驾照认证</text>
									<view class="colorF">未认证</view>
							</u-col>
						  </u-row>
						</view>
					</view>
					
					<view class="my_title">
						我的发布
					</view>
					<view class="bgf">
						<u-cell-group >
							<u-cell-item icon="setting-fill" title="租车需求" :title-style="titleStyle" value="已发布"></u-cell-item>
							<u-cell-item icon="integral-fill" title="求职需求" :title-style="titleStyle" value="未发布"></u-cell-item>
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
			<view v-show="curThemeType !=='driver'" style="padding: 8pt;">
				<view>
					<view class="imgUrl">
						<u-row style="padding:10pt 10pt 15pt; ">
							<u-col span="3">
								<u-avatar :src="comnpanySrc" mode="circle" size="large" ></u-avatar>
							</u-col>
							<u-col span="8" v-if="companyName === ''">
								<view @click="toLogin" style="color: #fff;font-size: 14pt;">请登录/注册</view>
							</u-col>
							<u-col span="8" v-else>
								<view @click="toAuth" style="color: #fff;font-size: 14pt;">{{companyName}}</view>
								<view class="colorF">{{companyStatus | state}}</view>
								<view v-if="companyStatus === 4">原因 {{reson}}</view>
							</u-col>
						</u-row>
					</view>
				<view class="bgf" style="margin: 15pt 0;">
					<u-row style="padding: 8pt;border-bottom: 1rpx solid #dedede;">
						<u-col span="4">我的发布</u-col>
						<u-col span="8" style="text-align: right;color: #7E7E7E;" @click="toShopPage">店铺首页>></u-col>
					</u-row>
					<u-row style="padding:8pt">
						
						<u-col span="2" @click="toPub(0)">
							<u-image width="100%" height="48rpx"  :src="zcxxsrc"></u-image>
						</u-col>
						<u-col span="4" @click="toPub(0)">
							<view class="font-14pt">租车信息</view>
							<view class="font-10pt">
							<text style="width: 50pt;display: inline-block;">{{myPublishObj.zcxx}}</text>
							<u-icon name="arrow-right" color="#7E7E7E"></u-icon>
							</view>
						</u-col>
						<u-col span="2" @click="toPub(1)">
							<!-- <u-image width="100%" height="50rpx" :src="zlzmsrc"></u-image> -->
							<u-avatar :src="zlzmsrc" mode='square'></u-avatar>
						</u-col>
						<u-col span="4" @click="toPub(1)">
							<view class="font-14pt">车辆转卖</view>
							<view class="font-10pt">
							<text style="width: 50pt;display: inline-block;">{{myPublishObj.clzm}}</text>
							<u-icon name="arrow-right" color="#7E7E7E"></u-icon>
							</view>
						</u-col>
					</u-row>
					<u-row style="padding:8pt">
						<u-col span="2" @click="toPub(2)">
							<u-avatar :src="qgxxsrc" mode='square'></u-avatar>
							<!-- <u-image width="100%" height="50rpx" :src="qgxxsrc"></u-image> -->
						</u-col>
						<u-col span="4" @click="toPub(2)">
							<view class="font-14pt">求购信息</view>
							<view class="font-10pt">
							<text style="width: 50pt;display: inline-block;">{{myPublishObj.qgxx}}</text>
							<u-icon name="arrow-right" color="#7E7E7E"></u-icon>
							</view>
						</u-col>
						<u-col span="2" @click="toPub(3)">
							<u-avatar :src="zpxxsrc" mode='square'></u-avatar>
							<!-- <u-image width="100%" height="130rpx" :src="zpxxsrc"></u-image> -->
						</u-col>
						<u-col span="4" @click="toPub(3)">
							<view class="font-14pt">招聘信息</view>
							<view class="font-10pt">
							<text style="width: 50pt;display: inline-block;">{{myPublishObj.zpxx}}</text>
							<u-icon name="arrow-right" color="#7E7E7E"></u-icon>
							</view>
						</u-col>
					</u-row>
					</view>
			    </view>	
					
				<view class="colorF">
					<u-cell-group>
						<u-cell-item  title="其他" :title-style="titleStyle" :arrow="false"></u-cell-item>
						<u-cell-item  title="收藏" :value="otherObj.sc" :title-style="titleStyle"></u-cell-item>
						<u-cell-item  title="消息" :value="otherObj.xx" :title-style="titleStyle"></u-cell-item>
						<u-cell-item  title="群组" :value="otherObj.qz" :title-style="titleStyle"></u-cell-item>
					</u-cell-group>
				</view>
			</view>
	
	</view>
</template>

<script>
	export default {
		data() {
			return {
				wagesheight:0,
				companyName:'',
				companyStatus:'',
				reson:'',
				imageURL:'../../static/gongsi@2x.png',
				titleStyle:{'fontSize': '12pt','padding-left':'5pt','color':'#000000'},
				comnpanySrc: '../../static/touxx.png',
				driverSrc: '../../static/driverSrc.png',
				zcxxsrc:'../../static/sign104@2x.png',
				zlzmsrc:'../../static/iconfontzhizuobiaozhun023120@2x.png',
				qgxxsrc:'../../static/xuqiuguanli@2x.png',
				zpxxsrc:'../../static/chezhuzhaomu@2x.png',
				myPublishObj:{
					zcxx:'不可见',clzm:'不可见',qgxx:'不可见',zpxx:'不可见'
				},
				otherObj:{
					sc:'不可见',xx:'不可见',qz:'不可见'
				}
			}
		},
		mounted() {
		  // this.getUser()
		},
		onShow(){
		    this.telephone = uni.getStorageSync('telephone')
			this.getUser()  
		},
		filters: {
		  state: function (value) {
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
		methods: {
			getUser(){
				let phone = this.telephone;
				console.log(phone)
				if (phone) {
					this.$u.api.getUserInfo({telephone:phone}).then(res=>{
						if(res.code === 200){
							let data = res.personalVo;
							this.comnpanySrc =data.comparylogophoto;
							this.companyName = data.comparynickname;
							this.companyStatus = data.state;
							this.reson = data.nostate;
							let strF ='已发布';
							let strE = '条'
							this.myPublishObj.zcxx =strF+data.zunum+strE;
							this.myPublishObj.clzm =strF+data.zhuannum+strE;
							this.myPublishObj.qgxx =strF+data.qiushoppingnum+strE;
							this.myPublishObj.zpxx =strF+data.invitenum+strE;
							this.otherObj.sc = data.collectnum+strE;
							this.otherObj.xx = data.messagenum;
							this.otherObj.qz = data.groupmessagenum;
						}else {
							 this.$u.toast(res.msg);
						}
					})
				}
			},
			toAuth(){
				this.$u.route('/pages/company/information/information')
			},
			toAboutUs(){
				this.$u.route('/pages/aboutUs/aboutUs');
			},
			toLogin(){
				 this.$u.route('/pages/login/login');
			},
			toShopPage(){
				if (this.telephone){
					 this.$u.route('/pages/company/shop/shop');
				}
			},
			toPub(index){
				if(this.telephone){
					this.$u.route('/pages/company/myPublish/myPublish', {
						index: index
					});
				}
			}
		}
	}
</script>
<style lang="scss">
page {
	background-color: #F5F5F8;
}
</style>
<style lang="scss" scoped>
.driver-content{
	.bg{
		background: linear-gradient(55deg, $bg-grad-FE, $bg-grad-FCD),
	 }
}
.company-content{
	.bg{
		background: linear-gradient(55deg, $bg-grad-AB, $bg-grad-DDC),
	}
	
}
	.imgUrl{
			 background-image: url("../../static/gongsi@2x.png");
			 background-size:cover;
			 // background-size: 100% 100%;
			 // background-position: 50% 50%;
			 background-repeat: no-repeat;
	}
	.btn-mini{
		display: inline-block;
		color: #fff;
		padding: 3pt 5pt;
		border-radius: 6px;
		margin-top: 2pt;
	}
	.navbar-right {
		margin-right: 24rpx;
		display: flex;
	}
	.right-item {
		margin: 0 12rpx;
		position: relative;
		color: #ffffff;
		display: flex;
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
	.font-10pt{
		font-size: 10pt;
	}
	.font-14pt{
		font-weight: bold;
		font-size: 12pt;
	}
</style>

