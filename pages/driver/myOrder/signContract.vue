<template>
	<view>
		<u-navbar back-icon-color="#111111" title="" :background="background" title-color="#111111"></u-navbar>
		<view>
			<!-- <web-view :src="src" @message="upCallback()"></web-view> -->
			<web-view
			  v-if="srcUrl"
			  :src="srcUrl"
			  @message="reciveMessage"
			  @onPostMessage="recivePostMessage"
			>
			</web-view>
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
				src:'http://dev-redircet.neocab.cn/url/?od=122385198464765952&id=122039149376180224'
			}
		},
		mounted() {
			
		},
		methods: {
			reciveMessage(data){
				console.log(1111)
			},
			recivePostMessage(data){
				console.log(data)
			}
		}
	}
</script>

<style lang="scss" scoped>

</style>
