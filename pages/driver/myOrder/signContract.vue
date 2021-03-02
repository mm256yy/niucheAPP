<template>
	<view>
		<!-- <u-navbar back-icon-color="#111111" title="" :background="background" title-color="#111111"></u-navbar> -->
		<view>
			<web-view :src="src" @message="upCallback()"></web-view>
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
		mounted() {
			let src = "http://www.baidu.com";
			// this.src = encodeURI(src)
			// console.log(this.src)
			// this.upCallback()
		},
		methods: {
			upCallback() {
				this.$u.api.getBillDetails({
					pageNum: 1,
					pageSize: 10,
				}).then(res => {
					if (res.code === 200) {

					} else {
						this.$u.toast(res.msg);
					}
				})
			},
		}
	}
</script>

<style lang="scss" scoped>

</style>
