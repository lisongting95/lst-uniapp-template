import Paging from '@/libs/mixin/paging.js'

class Product {
	$u
    constructor($u) {
		this.$u = $u
	}
	
	
	
	/*
	获取商品列表分页类
	@ params
	state:50,//状态 -1 失效 0下架 1 正常    默认为1 正常状态
	category_id:5,//分类id
	ji:'A',//等级
	tag:'',//标签
	opt:'',//评级项
	color_mk:'',//颜色
	keyword:'',
	sort:'',
	order:'',
	*/
	getProPaging(params){
		return new Promise((resolve, reject) => {
			resolve(new Paging('/pros',{...params}))
		}).catch(err => {
		 	reject(err)
		})
	}

}
export default Product