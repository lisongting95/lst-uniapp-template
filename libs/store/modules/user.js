import Vue from 'vue'
import store from '../index.js'
import uView from "uview-ui"
Vue.use(uView)
//uView对象
const $u = Vue.prototype.$u

import apiConfig from "../../config/api.js"
import md5Libs from "uview-ui/libs/function/md5"

//持久化
let localData = {}
try{
	localData = uni.getStorageSync('localData')
}catch(e){
	console.error('vuex user localData error',e)
}

const state = {
	token:localData.token?localData.token:{}
}

const actions = {
	
	// 登录
	async login({commit,state},params) {
		let appid = apiConfig.appId
		let rand = getRandNum(6)
		let timestamp = getTimeStamp()
		let sign = getSign({
			appid:appid,
			rand:rand,
			timestamp:timestamp,
		})
		let [err,res] = await $u.to($u.m.login.login({
				...params,
				appid:appid,
				rand:rand,
				timestamp:timestamp,
				sign:sign,
			}))
		if(res){
			//保存到state
			commit('setToken',res)
			//保存到本地
			saveToLocal('token',res)
		}
	},

}

const mutations = {
	setToken(state, data) {
		state.token = data
	},
}

const getters = {
	getToken: state => {
		return state.token
	}
}

// 保存变量到本地存储中
const saveToLocal = function(key,data){
	let localData = uni.getStorageSync('localData')
	if(localData){
		Vue.set(localData,key,data)
	}else{
		localData = {}
		Vue.set(localData,key,data)
	}
	uni.setStorageSync('localData', localData)
}

//获取随机数
const getRandNum = (num) => {
	let rand = ''
	for (let i=0;i<num;i++){
		rand += Math.floor(Math.random() * 10)
	}
	return rand
}

//获取时间戳
const getTimeStamp = () => {
	let token = store.getters.getToken
	let tmp = Date.parse(new Date()).toString()
	//这里时间戳要转化成数字格式 
	tmp = parseInt(tmp.substr(0, 10))
	if (token){
		if(token.time_diff>0){
			tmp = tmp + token.time_diff
		}
	}
	return tmp
}

// 参数签名
const getSign = (params) => {
	var s_keys = []
	for (var i in params)
	{
		s_keys.push(i)
	}
	s_keys.sort()
	var data = ""
	for (var i = 0; i < s_keys.length; i++)
	{
		// encodeURIComponent 特殊字符和中文字符转义
		data+=(data ? "&" : "")+s_keys[i]+"="+encodeURIComponent(params[s_keys[i]])
	}
	return md5Libs.md5(data+'&key='+apiConfig.appSecret)
}



export default {
	state,
	mutations,
	actions,
	getters
}
