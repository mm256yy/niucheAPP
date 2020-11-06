<template>
	<view>
		<scroll-view scroll-y style="height: 100%;width: 100%;" @scrolltolower="onreachBottom">
			<view class="scroll-item" @click="toView(item.askToShopId)" v-for="item in list" :key="item.askToShopId">
				<u-row class="" style="padding: 8pt 15pt;">
					<u-col span="11" style="padding: 5pt 0;">
						<view>{{item.createtime}}</view>
					</u-col>
					<u-col span="1" style="padding: 5pt 0;">
						<u-icon name="reload" color="#36AB62" size="40"></u-icon>
					</u-col>
					<u-col span="12" @click="toView()" style="border-top: 1px solid #E5E5E5;padding: 8.5pt 0 10pt;">
						<view style="font-size: 14pt;font-weight: bold;">求购：{{item.inviteCar}}...</view>
						<view class="" style="padding-top: 8pt;">
							<text style="">打包价：</text><text style="color: #3FB26C;font-size: 18pt;">{{item.packprice}}</text>
						</view>
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
				this.$u.api.ComparyMyAskToShopList({pageNum:pageNum,pageSize:10}).then(res=>{
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
