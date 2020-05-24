<template>
  <div>
    <div class="bg" @click="schoolService">
      <div class="service_logo">
        <img src="../../assets/img/index/school_service.png" style="width: 100%;height: 100%"/>
      </div>
      <div class="title">
        <em style="color: white;font-family: FZShuTi;font-size: 24px">校园服务</em>
      </div>
    </div>
    <div class="center_bar">
      <ServiceBar></ServiceBar>
    </div>
    <div>
      <div class="slide">
        <van-tabs @click="change" :border="false" :swipeable="true" :swipe-threshold="2" :animated="true" color="#FFEFD5" title-active-color="#EE0000">
          <van-tab title="日记分享" >
            <diary></diary>
          </van-tab>
          <van-tab title="最新新闻" >

          </van-tab>
          <van-tab title="实时疫情">
            内容 3
          </van-tab>
        </van-tabs>
      </div>
      <!--写日记-->
      <div class="add" v-show="num==0" @click="issue">
        <van-icon name="add" size="38" color="#B0E2FF"/>
      </div>
      <!--新闻筛选-->
      <div class="news" v-show="num==1">
        <news></news>
        <!--<van-icon name="qr-invalid" size="38" color="#B0E2FF"/>-->
      </div>
      <!--搜索-->
      <div class="search">
        <van-icon name="search" size="28" color="#FFFFFF"/>
      </div>
      <!--头像-->
      <div class="head_img">
        <van-image
                round
                width="2rem"
                height="2rem"
                src="https://img.yzcdn.cn/vant/cat.jpeg"
                fit="cover"
        />
      </div>
    </div>
  </div>

</template>

<script>
  import News from './children/News'
  import ServiceBar from 'components/content/serviceBar/ServiceBar'
    //心情日记
  import Diary from './children/Diary'
    export default {
        name: "index",
        data(){
          return{
              num:0
          }
        },
        methods:{
            issue(){
                this.$router.push('/issueDiary')
            },
            schoolService()
            {
                this.$router.push('/schoolService')
            },
            change(e)
            {
                this.num=e
            }
        },
        components:{
            ServiceBar,
            Diary,
            News
        }
    }
</script>

<style scoped>
  .bg{
    background:url(../../assets/img/index/index_bg.png) no-repeat center center;
    background-size:100% 100%;
    width: 100%;
    height: 98%;
    /*border: #df5000 1px solid;*/
    /*border-radius:0 0 15px 15px;*/
    /*!*background-color: #df5000;*!*/
    /*!*background-color:rgba(0,0,0,0.2);*!*/
    /*background: linear-gradient(to bottom,#ff6034,#ffd01e);*/
    position: absolute;
    top:0px;
    left: 0px;
  }
  .service_logo{
    width: 120px;
    height: 120px;
    position: absolute;
    top: 16%;
    left: 36%;
  }
  .title{
    position: absolute;
    top:34%;
    left: 39%;
  }
.slide{
  width: 100%;
  position: absolute;
  top:65%;
  left: 0px;
}
  /*写日记*/
  .add{
    position: fixed;
    /*position: absolute;*/
    bottom:10%;
    right: 4%;
  }
  /*搜索*/
  .search{
    position: absolute;
    right: 5%;
    top: 2%;
  }
  /*头像*/
  .head_img{
    position: absolute;
    left: 2%;
    top: 2%;
  }
  /*.news{*/
    /*position: fixed;*/
    /*!*position: absolute;*!*/
    /*bottom:10%;*/
    /*right: 4%;*/
  /*}*/
</style>
