<template>
	<view>
		<view class="wrap">
			<u-swiper :list="list" height="500" mode="none"></u-swiper>
			<text style="position: absolute;top: 20px;left: 1%;color: #fff;font-size: 16px;">杭州</text>
			<text style="position: absolute;top: 20px;right: 1%;">
				<u-icon name="bell" color="#ffffff" size="60"></u-icon>
			</text>
		</view>
		<view class="bg_btn">
			<view style="width: 124pt;">
				<u-image src="../../static/cheliangzulin@3x.png" height="180rpx" border-radius="8"></u-image>
			</view>
			<view style="width: 124pt;">
				<u-image src="../../static/sijizhaopin@3x.png" height="180rpx" border-radius="8"></u-image>
			</view>
		</view>
		<view class="kszc">
			<view style="font-size: 20px;color: #333333;padding: 10pt 0;">快速找车</view>
			<view v-for="(item,index) in tuBiaoList" :key="index" style="display: inline-block;width: 20%;">
				<u-image :src="item.url" height="120rpx"></u-image>
				<view style="color: #333333;height: 30pt;line-height: 30pt;font-size:12px;text-align: center;">{{item.text}}</view>
			</view>
			<view style="margin-top: 10pt;">
				<view class="money_tag" v-for="(info,index) in moneyList" :key="index">
					{{info}}
				</view>
			</view>
		</view>
		<view class="djhc">
			<view class="djhc_title">低价好车</view>
			<view class="djhc_link">
				<text>平台精选好车，价低质不低</text>
				<text>></text>
			</view>
			<scroll-view class="scroll-view_H" scroll-x="true" scroll-left="0">
				<view class="scroll-view-item_H" :style="{marginLeft:index==0?'10px':0}" v-for="(item, index) in 9" :key="item.url">
					<view>
						<u-image src="http://pic1.jisuapi.cn/car/static/images/logo/300/6839.jpg" height="120rpx"></u-image>
					</view>
					<view class="bg_fff">
						<view class="djhc_model">长安-马自达</view>
						<view class="djhc_power">燃料/车龄</view>
						<view class="djhc_money">2000元以内/月</view>
					</view>
				</view>
			</scroll-view>
		</view>
		<view class="xcfl">
			<view class="xcfl_title">新春福利</view>
			<view class="xcfl_link">
				<text>送油 送保养 送免租</text>
				<text>></text>
			</view>
			<swiper :current="swiperCurrent" indicator-dots="true" indicator-color="#ffffff" indicator-active-color="#FF5A00" style="height: 180px;">
				<swiper-item class="swiper-item" v-for="(item, index) in list" :key="index">
					<view style="display: flex;justify-content: space-around;padding: 0 10px;">
						<view v-for="i in 3" style="width: 31%;">
							<u-image src="http://pic1.jisuapi.cn/car/static/images/logo/300/6839.jpg" height="160rpx"></u-image>
							<view class="bg_fff">
								<view class="djhc_model">长安-马自达</view>
								<view class="djhc_power">燃料/车龄</view>
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
						<view  style="color: #000000;font-size: 12pt;">企业名称</view>
						<view style="text-align: right;padding: 8px 0;">></view>
						<view style="color: #6D6D6D;">1111111111111</view>
					</u-col>
				</u-row>
			</view>
		</view>
	</view>
</template>

<script>
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
						url: '../../static/beiqixinnnegyuan@3x.png',
						text: '北汽新能源'
					},
					{
						url: '../../static/changan@2x.png',
						text: '长安'
					},
					{
						url: '../../static/richan@3x.png',
						text: '日产'
					}
				],
				moneyList: ['2千/月', '2-3千/月', '3-4千/月', '4千以上/月'],
				swiperCurrent: 0,
			}
		},
		methods: {

		}
	}
</script>

<style lang="scss" scoped>
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
