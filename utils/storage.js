export const GetStorage =function(key){
	uni.getStorage({
	    key: key,
	    success: function (res) {
	       return res.data
	    }
	});
}