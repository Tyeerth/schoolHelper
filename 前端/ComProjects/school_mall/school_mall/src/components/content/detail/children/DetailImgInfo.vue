<template>
  <div>
    <!--<div class="paramDesc">-->
      <!--&#45;&#45;<hr/>-->
      <!--<div style="padding-left: 38%;font-size: 20px;font-weight: bold"><br/>商品描述</div>-->
      <!--<br/><span>{{sku.specParam}}</span>-->
      <!--<hr/>&#45;&#45;-->
    <!--</div>-->
    <div v-for="(item, index) in JSON.parse(sku.img)" :key="index" class="detailImg">
      <img :src="item" v-if="index<3"/>
    </div>
  </div>
</template>

<script>
    export default {
        name: "DetailImgInfo",
      props: {
        sku: {
          type: null,
          default() {
            return []
          }
        }
      }
    }
</script>

<style scoped>
.detailImg
{
  /*width: 300px;*/
  width: 95%;
  height: 500px;
  margin: 0 auto;
}
  .detailImg img
  {
    width: 100%;
    height: 100%;
    box-shadow: 10px 10px 10px rgba(0,0,0,.5);
  }
.paramDesc
{
  margin: 10px;
  margin-top: 60px;
  margin-bottom: 60px;
}
</style>
