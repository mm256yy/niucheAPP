<template>
	<view class="search">
		<view class="lists" v-for="(item, index) in list" :key="index">
			<view class="list" @click="detail(item.inviteId)">
				<view class="left">
					<view class="name">{{item.texttitle}}</view>
					<view class="car u-line-1">工作车辆：{{item.intentionBrand}}</view>
				</view>
				<view class="right">
					<view class="text">月薪</view>
					<view class="clear"></view>
					<view class="salary">￥{{item.monthprice}}</view>
					<view class="clear"></view>
				</view>
				<view class="clear"></view>
			</view>
			<view class="city">浙江-杭州</view>
			<view class="clear"></view>
		</view>
		 <u-loadmore :status="status" :icon-type="iconType" :load-text="loadText" />
	</view>
</template>

<script>
	export default {
		data() {
			return {
				list: [],
				total: 0,
				pagination: {
				  pageNum: 1, 
				  pageSize: 10
				},
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
			let token = uni.getStorageSync('token');
			if(token){
				this.getList()
			}
		},
		methods: {
		    getList(){
		        const params = {
		        	pageNum: 1,
		        	pageSize: 10
		        }
		    		this.$u.api.ComparyMyInviteList(params).then(res=>{
		    			if(res.code === 200){
		    				 this.list = res.rows;
		    				 this.total= res.total;
							 let len = this.list.length;
							 if(len<this.total){
							 	this.status = 'loadmore'
							 } else{
							 	this.status = 'nomore'
							 }
							 this.list.forEach(item=>{
							 	if (item.intentionBrand){
							        item.intentionBrand = item.intentionBrand.join('/')
							 	}
							 })
		    			}else {
		    				 this.$u.toast(res.msg);
		    			}
		    		})
		    },
			getPage(){
			    const params = {
			    	pageNum: this.pagination.pageNum + 1,
			    	pageSize: 10
			    }
					this.$u.api.ComparyMyInviteList(params).then(res=>{
						if(res.code === 200){
							 this.total= res.total;
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
							 this.list.forEach(item=>{
							 	if (item.intentionBrand){
							        item.intentionBrand = item.intentionBrand.join('/')
							 	}
							 })
						}else {
							 this.$u.toast(res.msg);
						}
					})
			},
			pull() {
				let len = this.list.length;
				 if (len < this.total){
					 this.getPage()
				 }else{
					this.status = 'nomore'
				}
			},
			detail(id) {
				this.$u.route("/pages/index/company/components/index/jobSearchDetail",{id:id})
			}
		}
	}
</script>
<style lang="scss" scoped>
	.search {
		.clear{
			clear: both;
		}
		.lists{
			background: #fff;
			margin: 41rpx;
			.list {
				width: 672rpx;
				padding: 36rpx;
				font-size: 20rpx;
				border-bottom: 1rpx solid rgba(0,0,0,0.05);
				display: flex;
				justify-content: center;
				align-items: center;
				.left{
					width: 300rpx;
					// float: left;
					.name{
						font-size: 36rpx;
						font-weight: 900;
						margin-bottom: 25rpx;
					}
					.car{
						width: 360rpx;
					}
				}
				.right{
					// float: right;
					.text{
						float: right;
						margin-bottom: 25rpx;
						margin-top: 10rpx;
					}
					.salary{
						color: #40B36C;
						font-size: 36rpx;
						font-weight: 900;
						float: right;
					}
				}
			}
			.city{
				margin-top: 30rpx;
				float:right;
				margin-right: 60rpx;
				margin-bottom: 30rpx;
			}
		}
	}
</style>


