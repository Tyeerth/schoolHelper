<template>
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
  import BScroll from 'better-scroll'
    export default {
        name: "Scroll",
      props:{
          probeType:{
            type:Number,
            default:0
          },
        pullUpLoad:{
            type:Boolean,
          default: false
        }
      },
      data(){
          return{
            scroll:null
          }
      },
      mounted(){
          //1.创建scroll对象

          this.init()
        //监听滚动的位置
        this.scroll.on('scroll',(position=>{
          this.$emit('scroll',position)
        })),
          this.scroll.on('pullingUp',()=>{
            this.$emit('pullingUp')
          })

      },
      methods:{
            init(){
                console.log("jin")
                this.scroll=new BScroll(this.$refs.wrapper,{
                    click:true,
                    probeType:this.probeType,
                    pullUpLoad:this.pullUpLoad
                })
            },
          scrollTo(x,y,time=300)
          {
            this.scroll&&this.scroll.scrollTo(x,y,time)
          },
        finishPullUp()
        {
          this.scroll&&this.scroll.finishPullUp()
        },
        refresh()
        {
          this.scroll&&this.scroll.refresh()
        },
        getY()
        {
          return this.scroll?this.scroll.y:0
        }
      }
    }
</script>

<style scoped>

</style>
