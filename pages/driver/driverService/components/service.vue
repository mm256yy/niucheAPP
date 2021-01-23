<template>
	<!-- 司机服务页面组件 -->
	<view class="driverBox">
		<!-- 行业动态 -->
		<view class="" v-if="index == 0">
			<view class="driverBox_1" v-for="(item, index) in driveList" :key="index" @click="toInvite(item.uuid)">
				<view class="img_1">
					<image :src="item.titlePhoto" mode="" style="max-width: 100%;max-height: 100%;"></image>
				</view>
				<view class="driverText">
					<view class="driverText_1">{{item.title}}</view>
					<view class="driverText_2">
						<view class="">{{item.lookNum}}人浏览</view>
						<view class="">
							{{ item.creaTime }}
						</view>
					</view>
				</view>
			</view>
		</view>
		<!-- 活动大全 -->
		<view class="" v-if="index == 1">
			<view class="driverBox_2" v-for="(item, index) in activList" :key="index" @click="toInvite(item.uuid)">
				<view class="activity_text">{{item.title}}</view>
				<view class="activity_img">
					<u-image :src="item.titlePhoto" height="314rpx"></u-image>
				</view>
				<view class="source_text">
					<text>{{item.platform}}</text>
				</view>
			</view>
		</view>
		<!-- 接单分享 -->
		<view class="" v-if="index == 2">
			<view class="driverBox_1" v-for="(item, index) in orderList" :key="index" @click="toInvite(item.uuid)">
				<view class="img_1">
					<u-image :src="item.titlePhoto" height="160rpx"></u-image>
				</view>
				<view class="driverText">
					<view class="driverText_1"> {{item.title}} </view>
					<view class="driverText_2">
						<view class=""> {{item.lookNum}} 人浏览</view>
						<view class=""> {{ item.creaTime }} </view>
					</view>
				</view>
			</view>
		</view>
		<!-- 大神分享 -->
		<view v-if="index == 3">
			<view class="driverBox_4" v-for="(item, index) in shareList" :key="index">
				<view class="share-head">
					<view class="driver_to">
						<view class="to_img">
							<u-image :src="item.driverIcon" height="96rpx"></u-image>
						</view>
						<view class=""> {{item.driverName}} </view>
					</view>
					<view class="share_time"> {{ item.creaTime }} </view>
				</view>
				<view class="">
					<view class="content_title"> {{item.title}} </view>
					<view class="content_text"> {{item.text}} </view>
					<view class="contentImg">
						<view class="" v-for="(items, indexs) in item.imgs" :key="indexs">
							<view class="content_img">
								<image @click="showImage(item.imgs, indexs)" v-if="item.imgs.length != 1" :src="items" style="width: 220rpx;height: 220rpx;"></image>
								<image @click="showImage(item.imgs, indexs)" v-if="item.imgs.length == 1" :src="items" style="width: 464rpx; height: 344rpx;"></image>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<previewImage ref="previewImage" :imgs="img" :saveBtn="false" :rotateBtn="false"></previewImage>
	</view>
</template>
<script>
	import previewImage from '@/components/kxj-previewImage/kxj-previewImage.vue';
	export default {
		components: {
			previewImage
		},
		props: {
			// 司机tab切换 index
			index: {
				type: Number,
				default: () => {
					return ''
				}
			},
			driveList: { // 接收行业动态数据
				type: Array,
				default: () => {
					return []
				}
			},
			activList: { // 活动数据
				type: Array,
				default: () => {
					return []
				}
			},

			orderList: { // 接单数据
				type: Array,
				default: () => {
					return []
				}
			},
			shareList: { // 大神数据
				type: Array,
				default: () => {
					return []
				}
			},
		},
		data() {
			return {
				driverPub: {},
				times: '',
				creaTime: '',
				img: [],
			}
		},
		onLoad() {

		},
		watch: {
			shareList: function() {
				this.shareList.forEach((item) => {
					if (item.photoUrls) {
						item.imgs = item.photoUrls.split(',')
						this.ureTime(item)
						item.leng = item.imgs.length
					}
					if (item.leng == 2 || item.leng == 5 || item.leng == 8) {
						item.imgs.push('')
					}
				})
			},
			driveList: function() {
				this.driveList.forEach((item) => {
					this.ureTime(item)
				})
			},
			orderList: function() {
				this.orderList.forEach((item) => {
					this.ureTime(item)
				})
			}
		},
		methods: {
			toInvite(id) {
				this.$emit("neiClick", id)
			},
			showImage(arr, index) {
				this.img = arr.slice() // 利用浅拷贝 互不影响
				this.img.forEach((item, indexs) => {
					if (item == '') {
						this.img.splice(indexs, 1)
					} else {
						this.img
					}
				})
				this.$nextTick(function(){
					this.$refs.previewImage.open(index)
				})
				
			},
			ureTime(item) {
				this.times = item.createTime.substring(0, 10)
				item.time = this.times.split('-')
				item.creaTime = item.time[0] + '年' + item.time[1] + '月' + item.time[2] + '日'
			}
		}
	}
</script>

<style lang="scss" scoped>
	.driverBox {
		background-color: #FFFFFF;
		font-size: 32rpx;
		color: #111111;
		padding: 0 28rpx;

		// margin-top: 100rpx;
		// 行业动态
		.driverBox_1 {
			height: 216rpx;
			border-bottom: 2rpx solid #E0E0E0;
			padding: 28rpx 0;
			display: flex;

			.img_1 {
				width: 212rpx;
				height: 160rpx;
				border-radius: 8rpx;
				overflow: hidden;
			}

			.driverText {
				width: 456rpx;
				margin-left: 24rpx;
				display: flex;
				flex-direction: column;
				justify-content: space-between;

				// 溢出盒子小圆点显示
				.driverText_1 {
					display: -webkit-box;
					-webkit-box-orient: vertical;
					-webkit-line-clamp: 2;
					overflow: hidden;
				}

				.driverText_2 {
					font-size: 28rpx;
					color: #666666;
					display: flex;
					justify-content: space-between;
				}
			}

		}

		// 活动大全
		.driverBox_2 {
			height: 466rpx;
			padding: 24rpx 0;
			border-bottom: 2rpx solid #E0E0E0;
			display: flex;
			flex-direction: column;
			justify-content: space-between;

			.activity_text {
				font-size: 36rpx;
				// margin: 0 auto;
				overflow: hidden;
				text-overflow: ellipsis;
				white-space: nowrap;

			}

			.activity_img {
				height: 314rpx;
				border-radius: 12rpx;
				overflow: hidden;
			}

			.source_text {
				font-size: 28rpx;
				color: #666666;
				text-align: right;
			}
		}

		// 大神分享
		.driverBox_4 {
			font-size: 32rpx;
			color: #111111;
			padding: 28rpx 0;
			border-bottom: 2rpx solid #E0E0E0;

			.share-head {
				height: 96rpx;
				display: flex;
				margin-bottom: 20rpx;
				justify-content: space-between;
				align-items: center;

				.driver_to {
					display: flex;
					align-items: center;

					.to_img {
						width: 96rpx;
						height: 96rpx;
						margin-right: 20rpx;
						border-radius: 48rpx;
						overflow: hidden;
					}
				}

				.share_time {
					font-size: 24rpx;
					color: #666666;
				}
			}

			.content_title {
				width: 100%;
				font-size: 36rpx;
				font-weight: 700;
				display: flex;
				flex-wrap: wrap;
			}

			.content_text {
				width: 100%;
				font-size: 32rpx;
				color: #5E5E5E;
				margin: 4rpx 0 8rpx 0;
				display: flex;
				flex-wrap: wrap;
			}

			.contentImg {
				display: flex;
				margin-bottom: 20rpx;
				justify-content: space-between;
				flex-wrap: wrap;

				.content_img image {
					border-radius: 8rpx;
					overflow: hidden;
				}
			}
		}
	}
</style>
