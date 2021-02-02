<template>
	<view class="carRent">
		<u-mask z-index="2" :show="showMask" @click="hideMask">
		</u-mask>
		<list-tags v-show="show" :list="select" :active="current" @onClick="getData"></list-tags>
		<list-tags v-show="showType" :list="selectType" :active="currentType" @onClick="getDataType"></list-tags>
		<view :class="['middle-content',!filterData.length?'active':'']">
			<view style="width: 100%;height: 100rpx;padding-left: 34rpx;">
				<u-form :model="form" ref="uForm" label-width="150" :border-bottom="false">
					<u-form-item style="padding: 0 16rpx;margin-top: -18rpx;float: left;
					background: #F8F9FB;border-radius: 4px;width: 124rpx;display: flex;" label="">
					<view style="
					 float: left;">杭州
			</view>
			<u-image style="float: left;margin-top: -50rpx;margin-left: 14rpx;" width="18rpx" height="22rpx" src="@/static/city.png"></u-image>
			</u-form-item>
			<u-form-item style="padding: 0 16rpx;margin-top: -18rpx;float: left;
				    background: #F8F9FB;border-radius: 4px;width: 202rpx;margin-left: 21rpx;"
			 label="">
				<u-input :custom-style="style" v-show="!show" disabled placeholder-style="color:#000;" placeholder="租金" @click="toggle()"
				 v-model="priceidkey" /><text v-show="!show" class='triangle'></text>
				<u-input :custom-style="styleActive" v-show="show" disabled placeholder-style="color:#FF9500;" placeholder="租金"
				 @click="toggle()" v-model="priceidkey" /><text v-show="show" class='triangleActive'></text></u-form-item>
			<u-form-item style="padding: 0 16rpx;margin-left:21rpx;margin-top: -18rpx;float: left;
				    background: #F8F9FB;border-radius: 4px;width: 182rpx;"
			 label="">
				<u-input :custom-style="style" v-show="!showType" disabled placeholder-style="color:#000;" placeholder="业务类型"
				 @click="toggleType()" v-model="businesstypekey" /><text v-show="!showType" class='triangle'></text>
				<u-input :custom-style="styleActive" v-show="showType" disabled placeholder-style="color:#FF9500;" placeholder="业务类型"
				 @click="toggleType()" v-model="businesstypekey" /><text v-show="showType" class='triangleActive'></text>
			</u-form-item>
			<u-image @click="filter()" style="margin-left: 2rpx;float: right;margin-top: 4rpx;" width="32rpx" height="34rpx" src="@/static/filter.png"></u-image>
			<view @click="filter()" style="
					float: right;margin-right: 2rpx;">更多</view>
			</u-form>
		</view>
		<view v-show="filterData.length" :class="filterData.length?'active':''" style="margin-top: 42rpx;display: flex;padding-bottom: 26rpx;padding-left: 34rpx;">
			<scroll-view style="width: 572rpx;display: inline-block;" class="scroll-view_H" scroll-x="true" scroll-left="0">
				<view @click="close(index,item)" class="scroll-view-item_H" v-for="(item, index) in filterData" :key="index">{{item}}</view>
			</scroll-view>
			<view @click="clear" style="width: 90rpx;margin-left: 30rpx;display: inline-block;margin-top: 8rpx;">清空</view>
		</view>
	</view>
	<!-- <view class="wrap">
			<u-swiper height="377" bg-color="#CDE5E3" mode="dot" :list="list"></u-swiper>
		</view> -->
	<view v-show="!filterData.length" style="height: 116rpx;"></view>
	<view v-show="filterData.length" style="height: 226rpx;"></view>
	<mescroll-body ref="mescrollRef" @init="mescrollInit" :down="downOption" @down="downCallback" @up="upCallback" :up="up">
<!-- 	<load-refresh v-show="list.length" ref="loadRefresh" :pageNo='pageNum' :totalPageNo='total' :isRefresh="true"
	 refreshType="halfCircle" refreshTime="1000" color="#FF6501" heightReduce="10" backgroundCover="#F3F5F5" @loadMore="loadMore"
	 @refresh="refresh"> -->
		<view >
			<view class="last">
				<view class="lists" v-for="(item, index) in list" :key="index">
					<view class="list" @click="detail(item.id)">
						<img style="width: 288rpx;height: 196rpx;border-radius: 12rpx;" v-show="!item.photourl" class="left" src="http://pic1.jisuapi.cn/car/static/images/logo/300/2982.gif"
						 alt="">
						<img style="width: 288rpx;height: 196rpx;border-radius: 12rpx;" v-show="item.photourl" class="left" :src="item.photourl"
						 alt="">
						<view class="right">
							<view style="height: 116rpx;">
								<view class="name u-line-2">
									<text v-show="item.businesstypetag == 1">[网约车]</text>
									<text v-show="item.businesstypetag == 2">[出租车]</text>
									{{item.texttitle}}</view>
								<view class="year">车龄≤{{item.carAge}}{{item.carAge?'年':''}}{{item.carAge?'/':''}}{{item.firstkm}}-{{item.km}}万公里
								</view>
							</view>
							<view class="price"><text>¥{{item.rentprice}}</text></view>
							<view v-show="item.carRentNum" class="numRenting">在租{{item.carRentNum}}辆</view>
						</view>
						<!-- <u-image v-show="!item.photourl" class="left" width="306rpx" height="226rpx" src="http://pic1.jisuapi.cn/car/static/images/logo/300/2982.gif"></u-image> -->
						<!-- <u-image class="left" width="306rpx" height="226rpx" :src="item.photourl"></u-image> -->
						<view class="clear"></view>
						<!-- <view class="flex">
							<view class="company">{{item.comparyname}}</view>
							<view class="area">{{item.comparyarea}}</view>
							<view class="clear"></view>
						</view> -->
						<!-- <u-icon class="heart" name="heart-fill" color="#3FB26C" size="28"></u-icon> -->
					</view>
					<!-- <u-icon v-show="item.iscollect === 1" @click="cancel(item,item.id)" class="heart" name="heart-fill" color="#FCD03C" size="28"></u-icon> -->
					<!-- <u-icon v-show="item.iscollect === 2" @click="favorites(item,item.id)" class="heart" name="heart-fill" color="rgba(0,0,0,0.1)" size="28"></u-icon> -->
				</view>
				<!-- <u-loadmore :status="status" :icon-type="iconType" :load-text="loadText" /> -->
			</view>
		</view>
	<!-- </load-refresh> -->
	</mescroll-body>
	</view>
</template>
 
<script>
	// import loadRefresh from '@/components/load-refresh/load-refresh.vue'
	import listTags from '@/components/listTags.vue'
	import MescrollMixin from "@/components/mescroll-uni/mescroll-mixins.js";
	import {
		publishObj
	} from '@/utils/constant.js'
	export default {
		components: {
			// loadRefresh,
			listTags
		},
		mixins: [MescrollMixin],
		data() {
			return {
				showMask: false,
				show: false,
				showType: false,
				iconType: 'flower',
				publishObj: publishObj,
				form: {
					businesstype: '',
					carbrand: '',
					cartype: '',
					city: '杭州',
					startCarAge: '',
					endCarAge: '',
					startPriceid: '',
					endPriceid: '',
					km: '',
					power: '',
					islogin: ''
				},
				businesstype: 100,
				page: {
					num:1,
					size: 10 // 每页数据的数量,默认10
				},
				downOption: {
					auto: false //是否在初始化后,自动执行downCallback; 默认true
				},
				up:{
					textNoMore:'--没有更多了--'
				},
				priceid: '',
				priceidkey: '',
				businesstypekey: '',
				total: 0,
				select: [{
						label: '不限',
						value: '1'
					},
					{
						label: '2000以内',
						value: '2'
					},
					{
						label: '2000-3000',
						value: '3'
					},
					{
						label: '3000-4000',
						value: '4'
					},
					{
						label: '4000及以上',
						value: '5'
					}
				],
				selectType: [{
						label: '不限',
						value: ''
					},
					{
						label: '网约车',
						value: '1'
					},
					{
						label: '出租车',
						value: '2'
					}
				],
				list: [],
				status: 'loadmore',
				loadText: {
					loadmore: '轻轻上拉',
					loading: '努力加载中',
					nomore: '我也是有底线的'
				},
				pageNum: 1,
				current: -1,
				currentType: -1,
				style: {
					color: '#000'
				},
				styleActive: {
					color: '#FF9500'
				},
				filterData: [],
				objType: {
					wycList: [{
							id: '',
							text: '不限',
							checked: false
						}, {
							id: '0',
							text: '0-2万公里',
							checked: false
						}, {
							id: '1',
							text: '2-5万公里',
							checked: false
						}, {
							id: '2',
							text: '5-10万公里',
							checked: false
						}, {
							id: '3',
							text: '10-20万公里',
							checked: false
						},
						{
							id: '4',
							text: '20-30万公里',
							checked: false
						}, {
							id: '5',
							text: '30万公里以上',
							checked: false
						},
					],
					czcList: [{
							id: '',
							text: '不限',
							checked: false
						}, {
							id: '0',
							text: '0-2万公里',
							checked: false
						}, {
							id: '1',
							text: '2-5万公里',
							checked: false
						},
						{
							id: '2',
							text: '5-10万公里',
							checked: false
						}, {
							id: '3',
							text: '10-20万公里',
							checked: false
						}, {
							id: '4',
							text: '20-30万公里',
							checked: false
						},
						{
							id: '5',
							text: '30-50万公里',
							checked: false
						}, {
							id: '6',
							text: '50-70万公里',
							checked: false
						}, {
							id: '7',
							text: '70万公里以上',
							checked: false
						}
					],
				},
				radioType: 'wycList'
			}
		},
		mounted() {
			this.$u.api.setEvent({eventId:"zc-visit",type:3})
			this.transform()
		},
		methods: {
			close(index, text) {
				var carbrand = [];
				var cartype = [];
				var power = [];
				this.filterData.splice(index, 1);
				this.publishObj.ageList.map(item => {
					if (item.text == text) {
						this.form.startCarAge = '';
						this.form.endCarAge = '';
						uni.removeStorageSync('caragekey');
					}
				})
				this.objType[this.radioType].map(item => {
					if (item.text == text) {
						this.form.km = '';
						uni.removeStorageSync('kmkey');
					}
				})
				if (uni.getStorageSync('carbrand')) {
					carbrand = uni.getStorageSync('carbrand').split(',');
					carbrand.map((item, index) => {
						if (item == text) {
							carbrand.splice(index, 1);
							if (carbrand.length) {
								uni.setStorageSync('carbrand', carbrand.join(','));
								this.form.carbrand = uni.getStorageSync('carbrand');
							} else {
								uni.removeStorageSync('carbrand');
								this.form.carbrand = '';
							}
						}
					})
				}
				if (uni.getStorageSync('cartypeDriver')) {
					cartype = uni.getStorageSync('cartypeDriver').split(',');
					cartype.map((item, index) => {
						if (item == text) {
							cartype.splice(index, 1);
							if (cartype.length) {
								uni.setStorageSync('cartypeDriver', cartype.join(','));
								this.form.cartype = uni.getStorageSync('cartypeDriver');
							} else {
								uni.removeStorageSync('cartypeDriver');
								this.form.cartype = '';
							}
						}
					})
				}
				if (uni.getStorageSync('powerDriver')) {
					power = uni.getStorageSync('powerDriver').split(',');
					power.map((item, index) => {
						if (item == text) {
							power.splice(index, 1);
							if (power.length) {
								uni.setStorageSync('powerDriver', power.join(','));
								this.form.power = uni.getStorageSync('powerDriver');
							} else {
								uni.removeStorageSync('powerDriver');
								this.form.power = '';
							}
						}
					})
				}
				this.search()
			},
			transform() {
				var carbrand = [];
				var cartype = [];
				var power = [];
				var caragekey = '';
				var kmkey = '';
				this.filterData = [];
				this.form = {
					businesstype: '',
					carbrand: '',
					cartype: '',
					city: '杭州',
					startCarAge: '',
					endCarAge: '',
					startPriceid: '',
					endPriceid: '',
					km: '',
					power: ''
				};
				const token = uni.getStorageSync('token');
				if (token) {
					this.form.islogin = 1
				} else {
					this.form.islogin = 0
				}
				this.businesstypekey = '';
				this.priceidkey = '';
				this.form.businesstype = uni.getStorageSync('typeDri');
				this.priceid = uni.getStorageSync('priceidDri');
				this.currentType = this.form.businesstype == '' ? 0 : parseInt(this.form.businesstype);
				// this.currentKm = parseInt(this.form.km - 1)?parseInt(this.form.km - 1):0;
				this.currentAge = parseInt(this.age) ? parseInt(this.age) : -1;
				const priceid = this.priceid - 1
				this.current = parseInt(priceid);
				this.selectType.map(item => {
					if (item.value == this.form.businesstype) {
						this.businesstypekey = item.label;
					}
				})
				this.businesstypekey = (this.businesstypekey == '不限') ? '' : this.businesstypekey
				this.select.map(item => {
					if (item.value == this.priceid) {
						this.priceidkey = item.label;
					}
				})
				this.priceidkey = (this.priceidkey == '不限') ? '' : this.priceidkey
				if (this.priceid == 1) {
					this.form.startPriceid = '';
					this.form.endPriceid = '';
				}
				if (this.priceid == 2) {
					this.form.startPriceid = '0';
					this.form.endPriceid = '2000';
				}
				if (this.priceid == 3) {
					this.form.startPriceid = '2000';
					this.form.endPriceid = '3000';
				}
				if (this.priceid == 4) {
					this.form.startPriceid = '3000';
					this.form.endPriceid = '4000';
				}
				if (this.priceid == 5) {
					this.form.startPriceid = '4000';
					this.form.endPriceid = '-1';
				}
				if (uni.getStorageSync('carbrandDriver')) {
					carbrand = uni.getStorageSync('carbrandDriver').split(',');
					this.filterData = this.filterData.concat(carbrand);
					this.form.carbrand = uni.getStorageSync('carbrandDriver');
				}
				if (uni.getStorageSync('cartypeDriver')) {
					cartype = uni.getStorageSync('cartypeDriver').split(',');
					this.filterData = this.filterData.concat(cartype);
					this.form.cartype = uni.getStorageSync('cartypeDriver');
				}
				if (uni.getStorageSync('powerDriver')) {
					power = uni.getStorageSync('powerDriver').split(',');
					this.filterData = this.filterData.concat(power);
					this.form.power = uni.getStorageSync('powerDriver');
				}
				if (uni.getStorageSync('caragekey')) {
					caragekey = uni.getStorageSync('caragekey');
					if (caragekey == '不限') {} else {
						this.filterData.push(caragekey);
					}
					this.publishObj.ageList.map(item => {
						if (item.text == caragekey) {
							const carage = parseInt(item.id);
							if (carage == '1') {
								this.form.startCarAge = '';
								this.form.endCarAge = '';
							}
							if (carage == '2') {
								this.form.startCarAge = '';
								this.form.endCarAge = '1';
							}
							if (carage == '3') {
								this.form.startCarAge = '1';
								this.form.endCarAge = '3';
							}
							if (carage == '4') {
								this.form.startCarAge = '3';
								this.form.endCarAge = '5';
							}
							if (carage == '5') {
								this.form.startCarAge = '5';
								this.form.endCarAge = '';
							}
						}
					})
				}
				if (uni.getStorageSync('kmkey')) {
					kmkey = uni.getStorageSync('kmkey');
					if (kmkey == '不限') {} else {
						this.filterData.push(kmkey);
					}
					this.objType[this.radioType].forEach(item => {
						if (item.text == kmkey) {
							this.form.km = item.id == '' ? '' : parseInt(item.id)
						}
					})
				}
				this.search()
			},
			hideMask() {
				this.showMask = false;
				this.show = false;
				this.showType = false;
			},
			toggle() {
				this.showMask = !this.show;
				this.show = !this.show;
				this.showType = false;
			},
			toggleType() {
				this.showMask = !this.showType;
				this.showType = !this.showType;
				this.show = false;
			},
			getData(index) {
				this.$u.api.setEvent({eventId:"lease_rent",type:3})
				this.current = index;
				this.priceid = this.select[index].value;
				this.priceidkey = this.select[index].label;
				this.priceidkey = (this.priceidkey == '不限') ? '' : this.priceidkey
				uni.setStorageSync('priceidDri', this.priceid);
				if (this.priceid == 1) {
					this.form.startPriceid = '';
					this.form.endPriceid = '';
				}
				if (this.priceid == 2) {
					this.form.startPriceid = '0';
					this.form.endPriceid = '2000';
				}
				if (this.priceid == 3) {
					this.form.startPriceid = '2000';
					this.form.endPriceid = '3000';
				}
				if (this.priceid == 4) {
					this.form.startPriceid = '3000';
					this.form.endPriceid = '4000';
				}
				if (this.priceid == 5) {
					this.form.startPriceid = '4000';
					this.form.endPriceid = '-1';
				}
				this.show = false;
				this.showMask = false;
				this.search()
			},
			getDataType(index) {
				this.$u.api.setEvent({eventId:"lease_business",type:3})
				this.currentType = index;
				this.businesstypekey = this.selectType[index].label;
				this.businesstypekey = (this.businesstypekey == '不限') ? '' : this.businesstypekey
				this.form.businesstype = this.selectType[index].value;
				uni.setStorageSync('typeDri', this.form.businesstype);
				this.showType = false;
				this.showMask = false;
				this.search()
			},
			// page() {
			// 	this.pageNum = 1;
			// },
			downCallback() {
				this.$u.api.setEvent({eventId:"lease_load",type:3})
				this.page.num = 1;
				this.list = []
				this.upCallback()
			},
			upCallback() {
				this.$u.api.setEvent({eventId:"lease_refresh",type:3})
				const token = uni.getStorageSync('token');
				if (token) {
					this.form.islogin = 1
				} else {
					this.form.islogin = 0
				}
				const params = Object.assign(this.form, {
					pageNum: this.page.num,
					pageSize: this.page.size,
					isCount: 0,
					orderByColumn: 'm.refreshtime',
					isAsc: 'desc'
				});
				this.$u.api.homeRent(params).then(res => {
					if (res.code === 200) {
						this.total = res.total;
						this.mescroll.endByPage(res.rows.length, res.total);
						this.page.num = this.page.num+1
						this.list=this.list.concat(res.rows);
						console.log(this.list)
					} else {
						this.$u.toast(res.msg);
					}
				})
			},
			change() {
				if (this.priceid == 1) {
					this.form.startPriceid = '';
					this.form.endPriceid = '';
				}
				if (this.priceid == 2) {
					this.form.startPriceid = '0';
					this.form.endPriceid = '2000';
				}
				if (this.priceid == 3) {
					this.form.startPriceid = '2000';
					this.form.endPriceid = '3000';
				}
				if (this.priceid == 4) {
					this.form.startPriceid = '3000';
					this.form.endPriceid = '4000';
				}
				if (this.priceid == 5) {
					this.form.startPriceid = '4000';
					this.form.endPriceid = '-1';
				}
				this.search()
				this.add()
			},
			changeType() {
				this.search()
				this.add()
			},
			add() {
				this.select.forEach(item => {
					if (item.value === this.priceid) {
						this.priceidkey = item.label;
					}
				})
				this.selectType.forEach(item => {
					if (item.value === this.businesstype) {
						this.businesstypekey = item.label;
					}
				})
			},
			search() {
				this.page.num = 1;
				this.page.size= 10;
				this.list = []				this.upCallback()
			},
			confirm(arr) {
				this.priceid = arr[0].label;
				const priceid = arr[0].value;
				if (priceid == 1) {
					this.form.startPriceid = '';
					this.form.endPriceid = '';
				}
				if (priceid == 2) {
					this.form.startPriceid = '';
					this.form.endPriceid = '2000';
				}
				if (priceid == 3) {
					this.form.startPriceid = '2000';
					this.form.endPriceid = '3000';
				}
				if (priceid == 4) {
					this.form.startPriceid = '3000';
					this.form.endPriceid = '4000';
				}
				if (priceid == 5) {
					this.form.startPriceid = '4000';
					this.form.endPriceid = '';
				}
				this.search()
			},
			confirmType(arr) {
				this.businesstype = arr[0].label;
				this.form.businesstype = arr[0].value;
				this.search()
			},
			// pull() {
			// 	let len = this.list.length;
			// 	if (len < this.total) {
			// 		this.getList()
			// 	} else {
			// 		this.status = 'nomore'
			// 	}
			// },
			detail(id) {
				this.$u.api.setEvent({eventId:"lease_visit",type:3})
				this.$u.route("/pages/index/driver/components/index/carRentDetail", {
					id: id
				})
			},
			filter() {
				this.$u.api.setEvent({eventId:"lease_more",type:3})
				this.$u.route("/pages/index/driver/components/index/filterRent")
			},
			clear() {
				uni.removeStorageSync('carbrandDriver');
				uni.removeStorageSync('cartypeDriver');
				uni.removeStorageSync('powerDriver');
				uni.removeStorageSync('caragekey');
				uni.removeStorageSync('kmkey');
				this.filterData = [];
				this.form.power = '';
				this.form.cartype = '';
				this.form.carbrand = '';
				this.form.startCarAge = '';
				this.form.endCarAge = '';
				this.form.km = '';
				const token = uni.getStorageSync('token');
				if (token) {
					this.form.islogin = 1
				} else {
					this.form.islogin = 0
				}
				this.search()
			}
		}
	}
</script>

<style lang="scss" scoped>
	.carRent {
		background: #fff;

		.tagBox {
			width: 100%;
			padding: 10rpx 100rpx 10rpx 80rpx;
			position: fixed;
			top: 76rpx;
			left: 0;
			z-index: 1;
			background-color: #f5f5f8;

			.selectTag {
				padding: 4rpx 8rpx;
				border-radius: 20rpx;
				border: 1rpx solid rgba(0, 0, 0, 0.1);
				float: left;
				font-size: 24rpx;
				margin-right: 40rpx;
			}

			.selectTag:last-child {
				margin-right: 0;
			}

			.clearNull {
				float: right;
			}
		}

		.active {
			border-bottom: 1rpx solid rgba(0, 0, 0, 0.08);
		}

		.null {
			height: calc(73vh - var(--window-top));
			display: flex;
			justify-content: center;
			align-items: center;
		}

		.last .lists:last-child {
			margin-bottom: 10rpx;
		}

		.triangleActive {
			display: inline-block;
			width: 0;
			height: 0;
			border: 10rpx solid;
			border-color: transparent transparent #FF9500 transparent;
			margin-top: -8rpx;
		}

		.triangle {
			display: inline-block;
			width: 0;
			height: 0;
			border: 10rpx solid;
			border-color: #777 transparent transparent transparent;
			margin-top: 8rpx;
		}

		.wrap {
			padding: 40rpx;
		}

		.middle-content {
			width: 100%;
			position: fixed;
			top: 40px;
			left: 0;
			z-index: 10;
			background-color: #fff;

			/deep/ .u-dropdown__content {
				overflow: visible;
			}
		}

		.middle-content .u-form {
			width: 686rpx;
			height: 71rpx;
			border-radius: 40rpx;
			background-color: #fff;
			margin-top: 48rpx;
			float: left;
		}

		.icon {
			width: 51rpx;
			height: 71rpx;
			line-height: 71rpx;
			text-align: center;
			border-radius: 0 0 20rpx 0;
			background: linear-gradient(115deg, $bg-grad-FCD, $bg-grad-FE);
			float: left;
			margin-top: 30rpx;
		}

		.line {
			width: 1rpx;
			height: 27rpx;
			margin-top: 22rpx;
			float: left;
			margin-left: 40rpx;
			background: rgba(0, 0, 0, 0.2);
		}

		.clear {
			clear: both;
		}

		.last {
			background-color: #fff;
		}

		.lists {
			width: 679rpx;
			// height: 285rpx;
			position: relative;

			.heart {
				position: absolute;
				margin-top: 14rpx;
				margin-right: 20rpx;
				position: absolute;
				top: 2rpx;
				right: -36rpx;
			}

			.list {
				width: 679rpx;
				// height: 285rpx;
				padding: 34rpx 0 44rpx 0;
				border-bottom: 1rpx solid rgba(0, 0, 0, 0.08);
				color: #000;
				font-size: 20rpx;
				margin-left: 36rpx;
				background: #fff;

				.left {
					float: left;
					margin-top: 20rpx;
					margin-bottom: 6rpx;
				}

				.right {
					width: 388rpx;
					height: 226rpx;
					padding: 0 30rpx;
					background: #fff;
					float: left;

					.price {
						float: left;
						margin-top: 40rpx;
					}

					.price text {
						font-size: 36rpx;
						font-weight: 900;
						color: #FF5200;
					}

					.numRenting {
						width: 136rpx;
						height: 48rpx;
						text-align: center;
						line-height: 42rpx;
						border-radius: 8rpx;
						border: 2rpx solid #FF9B0D;
						font-size: 24rpx;
						color: #FF9B0D;
						float: left;
						margin-left: 34rpx;
						margin-top: 40rpx;
					}
				}

				.flex {
					padding-top: 22rpx;
					padding-bottom: 34rpx;
					border-bottom: 2rpx solid #dedede;

					.company {
						font-size: 28rpx;
						font-weight: 400;
						color: #343434;
						float: left;
					}

					.area {
						font-size: 26rpx;
						font-weight: 400;
						color: #666666;
						float: right;
					}
				}

				.name {
					font-weight: 900;
					font-size: 30rpx;
					margin-top: 14rpx;
				}

				.year {
					font-size: 26rpx;
					color: #777;
					margin-top: 24rpx;
					margin-bottom: 20rpx;
				}

				.clock {
					margin-top: 18rpx;
					color: #7f7f7f;
				}

				.car {
					float: left;
					margin-top: 14rpx;
				}

				.year {
					margin-left: 6rpx;
					margin-top: 12rpx;
					color: #7f7f7f;
				}

				.distance {
					margin-left: 6rpx;
					margin-top: 12rpx;
					color: #7f7f7f;
					float: left;
				}

				.box {
					width: 679rpx;
					height: 59rpx;
					background: linear-gradient(115deg, $bg-grad-FCD, $bg-grad-FE);
					padding: 0 0 0 18rpx;
					color: #fff;
					display: flex;
					align-items: center;
					justify-content: space-between;

					view {
						font-size: 20rpx;
					}

					view text {
						font-size: 36rpx;
						font-weight: 900;
						margin-right: 19rpx;
					}

					.case {
						padding: 6rpx 14rpx;
						border-radius: 10rpx;
						background: #fff;
						font-weight: 900;
						color: #FF6501;
						margin-right: 10rpx;
						float: left;
					}
				}
			}
		}

		.scroll-view_H {
			white-space: nowrap;
			width: 100%;
		}

		.scroll-view-item_H {
			display: inline-block;
			width: 140rpx;
			height: 56rpx;
			margin-right: 28rpx;
			line-height: 56rpx;
			text-align: center;
			background-image: url(@/static/shut.png);
			background-repeat: no-repeat;
			height: 100%;
			background-size: cover;
		}
	}
</style>
