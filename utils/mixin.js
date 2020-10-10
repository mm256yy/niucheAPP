import {mapGetters,mapMutations} from 'vuex'
// export let themeMixin = {
// 	computed:{
// 		...mapGetters(['curThemeType'])
// 	},
// 	methods:{
// 		...mapMutations([
// 			'SET_THEME_TYPE'
// 		])
// 	}
// }
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

			 }
           },
          computed:{
          	...mapGetters(['curThemeType'])
          },
          methods:{
          	...mapMutations([
          		'SET_THEME_TYPE'
          	])
          }
       })
   }
}
