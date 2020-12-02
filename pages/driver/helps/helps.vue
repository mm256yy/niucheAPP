<template>
	<view>
		<u-navbar back-text="返回" back-icon-size="0" title="帮助列表" :background="backgroundDri"
		 :back-text-style="backTextStyle" height='44' title-color="#FFFFFF"></u-navbar>
		<u-cell-group>
			<u-cell-item  title="教你搞定注册教程" value="" :title-style="titleStyle" @click="toPage(1)"></u-cell-item>
			<u-cell-item  title="发布求租教程" value="" :title-style="titleStyle" @click="toPage(2)"></u-cell-item>
			<u-cell-item  title="发布求职教程" value="" :title-style="titleStyle" @click="toPage(3)"></u-cell-item>
		</u-cell-group>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				titleStyle:{'fontSize': '12pt','padding-left':'5pt','color':'#000000'},
				backTextStyle:{
					'color':'#ffffff'
				},
			}
		},
		methods: {
			toPage(flag){
				if (flag === 1){
					this.$u.route('/pages/driver/helps/one')
				} else if (flag === 2 ){
					this.$u.route('/pages/driver/helps/two')
				}else if (flag === 3 ){
					this.$u.route('/pages/driver/helps/three')
				}else {}
			}
		}
	}
</script>

<style>

</style>
