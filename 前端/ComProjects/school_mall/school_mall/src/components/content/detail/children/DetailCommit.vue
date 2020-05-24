<template>
  <div class="commit" >
    <div class="title">
      <span >商品评价(379)</span>
    </div>
    <div class="content">
      <p>
        <br/>——寄母亲 <br/>我从不肯妄弃了一张纸，总是留着——留着，<br/>叠成一只一只很小的船儿 从舟上抛下在海里。<br/>有的被天风吹卷到舟中的窗里，有的被海浪打湿，沾在船头上。<br/>我仍是不灰心的每天的叠着，总希望有一只能流到我要它到的地方去。<br/>母亲，倘若你梦中看见一只很小的白船儿,不要惊讶它无端入梦。<br/>这是你至爱的女儿含着泪叠的，万水千山求它载着她的爱和悲哀归去。<br/>八，二十七，一九二三太平洋舟中</p>
      <p style="margin-top: 20px">
        《繁星》节选<br/>(一)繁星闪烁着——<br/>深蓝的太空<br/>何曾听得见它们对话?<br/>沉默中<br/>微光里<br/>它们深深的互相颂赞了.<br/>（五)<br/>黑暗<br/>怎么的描写呢？<br/>心灵的深深处<br/>宇宙的深深处<br/>灿烂光中的休息处。
      </p>
    </div>
  </div>
</template>

<script>
    export default {
        name: "DetailCommit",
      props: {
        skus: {
          type: null,
          default() {
            return []
          }
        }
      }
    }
</script>

<style scoped>
  .title
  {
    border-radius: 20px 20px 0px 0px;
    background-color: #dddddd;
    width: 100%;
    height: 50px;

  }
  .title span
  {
    color: black;
    font-size: 15px;
    font-weight: bold;
    line-height:50px;
    overflow:hidden;
  }
  .content{
    margin: 10px;
    margin-top: 30px;
  }
</style>
