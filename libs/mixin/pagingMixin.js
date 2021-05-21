//这是通用的列表数据翻页加载混入
export default {
	data() {
		return{
			mixin_moreLoading: false,    //是否正在加载更多列表
			mixin_hasMoreData: true,	 //是否还有下一页
			mixin_listCount: null,       //列表统计数据
			mixin_listData: null,        //列表数据
			paging:null,                 //翻页对象
		}
		
	},
	methods:{
		//加载列表数据的方法，参数为实例化的paging对象
		async mixin_getListData() {
			console.log('实例化的翻页对象 =>',this.paging)
			this.mixin_moreLoading=true                       //加载动画打开
			const res = await this.paging.getMoreData()            //访问paging对象的getMoreData方法
			this.mixin_moreLoading=false                      //加载动画关闭
			if(!res){return}
			this.mixin_listCount = res.count                  //返回列表统计数据
			this.mixin_listData = res.allData                 //返回列表数据保存
			this.mixin_hasMoreData = res.hasMoreData          //是否还有下一页数据
			console.log('翻页列表数据测试 =>',this.mixin_listData)
		},
		
		// 获取翻页对象
		async mixin_newPaging(model,fun,params){
			try{
				let res = await this.$u.m[model][fun](params)
				this.paging = this.$u.test.isEmpty(res)?null:res
			}catch{
				this.paging = null
			}
		},
		// 重置数据
		mixin_resetListData(){
			this.mixin_hasMoreData=true
			this.mixin_listCount=null
			this.mixin_listData=null
			this.paging=null
		}
	}
}