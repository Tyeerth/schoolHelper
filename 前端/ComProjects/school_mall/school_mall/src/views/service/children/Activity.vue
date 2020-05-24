<template>
  <div>
    <!--头部导航-->
    <van-nav-bar
            title="活动发布"
            left-arrow
            @click-left="back"
    />
    <van-field v-model="name" label="活动名称" placeholder="请输入活动名称"/>
    <van-field v-model="time" label="活动时间"  placeholder="格式：2020.4.26 17:50-2020.4.28 18:30"/>
    <van-field v-model="content" label="活动内容"  rows="2"
               autosize
               type="textarea"
               maxlength="50"
               show-word-limit placeholder="请输入活动内容"/>
    <van-field v-model="address" label="活动地址"  placeholder="请输入活动地址"/>
    <div class="but" @click="issue">
      <van-button type="primary"  round color="linear-gradient(to right, #ffd01e, #ff6034)" size="large">活动发布</van-button>
    </div>
  </div>
</template>

<script>
  import {Toast} from 'vant'
    export default {
        name: "Activity",
        data(){
            return{
                name:"",
                content:"",
                address:"",
                time:""
            }
        },
        methods:{
            issue(){
                this.$http.post("/api/api/service/activity/issue",{
                    name:this.name,
                    content:this.content,
                    address:this.address,
                    time:this.time
                }).then(()=>{
                    Toast.success("活动发布成功")
                    this.name=""
                    this.content=""
                    this.address=""
                    this.time=""
                }).catch(()=>{
                    Toast.fail("服务器繁忙，活动发布失败")
                })
            },
            back(){
                this.$router.back()
            }
        }
    }
</script>

<style scoped>
  .but{
    width: 90%;
    position: absolute;
    top:60%;
    left:5%
  }
</style>
