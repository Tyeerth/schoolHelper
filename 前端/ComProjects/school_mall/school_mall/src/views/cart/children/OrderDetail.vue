<template>
  <div>
    <van-nav-bar
            title="确认订单"
            left-text="返回"
            left-arrow
            @click-left="back"
    />
    <!--地址-->
    <div class="address">
      <div class="right" @click="edit">
        <van-icon name="arrow" size="20px" color="#969799"/>
      </div>
      <div class="name">
        <span>周传芬</span>
      </div>
      <div class="phone">
        <span>13700997802</span>
      </div>
      <div>
        <van-icon name="location-o"  color="#ff976a" size="30px"/>
      </div>
      <div class="info">
        <span>四川省宜宾市珙县巡场镇88号艾纽</span>
      </div>
    </div>
    <div class="order">
      <div v-for="(item,index) in items" :key="index" >
        <van-card
                :num="item.num"
                :price="item.price"
                :desc="items.shopName"
                :title="item.title"
                :thumb="item.img"
        >
          <template #tags >
            <van-tag plain type="danger">待付款</van-tag>
          </template>
          <!--<template #footer>-->
          <!--<van-button size="mini">修改地址</van-button>-->
          <!--<van-button size="mini" color="linear-gradient(to right, #ffd01e, #ff6034)" @click="toPay(item)">付款</van-button>-->
          <!--</template>-->
        </van-card>
      </div>
      <div>
        <!--空白区域-->
        <div class="empty" v-if="items.length==0">
          <div class="empty_img" >
            <img src="../../../assets/img/empty.png" style="height: 100%;width: 100%"/>
          </div>
          <span class="empty_info">暂无相关信息</span>
        </div>
        <!--<img src="../../../assets/img/commend.png" style="width: 50%;margin-left: 20%"/>-->
      </div>
    </div>

    <!--提交订单-->
    <van-submit-bar :price="totalPrice*100" button-text="提交订单" @submit="onSubmit" />
    <!--<address-edit></address-edit>-->
  </div>
</template>

<script>
  // import AddressEdit from './AddressEdit'
    export default {
        name: "OrderDetail",
        components:{
            // AddressEdit
        },
        data(){
            return {
                totalPrice:0,
                items:[],
                chosenAddressId: '1',
                list: [
                    {
                        id: '1',
                        name: '张三',
                        tel: '13000000000',
                        address: '浙江省杭州市西湖区文三路 138 号东方通信大厦 7 楼 501 室',
                    }
                ]
            }
        },
        created(){
            // 获取传过来的参数
            var list = decodeURIComponent(this.$route.params.item);
            this.items = JSON.parse(list);
            for(var i=0;i<list.length;i++)
            {
                // console.log(this.items[i].price)
                // console.log(this.totalPrice)
                this.totalPrice=this.totalPrice+this.items[i].price
                console.log(this.totalPrice)
            }
        },
        methods:{
            edit(){
                this.$router.push("/addressList")
            },
            onSubmit(){
                this.$http.post("/api/api/order/order",{
                    totalPay:"",
                    actualPay:"",
                    paymentType:1,
                    receiver:'',
                    receiverMobile:'',
                    receiverAddress:'',
                    sourceType:'2'
                })
            },
            //返回
            back(){
                this.$router.back()
            },
            //地址编辑
            onEdit(item, index) {
                console.log(item)
                console.log(index)
            },
            add()
            {
                this.$router.push("/addressEdit")
            }
        }
    }
</script>

<style scoped>
.icon-prefix{
  size:30px
}
.space{
    width: 100%;
  height: 20%;
  position: absolute;
  bottom: 0px;
  left: 0px;
  background-color: white;
  /*z-index: 999;*/
  }
  .address{
    width: 98%;
    height: 15%;
    position:absolute;
    top: 58px;
    left: 1%;

    background-color: #f7f8fa;
    border-radius: 20px;
  }
  .order{
    width: 100%;
    height: 500px;
    position:absolute;
    top: 25%;
    /*left: 5%;*/

  }
  .name{
    width: 50%;
    height: 20%;
    position: relative;
    top: 10%;
    left: 20%;
    font-size: 18px;
  }
  .phone {
    width: 50%;
    height: 10%;
    position: relative;
    top: -5%;
    font-size: 15px;
    color: #969799;
    left: 40%;
  }
  .info{
    width: 70%;
    height: 10%;
    position: relative;
    top: -25%;
    left: 10%;
  }
.right {
  position: absolute;
  right: 3%;
  top: 38%;
}
</style>
