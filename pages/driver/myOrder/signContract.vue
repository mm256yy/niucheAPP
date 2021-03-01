<template>
	<view>
		<u-navbar back-icon-color="#111111" title="签署合同" :background="background" title-color="#111111"></u-navbar>
		<view>
			<web-view :src="src"></web-view>
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
				src:''
			}
		},
		onLoad(option) {
			this.src = option.src;
		},
		methods: {
			
		}
	}
</script>

<style>

</style>
