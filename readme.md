# lst-uniapp-template

this is a uniapp project template.  
it uses npm to manage vendor libs, including vuex, uview-ui, uni-simple-router and uni-read-pages.  
so, please run npm install when you first download.  

#uview-ui
1.components  
its' components are quite useful.  

2.http request  
and we also use its' http module, inculding basic requests and request/response intercepter.  
when you want to build a http request, use:  
         this.$u.get(url,params).then()  
         this.$u.post(url,params).then()  
         this.$u.put(url,params).then()  
         this.$u.delete(url,params).then()  
cause $u is set to be an attribute of vue object --> Vue.prototype.$u .  
we put these in model directory to management api requests. and model is mounted on $u.m .  
so we just use this.$u.m.myModel.func() to make http request.  

3.intercepter  
we use uview intercepter to intercept http request and response.  
it is in libs/intercepter directory  

#uni-simple-router
it is used to manage page route.

1.basic usecase  
simply use:  
         this.$Router.push({name:"test",params:{a:'a'}) //name 对应 params  
         this.$Router.push({ path: 'register', query: { plan: 'private' }}) //path 对应 query, 详细情况请自己实验，跳转后查看路由信息 this.$Route  
         this.$Router.replace({name:'tab1'}) //关闭当前并跳转  
         this.$Router.replaceAll({name:'tab1'}) //关闭所有并跳转  
         this.$Router.pushTab({name:'tab1'}) //tab页跳转  
         this.$Router.back(n) //返回n页  
         this.$Router.go(n) //前进或后退n页，这个也可试一试，可传负数  
to route and send params.

2.route guard  
use:  
         router.beforeEach()  
         router.afterEach()  
to do sth before routing or after routing. it is write in libs/router/guard.js


#uni-read-pages
it is used to map(or parse) uniapp pages to router. some config is written in vue.config.js