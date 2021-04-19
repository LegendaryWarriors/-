import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import ElementUI from 'element-ui';

Vue.prototype.axios = axios
Vue.config.productionTip = false


import Element from 'element-ui';
Vue.use(Element, { size: 'small', zIndex: 3000 });
Vue.use(ElementUI);


import ViewUI from 'view-design';
import 'view-design/dist/styles/iview.css';
Vue.use(ViewUI);









Vue.use(ElementUI);
new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')