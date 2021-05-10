/*-----------------Login页面的表单验证----------------*/
import test from "uview-ui/libs/function/test"
export default {
	mobile: [
		{
			required: true,
			message: '请输入手机号',
			trigger: ['blur']
		},
		{
			// 自定义验证函数
			validator: (rule, value) => {
				// 返回true表示校验通过，返回false表示不通过
				// test.mobile()就是返回true或者false的
				return test.mobile(value);
			},
			message: '手机号码不正确',
			trigger: ['blur']
		}
	],
	password: [
		{
			required: true,
			message: '请输入密码',
		}
	],
}