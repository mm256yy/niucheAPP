<template>
	<view class="">
	<u-navbar back-text="" back-icon-size="0" title="" :background="backgroundCom" height='44' title-color="#FFFFFF"></u-navbar>
	
	<u-index-list :scrollTop="scrollTop" :index-list="indexList" offset-top='44'>
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
				indexList: letterArr,
				list: list,
				source:'',
				
			}
		},
		onLoad(option) {
			let index = option.source;
			this.source = index;
			console.log(this.source)
		},
		mounted() {

		},
		methods:{
			toNext(v){
				if (this.source === '1') {
					 this.$u.route('/pages/company/lease/lease',v)
				} else{
					 this.$u.route('/pages/company/recruit/carOther/carOther',v)
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
