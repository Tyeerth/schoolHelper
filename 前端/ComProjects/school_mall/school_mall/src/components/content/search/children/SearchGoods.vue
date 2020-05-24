<template>
  <div class="home">
    <!--头部导航栏-->
    <van-nav-bar  fixed  left-arrow @click-left="back">
      <template #right>
        <van-search
                v-model="key"
                autofocus
                @input="input"
                @search="onsearch"
                @click="backSearchDetail"
                placeholder="请输入搜索关键词"
                shape="round"
        >
          <template #right-icon>
            <van-button round color="linear-gradient(to right, #ff976a, #ff6034)" size="mini" @click="onsearch2">搜索</van-button>
          </template>
        </van-search>
      </template>
    </van-nav-bar>
    <div class="searchGoods" v-if="!show">
      <!--过滤条件-->
      <div class="menu" >
        <van-dropdown-menu active-color="#ee0a24" >
          <van-dropdown-item v-model="value1" :options="option1" @change="filter1(value1)"/>
          <van-dropdown-item v-model="value2" :options="option2" @change="filter2(value2)"/>
        </van-dropdown-menu>
      </div>
      <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
        <van-list
                v-model="loading"
                :finished="finished"
                finished-text="没有更多了"
                @load="onLoad"
                error-text="网络错误"
        >
          <div class="goods" v-for="(goodsItem,index) in respGoods" :key="index">
            <div class="goodsItem"  @click="itemClick(goodsItem.id)">
              <div class="img">
                <img :src="JSON.parse(goodsItem.img)[0]" alt=""/>
              </div>
              <div class="goods-info">
                <p>{{goodsItem.title.substring(0,14)}}</p>
                <p>{{goodsItem.title.substring(14,goodsItem.title.length)}}</p>
                <!--<span>{{goodsItem.title}}</span>-->
                <p class="price">￥{{goodsItem.price}}</p>
                <p class="shop">{{goodsItem.shopName}}> </p>
              </div>
            </div>
          </div>
        </van-list>
      </van-pull-refresh>
    </div>
    <!--历史记录-->
    <div class="searchNav" v-if="show" style="margin-top: 60px">
      <div class="history" v-if="key==''">
        <div class="search-content">
          <div class="title">
            <img :src="require('assets/img/hot.png')" alt="" width="25">
            <span>热门搜索</span>
          </div>
          <div style="position: absolute;top:80px;right: 20px;color: #bdbdbd" @click="changeFlag" v-if="flag">隐藏</div>
          <div style="position: absolute;top:80px;right: 20px;color: #bdbdbd" @click="changeFlag" v-if="!flag">显示</div>
          <ul class="search-list" v-if="flag">
            <li @click="hotSearch">鸡爪零食</li>
            <li @click="hotSearch">吉他</li>
            <li @click="hotSearch">华为</li>
            <li @click="hotSearch">户外运动</li>
            <li @click="hotSearch">篮球</li>
            <li @click="hotSearch">刀具</li>
            <li @click="hotSearch">连衣裙夏</li>
          </ul>
        </div>
      </div>
      <div class="searchInfo" v-if="key!=''">
        <!--<div class="empty" v-if="infoList.length==0">-->
        <!--</div>-->
        <div class="hava" >
          <SearchInfo :list="infoList" @getInfo="getInfo" @infoItemClick="infoItemClick"></SearchInfo>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import SearchInfo from './SearchInfo'
    export default {
        name: "SearchGoods",
      components:{
        SearchInfo
      },
      data(){
        return{
            // hot:["鸡爪零食","吉他","华为","户外运动","篮球","刀具","oppo"],
            flag:true,
            //商品展示
            loading: false,
            finished: false,
            refreshing: false,
          // 过滤筛选
            option1: [
                { text: '综合', value: 0 },
                { text: '最新上架', value: 1 },
                { text: '价格最低', value: 2 },
                { text: '价格最高', value: 3 }
            ],
            option2:[
                {text:'其他',value:0},
                {text:'销量排序',value:4}
            ],
            option3: [
                { text: '有货优先', value: 0 },
                { text: '货到付款', value: 1 },
                { text: '免费跑腿', value: 2 }
            ],
            value1:0,
            value2:0,
          key:'',
          respGoods:[],
          page:0,
            show:true,
            pageInfo:0,
            infoList:[],
            infoShow:false,
            filter:0
        }
      },
      created()
      {
          if(this.$route.params.key==undefined)
          {
              this.search(this.filter)
          }
          if(this.$route.params.key!=undefined)
          {
              this.key=this.$route.params.key
              this.onsearch()
          }

      },
      methods:{
            hotSearch(){},
            //过滤
          filter1(value)
          {
              this.filter=value
              this.onsearch()
          },
          filter2(value)
          {
              this.filter=value
              this.onsearch()
          },
            onsearch2(){
                this.onsearch()
            },
            onsearch(){
                this.respGoods=[]
                this.search(this.filter)
                this.show=false
            },
            changeFlag(){
                this.flag=!this.flag
            },
          infoItemClick(value){
              this.key=value
              this.respGoods=[]
              this.search(this.filter)
              this.show=false
          },
            //当搜索框值发生变化时
          //  获取提示值下一页
          getInfo(){
              // const page=this.page
              this.pageInfo++
              this.$http.get("/api/api/goods/info",{
                  params:{
                      key:this.key,
                      page:this.pageInfo
                  }
              }).then(res=>{
                  this.infoList = res.data.items
              })
          },
          //当搜索框输入值时
          input(){
              this.infoShow=true
              this.$http.get("/api/api/goods/info",{
                  params:{
                      key:this.key,
                      page:1
                  }
              }).then(res=>{
                  this.infoList = res.data.items
                  if (res.data.items.length==0)
                  {
                      this.infoShow=false
                  }
              })
          },
          //****************************************************************************
            //商品展示
          onLoad() {
                  if (this.refreshing) {
                      this.respGoods = [];
                      this.refreshing = false;
                  }
                  this.loadMore()
                  this.loading = false;
              },
          onRefresh() {
              // 清空列表数据
              this.finished = false;
              // 重新加载数据
              // 将 loading 设置为 true，表示处于加载状态
              this.loading = true;
              this.page=0
              this.onLoad();
          },
          // 显示搜索信息
          backSearchDetail(){
              this.show=true
          },
        //  返回搜索页SearchDetail
          back()
          {
              //返回时销毁该组件，这样才会重新加载这个组件，才会得到数据，
              this.$destroy('SearchGoods')
              this.$router.back()
          },
          //商品详情
        itemClick(id){
            this.$router.push("/detail/"+id)
        },
          search(value){
            const pageNum=this.page+1
            // this.value=this.$route.params.value
            this.$http.get('/api/api/goods/page',{
                params:{
                  key:this.key,
                  page:pageNum,
                  filter:value
                }
              }
            ).then(res=>{
              // this.page+=1
              this.respGoods.push(...res.data.items)
                if (this.respGoods.length<this.page*20) {
                    this.finished = true;
                }

              //下拉加载一定要的一句话，不然滚不起
              // this.$refs.scroll.finishPullUp()
            }).catch(()=>{
            })
          },
      //  下拉加载更多数据
        loadMore()
        {
          this.search(this.filter);
        }
      }
    }
</script>

<style scoped lang="stylus" ref="stylesheet/stylus">
  /*@import "../../../../common/stylus/mixins.styl"*/
    .search-nav
      width 100%
      height 60px
      background-color #F6F6F6
      border-bottom-1px(#ddd)
      padding 0 20px
      display flex
      flex-direction row
      justify-content space-between
      align-items center
      .search-input
        display flex
        flex-direction row
        align-items center
        background-color: white
        width 85%
        height 38px
        border-radius 10px
        padding 0 10px
        input
          width 90%
          height 90%
          padding-left 8px
          font-size 16px
          /*background transparent*/
          outline none
      /*button*/
        /*background transparent*/
        /*font-size 16px*/
        /*color #aaa*/
  .content {
    position: absolute;
    overflow: hidden;

    top: 100px;
    bottom: 49px;
    right: 0;
    left: 0;
  }
  //  搜索商品展示样式
  .img{
    width:40%;
    height:130px;
    margin-left:10px;
  }
  .goodsItem {
    margin-bottom:10px;
    /*padding-bottom: 40px;*/
    position: relative;
    width: 96%;
    /*border:1px red solid*/
  }
  .goodsItem img {
    width: 100%;
    /*height: 200px;*/
    height:100%;
    border-radius: 5px;
  }

  .goods-info {
    width:54%;
    height:90%;
    /*border:1px red solid*/
    font-size: 13px;
    font-family bold
    position: absolute;
    bottom: 5px;
    /*left: 0;*/
    right: 0;
    overflow: hidden;
    text-align: center;
  }

  .goods-info p {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    margin-bottom: 0px;
  }


  .goods-info .price {
    color:orangered;
    font-size:14px;
    position:absolute
    left:10px;
    bottom:30px
  }
  .shop
  {
    color:#666666;
    font-size:10px;
    position:absolute
    left:10px;
    bottom:10px
  }
//  过滤条件
.menu{
  //z-index：1
  margin-top:60px
}
//热门搜索
  .search-content
    padding 30px 15px
    .title
      display flex
      flex-direction row
      align-items center
      color #aaa
      margin-bottom 10px
    .search-list
      display flex
      flex-direction row
      flex-wrap wrap
      li
        background #ededed
        color #aaa
        margin 5px 10px
        padding 5px
        border-radius 8px
        font-weight lighter
        font-size 12px
</style>
