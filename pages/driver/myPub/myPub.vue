<template>
	<view :class="'driver-content'"> 
		<view class="wrap">
		<u-navbar  back-icon-size="0" title="" :background="backgroundDri" title-color="#FFFFFF"></u-navbar>
		<view style="">
			<u-tabs-swiper ref="uTabs" activeColor="#ffffff" :list="list" inactive-color="#e5e5e5"
			 bg-color="" :current="current" @change="tabsChange" :is-scroll="false"
			 swiperWidth="750"></u-tabs-swiper>
		</view>
		<swiper class="swiper-box" :current="swiperCurrent" @transition="transition" @animationfinish="animationfinish">
			<swiper-item class="swiper-item">
				<scroll-view scroll-y style="height: 100%;width: 100%;" @scrolltolower="onreachBottom">
					<u-card title="" :padding="0" :foot-border-top="false" @click="toView(item)" v-for="item in zcList" :key="item.driverDemandId">
						<view class="card-head" slot="head">
							<text style="color:#7E7E7E;">刷新时间:{{item.updateTimeStr}}</text><u-icon name="reload"
							 @click="refresh(item)" color="#FE9B1C" size="28"></u-icon>
						</view>
						<view class="card-head"  slot="body" style="border-bottom: 0;">
                           <text>意向品牌</text>
								<u-subsection style="" :current="item.isOpen" @change="switchChange(item)"
								 vibrateShort button-color="#FE9B1C" active-color="#fff" :list="['公开', '不公开']"></u-subsection>
						</view>
						<view  slot="foot" style="padding:5rpx 20rpx;">
						<u-tag :text="obj" type="info" style="color: #000000;" mode="plain" shape="circle" class="tag-style"
						 v-for="(obj,index) in item.carCardList" :key="index"/>
						</view>
					</u-card>
							<!-- <u-loadmore :status="loadStatus[0]" bgColor="#f2f2f2"></u-loadmore> -->
				</scroll-view>
			</swiper-item>
			</swiper-item>
			<!-- 我的招聘 -->
			<swiper-item class="swiper-item">
				<scroll-view scroll-y style="height: 100%;width: 100%;" @scrolltolower="onreachBottom">
					<u-card title="1111" :padding="0" :foot-border-top="false" @click="toView(item.id)" v-for="item in qzList" :key="item.id">
						<view class="card-head" slot="head">
							<text style="color:#7E7E7E;">刷新时间:{{item.updateTime}}</text>
							<u-icon name="reload" color="#FE9B1C" size="28"  @click="refresh(item)"></u-icon>
						</view>
						<view class="card-head"  slot="body" style="border-bottom: 0;">
							<view style="color: #000000;">
								  <view style="font-size: 16pt;">意向品牌</view>
								  <view>工作车辆: 荣威\吉利\比亚迪...  </view>
							</view>
					        <view>
								<u-subsection style="width: 100%;" :current="item.isOpen" @change="switchChange(item)"
								 font-size="20" button-color="#FE9B1C" active-color="#fff" :list="['公开', '不公开']"></u-subsection>
								<view style="font-size: 14pt;color:#FE9B1C ;">¥2700月薪</view>
							</view>
						</view>
					</u-card>
							<!-- <u-loadmore :status="loadStatus[0]" bgColor="#f2f2f2"></u-loadmore> -->
				</scroll-view>
			</swiper-item>
		</swiper>
	</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				list: [{
					name: '我的租车'
				}, {
					name: '我的求职'
				}],
				zcList:[],
				qzList:[],
				current: 0, 
				swiperCurrent: 0,
				pageNum:0,
				pageNum1:0,
				shijian:0
			}
		},
		onLoad(option) {
			this.shijian = new Date().getTime();
			let index  = Number(option.index);
			if(index){
			 this.current = index;
			 this.swiperCurrent = index;	
			}
		},
		mounted() {
			this.setList([ {
		            "isOpen": 0,
		            "updateTime": 1504345947000,
		            "carCard": "string",
		            "driverDemandId": "78319729550430208"
		        },
		        {
		            "isOpen": 1,
		            "updateTime": 1603890948000,
		            "carCard": "string",
		            "driverDemandId": "68319732784238592"
		        }])
		},
		methods: {
			tabsChange(index) {
				this.swiperCurrent = index;
			},
			transition(e) {
				let dx = e.detail.dx;
				this.$refs.uTabs.setDx(dx);
			},
			animationfinish(e) {
				let current = e.detail.current;
				this.$refs.uTabs.setFinishCurrent(current);
				this.swiperCurrent = current;
				this.current = current;
			},
			getList(){
				let pageNum = this.pageNum+1;
				this.$u.api.askWork({pageNum:pageNum,pageSize:10}).then(res=>{
					if(res.code === 200){
						this.setList(res.rows);
					}else {
						 this.$u.toast(res.msg);
					}
				})
			},
			setList(arr){
				arr.forEach(item=>{
					if (item.carCard){
						item.carCardList = item.carCard.split(',');
					}
					item.updateTimeStr = this.timeZ(item.updateTime)
					item.refreshFlag = true;
					item.switchFlag = true;
					this.zcList.push(item)
					console.log(item)
				})
			},
			timeZ(value){
				let nowTime = this.shijian;
				let oneDay= 86400000;
				let sjc = nowTime-value;//时间差
				let tian =parseInt(sjc/oneDay);
				let day6 = oneDay*6;
				if(sjc>day6){
					let str = this.$u.timeFormat(value, 'yyyy-mm-dd');
					return str
				} else if (sjc>oneDay && sjc < day6){
					return tian+"天前"
				} else if (sjc<oneDay){
					return '刚刚'
				} else {
					console.log(sjc)
				 }
			},
			switchChange(item){
				item.switchFlag = false
				this.$u.api.getTelephone().then(res=>{
					if(res.code === 1){
						item.switchFlag = true
					}else {
						this.$u.toast(res.msg);
					}
				})
			},
			refresh(item){
				item.refreshFlag = false
				this.$u.api.getTelephone().then(res=>{
					if(res.code === 1){
						item.refreshFlag = true
					}else {
						 this.$u.toast(res.msg);
					}
				})
			},
			toView(item){
				//判断点击的不是刷新或开关
				if (item.refreshFlag && item.switchFlag){
					console.log("kaifsssssssssssssssssssssss")
				}
			},
			onreachBottom() {
				console.log(this.list)
			}
		},
	}
</script>

<style lang="scss">
	page{
		background-color:#f5f5f8 ;
	}
.driver-content{
	.u-tabs{
		background: linear-gradient(115deg,$bg-grad-FE, $bg-grad-FCD);
	}
}
/deep/ .u-border-bottom:after{
	border-bottom-width:0;
}
/deep/ .u-subsection{
	// padding: 0!important;
	width:45%;
	border-radius: 20px!important;
}
.wrap {
	display: flex;
	flex-direction: column;
	height: calc(100vh - var(--window-top));
	width: 100%;
}
.swiper-box {
	flex: 1;
}
.swiper-item {
	height: 100%;
}
.scroll-item{
background: #fff;margin: 20rpx;padding-top: 30rpx;

}
 .u-card-wrap {
 	background-color: $u-bg-color;
 	padding: 1px;
 }
 .card-head{
 	display: flex;justify-content: space-between;
 	align-items: center;
	border-bottom: 1px solid #E5E5E5;
	padding:20rpx 20rpx;
 }
.tag-style{
	background-color: #FFFFFF;
	margin-right: 8pt;margin-bottom: 5pt;
}

	
</style>
