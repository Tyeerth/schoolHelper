<template>
  <div class="goods">
    <shops-item v-for="item in shops" :shopItem="item" :key="item.id"></shops-item>
  </div>
</template>

<script>
    import ShopsItem from 'components/content/shops/ShopsItem'
    export default {
        name: "ShopsList",
        components:{
            ShopsItem
        },
        props:{
            shops:{
                type:Array,
                default()
                {
                    return []
                }
            }
        }
    }
</script>

<style scoped>
  .goods{
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
  }
</style>
