module.exports = {
	// 配置路径别名
	configureWebpack: {
		devServer: {
			disableHostCheck: true,
			    // host:'http://192.168.3.18',
			　　port : 8080, //端口号
			　　proxy : {
			       "/user" : {
			　　　　 "target" : "http://192.168.3.5:9007", //目标接口域名
			　　　　 "changeOrigin" : true, //是否跨域
			　　　　  "secure" : false // 设置支持https协议的代理
			　　　　 },
				   "/captchaImage" : {
			　　　　 "target" : "http://192.168.3.5:9007", 
			　　　　 "changeOrigin" : true, 
			　　　　  "secure" : false 
			　　　　 },
			     "/system" : {
			　　　　 "target" : "http://192.168.3.5:9007", 
			　　　　 "changeOrigin" : true, 
			　　　　  "secure" : false 
			　　　　 },
			　　　　}
			　　}
		}
}
