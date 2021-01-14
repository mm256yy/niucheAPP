<template>
	<view :class="curThemeType ==='driver'?'driver-content':'company-content'">
		<text :class='{checked_text:index==active,common_text:true}' v-for="(item,index) in list" :key="item.value" @click="onClick(index, $event)">{{item.label}}</text>
	</view>
</template>

<script>
	export default {
		props: {
			list: {
				type: Array,
				required: true,
				default: () => []
			},
			// 选中默认index
			active: {
				type: Number,
				default: -1
			}
		},
		data() {
			return {

			};
		},
		methods: {
			onClick(index, $event) {
				if (index !== this.active) {
					this.$emit('onClick', index);
				}
			}
		},
	}
</script>

<style lang="scss" scoped>
	.common_text {
		width: 206rpx;
		height: 76rpx;
		display: inline-block;
		text-align: center;
		line-height: 76rpx;
		margin: 32rpx 32rpx 0 0;
		font-size: 28rpx;
		border: 2rpx solid #d9dedf;
		border-radius: 8rpx;
	}

	.defult_text {
		color: #666;
		border-color: #d9dedf;
		background: #FFFFFF;
	}
.company-content{
	padding: 0 0 0 32rpx;
	position: fixed;
	top: 100rpx;
	left: 0;
	z-index: 20;
	background-color: #fff;
	padding-bottom: 40rpx;
	.checked_text {
		color: #4ABA75;
		border-color: #4ABA75;
		background: #DDFFEA;
	}
}	
.driver-content{
	padding: 0 0 0 32rpx;
	position: fixed;
	top: 100rpx;
	left: 0;
	z-index: 20;
	background-color: #fff;
	padding-bottom: 40rpx;
	.checked_text {
		color: #FF9B0F;
		border-color: #FF9B0F;
		background: #FFEBD0;
	}
}

</style>
