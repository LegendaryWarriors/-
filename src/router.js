import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/views/index.vue'

Vue.use(Router)

export default new Router({
    routes: [{
        path: '/',
        name: 'index',
        component: Home
    }, {
        path: '/index_1',
        name: 'index_1',
        component: () =>
            import ('./views/index_1')
    }]
})