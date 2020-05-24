<template>
  <div>
    <!--<Scroll class="content">-->
      <!--导航栏-->
      <van-nav-bar
              left-text="购物车"
              :right-text="text"
              @click-right="manage"
      />
    <!--<van-pull-refresh v-model="isLoading" @refresh="onRefresh">-->
      <!--物品-->
    <div class="wrapper">
      <Scroll class="content">
        <div class="cart" v-for="(item,index) in carts" :key="index">
          <div class="radio" @click="xz">
            <!--<van-checkbox-group v-model="result[item]" ref="checkboxGroup">-->
            <van-checkbox  name="item" ref="checkbox"  v-model="result[index]" @change="change"></van-checkbox>
            <!--</van-checkbox-group>-->
            <!--<van-checkbox v-model="checked">复选框</van-checkbox>-->
          </div>
          <div class="card">
            <van-card
                    :price="item.price"
                    :title="item.title"
                    :desc="item.shopName"
                    :thumb="item.img"
            >
              <template #footer>
                <van-stepper v-model="item.num" min="1"  @plus="plus(item)"
                             @minus="minus(item)" />
              </template>
            </van-card>
          </div>
        </div>
        <!--结算-->
        <!--</van-pull-refresh>-->
      </Scroll>
      <div>
        <!--底部通栏-->
        <div id="tab_bar" v-if="flag">
          <div class="tab-bar-left">
            <a
                    href="javascript:;"
                    class="cart_check_box"
                    :checked="checked"
                    @click="checkAll"
            ></a>
            <span style="font-size: 16px;" >全选</span>
            <div class="select-all">
              合计：<span class="total-price"></span>
            </div>
          </div>
          <div class="tab-bar-right" @click="buy">
            <p class="pay">去结算</p>
          </div>
        </div>
      </div>
    </div>
    <div>
      <!--底部通栏-->
      <div id="tab_bar2" v-if="!flag">
        <div class="tab-bar-left2">
          <a
                  href="javascript:;"
                  class="cart_check_box2"
                  @click="checkAll"
                  :checked="checked"
          ></a>
          <span style="font-size: 16px;">全选</span>
        </div>
        <div class="tab-bar-right2" @click="deletex">
          <a href="#" class="pay2">删除</a>
        </div>
      </div>
  </div>
  </div>

</template>
<script>
  import {Toast} from "vant"
  // import Dialog from 'vant'
  import Scroll from 'components/common/scroll/Scroll'
  export default {
      name:'Cart',
      data(){
          return{
              test:{"a":"true"},
              text:"管理",
              flag:true,
              num:[],
              checked:true,
              result:[],
              isLoading: false,
              carts:[],
              isSelectedAll:false,//是否选中所有商品
              totalPrice:0,//总价格
              currentDelGoods:{},//当前删除的商品
          }
      },
      components:{
          Scroll
      },
      created(){
          this.getDate()
          // this.set("carts",[{"skuId":"001","price":"1156","img":"https://img.yzcdn.cn/vant/ipad.jpeg","title":"oppo小手机"},{"skuId":"002","price":"1956","img":"https://img.yzcdn.cn/vant/ipad.jpeg","title":"华为小手机"},{"skuId":"003","price":"1896","img":"https://img.yzcdn.cn/vant/ipad.jpeg","title":"xx小手机"}])
      //    获取购物车数据
      //    判断是否登陆，若没有登陆则从本地储存取数据
      },
      methods:{
          //结算
          buy(){

            var list=[]
              var j=0
              for ( var i = 0; i <this.carts.length; i++){
                  //赋予初值为true,默认全选中
                  if(this.result[i])
                  {
                      list[j]=this.carts[i]
                      j++
                  }
              }
              console.log(list)
              // 跳转路由传递对象参数
              var arr=JSON.stringify(list)
              this.$router.push("/js/"+encodeURIComponent(arr))
          },
          getDate(){
              this.$http.get("/accrite/verify").then(()=>{
                 this.$http.get("/api/api/cart/queryCarts").then((res)=>
                 {
                     console.log(res.data)
                     this.carts=res.data
                     for ( var i = 0; i <this.carts.length; i++){
                         //赋予初值为true,默认全选中
                         this.result[i]=true
                     }
                     // this.carts=this.get("CDTU_CART")
                     // this.carts.push(...res.data)
                 })
              }).catch(()=>{
                  //    未登录
                  this.carts=this.get("CDTU_CART")
                  for ( var i = 0; i <this.carts.length; i++){
                      //赋予初值为true,默认全选中
                      this.result[i]=true
                  }
              })
          },
          //删除加入购物车的商品
          deletex()
          {
              this.$dialog.confirm({
                  message: '确认删除商品'
              }).then(()=>{
                  for ( var i = 0; i <this.carts.length; i++){
                      //赋予初值为true,默认全选中
                      if(this.result[i])
                      {
                          this.$http.delete("/api/api/cart/"+this.carts[i].skuId).then(()=>{
                              this.getDate()
                          }).catch(()=>{
                              Toast.fail("网络错误，请刷新再试")
                          })
                          //这个是之前未登录状态删除本地商品的方法，现在弃用了，留个纪念，不删
                          // this.remove(this.carts[i].skuId)


                      }
                  }
              });
          },
          //
          change(){
              var a=0
              for ( var i = 0; i <this.carts.length; i++){
                  //赋予初值为true,默认全选中
                  if(!this.result[i])
                  {
                      a=1
                  }
              }
              if(a==0)
              {
                  this.checked=true
              }
              if(a==1)
              {
                  this.checked=false
              }
          },
          //购物车管理
          manage(){
                if(this.flag)
                {
                    this.text="完成"
                    this.flag=false
                }
                else {
                    this.text="管理"
                    this.flag=true
                }

          },
          updataNum(item){
              this.$http.post("/api/api/cart/updataNum",{
                  skuId:item.skuId,
                  img:item.img,
                  title:item.title,
                  num:item.num,
                  shopName:item.shopName,
                  price:item.price
              }).catch(()=>{
                  Toast.fail("服务器繁忙，稍后重试！")
              })
          },
          //减少
          minus(item){
              console.log(item)
              item.num--
              this.updataNum(item)
              //本地数量操作
              // var carts=this.get("CDTU_CART")
              // var cart=carts.find(cart=>cart.skuId==item.skuId)
              // cart.num--
              // this.set("CDTU_CART",carts)
          },
          plus(item){
              console.log(item)
              item.num++
              this.updataNum(item)
             // var carts=this.get("CDTU_CART")
             //  var cart=carts.find(cart=>cart.skuId==item.skuId)
             //  cart.num=cart.num+1
             //  this.set("CDTU_CART",carts)
          },
          //清楚全部
          toggleAll() {
              this.$dialog.confirm({
                  message: '确认删除全部商品'
              }).then(()=>{
                  for ( var i = 0; i <this.carts.length; i++){
                      //赋予初值为true,默认全选中
                      if(this.result[i])
                      {
                          this.$http.delete("/api/api/cart/"+this.carts[i].skuId).then(()=>{
                              Toast.fail("暂且商品，赶快去添加吧~~")
                              this.getDate()
                          }).catch(()=>{
                              Toast.fail("网络有错，请稍后再试")
                          })
                          //这个是之前未登录状态删除本地商品的方法，现在弃用了，留个纪念，不删
                          this.remove(this.carts[i].skuId)

                      }
                  }
              });
              // this.result=[]
              // this.$refs.checkboxGroup.toggleAll();
          },
          //全选
          checkAll() {

             if(this.checked)
             {
                 console.log(this.checked)
                 this.result=[]
                 // this.checked=false
                 for ( var i = 0; i <this.carts.length; i++){
                     //赋予初值为true,默认全选中
                     this.result[i]=false
                     console.log(this.result)
                 }
                 this.checked=false
             }
              else
              {
                  this.checked=true
                  this.result=[]
                  for ( var j = 0; j <this.carts.length; j++){
                      //赋予初值为true,默认全选中
                      this.result[j]=true
                      console.log(this.result)
                  }
              }

          },
          onRefresh(){
              this.isLoading=false
          },
          xz(){
              console.log(this.result)
          }
      }
  }
</script>
<style lang="stylus">
  .wrapper{
    position: fixed;
    left: 0;
    top: 55px;
    bottom:100px;
    width: 100%;
    overflow:hidden;
  }
  .cart{
    width: 100%;
    height:134px;
    /*border: #07c160 1px solid;*/
  }
.card{
  width: 93%;
  float: right;
}
  .radio{
    float: left;
    /*border: #07c160 1px solid;*/
    width: 5.5%;
    position: relative;
    top:25px;
    left: 0px;
  }
  /*底部通知栏*/
  #tab_bar
    position: fixed
    left 0
    bottom 44px
    width 100%
    height 44px
    background-color #fff
    display flex
    justify-content space-between
    align-items center
    box-shadow 0 -5px 5px #e0e0e0
    border-bottom: 1px solid #e0e0e0
    .tab-bar-left
      display flex
      align-items center
      margin-left 7px
      .cart_check_box
        float left
        background url("./images/shop-icon.png") no-repeat
        -webkit-background-size 50px 100px
        background-size 50px 100px
        width 20px
        height 20px
        margin-top 4px
        margin-left 4px
      .cart_check_box[checked]
        background-position -25px 0
      .select-all
        margin-left 8px
        font-size 16px
    .tab-bar-right
      .pay
        width 90px
        height 44px
        background-color #E9232C
        display flex
        justify-content center
        align-items center
        font-size 18px
        color #fff
        text-decoration none
  #tab_bar2
    position: fixed
    left 0
    bottom 44px
    width 100%
    height 44px
    background-color #fff
    display flex
    justify-content space-between
    align-items center
    box-shadow 0 -5px 5px #e0e0e0
    border-bottom: 1px solid #e0e0e0
    .tab-bar-left2
      display flex
      align-items center
      margin-left 7px
      .cart_check_box2
        float left
        background url("./images/shop-icon.png") no-repeat
        -webkit-background-size 50px 100px
        background-size 50px 100px
        width 20px
        height 20px
        margin-top 4px
        margin-left 4px
      .cart_check_box2[checked]
        background-position -25px 0
      .select-all2
        margin-left 8px
        font-size 16px
    .tab-bar-right2
      .pay2
        width 90px
        height 44px
        background-color #E9232C
        display flex
        justify-content center
        align-items center
        font-size 18px
        color #fff
        text-decoration none

</style>
