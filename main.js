import Vue from 'vue'

//主APP
import App from './App'

//路由
import {router,RouterMount} from './libs/router/router.js'
import routerGuard from './libs/router/guard.js'
Vue.use(routerGuard)   // 路由守卫：登录用户的权限控制，以及全局onLoad前的动作都在这里

//uView
import uView from "uview-ui"
Vue.use(uView)

//api
import model from './model/model.js'
Vue.use(model)

//vuex
import store from './libs/store/index.js'
Vue.prototype.$store = store;

//拦截器
import httpInterceptor from './libs/interceptor/interceptor.js'
Vue.use(httpInterceptor)

//工具
import utils from "./libs/utils/utils.js"
Vue.use(utils)

//混入
import mainMixin from "./libs/mixin/mainMixin.js"
Vue.mixin(mainMixin)

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