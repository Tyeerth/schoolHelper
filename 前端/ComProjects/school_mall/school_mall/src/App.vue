<template>
  <div id="app">
    <!--缓存路由对象数据-->
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
    <tab-bar v-show="$route.meta.showButtonTabBar"></tab-bar>
    <!--v-show="$route.meta.showButtonTabBar"-->
  </div>
</template>

<script>
    import TabBar from 'common/tabBar/TabBar'
    export default {
        name: "App",
        provide(){
            return{
                reload:this.reload
            }
        },
        data(){
            return{
                isRouterAlive:true
            }
        },
        mounted(){
            // this.$store.dispatch('getUserInfo')
        },
        components:{
            TabBar
        },
        methods:{
            //通过声明reload方法，控制router-view的显示或隐藏，从而控制页面的再次加载
            reload(){
                this.isRouterAlive = false;
                this.$nextTick(function () {
                    this.isRouterAlive = true;
                });
            }
        }
    }
</script>

<style scoped lang="stylus" ref="stylesheet/stylus">
  #app
    width: 100%
    height: 100%
    background-color: #f5f5f5
</style>
