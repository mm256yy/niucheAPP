<template>
		
	<view class="wrap">
		<u-navbar  back-icon-size="0" title="我的发布" :background="backgroundCom" :is-back="false"
			:back-text-style="backTextStyle" height='44' title-color="#FFFFFF">
			<view class="navbar-right">
				<view class="message-box right-item">
					<text  @click="toCenter">返回</text>
				</view>
			</view>
		</u-navbar>
		<view>
			 <u-tabs-swiper ref="uTabs" activeColor="#ffffff" :list="list" inactive-color="#e5e5e5"
			  bg-color="" :current="current" @change="tabsChange" :is-scroll="false"
			  swiperWidth="750"></u-tabs-swiper>
		</view>
		<swiper class="swiper-box" :current="swiperCurrent" @transition="transition" @animationfinish="animationfinish">
			<swiper-item class="swiper-item">
				<scroll-view scroll-y style="height: 100%;width: 100%;" @scrolltolower="onreachBottom">
				 <OneList v-if="isChildUpdate1" ref="onelist"></OneList>
				</scroll-view>
			</swiper-item>
			<swiper-item class="swiper-item">
				<scroll-view scroll-y style="height: 100%;width: 100%;" @scrolltolower="onreachBottom1">
				  <TwoList v-if="isChildUpdate2" ref="twolist"></TwoList>
			    </scroll-view>
			</swiper-item>
			<swiper-item class="swiper-item">
				<scroll-view scroll-y style="height: 100%;width: 100%;" @scrolltolower="onreachBottom2">
				  <ThreeList v-if="isChildUpdate3" ref="threelist"></ThreeList>
			    </scroll-view>
			</swiper-item>
			<swiper-item class="swiper-item">
				<scroll-view scroll-y style="height: 100%;width: 100%;" @scrolltolower="onreachBottom3">
				  <FourList v-if="isChildUpdate4" ref="fourlist"></FourList>
			    </scroll-view>
			</swiper-item>	
		</swiper>
	</view>
</template>

<script>
	import OneList from './childrens/one.vue'
	import TwoList from './childrens/two.vue'
	import ThreeList from './childrens/three.vue'
	import FourList from './childrens/four.vue'
	export default {
		data() {
			return {
				backTextStyle:{
					'color':'#ffffff'
				},
				list: [{
					name: '租车'
				}, {
					name: '招聘'
				}, {
					name: '卖车'
				},{
					name: '求购'
				}],
				current: 0, 
				swiperCurrent: 0,
				isChildUpdate1:true,
				isChildUpdate2:false,
				isChildUpdate3:false,
				isChildUpdate4:false
			}
		},
		components:{
			OneList,TwoList,ThreeList,FourList
		},
		onLoad(option) {
			let index  = Number(option.index)
			if(index){
			 this.current = index;
			 this.swiperCurrent = index;
			 this.create(index)
			}
		},
		mounted() {
			// let index = this.current;
			// this.init(index)
		},
		methods: {
			create(index){
				if(index == 0) {
				    this.isChildUpdate1 = true;
				    this.isChildUpdate2 = false;
					this.isChildUpdate3 = false;
					this.isChildUpdate4 = false;
				} else if(index == 1) {
				    this.isChildUpdate1 = false;
				    this.isChildUpdate2 = true;
				    this.isChildUpdate3 = false;
				    this.isChildUpdate4 = false;
				}else if(index == 2) {
				    this.isChildUpdate1 = false;
				    this.isChildUpdate2 = false;
				    this.isChildUpdate3 = true;
				    this.isChildUpdate4 = false;
				}else if(index == 3) {
				    this.isChildUpdate1 = false;
				    this.isChildUpdate2 = false;
				    this.isChildUpdate3 = false;
				    this.isChildUpdate4 = true;
				}
			},
			// tabs通知swiper切换
			tabsChange(index) {
				this.swiperCurrent = index;
				this.create(index)
			},
			// init(index){
				
			// 	if (index === 0) {
			// 		this.$refs.onelist.init()
			// 	} else if (index ===1) {
			// 		this.$refs.twolist.init()
			// 	}else if (index ===2) {
			// 		this.$refs.threelist.init()
			// 	}else if (index ===3) {
			// 		this.$refs.fourlist.init()
			// 	} else{}
			// },
			toCenter(){
				this.$u.route({url:'/pages/mycenter/mycenter',type:'switchTab'})
			},
			// swiper-item左右移动，通知tabs的滑块跟随移动
			transition(e) {
				let dx = e.detail.dx;
				this.$refs.uTabs.setDx(dx);
					
			},
			animationfinish(e) {
				let current = e.detail.current;
				this.$refs.uTabs.setFinishCurrent(current);
				this.swiperCurrent = current;
				this.current = current;
				this.create(current)
			},
			// scroll-view到底部加载更多
			onreachBottom() {
				this.$refs.onelist.onreachBottom()
			},
			onreachBottom1() {
				this.$refs.twolist.onreachBottom()
			},
			onreachBottom2() {
				this.$refs.threelist.onreachBottom()
			},
			onreachBottom3() {
				this.$refs.fourlist.onreachBottom()
			}
		}
	}
</script>

<style lang="scss">
page{
	// background-image: url(../../../static/lease.png);
	// background-repeat: no-repeat;
background-color:#f5f5f8 ;
}
.u-tabs{
	background: linear-gradient(115deg, $bg-grad-AB, $bg-grad-DDC);
}
/deep/ .u-border-bottom:after{
	border-bottom-width:0;
}
</style>
<style lang="scss" scoped>

.wrap {
	display: flex;
	flex-direction: column;
	height: calc(100vh - var(--window-top));
	width: 100%;
	/deep/ .u-border-bottom:after{
		border-bottom-width:0;
	}
}
.swiper-box {
	flex: 1;
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
		
	}
	.bottom-right{
		padding-left: 30rpx;
		color: #7F7F7F;
		font-size: 10pt;
	}
}



	
</style>
<style lang="scss" scoped>
	.navbar-right {
		margin-left: 24rpx;
		display: flex;
	}
	.right-item {
		margin: 0 12rpx;
		position: relative;
		color: #ffffff;
		display: flex;
	}
</style>