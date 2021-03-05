<template>
	<view class="selectBrand">
		<u-navbar back-icon-color="#111111" title="选择品牌" :background="background" title-color="#111111"></u-navbar>
		<view style="display: flex;">
			<view style="width: 698rpx;">
				<view class="title">输入自定义品牌型号</view>
				<view v-for="(item,index) in list" :key="index">
					<view class="letter">{{item.letter}}</view>
					<view class="box">
						<view @click="secondBrand(items)" v-for="(items,index) in item.data" :key="items.id" class="first">{{items.text}}</view>
					</view>
				</view>
			</view>
			<view style="width: 52rpx;margin-top: 102rpx;">
				<view v-for="(item,index) in indexList" :key="index">
					<view class="list">{{item}}</view>
				</view>
			</view>
		</view>
		<view v-show="show" style="position: fixed;top: 88rpx;right: 0;width: 448rpx;background: #fff;border: 2rpx solid rgba(0,0,0,0.08);">
			<view>
				<view style="display: flex;align-items: center;justify-content: space-between;width: 448rpx;height: 136rpx;padding: 0 40rpx 0 90rpx;border-bottom: 2rpx solid rgba(0,0,0,0.08);">
					<view>{{text}}</view>
					<u-image width="30" height="28" src="@/static/order/close.png"></u-image>
				</view>
				<view class="second" v-for="(item,index) in carmodelList" :key="index" @click="thirdBrand(item)">{{item.carseriesname}}</view>
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
				show:false,
				showBrand:false,
				text:''
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
						 // this.form.carbrand = obj.text;
						 // this.form.carmodel = '',
						 // this.form.carxinghao = '',
						 // this.form.type = 1
						 // this.$emit("onClick",this.form)
					}else {
						 this.$u.toast(res.msg);
					}
				}).catch(res=>{console.log(res)})
				this.step = 2
			},
			third(obj){
				this.$u.api.getCarModel({carseriesid:obj.carseriesid}).then(res=>{
					if(res.code === 200){
					  let data = res.object;
					  this.carxinghaoList = data;
					  this.form.carmodel = obj.carseriesname;
					  this.form.carxinghao = '',
					  this.form.type = 2
					  this.$emit("onClick",this.form)
					}else {
						 this.$u.toast(res.msg);
					}
				})
				if(this.max === 3) {
					this.step = 3
				}
			},
			secondBrand(items){
				this.show = true;
				this.text = items.text;
				this.second(items.id)
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
			.first:last-child{
				padding: 0 28rpx;
				height: 100rpx;
				line-height: 100rpx;
				font-size: 28rpx;
				color: #1a2232;
				background: #fff;
				border-bottom: 2rpx solid transparent;
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
			padding: 0 26rpx;
			height: 108rpx;
			line-height: 108rpx;
			font-size: 26rpx;
			color: #1a2232;
			background: #fff;
			border-bottom: 2rpx solid rgba(0,0,0,0.08);
		}
	}
</style>
