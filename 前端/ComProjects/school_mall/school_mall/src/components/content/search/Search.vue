<template>
  <div class="search">
    <!--头部导航栏-->
    <van-nav-bar  fixed  left-arrow @click-left="back">
      <!--<template #right>-->
        <!--<van-icon name="add-square" size="30" dot/>-->
      <!--</template>>-->
      <template #right>
        <van-search
                v-model="key"
                  @input="input"
                @search="onsearch"
                autofocus
                placeholder="请输入搜索关键词"
                shape="round"
        >
          <template #right-icon >
            <van-button round color="linear-gradient(to right, #ff976a, #ff6034)" size="mini" @click="search">搜索</van-button>
          </template>
        </van-search>
      </template>
    </van-nav-bar>
  </div>
</template>

<script>
    export default {
        name: "Search",
        data(){
            return{
                iisShow:false,
                list: [],
                page:1,
                //搜索框输入的值
                key:''
            }
        },
        methods:{
            //  获取提示值下一页
            getInfo(){
                // const page=this.page
                this.page++
                this.$http.get("/api/api/goods/info",{
                    params:{
                        key:this.key,
                        page:this.page
                    }
                }).then(res=>{
                    this.list = res.data.items
                })
            },
            //当搜索框输入值时
            input(){
                this.$http.get("/api/api/goods/info",{
                    params:{
                        key:this.key,
                        page:1
                    }
                }).then(res=>{
                    this.isShow=true
                    this.list = res.data.items
                    if (res.data.items.length==0)
                    {
                        this.isShow=false
                    }
                })
            },
            onsearch(){
                this.$router.push('/search/'+this.key)
            },
            search(){
                this.$router.push('/search/'+this.key)
            },
            //返回上一页
            back(){
                this.$router.back()
            }
        }
    }
</script>

<style scoped lang="stylus">

</style>
