export const nameRule = [{ 
	required: true, 
	message: '请输入姓名', 
	trigger: ['change','blur'],
}];
 export const phoneRule = [{
	required: true, 
	message: '请输入手机号', 
	trigger: ['blur'],
},
	{
		pattern: /^1[3456789]\d{9}$/,
		// 正则检验前先将值转为字符串
		transform(value) {
			return String(value);
		},
		trigger: ['change','blur'],
		message: '手机号码格式不正确'
	},
];
export const codeRule = [{
	required: true, 
	message: '请输入验证码', 
	trigger: ['change','blur'],
}];
export const passwordRule = [{
	required: true, 
	message: '请输入登录密码', 
	trigger: ['blur'],
},
{
pattern: /^[a-zA-Z]\w{5,17}$/,
transform(value) {
	return String(value);
},
trigger: ['blur'],
message: '密码以字母开头，长度在6-18之间，只能包含字符、数字和下划线'
}];
export const requiredRule = [{
	required: true, 
	message: '请填写', 
	trigger: ['blur','change'],
}];
export const ruleMainBusiness= [
	{
	required: true,
	message: '至少选择一项主营业务',
	trigger: 'change',
	type: 'array',
	}
];
export const IDNumberRule= [
	{
	required: true,
	message: '身份证号码必填',
	trigger: ['change','blur'],
	},
	{
	pattern: /^[1-9]\d{5}(18|19|20|(3\d))\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/,
	// 正则检验前先将值转为字符串
	transform(value) {
		return String(value);
	},
	trigger: ['blur'],
	message: '身份证号码格式不正确'
	}	
];
export const format = function(time, format) {
			            var t = new Date(time);
			            var tf = function(i) {
			                return (i < 10 ? '0' : '') + i
			            };
			            return format.replace(/yyyy|MM|dd|HH|mm|ss/g, function(a) {
			                switch (a) {
			                case 'yyyy':
			                    return tf(t.getFullYear());
			                    break;
			                case 'MM':
			                    return tf(t.getMonth() + 1);
			                    break;
			                case 'mm':
			                    return tf(t.getMinutes());
			                    break;
			                case 'dd':
			                    return tf(t.getDate());
			                    break;
			                case 'HH':
			                    return tf(t.getHours());
			                    break;
			                case 'ss':
			                    return tf(t.getSeconds());
			                    break;
			                }
			            });
			        }


// export const rules ={
//         name: requiredRule,
// 		brithday: requiredRule,
// 		sex: requiredRule,
// 		telephone:phoneRule,
// 		IDNumber:IDNumberRule,
// 		identifyCode:requiredRule	
// }