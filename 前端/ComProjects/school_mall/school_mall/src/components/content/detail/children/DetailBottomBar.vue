<template>
  <div class="bottom-bar" style="width: 100%">
    <van-goods-action >
      <van-goods-action-icon icon="chat-o" text="客服" dot />
      <van-goods-action-icon icon="cart-o" text="购物车" badge="5" />
      <van-goods-action-icon icon="shop-o" text="店铺" badge="12" />
      <van-goods-action-button type="warning" text="加入购物车" @click="Cart"/>
      <van-goods-action-button type="danger" text="立即购买" @click="buy"/>
    </van-goods-action>
    <van-sku
            ref="vanSku"
            @add-cart="addCart"
            @buy-clicked="buyClicked"

            close-on-click-overlay="ture"
            v-model="show"
            :sku="sku"
            :goods="goods"

    />
  </div>
</template>

<script>
  import {Toast} from 'vant'
    export default {
        name: "DetailBottomBar",
        data(){
            return{
                respGoods:{},
                a:{},
                show: false,
                goods: {
                    // 数据结构见下方文档
                },
                sku: {
                    // 所有sku规格类目与其值的从属关系，比如商品有颜色和尺码两大类规格，颜色下面又有红色和蓝色两个规格值。
                    // 可以理解为一个商品可以有多个规格类目，一个规格类目下可以有多个规格值。
                    tree: [
                        {
                            k: '属性', // skuKeyName：规格类目名称
                            //skus********************************
                            v: [
                                {
                                    id: "", // skuId：规格值 id
                                    name: "", // skuName：规格值名称
                                    imgUrl:"", // 规格类目图片，只有第一个规格类目可以定义图片
                                    previewImgUrl:"", // 用于预览显示的规格类目图片
                                }
                            ],
                            k_s: 's1' // skuKeyStr：sku 组合列表（下方 list）中当前类目对应的 key 值，value 值会是从属于当前类目的一个规格值 id
                        }
                    ],
                    // 所有 sku 的组合列表，比如红色、M 码为一个 sku 组合，红色、S 码为另一个组合
                    list: [
                        {
                            id:"", // skuId，下单时后端需要
                            price: "", // 价格（单位分）
                            s1:"" , // 规格类目 k_s 为 s1 的对应规格值 id
                            stock_num:"" // 当前 sku 组合对应的库存
                        }
                    ],
                    price:"", // 默认价格（单位元）###
                    stock_num:"", // 商品总库存####
                    none_sku: false, // 是否无规格商品
                    messages: [
                        {
                            // 商品留言
                            datetime: '0', // 留言类型为 time 时，是否含日期。'1' 表示包含
                            multiple: '1', // 留言类型为 text 时，是否多行文本。'1' 表示多行
                            name: '留言', // 留言名称
                            type: 'text', // 留言类型，可选: id_no（身份证）, text, tel, date, time, email
                            required: '0', // 是否必填 '1' 表示必填
                            placeholder: '' // 可选值，占位文本
                        }
                    ],
                    hide_stock: false // 是否隐藏剩余库存
                }
            }
        },
        props:{
            id:{
                type:null
            }
        },
        created(){
            this.$http.get('/api/api/goods/detail',{
                    params:{
                        id:this.id
                    }
                }
            ).then(res=>{
                this.a=res.data
                this.respGoods=this.a
               this.sku.tree[0].v[0].id=this.a.id
                this.sku.tree[0].v[0].name=this.a.title
                this.sku.tree[0].v[0].imgUrl=JSON.parse(this.a.img)[0]
                this.sku.tree[0].v[0].previewImgUrl=JSON.parse(this.a.img)[0]
                this.sku.list[0].id=this.a.id
                this.sku.list[0].price=this.a.price
                this.sku.list[0].s1=this.a.id
                this.sku.list[0].stock_num=this.a.goodsNum
                this.sku.price=this.a.price
                this.sku.stock_num=this.a.goodsNum
            }).catch(()=>{
            })
            // this.sku.tree[0].v[0].id=this.respGoods.id
            // this.sku.tree[0].v[0].name=this.respGoods.title
            // this.sku.tree[0].v[0].imgUrl=JSON.parse(this.respGoods.img)[0]
            // this.sku.tree[0].v[0].previewImgUrl=JSON.parse(this.respGoods.img)[0]
            // this.sku.list[0].id=this.respGoods.id
            // this.sku.list[0].price=this.respGoods.price
            // this.sku.list[0].s1=this.respGoods.id
            // this.sku.list[0].stock_num=this.respGoods.goodsNum
            // this.sku.price=this.respGoods.price
            // this.sku.stock_num=this.respGoods.goodsNum
        },
        methods:{
            //商品规格显示
            Cart(){
                // console.log("cart")
                this.show=true
            },
            buy()
            {
                this.show=true
            },
        //  购买，添加购物车
            buyClicked(skuData){

                console.log(skuData)
            },
            addCart(skuDate)
            {
                //    判断登陆与否
                this.$http.get("/accrite/verify").then(()=>{

                    this.$http.post("/api/api/cart/add",{
                            skuId:this.respGoods.id,
                            img:JSON.parse(this.respGoods.img)[0],
                            title:this.respGoods.title,
                            num:skuDate.selectedNum,
                            shopName:this.respGoods.shopName,
                            price:this.respGoods.price
                    }).then(()=>{
                        Toast.success("添加购物车成功，亲~~")
                        // this.$router.push("/cart")
                    })
                }).catch(()=>{
                    Toast.fail("亲，您还未登陆，请先登陆！")
                    // this.$router.push('/login')
                    window.location("http://localhost:8001/#/login?returnUrl=http://localhost:8001/#/detail/3914123")
                //    判断本地购物车是否有该件商品
                    var carts=this.get("CDTU_CART") || []
                    var cart=carts.find(cart=>cart.skuId==this.respGoods.id)
                    if(cart)
                    {
                        cart.num=cart.num+skuDate.selectedNum
                    }
                    else {
                        cart={
                            skuId:this.respGoods.id,
                            img:JSON.parse(this.respGoods.img)[0],
                            title:this.respGoods.title,
                            num:skuDate.selectedNum,
                            shopName:this.respGoods.shopName,
                            price:this.respGoods.price
                        }
                        carts.push(cart)
                    }
                    this.set("CDTU_CART",carts)
                    this.$router.push("/cart")
                })
            }

        }
    }
</script>

<style scoped>
.bottom-bar{
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
}
</style>
