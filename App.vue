<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
			uni.onTabBarMidButtonTap(function(e){
				console.log(e)
				uni.navigateTo({
				    url: '/pages/company/release/release'
				});
				// uni.getStorage({
				//     key: 'role',
				//     success: function (res) {
				//         console.log(res.data);
				// 		uni.navigateTo({
				// 		    url: '/pages/company/release/release'
				// 		});
				//     }
				// })

			})
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style lang="scss">
	@import "uview-ui/index.scss";
	.uni-page-head{
		background: linear-gradient(55deg, $bg-grad-FE, $bg-grad-FCD);
	}
</style>
