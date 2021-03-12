<template>
	<view class="selectBrand">
		<u-navbar back-icon-color="#111111" title="选择品牌" :background="background" title-color="#111111"></u-navbar>
		<scroll-view class="scroll-list" :scroll-into-view="scrollViewId" scroll-y="true" scroll-with-animation :style="{height:winHeight + 'px'}">
			<view>
				<view style="width: 698rpx;">
					<!-- <view class="title">输入自定义品牌型号</view> -->
					<view v-for="(item,index) in list" :key="index" :id="item.letter == '#' ? 'indexed-list-YZ' :'indexed-list-' + item.letter">
						<view class="letter">{{item.letter}}</view>
						<view class="box">
							<view @click="firstBrand(items)" v-for="(items,index) in item.data" :key="items.id" :class="{ 'first':true,'active': items.text==text}">{{items.text}}</view>
						</view>
					</view>
				</view>
			</view>
		</scroll-view>
		<view style="width: 52rpx;position: fixed;top: 202rpx;right: 0;text-align: center;">
			<view v-for="(i,index) in indexList" :key="index" @click="jumper(i,index)" :class="jumperIndex == i?'activeLetter':'letter-item'">{{i}}</view>
		</view>
		<view v-show="show" style="position: fixed;top: 88rpx;right: 0;width: 480rpx;background: #fff;border: 2rpx solid rgba(0,0,0,0.08);">
			<scroll-view class="scroll-list" :scroll-into-view="scrollViewId" scroll-y="true" scroll-with-animation :style="{height:winHeight + 'px'}">
				<view>
					<view style="display: flex;align-items: center;justify-content: space-between;width: 480rpx;height: 136rpx;padding: 0 40rpx 0 90rpx;border: 2rpx solid rgba(0,0,0,0.08);position: fixed;top: 88rpx;right: 0;background: #fff;">
						<view>{{text}}&nbsp;{{textBrand}}&nbsp;{{textThird}}</view>
						<u-image @click="close()" width="30" height="28" src="@/static/order/close.png"></u-image>
					</view>
					<view class="room"></view>
					<view style="display: flex;justify-content: space-between;" :class="{ 'second':true,'active': item.carseriesname==textBrand}" v-for="(item,index) in carmodelList" :key="index" @click="secondBrand(item)">
						<view>{{item.carseriesname}}</view>
						<view style="color: #959595;">|&nbsp;车型</view>
					</view>
				</view>
			</scroll-view>
		</view>
		<view v-show="showBrand" style="position: fixed;top: 224rpx;right: 0;width: 300rpx;background: #fff;border: 2rpx solid rgba(0,0,0,0.08);z-index: 100;min-height: 100%;">
			<scroll-view class="scroll-list" :scroll-into-view="scrollViewId" scroll-y="true" scroll-with-animation :style="{height:winHeight + 'px'}">
				<view>
					<view class="second" v-for="(item,index) in carxinghaoList" :key="index" @click="thirdBrand(item)">{{item.carseriesname}}</view>
				</view>
			</scroll-view>
		</view>
	</view>
</template>

<script>
	import {
		list
	} from "@/utils/index.list.js";
	const letterArr = list.map(val => {
		return val.letter;
	})
	export default {
		data() {
			return {
				background: {
					'background-image': 'linear-gradient(to bottom, #000000 39%,#ffffff 0%)'
				},
				indexList: [],
				list: [],
				carmodelList: [],
				carxinghaoList: [],
				show:false,
				showBrand:false,
				text:'',
				textBrand:'',
				textThird:'',
				jumperIndex: 'A',
				scrollViewId: '',
				winHeight: 0,
			}
		},
		mounted() {
			let winHeight = uni.getSystemInfoSync().windowHeight;
			this.winHeight = winHeight;
			this.first()
		},
		methods: {
			jumper(event, i) {
				this.jumperIndex = event;
				let len = this.list[i].data.length;
				if (event == '#') {
					this.scrollViewId = 'indexed-list-YZ';
					return
				}
				if (len > 0) {
					this.scrollViewId = 'indexed-list-' + event;
				}
			},
			first(){
				uni.request({
					url: 'https://niuche-default.neocab.cn/carmodel', //接口地址
					header: {
						'content-type': 'application/x-www-form-urlencoded', //自定义请求头信息
					},
					success: (res) => {
						if (res.statusCode === 200) {
							this.list = res.data;
							let arr = [];
							res.data.forEach(item => {
								arr.push(item.letter)
							})
							this.indexList = arr
						} else {
							this.list = list;
							this.indexList = letterArr
						}
					}
				});
			},
			second(id){
				this.$u.api.getCarSystem({carbrandid:id}).then(res=>{
					if(res.code === 200){
						 let data = res.object;
						 this.carmodelList = data;
					}else {
						 this.$u.toast(res.msg);
					}
				}).catch(res=>{console.log(res)})
			},
			third(id){
				this.$u.api.getCarModel({carseriesid:id}).then(res=>{
					if(res.code === 200){
					  let data = res.object;
					  this.carxinghaoList = data;
					}else {
						 this.$u.toast(res.msg);
					}
				})
			},
			firstBrand(items){
				if(this.show||this.showBrand){
					this.show = false;
					this.showBrand = false;
					this.text = '';
					this.textBrand = '';
					this.textThird = '';
				}else{
					this.show = true;
					this.text = items.text;
					this.second(items.id)
				}
			},
			secondBrand(item){
				this.showBrand = true;
				this.textBrand = item.carseriesname;
				this.third(item.carseriesid)
			},
			thirdBrand(item){
				this.textThird = item.carseriesname;
				uni.setStorageSync('textSelect', {
					text: this.text,
					textBrand: this.textBrand,
					textThird: this.textThird
				});
				this.$u.route('/pages/company/order/newOrder')
			},
			close(){
				this.text = '';
				this.textBrand = '';
				this.textThird = '';
				this.show = false;
				this.showBrand = false;
			}
		}
	}
</script>

<style lang="scss" scoped>
	page{
		background: #f5f5f5;
	}
	.selectBrand{
		.title{
			padding: 42rpx 28rpx;
			height: 128rpx;
			font-size: 32rpx;
			color: #1a2232;
			background: #fff;
		}
		.letter{
			padding: 0 28rpx;
			height: 60rpx;
			line-height: 60rpx;
			font-size: 24rpx;
			color: #a0a0a0;
			border-bottom: 2rpx solid rgba(0,0,0,0.08);
		}
		.box{
			.first{
				padding: 0 28rpx;
				height: 100rpx;
				line-height: 100rpx;
				font-size: 28rpx;
				color: #1a2232;
				background: #fff;
				border-bottom: 2rpx solid rgba(0,0,0,0.08);
			}
			.active{
				background: rgba(0,0,0,0.04);
			}
		}
		.list{
			width: 52rpx;
			text-align: center;
			font-size: 24rpx;
			color: #1a2232;
			margin-top: 20rpx;
		}
		.second{
			padding: 32rpx 26rpx;
			font-size: 26rpx;
			color: #1a2232;
			background: #fff;
			border-bottom: 2rpx solid rgba(0,0,0,0.08);
		}
		.active{
			background: rgba(0,0,0,0.04);
		}
		.activeLetter{
			font-size: 24rpx;
			color: #4ABA75;
			margin-top: 20rpx;
		}
		.letter-item{
			font-size: 24rpx;
			margin-top: 20rpx;
		}
		.room{
			width: 100%;
			height: 136rpx;
		}
	}
</style>
