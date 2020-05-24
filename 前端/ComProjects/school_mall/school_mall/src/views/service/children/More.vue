<template>
  <div>
    <!--头部导航-->
    <van-nav-bar
            title="智能服务"
            left-arrow
            @click-left="back"
            @click-right="chat"
    >
      <template #right>
        <van-icon name="friends"  size="30" color=""/>
      </template>
      <!--<van-icon name="friends" />-->
    </van-nav-bar>
    <van-tree-select height="162vw" :items="items" :main-active-index.sync="active" @click-nav="clickItem">
      <template #content>
        <!--background-color: #ff976a"-->
        <div style="width: 100%;height: 100px;" v-if="active==0">
          <bubble></bubble>
        </div>
        <div style="width: 100%;height: 100px;" v-if="active==1">
          <Weather></Weather>
        </div>
        <div style="width: 100%;height: 100px;" v-if="active==2">
          <Xchat></Xchat>
        </div>
        <div style="width: 100%;height: 100px;" v-if="active==3">
          <Garbage></Garbage>
        </div>
        <div style="width: 100%;height: 100px;" v-if="active==4">
          <XH></XH>
        </div>

      </template>
    </van-tree-select>
    <!--<lemon-imui ref="IMUI" />-->
  </div>





</template>

<script>
import Bubble from './Bubble'
import Weather from './Weather'
import Xchat from './Xchat'
import XH from './XH'
import Garbage from './Garbage'
    export default {
        name: "More",
        components:{
            Bubble,
            Weather,
            Xchat,
            XH,
            Garbage
        },
        data() {
            return {
                active: 0,
                items: [{ text: '抗击疫情' }, { text: '天气查询' },{ text: '闲聊' }, { text: '垃圾分类' },{ text: '笑话' }, { text: '情感分析' },{text:'智能翻译'}],
                yqList:[],
            };
        },

        methods:{
            chat(){
                this.$router.push("/chat")
            },
            back()
            {
                this.$router.back()
            },
            clickItem(index){
               if(index==0)
               {
                  this.yq()
               }
            },
            //抗击疫情
            yq(){
                this.$http.post("/api/api/service/unit",this.$qs.stringify({
                    query:"疫情情况",
                    botId:"1026452",
                    userId:"001"
                })).then(res=>{
                    this.yqList=res.data.result.response.action_list[0]
                    console.log(res.data.result.response.action_list)
                })
            }
        }
    }
</script>

<style scoped>
</style>
