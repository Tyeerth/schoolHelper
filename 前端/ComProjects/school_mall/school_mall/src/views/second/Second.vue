<template>
  <div>
    <!--导航栏-->
    <van-nav-bar
            left-text="二手广场"
            left-arrow
            @click-left="back"
    />
    <div >
      <div class="cart" v-for="(item,index) in second" :key="index">
        <div class="card">
          <van-card
                  :price="item.price"
                  :title="item.title"
                  :desc="item.shopName"
                  :thumb="item.img"
          >
          </van-card>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
    export default {
        name: "Second",
        data(){
            return{
                page:10,
                second:[]
            }
        },
        created(){
            this.getGoods()
        },
        methods:{
            back(){
                this.$router.push("/")
                console.log("1111111")
            },
            getGoods(){
                this.$http.get("/api/api/recommend/recommendList",{
                    params:{
                        pageNum:this.page
                    }
                }).then((res)=>{
                    this.second.push(...res.data.items)
                })
                this.page++
            },
        }
    }
</script>

<style scoped>

</style>
