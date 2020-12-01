<template>
	<view>
		<u-cell-group>
			<u-cell-item  title="教你搞定注册教程" value="" :title-style="titleStyle" @click="toPage"></u-cell-item>
			<u-cell-item  title="车辆转卖教程" :title-style="titleStyle" @click="toPage"></u-cell-item>
			<u-cell-item  title="求职信息教程" value="" :title-style="titleStyle" @click="toPage"></u-cell-item>
			<u-cell-item  title="司机招募教程" value="" :title-style="titleStyle" @click="toPage"></u-cell-item>
			<u-cell-item  title="车辆租赁教程" value="" :title-style="titleStyle" @click="toPage"></u-cell-item>
		</u-cell-group>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				titleStyle:{'fontSize': '12pt','padding-left':'5pt','color':'#000000'},
			}
		},
		methods: {
			
		}
	}
</script>

<style>

</style>
