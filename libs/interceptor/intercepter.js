import config from "@/libs/config/api"
import {router} from '@/libs/router/router.js'

const install = (Vue) => {
	Vue.use(router)
	const $u = Vue.prototype.$u
	/*-----------------接口默认配置----------------*/
	$u.http.setConfig({
		baseUrl     : config.requestUrl,
		header      : config.header,
	});
	
	
	/*-----------------请求拦截器----------------*/
	//请求拦截器开始
	$u.http.interceptor.request = async (option) => {
		//如果在请求地址在 noInterceptUrl 列表中，则不通过拦截器直接请求
		if(config.noInterceptUrl.indexOf(option.url.replace(config.baseUrl,''))!=-1)return option
	
		let headerKey = ''
		//如果有要带到后端的验证数据，就写入请求头中
		if(config.headerKeyField && headerKey) option.header[config.headerKeyField] = headerKey
		
		
		//正常请求
		return option; 	
	}
	
		
	/*--------------响应拦截，判断状态码是否通过-------------*/
	$u.http.interceptor.response = (res) => {
		// 如果把originalData设置为了true，这里得到将会是服务器返回的所有的原始数据
		// 判断可能变成了res.statueCode，或者res.data.code之类的，请打印查看结果
		

		//code <= 0 返回错误 
		if (res.code <= 0) {
			
			$u.toast(res.message)
			return Promise.reject(res.message)
		}
		
		
		return res.data
		
	}

}

export default {
	install
}