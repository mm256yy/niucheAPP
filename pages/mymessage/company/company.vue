<template>
	<view :class="'company-content'">
		<u-icon v-show="token" @click="message()" style="position: fixed;top: 44rpx;right: 40rpx;z-index: 100;" name="bell" color="#fff" size="36"></u-icon>
		<u-badge v-show="num" type="error" :count="num"></u-badge>
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
		mounted() {
			this.token = uni.getStorageSync('token');
			if(this.token){
				this.view()
			}
		},
		methods: {
			message(){
				this.$u.route("/pages/index/company/components/index/message",{time:this.time})
			},
			view(){
				this.$u.api.haveIs().then(res=>{
					if(res.code === 200){
						 this.num = res.object.titlenum;
						 this.time = res.object.recentlytime;
					}else {
						 this.$u.toast(res.msg);
					}
				})
			},
			getList() {
				if(this.$refs.carSell != undefined){
					this.$refs.carSell.search()
					this.$refs.carSell.page()
				}
				if(this.$refs.buying != undefined){
					this.$refs.buying.search()
					this.$refs.buying.page()
				}
			},
			create(index){
				if(index == 0) {
				    this.isChildUpdate1 = true;
				    this.isChildUpdate2 = false;
				} else if(index == 1) {
				    this.isChildUpdate1 = false;
				    this.isChildUpdate2 = true;
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
				this.create(current)
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
}
.swiper-box {
	flex: 1;
	margin-top: 80rpx;
}
.swiper-item {
	height: 100%;
}
.scroll-item{
	background: #fff;margin: 20rpx;padding-top: 10rpx;
	border-radius: 40rpx;
	box-shadow: 0px 0px 18px 0px rgba(69, 183, 114, 0.24);
    .time{
		font-weight: bold;
		text-align: right!important;
	}
	image {
		width: 200rpx;
		height: 200rpx;
		border-radius: 10rpx;
	}
	.border-left{
		border-left: 1px solid #7F7F7F;
		padding-left: 30rpx!important;
	}
	.title{
		font-weight: bold;
		font-size: 12pt;
	}
	.type{
		padding-top: 10rpx;
	}
	.type-money{
		color: #40B36C;
	}
	.bottom{
		background-color: #CDE5E3;
		padding: 5px!important;
		border-bottom-right-radius: 40rpx;
		border-bottom-left-radius: 40rpx;
	}
	.bottom-left{
		color: #7F7F7F;
		font-size: 10pt;
		padding-left: 20rpx;
		width: 35%;
		display: inline-block;
		
	}
	.bottom-right{
		padding-left: 30rpx;
		color: #7F7F7F;
		font-size: 10pt;
		width: 50%;
		display: inline-block;
	}
}



	
</style>
