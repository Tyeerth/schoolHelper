<template>
  <div class="detail">

    <!--&lt;!&ndash;头部导航&ndash;&gt;-->
    <detail-bar class="deailBar" @titleClick="titleClick" @backClick="backClick"></detail-bar>
    <Scroll class="content" ref="scroll">
      <detail-swiper :respGoods="respGoods" ref="base"></detail-swiper>
      <DetailBaseInfo :sku="respGoods"></DetailBaseInfo>
      <DetailCommit  ref="commit"></DetailCommit>
      <DetailImgInfo :sku="respGoods"  ref="paramAndImg"></DetailImgInfo>
    </Scroll>
    <!--底部导航-->
    <DetailBottomBar class="bottomBar" :id="id" :respGoods="respGoods"></DetailBottomBar>
  </div>
</template>

<script>
  import Scroll from 'components/common/scroll/Scroll'
  import DetailBottomBar from 'components/content/detail/children/DetailBottomBar'
  import DetailBar from 'components/content/detail/children/DetailBar'
  import DetailBaseInfo from 'components/content/detail/children/DetailBaseInfo'
  import DetailCommit from 'components/content/detail/children/DetailCommit'
  import DetailImgInfo from 'components/content/detail/children/DetailImgInfo'
  import DetailSwiper from 'components/content/detail/children/DetailSwiper'
    export default {
        name: "Detail",
        components:{
            DetailBar,
            DetailSwiper,
            DetailBaseInfo,
            Scroll,
            DetailImgInfo,
            DetailCommit,
            DetailBottomBar
        },
        data(){
            return{
                // show:false
                id:null,
                respGoods:null,
                spu:null,
                themeTops:[]
            }
        },
        created()
        {
            this.id=this.$route.params.id
            //过去spu信息
            // this.getSpu()
            this.$http.get('/api/api/goods/detail',{
                    params:{
                        id:this.id
                    }
                }
            ).then(res=>{
                this.respGoods=res.data
            }).catch(()=>{
            })
        },
        updated() {
            // 获取需要的四个offsetTop
            this._getOffsetTops()
        },
        methods:{
            backClick(){
                this.$destroy("detail")
                this.$router.back()
            },
            _getOffsetTops() {
                this.themeTops = []
                this.themeTops.push(0)
                this.themeTops.push(this.$refs.base.$el.offsetTop)
                this.themeTops.push(this.$refs.paramAndImg.$el.offsetTop)
                this.themeTops.push(this.$refs.commit.$el.offsetTop)
                // this.themeTops.push(this.$refs.recommend.$el.offsetTop)
                this.themeTops.push(Number.MAX_VALUE)
            },
            titleClick(index) {
                // console.log(index)
                // console.log(this.$refs.scroll)
                // console.log(this.themeTops[index]);
                this.$refs.scroll.scrollTo(0, -this.themeTops[index],300)
                // console.log(this.$refs.scroll)
                this.$refs.scroll.scrollTo(0,-1000)
            },
            // getSpu() {
            //     this.$http.get('/api/item',{
            //             params:{
            //                 spuId:this.id
            //             }
            //         }
            //     ).then(res=>{
            //         this.spu=res.data
            //     })
            // },
            //添加购物车
            addToCart(){this.$message.success("添加成功！")}
        }
    }
</script>

<style scoped lang="stylus">
  .deailBar
  {
    position: relative;
    z-index: 1;
    background-color: white;
  }
  .detail
  {
    width 100%
    position: relative;
    z-index: 1;
    height: 100vh;
    background-color: #fff;
  }
  .content
  {
    height: calc(100% - 44px);
    background-color: #fff;
  }
</style>
