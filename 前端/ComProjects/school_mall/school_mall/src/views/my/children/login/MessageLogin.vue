<template>
  <div>
    <!--头部导航-->
    <van-nav-bar
            title="登陆"
            left-arrow
            @click-left="back"
    />
    <div class="login">
      <van-form @submit="onSubmit">
        <van-field
                v-model="username"
                name="用户名"
                label="用户名"
                placeholder="用户名"
                :rules="[{ required: true, message: '请填写用户名' }]"
        />
        <van-field
                v-model="password"
                type="password"
                name="密码"
                label="密码"
                placeholder="密码"
                :rules="[{ required: true, message: '请填写密码' }]"
        />
        <div style="margin: 16px;">
          <!--<van-button type="primary"  round color="linear-gradient(to right, #ffd01e, #ff6034)" size="large">注册</van-button>-->
          <van-button round block type="info"  color="linear-gradient(to right, #ffd01e, #ff6034)" native-type="submit">
            提交
          </van-button>
        </div>
      </van-form>
    </div>
  </div>
</template>

<script>
    import { Toast } from 'vant';
    export default {
        name: "MessageLogin",
        data(){
            return{
                username: '',
                password: '',
            }
        },
        methods:{
            back()
            {
                this.$router.back()
            },
            onSubmit() {
                this.$http.post("/accrite/login",this.$qs.stringify({
                    username:this.username,
                    password: this.password
                })).then(()=>{
                    Toast.success('登陆成功');
                    this.$router.push("/my")
                }).catch(()=>{
                    Toast.fail('账号或密码不正确，请重新登陆！');
                    this.username=""
                    this.password=""
                })
            }
        }
    }
</script>

<style scoped>
.login{
  width: 90%;
  position: absolute;
  top:30%;
  left:5%
}
</style>
