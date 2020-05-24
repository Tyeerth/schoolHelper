import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Vant from 'vant';
import 'vant/lib/index.css';
// 引入全部样式
import 'vant/lib/index.less';
import LyTab from 'ly-tab'
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
import axios from 'axios';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
// import "tracking/build/tracking.js"
// import 'tracking/build/tracking-min.js'
// import "tracking/build/data/eye-min.js"
// import "tracking/build/data/mouth-min.js"
// import "tracking/build/data/face-min.js"
import './assets/icon/iconfont'
import './assets/style/style.css'
//聊天插件
// import LemonIMUI from 'lemon-imui'

import  qs from 'qs'
import BaiduMap from 'vue-baidu-map'

Vue.use(BaiduMap, {
    // ak 是在百度地图开发者平台申请的密钥 详见 http://lbsyun.baidu.com/apiconsole/key */
    ak: 'onuKVWIsEoQNgZVLgsMNhIwYzkWph0eA'
})
// Vue.use(LemonIMUI)
Vue.use(ElementUI);
// axios.defaults.withCredentials=true;
Vue.prototype.$qs = qs;
Vue.prototype.$http=axios;
Vue.use(MintUI)
Vue.use(LyTab)
Vue.use(Vant);

Vue.config.productionTip = false

Vue.prototype.set = function (key,value){
    localStorage.setItem(key,JSON.stringify(value))
}
Vue.prototype.get = function (key){
    return JSON.parse(localStorage.getItem(key))
}
Vue.prototype.remove = function (skuId){
    var carts=this.get("CDTU_CART")
    for(var i=0;i<carts.length;i++)
    {
        if(carts[i].skuId==skuId)
        {
            carts.splice(i,1)
            break;
        }
    }
    this.set("CDTU_CART",carts)

}
Vue.prototype.verify = function () {
    var userInfo={}
        this.$http.get("/accrite/verify").then(res=>{
            userInfo=res.data
        }).catch(()=>{
            return userInfo
        })
    return userInfo
}


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
