<template>
	<view>
		<u-navbar back-icon-color="#111111" title="账单明细" :background="background" title-color="#111111">
			<view class="navbar-right" slot="right">
				<view class="right-item" @click="showSelect">
					<text>{{selectText}}</text>
					<u-icon :name="selectFlag?'arrow-up':'arrow-down'"></u-icon>
				</view>
			</view>
		</u-navbar>
		<view>
			<chunLei-popups v-model="selectFlag" :popData="popData" @tapPopup="tapPopup" :x="345" :y="60" placement="top-end"></chunLei-popups>
		</view>
		<view class="list_content">
			
		</view>
	</view>
</template>

<script>
	import chunLeiPopups from "@/components/chunLei-popups/chunLei-popups.vue";
	export default {
		components:{chunLeiPopups},
		data() {
			return {
				background: {
					'background-image': 'linear-gradient(to bottom, #000000 39%,#ffffff 0%)'
				},
				selectText:'全部',
				popData:[{title:'全部',value:0},{title:'收入',value:1},{title:'支出',value:2}],
				selectFlag:false,
			}
		},
		methods: {
			showSelect(){
				this.selectFlag = true;
			},
			tapPopup(option){
				this.selectText = option.title;
				console.log(option.value)
			}
		}
	}
</script>

<style lang="scss">
	.navbar-right {
		margin-right: 24rpx;
		display: flex;
	}

	.right-item {
		margin: 0 12rpx;
		position: relative;
		// color: #ffffff;
		display: flex;
	}

</style>
