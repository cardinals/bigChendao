import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import "./styles/common.css"
import "./styles/global.less"
import "./styles/antd.scss"
import "./styles/antd-vue.css"

import moment from "moment";
Vue.prototype.$moment = moment;
Vue.config.productionTip = false;
import { message, Modal } from "ant-design-vue";
Vue.prototype.$confirm = Modal.confirm;
Vue.prototype.$message = message;
new Vue({
    router,
    store,
    render: h => h(App)
}).$mount("#app");