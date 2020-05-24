<template>
  <div class="goods"  @click="itemClick">
    <img :src="shopItem.shopImg" alt=""/>
    <div class="goods-info">
      <p>{{shopItem.shopName}}</p>
      <!--<span>{{goodsItem.title}}</span>-->
      <span class="price">{{shopItem.price}}</span>
    </div>
  </div>

</template>

<script>
    export default {
        name: "ShopsItem",
        props:{
            shopItem:{
                type:null,
                default(){
                    return []
                }
            }
        },
        methods:{
            // loadImg()
            // {
            //   this.$bus.$emit("loadRefresh")
            // },
            itemClick()
            {
                // this.$router.push('/detail/'+this.goodsItem.id)
            }
        }
    }
</script>

<style scoped>
  .goods {
    padding-bottom: 40px;
    position: relative;
    width: 30%;
  }
  .goods img {
    width: 100%;
    height: 100px;
    border-radius: 5px;
  }

  .goods-info {
    font-size: 12px;
    position: absolute;
    bottom: 5px;
    left: 0;
    right: 0;
    overflow: hidden;
    text-align: center;
  }

  .goods-info p {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    margin-bottom: 3px;
  }

  .goods-info .price {
    color: var(--color-high-text);
    margin-right: 20px;
  }

</style>
