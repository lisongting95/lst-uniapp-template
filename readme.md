# lst-uniapp-template
uniapp 项目模板
使用npm管理外部插件，如vuex，uview-ui, uni-simple-router 以及 uni-read-pages. 在package.json中可查看。  
因此，首次下载请运行：  
		npm install  
下载插件包。

#uview-ui
项目使用uView库，包括其组件，http请求，及请求拦截器。  
1. uView组件  
在pages.json中添加easycom配置  
	"easycom": {  
		"^u-(.*)": "uview-ui/components/u-$1/u-$1.vue"  
	}  
在页面中无需再次引入或添加到components中。  
可直接使用如: <u-button></u-button>  
2. http请求
uView http请求如下：  
		this.$u.get(url,params).then()  
		this.$u.post(url,params).then()  
		this.$u.put(url,params).then()  
		this.$u.delete(url,params).then()  
我们把请求封装到model下，并挂到$u.m上。  
因此，可使用 this.$u.m.myModel.func() 进行http请求。  
为了更方便使用，我们又将promise封装了一下，以[err,res]的形式接收返回数据，见utils/awaitTo.js  
即：  
		let [err,res] = await this.$u.to(this.$u.m.myModel.func())
的使用方式  
3. 请求拦截器
请求拦截器，写在libs/interceptor目录下，因为http请求是走uView的封装，  
因此拦截器也是使用uView的拦截器，并在此进行请求及响应拦截  
注意，使用其他方式发送请求如 uni.request 将不会通过这里  


#uni-simple-router
此插件用于路由跳转，以弥补uniapp没有路由钩子的遗憾
1. 路由跳转  
使用:  
		this.$Router.push({name:"test",params:{a:'a'}) //name 对应 params，即使用name时传递路由参数要写在params中，否则无效  
		this.$Router.push({ path: 'register', query: { plan: 'private' }}) //path 对应 query, 详细情况请自己实验，跳转后查看路由信息 this.$Route  
		this.$Router.replace({name:'tab1'}) //关闭当前并跳转  
		this.$Router.replaceAll({name:'tab1'}) //关闭所有并跳转  
		this.$Router.pushTab({name:'tab1'}) //tab页跳转  
		this.$Router.back(n) //返回n页  
		this.$Router.go(n) //前进或后退n页，这个也可试一试，可传负数  
进行路由跳转.  
注意，虽说在跳转后页面的onLoad里可以收到路由参数，但有时会产生一些错误，所以都使用  
		this.$Route.query  
接收路由参数吧。并且路由参数不宜太复杂，如几层嵌套的对象，否则也可能会发生错误。（踩过坑呀哈哈哈）  
2. 路由守卫  
使用:  
		router.beforeEach()  
		router.afterEach()  
并在其中写一些路由时需要执行的逻辑，写在 libs/router/guard.js目录下  


#uni-read-pages
这个插件是为了配合uni-simple-router使用的。作用是解析或映射pages.json的页面配置到路由器吧。  
其中一些配置写在vue.config.js中  
		includes: ['path', 'name', 'aliasPath','meta']  
即选择映射的参数，在页面this.$Route中可以获取相应数据  


#vuex
这样应该不用多说，应用单一状态树管理。  
写在libs/store目录下  
1. 基本使用方式  
我们用  
		this.$store.commit('setVuex',{name:'vuex_config',value:'321'})  
提交一个setVuex mutation，封装一下是因为有些数据可能需要保存在本地  
'name' 参数是state的属性名  
'value' 是state相应属性的值  
2. 模块
使用module管理一些比较特殊的状态，比如购物车，登录状态，主题等  
获取模块中的状态，使用  
		this.$store.state.cart.cartNum    
或使用getters  
		this.$store.getters.testGetterYo
改变状态同样提交一个mutation（模块里就没有再封装一个方法了，有需要也可以自己写嘛）  
		this.$store.commit('changeTheme',{theme:'theme1'})
需要异步操作就派发一个action，如：  
		this.$store.dispatch('login',{  
			mobile:'18669010827',  
			password:'fyc1990',  
			type:'password'  
		})  

以上！！


# lst-uniapp-template

this is a uniapp project template.  
it uses npm to manage vendor libs, including vuex, uview-ui, uni-simple-router and uni-read-pages.  
so, please run npm install when you first download.  

#uview-ui
1. components  
its' components are quite useful.  

2. http request  
and we also use its' http module, inculding basic requests and request/response intercepter.  
when you want to build a http request, use:  
         this.$u.get(url,params).then()  
         this.$u.post(url,params).then()  
         this.$u.put(url,params).then()  
         this.$u.delete(url,params).then()  
cause $u is set to be an attribute of vue object --> Vue.prototype.$u .  
we put these in model directory to management api requests. and model is mounted on $u.m .  
so we just use this.$u.m.myModel.func() to make http request.  

3. intercepter  
we use uview intercepter to intercept http request and response.  
it is in libs/intercepter directory  

#uni-simple-router
it is used to manage page route.

1. basic usecase  
simply use:  
         this.$Router.push({name:"test",params:{a:'a'}) //name 对应 params  
         this.$Router.push({ path: 'register', query: { plan: 'private' }}) //path 对应 query, 详细情况请自己实验，跳转后查看路由信息 this.$Route  
         this.$Router.replace({name:'tab1'}) //关闭当前并跳转  
         this.$Router.replaceAll({name:'tab1'}) //关闭所有并跳转  
         this.$Router.pushTab({name:'tab1'}) //tab页跳转  
         this.$Router.back(n) //返回n页  
         this.$Router.go(n) //前进或后退n页，这个也可试一试，可传负数  
to route and send params.

2. route guard  
use:  
         router.beforeEach()  
         router.afterEach()  
to do sth before routing or after routing. it is write in libs/router/guard.js


#uni-read-pages
it is used to map(or parse) uniapp pages to router. some config is written in vue.config.js  



#vuex
vuex is nearly the most popular plugin in vue project.  
in this project, it is defined in libs/store directory.  

1. we use:  

this.$store.commit('setVuex',{name:'vuex_config',value:'321'})  

to commit a 'setVuex' mutation.  
'name' param is the key of a state property.  
'value' param is the value of it.  

2. we use vue modules to manage special states like carts.  

use this.$store.state.cart.cartNum to get module's state  
or use getters like this.$store.getters.testGetterYo  

we can alse use this.$store.dispatch('testAction') to dispatch an action for async process.  
no matter the states in the index or in the modules.  

3. for more
read libs/store/index.js   