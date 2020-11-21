<template>
	<view>
		<view class="scroll-item" v-for="(item,index) in list" :key="item.index">
			<u-row class="" style="padding: 8pt 15pt;">
				<u-col span="11" style="padding: 5pt 0;" @click="toView(item.inviteId)">
					<view>{{item.createtime}}</view>
				</u-col>
				<u-col span="1" style="padding: 5pt 0;">
					<u-icon name="reload" color="#36AB62" size="40" @click="reload(item)"></u-icon>
				</u-col>
				<u-col span="12" @click="toView(item.inviteId)" style="border-top: 1px solid #E5E5E5;padding-top: 8pt;">
					<view style="font-size: 12pt;font-weight: bold;">{{item.texttitle}}</view>
					<view>
						<text style="">月薪：</text><text style="color: #3FB26C;font-size: 16pt;">¥{{item.monthprice}}</text>
					</view>
				</u-col>
			</u-row>
			<view class="bottom u-line-1">
				<view class="bottom-left"><u-icon :name="company" size="30"></u-icon>
				<text style="padding-left: 10px;" v-for="photo in item.intentionBrand">{{photo}}</text></view>
			</view>
		</view>
			 <u-loadmore :status="status" :icon-type="iconType" :load-text="loadText" />
	</view>
</template>

<script>
	export default {
		data() {
			return {
				status: 'loadmore',
				pageNum:1,
				company:'../../../static/company.png',
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
				this.$u.api.ComparyMyInviteList({pageNum:pageNum,pageSize:10,orderByColumn: 'refreshtime',
					isAsc: 'desc'}).then(res=>{
					if(res.code === 200){
						let arr = res.rows;
						this.total = res.total
						arr.forEach(item=>{
							item.reloadFlag = true;
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
				this.$u.route("/pages/company/myPublish/zhaopinView/zhaopinView",{id:id})
			},
			reload(item){
				item.reloadFlag = false
				this.$u.api.MyIssueRefresh({comparyMainId:item.comparyMainId,BusinessState:2}).then(res=>{
					if(res.code === 200){
						item.reloadFlag = true
						this.$u.toast('刷新成功')
					}else {
						 this.$u.toast(res.msg);
					}
				})
			},
			onreachBottom() {
				let len = this.list.length;
				 if (len < this.total){
					 let page = this.pageNum+1;
					  this.getList(page)
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
		width: 200rpx;
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
