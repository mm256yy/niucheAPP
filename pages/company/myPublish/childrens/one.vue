<template>
	<view>
		<view class="scroll-item" @click="toView(item.rentCarId)" v-for="(item,index) in list" :key="item.index">
			<u-row>
				<u-col span="12" class="time">
					<view style="padding-right: 10pt;">{{item.createTime}}</view>
				</u-col>
				<u-col span="5" @click="toView(item.rentCarId)">
					<view style="text-align: center;"><image :src="item.photoUrl" mode="aspectFill"></image></view>
				</u-col>
				<u-col span="6" class="border-left" @click="toView(item.rentCarId)">
					<view class="title u-line-2">
					  <text v-show="item.businesstypetag == 1">[网约车]</text>
					  <text v-show="item.businesstypetag == 2">[出租车]</text>
					{{item.textTitle}}</view>
					<view class="type"><text class="type-money">￥{{item.rentCarPrice}}</text>元/月起租</view>
				</u-col>
				<u-col span="12" class="bottom">
					<view class="bottom-left"><u-icon size="32" name="clock"></u-icon>{{item.carAgeTag}}</view>
					<view class="bottom-right"><u-icon size="30" style="vertical-align: bottom;":name="distance"></u-icon>{{item.priceTag}}</view>
				</u-col>
			</u-row>
		</view>
			 <u-loadmore :status="status" :icon-type="iconType" :load-text="loadText" />
	</view>
</template>

<script>
	export default {
		data() {
			return {
				pageNum:0,
				distance:'../../../static/distance.png',
				list:[],
				total:0,
				status: 'loadmore',
				iconType: 'flower',
				loadText: {
					loadmore: '轻轻上拉',
					loading: '努力加载中',
					nomore: '我也是有底线的'
				}
			}
		},
		mounted() {
			 this.list = [];
			 this.getList(1)
		},
		methods: {
			getList(pageNum){
				this.$u.api.ComparyMyRentCarList({pageNum:pageNum,pageSize:10,orderByColumn: 'refreshtime',
					isAsc: 'desc'}).then(res=>{
					if(res.code === 200){
						this.total = res.total
						let arr = res.rows
						arr.forEach(item=>{
							this.list.push(item)
						})
						let len = this.list.length;
						if(len<this.total){
							this.status = 'loadmore'
						} else{
							this.status = 'nomore'
						}
					}else {
						 this.$u.toast(res.msg);
					}
				})
			},
			toView(id){
				this.$u.route("/pages/company/myPublish/maicheView/maicheView",{id:id})
			},
			onreachBottom() {
				let len = this.list.length;
				 if (len < this.total){
					 this.pageNum++;
					 this.getList(this.pageNum)
				 }else{
					this.status = 'nomore'
				}
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
		width: 220rpx;
		height: 200rpx;
		border-radius: 10rpx;
	}
	.border-left{
		border-left: 1px solid #e5e5e5;
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
		font-size: 14pt;
		color: #40B36C;
	}
	.bottom{
		background-color: #CDE5E3;
		padding: 5px!important;
		border-bottom-right-radius: 40rpx;
		border-bottom-left-radius: 40rpx;
	}
	.bottom-left{
		display: inline-block;
		color: #7F7F7F;
		font-size: 10pt;
		padding-left: 20rpx;
		
	}
	.bottom-right{
		display: inline-block;
		padding-left: 30rpx;
		color: #7F7F7F;
		font-size: 10pt;
	}
}



	
</style>

