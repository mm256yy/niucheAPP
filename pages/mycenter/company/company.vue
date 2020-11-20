<template>
	<view>
		<view style="padding: 8pt;">
			<view>
				<view class="imgUrl">
					<u-row style="padding:10pt 10pt 15pt; ">
						<u-col span="3">
							<u-avatar :src="comnpanySrc" mode="circle" size="large" ></u-avatar>
						</u-col>
						<u-col span="8" v-if="token === ''">
							<view @click="toLogin" style="color: #fff;font-size: 14pt;">请登录/注册</view>
						</u-col>
						<u-col span="8" v-else @click="toAuth">
							<view @click="toAuth" style="color: #fff;font-size: 14pt;">{{companyName}}</view>
							<view class="colorF">{{companyStatus | state}}</view>
							<view class="colorF u-line-2" v-if="companyStatus === 3">原因 :{{reson}}</view>
						</u-col>
						<u-col span="1">
							<u-icon name="arrow-right" color="#fff" size="30" @click="toAuth"></u-icon>
						</u-col>
						
						
					</u-row>
				</view>
			<view class="bgf" style="margin: 15pt 0;">
				<u-row style="padding: 8pt;border-bottom: 1rpx solid #dedede;">
					<u-col span="4">我的发布</u-col>
					<u-col span="8" style="text-align: right;color: #7E7E7E;" @click="toShopPage">店铺首页>></u-col>
				</u-row>
				<u-row style="padding:8pt 5pt">
					
					<u-col span="2" @click="toPub(0)">
						<u-image width="100%" height="48rpx"  :src="zcxxsrc"></u-image>
					</u-col>
					<u-col span="4" @click="toPub(0)">
						<view class="font-14pt">车辆租赁</view>
						<view class="font-10pt">
						<text style="width: 60pt;display: inline-block;">{{myPublishObj.zcxx}}</text>
						<u-icon name="arrow-right" color="#7E7E7E"></u-icon>
						</view>
					</u-col>
					<u-col span="2" @click="toPub(2)">
						<!-- <u-image width="100%" height="50rpx" :src="zlzmsrc"></u-image> -->
						<u-avatar :src="zlzmsrc" mode='square'></u-avatar>
					</u-col>
					<u-col span="4" @click="toPub(2)">
						<view class="font-14pt">车辆转卖</view>
						<view class="font-10pt">
						<text style="width: 60pt;display: inline-block;">{{myPublishObj.clzm}}</text>
						<u-icon name="arrow-right" color="#7E7E7E"></u-icon>
						</view>
					</u-col>
				</u-row>
				<u-row style="padding:8pt 5pt">
					<u-col span="2" @click="toPub(3)">
						<u-avatar :src="qgxxsrc" mode='square'></u-avatar>
						<!-- <u-image width="100%" height="50rpx" :src="qgxxsrc"></u-image> -->
					</u-col>
					<u-col span="4" @click="toPub(3)">
						<view class="font-14pt">求购信息</view>
						<view class="font-10pt">
						<text style="width: 60pt;display: inline-block;">{{myPublishObj.qgxx}}</text>
						<u-icon name="arrow-right" color="#7E7E7E"></u-icon>
						</view>
					</u-col>
					<u-col span="2" @click="toPub(1)">
						<u-avatar :src="zpxxsrc" mode='square'></u-avatar>
						<!-- <u-image width="100%" height="130rpx" :src="zpxxsrc"></u-image> -->
					</u-col>
					<u-col span="4" @click="toPub(1)">
						<view class="font-14pt">司机招募</view>
						<view class="font-10pt">
						<text style="width: 60pt;display: inline-block;">{{myPublishObj.zpxx}}</text>
						<u-icon name="arrow-right" color="#7E7E7E"></u-icon>
						</view>
					</u-col>
				</u-row>
				</view>
		    </view>	
				
			<view class="colorF">
				<u-cell-group>
					<u-cell-item  title="客服" value="niuchekeji" :title-style="titleStyle" @click="toCustomer"></u-cell-item>
					<!-- <u-cell-item  title="其他" :title-style="titleStyle" :arrow="false"></u-cell-item>
					<u-cell-item  title="收藏" :value="otherObj.sc" :title-style="titleStyle"></u-cell-item>
					<u-cell-item  title="消息" :value="otherObj.xx" :title-style="titleStyle"></u-cell-item>
					<u-cell-item  title="群组" :value="otherObj.qz" :title-style="titleStyle"></u-cell-item> -->
				</u-cell-group>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				companyName:'',
				companyStatus:'',
				reson:'',
				imageURL:'../../static/gongsi@2x.png',
				titleStyle:{'fontSize': '12pt','padding-left':'5pt','color':'#000000'},
				comnpanySrc: '../../static/touxx.png',
				zcxxsrc:'../../static/sign104@2x.png',
				zlzmsrc:'../../static/iconfontzhizuobiaozhun023120@2x.png',
				qgxxsrc:'../../static/xuqiuguanli@2x.png',
				zpxxsrc:'../../static/chezhuzhaomu@2x.png',
				myPublishObj:{
					zcxx:'不可见',clzm:'不可见',qgxx:'不可见',zpxx:'不可见'
				},
				otherObj:{
					sc:'不可见',xx:'不可见',qz:'不可见'
				},
				token:''
			}
		},
		mounted() {
			this.token = uni.getStorageSync('token')
			this.getUser();

		},
		onShow() {
			this.token = uni.getStorageSync('token')
		},
		filters: {
		  state: function (value) {
		    if (value === 2) {
				return '已认证'
			} else if (value === 0){
				return '未认证'
			} else if (value === 1){
				return '审核中'
			} else if (value === 3){
				return '认证未通过'
			}else {
				return ''
			}
		  }
		},
		methods: {
			getUser(){
				let token =  uni.getStorageSync('token')
				if (token) {
					this.$u.api.getUserInfo({}).then(res=>{
						if(res.code === 200){
							let data = res.personalVo;
							this.comnpanySrc =data.comparylogophoto;
							if (data.comparynickname){
								this.companyName = data.comparynickname;
							} else {
								let phone = uni.getStorageSync('telephone')
								this.companyName = phone
							}
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
							uni.setStorageSync('isauthencation',1)
						}else {
							let phone = uni.getStorageSync('telephone')
							this.companyName = phone
							uni.setStorageSync('isauthencation',0)
							 // this.$u.toast(res.message);
						}
					})
				}
			},
			toAuth(){
				let isauthencation = uni.getStorageSync('isauthencation');
				if (isauthencation){
					this.$u.route('/pages/company/information/information')
				} else{
					this.$u.route('/pages/company/identityAuth/identityAuth')
				}
				
			},
			toCustomer(){
				this.$u.route('pages/customer/customer')
			},
			toLogin(){
				 this.$u.route('/pages/login/login');
			},
			toShopPage(){
				if (this.token){
					 this.$u.route('/pages/company/shop/shop');
				}
			},
			toPub(index){
				if(this.token){
					this.$u.route('/pages/company/myPublish/myPublish', {
						index: index
					});
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
.company-content{
	.bg{
		background: linear-gradient(55deg, $bg-grad-AB, $bg-grad-DDC),
	}
}
	.imgUrl{
		 background-image: url("@/static/gongsi@2x.png");
		 background-size:cover;
		 // background-size: 100% 100%;
		 // background-position: 50% 50%;
		 background-repeat: no-repeat;
	}
	.colorF{
		color: $common-FFF;
	}
	/deep/ .bgf{
		background: $common-FFF;
	}
	.font-10pt{
		font-size: 10pt;
	}
	.font-14pt{
		font-weight: bold;
		font-size: 12pt;
	}
</style>
