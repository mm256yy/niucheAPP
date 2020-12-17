<template>
	<view>
		<view v-show="step===1">
			<scroll-view class="scroll-list" :scroll-into-view="scrollViewId" scroll-y="true" scroll-with-animation :style="{height:winHeight + 'px'}">
				<view v-for="(item,index) in list" :key="index" :id="item.letter == '#' ? 'indexed-list-YZ' :'indexed-list-' + item.letter">
					<view class="letter-title"> {{item.letter}}</view>
					<view v-for="info in item.data" class="letter-text" @click="showStep(info.id)">
						{{info.text}}
					</view>
				</view>
			</scroll-view>
			<view class="right-menu">
				<view v-for="(i,index) in indexList" :key="index" @click="jumper(i,index)" :class="jumperIndex == i?'letter-item active':'letter-item'">{{i}}</view>
			</view>
		</view>
		<view v-show="step === 2">
			
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
				jumperIndex: 'A',
				scrollViewId: '',
				winHeight: 0,
				scrollTop: 0,
				indexList: [],
				list: [],
				step:1
			}
		},
		mounted() {
			let winHeight = uni.getSystemInfoSync().windowHeight;
			this.winHeight = winHeight;
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
			showStep(id){
				this.$u.api.getCarSystem({carbrandid:id}).then(res=>{
					if(res.code === 200){
						console.log(res)
				       // this.selectObj.carmodel = res.object;
					}else {
						 this.$u.toast(res.msg);
					}
				}).catch(res=>{console.log(res)})
				this.step = 2
			},
			showStepNext(id){
				this.$u.api.getCarModel({carseriesid:id}).then(res=>{
					if(res.code === 200){
					   // this.selectObj.carxinghao = res.object;
					}else {
						 this.$u.toast(res.msg);
					}
				})	
			},
			toNext(v) {
				if (this.source === '1') {
					this.$u.route('/pages/company/lease/lease', v)
				} else if (this.source === '2') {
					this.$u.route('/pages/company/recruit/recruit', v)
				} else if (this.source === '3') {
					this.$u.route('/pages/company/myPublish/recruitEdit/other', v)
				}
			},
			onPageScroll(e) {
				this.scrollTop = e.scrollTop;
			},
		}

	}
</script>

<style lang="scss" scoped>
	.letter-title {
		padding: 5px 10px;
		background: #ccc;
	}

	.letter-text {
		padding: 10px;
		border-bottom: 1px solid #ccc;
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
		color: #f00;
	}
</style>
