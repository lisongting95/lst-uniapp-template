/**
 * 路由权限守护
 */
import {router} from './router.js'
const install = (Vue) => {
	Vue.use(router)
	const $u = Vue.prototype.$u
	/**
	 * 路由跳转页面前执行
	 */
	router.beforeEach( async (to, from, next) => {
		console.log("before Each-->",to)
		console.log('ROUTES -->',ROUTES)
		next()
	});
	
	/**
	 * 路由跳转页面后执行
	 */
	router.afterEach(async (to, from, next) => {
		console.log("after Each-->",to)
	});
}

export default {
  install
}