import Vue from 'vue'

//主APP
import App from './App'

//vuex
import store from './libs/store/index.js'
Vue.prototype.$store = store;

//路由
import {router,RouterMount} from './libs/router/router.js'
import routerGuard from './libs/router/guard.js'
Vue.use(routerGuard)   // 路由守卫：登录用户的权限控制，以及全局onLoad前的动作都在这里

//uView
import uView from "uview-ui"
Vue.use(uView)

//拦截器
import httpInterceptor from './libs/interceptor/intercepter.js'
Vue.use(httpInterceptor)

//数据api 挂载到$u
import model from './model/model.js'
Vue.use(model)


Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
    ...App
})




// #ifdef H5
	RouterMount(app,router,'#app')
// #endif

// #ifndef H5
	app.$mount(); //为了兼容小程序及app端必须这样写才有效果
// #endif