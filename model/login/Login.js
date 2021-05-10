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
				resolve(res)
			}).catch(err => {
				//这里需要返回reject，方便外部特殊处理登录错误
				reject(err)
			})
		})
	}

}


export default Login
