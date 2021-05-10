import Config from '@/model/config/Config.js'
import Login from '@/model/login/Login.js'


const install = (Vue) => {
	const $u = Vue.prototype.$u
	$u.m = {
		config:new Config($u),
		login:new Login($u),
	}
}

export default {
	install
}