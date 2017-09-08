import Vue from 'vue'
import Router from 'vue-router'
import Type from '../pages/Type.vue'
import Index from '../pages/Index.vue'
import MovieList from '../pages/MovieList.vue'
import MovieInfo from '../pages/MovieInfo.vue'
import Slider from '../pages/Slider.vue'

Vue.use(Router)

const routes = [
    { path: '/movie_list', component: MovieList ,meta: { keepAlive: true }},
    { path: '/movie/:id', component: MovieInfo,meta: { keepAlive: false } },
    { path: '/', component: MovieList ,meta: { keepAlive: true }},
    { path: '/type', component: Type,meta: { keepAlive: true } },
    { path: '/slider', component: Slider,meta: { keepAlive: true } },
]

export default new Router({
    //需要后端服务器设置 /user/123
    mode: 'history',
    routes, // （缩写）相当于 routes: routes
    scrollBehavior (to, from, savedPosition) {
        return { x: 0, y: 0 }
    }
})