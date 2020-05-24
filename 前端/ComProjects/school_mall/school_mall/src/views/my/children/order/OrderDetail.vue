<template>
  <div>
    <!--头部导航-->
    <van-nav-bar
            title="我的订单"
            left-arrow
            @click-left="back"
    />
    <van-tabs v-model="active" @click="tabClick">
      <van-tab title="全部">
        <div v-for="(item,index) in orderList" :key="index">
          <van-card
                  :num="item.orderDetails[0].num"
                  :price="item.orderDetails[0].price"
                  desc="描述信息"
                  :title="item.orderDetails[0].title"
                  :thumb="item.orderDetails[0].image"
          >
            <template #tags >
              <van-tag plain type="danger" v-if="item.status==1">待付款</van-tag>
              <van-tag plain type="danger" v-if="item.status==2">付款</van-tag>
            </template>
            <template #footer >
              <van-button size="mini" v-if="item.status==1">修改地址</van-button>
              <van-button size="mini" v-if="item.status==1"  color="linear-gradient(to right, #ffd01e, #ff6034)" @click="toPay(item)">付款</van-button>
              <van-button size="mini"  v-if="item.status==2" color="linear-gradient(to right, #ffd01e, #ff6034)">交易完成</van-button>
            </template>
          </van-card>
        </div>
        <div>
          <!--空白区域-->
          <div class="empty" v-if="orderList[0]==undefined">
            <div class="empty_img">
              <img src="../../../../assets/img/empty.png" style="height: 100%;width: 100%"/>
            </div>
            <span class="empty_info">暂无相关信息</span>
          </div>
          <img src="../../../../assets/img/commend.png" style="width: 50%;margin-left: 20%"/>
        </div>
      </van-tab>
      <van-tab title="待付款">
        <div v-for="(item,index) in obligation" :key="index">
          <van-card
                  :num="item.orderDetails[0].num"
                  :price="item.orderDetails[0].price"
                  desc="描述信息"
                  :title="item.orderDetails[0].title"
                  :thumb="item.orderDetails[0].image"
          >

            <template #tags >
              <van-tag plain type="danger">待付款</van-tag>
            </template>
            <template #footer>
              <van-button size="mini">修改地址</van-button>
              <van-button size="mini" color="linear-gradient(to right, #ffd01e, #ff6034)" @click="toPay(item)">付款</van-button>
            </template>
          </van-card>
        </div>
        <div>
          <!--空白区域-->
          <div class="empty" v-if="obligation.length==0">
            <div class="empty_img" >
              <img src="../../../../assets/img/empty.png" style="height: 100%;width: 100%"/>
            </div>
            <span class="empty_info">暂无相关信息</span>
          </div>
          <img src="../../../../assets/img/commend.png" style="width: 50%;margin-left: 20%"/>
        </div>
      </van-tab>
      <van-tab title="待发货">
        <div v-for="(item,index) in sendGoods" :key="index">
          <van-card
                  :num="item.orderDetails[0].num"
                  :price="item.orderDetails[0].price"
                  desc="描述信息"
                  :title="item.orderDetails[0].title"
                  :thumb="item.orderDetails[0].image"
          >

            <template #tags >
              <van-tag plain type="danger">待发货</van-tag>
            </template>
            <template #footer>
              <van-button size="mini">修改地址</van-button>
              <!--<van-button size="mini" color="linear-gradient(to right, #ffd01e, #ff6034)" @click="toPay(item)">付款</van-button>-->
            </template>
          </van-card>
        </div>
        <div>
          <!--空白区域-->
          <div class="empty" v-if="sendGoods[0]==undefined">
            <div class="empty_img">
              <img src="../../../../assets/img/empty.png" style="height: 100%;width: 100%"/>
            </div>
            <span class="empty_info">暂无相关信息</span>
          </div>
          <img src="../../../../assets/img/commend.png" style="width: 50%;margin-left: 20%"/>
        </div>
      </van-tab>
      <van-tab title="待收货">
        <div v-for="(item,index) in obligation" :key="index">
          <van-card
                  :num="item.orderDetails[0].num"
                  :price="item.orderDetails[0].price"
                  desc="描述信息"
                  :title="item.orderDetails[0].title"
                  :thumb="item.orderDetails[0].image"
          >

            <template #tags >
              <van-tag plain type="danger">待收货</van-tag>
            </template>
          </van-card>
        </div>
        <div>
          <!--空白区域-->
          <div class="empty" v-if="recevie[0]==undefined">
            <div class="empty_img" >
              <img src="../../../../assets/img/empty.png" style="height: 100%;width: 100%"/>
            </div>
            <span class="empty_info">暂无相关信息</span>
          </div>
          <img src="../../../../assets/img/commend.png" style="width: 50%;margin-left: 20%"/>
        </div>
      </van-tab>
    </van-tabs>

  </div>
</template>

<script>
    export default {
        name: "OrderDetail",
        data() {
            return {
                active: 0,
                orderList:[],
                //代发货
                sendGoods:[],
                //待付款
                obligation:[],
                //待收货
                recevie:[]

            }
        },
        methods:{
            back()
            {
                this.$router.back()
            },
            tabClick()
            {
                //查询所有订单
                if(this.active==0)
                {
                    this.orderFindAll()
                }
                //查询待付款得
                if(this.active==1)
                {
                    this.getObligation()
                }
                if(this.active==2)
                {
                    this.getSendGoods()
                }
            },
        //    付款
            toPay(item){
                this.$http.post("/alipay/toPay",this.$qs.stringify(
                    {
                        out_trade_no:item.orderId,
                        total_amount:item.actualPay,
                        subject:item.orderDetails[0].title,
                        body:"成工出品"+item.orderDetails[0].title
                    }
                )).then(resp=>{
                    // 添加之前先删除一下，如果单页面，页面不刷新，添加进去的内容会一直保留在页面中，二次调用form表单会出错
                    const divForm = document.getElementsByTagName('divform')
                    if (divForm.length) {
                        document.body.removeChild(divForm[0])
                    }
                    const div = document.createElement('divform')
                    div.innerHTML = resp.data // data就是接口返回的form 表单字符串
                    document.body.appendChild(div)
                    // document.forms[0].setAttribute('target', '_blank') // 新开窗口跳转
                    document.forms[0].submit()
                })
            },
        // 查询全部订单
            orderFindAll()
            {
                this.$http.get("/alipay/order/list",{
                    params:{
                        page:'1',
                        rows:'5'
                    }
            }).then(({data})=>{

                    this.orderList=data.items
                })
            },
            //查询待付款得
            getObligation()
            {
                this.$http.get("/alipay/order/list",{
                    params:{
                        page:'1',
                        rows:'5',
                        status:"1"
                    }

                }).then(({data})=>{

                    this.obligation=data.items
                })
            },
        //    sendGoods
            getSendGoods()
            {
                this.$http.get("/alipay/order/list",{
                    params:{
                        page:'1',
                        rows:'5',
                        status:"2"
                    }

                }).then(({data})=>{

                    this.sendGoods=data.items
                })
            }

        },
        created(){
            this.$http.get("/accrite/verify").then(()=>{
                this.orderFindAll()
            }).catch(()=>{
                // window.location("http://localhost:")
                this.$router.push("/login")
            })
        }
    }
</script>

<style scoped>
/*<!--空白照片-->*/
.empty
{
  position: relative;
  top: 0px;
  width: 90%;
  left: 5%;
  height:310px;
  /*border: #df5000 1px solid;*/
}
  .empty_img{
    width: 90px;
    height: 90px;
    position: relative;
    top:30%;
    left: 35%;
  }
  .empty_info{
    position: relative;
    bottom: -120px;
    left: 35%;
  }
</style>
