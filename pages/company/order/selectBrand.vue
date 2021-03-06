<template>
	<view class="selectBrand">
		<u-navbar back-icon-color="#111111" title="选择品牌" :background="background" title-color="#111111"></u-navbar>
		<view style="display: flex;">
			<view style="width: 698rpx;">
				<view class="title">输入自定义品牌型号</view>
				<view v-for="(item,index) in list" :key="index">
					<view class="letter">{{item.letter}}</view>
					<view class="box">
						<view @click="firstBrand(items)" v-for="(items,index) in item.data" :key="items.id" :class="{ 'first':true,'active': items.text==text}">{{items.text}}</view>
					</view>
				</view>
			</view>
			<view style="width: 52rpx;margin-top: 102rpx;">
				<view v-for="(item,index) in indexList" :key="index">
					<view class="list">{{item}}</view>
				</view>
			</view>
		</view>
		<view v-show="show" style="position: fixed;top: 88rpx;right: 0;width: 480rpx;background: #fff;border: 2rpx solid rgba(0,0,0,0.08);">
			<view>
				<view style="display: flex;align-items: center;justify-content: space-between;width: 480rpx;height: 136rpx;padding: 0 40rpx 0 90rpx;border-bottom: 2rpx solid rgba(0,0,0,0.08);">
					<view>{{text}}&nbsp;{{textBrand}}&nbsp;{{textThird}}</view>
					<u-image width="30" height="28" src="@/static/order/close.png"></u-image>
				</view>
				<view :class="{ 'second':true,'active': item.carseriesname==textBrand}" v-for="(item,index) in carmodelList" :key="index" @click="secondBrand(item)">{{item.carseriesname}}</view>
			</view>
		</view>
		<view v-show="showBrand" style="position: fixed;top: 224rpx;right: 0;width: 300rpx;background: #fff;border: 2rpx solid rgba(0,0,0,0.08);z-index: 100;">
			<view>
				<view class="second" v-for="(item,index) in carxinghaoList" :key="index" @click="thirdBrand(item)">{{item.carseriesname}}</view>
			</view>
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
				textThird:''
			}
		},
		mounted() {
			this.first()
		},
		methods: {
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
				this.step = 2
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
				if(this.max === 3) {
					this.step = 3
				}
			},
			firstBrand(items){
				this.show = true;
				this.text = items.text;
				this.second(items.id)
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
	}
</style>
