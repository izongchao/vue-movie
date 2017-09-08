import Vue from 'vue'
//路由组件
import router from './router'
//http请求组件
import VueResource from 'vue-resource';
//加载提示
import Spinner from 'vue-simple-spinner'
//图片懒加载
import VueLazyload from 'vue-lazyload'

import Hello from './components/hello.vue';



//图片懒加载
Vue.use(VueLazyload, {
    preLoad: 1.3,
    error:  require('./assets/error.png'),
    loading: require('./assets/error.png'),
    attempt: 1
})


//使用http请求
Vue.use(VueResource)
//注册组件
Vue.component('vue-simple-spinner', Spinner)
Vue.component('hello', Hello);
//实例化
const app = new Vue({
    router
}).$mount('#app')