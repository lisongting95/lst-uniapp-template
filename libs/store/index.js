import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)


//分块
import cart from "./modules/cart.js"
import theme from "./modules/theme.js"
import user from "./modules/user.js"

//持久化
let lifeData = {};
try{lifeData = uni.getStorageSync('lifeData');}catch(e){}

// 需要持久化存储的数据变量名
let saveStateKeys = [
	'vuex_token',
];



const store = new Vuex.Store({
	//分块
	modules: {
		user,
		theme,
		cart,
	},
	
	//state
	state: {
		// ----------持久化存储的state变量-------------------
		vuex_token: lifeData.vuex_token ? lifeData.vuex_token :'',
		
		// ----------一般的state变量-------------------
		vuex_config: '111',
	},

	
	mutations: {
		//commit('setVuex',{name:'',value:''})
		setVuex(state, payload) {
			let nameArr = payload.name.split('.');
			let saveKey = '';
			let len = nameArr.length;
			if(nameArr.length >= 2) {
				let obj = state[nameArr[0]];
				for(let i = 1; i < len - 1; i ++) {
					obj = obj[nameArr[i]];
				}
				obj[nameArr[len - 1]] = payload.value;
				saveKey = nameArr[0];
			} else {
				state[payload.name] = payload.value;
				saveKey = payload.name;
			}
			//保存到本地，函数里做了是否要保存的判断
			saveLifeData(saveKey, state[saveKey])
		}
	}
})

// 保存变量到本地存储中
const saveLifeData = function(key, value){
	if(saveStateKeys.indexOf(key) != -1) {
		let tmp = uni.getStorageSync('lifeData');
		tmp = tmp ? tmp : {};
		tmp[key] = value;
		uni.setStorageSync('lifeData', tmp);
	}
}


export default store
