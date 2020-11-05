<template>
	<view>
			<scroll-view scroll-y style="height: 100%;width: 100%;" @scrolltolower="onreachBottom">
				<view class="scroll-item" @click="toView()" v-for="item in list" :key="item.rentCarId">
					<u-row>
						<u-col span="12" class="time">
							<view style="padding-right: 10pt;">2020/09/2</view>
						</u-col>
						<u-col span="5" @click="toView(item.rentCarId)">
							<view><image :src="item.photoUrl" mode="aspectFill"></image></view>
						</u-col>
						<u-col span="6" class="border-left" @click="toView()">
							<view class="title u-line-2">{{item.textTitle}}</view>
							<view class="type"><text class="type-money">￥{{item.rentCarPrice}}</text>元/月起租</view>
						</u-col>
						<u-col span="12" class="bottom">
							<text class="bottom-left">{{item.textTag[0]}}</text>
							<text class="bottom-right">{{item.textTag[1]}}</text>
						</u-col>
					</u-row>
				</view>
						<!-- <u-loadmore :status="loadStatus[0]" bgColor="#f2f2f2"></u-loadmore> -->
			</scroll-view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				pageNum:0,
				list:[]
			}
		},
		mounted() {
			 this.getList()
		},
		methods: {
			getList(){
				let pageNum = this.pageNum+1;
				this.$u.api.ComparyMyRentCarList({pageNum:pageNum,pageSize:10}).then(res=>{
					if(res.code === 200){
						let arr = res.rows
						arr.forEach(item=>{
							this.list.push(item)
						})
					}else {
						 this.$u.toast(res.msg);
					}
				})
			},
			toView(){
				this.$u.route("/pages/company/myPublish/zucheView/zucheView")
			},
			onreachBottom() {
				 this.getList()
			}
		}
	}
</script>

<style lang="scss" scoped>
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

