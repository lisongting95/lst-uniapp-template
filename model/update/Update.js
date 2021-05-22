class Update {
	$u
    constructor($u) {
		this.$u = $u
	}
	
	
	/*
	获取版本更新信息
	@ params
	app_version:'',
	app_platform:''
	*/
	getUpdateInfo(params){
		let url = '/update'
		
		return new Promise((resolve, reject) => {
			this.$u.get(url, {...params}).then(res => {
				console.log("api update res -->",res)
				resolve(res)
			}).catch(err => {
				console.log("api update err -->",err)
				reject(err)
			})
		})
	}
	
}
export default Update