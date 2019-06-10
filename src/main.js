import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import "./styles/common.css"
import "./styles/global.less"
import "./styles/antd.scss"
import "./styles/antd-vue.css"

// element
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';

import moment from "moment";
Vue.prototype.$moment = moment;
Vue.config.productionTip = false;
import { message, Modal } from "ant-design-vue";
Vue.prototype.$confirm = Modal.confirm;
Vue.prototype.$message = message;
Vue.use(ElementUI)


new Vue({
    router,
    store,
    components: { App },
    template: '<App/>',
    // render: h => h(App)
}).$mount("#app");