<template>
	<view class="status_bar">
		<u-navbar back-text="" back-icon-size="0" title="" :background="background"></u-navbar>
		<view v-show="step===1">
			<scroll-view class="scroll-list" :scroll-into-view="scrollViewId" scroll-y="true" scroll-with-animation :style="{height:winHeight + 'px'}">
				<view v-for="(item,index) in list" :key="index" :id="item.letter == '#' ? 'indexed-list-YZ' :'indexed-list-' + item.letter">
					<view class="letter-title"> {{item.letter}}</view>
					<view v-for="info in item.data" class="letter-text" @click="showStep(info)">
						{{info.text}}
					</view>
				</view>
			</scroll-view>
			<view class="right-menu">
				<view v-for="(i,index) in indexList" :key="index" @click="jumper(i,index)" :class="jumperIndex == i?'letter-item active':'letter-item'">{{i}}</view>
			</view>
		</view>
		<view v-show="step === 2">
			<view class="letter-text" v-for="item in carmodelList" :key="item.carseriesid" @click="showStepNext(item)">{{item.carseriesname}}</view>
		</view>
		<view v-show="step === 3">
			<view class="letter-text" v-for="item in carxinghaoList" :key="item.carseriesid" @click="hidePoper(item)">{{item.carseriesname}}</view>
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
				jumperIndex: 'A',
				scrollViewId: '',
				winHeight: 0,
				scrollTop: 0,
				indexList: [],
				list: [],
				step:1,
				carmodelList:[],
				carxinghaoList:[],
				form:{
					carbrand:'',
					carmodel:'',
					carxinghao:'',
					type:1
				}
			}
		},
		props:['max'],
		mounted() {
			let winHeight = uni.getSystemInfoSync().windowHeight;
			this.winHeight = winHeight;
			this.getSelect()
		},
		methods: {
			getSelect(){
				uni.request({
					url: 'http://niuche-default.neocab.cn/carmodel', //接口地址
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
				// this.$u.api.getCarBrand({}).then(res=>{
				// 	if(res.code === 200){
			 //           console.log(res)
				// 	}else {
				// 		 this.$u.toast(res.message);
				// 	}
				// })
			},
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
			showStep(obj){
				this.$u.api.getCarSystem({carbrandid:obj.id}).then(res=>{
					if(res.code === 200){
						 let data = res.object;
						 this.carmodelList = data;
						 this.form.carbrand = obj.text;
						 this.form.carmodel = '',
						 this.form.carxinghao = '',
						 this.form.type = 1
						 this.$emit("onClick",this.form)
					}else {
						 this.$u.toast(res.msg);
					}
				}).catch(res=>{console.log(res)})
				this.step = 2
			},
			showStepNext(obj){
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
			hidePoper(obj){
				console.log(obj)
				this.form.carxinghao = obj.carseriesname;
				this.form.type = 3
				let data = Object.assign(this.form,obj)
				 this.$emit("onClick",data)
			},
			onPageScroll(e) {
				this.scrollTop = e.scrollTop;
			},
		}

	}
</script>

<style lang="scss" scoped>
	.status_bar{
		padding-top: calc(var(--window-top));
	}
	.letter-title {
		padding: 5px 10px;
		background: #f5f5f5;
		color: #333333;
	}

	.letter-text {
		padding: 15px;
		color: #333333;
		border-bottom: 1px solid #E0E0E0;
	}

	.right-menu {
		position: fixed;
		right: 8px;
		top: 20%;
	}

	.letter-item {
		margin-bottom: 2px;
	}

	.active {
		color: #4ABA75;
	}
</style>
