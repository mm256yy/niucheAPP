<template>
	<view>
		<view style="width: 100%;height: 60rpx;background: #000;"></view>
		<view>
				<web-view
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
				id:'',
				userId:'',
				srcUrl:'',
			}
		},
		onLoad(option) {
			let id = option.id;
			let userId = option.userId;
			if (id) {
				this.id = id;
			}
			if (userId) {
				this.userId = userId;
			}
		},
		mounted() {
			this.getUrl()
		},
		methods: {
			reciveMessage(data){
				console.log(1111)
			},
			recivePostMessage(data){
				
			},
			getUrl(){
				this.$u.api.getRight({userId:this.userId}).then(res=>{
					 if (res.code === 200){
						 this.srcUrl = res.object
					 } else {
						 this.$u.toast(res.msg)
					 }
				})
			}
		}
	}
</script>

<style lang="scss" scoped>

</style>
