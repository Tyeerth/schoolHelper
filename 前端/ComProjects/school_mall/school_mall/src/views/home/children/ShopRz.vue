<template>
  <div>
    <!--头部导航栏-->
    <van-nav-bar
            title="商铺入驻"
            left-arrow
            @click-left="back"
    />
    <!--步骤条-->
    <van-steps :active="active" active-icon="success" active-color="#38f">
      <van-step>1.选择开店类型</van-step>
      <van-step>2.阅读开店须知</van-step>
      <van-step>3.申请开店认证</van-step>
    </van-steps>
    <div v-if="active==0">
      <div class="own">
        <div class="icon1">
          <van-icon name="friends-o" size="50" color="#ffd01e"/>
        </div>
        <div>
          <p class="p1">通过学生号及人脸实名认证得店铺即为个人店铺</p>
          <div class="bt1" @click="next">
            <van-button round block type="info"  color="linear-gradient(to right, #ffd01e, #ff6034)" native-type="submit">个人店铺</van-button>
          </div>
        </div>
      </div>
      <div class="company">
        <div class="icon2">
          <van-icon name="hotel-o" size="50" color="#ffd01e"/>
        </div>
        <div>
          <p class="p2">暂未开通此功能</p>
          <div class="bt2">
            <van-button round block type="info"  color="linear-gradient(to right, #ffd01e, #ff6034)" native-type="submit">企业店铺</van-button>
          </div>
        </div>
      </div>
    </div>
    <!--第二步-->
    <div v-if="active==1">
      <h4>1、我在淘宝已经开了个店了，我用别人的身份证再开一个店可以吗？</h4>
      <p>答：不可以。使用他人身份信息开店极易导致您的店铺经营管理状态及财产权益的不稳定甚至损害，由此产生的相关争议、纠纷及责任均由您自行承担。 如您存在将身份证借于他人开店或已借用他人身份证开店的情形，请您尽快通过淘宝店铺经营主体变更流程进行纠正，申请入口。</p>
      <h4>3、我可以开多个店铺吗？</h4>
      <p>答：同一会员已开设的店铺均须同时满足以下要求，才能获得多店权益：
        （一）近365天无出售假冒商品违规、严重违规、一般违规扣分达12分（含）以上等违规记录，且无其他风险特征；
        （二）满足一定经营条件（如近365天确认收货金额>=120万且近12个自然月持续有成交）</p>
      <h4>4、我已经开过淘宝店，现在想要注销原来的店铺重新开店，可以吗?</h4>
      <p>答：满足条件就可以注销。具体请参考：如何注销淘宝店铺。</p>

      <div class="shopInfo">
        <!--!&#45;&#45; 输入任意文本 &ndash;&gt;-->
        <van-field v-model="name" label="店铺名" />
        <div style="margin-left: 34%;margin-top: 10px">
          <van-uploader :after-read="afterRead" :max-count="1" v-model="fileList">
          </van-uploader>
          <span style="color:#dcdee0">店铺门面照</span>
        </div>

      </div>

      <div class="bt3" @click="backNext">
        <van-button round block type="info"  color="linear-gradient(to right, #ffd01e, #ff6034)" native-type="submit">上一步</van-button>
      </div>
      <div class="bt4" @click="go">
        <van-button round block type="info"  color="linear-gradient(to right, #ffd01e, #ff6034)" native-type="submit">我已了解，继续开铺</van-button>
      </div>
    </div>
    <!--第三步-->
    <div v-if="active==2">
      <div>
        用户类型：
        <van-radio-group v-model="user" direction="horizontal">
          <van-radio name="1">本校用户</van-radio>
          <van-radio name="2">外校用户</van-radio>
          <van-radio name="3">企业用户</van-radio>
        </van-radio-group>
      </div>
      <div class="tab">
        <div class="a" style="background-color: pink">
          <span>条件检测</span>
          <span>状态</span>
          <span>提示</span>
          <span>操作</span>
        </div>
        <div class="b" style="background-color: white">
          <span>学生证认证</span>
          <span>通过</span>
          <span>提示</span>
          <span>查看</span>
        </div>
        <div class="c">
          <span>人脸认证</span>
          <span>通过</span>
          <span>提示</span>
          <span>查看</span>
        </div>
      </div>
      <div class="bt5" @click="backNext2">
        <van-button round block type="info"  color="linear-gradient(to right, #ffd01e, #ff6034)" native-type="submit">上一步</van-button>
      </div>
      <div class="bt6" @click="submit">
        <van-button round block type="info"  color="linear-gradient(to right, #ffd01e, #ff6034)" native-type="submit">提交</van-button>
      </div>
    </div>
  </div>
</template>

<script>
    export default {
        name: "ShopRz",
        data(){
            return{
                active:0,
                user:1,
                name:'',
                fileList:[]
            }
        },
        methods:{
            back()
            {
                this.$router.back()
                this.active=0
            },
            next()
            {
                this.active=1
            },
            backNext()
            {
              this.active=0
            },
            go()
            {
                this.active=2
            },
            backNext2(){
                this.active=1
            },
            submit(){
                this.$router.push("/shopIssue")
            },
            afterRead(file) {
                // 此时可以自行将文件上传至服务器
                console.log(file);
            },
        }
    }
</script>

<style scoped lang="stylus">
.own{
  width: 40%;
  height: 200px;
  position: absolute;
  top:30%;
  left: 40px;
}
.icon1{
  position: relative;
left: 30px;
}
.p1{
  width: 130px;
}
  .bt1{
    width: 130px;
  }
.company{
  width: 40%;
  height: 200px;
  position: absolute;
  top:30%;
  right: 20px;
}
.icon2{
  position: relative;
  left: 20px;

}
.p2{
  width: 130px;
}
.bt2{

  width: 130px;
  margin-top: 55px;
}
  .bt3{
    width: 130px;
    position: absolute;
    bottom: -200px;
    left: 20px;
  }
  .bt4{
    width: 160px;
    position: absolute;
    bottom: -200px;
    left: 160px;
  }
.bt5{
  width: 130px;
  position: absolute;
  bottom: 20px;
  left: 40px;
}
.bt6{
  width: 160px;
  position: absolute;
  bottom: 20px;
  left: 180px;
}
  /*表格*/

  .tab{
    width: 100%;
    height: 300px;
    position: absolute;
    top:40%;
    left: 0px;
    div{
      width 100%
      height 40px;
      background-color #dcdee0
      display flex
      span{
        flex 1
        display block
        text-align center
        padding-top 8px
      }
    }
  }
</style>
