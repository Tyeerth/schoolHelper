<template>
  <div class="all">
    <div class="bg"></div>
    <div class="bg_bottom">
      <div style="color:#f7d680;position: relative;top: 10px;left: 15px;">
        <van-icon name="diamond-o" size="19px"/><span>欢迎来到CDTU微商城--LongLing</span>
      </div>
      <img src="../../assets/img/bg_card.png" style="width: 40%;height: 80%;position: relative;top: 40%;left:60%"/>
    </div>
    <div class="setting">
      <div class="newsIcon">
        <van-icon name="chat-o" dot size="20px"/>
      </div>
      <div class="settingIcon">
        <van-icon name="setting-o" size="20px"/>
      </div>
    </div>
    <div class="header">
      <div class="img">
        <van-image
                round
                fit="cover"
                width="3.5rem"
                height="3.5rem"
                src="https://img.yzcdn.cn/vant/cat.jpeg"
        />
      </div>
      <div class="username">
        <span>N晗</span>
      </div>
    </div>
    <div style="position: absolute;top:27%;left:0;width: 100%;height:5%;">
      <img src="../../assets/img/bg_bottom.png" style="width: 100%;height: 100%"/>
    </div>
    <div class="myOrder">
      <div class="title">
        <van-cell-group @click="moreOrder">
          <van-cell  title="我的订单" center  :title-style="{fontSize:'14px'}" value-class="test1"
                     value="查看全部订单"    is-link to="/orderDetail"/>
        </van-cell-group>
      </div>
      <div class="order">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-daifukuan"></use>
        </svg>
        <!--<span style="position: relative;top: 39px;left: -60px">待付款</span>-->
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-daifahuo"></use>
        </svg>
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-daishouhuo"></use>
        </svg>
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-tuikuanshouhou"></use>
        </svg>
      </div>
      <div class="bt_name1">
        <div class="a">
          <span>待付款</span>
        </div>
        <div class="a">
          <span>待收货</span>
        </div>
        <div class="a">
          <span>待发货</span>
        </div>
        <div class="a">
          <span>退款/售后</span>
        </div>
      </div>
    </div>

    <div class="second">
      <div class="myIssue">
        <div class="title">
          <van-cell-group @click="secondHome">
            <van-cell  title="二手之家" value="查看二手详情" center  is-link value-class="test2"/>
          </van-cell-group>
        </div>
        <div style="position: absolute;top: 50px;left: 30px">
          <van-icon name="add-o" size="32px" color=" #ff6034" />
        </div>
        <div class="bt_name2">
          <div class="b">
            <span>我的发布</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
    export default {
        name: "My",
        data(){
            return{
                userInfo:{},
                loading:false,
                active:0
            }
        },
        methods:{
            secondHome()
            {

            },
            moreOrder(){

            },
        },
        created(){

        }
    }
</script>

<style scoped>
  .all{
    width: 100%;
    height: 100%;
    position: absolute;
    top:0;
    left: 0;
    background-color: #f8f8f8;;
  }
  .bg{
    background:url(../../assets/img/bg2.png)  no-repeat center center;
    background-size:cover;
    width: 100%;
    height: 30%;
    /*border: #df5000 1px solid;*/
    /*border-radius:0 0 15px 15px;*/
    /*!*background-color: #df5000;*!*/
    /*!*background-color:rgba(0,0,0,0.2);*!*/
    /*background: linear-gradient(to bottom,#ff6034,#ffd01e);*/
    position: absolute;
    top:0px;
    left: 0px;
  }
  .bg_bottom{
    height: 8%;
    background-color: black;
    width: 90%;
    left: 5%;
    position: absolute;
    top:22%;
    border-radius: 8px 8px 0 0;
    overflow: hidden;
  }
  .setting{
    /*border: #07c160 1px solid;*/
    height: 28px;
  }
  .newsIcon {
    position: absolute;
    right: 48px;
    top:4px;
  }
  .settingIcon{
    position: absolute;
    right: 10px;
    top:4px;
  }
  .header
  {

    /*width: 100%;*/
    /*border: #07c160 1px solid;*/
    position: absolute;
    top:30px;
  }
  .username{
    position: relative;
    left:80px;
    bottom:40px;
    font-size:18px;
    font-weight: bold;
  }
  .img{
    position: relative;
    left:10px;
  }
  .myOrder{
    /*z-index: 1;*/
    width: 90%;
    left: 5%;
    background-color: white;
    position: absolute;
    top:33%;
    float: left;
    font-weight: bold;
    height: 18%;
  }
  .order{
    position: relative;
    top:7px
  }
  .second{
    width: 90%;
    height: 18%;
    left: 5%;
    position: absolute;
    font-weight: bold;
    top:54%;
    background-color: white;
  }
  .order{
    display: flex;

  }
  .icon
  {
    width: 2em;
    height: 2em;
    color: #df5000;
    flex: 1;
    /*color:linear-gradient(to right, #ffd01e, #ff6034);*/
  }
  .bt_name1{
    width: 94%;
    display: flex;
    position: relative;
    top: 20px;
    left: 30px;
    font-size: 15px;
    line-height: 1.8;
  }
  .a{
    flex: 2;
  }
  .bt_name2{
    position: relative;
    top: 40px;
    left: 20px;
    font-size: 15px;
    line-height: 1.8;
  }
  /*二手之家*/
.test1{
  font-size: 11px;
}
  .test2{
    font-size: 11px;
  }
</style>
