<template>
	<view>
		<u-navbar back-text="返回"  back-icon-size="0" title="司机注册协议" :background="backgroundDri" :back-text-style="backTextStyle" 
		 title-color="#FFFFFF"></u-navbar>
		<view style="padding: 10pt 20pt;">
			 Aliquam vitae felis a massa ultrices tincidunt. Aliquam aliquam iaculis risus sed maximus. Suspendisse pretium lorem turpis, eu imperdiet enim efficitur sit amet. Mauris aliquam tellus mauris, lobortis tincidunt purus porta ac. Mauris nec tellus in elit interdum tempus. Nullam pellentesque aliquam purus, vitae dignissim neque tincidunt ut. Aliquam id cursus libero.
			Aliquam vitae felis a massa ultrices tincidunt. Aliquam aliquam iaculis risus sed maximus. Suspendisse pretium lorem turpis, eu imperdiet enim efficitur sit amet. Mauris aliquam tellus mauris, lobortis tincidunt purus porta ac. Mauris nec tellus in elit interdum tempus. Nullam pellentesque aliquam purus, vitae dignissim neque tincidunt ut. Aliquam id cursus libero.
			Aliquam vitae felis a massa ultrices tincidunt. Aliquam aliquam iaculis risus sed maximus. Suspendisse pretium lorem turpis, eu imperdiet enim efficitur sit amet. Mauris aliquam tellus mauris, lobortis tincidunt purus porta ac. Mauris nec tellus in elit interdum tempus. Nullam pellentesque aliquam purus, vitae dignissim neque tincidunt ut. Aliquam id cursus libero.
			Aliquam vitae felis a massa ultrices tincidunt. Aliquam aliquam iaculis risus sed maximus. Suspendisse pretium lorem turpis, eu imperdiet enim efficitur sit amet. Mauris aliquam tellus mauris, lobortis tincidunt purus porta ac. Mauris nec tellus in elit interdum tempus. Nullam pellentesque aliquam purus, vitae dignissim neque tincidunt ut. Aliquam id cursus libero.
			Aliquam vitae felis a massa ultrices tincidunt. Aliquam aliquam iaculis risus sed maximus. Suspendisse pretium lorem turpis, eu imperdiet enim efficitur sit amet. Mauris aliquam tellus mauris, lobortis tincidunt purus porta ac. Mauris nec tellus in elit interdum tempus. Nullam pellentesque aliquam purus, vitae dignissim neque tincidunt ut. Aliquam id cursus libero.
			Aliquam vitae felis a massa ultrices tincidunt. Aliquam aliquam iaculis risus sed maximus. Suspendisse pretium lorem turpis, eu imperdiet enim efficitur sit amet. Mauris aliquam tellus mauris, lobortis tincidunt purus porta ac. Mauris nec 
		</view>
		<view style="text-align: center; padding: 2pt 20pt;">
			<u-row gutter="16">
						<u-col span="6">
							<u-button type="success"  shape='circle' class="btn-refuse" @click="toPage">拒绝</u-button>
						</u-col>
						<u-col span="6">
							<u-button type="success" shape='circle' class="btn-orange" @click="toNext">同意</u-button>
						</u-col>
					</u-row>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				backTextStyle:{
					'color':'#ffffff'
				},
			}
		},
		methods: {
			toPage(){
				this.$u.route({url:'/pages/mycenter/mycenter',type:'switchTab'})
			},
			toNext(){
				this.$u.route("/pages/driver/drivingLicense/drivingLicense")
			}
		}
	}
</script>

<style lang="scss" scoped>
	.btn-refuse{
		background: #C0C4CC;
	}
	 .btn-orange{
		background: linear-gradient(55deg, $bg-grad-FE, $bg-grad-FCD);
	 }
</style>
