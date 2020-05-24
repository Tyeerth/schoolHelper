<template>
   <div class="tab-bar-item" @click="checkActive">
      <div ><slot name="item-img"></slot></div>
       <!--<div v-else><slot name="item-img-active"></slot></div>-->
        <div class="title"><slot name="item-text"></slot></div>
   </div>
</template>

<script>
    export default {
        name: "TabBarItem",
        props:{
            path:String
       },
        date(){
            return{
                // isActive:false
            }
        },
        computed:{
            isActive()
            {
                return this.$route.path.indexOf(this.path) !==-1
            }
        },
        methods:{
            checkActive()
            {
                this.$router.push(this.path)

            }
        }

    }
</script>

<style scoped>
  .tab-bar-item{
    text-align: center;
    flex: 1;
    height: 90px;
    font-size: 15px;
  }
  .tab-bar-item img{
    height: 63px;
    width: 63px;
  }
  .active{
    color: red;
  }
  .title{
    position: relative;
    bottom: 7px;
  }
</style>
