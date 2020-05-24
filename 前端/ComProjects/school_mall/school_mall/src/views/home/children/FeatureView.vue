<template>
    <div class="feature">
      <div class="feature-item" v-for="item in categoryList" :key="item.id">
        <div @click="detail(item.name)">
          <img :src="require('../../../assets/img/homeIcon/'+item.img)" alt=""/>
          <!--<i class="iconfont icon-richang"></i>-->
          <div>{{item.name}}</div>
        </div>
      </div>
    </div>
</template>

<script>
    export default {
        name: "FeatureView",
      data()
      {
        return{
          // 分类菜单
          categoryList: [
            { id: 1, name: '校园超市', img: '8.png' },
            { id: 2, name: '手机电脑', img: '2.png' },
            { id: 3, name: '服装', img: '3.png' },
            { id: 4, name: '海鲜', img: '4.png' },
            { id: 5, name: '旅行', img: '5.png' },
            { id: 6, name: '运动', img: '6.png' },
            { id: 7, name: '手包', img: '7.png' },
            { id: 8, name: '虚拟', img: '1.png'},
            // { id: 8, name: '文具', img: '/static/img/category/8.png' }
          ]
        }
      },
        methods:{
            detail(key)
            {
                this.$router.push("/search/"+key)
            }
        },
      props: {
        features: {
          type: Array
          // default:[]
        }}
    }
</script>

<style scoped>
.feature{
  display: flex;
  margin-top: 20px;
  font-size: 14px;
  padding-bottom: 30px;
  border-bottom: 10px solid #eee;
  flex-wrap: wrap;
  justify-content: space-around;
}
  .feature-item{
    /*flex: 1;*/
    text-align: center;
    /*margin-left: margin-left;*/
    position: relative;
    width: 24%;
    margin: 7px 0;
  }
  .feature-item img{
    /*width: 40px;*/
    /*width: 100%;*/
    height: 40px;
    margin-bottom: 10px;
  }
</style>
