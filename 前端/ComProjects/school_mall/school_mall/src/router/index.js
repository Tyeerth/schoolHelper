import Vue from 'vue'
import axios from 'axios';
import { Toast } from 'vant';
import VueRouter from 'vue-router'
import My from 'views/my/My'
import Cart from 'views/cart/Cart'
import Second from 'views/second/Second'
import Home from 'views/home/Home'
import Category from 'views/home/children/Category'
import Issue from 'views/home/children/Issue'
import ShopRz from 'views/home/children/ShopRz'
import ShopIssue from 'views/home/children/ShopIssue'
import Index from 'views/index/Index'
import NewsDetail from '../views/index/children/NewsDetail'
import IssueDiary from '../views/index/children/IssueDiary'

// import Search from 'components/content/search/Search'
import SearchGoods from 'components/content/search/children/SearchGoods'
import detail from 'components/content/detail/Detail'
import Login from 'views/my/children/login/Login'
import Registry from 'views/my/children/registry/Registry'
import MessageLogin from 'views/my/children/login/MessageLogin'
import faceLogin from 'views/my/children/login/FaceLogin'
import FaceRegistry from 'views/my/children/registry/FaceRegistry'

import OrderDetail from 'views/my/children/order/OrderDetail'
import Map from 'views/home/children/Map'
import JS from 'views/cart/children/OrderDetail'
import AddressEdit from 'views/cart/children/AddressEdit'
import AddressList from 'views/cart/children/AddressList'
import SchoolService from 'views/service/SchoolService'
import Activity from 'views/service/children/Activity'
import Lose from 'views/service/children/Lose'
import Run from 'views/service/children/Run'
import ServiceMore from 'views/service/children/More'
import Chat from 'views/service/children/Chat'

Vue.use(VueRouter)

  const routes = [
      {
          path:'/issueDiary',
          component:IssueDiary,
          name:IssueDiary
      },
      {
          path:'/newsDetail/:id',
          component:NewsDetail,
          name:NewsDetail
      },
      {
          path:'/chat',
          component:Chat,
          name:Chat
      },
      {
        path:'/serviceMore',
          component:ServiceMore,
          name:ServiceMore
      },
      {
          path:'/lose',
          component:Lose,
          name:Run
      },
      {
          path:'/run',
          component:Run,
          name:Run
      },
      {
          path:'/activity',
          component:Activity,
          name:Activity
      },
      {
          path:'/addressList',
          component:AddressList,
          name:AddressList
      },
      {
          path:'/addressEdit',
          component:AddressEdit,
          name:AddressEdit
      },
      {
          path:'/js/:item',
          component:JS,
          name:JS
      },
      {
          path:'/map',
          component:Map,
          name:Map
      },
      {
          path:'/orderDetail',
          component:OrderDetail,
          name:OrderDetail
      },
      {
          path:'/faceRegistry/:uid',
          component:FaceRegistry,
          name:FaceRegistry
      },
      {
          path:'/faceLogin',
          component:faceLogin,
          name:faceLogin
      },
      {
          path:'/MessageLogin',
          component:MessageLogin,
          name:MessageLogin
      },
      {
          path:'/registry',
          component:Registry,
          name:Registry
      },
      {
          path:'/login',
          component:Login,
          name:Login
      },
      {
          path:'/detail/:id',
          component:detail,
          name:'detail'
          // meta:{showButtonTabBar:true}
      },
      {
          path:'/search/:key',
          component:SearchGoods,
          name:'SearchGoods'
      },
      {
          path:'/search',
          component:SearchGoods,
          name:'SearchGoods'
      },
      // {
      //     path:'/search',
      //     component:Search,
      //     name:Search
      // },
      {
          path:'/issue',
          component:Issue,
          name:Issue
      },
      {
          path:'/shopRz',
          component:ShopRz,
          name:ShopRz
      },
      {
          path:'/shopIssue',
          component:ShopIssue,
          name:ShopIssue
      },
      {
          path:'/category',
          name:Category,
          component:Category,
          meta:{showButtonTabBar:true}
      },
      {
          path:"/my",
          component:My,
          name:My,
          meta:{showButtonTabBar:true}
      },
      {
          path:"/cart",
          component:Cart,
          name:Cart,
          meta:{showButtonTabBar:true}
      },
      {
          path:"/home",
          component:Home,
          name:Home,
          meta:{showButtonTabBar:true}
      },
      {
          path:'/',
          redirect:'/index',
          meta:{showButtonTabBar:true}
      },
      {
          path:"/second",
          component:Second,
          name:Second
      },
      {
          path:'/schoolService',
          component:SchoolService,
          name:SchoolService
      },
      {
          path:'/index',
          component:Index,
          name:Index,
          meta:{showButtonTabBar:true}
      }
]

const router = new VueRouter({
  routes
})

// 导航守卫
// 使用 router.beforeEach 注册一个全局前置守卫，判断用户是否登陆
router.beforeEach((to, from, next) => {

    // if (to.path === '/login') {
    //     next();
    // } else {
    if(to.path=="/my"||to.path=="/cart") {
        // userInfo=this.verify()
        axios.get("/accrite/verify").then(() => {
            next();
        }).catch(() => {
            Toast.fail("您还未登陆，请登陆再访问！");
            next('/login');
        })
        } else {
            next();
        }

})

export default router
