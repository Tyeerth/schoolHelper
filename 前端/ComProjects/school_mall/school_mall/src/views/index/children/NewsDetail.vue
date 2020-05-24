<template>
  <div>
    <!--头部导航-->
    <van-nav-bar
            title="校园新闻"
            left-arrow
            @click-left="back"
    />
    <div class="title">
      <h3>
        {{item.title}}
      </h3>
    </div>
    <div class="bar">
      【时间: {{item.time}}】
      <div class="origin">【来源: {{item.origin}}】</div>
      <div class="unit">【编审: {{item.unit}}】</div>
    </div>
    <div>
      <van-divider
              :style="{ color: '#1989fa', borderColor: '#1989fa', padding: '0 16px' }"
      >
      </van-divider>
    </div>
    <div class="content">
      {{item.content}}
    </div>
  </div>
</template>

<script>
    export default {
        name: "NewsDetail",
        data(){
            return{
                id:"",
                item:{}
            }
        },
        created(){
            this.id=this.$route.params.id
            this.getDeatil()
        },
        methods:{
            back(){
                this.$router.back()
                this.$destroy("NewsDetail")
            },
            getDeatil()
            {
                this.$http.get("/api/api/service/schoolNews/detail",{
                    params:{
                        id:this.id
                    }
                }).then(res=>{
                   this.item=res.data
                })
            }
        }
    }
</script>

<style scoped>
.title {
  padding:10px;
}
.content{
  /*border: #df5000 1px solid;*/
    position: absolute;
  padding: 17px;
  font-size: 20px;
    top: 250px;
  letter-spacing: 3px;
    left: 0;
  }
</style>
