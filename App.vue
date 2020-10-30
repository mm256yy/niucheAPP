<script>
		import {dirverPages,companyPages} from '@/utils/tabbar.js'
	export default {
		onLaunch: function() {
			console.log('App Launch')
			uni.onTabBarMidButtonTap(function(e){
				console.log(e)
				// uni.chooseImage({
				//     success: (chooseImageRes) => {
				//         const tempFilePaths = chooseImageRes.tempFilePaths;
				// 		console.log(tempFilePaths)
				// 		let token = uni.getStorageSync('token')
				// 		 const uploadTask =  uni.uploadFile({
				// 		           url: 'http://192.168.3.5:9007/user/image/BusinessImagedemo', //仅为示例，非真实的接口地址
				// 		            filePath: tempFilePaths[0],
				// 		            name: 'file',
				// 		            formData: {
				// 		                'phone': '17667678787'
				// 		            },
				// 					header: {
				// 					        'content-type': 'multipart/form-data',
				// 							// 'Authorization':token
				// 					    },
				// 		            success: (uploadFileRes) => {
				// 		                console.log(uploadFileRes.data);
				// 		            },
				// 					    fail: (err) => {
				// 					        console.log(err)
				// 					    }
				// 		        });
				// 			        uploadTask.onProgressUpdate((res) => {
				// 			            console.log('上传进度' + res.progress);
				// 			            console.log('已经上传的数据长度' + res.totalBytesSent);
				// 			            console.log('预期需要上传的数据总长度' + res.totalBytesExpectedToSend);
							
				// 			            // 测试条件，取消上传任务。
				// 			            // if (res.progress > 50) {
				// 			            //     uploadTask.abort();
				// 			            // }
				// 			        });
				// 		}
				// })
				uni.navigateTo({
				    url: '/pages/company/release/release'
				});
				// uni.getStorage({
				//     key: 'role',
				//     success: function (res) {
				//         console.log(res.data);
				// 		uni.navigateTo({
				// 		    url: '/pages/company/release/release'
				// 		});
				//     }
				// })

			})
		},
		onShow() {
			let type = uni.getStorageSync('curThemeType');
			if (type === 'company'){
				companyPages.forEach(item=>{
					uni.setTabBarItem(item)
				})
				uni.setTabBarStyle({
				  selectedColor: '#41B36D',
				})
			} else {
				dirverPages.forEach(item=>{
					uni.setTabBarItem(item)
				})
				uni.setTabBarStyle({
				  selectedColor: '#FE9217',
				})
			}
		},
		onHide: function() {
			console.log('App Hide')
		},
	}
</script>

<style lang="scss">
	@import "uview-ui/index.scss";
	// .uni-page-head{
	// 	background: linear-gradient(55deg, $bg-grad-FE, $bg-grad-FCD);
	// }
</style>

