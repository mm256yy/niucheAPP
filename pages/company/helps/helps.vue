<template>
	<view>
		<u-navbar back-text="返回" back-icon-size="0" title="帮助列表" :background="backgroundCom"
		 :back-text-style="backTextStyle" height='44' title-color="#FFFFFF"></u-navbar>
		<u-cell-group>
			<u-cell-item  title="教你搞定注册教程" value="" :title-style="titleStyle" @click="toPage(1)"></u-cell-item>
			<u-cell-item  title="车辆租赁教程" value="" :title-style="titleStyle" @click="toPage(5)"></u-cell-item>
			<u-cell-item  title="人员招募教程" value="" :title-style="titleStyle" @click="toPage(3)"></u-cell-item>
			<u-cell-item  title="车辆转卖教程" value="" :title-style="titleStyle" @click="toPage(2)"></u-cell-item>
			<u-cell-item  title="求购信息教程" value="" :title-style="titleStyle" @click="toPage(4)"></u-cell-item>
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
					this.$u.route('/pages/company/helps/one')
				} else if (flag === 2 ){
					this.$u.route('/pages/company/helps/two')
				}else if (flag === 3 ){
					this.$u.route('/pages/company/helps/three')
				}else if (flag === 4 ){
					this.$u.route('/pages/company/helps/four')
				}else if (flag === 5 ){
					this.$u.route('/pages/company/helps/five')
				}else {}
			}
		}
	}
</script>

<style>

</style>
