import http from 'uview-ui/libs/request'
/**
 * 数据分页
 */
class Paging {
	// 页码：默认第一页
	page = 1
	// 请求地址
	url
	// 请求参数
	params
	// 请求开关
	locker = false
	// 是否还有数据
	hasMoreData = true
	// 总数居
	allData = []
	constructor(url,params) {
		this.params = params
		this.url=url

		
	}
	async getMoreData() {
		if(!this.hasMoreData){
			return
		}
		if(!this._getLocker()){
			return
		}
		try{
			const data = await this._actualGetData()
			this._releaseLocker()
			return data
		} catch {}
	}
	// 请求开关
	_getLocker() {
		if (this.locker) {
			return false
		}
		this.locker = true
		return true
	}
	// 打开请求
	_releaseLocker() {
		this.locker = false
	}
	_actualGetData() {
		return new Promise((resolve, reject) => {
			const params = this._getCurrentReq()
			http.get(this.url,this.params).then(paging => {
				if(!paging){
					resolve(null) 
				}
				if(paging.record_count === 0){
					resolve({
						empty:true,
						data:[],
						hasMoreData:false,
						allData:[],
						total:paging.record_count,
						count:null
					})
				}
				this.hasMoreData = Paging._hasMoreData(paging.page_max, this.page)
				if(this.hasMoreData){
					this.page += 1
				}
				this._accumulate(paging.list)
				resolve({
					empty:false,
					data: paging.list,
					hasMoreData:this.hasMoreData,
					allData:this.allData,
					total:paging.record_count,
					count:paging.count || null
				})
			}).catch(err => {
				reject(err)
			})
		})
	}
	// 追加数据
	_accumulate(data){
	        this.allData = this.allData.concat(data)
	}
	// 判断页码和总页码
	static _hasMoreData(totalPage, pageNum) {
		return pageNum < totalPage
	}
	// 处理请求参数
	_getCurrentReq() {
		if(this.params){
			this.params.page_current = this.page
		}else{
			this.params = {page_current:this.page}
		}
		return this.params
	}
	
}
export default Paging