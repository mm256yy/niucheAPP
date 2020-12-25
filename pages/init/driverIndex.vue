<template>
	<view>
		<view class="wrap">
			<u-swiper :list="list" height="500" mode="round" @click="toSwiperPage"></u-swiper>
			<text style="position: absolute;top: 40px;left: 2%;color: #fff;font-size: 14px;">杭州</text>
			<text style="position: absolute;top: 40px;right: 2%;" @click="message">
				<view style="position: relative;">
					<u-icon name="bell" color="#ffffff" size="40"></u-icon>
					<u-badge size="mini" type="error" :count="num" :offset="[-10,-14]"></u-badge>
				</view>
			</text>
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
			<view style="font-size: 20px;color: #333333;padding: 10pt 0;">快速找车</view>
			<view style="display: flex;justify-content: space-around;">
				<view v-for="(item,index) in tuBiaoList" :key="index" style="width: 17%;" @click="toIndexCar(item.text)">
					<u-image :src="item.url" height="110rpx"></u-image>
					<view class="kszc_title">{{item.text}}</view>
				</view>
			</view>

			<view style="margin-top: 10pt;">
				<view class="money_tag" v-for="(info,index) in moneyList" :key="index" @click="toIndexId(info.id)">
					{{info.text}}
				</view>
			</view>
		</view>
		<view class="djhc">
			<view class="djhc_title">低价好车</view>
			<view class="djhc_link" @click="toChild(1)">
				<text>平台精选好车，价低质不低</text>
				<text>
					<u-icon name="arrow-right" color="#FF5A00" size="38"></u-icon>
				</text>
			</view>
			<scroll-view class="scroll-view_H" scroll-x="true" scroll-left="0">
				<view class="scroll-view-item_H" @click="toView(item.comparymainid)" :style="{marginLeft:index==0?'10px':0}" v-for="(item, index) in lowPriceList"
				 :key="item.comparymainid">
					<view>
						<u-image :src="item.photourl" height="130rpx"></u-image>
					</view>
					<view class="bg_fff" style="padding: 5px 5px 0;">
						<view class="djhc_model u-line-1">{{item.carname}}</view>
						<view class="djhc_power u-line-1">{{item.power}}/{{item.carage}}</view>
						<view class="djhc_money">{{item.lowprice}}元/月</view>
					</view>
				</view>
			</scroll-view>
		</view>
		<view class="xcfl">
			<view class="xcfl_title">新春福利</view>
			<view class="xcfl_link" @click="toChild(2)">
				<text>送油 送保养 送免租</text>
				<text>
					<u-icon name="arrow-right" color="#6D6D6D" size="38"></u-icon>
				</text>
			</view>
			<swiper :current="swiperCurrent" indicator-dots="true" indicator-color="#ffffff" indicator-active-color="#FF5A00"
			 style="height: 180px;">
				<swiper-item class="swiper-item" v-for="(item, index) in list" :key="index">
					<view style="display: flex;justify-content: space-around;padding: 0 10px;">
						<view v-for="(info,index) in welfareList[index]" :key="info.comparymainid" @click="toView(info.comparymainid)"
						 style="width: 31%;position: relative;">
							<u-image :src="info.photoUrl" height="160rpx"></u-image>
							<view class="swiper_price">¥{{info.packPrice}}/月</view>
							<view class="bg_fff" style="padding: 5px 5px 0;">
								<view class="djhc_model u-line-1">{{info.carBrand}} {{info.carText}}</view>
								<view class="djhc_power u-line-1">{{info.companyNickName || info.companyName}}</view>
							</view>
						</view>
					</view>
				</swiper-item>
			</swiper>
		</view>
		<view class="xcfl" style="padding-bottom: 40pt;">
			<view class="xcfl_title">优质商家推荐</view>
			<view class="xcfl_link">
				<text>好商家，租车安心首选</text>
			</view>
			<view style="padding:10px 15px;" v-for="i in 6">
				<u-row>
					<u-col span="4">
						<u-image src="http://pic1.jisuapi.cn/car/static/images/logo/300/6839.jpg" height="180rpx"></u-image>
					</u-col>
					<u-col span="8">
						<view style="color: #000000;font-size: 12pt;">企业名称</view>
						<view style="text-align: right;padding: 8px 0;">
							<u-icon name="arrow-right" color="#6D6D6D" size="38"></u-icon>
						</view>
						<view style="color: #6D6D6D;">1111111111111</view>
					</u-col>
				</u-row>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		format
	} from '@/common/rule.js'
	export default {
		data() {
			return {
				list: [{
					image: '../../static/banner_1@3x.png'
				}, {
					image: '../../static/banner_2@3x.png'
				}, {
					image: '../../static/banner_3@3x.png'
				}],
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
				swiperList:[]
			}
		},
		mounted() {
			// this.getList()
		},
		methods: {
			toIndexId(id) {
				if (id === 2) {
					this.searchForm.startPriceid = '0';
					this.searchForm.endPriceid = '2000';
					this.title = '不限/2000以内';
				}
				if (id === 3) {
					this.searchForm.startPriceid = '2000';
					this.searchForm.endPriceid = '3000';
					this.title = '不限/2000-3000';
				}
				if (id === 4) {
					this.searchForm.startPriceid = '3000';
					this.searchForm.endPriceid = '4000';
					this.title = '不限/3000-4000';
				}
				if (id === 5) {
					this.searchForm.startPriceid = '4000';
					this.searchForm.endPriceid = '-1';
					this.title = '不限/4000以上';
				}
				this.$u.route('/pages/index/driver/components/index/resultRent', {
					form: JSON.stringify(this.searchForm),
					title: this.title
				});
			},
			toIndexCar(text) {
				this.title = '不限/' + text;
				this.searchForm.carbrand = text;
				this.$u.route('/pages/index/driver/components/index/resultRent', {
					form: JSON.stringify(this.searchForm),
					title: this.title
				});
			},
			getList() {
				this.$u.api.driverSideHomePage({
					pageSize: 9
				}).then(res => {
					if (res.code === 200) {
						this.lowPriceList = res.rows
					} else {
						this.$u.toast(res.msg);
					}
				})
				this.getWelfareList()
				// this.getMessageNum()
			},
			getWelfareList() {
				this.$u.api.getYearWelfare({
					pageNum: 1,
					pageSize: 9
				}).then(res => {
					if (res.code === 200) {
						let data = res.rows;
						let arr0 = data.splice(0,3)
						let arr1 = data.splice(3,6)
						let arr2 = data.splice(6,9)
						this.welfareList = [arr0,arr1,arr2]
					} else {
						this.$u.toast(res.msg);
					}
				})
			},
			getMessageNum() {
				this.$u.api.haveIs().then(res => {
					if (res.code === 200) {
						this.num = res.object.titlenum;
						this.time = format(res.object.recentlytime, 'yyyy-MM-dd HH:mm');
					} else {
						this.$u.toast(res.msg);
					}
				})
			},
			toSwiperPage(index) {
				if (index === 0) {
					this.toChild(1)
				} else if (index === 1) {
					this.toChild(2)
				} else {
					this.$u.route('/pages/driver/inviteFriends/inviteFriends')
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
					this.$u.route({
						url: '/pages/index/index',
						type: 'switchTab'
					})
				} else {
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
				} else {
					this.$u.route({
						url: '/pages/init/newYearWelfare',
					})
				}
			},
			toView(id) {
				this.$u.route('/pages/index/driver/components/index/carRentDetail', {
					id: id
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
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

	.kszc {
		padding: 15px;

		.kszc_title {
			color: #333333;
			height: 30pt;
			line-height: 30pt;
			font-size: 10px;
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
		padding: 8pt 0;
		font-size: 10pt;
		color: #333333;
	}

	.djhc {
		background-image: url('../../static/dijiahaoche@2x.png');
		background-size: 100%;

		.djhc_title {
			color: #FF5A00;
			font-size: 20px;
			padding: 15px;
		}

		.djhc_link {
			color: #FF5A00;
			font-size: 14px;
			padding: 0 15px 20px;
			display: flex;
			justify-content: space-between;
		}



		.djhc_money {
			color: #FF5A00;
			padding: 4pt 0;
		}
	}

	.xcfl {
		background: #F8F8F8;

		.xcfl_title {
			font-size: 20px;
			padding: 15px;
			color: #000000;
		}

		.xcfl_link {
			font-size: 14px;
			padding: 0 15px 20px;
			display: flex;
			color: #6D6D6D;
			justify-content: space-between;
		}
	}

	.bg_fff {
		background-color: #FFFFFF;
		text-align: center;

		.djhc_model {
			color: #333;
			padding: 4pt 0;
		}

		.djhc_power {
			color: #6D6D6D;
			padding: 4pt 0;
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
</style>
