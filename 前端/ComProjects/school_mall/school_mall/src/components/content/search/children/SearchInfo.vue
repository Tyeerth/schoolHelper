<template>
  <div class="container">
    <div v-for="(item,index) in list" :key="index">
      <div class="box1" >
        <div class="goods" @click="infoItemClick(item.cname3,item.key)">
          <div class="goods-info" >
            <p>{{item.cname3}}  {{item.key}}</p>
          </div>
        </div>
        <div class="box2" @click="imgClick">
          <img :src="require('assets/img/2.png')"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
    export default {
        name: "SearchInfo",
      props:{
          list:{
            type:null
          }
      },data()
      {
        return{
          // titles:this.props.list.trim()
        }
      },
      methods:{
        infoItemClick(cname3,key){
          const value=cname3+key
          // this.$router.push('/search/'+value)
          this.$emit('infoItemClick',value)
        },
        imgClick()
        {
          this.$emit('getInfo')

        }
      }
    }
</script>

<style scoped>
  .goods {
    /*height:80%*/
    padding-bottom: 40px;
    /*position: fixed;*/
    position:relative;
    /*top:88px;*/
    /*left:0;*/
    /*background-color:white*/
    /*right:0;*/
    width: 48%;
    border-bottom: 1px #F6F6F6 solid;
  }
  .goods img {
    /*width: 100%;*/
    /*height: 200px;*/
    /*border-radius: 5px;*/
  }

  .goods-info {
    font-size: 12px;
    position: absolute;
    bottom: 5px;
    left: 0;
    right: 0;
    overflow: hidden;
    text-align: center;
    border-bottom: #F6F6F6;
  }

  .goods-info p {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    margin-bottom: 3px;
  }
  .container
  {
    position:fixed;
    top:55px;
    right:0;
    left:0;
    background-color:white;
    height: 200px;
  }
  .box1
  {
    position: relative;
  }
  .box2{
    position: absolute;
    right: 0;
    top:14px
  }
</style>
