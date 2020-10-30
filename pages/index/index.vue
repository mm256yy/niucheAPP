<template>
	<view>
		<Driver v-if='curThemeType ==="driver"'></Driver>
		<Company ref="companys" v-else></Company>
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
		
	}
			
};
</script>

