<template>
	<view :class="'company-content'">
		<u-icon v-show="token" @click="message()" style="position: fixed;top: 44rpx;right: 40rpx;z-index: 100;" name="bell" color="#fff" size="36"></u-icon>
		<u-badge v-show="num" type="error" :count="num"></u-badge>
		<view class="wrap">
		<u-navbar height="10" back-icon-size="0" title="" :background="backgroundCom" title-color="#FFFFFF"></u-navbar>
		<view style="">
			<u-tabs-swiper style="position: fixed;" ref="uTabs" activeColor="#ffffff" :list="list" inactive-color="#e5e5e5"
			 bg-color="" :current="current" @change="tabsChange" :is-scroll="false" height="88"
			 swiperWidth="750"></u-tabs-swiper>
		</view>
		<swiper class="swiper-box" :current="swiperCurrent" @transition="transition" @animationfinish="animationfinish">
			<swiper-item class="swiper-item">
				<scroll-view scroll-y style="height: 100%;width: 100%;">
					<car-rent v-if="isChildUpdate1" ref="rent"></car-rent>
				</scroll-view>
			</swiper-item>
			<swiper-item class="swiper-item">
				<scroll-view scroll-y style="height: 100%;width: 100%;">
					<job-search v-if="isChildUpdate2" ref="jobsearch"></job-search>
				</scroll-view>
			</swiper-item>
		</swiper>
	</view>
	</view>
</template>

<script>
	import carRent from './components/index/carRent'
	import jobSearch from './components/index/jobSearch'
	export default {
		components: {
			carRent,
			jobSearch
		},
		data() {
			return {
				goodsUrl: '//img10.360buyimg.com/n7/jfs/t22300/31/1505958241/171936/9e201a89/5b2b12ffNe6dbb594.jpg!q90.jpg',
				list: [{
					name: '租车'
				}, {
					name: '求职'
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
						 this.time = this.format(res.object.recentlytime, 'yyyy-MM-dd HH:mm');
					}else {
						 this.$u.toast(res.msg);
					}
				})
			},
			format(time, format) {
			            var t = new Date(time);
			            var tf = function(i) {
			                return (i < 10 ? '0' : '') + i
			            };
			            return format.replace(/yyyy|MM|dd|HH|mm|ss/g, function(a) {
			                switch (a) {
			                case 'yyyy':
			                    return tf(t.getFullYear());
			                    break;
			                case 'MM':
			                    return tf(t.getMonth() + 1);
			                    break;
			                case 'mm':
			                    return tf(t.getMinutes());
			                    break;
			                case 'dd':
			                    return tf(t.getDate());
			                    break;
			                case 'HH':
			                    return tf(t.getHours());
			                    break;
			                case 'ss':
			                    return tf(t.getSeconds());
			                    break;
			                }
			            });
			        },
			getList() {
				if(this.$refs.rent != undefined){
					this.$refs.rent.search()
					this.$refs.rent.page()
				}
				if(this.$refs.jobsearch != undefined){
					this.$refs.jobsearch.search()
					this.$refs.jobsearch.page()
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
			// init(){
			// 	this.$refs.child.search()
			// },
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
			toView(){
				console.log(11111111111111)
			},
			// scroll-view到底部加载更多
			// onreachBottomrentcar() {
			// 	//监听上拉触底事件
			// 	this.$refs.rent.pull();
			// },
			// onreachBottomjobsearch() {
			// 	//监听上拉触底事件
			// 	this.$refs.jobsearch.pull();
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
	.company-content{
			.u-tabs{
				background: linear-gradient(115deg, $bg-grad-AB, $bg-grad-DDC);
			}
			// padding-bottom: 10px;
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
	background: #fff;margin: 20rpx;padding-top: 30rpx;
	
	}



	
</style>
