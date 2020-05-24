<template>
  <div>
    <!--1.轮播图-->
    <!--轮播图-->
    <div style="">
      <van-swipe :autoplay="9000"  indicator-color="#ff976a" :height="350">
        <van-swipe-item v-for="(item, index) in JSON.parse(respGoods.img)" :key="index">
          <img v-lazy="item" style="width: 100%;height:100%"/>
        </van-swipe-item>
      </van-swipe>
    </div>
  </div>
</template>

<script>

    export default {
        name: "DetailSwiper",
        data(){
            return{
                //图片
            }
        },
      props:{
        respGoods:{
            type:null,
            default(){
              return []
            }
          }
      }
    }
</script>

<style scoped>

</style>
