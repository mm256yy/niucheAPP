<template>
	<view>
		<Driver v-if='curThemeType ==="driver"' ref="driver"></Driver>
		<Company ref="driver" v-else></Company>
		<OneTips ref="onetips"></OneTips>
		<u-popup v-model="show" mode="center" border-radius="14" :mask-close-able='false' z-index="10075" :closeable='true'>
			<view style="width: 580rpx;">
				<u-image height="780rpx" mode="widthFix" :src="data.photo"></u-image>
			</view>
		</u-popup>
	</view>
</template>

<script>
	import OneTips from '../../components/oneTips.vue'
	import Company from './company/company.vue'
	import Driver from './driver/driver.vue'
	// import PopConfig from '../../components/popupConfig.vue'
	import {
		dirverPages,
		companyPages
	} from '@/utils/tabbar.js'
	export default {
		components: {
			Company,
			Driver,
			OneTips
		},
		data() {
			return {
				upOption: {},
				downOption: {},
				show: false,
				data: {},
			}
		},
		onShow() {
			let type = uni.getStorageSync('curThemeType');
			this.init()
			if (type === 'company') {
				companyPages.forEach(item => {
					uni.setTabBarItem(item)
				})
				uni.setTabBarStyle({
					selectedColor: '#41B36D',
				})
			} else {
				dirverPages.forEach(item => {
					uni.setTabBarItem(item)
				})
				uni.setTabBarStyle({
					selectedColor: '#FE9217',
				})
			}
			if (this.$refs.driver != undefined) {
				this.$refs.driver.getList()
			}
		},
		onHide() {
			this.show = false
		},
		methods: {
			tipsConfirm() {
				let role = uni.getStorageSync('role');
				if (role === 2) {
					this.$u.route('/pages/company/identityAuth/identityAuth')
				} else {
					this.$u.route('/pages/driver/drivingLicense/drivingLicense')
				}
			},
			init() {
				let token = uni.getStorageSync('token');
				let curThemeType = uni.getStorageSync('curThemeType');
				let type = 'VISITOR'
				if (token) {
					if (curThemeType === 'driver') {
						type = 'DRIVER'
					} else {
						type = 'COMPANY'
					}
					this.popupShow(type)
				} else {
					let flag = uni.getStorageSync('popupFlag');
					if (flag === "") {
						this.popupShow(type)
					}
				}
			},
			popupShow(type) {
				this.$u.api.popupConfig({
					function: 'popup',
					type: type
				}).then(res => {
					if (res.code === 200) {
						let data = res.object;
						if (data && data.length > 0) {
							let param = "";
							if (type === 'DRIVER') {
								param = "popup_dirverPhoto";
							} else if (type === "COMPANY") {
								param = "popup_companyPhoto";
							} else {
								
								uni.setStorageSync('popupFlag', 100)
								param = "popup_visitorPhoto"
							}
							data.forEach(item => {
								console.log(item)
								if (item.param === "popup_isopen") {
									if (item.result === 'open') {
										this.show = true
									} else {
										this.show = false
									}
								}
								if (item.param == param) {
									this.data = JSON.parse(item.result)
								}
							})
						} else {
							this.show = false
						}
					} else {
						this.$u.toast(res.msg);
					}
				})
			},
		}

	};
</script>
<style lang="scss">
	page {
		background-color: #F5F5F8;
	}
</style>
