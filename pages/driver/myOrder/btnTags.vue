<template>
	<view class="driver-content">
		<text :class="['common_text',index==active?'checked_text':'']" v-for="(item,index) in list" :key="item.id" @click="onClick(index, item.text)">{{item.text}}</text>
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
			active: {
				type: Number,
				default: 100
			},
			forIndex:{
				type: Number,
				default: 0
			}
		},
		data() {
			return {

			};
		},
		mounted() {
		},
		methods: {
			onClick(index, item) {
				this.$emit('onClick', {value:index,text:item,index:this.forIndex});
			},
		}
	}
</script>

<style lang="scss" scoped>
	.common_text {
		min-width: 120rpx;
		padding: 0 16rpx;
		display: inline-block;
		text-align: center;
		line-height: 68rpx;
		margin: 10pt 8pt 0 0;
		font-size: 28rpx;
		border: 2rpx solid #d9dedf;
		border-radius: 8rpx;
	}
	.defult_text {
		color: #666;
		border-color: #d9dedf;
		background: #FFFFFF;
	}
	.checked_text {
		color: #FF9B0F;
		border-color: #FF9B0F;
		background: #FFEBD0;
	}

</style>
