import Config from '@/model/config/Config.js'
import Login from '@/model/login/Login.js'
import Product from "@/model/product/Product.js"
import Update from "@/model/update/Update.js"

const install = (Vue) => {
	const $u = Vue.prototype.$u
	$u.m = {
		config:new Config($u),
		login:new Login($u),
		product:new Product($u),
		update:new Update($u)
	}
}

export default {
	install
}