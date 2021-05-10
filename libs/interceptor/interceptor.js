import config from "@/libs/config/api"
import {router} from '@/libs/router/router.js'
import base64 from '../utils/base64/base64.js'

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
		if(config.noInterceptUrl.indexOf(option.url.replace(config.baseUrl,'').split('/')[1])!=-1)return option
	
		//如果有要带到后端的验证数据，就写入请求头中
		if(config.headerKeyField) option.header[config.headerKeyField] = makeAuthentication()
		
		
		//正常请求
		return option; 	
	}
	
		
	/*--------------响应拦截，判断状态码是否通过-------------*/
	$u.http.interceptor.response = (res) => {
		// 如果把originalData设置为了true，这里得到将会是服务器返回的所有的原始数据
		// 判断可能变成了res.statueCode，或者res.data.code之类的，请打印查看结果

		//code <= 0 返回错误 
		if (res.code <= 0) {
			
			switch (res.code){
				//未登录
				case -6:
					this.$Router.push({name:"test"})
					break
				//token错误
				case -6001:
					//获取新token的逻辑
					//getNewtoken()
					break
				//token过期
				case -6002:
					//刷新token的逻辑
					//reFreshToken()
					break
				default:
					break
			}
			
			//普通错误返回
			$u.toast(res.message)
			return Promise.reject(res.message)
		}
		
		
		return res.data
		
	}

}


// 拼接请求头
const makeAuthentication = (appId,access_token,uid) => {
	let authentication =''
	try {
		authentication = 'USERID '+ base64.encode(appId+':'+access_token+':'+uid)
	}catch(e){
		console.log('拼接请求头 Authentication 失败')
		console.log(e)
	}
	return authentication
}

export default {
	install
}