<template>
	<view class="selling">
		<view v-for="(item, index) in list" :key="index">
			<view class="list" @click="detail()">
				<view class="right">
					<view class="name">520520款运动版</view>
					<u-icon class="clock" name="clock" width="23" height="22"></u-icon>
					<view class="year">车龄<3个月</view>
					<view class="clear"></view>
					<u-image class="car" width="22rpx" height="22rpx" src="@/static/distance.png"></u-image>
					<view class="distance">20万公里-30万公里</view>
					<view class="clear"></view>
				</view>
						<view class="label">网约车</view>
				<u-image class="left" width="300rpx" height="153rpx" src="https://cdn.uviewui.com/uview/example/fade.jpg"></u-image>
				<view class="clear"></view>
				<!-- <u-icon class="heart" name="heart-fill" color="#3FB26C" size="28"></u-icon> -->
				<view class="box">
					<view><text>￥28000</text>元/月起租</view>
					<view class="case">自动挡</view>
					<view class="case">SUV</view>
					<view class="case">纯电动</view>
				</view>
			</view>
			<u-icon v-show="item.iscollect&&list.length" @click="cancel(item.id)" class="heart" name="heart-fill" color="#FFA032" size="28"></u-icon>
			<u-icon v-show="!item.iscollect&&list.length" @click="favorites(item.id)" class="heart" name="heart-fill" color="rgba(0,0,0,0.1)" size="28"></u-icon>
		</view> 
	</view>
</template>

<script>
	export default {
		data() {
			return {
				backTextStyle:{
					'color':'#ffffff'
				},
				list: [],
				total: 0,
				pagination: {
				  pageNum: 0, 
				  pageSize: 10
				}
			}
		},
		mounted() {
			this.search()
		},
		methods: {
			favorites(id) {
				const params = {
					BeCollectedId: id,
					isDriveAndCompary: 1 
				};
			    this.$u.api.collect(params).then(res=>{
			    	if(res.code === 200){
			    		 this.$u.toast('收藏成功');
			    	}else {
			    		 this.$u.toast(res.msg);
			    	}
			    })
			},
			cancel(id) {
				const params = {
					BeCollectedId: id,
					isDriveAndCompary: 1 
				};
			    this.$u.api.collect(params).then(res=>{
			    	if(res.code === 200){
			    		 this.$u.toast('取消收藏成功');
			    	}else {
			    		 this.$u.toast(res.msg);
			    	}
			    })
			},
			getList(){
			    const params = Object.assign(this.form, {
			    	pageNum: this.pagination.pageNum + 1,
			    	pageSize: 10
			    });
					this.$u.api.homeRent(params).then(res=>{
						if(res.code === 200){
							 this.list = res.rows;
							 this.total= res.total;
						}else {
							 this.$u.toast(res.msg);
						}
					})
			},
			search(){
			    const params = Object.assign({
					pageNum: 0,
					pageSize: 10
				});
					this.$u.api.homeRent(params).then(res=>{
						if(res.code === 200){
							 this.list = res.rows;
							 this.total = res.total;
						}else {
							 this.$u.toast(res.msg);
						}
					})
			},
		  clear() {
				this.$u.route("pages/mymessage/mymessage")
		  	}
		}
	}
</script>
<style lang="scss" scoped>
	.selling {
		.heart {
			margin-top: 14rpx;
			margin-right: 20rpx;
			position: absolute;
			top: 40rpx;
		    right: 34rpx;
		}
		.list{
			width: 679rpx;
			height: 285rpx;
			color: #000;
			font-size: 20rpx;
			margin-left: 36rpx;
			margin-top: 40rpx;
			.clear {
				clear: both;
			}
			.label {
				width: 86rpx;
				height: 36rpx;
				line-height: 36rpx;
				text-align: center;
				background: rgba(0,0,0,0.1);
				font-size: 20rpx;
				float: right;
				margin-top: 10rpx;
				margin-right: 70rpx;
			}
			.left {
				float: right;
				margin-top: 20rpx;
			}
			.right{
				width: 373rpx;
				height: 226rpx;
				padding: 0 30rpx;
				background: #fff;
				float: left;
			}
			.name {
				font-weight: 900;
				font-size: 34rpx;
				margin-top: 63rpx;
			}
			.clock,.year {
				float: left;
				margin-top: 6rpx;
			}
			.clock {
				margin-top: 18rpx;
				color: #7f7f7f;
			}
			.car {
				float: left;
			}
			.year {
				margin-left: 6rpx;
				margin-top: 12rpx;
				color: #7f7f7f;
			}
			.distance {
				margin-left: 6rpx;
				color: #7f7f7f;
				float: left;
			}
			.box {
				width: 679rpx;
				height: 59rpx;
				background: linear-gradient(115deg, $bg-grad-FCD, $bg-grad-FE);
				padding: 0 0 0 18rpx;
				color: #fff;
				view {
					font-size: 20rpx;
					float: left;
				}
				view text {
					font-size: 36rpx;
					font-weight: 900;
					margin-right: 19rpx;
				}
				.case {
					padding: 6rpx 14rpx;
					border-radius: 10rpx;
					background: #fff;
					font-weight: 900;
					color: #FF6501;
					margin-top: 8rpx;
					float: right;
					margin-right: 10rpx;
				}
			}
		}
	}
</style>


