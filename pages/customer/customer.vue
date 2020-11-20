<template>
	<view :class="curThemeType ==='driver'?'driver-content':'company-content'">
	        <u-navbar back-text="返回" back-icon-size="0" title="客服" :background="curThemeType ==='driver'?backgroundDri:backgroundCom"
			 :back-text-style="backTextStyle" height='44' title-color="#FFFFFF">
				
			</u-navbar>
			<view>
				
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
			
		}
	}
</script>

<style>

</style>
