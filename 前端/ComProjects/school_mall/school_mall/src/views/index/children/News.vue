<template>
  <div>
    <div class="list">
      <scroll class="content"
              ref="scroll"
              :probeType="3"
              :pull-up-load="true"
              @pullingUp="loadMore"
      >
        <van-cell v-for="item in list" :key="item.id" :title="item.title" :value="item.time"  @click="detail(item.id)"/>
      </scroll>
      <!--<van-list-->
              <!--v-model="loading"-->
              <!--:finished="finished"-->
              <!--finished-text="没有更多了"-->
              <!--@load="onLoad"-->
      <!--&gt;-->

      <!--</van-list>-->
    </div>
    <div class="news" @click="show">
      <van-icon name="qr-invalid" size="38" color="#B0E2FF"/>
    </div>
    <!-- 右滑进入 -->
    <transition name="van-slide-up">
      <div class="pan" v-show="visible">
        <p @click="flag0">成工要闻</p>
        <p @click="flag1">校园新闻</p>
        <p @click="flag2">校园文化</p>
        <p @click="flag3">教育信息</p>
        <!--<p @click="flag4">成工自媒体</p>-->
      </div>
    </transition>
  </div>
</template>

<script>
  import Scroll from 'components/common/scroll/Scroll'
    export default {
        name: "News",
        data() {
            return {
                list: [],
                loading: false,
                finished: false,
                page:0,
                flag:0,
                visible:false
            }
        },
        created(){
            this.getNews()
        },
        components:{
            Scroll
        },
        methods:{
            detail(id){
                this.$router.push("/newsDetail/"+id)
            },
            show(){
                this.visible=!this.visible
            },
            flag0()
            {
                this.list=[]
                this.page=0
                this.flag=0
                this.getNews()
            },
            flag1(){
                this.list=[]
                this.page=0
                this.flag=1
                this.getNews()
            },
            flag2(){
                this.list=[]
                this.page=0
                this.flag=2
                this.getNews()
            },
            flag3(){
                this.list=[]
                this.page=0
                this.flag=3
                this.getNews()
            },
            flag4(){
                this.list=[]
                this.page=0
                this.flag=4
                this.getNews()
            },
            loadMore() {
                // 异步更新数据
                // setTimeout 仅做示例，真实场景中一般为 ajax 请求

                    this.page++
                    this.getNews()
                    // // 加载状态结束
                    // this.loading = false;
                    //
                    // // 数据全部加载完成
                    // if (this.list.length >= 15) {
                    //     this.finished = true;
                    // }
            },
            getNews()
            {
                this.$http.get("/api/api/service//schoolNews/getByFlag",{
                    params:{
                        flag:this.flag,
                        page:this.page
                    }
                }).then(res=>{
                    this.list.push(...res.data)
                    this.$refs.scroll.finishPullUp()
                    this.page++
                })
            }
        }
    }
</script>

<style scoped lang="stylus">
  .news{
    position: fixed;
    /*position: absolute;*/
    bottom:10%;
    right: 4%;
  }
  .list{
    /*position: relative;*/
    /*top:250px;*/
    /*left: 0;*/
    /*padding-top: 44px;*/
    position: relative;
    top:520px;
    left: 0;
    /*border: #df5000 1px solid;*/
    height: 37vh;
  }
  .content{
    position: absolute;
    overflow: hidden;
    top: 0;
    /*right: 0;*/
    left: 0;
  }
  .pan{
    z-index 11111
    width:20%
    height: 20%
    background-color #ff976a
    position absolute
    bottom 70px
    right 70px
    border #df5000 3px solid
    border-radius 6px
    p{
      position relative
      left 5px
    }
  }
</style>
