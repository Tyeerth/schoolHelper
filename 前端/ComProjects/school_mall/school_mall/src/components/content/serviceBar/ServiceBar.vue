<template>
  <tab-bar class="bar">
    <tab-bar-item path="/serviceMore">
      <img slot="item-img" src="~/assets/img/index/天气.png"/>
      <div slot="item-text" >天气查询</div>
    </tab-bar-item>
    <tab-bar-item  path="/serviceMore">
      <img slot="item-img" src="~/assets/img/index/闲聊.png"/>
      <div slot="item-text">闲聊</div>
    </tab-bar-item>
    <tab-bar-item path="/serviceMore">
      <img slot="item-img" src="~/assets/img/index/翻译.png"/>
      <div slot="item-text" >翻译</div>
    </tab-bar-item>
    <tab-bar-item path="/serviceMore">
      <img slot="item-img" src="~/assets/img/index/心情分析.png"/>
      <div slot="item-text" >心情分析</div>
    </tab-bar-item>
  </tab-bar>
</template>

<script>
    import TabBar from './TabBar'
    import TabBarItem from './TabBarItem'
    export default {
        name: "MainTabBar",
        components:{
            TabBar,
            TabBarItem
        }
    }
</script>

<style scoped>

</style>
