import {mapGetters} from 'vuex'

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
		   onShow () {
			   
		   },
          computed:{
          	...mapGetters(['curThemeType'])
          },
          methods:{
 
          }
       })
   }
}
