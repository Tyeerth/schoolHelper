<template>
  <div>
    <a href="javascript:void(0)" id="contactQQ">在线客服</a>
    <a target="_blank" href="http://wpa.qq.com/msgrd?v=3&uin=1215856495&site=qq&menu=yes"><img border="0" src="http://wpa.qq.com/pa?p=2::52" alt="点击这里给我发消息" title="点击这里给我发消息"/></a>
    <!--地区检索-->
    <!--<label>关键词：<input v-model="keyword"></label>-->
    <label>搜索：<input v-model="location"></label>
    <baidu-map class="bm-view" center="北京">
      <bm-scale anchor="BMAP_ANCHOR_TOP_RIGHT"></bm-scale>
      <bm-navigation anchor="BMAP_ANCHOR_TOP_RIGHT"></bm-navigation>
      <bm-geolocation anchor="BMAP_ANCHOR_BOTTOM_RIGHT" :showAddressBar="true" :autoLocation="true"></bm-geolocation>
      <!--城市列表-->
      <bm-city-list anchor="BMAP_ANCHOR_TOP_LEFT"></bm-city-list>
      <!--全景-->
      <bm-panorama></bm-panorama>
      <!--地区检索-->
      <bm-local-search :keyword="keyword" :auto-viewport="true" :location="location"></bm-local-search>
      <!--步行路线规划-->
      <bm-walking start="成都工业学院北门" end="成都工业学院图书馆" :auto-viewport="true" location="成都"></bm-walking>
    </baidu-map>
  </div>
</template>

<script>
    export default {
        name: "Map",
        data()
        {
            return{
                keyword:'成都工业学院',
                location:'成都工业学院'
            }
        }
    }
</script>

<style scoped>
  .bm-view {
    width: 100%;
    height: 450px;
  }
</style>
