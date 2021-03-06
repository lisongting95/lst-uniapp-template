/*-----------------Api接口全局配置项----------------
*
* 注意：如果不使用appId和appSecret进行来路的合法性验证，请把他们留空。不要修改api.interceptor.js拦截器的任何代码
*/

export default {
	requestUrl         	   : 'http://47.114.176.255/v1',  //测试环境请求地址前缀
	// requestUrl             : 'https://sapi.hua5.com/v1',  //生产环境请求地址前缀 
	header          	   : {'content-type': 'application/json;charset=UTF-8'}, //默认请求头
	headerKeyField	       : 'authentication',           //请求头要带到后端验证的字段名称
	noInterceptUrl         : ['session','api_configs','pages'] ,       //不通过请求拦截器的api
	
	
	
	appId       : 'hua5_text',    //APPID
	appSecret   : 'hua5_123456',  //KEY
}
