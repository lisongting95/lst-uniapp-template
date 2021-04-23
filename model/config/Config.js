class Config {
	$u
    constructor($u) {
		this.$u = $u
	}
	
	/*
	获取Config
	@ params {scope:'api_config'}
	*/
	 getConfig(params = {}){
		 return new Promise((resolve, reject) => {
			 this.$u.get('/api_configs', params).then(res => {
				this.$u.setVuex('vuex_config',res.value);
				resolve()
			 }).catch(err => {
				reject(err)
			})
		 })
	}
}
export default Config