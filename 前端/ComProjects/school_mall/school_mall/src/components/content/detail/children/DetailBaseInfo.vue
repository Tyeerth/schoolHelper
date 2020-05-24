<template>
  <div v-if="Object.keys(sku).length!==0" class="Info" style="background-color:#F5F5F5">
    <div class="price">
      <!--<img src="https://img11.360buyimg.com/jdphoto/s48x28_jfs/t1/69566/30/15738/1062/5dd3abb6Ea8fd7aa3/57c6a72435905414.png"/>-->
      <span class="n-price">￥{{sku.price}}</span>
    </div>
    <div class="title">
      <img src="https://img11.360buyimg.com/jdphoto/s48x28_jfs/t1/69566/30/15738/1062/5dd3abb6Ea8fd7aa3/57c6a72435905414.png" style="width: 20px;height: 15px"/>
      {{sku.subTitle}}
    </div>
    <!--<dvi class="space" style="background-color: white;width:200px;height: 60px;color: white" >*****************************************************************</dvi>-->
    <div class="buy-logo">
      <img :src="require('assets/img/buy.png')" style="height:13px;width:80px">
      <span style="font-size:13px;margin-left: 10px;color: #FF3030">破损包退换  上门换新</span>
    </div>
    <!--<div class="sub-title">{{spu.subTitle.substring(0,19)}}</div>-->
    <div class="other">
      库存<span class="stock">{{sku.stock}}</span>
      <span class="startgood">24小时内发货</span>
    </div>
    <div class="service">
      <div class="bq">
        <span style="color: #d3d4d6;font-size:10px;padding-top: 10px;margin-left:10px;display: block">服务</span>
      </div>
      <span style="color: #d3d4d6;font-size:10px;padding-top: 10px;margin-left:10px;display: block">服务</span>
      <div class="admit">
        <span class="1">延误必赔</span>
        <span class="2">送货到寝</span>
        <span class="3">质量不好包退</span>
      </div>
    </div>
    <div class="shop">
      <div class="shopInfo">
        <!--商铺logo-->
        <span>
            <img :src="sku.shopImg" class="shopLogo"/>
          </span>
        <!--商铺名-->
        <div class="shop_info_name">
          <p class="name">
            <span class="_n">泥火匠京东自营旗舰店</span>
            <em class="jd" style="font-size: 12px;color: #ff976a">  成工自营</em>
          </p>
        </div>
        <!--粉丝人数-->
        <div class="info_tab" id="shopBaseInfo" style="">
          <div class="tab_item">
            <p class="num">{{sku.shopFan}}</p>
            <p class="desc">粉丝人数</p>
          </div>
          <div class="tab_item">
            <p class="num">{{sku.goodsNum}}</p>
            <p class="desc">全部商品</p>
          </div>
        </div>
        <!--图标-->
        <div class="two">
          <div class="a">
            <div class="b">
              <van-icon name="star-o" size="21"/>
              <em>收藏店铺</em>
            </div>
          </div>
          <div class="a">
            <div class="b">
              <van-icon name="shop-o" size="21"/>
              <em>关注店铺</em>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
    export default {
        name: "DetailBaseInfo",
      props: {
        sku: {
          type: null
        }
      },
        created(){

        }

    }
</script>

<style scoped >
  .price{
    background-color: white;
    color: #dd6161;
    font-size: 21px;
    font-weight: bold;
    padding-top: 14px;
    padding-left: 10px;
  }
  .title
  {
    padding-top: 18px;
    background-color: white;
    color: black;
    font-weight: bolder;
    font-size: 16px;
    padding-right: 13px;
    padding-left: 13px;
  }
  .other
  {
    border-bottom:3px #dddddd solid;
    font-size: 10px;
    padding-bottom: 5px;
    padding-top: 15px;
  }
  .stock
  {
    margin-left: 5px;
    background-color: white;
  }
  .startgood
  {
    /*display: block;*/
    margin-left: 200px;
    /*margin-right: 0;*/
  }
  .admit
  {
    margin-bottom: 20px;
    display: flex;
    padding-top: 20px;
    padding-bottom: 14px;
    padding-left: 20px;
    color:#646566;
    font-size: 15px;
    font-weight: bold;
    border-bottom:4px #dddddd solid;

  }
  .admit span{
    flex: 1;
  }
  /*.bq .admit*/
  .service
  {
    width: 99%;
    height: 55px;
  }
  .admit{
    width: 90%;
    float: right;
    box-shadow: 10px 10px 10px rgba(0,0,0,.1);
  }
  .bq
  {
    width: 20%;
    float: left;
  }
  .buy-logo{
    background-color: #FFFAFA;

    padding-top: 10px;
    padding-left: 10px;
    /*border: #ff976a 1px solid;*/
    width:372px;
    height:33px
  }
  .shopInfo {
    border-radius: 20px;
    margin-top: 60px;
    width: 100%;
    height: 200px;
    /*border: #ff976a 1px solid;*/
    background-color: white;
  }
  .shopLogo{
    width: 57px;
    height: 30px;
    position: relative;
    left:40px;
    top:20px;
  }
  .shop_info_name p{

    /*border: #ff976a 1px solid;*/
    position: relative;
    /*right: px;*/
    /*top:18px;*/
    font-size: 12px;
  }
  .info_tab{
    height: 30%;
    width: 60%;
    /*border: #ff976a 1px solid;*/
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    position: relative;
    bottom: 20px;
    left: 18%;
  }
  .tab_item{
    height: 100%;
    width: 100%;
    /*border: #07c160 1px solid;*/
    flex: 1;
    width: 20%;
  }
  .num{
    position: relative;
    top: 0px;
    left: 60%;
    font-size: 16px;
  }
  .desc
  {
    position: relative;
    bottom: 13px;
    left: 50%;
    font-size: 12px;
    color: #A6A6A6;
  }
  /*收藏 关注*/
  .two{
    height: 18%;
    width: 62%;
    /*border: #ff976a 1px solid;*/
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    position: relative;
    bottom: 5px;
    left: 25%;
  }
  .a{
    margin-left: 8px;
    border-radius: 10px;
    height: 90%;
    width: 100%;
    border: #bdbdbd 1px solid;
    flex: 1;
    width: 20%;
  }
  .b{
    position: relative;
    top: 5px;
    left: 14%;
  }
  .b em{
    font-size: 12px;
  }
</style>
