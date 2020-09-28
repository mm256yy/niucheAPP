module.exports = {
	// 配置路径别名
	configureWebpack: {
		devServer: {
			disableHostCheck: true,
			　　port : 8080, //端口号
			　　proxy : {
			// 　　　　"/dev-api" : {
			// 　　　　"target" : "192.168.3.5:9007", //目标接口域名
			// 　　　　"changeOrigin" : true, //是否跨域
			// 　　　　"secure" : false // 设置支持https协议的代理
			// 　　　　 },
			       "/user" : {
			　　　　 "target" : "http://192.168.3.5:9007", //目标接口域名
			　　　　 "changeOrigin" : true, //是否跨域
			　　　　  "secure" : false // 设置支持https协议的代理
			　　　　 },
				   "/captchaImage" : {
			　　　　 "target" : "http://192.168.3.5:9007", //目标接口域名
			　　　　 "changeOrigin" : true, //是否跨域
			　　　　  "secure" : false // 设置支持https协议的代理
			　　　　 },
			　　　　}
			　　}
		}
}
