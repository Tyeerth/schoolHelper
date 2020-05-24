<template>
  <div class="container">
    <div class="category">
      <!--搜索导航-->
      <van-nav-bar left-text="商品分类"  left-arrow
                   @click-left="onClickLeft">
        <template #right>
          <!--<van-icon name="search" size="18" />-->
          <van-icon name="weapp-nav" size="18" @click="isShow"/>
        </template>
      </van-nav-bar>
      <!--顶部显示框---功能直达-->
      <van-popup
              closeable
              :overlay=false
              v-model="show"
              position="top"
              :style="{ height: '23%',backgroundColor:'#969799',borderRadius:'0px 0px 20px 20px'}"
      >
        <h3 style="color: white;margin-left: 10px;margin-top: 30px">功能直达</h3>
        <div style="padding-bottom: 10px;">
          <van-grid :icon-size="28" :border=false>
            <van-grid-item icon="chat-o" text="消息"  dot badge="99+"/>
            <van-grid-item icon="wap-home-o" text="首页" />
            <van-grid-item icon="friends-o" text="客服小密" />
            <van-grid-item icon="records" text="我要反馈" />
          </van-grid>
        </div>
      </van-popup>
      <!--联动列表-->
      <div class="shop">
        <!--左边-->
        <scroll  ref="scroll1" class="menu-wrapper">
          <div >
            <ul>
              <!-- :class="{current:index === currentIndex}"-->
              <li
                      class="menu-item"
                      v-for="(goods,index) in searchgoods"
                      :key="index"
                      ref="menulist"
              >
                <a href="https://www.baidu.com">
                  <span style="color: black">{{goods.name}}</span>
                </a>
              </li>
            </ul>
          </div>
        </scroll >
        <!--右边-->
        <Scroll class="shop-wrapper" ref="scroll2">
          <div >
            <ul ref="shopsParent">
              <div class="shops-title">
                <h4>热门商品</h4>
                <a href="">查看更多 ></a>
              </div>
              <li class="shops-li" v-for="(goods,index1) in searchgoods" :key="index1">
                <ul class="shops-items">
                  <li v-for="(item,index2) in goods.items" :key="index2" @click="seach(item.title)">
                    <img :src="item.icon" alt="">
                    <span>{{item.title}}</span>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </Scroll>
      </div>
    </div>
  </div>

</template>

<script>
  import Scroll from 'components/common/scroll/Scroll'
    export default {
        name: "Search",
        data(){
            return{
                show:false,
                searchgoods:[
                    {
                        "name": "手机",
                        "items": [
                            {"icon":"https://img10.360buyimg.com/mobilecms/s405x405_jfs/t1/106477/22/17492/237011/5e876151E9c7fbd7b/1b476a83d5c54c69.jpg!q70.dpg.webp","title": "女装"},
                            {"icon": "https://img10.360buyimg.com/mobilecms/s405x405_jfs/t1/106477/22/17492/237011/5e876151E9c7fbd7b/1b476a83d5c54c69.jpg!q70.dpg.webp", "title": "秋上新"},
                            {"icon":"https://img10.360buyimg.com/mobilecms/s405x405_jfs/t1/106477/22/17492/237011/5e876151E9c7fbd7b/1b476a83d5c54c69.jpg!q70.dpg.webp","title": "女装"}

                        ]
                    },
                    {
                        "name": "手机",
                        "items": [
                            {"icon":"https://img10.360buyimg.com/mobilecms/s405x405_jfs/t1/106477/22/17492/237011/5e876151E9c7fbd7b/1b476a83d5c54c69.jpg!q70.dpg.webp","title": "女装"},
                            {"icon": "https://img10.360buyimg.com/mobilecms/s405x405_jfs/t1/106477/22/17492/237011/5e876151E9c7fbd7b/1b476a83d5c54c69.jpg!q70.dpg.webp", "title": "秋上新"},
                            {"icon":"https://img10.360buyimg.com/mobilecms/s405x405_jfs/t1/106477/22/17492/237011/5e876151E9c7fbd7b/1b476a83d5c54c69.jpg!q70.dpg.webp","title": "女装"}
                        ]
                    },
                    {
                        "name": "手机",
                        "items": [
                            {"icon":"https://img10.360buyimg.com/mobilecms/s405x405_jfs/t1/106477/22/17492/237011/5e876151E9c7fbd7b/1b476a83d5c54c69.jpg!q70.dpg.webp","title": "女装"},
                            {"icon": "https://img10.360buyimg.com/mobilecms/s405x405_jfs/t1/106477/22/17492/237011/5e876151E9c7fbd7b/1b476a83d5c54c69.jpg!q70.dpg.webp", "title": "秋上新"},
                            {"icon":"https://img10.360buyimg.com/mobilecms/s405x405_jfs/t1/106477/22/17492/237011/5e876151E9c7fbd7b/1b476a83d5c54c69.jpg!q70.dpg.webp","title": "女装"},

                        ]
                    },
                    {
                        "name": "手机",
                        "items": [
                            {"icon":"https://img10.360buyimg.com/mobilecms/s405x405_jfs/t1/106477/22/17492/237011/5e876151E9c7fbd7b/1b476a83d5c54c69.jpg!q70.dpg.webp","title": "女装"},
                            {"icon": "https://img10.360buyimg.com/mobilecms/s405x405_jfs/t1/106477/22/17492/237011/5e876151E9c7fbd7b/1b476a83d5c54c69.jpg!q70.dpg.webp", "title": "秋上新"},

                        ]
                    },
                    {
                        "name": "手机",
                        "items": [
                            {"icon":"https://img10.360buyimg.com/mobilecms/s405x405_jfs/t1/106477/22/17492/237011/5e876151E9c7fbd7b/1b476a83d5c54c69.jpg!q70.dpg.webp","title": "女装"},
                            {"icon": "https://img10.360buyimg.com/mobilecms/s405x405_jfs/t1/106477/22/17492/237011/5e876151E9c7fbd7b/1b476a83d5c54c69.jpg!q70.dpg.webp", "title": "秋上新"},

                        ]
                    },
                    {
                        "name": "手机",
                        "items": [
                            {"icon":"https://img10.360buyimg.com/mobilecms/s405x405_jfs/t1/106477/22/17492/237011/5e876151E9c7fbd7b/1b476a83d5c54c69.jpg!q70.dpg.webp","title": "女装"},
                            {"icon": "https://img10.360buyimg.com/mobilecms/s405x405_jfs/t1/106477/22/17492/237011/5e876151E9c7fbd7b/1b476a83d5c54c69.jpg!q70.dpg.webp", "title": "秋上新"},

                        ]
                    },
                    {
                        "name": "手机",
                        "items": [
                            {"icon":"https://img10.360buyimg.com/mobilecms/s405x405_jfs/t1/106477/22/17492/237011/5e876151E9c7fbd7b/1b476a83d5c54c69.jpg!q70.dpg.webp","title": "女装"},
                            {"icon": "https://img10.360buyimg.com/mobilecms/s405x405_jfs/t1/106477/22/17492/237011/5e876151E9c7fbd7b/1b476a83d5c54c69.jpg!q70.dpg.webp", "title": "秋上新"},

                        ]
                    },
                    {
                        "name": "手机",
                        "items": [
                            {"icon":"https://img10.360buyimg.com/mobilecms/s405x405_jfs/t1/106477/22/17492/237011/5e876151E9c7fbd7b/1b476a83d5c54c69.jpg!q70.dpg.webp","title": "女装"},
                            {"icon": "https://img10.360buyimg.com/mobilecms/s405x405_jfs/t1/106477/22/17492/237011/5e876151E9c7fbd7b/1b476a83d5c54c69.jpg!q70.dpg.webp", "title": "秋上新"},

                        ]
                    },
                    {
                        "name": "手机",
                        "items": [
                            {"icon":"https://img10.360buyimg.com/mobilecms/s405x405_jfs/t1/106477/22/17492/237011/5e876151E9c7fbd7b/1b476a83d5c54c69.jpg!q70.dpg.webp","title": "女装"},
                            {"icon": "https://img10.360buyimg.com/mobilecms/s405x405_jfs/t1/106477/22/17492/237011/5e876151E9c7fbd7b/1b476a83d5c54c69.jpg!q70.dpg.webp", "title": "秋上新"},

                        ]
                    },
                    {
                        "name": "手机",
                        "items": [
                            {"icon":"https://img10.360buyimg.com/mobilecms/s405x405_jfs/t1/106477/22/17492/237011/5e876151E9c7fbd7b/1b476a83d5c54c69.jpg!q70.dpg.webp","title": "女装"},
                            {"icon": "https://img10.360buyimg.com/mobilecms/s405x405_jfs/t1/106477/22/17492/237011/5e876151E9c7fbd7b/1b476a83d5c54c69.jpg!q70.dpg.webp", "title": "秋上新"},

                        ]
                    },
                    {
                        "name": "手机",
                        "items": [
                            {"icon":"https://img10.360buyimg.com/mobilecms/s405x405_jfs/t1/106477/22/17492/237011/5e876151E9c7fbd7b/1b476a83d5c54c69.jpg!q70.dpg.webp","title": "女装"},
                            {"icon": "https://img10.360buyimg.com/mobilecms/s405x405_jfs/t1/106477/22/17492/237011/5e876151E9c7fbd7b/1b476a83d5c54c69.jpg!q70.dpg.webp", "title": "秋上新"},

                        ]
                    },
                    {
                        "name": "手机",
                        "items": [
                            {"icon":"https://img10.360buyimg.com/mobilecms/s405x405_jfs/t1/106477/22/17492/237011/5e876151E9c7fbd7b/1b476a83d5c54c69.jpg!q70.dpg.webp","title": "女装"},
                            {"icon": "https://img10.360buyimg.com/mobilecms/s405x405_jfs/t1/106477/22/17492/237011/5e876151E9c7fbd7b/1b476a83d5c54c69.jpg!q70.dpg.webp", "title": "秋上新"},

                        ]
                    },
                    {
                        "name": "手机",
                        "items": [
                            {"icon":"https://img10.360buyimg.com/mobilecms/s405x405_jfs/t1/106477/22/17492/237011/5e876151E9c7fbd7b/1b476a83d5c54c69.jpg!q70.dpg.webp","title": "女装"},
                            {"icon": "https://img10.360buyimg.com/mobilecms/s405x405_jfs/t1/106477/22/17492/237011/5e876151E9c7fbd7b/1b476a83d5c54c69.jpg!q70.dpg.webp", "title": "秋上新"},

                        ]
                    },
                    {
                        "name": "手机",
                        "items": [
                            {"icon":"https://img10.360buyimg.com/mobilecms/s405x405_jfs/t1/106477/22/17492/237011/5e876151E9c7fbd7b/1b476a83d5c54c69.jpg!q70.dpg.webp","title": "女装"},
                            {"icon": "https://img10.360buyimg.com/mobilecms/s405x405_jfs/t1/106477/22/17492/237011/5e876151E9c7fbd7b/1b476a83d5c54c69.jpg!q70.dpg.webp", "title": "秋上新"},

                        ]
                    }
                ],
            }
        },
        components:{
          Scroll
        },
        created(){
            console.log("111")
        },
        mounted(){

            this.$refs.scroll1.init()
            // this.$refs.scroll2.refresh()
        },
        computed:{

        },
        methods: {
            //控制功能直达部件显示
            isShow(){
                this.show=true
            },
            seach(key)
            {

                console.log(key)
            },
        //    返回
            onClickLeft()
            {
                this.$router.back()
            }

        },
    }
</script>

<style scoped lang="stylus" >
  .category
    background: #f5f5f5
    width: 100%
    height: 100%
    overflow hidden
    .shop
      display flex
      position absolute
      top: 60px
      bottom: 50px
      width 100%
      overflow hidden
      .menu-wrapper
        background-color: #e0e0e0
        width 100vh
        flex 0 0 80px
        .menu-item
          width 100%
          height 60px
          background-color: #fafafa
          display flex
          justify-content center
          align-items center
          font-weight lighter
          color #666666
          position relative
        .current
          color #e02e24
        .current::before
          content:''
          background-color: #e02e24
          width 4px
          height 30px
          position absolute
          left: 0
      .shop-wrapper
        flex 1
        background-color: #fff
        .shops-title
          display flex
          flex-direction row
          padding 0 10px
          height: 44px
          align-items center
          justify-content space-between
          color #999
          a
            color #999
            text-decoration none
            font-weight: lighter
        .shops-items
          display flex
          flex-wrap wrap
          li
            display flex
            flex-direction column
            width 33.3%
            height 90px
            justify-content center
            align-items center
            color #666
            font-weight: lighter;
            font-size 14px
            img
              width 60%
              height 60%
              margin-bottom: 5px
        .phone-type
          width 100%
          display flex
          flex-direction row
          flex-wrap wrap
          border-bottom-1px(#ccc)
          li
            width 33.3%
            display flex
            justify-content center
            align-items center
            margin 5px 0
            img
              width 70%

</style>
