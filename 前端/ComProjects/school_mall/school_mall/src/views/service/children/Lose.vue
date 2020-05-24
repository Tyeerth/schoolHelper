<template>
  <div>
    <!--头部导航-->
    <van-nav-bar
            title="实物招领发布"
            left-arrow
            @click-left="back"
    />
    <van-field v-model="name" label="名称" placeholder="请输入实物名称"/>
    <van-field v-model="time" label="时间"  placeholder="格式：2020.4.26 17:50-2020.4.28 18:30"/>
    <van-field v-model="desc" label="实物描述"  rows="2"
               autosize
               type="textarea"
               maxlength="50"
               show-word-limit placeholder="请输入实物描述"/>
    <van-field v-model="address" label="地址"  placeholder="请输入实物地址"/>
    <van-radio-group v-model="flag">
      <van-cell-group>
        <van-cell title="拾取" clickable @click="radio = '1'">
          <template #right-icon>
            <van-radio name="1" />
          </template>
        </van-cell>
        <van-cell title="丢失" clickable @click="radio = '0'">
          <template #right-icon>
            <van-radio name="0" />
          </template>
        </van-cell>
      </van-cell-group>
    </van-radio-group>
    <div class="but" @click="issue">
      <van-button type="primary"  round color="linear-gradient(to right, #ffd01e, #ff6034)" size="large">实物发布</van-button>
    </div>
  </div>
</template>

<script>
    import {Toast} from 'vant'
    export default {
        name: "Lose",
        data(){
            return{
                name:"",
                desc:"",
                address:"",
                time:"",
                flag:0
            }
        },
        methods:{
            issue(){
                this.$http.post("/api/api/service/lose/issue",{
                    name:this.name,
                    desc:this.desc,
                    address:this.address,
                    time:this.time,
                    flag:this.flag
                }).then(()=>{
                    Toast.success("实物发布成功")
                    this.name=""
                    this.desc=""
                    this.address=""
                    this.time=""
                    this.flag=0
                }).catch(()=>{
                    Toast.success("实物发布成功")
                    this.name=""
                    this.desc=""
                    this.address=""
                    this.time=""
                    this.flag=0
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
