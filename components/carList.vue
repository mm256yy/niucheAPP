<template>
	<view class="">
	<u-index-list :scrollTop="scrollTop" :index-list="indexList" offset-top='0'>
		<view v-for="(item, index) in list" :key="index">
			<u-index-anchor :index="item.letter" />
			<view class="list-cell u-border-bottom" v-for="(info, index) in item.data" :key="index" @click="toNext(info)">
				<text>{{info.text}}</text>
			</view>
		</view>
	</u-index-list>
	</view>
</template>

<script>
import {list} from "@/utils/index.list.js";
	const letterArr = list.map(val => {
		return val.letter;
	})
	export default {
		data() {
			return {
				scrollTop: 0,
				indexList: [],
				list: [],
				source:'',
				
			}
		},
		onLoad(option) {
			let index = option.source;
			this.source = index;
		},
		mounted() {
           uni.request({
           	url: 'http://niuche-default.neocab.cn/carmodel',//接口地址
           	header: {
           		  'content-type': 'application/x-www-form-urlencoded',  //自定义请求头信息
           		},
           	success: (res) => {
				if(res.statusCode === 200){
					this.list = res.data;
					let arr = [];
					res.data.forEach(item=>{
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
		methods:{
			toNext(v){
				if (this.source === '1') {
					 this.$u.route('/pages/company/lease/lease',v)
				} else if(this.source === '2'){
					 this.$u.route('/pages/company/recruit/recruit',v)
				}else if(this.source === '3'){
					 this.$u.route('/pages/company/myPublish/recruitEdit/other',v)
				}
			},	
			onPageScroll(e) {
				this.scrollTop = e.scrollTop;
			},
		}

	}
</script>

<style lang="scss" scoped>
	.list-cell {
		display: flex;
		box-sizing: border-box;
		width: 100%;
		padding: 10px 24rpx;
		overflow: hidden;
		color: $u-content-color;
		font-size: 14px;
		line-height: 24px;
		background-color: #fff;
	}
</style>
