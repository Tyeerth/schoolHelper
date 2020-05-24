<template>
  <div>

    <!--头部导航-->
    <van-nav-bar
            title="注册"
            left-arrow
            @click-left="back"
    />
    <div>
      <!-- 输入任意文本 -->
      <van-field v-model="username" label="用户名" />
      <!-- 输入手机号，调起手机号键盘 -->
      <van-field v-model="phone" type="tel" label="手机号" />
      <van-field
              v-model="code"
              center
              clearable
              label="短信验证码"
              placeholder="请输入短信验证码"
      >
        <template #button>
          <van-button size="small" type="primary" @click="getCode">发送验证码</van-button>
        </template>
      </van-field>
      <!-- 输入密码 -->
      <van-field v-model="password" type="password" label="密码" />
      <!--身份绑定-->
      <van-divider
              :style="{ color: ' #ff6034', borderColor: '#ffd01e', padding: '0 16px' }"
      >
        身份绑定
      </van-divider>
      <!-- 允许输入数字，调起带符号的纯数字键盘 -->
      <van-field v-model="room" type="number" label="寝室号" />
      <van-field v-model="card" type="number" label="学生证号" />
      <van-field name="radio" label="性别">
        <template #input>
          <van-radio-group v-model="gender" direction="horizontal">
            <van-radio name="1">男</van-radio>
            <van-radio name="2">女</van-radio>
          </van-radio-group>
        </template>
      </van-field>
      <van-field v-model="qq" type="number" label="QQ" />

      <div class="but" @click="registry">
        <van-button type="primary"  round color="linear-gradient(to right, #ffd01e, #ff6034)" size="large">注册</van-button>
      </div>
    </div>
  </div>
</template>

<script>
  import {Toast} from 'vant'
    export default {
        name: "Registry",
        data() {
            return {
                code:'',
                phone: '',
                username: '',
                room: '',
                password: '',
                qq:'',
                gender:'',
                card:''
            };
        },
        methods:{
            getCode(){
                if(this.phone=="")
                {
                    console.log("aaaa")
                }
                else {
                    this.$http.get("/api/api/user/code",{
                        params:{
                            phone:this.phone
                        }
                    })
                }
            },
            back()
            {
                this.$router.back()
            },
        //    注册
            registry()
            {
                this.$http.post("/api/api/user/register",this.$qs.stringify({
                    code:this.code,
                    phone: this.phone,
                    username:this.username,
                    room:this.room,
                    card:this.card,
                    qq:this.qq,
                    gender:this.gender,
                    password:this.password
                })).then((res)=>{
                    setTimeout(()=>{Toast.success("账号注册成功！即将为你跳转人脸录入...")
                    this.$router.push("/faceRegistry/"+res.data)
                        this.$destroy("Registry")
                    },"3000")
                }).catch(()=>{
                    setTimeout(()=>{Toast.success("账号注册成功！即将为你跳转人脸录入...")
                        this.$router.push("/faceRegistry/"+res.data)
                        this.$destroy("Registry")
                    },"3000")
                    Toast.fail("注册失败！")
                })
            }
        }
    }
</script>

<style scoped>
.but{
  width: 90%;
  position: absolute;
  top:80%;
  left:5%
}
</style>
