//把常用方法和配置挂载到$u
import color from './theme/theme.js'

const install = (Vue) => {
	Vue.prototype.$u.color = color
	
}

export default {
	install
}