<template>
  <div >
    <nav-bar>
      <div slot="left" @click="backClick">
        <img :src="require('assets/img/back.svg')" />
      </div>
      <div slot="center" class="title">
        <div v-for="(item,index) in title"
             class="title-item" :key="index"
             :class="{active: index==currentIndex}"
             @click="ItemClick(index)"
        >{{item}}</div>
      </div>
    </nav-bar>
  </div>
</template>

<script>
    import NavBar from 'components/common/navbar/NavBar'
    export default {
        name: "DetailBar",
        components:{
            NavBar
        },
        data(){
            return{
                title:['商品','参数','评论','推荐'],
                currentIndex:0
            }
        },
        methods:{
            ItemClick(index)
            {
                this.currentIndex=index
                this.$emit('titleClick',index)
            },
            backClick()
            {
                this.$emit("backClick")
            }
        }
    }
</script>

<style scoped>
  .title{
    display: flex;
  }
  .title-item{
    flex: 1;
    font-size: 14px;
  }
  .active{
    color: red;
  }

</style>
