import config from "@/libs/config/api"
class Token {
	$u
    constructor($u) {
		this.$u = $u
	}
	
	/*
	获取Token
	@ params  
	appid:'hua5',
	rand:665434,
	timestamp:1584686739,
	sign:'87c4415594769cb3abd9b026e52d4857'
	*/
	getToken(params = {}){
		return new Promise((resolve, reject) => {
			resolve(this.$u.post('/token', params))
		})
	}
	
	refreshToken(params = {}){
		return new Promise((resolve, reject) => {
			resolve(this.$u.post('/token/action/refresh', params))
		})
	}
	
	resetToken(){
		return new Promise((resolve, reject) => {
			this.$u.post('/token/action/reset', params).then(_ => {
				this.$u.setVuex(config.vuexTokenField,val)
				resolve()
			}).catch(err => reject(err))
		})
	}
}
export default Token