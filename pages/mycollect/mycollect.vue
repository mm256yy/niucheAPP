<template>
	<view> 
		<CollectDriver v-if='curThemeType ==="driver"'></CollectDriver>
		<CollectCompany ></CollectCompany>
		<NotLogin></NotLogin>
	</view>
</template>

<script>
import 	CollectCompany from './company/company.vue'
import 	CollectDriver from './driver/driver.vue'
import NotLogin from '@/components/notlogin/notlogin.vue'
export default {
	components:{
		CollectCompany,CollectDriver,NotLogin
	},
	data() {
		return {

		}
	},

}
</script>


<style lang="scss" scoped>



	
</style>
