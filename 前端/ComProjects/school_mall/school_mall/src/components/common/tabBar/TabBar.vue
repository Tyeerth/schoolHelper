<template>
    <div class="bottom-tab">
      <span class="tab-item" @click="switchTo('/index')">
        <img :src="$route.path.includes('/index') ? tabBarImgArr[0].selected :tabBarImgArr[0].normal" alt="">
        <span :class="{on: $route.path.includes('/index')}" style="position: relative;bottom: 3px">首页</span>
      </span>
      <!--<span class="tab-item" @click="switchTo('/recommend')">-->
        <!--<img :src="$route.path.includes('/recommend') ? tabBarImgArr[1].selected :tabBarImgArr[1].normal" alt="">-->
        <!--<span :class="{on: $route.path.includes('/recommend')}">推荐</span>-->
      <!--</span>-->
      <span class="tab-item" @click="switchTo('/second')">
        <img :src="$route.path.includes('/second') ? tabBarImgArr[1].selected :tabBarImgArr[1].normal" alt="">
        <span :class="{on: $route.path.includes('/second')}">二手广场</span>
      </span>
      <!--校园服务-->
      <span class="tab-item" @click="switchTo('/home')">
        <img :src="$route.path.includes('/home') ? tabBarImgArr[2].selected :tabBarImgArr[2].normal" alt="">
        <span :class="{on: $route.path.includes('/home')}" style="position: relative;bottom: 3px">校园商城</span>
      </span>
      <!--<span class="tab-item" @click="switchTo('/cart')">-->
        <!--<img :src="$route.path.includes('/cart') ? tabBarImgArr[3].selected :tabBarImgArr[3].normal" alt="">-->
        <!--<span :class="{on: $route.path.includes('/cart')}">购物车</span>-->
      <!--</span>-->
      <span class="tab-item" @click="switchTo('/my')">
        <img :src="$route.path.includes('/my') ? tabBarImgArr[4].selected :tabBarImgArr[4].normal" alt="">
        <span :class="{on: $route.path.includes('/my')}" style="position: relative;bottom: 4px">我的</span>
      </span>
    </div>
</template>

<script>
    export default {
      name: "TabBar",
      data(){
        return{
          tabBarImgArr:[
            {normal:require('assets/img/home.png'),selected:require('assets/img/home_selected.png')},
              // {normal:require('assets/img/service.png'),selected:require('assets/img/service_selected.png')},
            // {normal:require('assets/img/icon_intro.png'),selected:require('assets/img/icon_intro_selected.png')},
            {normal:require('assets/img/second.png'),selected:require('assets/img/second_selected.png')},
              {normal:require('assets/img/service.png'),selected:require('assets/img/service_selected.png')},
            {normal:require('assets/img/cart1.png'),selected:require('assets/img/cart_selected1.png')},
            {normal:require('assets/img/my.png'),selected:require('assets/img/my_selected.png')},
          ]
        }
      },
      methods:{
        switchTo(path){
          this.$router.replace(path);
        }
      }
    }
</script>

<style scoped lang="stylus" ref="stylesheet/stylus">
.bottom-tab
  width: 100%
  height: 44px
  background-color: #fff
  position: fixed
  left: 0
  bottom: 0
  display: flex
  z-index: 999
  .tab-item
    display flex
    flex 1
    flex-direction column
    justify-content center
    align-items center
    font-size: 12px
    color #666
    img
      width: 30%
      margin-bottom: 2px
    .on
      color red
</style>
