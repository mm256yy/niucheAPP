<template>
	<view>
			<web-view
			  :src="srcUrl"
			  @message="reciveMessage"
			  @onPostMessage="recivePostMessage"
			>
			</web-view>
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
				// // #ifdef APP-PLUS
				// var wv;
		  //       var currentWebview = this.$scope.$getAppWebview() 
		  //       setTimeout(function() {
		  //           wv = currentWebview.children()[0]
		  //           wv.setStyle({top:50})
		  //       }, 1000); //如果是页面初始化调用时，需要延时一下
		  //       // #endif
		},
		methods: {
			reciveMessage(data){
				console.log(1111)
			},
			recivePostMessage(data){
				this.$u.route('/pages/driver/myOrder/orderView', {
						id: this.id
					})
			},
			getUrl(){
				this.$u.api.getFdd({orderId: this.id,userId:this.userId}).then(res=>{
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
