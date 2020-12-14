<template>
	<view>
		<u-popup v-model="show" mode="center" border-radius="14" :mask-close-able='false' z-index="10075" :closeable='true'>
			<view style="width: 190pt;">
				<u-image height="260pt" mode="widthFix" :src="data.photo"></u-image>
			</view>
		</u-popup>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				show: false,
				data: {},

			};
		},
		mounted() {
			// this.show = false;
			// this.init()
		},
		methods: {
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
					if (!flag) {
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
						if (data && data.length>0) {
							let param = "";
							if (type === 'DRIVER') {
								param = "popup_dirverPhoto";
							} else if (type === "COMPANY") {
								param = "popup_companyPhoto";
							} else {
								uni.setStorageSync('popupFlag', true)
								param = "popup_visitorPhoto"
							}
							data.forEach(item => {
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
			}
		}
	}
</script>

<style>

</style>
