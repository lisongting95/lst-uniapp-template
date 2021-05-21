import Config from '@/model/config/Config.js'
import Login from '@/model/login/Login.js'
import Product from "@/model/product/Product.js"

const install = (Vue) => {
	const $u = Vue.prototype.$u
	$u.m = {
		config:new Config($u),
		login:new Login($u),
		product:new Product($u)
	}
}

export default {
	install
}