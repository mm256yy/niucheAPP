const target = {
// 　　　　 "target" : "http://161.189.168.218:9007",//
		 "target" : "http://192.168.3.41:9007", //本地
　　　　 "changeOrigin" : true, 
　　　　  "secure" : false 
　}
module.exports = {
	// 配置路径别名
	configureWebpack: {
		devServer: {
			disableHostCheck: true,
			　　port : 8080, //端口号
			　　proxy : {
			       "/user" : target,
				   "/captchaImage" : target,
			       "/system" : target,
				    "/sys" : target,
					"/app":target,
					"/BillingdetailsController":target,
					
			　　　　}
			　　}
		}
}


