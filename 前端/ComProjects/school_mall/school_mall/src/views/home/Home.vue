<template>
  <div>
    <!--回到顶部-->
    <el-backtop target=".page-component__scroll .el-scrollbar__wrap"></el-backtop>
    <!--发布弹出层-->
    <!--<van-popup-->
            <!--v-model="show"-->
            <!--:overlay=false-->
            <!--closible-->
            <!--position="top"-->
            <!--:style="{ height: '37%',backgroundColor:'#ff976a',marginTop:'55px',width:'30%',marginLeft:'260px',borderRadius:'20px'}"-->
    <!--&gt;-->
      <!--<h3 style="color: white;margin-left: 10px;margin-top: 30px">功能直达</h3>-->
      <div style="">
        <!-- 右滑进入 -->
        <transition name="van-slide-right">
          <div class="canvas" v-show="show">
            <ul>
              <li @click="scan">
                <van-icon name="scan" size="27" color="#fffbe8"/> 扫 一 扫
              </li>
              <li @click="shopRz">
                <van-icon name="shop-collect-o" size="27" color="#fffbe8"/> 商家入驻
              </li>
              <li @click="issue">
                <van-icon name="plus" size="27" color="#fffbe8"/> 二手发布
              </li>
              <li>
                <van-icon name="location-o" size="27" color="#fffbe8"/> 实时位置
              </li>
            </ul>
          </div>
        </transition>
      </div>
    <!--</van-popup>-->
    <!--头部导航栏-->
    <van-nav-bar  fixed   @click-right="isShow">
      <template #right>
        <van-icon name="add-square" size="30" dot/>
      </template>>
      <template #left>
        <van-search
                @click=" Search"
                disabled
                autofocus
                placeholder="请输入搜索关键词"
                shape="round"
        >
          <template #right-icon>
            <van-button round color="linear-gradient(to right, #ff976a, #ff6034)" size="mini" >搜索</van-button>
          </template>
        </van-search>
      </template>
    </van-nav-bar>

    <!--横向滚动条部分-->
    <div>
      <ly-tab
              class="ly-tab"
              v-model="selectedId"
              :items="items"
              :options="options">
      </ly-tab>
      <div class="bars" @click="category">
        <img :src="require('assets/img/category.png')" />
      </div>

    </div>
    <!--页面主体部分-->
    <div class="body">
      <!--上拉加载-->
      <div v-infinite-scroll="loadMore"
           infinite-scroll-disabled="downLoading"
           infinite-scroll-distance="10">>
        <!--下拉刷新-->
        <van-pull-refresh
                v-model="upLoading"
                success-text="刷新成功"
                @refresh="onRefresh"
        >
          <!--轮播图-->
          <div style="width: 93%;height:140px;border-radius:20px;margin:0 auto;border: #07c160 1px solid">
            <van-swipe :autoplay="3000" :height="140" indicator-color="#ff976a">
              <van-swipe-item v-for="(image, index) in images" :key="index">
                <img v-lazy="image" style="width: 100%;height:100%"/>
              </van-swipe-item>
            </van-swipe>
          </div>

          <div class="home_icon">
            <feature-view></feature-view>
          </div>

          <!--通知栏--播报最新消息+新上榜商铺-->
          <div style="margin-top: 13px">
            <img src="../../assets/img/mall_news.png" style="height: 18px"/>
            <van-notice-bar text="新品上市，排行新出!恭喜11周肯德基店铺，爱你肯店铺，天天即使送店铺，你呼我来店铺，饿了妈店铺，风车车店铺，为你服务店铺上本周排行榜！此类店铺值得信赖，优质挑购！" left-icon="volume-o" />
          </div>
          <!--商铺推荐--按照入驻商铺积分排名前12名客登上首页，1周更新一次-->
          <div class="title2">
            <!--<h>热门推荐</h>-->
            <img src="../../assets/img/sb2.png" width="50%"  >
          </div>
          <div>
            <shops-list :shops="shopsList"></shops-list>
          </div>

          <div class="title">
            <!--<h>热门推荐</h>-->
            <img src="../../assets/img/commend.png" width="50%" >
          </div>
          <div style="margin:13px auto;background-color: white;border-radius: 20px;border: #07c160 1px solid;width: 93%;padding: 10px 0;">
            <GoodsList :goods="goodsList"></GoodsList>
          </div>
          <!--<ul>-->
            <!--<li v-for="item in list" :key="item">{{ item }}</li>-->
          <!--</ul>-->
        </van-pull-refresh>
      </div>
      <BackTop class="back-top" @click.native="backTop" v-show="showTop"></BackTop>
    </div>
  </div>
</template>

<script>
  import GoodsList from 'components/content/goods/GoodsList'
  import ShopsList from 'components/content/shops/ShopsList'
  import FeatureView from 'views/home/children/FeatureView'
  import BackTop from 'components/common/backtop/BackTop'
    export default {
        name: "Home",
        components:{
            GoodsList,
            FeatureView,
            BackTop,
            ShopsList
        },
        data(){
            return{
                page:0,
                goodsList:[],
                shopsList:[],
                activeKey:0,
                //发布弹出层
                show:false,
                //返回顶部
                showTop:false,
                //图片
                images: [
                    "https://m.360buyimg.com/mobilecms/s700x280_jfs/t1/95842/38/12546/80187/5e4ba3e7E09e0da3b/92aac67aefdf6b6f.jpg!cr_1125x445_0_171!q70.jpg.dpg",
                    'https://img.yzcdn.cn/vant/apple-1.jpg',
                    'https://img.yzcdn.cn/vant/apple-2.jpg',
                    "http://www.yllook.com/attachment/images/2020/01/09/image_157855228157995349.jpg",
                    "https://www.yllook.com/attachment/images/2019/12/09/image_157589717555555751.jpg",
                    "https://m.360buyimg.com/mobilecms/s700x280_jfs/t1/100143/1/18651/140539/5e96edf0Ed62bf6a0/f0782dbce187467a.jpg!cr_1125x445_0_171!q70.jpg.dpg"
                ],
                downLoading:false,
                list:[1,2,3,4,5,6],
                upLoading:false,
                selectedId: 0,
                items:[
                    {label: '热门'},
                    {label: '书籍'},
                    {label: '手机'},
                    {label: '文具'},
                    {label: '日用'},
                    {label: '服装'},
                    {label: '运动'},
                    {label: '零食'},
                    {label: '虚拟'}
                ],
                options:{
                    activeColor:'#e9232c',//选中颜色
                },
            }
        },
        created()
        {
            // this.getGoods()
            this.getShop()

        },
        methods:{
              getShop(){
                  this.$http.get("/api/api/recommend/shop").then(res=>{
                      this.shopsList=res.data
                      console.log(res)
                  })
              },
            backTop(){
                document.body.scrollTop = document.documentElement.scrollTop = 0;
                this.showTop=false
            },
            //商铺入驻
            //二手发布
            issue(){
                this.$router.push('/issue')
                this.show=false
            },
            //扫一扫
            scan(){
                this.show=false
            },
            //商铺入驻
            shopRz(){
                this.$router.push('/shopRz')
                this.show=false
            },
            isShow(){
                this.show=!this.show
            },
            category(){
                this.$router.push('/category')
            },
            //搜索
            Search()
            {
                this.$router.push("/search")
            },
            // 下拉刷新
            onRefresh()
            {
                this.upLoading=true
                setTimeout(()=>{
                    this.upLoading=false
                },2000)
            },
            getGoods(){
                this.$http.get("/api/api/recommend/recommendList",{
                    params:{
                        pageNum:this.page
                    }
                }).then((res)=>{
                    this.goodsList.push(...res.data.items)
                })
                this.page++
            },
            //上拉加载
            loadMore() {
                if(document.documentElement.scrollTop>611)
                {
                    this.showTop=true
                }
                this.downLoading = true;
                this.getGoods()
                this.downLoading = false;
                // setTimeout(() => {
                //     let last = this.list[this.list.length - 1];
                //     for (let i = 1; i <= 10; i++) {
                //         this.list.push(last + i);
                //     }
                //
                // }, 25);
            }
        }
    }
</script>

<style scoped lang="stylus">
  .ly-tab{
    position: fixed;
    left: 0;
    top: 58px;
    z-index:1;
    background-color:white;
  }
  .bars{
    background: white;
    color:#ffffff;
    overflow: hidden;
    z-index:1;
    position: fixed;
    padding:5px;
    text-align:center;
    width: 33px;
    height:25px
    right: 0px;
    top: 63px;
  }
.body{
  margin-top:93px
}
  .canvas
  {
    background: #666666;
    color:#ffffff;
    overflow: hidden;
    z-index: 9999;
    position: fixed;
    padding:5px;
    text-align:center;
    width: 28%;
    height: 35%;
    right: 10px;
    top: 50px;
    border-radius: 7px;

  }
  .canvas ul
  {
    margin: 0;padding: 0;
    list-style-type: none;
    line-height: 3em;
  }
  .canvas ul li:hover
  {
    background-color: #cccccc;
  }
//图标

  .title{
   position relative;
    left 26%
    top:10px
  }
  .title2{
    padding-top 10px
    position relative;
    left 24%
    top:10px
    padding-bottom 25px
  }
  .back-top {
    position: fixed;
    bottom: 60px;
    right: 10px;
  }
</style>
