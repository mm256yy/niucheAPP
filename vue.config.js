
const target = {
// 　　　　 "target" : "http://68.79.57.1:9007",//
         "target" : "http://192.168.3.5:9007", //本地
　　　　 "changeOrigin" : true, 
　　　　  "secure" : false 
　}
module.exports = {
	// 配置路径别名
	configureWebpack: {
		devServer: {
			disableHostCheck: true,
			    // host:'http://192.168.3.18',
			　　port : 8080, //端口号
			　　proxy : {
			       "/user" : target,
				   "/captchaImage" : target,
			       "/system" : target,
			　　　　}
			　　}
		}
}


