<template>
  <div>
    <!--头部导航-->
    <van-nav-bar
            title="登陆"
            right-text="更多"
            left-arrow
            @click-left="back"
            @click-right="more"
    />
    <div class="but">
      <van-button type="primary" to="/faceLogin" round color="linear-gradient(to right, #ffd01e, #ff6034)" size="large">扫脸登陆</van-button>
    </div>
    <div class="message" @click="messageLogin">
      <span style="color: #969799">账号密码登陆</span>
    </div>

    <van-popup v-model="show" position="bottom" :style="{ height: '20%'}">
      <van-cell-group @click="registy">
        <van-cell  value="注册" center  is-link/>
      </van-cell-group>
      <van-cell-group  @click="cancel">
        <van-cell  value="取消"  center is-link />
      </van-cell-group>
    </van-popup>
  </div>
</template>

<script>
    export default {
        name: "Login",
        data(){
            return{
                show:false
            }
        },
        methods:{
            back()
            {
                this.$router.push("/")
                this.$destroy('Login')
            },
            more(){
                this.show=true
            },
            cancel()
            {
                this.show=false
            },
            //注册
            registy()
            {
                this.$router.push('/registry')
                this.$destroy('Login')
            },
            messageLogin()
            {
                this.$router.push("/messageLogin")
                this.$destroy('Login')
            }
        }
    }
</script>

<style scoped>
.but{
  width: 90%;
  position: absolute;
  top:30%;
  left:5%
}
  .message{
    width: 27%;
    position: absolute;
    top:42%;
    left:35%
  }
</style>
