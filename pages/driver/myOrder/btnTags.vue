<template>
	<view class="driver-content">
		<text :class="['common_text',index==active?'checked_text':'']" v-for="(item,index) in list" :key="item.id" @click="onClick(index, item.text)">{{item.text}}</text>
	</view>
</template>

<script>
	/**
	 * 
	 * @property {Number} active 选中的下标
	 * @property {Array} list 标签列表
	 * @property {Number} forIndex 唯一标识
	 * @property {Number} color = '#333' 默认颜色
	 *
	 * @event {Function()} onClick 改变标签触发
	 */
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
			},
			listName:{
				type: String,
				default: ''
			}
		},
		data() {
			return {

			};
		},
		methods: {
			onClick(index, item) {
				this.$emit('onClick', {value:index,text:item,index:this.forIndex,listName:this.listName});
			},
		}
	}
</script>

<style lang="scss" scoped>
	.common_text {
		min-width: 140rpx;
		padding: 4rpx 16rpx;
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
