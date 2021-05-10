//把常用方法和配置挂载到$u
import awaitTo from './awaitTo/awaitTo.js'
import base64 from './base64/base64.js'

const install = (Vue) => {
	Vue.prototype.$u.to = awaitTo
	Vue.prototype.$u.base64 = base64
}

export default {
	install
}