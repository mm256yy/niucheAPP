<template>
	<view>
		<view class="list_content">
			<load-refresh
			  style="margin-top: 40rpx;"
			  v-show="list.length"
			  ref="loadRefresh"
			  :pageNo='pageNum'
			  :totalPageNo='total'
			  :isRefresh="true"
			  refreshType="halfCircle"
			  refreshTime="1000"
			  color="#04C4C4"
			  heightReduce="10"
			  backgroundCover="#F3F5F5"
			  @loadMore="loadMore" 
			  @refresh="refresh">
			  <view slot="content-list">
			    <view class="list_item" v-for="(item,index) in list" :key="index" @click="toView(item)">
			    	<view class="item_time">{{item.createTime}}</view>
			    	<view class="item_content">
			    		<view class="title u-line-2">
			    			<text>{{item.carname}}</text>
			    		</view>
			    		<view class="money">
			    			 <view class="title">{{item.state ==='WAITTING_DELIVERY_VEHICLE' || item.state === 'ORDER_FINISHED'?'实付':'总计'}}</view>
			    			 <view v-if="item.state ==='WAITTING_DELIVERY_VEHICLE' || item.state === 'ORDER_FINISHED'"><text class="price">{{item.totalprice|toMoney}}</text><text class="unit">元</text></view>
			    			 <view v-else><text class="price">{{item.totalprice|toMoney}}</text><text class="unit">元</text></view>
			    		</view>
			    		<view class="company">
			    			<view><text style="color: #858585;padding-right: 10rpx;">承租人</text><text style="color: #424242;">{{item.rentername}}</text></view>
			    			<view style="color: #BCBCBC;padding-top: 10rpx;">
			    				<text>租期{{item.leasetime}}个月</text> <text style="padding: 0 5px;">|</text>
			    				<text>月租金{{item.monthlyrent}}元</text>
			    				<!-- <text>押金{{item.deposit}}元<text style="color: #FE3B31;font-size: 14rpx;">（须线下转账）</text></text> -->
			    			</view>
			    		</view>
			    		<view class="order">
			    			<view class="num">订单号：{{item.tradeid}}</view>
			    			<view class="btn" :class="['btn',item.state === 'ORDER_FINISHED' || item.state === 'ORDER_FAILED'?'complete':'active']">
			    				{{item.state | soureText}}
			    			</view>
			    		</view>
			    	</view>
			    </view>
			  </view>
			</load-refresh>
			<view class="null" v-show="!list.length">
				<view>
					<u-image width="371" height="171rpx" src="@/static/null.png"></u-image>
					<view style="width: 371rpx;text-align: center;margin-top: 20rpx;">亲，当前空空如也</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				background: {
					'background-image': 'linear-gradient(to bottom, #000000 39%,#ffffff 0%)'
				},
				list: [],
				downOption: {
					auto: false //是否在初始化后,自动执行downCallback; 默认true
				},
				up: {
					textNoMore: '--没有更多了--'
				},
				total: 0,
				pageNum: 1,
				pagination: {
				  pageNum: 1, 
				  pageSize: 10
				}
			}
		},
		filters: {
			soureText: function(value) {
				if (value === 'WAITTING_UPLOADING_MESSAGE' || value === 'VALIDATE_CAR') {
					return '商品登记'
				} else if (value === 'WAITTING_SIGN_CONTRACT' || value === 'COMPANY_SIGN_CONTRACT' || value === 'REGISTER_CAR') {
					return '待签约'
				} else if (value === 'NO_PAYMENT' || value === 'DRIVER_SIGN_CONTRACT') {
					return '待支付'
				} else if (value === 'WAITTING_DELIVERY_VEHICLE') {
					return '待提车'
				} else if (value === 'ORDER_FINISHED') {
					return '完成'
				} else if (value === 'ORDER_FAILED') {
					return '失效'
				} else {
					return ''
				}
			},
			toMoney:function(s,type){
			        if (/[^0-9\.]/.test(s)) return "0";
			        if (s == null || s == "") return "0";
			        s = s.toString().replace(/^(\d*)$/, "$1.");
			        s = (s + "00").replace(/(\d*\.\d\d)\d*/, "$1");
			        s = s.replace(".", ",");
			        var re = /(\d)(\d{3},)/;
			        while (re.test(s))
			            s = s.replace(re, "$1,$2");
			        s = s.replace(/,(\d\d)$/, ".$1");
			        if (type == 0) {// 不带小数位(默认是有小数位)
			            var a = s.split(".");
			            if (a[1] == "00") {
			                s = a[0];
			            }
			        }
			        return s;
			   }
		},
		mounted() {
			this.pageNum = 1;
			this.search()
		},
		methods: {
			page() {
			    this.pageNum = 1;	
			},
			// 上划加载更多
			      loadMore() {
			        this.getList()
			        // 请求新数据完成后调用 组件内loadOver()方法
			        // 注意更新当前页码 currPage
			        this.$refs.loadRefresh.loadOver()
			      },
			// 下拉刷新数据列表
			refresh() {
				this.pageNum = 1;
			    this.search()
			},
			getList(){
				this.pageNum = this.pageNum + 1;
				this.$u.api.orderList({
					pageNum: this.pageNum,
					pageSize: 10,
					state: '0',
				}).then(res => {
					if (res.code === 200) {
						this.total = Math.ceil(res.total/10);
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
					} else {
						this.$u.toast(res.msg);
					}
				})
			},
			search() {
				this.$u.api.orderList({
					pageNum: 1,
					pageSize: 10,
					state: '0',
				}).then(res => {
					if (res.code === 200) {
						this.list = res.rows;
						this.total = Math.ceil(res.total/10);
						let len = this.list.length;
						if(len<this.total){
							this.status = 'loadmore'
						} else{
							this.status = 'nomore'
						}
					} else {
						this.$u.toast(res.msg);
					}
				})
			},
			toView(item) {
				if(item.state == 'ORDER_FAILED'){
					this.$u.route('/pages/company/order/invalidation', {
						id: item.id
					})
				}else{
					this.$u.route('/pages/company/order/orderDetail', {
						id: item.id
					})
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	page {
		background: #F5F5F5;
	}

	.navbar-right {
		margin-right: 24rpx;
		display: flex;
	}

	.right-item {
		margin: 0 12rpx;
		position: relative;
		display: flex;
	}

	.list_content {
		margin: 0 40rpx;

		.list_item {
			padding: 30rpx 0 20rpx;
			.item_time {
				text-align: center;
				padding-bottom: 18rpx;
			}
			.item_content {
				padding: 20rpx 24rpx;
				border-radius: 8rpx;
				background-color: #FFFFFF;
				.title{
					color: #333333;
				}
				.money{
					padding:80rpx 0 30rpx;
					text-align: center;
					.title{
						font-size: 28rpx;
						color: #C0C0C0;
					}
					.price{
						font-size: 60rpx;
					}
					.unit{
						padding-left: 8rpx;
						font-size: 24rpx;
					}
				}
				.company{
					padding-bottom: 20rpx;
				}
				.order{
					display: flex;
					justify-content: space-between;
					.num{
						height: 62rpx;
						line-height: 62rpx;
						color: #BCBCBC;
						font-size: 28rpx;
					}
					.btn{
						width: 176rpx;
						height: 60rpx;
						line-height: 60rpx;
						border-radius: 30rpx;
						text-align: center;

					}
					.active{
						color: #24CE8D;
						border: 2rpx solid #24CE8D;
					}
					.complete{
						color: #C2C2C2;
						border: 2rpx solid #C2C2C2;
					}
				}
			}
		}
		.null{
			height: calc(73vh - var(--window-top));
			display: flex;
			justify-content: center;
			align-items: center;
		}
	}
</style>
