<template>
	<view>
		<u-navbar back-text="杭州" back-icon-size="0" back-icon-color="#333333" title="" :background="background" title-color="#333333"
		 v-show="navBarShow">
			<view class="navbar-right" slot="right">
				<view class="message-box right-item" @click="message">
					<u-icon name="bell" color="#333333" size="38"></u-icon>
					<u-badge size="mini" type="error" :count="num" :offset="[-10,-14]"></u-badge>
				</view>
			</view>
		</u-navbar>
		<scroll-view scroll-y style="height: 1000px;width: 100%;" @scroll="scrollView" @scrolltoupper="scrollToupper">
			<view class="wrap">
				<u-swiper :list="list" height="500" mode="round" @click="toSwiperPage"></u-swiper>
				 <transition name="fade">
					 <view v-show="!navBarShow">
				<view style="position: absolute;top: 40px;left: 2%;color: #fff;font-size: 10pt;" >
					杭州
					<!-- <u-icon name="arrow-down-fill" color="#ffffff" size="26" style="margin-left: 4px;"></u-icon> -->
				</view>
				<view style="position: absolute;top: 40px;right: 2%;" @click="message">
					<view style="position: relative;">
						<u-icon name="bell" color="#ffffff" size="38"></u-icon>
						<u-badge size="mini" type="error" :count="num" :offset="[-10,-14]"></u-badge>
					</view>
				</view>
				 </view>
				</transition>
			</view>
			<view class="bg_btn">
				<view style="width: 164px;" @click="toPage(1)">
					<u-image src="../../static/cheliangzulin@3x.png" height="140rpx" border-radius="8"></u-image>
				</view>
				<view style="width: 164px;" @click="toPage(2)">
					<u-image src="../../static/sijizhaopin@3x.png" height="140rpx" border-radius="8"></u-image>
				</view>
			</view>
			<view class="kszc">
				<view style="font-size: 20px;color: #333333;padding: 10px 0;">快速找车</view>
				<view style="display: flex;justify-content: space-around;">
					<view v-for="(item,index) in tuBiaoList" :key="index" style="width: 17%;" @click="toIndexCar(item.text)">
						<u-image :src="item.url" height="110rpx"></u-image>
						<view class="kszc_title">{{item.text}}</view>
					</view>
				</view>

				<view style="margin-top: 10px;">
					<view class="money_tag" v-for="(info,index) in moneyList" :key="index" @click="toIndexId(info.id)">
						{{info.text}}
					</view>
				</view>
			</view>
			<view class="djhc">
				<view class="djhc_title">低价好车</view>
				<view class="djhc_link" @click="toChild(1)">
					<text>精选好车，价廉质优</text>
					<view>
						<u-icon name="arrow-right" color="#FF5A00" size="32"></u-icon>
					</view>
				</view>
				<scroll-view class="scroll-view_H" scroll-x="true" scroll-left="0">
					<view class="scroll-view-item_H" @click="toView(item)" :style="{marginLeft:index==0?'10px':0}" v-for="(item, index) in lowPriceList"
					 :key="item.comparymainid">
						<view style="background: #FFFFFF;">
							<u-image :src="item.photourl" height="166rpx" border-radius="8"></u-image>
						</view>
						<view class="bg_fff" style="padding: 4px 4px 0;">
							<view class="djhc_model u-line-1">{{item.carname}}</view>
							<view class="djhc_power u-line-1">{{item.power}}/≤{{item.carage}}年</view>
							<view class="djhc_money">¥{{item.lowprice}}/月</view>
						</view>
					</view>
				</scroll-view>
			</view>
			<view class="xcfl">
				<view class="xcfl_title">福利车型</view>
				<view class="xcfl_link" @click="toChild(2)">
					<text>送租期 送电费 送维修</text>
					<view>
						<u-icon name="arrow-right" color="#6D6D6D" size="32"></u-icon>
					</view>
				</view>
				<swiper :current="swiperCurrent" indicator-dots="true" indicator-color="#f5f5f5" indicator-active-color="#FF5A00"
				 style="height: 180px;">
					<swiper-item class="swiper-item" v-for="(item, index) in lists" :key="index">
						<view style="display: flex;justify-content: space-around;padding: 0 10px;">
							<view v-for="(info,i) in welfareList[index]" :key="info.comparymainid" @click="toView(info)" style="" class="swiper_xcfl">
								<u-image :src="info.photoUrl" height="168rpx" border-radius="8" class="border_radius"></u-image>
								<view class="swiper_price">¥{{info.packPrice}}/月</view>
								<view class="bg_fff" style="padding:12px 4px 6px;">
									<view class="djhc_model u-line-1">{{info.carBrand}} {{info.carText}}</view>
									<view class="djhc_power u-line-1">{{info.companyName}}</view>
								</view>
							</view>
						</view>
					</swiper-item>
				</swiper>
			</view>

			<!-- 司机服务 -->
			<view class="xcfl">
				<view class="xcfl_title">司机服务</view>
				<view class="xcfl_link" @click="taPage(0)">
					<text>用车 跑单 技巧 活动</text>
					<view>
						<u-icon name="arrow-right" color="#6D6D6D" size="32"></u-icon>
					</view>
				</view>
				<view class="driverTexts">
					<view class="" @click="taPage(0)">
						<image style="width: 107px; height: 106px;" src="../../static/siji_1.png"></image>
					</view>
					<view class="" @click="taPage(1)">
						<image style="width: 107px; height: 106px;" src="../../static/siji_2.png"></image>
					</view>
					<view class="driverTexts_1">
						<view class="" @click="taPage(2)">
							<image style="width: 107px; height: 48px;" src="../../static/siji_3.png"></image>
						</view>
						<view class="" @click="taPage(3)">
							<image style="width: 107px; height: 48px;" src="../../static/siji_4.png"></image>
						</view>
					</view>
				</view>
			</view>

			<view class="xcfl" style="padding-bottom: 40pt;">
				<view class="xcfl_title">优质租赁公司</view>
				<view class="xcfl_link">
					<text>租车安心首选</text>
				</view>
				<view class="bestcom_content" v-for="(item,index) in companyList">
					<u-row>
						<u-col span="4" @click="toShopPage(item.userMainId)">
							<view style="background: #FFFFFF;">
								<u-image :src="item.companyLogoPhoto" height="180rpx" mode="scaleToFill" border-radius="8"></u-image>
							</view>

						</u-col>
						<u-col span="8" @click="toShopPage(item.userMainId)">
							<view style="color: #000000;font-size: 16px;" class="u-line-1">{{item.companyName}}</view>
							<view class="bestcom_car u-line-1">
								<text v-for="(car,index) in item.companyCartag" :key="index">{{car}} {{index==0 && item.companyCartag.length>1?' / ':''}}</text>
							</view>
							<!-- 								<view class="bestcom_car u-line-1" style="display: inline-block;" >
									<text v-for="(car,index) in item.companyCartag" :key="index">{{car}}</text>
								</view> -->
							<view class="u-line-1" style="display: flex;justify-content: space-between;line-height: 30px;height: 30px;align-items: flex-end;">
								<view style="color: #FF5200;font-size: 12px;">
									<text style="font-size: 18px;font-weight: bold;vertical-align: bottom;">¥{{item.companyPrice}}</text>
									<text style="display: inline-block;padding-left: 2px;">/月起租</text>
								</view>
								<view style="color: #666666;font-size: 12px;vertical-align: bottom;">{{item.area}}</view>
							</view>
						</u-col>
					</u-row>
				</view>
			</view>
		</scroll-view>
		<phone-auth :ids="comparyid" :status="4" v-show="openShow" ref="other"></phone-auth>
	</view>
</template>

<script>
	import {
		format
	} from '@/common/rule.js'
	import phoneAuth from '@/components/phoneAuth.vue'
	export default {
		components: {
			phoneAuth
		},
		data() {
			return {
				comparyid: '',
				openShow: false,
				background: {
					'background-image': 'linear-gradient(to bottom, #000000 39%,#ffffff 0%)'
				},
				list: [{
					image: '../../static/banner_1@3x.png'
				}, {
					image: '../../static/banner_2@3x.png'
				}, {
					image: '../../static/banner_3@3x.png'
				}],
				lists:[2,3,4],
				tuBiaoList: [{
						url: '../../static/biyadi@2x.png',
						text: '比亚迪'
					},
					{
						url: '../../static/rongwei@2x.png',
						text: '荣威'
					},
					{
						url: '../../static/beiqixinnnegyuan@2x.png',
						text: '吉利'
					},
					{
						url: '../../static/changan@2x.png',
						text: '长安'
					},
					{
						url: '../../static/richan@2x.png',
						text: '东风'
					}
				],
				moneyList: [{
					text: '2千/月',
					id: 2
				}, {
					text: '2-3千/月',
					id: 3
				}, {
					text: '3-4千/月',
					id: 4
				}, {
					text: '4千以上/月',
					id: 5
				}],
				searchForm: {
					businesstype: '',
					carbrand: '',
					cartype: '',
					city: '杭州',
					startCarAge: '',
					endCarAge: '',
					startPriceid: '',
					endPriceid: '',
					pageNum: 1,
					pageSize: 10,
					km: '',
					power: '',
					islogin: ''
				},
				title: '不限',
				lowPriceList: [],
				welfareList: [],
				swiperCurrent: 0,
				num: 0,
				time: '',
				swiperList: [],
				navBarShow: false,
				companyList: []
			}
		},
		mounted() {
			this.getList()
		},
		methods: {
			scrollView(e) {
				if (e.target.scrollTop > 50) {
					this.navBarShow = true;
				} else {
					this.navBarShow = false
				}
			},
			scrollToupper() {
				this.navBarShow = false
			},
			initBanner(){
				this.$u.api.popupConfig({
					function: 'banner_basicConf',
					type: 'VISITOR'
				}).then(res => {
					if (res.code === 200) {
						let data = res.object;
						if (data) {
							let imgList = JSON.parse(data[0].result)
							let arr = []
							imgList.forEach(item=>{
								arr.push({image:item.photo,url:item.url})
							})
							this.list = arr;
						}
					} else {
						this.$u.toast(res.msg);
					}
				})
			},
			toIndexId(id) {
				this.$u.api.setEvent({eventId:"sy-ayz",type:3,params:{'price':this.title}})
				uni.setStorageSync('priceidDri', id);
				this.$u.route({url:'/pages/index/index',type:'switchTab'})
			},
			toIndexCar(text) {
				uni.setStorageSync('carbrandDriver', text);
				this.$u.api.setEvent({eventId:"sy-app",type:3,params:{'carBrand':text}})
				this.$u.route({url:'/pages/index/index',type:'switchTab'})
				
			},

			//低价好车
			getList() {
				this.$u.api.driverSideHomePage({
					pageNum: 1,
					pageSize: 6
				}).then(res => {
					if (res.code === 200) {
						this.lowPriceList = res.rows
					} else {
						this.$u.toast(res.msg);
					}
				})
				this.initBanner()
				this.getWelfareList()
				this.getMessageNum()
				this.getYzsjList()
			},
			toShopPage(id) {
				this.comparyid = id;
				this.openShow = true;
				this.$refs.other.getStatus()
			},
			//获取优质租赁公司
			getYzsjList() {
				uni.request({
					url: 'http://image.neocab.cn/yzsj', //接口地址
					success: (res) => {
						if (res.statusCode === 200) {
							this.companyList = res.data.RECORDS;
						}
					}
				});
			},
			//新春福利list
			getWelfareList() {
				this.$u.api.getYearWelfare({
					pageNum: 1,
					pageSize: 9,
					orderByColumn: "newyear.sort",
					isAsc: "desc"
				}).then(res => {
					if (res.code === 200) {
						let data = res.rows;
						let arr0 = data.slice(0, 3)
						let arr1 = data.slice(3, 6)
						let arr2 = data.slice(6, 9)
						this.welfareList = [arr0, arr1, arr2]
					} else {
						this.$u.toast(res.msg);
					}
				})
			},

			// 司机服务
			taPage(sum) {
				// this.$u.route('/pages/driver/driverService/driverService',{index:sum})
				uni.navigateTo({
					url: '/pages/driver/driverService/driverService?index=' + sum
				})
			},

			//站内信条数
			getMessageNum() {
				let token = uni.getStorageSync('token');
				if (token) {
					this.$u.api.haveIs().then(res => {
						if (res.code === 200) {
							this.num = res.object.titlenum;
							if (res.object.recentlytime) {
								this.time = format(res.object.recentlytime, 'yyyy-MM-dd HH:mm');
							} else {
								this.time = ""
							}
						} else {
							this.$u.toast(res.msg);
						}
					})
				}
			},
			toSwiperPage(index) {
				let url = this.list[index].url;
				if(url){
					this.$u.route(url)
					this.$u.api.setEvent({eventId:"sy-bn",type:3,params:{url:url}})
				}
			},
			message() {
				let token = uni.getStorageSync('token');
				if (token) {
					this.$u.route("/pages/index/company/components/index/message", {
						time: this.time
					})
				} else {
					this.$u.route('/pages/login/login');
				}
			},
			toPage(type) {
				if (type === 1) {
					this.$u.api.setEvent({eventId:"sy-zl",type:3})
					this.$u.route({
						url: '/pages/index/index',
						type: 'switchTab'
					})
					
				} else {
					this.$u.api.setEvent({eventId:"sy-zp",type:3})
					this.$u.route({
						url: '/pages/mymessage/mymessage',
						type: 'switchTab'
					})
				}
			},
			toChild(type) {
				if (type === 1) {
					this.$u.route({
						url: '/pages/init/affordableCar',
					})
					this.$u.api.setEvent({eventId:"sy-djli",type:3})
				} else {
					this.$u.route({
						url: '/pages/init/newYearWelfare',
					})
					this.$u.api.setEvent({eventId:"sy-xcfl",type:3})
				}
			},
			toView(item) {
				if (item.params) {
					this.$u.api.setEvent({eventId:"sy-xcfl-nysy",type:3})
				} else {
					this.$u.api.setEvent({eventId:"sy-djhcny-csy",type:3})
				}
				this.$u.route('/pages/index/driver/components/index/carRentDetail', {
					id: item.comparymainid,
					tags: item.params
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.fade-enter-active, .fade-leave-active {
	  transition: opacity .5s;
	}
	.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
	  opacity: 0;
	}
	.navbar-left {
		margin-left: 24rpx;
	}

	.navbar-right {
		margin-right: 24rpx;
		display: flex;
	}

	.right-item {
		margin: 0 12rpx;
		position: relative;
		// color: #ffffff;
		display: flex;
	}

	.wrap /deep/ .u-swiper-indicator {
		bottom: 60px !important;
	}

	.wrap_text_left {
		position: absolute;
		top: 20px;
		left: 1%;
		color: #fff;
		font-size: 16px;
	}

	.wrap_text_right {
		position: absolute;
		top: 20px;
		right: 1%;
	}

	.bg_btn {
		display: flex;
		justify-content: space-around;
		align-items: center;
		margin-top: -40px;
	}

	.swiper_xcfl {
		width: 31%;
		position: relative;
		background-color: #FFFFFF;
		box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.1);
	}

	.kszc {
		padding: 15px;

		.kszc_title {
			color: #333333;
			height: 22pt;
			line-height: 22pt;
			font-size: 12px;
			text-align: center;
		}
	}

	.kszc_tb {
		display: flex;
		justify-content: space-between;
		// align-items: center;
	}

	.money_tag {
		display: inline-block;
		width: 22%;
		margin-right: 3%;
		background: #F6F6F6;
		text-align: center;
		padding: 8px 0;
		font-size: 10pt;
		border-radius: 4px;
		color: #333333;
	}

	.djhc {
		background-image: url('../../static/dijiahaoche@2x.png');
		background-size: 100%;
		background-size: cover;
		height: 268px;

		.djhc_title {
			color: #FF5A00;
			font-size: 20px;
			padding: 6px 15px;
		}

		.djhc_link {
			color: #FF5A00;
			font-size: 14px;
			padding: 0 15px 6px;
			display: flex;
			justify-content: space-between;
		}



		.djhc_money {
			color: #FF5A00;
			font-size: 14px;
			padding: 4px 0;
		}
	}

	.border_radius {
		border-top-left-radius: 4px;
		border-top-right-radius: 4px;
		border-bottom-right-radius: 0px;
		border-bottom-left-radius: 4px;
	}

	// 司机服务
	.driverTexts {
		padding: 12rpx 30rpx;
		display: flex;
		justify-content: space-between;

		.driverTexts_1 {
			display: flex;
			flex-direction: column;
			justify-content: space-between;
		}
	}

	.xcfl {
		background: #FFFFFF;

		.xcfl_title {
			font-size: 20px;
			padding: 6px 15px;
			color: #000000;
		}

		.xcfl_link {
			font-size: 14px;
			padding: 0 15px 6px;
			display: flex;
			color: #6D6D6D;
			justify-content: space-between;
		}
	}

	.bg_fff {
		background-color: #FFFFFF;
		text-align: center;
		box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.05);
		border-bottom-right-radius: 4px;
		border-bottom-left-radius: 4px;

		.djhc_model {
			color: #333;
			padding: 2px 0;
		}

		.djhc_power {
			color: #6D6D6D;
			padding: 2px 0;
		}
	}

	.swiper_price {
		position: absolute;
		top: 72px;
		left: 17%;
		width: 74px;
		color: #FFFFFF;
		text-align: center;
		background: linear-gradient(270deg, #FF342D 0%, #FF4600 44%, #FF5A00 100%);
		border-radius: 4px 0px 4px 0px;
	}

	.scroll-view_H {
		white-space: nowrap;
		width: 100%;
	}

	.scroll-view-item_H {
		display: inline-block;
		width: 36%;
		margin-right: 10pt;
		text-align: center;
	}

	.bestcom_content {
		padding: 10px 0px;
		margin: 0 15px;
		border-bottom: 0.5px solid #E0E0E0;

		.bestcom_car {
			display: inline-block;
			margin: 6px 0;
			background: #FFEEEA;
			color: #F66F44;
			padding: 1px 4px;
			border-radius: 2px;
		}
	}
</style>
