import Vue from 'vue'
import store from '../index.js'
import uView from "uview-ui"
Vue.use(uView)

const $u = Vue.prototype.$u


const state = {
	currentTheme:{
		uMainColor: "#333333",
		uContentColor: "#666666",
		uTipsColor: "#999999",
		uLightColor: "#eeeeee",
		uBorderColor: "#dddddd",
		uBgColor: "#f4f4f4",
		uCardColor: "#ffffff",
		uWhite: "#ffffff",
		
		uTypePrimary: "#2C6697",
		uTypePrimaryDisabled: "#a0cfff",
		uTypePrimaryDark: "#3E7DB2",
		uTypePrimaryLight: "#ecf5ff",
		
		uTypeWarning: "#ff9c00",
		uTypeWarningDisabled: "#fcbd71",
		uTypeWarningDark: "#f29100",
		uTypeWarningLight: "#fdf6ec",
		
		uTypeSuccess: "#2A7E35",
		uTypeSuccessDisabled: "#71d5a1",
		uTypeSuccessDark: "#2C6934",
		uTypeSuccessLight: "#CCEBD0",
		
		uTypeError: "#AD1000",
		uTypeErrorDisabled: "#fab6b6",
		uTypeErrorDark: "#dd6161",
		uTypeErrorLight: "#fef0f0",
		
		uTypeInfo: "#999999",
		uTypeInfoDisabled: "#cccccc",
		uTypeInfoDark: "#82848a",
		uTypeInfoLight: "#f4f4f5",
		
		uTypeFresh: "#008DA0",
		uTypeFreshDisabled: "#C5E6EA",
		uTypeFreshDark: "#258996",
		uTypeFreshLight:"#F3FEFF",
	},
	theme1:{
		uMainColor: "#333333",
		uContentColor: "#666666",
		uTipsColor: "#999999",
		uLightColor: "#eeeeee",
		uBorderColor: "#dddddd",
		uBgColor: "#f4f4f4",
		uCardColor: "#ffffff",
		uWhite: "#ffffff",
		
		uTypePrimary: "#2C6697",
		uTypePrimaryDisabled: "#a0cfff",
		uTypePrimaryDark: "#3E7DB2",
		uTypePrimaryLight: "#ecf5ff",
		
		uTypeWarning: "#ff9c00",
		uTypeWarningDisabled: "#fcbd71",
		uTypeWarningDark: "#f29100",
		uTypeWarningLight: "#fdf6ec",
		
		uTypeSuccess: "#2A7E35",
		uTypeSuccessDisabled: "#71d5a1",
		uTypeSuccessDark: "#2C6934",
		uTypeSuccessLight: "#CCEBD0",
		
		uTypeError: "#AD1000",
		uTypeErrorDisabled: "#fab6b6",
		uTypeErrorDark: "#dd6161",
		uTypeErrorLight: "#fef0f0",
		
		uTypeInfo: "#999999",
		uTypeInfoDisabled: "#cccccc",
		uTypeInfoDark: "#82848a",
		uTypeInfoLight: "#f4f4f5",
		
		uTypeFresh: "#008DA0",
		uTypeFreshDisabled: "#C5E6EA",
		uTypeFreshDark: "#258996",
		uTypeFreshLight:"#F3FEFF",
	},
	theme2:{
		uMainColor: "#333333",
		uContentColor: "#666666",
		uTipsColor: "#999999",
		uLightColor: "#eeeeee",
		uBorderColor: "#dddddd",
		uBgColor: "#f4f4f4",
		uCardColor: "#ffffff",
		uWhite: "#ffffff",
		
		uTypePrimary: "#2A7E35",
		uTypePrimaryDisabled: "#71d5a1",
		uTypePrimaryDark: "#2C6934",
		uTypePrimaryLight: "#CCEBD0",
		
		uTypeWarning: "#ff9c00",
		uTypeWarningDisabled: "#fcbd71",
		uTypeWarningDark: "#f29100",
		uTypeWarningLight: "#fdf6ec",
		
		uTypeSuccess: "#2C6697",
		uTypeSuccessDisabled: "#a0cfff",
		uTypeSuccessDark: "#3E7DB2",
		uTypeSuccessLight: "#ecf5ff",
		
		uTypeError: "#AD1000",
		uTypeErrorDisabled: "#fab6b6",
		uTypeErrorDark: "#dd6161",
		uTypeErrorLight: "#fef0f0",
		
		uTypeInfo: "#999999",
		uTypeInfoDisabled: "#cccccc",
		uTypeInfoDark: "#82848a",
		uTypeInfoLight: "#f4f4f5",
		
		uTypeFresh: "#008DA0",
		uTypeFreshDisabled: "#C5E6EA",
		uTypeFreshDark: "#258996",
		uTypeFreshLight:"#F3FEFF",
	},
}

const actions = {
	
	// 获取主题
	async reqTheme({
		commit,
		state
	}) {
		// console.log('$u -->',$u)
		// let res = await $u.m.config.getConfig({scope:'api_config'})
		// console.log("action res -->",res)
	}
	
}

const mutations = {

	// 切换主题
	changeTheme(state, data) {
		console.log("data --->",data)
		state.currentTheme = state[data.theme]
	},
	
}

const getters = {
	
	getTheme: state => {
		return state.currentTheme
	},
	

}

export default {
	state,
	mutations,
	actions,
	getters
}
