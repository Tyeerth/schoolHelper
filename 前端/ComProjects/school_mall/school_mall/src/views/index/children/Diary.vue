<template>
  <div>
    <div  class="body">
      <div v-for="i in 1" :key="i">
        <!--图像区-->
        <div class="head_img">
          <van-image
                  round
                  width="2.5rem"
                  height="2.5rem"
                  src="https://img.yzcdn.cn/vant/cat.jpeg"
                  fit="cover"
          />
        </div>
        <div class="info">
          <em>N晗</em>
        </div>
        <div class="content">
          <div class="van-multi-ellipsis--l3">
            冰心（1900年10月5日－1999年2月28日），原名谢婉莹，福建长乐人 ，中国民主促进会（民进）成员。中国诗人，现代作家，翻译家，儿童文学作家，社会活动家，散文家。笔名冰心取自“一片冰心在玉壶”。

            1919年8月的《晨报》上，冰心发表了第一篇散文《二十一日听审的感想》和第一篇小说《两个家庭》。1923年出国留学前后，开始陆续发表总名为《寄小读者》的通讯散文，成为中国儿童文学的奠基之作。1946年在日本被东京大学聘为第一位外籍女教授，讲授“中国新文学”课程，于1951年返回中国。

            1999年2月28日21时12分冰心在北京医院逝世，享年99岁，被称为"世纪老人"。
          </div>
          <div class="img">
            <div class="img_item" v-for="i in 4" :key="i">
              <img src="https://p.ssl.qhimg.com/dmfd/134_76_75/t0198fd2cf8b7d1a510.webp?size=750x742" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
    export default {
        name: "Diary"
    }
</script>

<style scoped>
  .body{
    position: relative;
    top:30px;
    left:0;
  }
.info{
  position: relative;
  top:-23px;
  left: 17%;
}
  .head_img{
    position: relative;
    top: 10px;
    left: 5%;
  }
  .content{
    /*border: #df5000 1px solid;*/
    width: 80%;
    margin: 0 auto;

  }
  .img{
    margin-top: 10px;
    padding-left: 15px;
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
  }
  .img_item{
    padding-bottom: 5px;
    /*position: relative;*/
    flex: 1;
  }
</style>
