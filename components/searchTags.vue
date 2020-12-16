<template>
	<view v-if="singleType" :class="curThemeType ==='driver'?'driver-content':'company-content'">
		<text :class='{checked_text:index===active,common_text:true}' v-for="(item,index) in list" :key="item.id" @click="onClick(index, $event)">{{item.text}}</text>
	</view>
	<view v-else :class="curThemeType ==='driver'?'driver-content':'company-content'">
		<text :class="['common_text',item.checked ? 'checked_text':'defult_text']" v-for="(item,index) in list" :key="item.id"
		 @click="onClickAll(item)">{{item.text}}</text>
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
				default: 0
			},
			//单个true 多个false
			singleType: {
				type: Boolean,
				defult: true
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
			},
			onClickAll(item) {
				item.checked = !item.checked;
				this.$emit('onClick', item);
			}
		},
	}
</script>

<style lang="scss" scoped>
	.common_text {
		width: 156rpx;
		height: 72rpx;
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
.company-content{
	.checked_text {
		color: #4ABA75;
		border-color: #4ABA75;
		background: #DDFFEA;
	}
}	
.driver-content{
	.checked_text {
		color: #FF9B0F;
		border-color: #FF9B0F;
		background: #FFEBD0;
	}
}

</style>
