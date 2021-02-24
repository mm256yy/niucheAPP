import {
	mapGetters
} from 'vuex'

export default {
	install(Vue) {
		Vue.mixin({
			data() {
				return {
					backgroundDri: {
						'background-image': 'linear-gradient(55deg, #FE9217, #FCD03C)'
					},
					backgroundCom: {
						'background-image': 'linear-gradient(55deg, #37AB63, #6DD99C)'
						// 'background-image': 'linear-gradient(55deg, #37AB63, #34b98b)'
					},
					background: {
						'background-image': 'linear-gradient(to bottom, #000000 39%,#ffffff 0%)'
					},
					curThemeType: ''
				}
			},
			onLoad() {
				let type = uni.getStorageSync('curThemeType');
				this.curThemeType = type
			},
			onShow() {
				let type = uni.getStorageSync('curThemeType');
				this.curThemeType = type
			},
		})
	}
}
