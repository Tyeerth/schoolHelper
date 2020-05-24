<template>
  <div>
    <!--头部导航-->
    <van-nav-bar
            title="校园跑腿"
            left-arrow
            @click-left="back"
    />
    <van-field v-model="name" label="发起人" placeholder="请输入发起人姓名"/>
    <van-field v-model="time" label="发起时间"  placeholder="格式：2020.4.26 17:50-2020.4.28 18:30"/>
    <van-field v-model="content" label="跑腿内容"  rows="2"
               autosize
               type="textarea"
               maxlength="50"
               show-word-limit placeholder="请输入跑腿内容+地址"/>
    <van-field v-model="phone" type="tel" label="发起人电话" />
    <div class="but" @click="issue">
      <van-button type="primary"  round color="linear-gradient(to right, #ffd01e, #ff6034)" size="large">跑腿发布</van-button>
    </div>
  </div>
</template>

<script>
    import {Toast} from 'vant'
    export default {
        name: "Run",
        data(){
            return{
                name:"",
                content:"",
                time:"",
                phone:""
            }
        },
        methods:{
            issue(){
                this.$http.post("/api/api/service/run/issue",{
                    name:this.name,
                    content:this.content,
                    phone:this.phone,
                    time:this.time
                }).then(()=>{
                    Toast.success("跑腿发起成功")
                    this.name=""
                    this.content=""
                    this.phone=""
                    this.time=""
                }).catch(()=>{
                    Toast.fail("服务器繁忙，跑腿发起失败")
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
