<template>
	<view :class="'company-content'">
		<u-icon class="bell" @click="message()" name="bell" color="#fff" size="36"></u-icon>
		<view @click="message()" v-show="num" class="badge">{{num}}</view>
		<view class="wrap">
		<u-navbar height="10" back-icon-size="0" title="" :background="backgroundCom" title-color="#FFFFFF"></u-navbar>
		<view style="">
			<u-tabs-swiper style="position: fixed;" height="88" ref="uTabs" activeColor="#ffffff" :list="list" inactive-color="#e5e5e5"
			 bg-color="" :current="current" @change="tabsChange" :is-scroll="false"
			 swiperWidth="750"></u-tabs-swiper>
		</view>
		<swiper class="swiper-box" :current="swiperCurrent" @transition="transition" @animationfinish="animationfinish">
			<swiper-item class="swiper-item">
				<scroll-view scroll-y style="height: 100%;width: 100%;">
					<car-sell v-if="isChildUpdate1" ref="carSell"></car-sell>
				</scroll-view>
			</swiper-item>
			<swiper-item class="swiper-item">
				<scroll-view scroll-y style="height: 100%;width: 100%;">
					<buying v-if="isChildUpdate2" ref="buying"></buying>
				</scroll-view>
			</swiper-item>
		</swiper>
	</view>
	</view>
</template>

<script>
	import carSell from './components/index/carSell'
	import buying from './components/index/buying'
	import {format} from '@/common/rule.js'
	export default {
		components: {
			carSell,
		    buying
		},
		data() {
			return {
				list: [{
					name: '买车'
				}, {
					name: '求购'
				}],
				current: 0, 
				swiperCurrent: 0,
				isChildUpdate1:true,
				isChildUpdate2:false,
				num: 0,
				token:'',
				time:''
			}
		},
		methods: {
			message(){
				this.token = uni.getStorageSync('token');
				if(this.token){
					this.$u.route("/pages/index/company/components/index/message",{time:this.time})
				}else{
					this.$u.route('/pages/login/login');
				}
			},
			view(){
				this.$u.api.haveIs().then(res=>{
					if(res.code === 200){
						 this.num = res.object.titlenum;
						 if(res.object.recentlytime){
						 	this.time = format(res.object.recentlytime, 'yyyy-MM-dd HH:mm'); 
						 }else{
						 	this.time="";
						 }
					}else {
						 this.$u.toast(res.msg);
					}
				})
			},
			getList() {
				this.token = uni.getStorageSync('token');
				if(this.$refs.carSell != undefined){
					this.$refs.carSell.search()
					this.$refs.carSell.page()
					if(this.token){
						this.view()
					}
					this.$refs.carSell.transform()
				}
				if(this.$refs.buying != undefined){
					this.$refs.buying.search()
					this.$refs.buying.page()
					if(this.token){
						this.view()
					}
				}
			},
			create(index){
				this.token = uni.getStorageSync('token');
				if(index == 0) {
				    this.isChildUpdate1 = true;
				    this.isChildUpdate2 = false;
					if(this.token){
						this.view()
					}
				} else if(index == 1) {
				    this.isChildUpdate1 = false;
				    this.isChildUpdate2 = true;
					if(this.token){
						this.view()
					}
				}
			},
			// tabs通知swiper切换
			tabsChange(index) {
				this.swiperCurrent = index;
				this.create(index)
			},
			// swiper-item左右移动，通知tabs的滑块跟随移动
			transition(e) {
				let dx = e.detail.dx;
				this.$refs.uTabs.setDx(dx);
			},
			// 由于swiper的内部机制问题，快速切换swiper不会触发dx的连续变化，需要在结束时重置状态
			// swiper滑动结束，分别设置tabs和swiper的状态
			animationfinish(e) {
				let current = e.detail.current;
				this.$refs.uTabs.setFinishCurrent(current);
				this.swiperCurrent = current;
				this.current = current;
			},
			// scroll-view到底部加载更多
			// onreachBottomCarSell() {
			// 	this.$refs.carSell.pull()
			// },
			// onreachBottomBuying() {
			// 	this.$refs.buying.pull()
			// }
		}
	}
</script>

<style lang="scss">
page{
	// background-image: url(@/static/lease.png);
	background-repeat: no-repeat;
	height: 100%;
	background-size: cover;
	// background-position: 50% 50%;
}
	/deep/ .u-border-bottom:after{
		border-bottom-width:0;
	}
</style>
<style lang="scss" scoped>
	.driver-content{
		.u-tabs{
			background: linear-gradient(115deg,$bg-grad-FE, $bg-grad-FCD);
		}
	}
	.company-content{
		.u-tabs{
			background: linear-gradient(115deg, $bg-grad-AB, $bg-grad-DDC);
		}
	}
.wrap {
		display: flex;
		flex-direction: column;
		height: calc(100vh - var(--window-top));
		width: 100%;
		scroll:true;
	}
	.swiper-box {
		flex: 1;
		margin-top: 80rpx;
		background-color: #fff;
	}
	.swiper-item {
		height: 100%;
	}
	.scroll-item{
	background: #fff;margin: 20rpx;padding-top: 30rpx;
	
	}
	.bell{
		position: fixed;
		top: calc(var(--status-bar-height) + 54rpx);
		right: 40rpx;
		z-index: 100;
	}
	.badge{
		width: 27rpx;
		height: 27rpx;
		line-height: 24rpx;
		text-align: center;
		font-size: 20rpx;
		color: #fff;
		border-radius: 50%;
		background-color: red;
		position: fixed;
		top: calc(var(--status-bar-height) + 34rpx);
		right: 30rpx;
		z-index: 100;
	}



	
</style>
