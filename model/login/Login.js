import config from "@/libs/config/api"

class Login {
	$u
	constructor($u) {
		this.$u = $u
	}

	/*
	登录
	@ params  
	type:'password'          //sms验证码登录 xcx小程序 app_wx：APP微信登录   password 密码登录
	mobile:'17713564637',    //手机号
	password:'123456',       //密码
	code:'123456',           //验证码
	xcx_code:'123456'        //小程序code
	*/
	login(params = {}) {
		
		let url = '/session/' + params.type
		return new Promise((resolve, reject) => {
			this.$u.post(url, params).then(res => {
				this.$u.setVuex(config.vuexTokenField,res.token)
				resolve()
			}).catch(err => {
				//这里需要返回reject，方便外部特殊处理登录错误
				reject(err)
			})
		})
	}
	
	
	/*
	app微信登录
	@ params  
	type:'app_wx'
	openid:
	unionid:
	nice_name:
	avatar:
	*/
	appWXLogin(params = {}) {
		
		let url = '/session/app_wx'
		return new Promise((resolve, reject) => {
			this.$u.post(url, params).then(res => {
				this.$u.setVuex(config.vuexTokenField,res.token)
				console.log('wx login res--->',res)
				resolve(res)
			}).catch(err => {
				//这里需要返回reject，方便外部特殊处理登录错误
				console.log('wx login err--->',err)
				reject(err)
			})
		})
	}

	/*
	小程序微信登录
	@ params  
	type:'xcx',
	xcx_code:
	nice_name:
	avatar:
	*/
	WXMpLogin(params = {}) {
		
		let url = '/session/xcx'
		return new Promise((resolve, reject) => {
			this.$u.post(url, params).then(res => {
				this.$u.setVuex(config.vuexTokenField,res.token)
				console.log('wx login res--->',res)
				resolve(res)
			}).catch(err => {
				//这里需要返回reject，方便外部特殊处理登录错误
				console.log('wx login err--->',err)
				reject(err)
			})
		})
	}


	logout(params = {}) {
		let url = '/session/' + this.$u.state[config.vuexTokenField].access_token
		this.$u.setVuex(config.vuexTokenField,'')
		this.$u.setVuex('vuex_user','')
		return new Promise((resolve, reject) => {
			this.$u.delete(url, params).then(res => {
				resolve()
			}).catch(err => {
				//这里需要返回reject，方便外部特殊处理登录错误
				reject(err)
			})
		})
	}

}


export default Login
