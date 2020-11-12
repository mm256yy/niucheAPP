<template>
	<view>
		<u-navbar back-text="返回"  back-icon-size="0" title="注册协议" :background="curThemeType ==='driver'?backgroundDri:backgroundCom" :back-text-style="backTextStyle" height='44' title-color="#FFFFFF"></u-navbar>
		<view style="padding: 8pt;">
		<scroll-view scroll-y style="height: 100%;width: 100%;">
			 Aliquam vitae felis a massa ultrices tincidunt. Aliquam aliquam iaculis risus sed maximus. 
			 Suspendisse pretium lorem turpis, eu imperdiet enim efficitur sit amet. Mauris aliquam tellus mauris, lobortis tincidunt purus porta ac. Mauris nec tellus in elit interdum tempus. Nullam pellentesque aliquam purus, vitae dignissim neque tincidunt ut. Aliquam id cursus libero.
			Aliquam vitae felis a massa ultrices tincidunt. Aliquam aliquam iaculis risus sed maximus. Suspendisse pretium lorem turpis, 
			eu imperdiet enim efficitur sit amet. Mauris aliquam tellus mauris, lobortis tincidunt purus porta ac. Mauris nec tellus in elit
			 interdum tempus. Nullam pellentesque aliquam purus, vitae dignissim neque tincidunt ut. Aliquam id cursus libero.
			Aliquam vitae felis a massa ultrices tincidunt. Aliquam aliquam iaculis risus sed maximus. Suspendisse pretium lorem turpis,
			 eu imperdiet enim efficitur sit amet. Mauris aliquam tellus mauris, lobortis tincidunt purus porta ac. Mauris nec tellus in elit interdum tempus. Nullam pellentesque aliquam purus, vitae dignissim neque tincidunt ut. Aliquam id cursus libero.
			Aliquam vitae felis a massa ultrices tincidunt. Aliquam aliquam iaculis risus sed maximus. Suspendisse pretium lorem turpis,
			 eu imperdiet enim efficitur sit amet. Mauris aliquam tellus mauris, lobortis tincidunt purus porta ac. Mauris nec tellus in elit interdum tempus. Nullam pellentesque aliquam purus, vitae dignissim neque tincidunt ut. Aliquam id cursus libero.
			Aliquam vitae felis a massa ultrices tincidunt. Aliquam aliquam iaculis risus sed maximus. Suspendisse pretium lorem turpis,
			 eu imperdiet enim efficitur sit amet. Mauris aliquam tellus mauris, lobortis tincidunt purus porta ac. Mauris nec tellus in elit
			  interdum tempus. Nullam pellentesque aliquam purus, vitae dignissim neque tincidunt ut. Aliquam id cursus libero.
			Aliquam vitae felis a massa ultrices tincidunt. Aliquam aliquam iaculis risus sed maximus. Suspendisse pretium lorem turpis, eu imperdiet enim efficitur sit amet. Mauris aliquam tellus mauris, lobortis tincidunt purus porta ac. Mauris nec 
		</scroll-view>
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
			
		}
	}
</script>

<style lang="scss" scoped>
	.btn-refuse{
		background: #C0C4CC;
	}
	 .btn-agree{
		background: linear-gradient(55deg, $bg-grad-AB, $bg-grad-DDC);
	 }
</style>
