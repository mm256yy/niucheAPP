<template>
	<view>
		<Driver v-if='curThemeType ==="driver"' ref="driver"></Driver>
		<Company ref="driver" v-else></Company>
	</view>
</template>

<script>
import Company from './company/company.vue'
import Driver from './driver/driver.vue'
export default {
	components:{
		Company,Driver
	},
	data() {
		return {
	
			}
	},
	onShow() {
		if(this.$refs.driver != undefined){
			this.$refs.driver.getList()
		}
	}		
};
</script>
<style lang="scss">
page {
	background-color: #F5F5F8;
}
</style>

