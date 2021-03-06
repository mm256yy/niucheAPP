<template>
	<view>
		<u-navbar back-icon-color="#111111" title="" :background="background" title-color="#111111"></u-navbar>
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
				userid:'',
				srcUrl:'',
			}
		},
		onLoad(option) {
			let id = option.id;
			let userid = option.userid;
			if (id) {
				this.id = id;
			}
			if (userid) {
				this.userid = userid;
			}
		},
		mounted() {
			this.getUrl()
				// #ifdef APP-PLUS
				var wv;
		        var currentWebview = this.$scope.$getAppWebview() 
		        setTimeout(function() {
		            wv = currentWebview.children()[0]
		            wv.setStyle({top:50})
		        }, 1000); //如果是页面初始化调用时，需要延时一下
		        // #endif
		},
		methods: {
			reciveMessage(data){
				console.log(1111)
			},
			recivePostMessage(data){
				this.$u.route('/pages/company/order/orderDetail', {
						id: this.id
					})
			},
			getUrl(){
				this.$u.api.getFdd({orderId: this.id,userId:this.userid}).then(res=>{
					 if (res.code === 200){
						 this.srcUrl = 'http://dev-redircet.neocab.cn/url/?od=122771272445857792&id=122039149376180224'
					 }
				})
			}
		}
	}
</script>

<style lang="scss" scoped>

</style>
