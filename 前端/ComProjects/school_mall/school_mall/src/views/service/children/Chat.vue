<template>
  <div style="background-color: #ff976a">
    <!--头部导航-->
    <van-nav-bar
            title="聊天室"
            left-arrow
            @click-left="back"

    />
    <div class="talk_con">
      <div class="talk_show" id="words">
        <div class="atalk"><span id="asay">A说：吃饭了吗？</span></div>
        <div class="btalk"><span id="bsay">B说：还没呢!你呢？</span></div>
      </div>
      <div class="talk_input">
        <select class="whotalk" id="who">
          <option value="0">A说：</option>
          <option value="1">B说：</option>
        </select>
        <input type="text" class="talk_word" id="talkwords">
        <input type="button" value="发送" class="talk_sub" id="talksub">
      </div>
    </div>
  </div>
</template>

<script>
    export default {
        name: "Bubble",
        created(){
            var Words = document.getElementById("words");
            var Who = document.getElementById("who");
            var TalkWords = document.getElementById("talkwords");
            var TalkSub = document.getElementById("talksub");
        },
        methods:{
            back()
            {
                this.$router.back()
            },
            TalkSub()
            {
                //定义空字符串
                var str = "";
                if(TalkWords.value == ""){
                    // 消息为空时弹窗
                    alert("消息不能为空");
                    return;
                }
                if(Who.value == 0){
                    //如果Who.value为0n那么是 A说
                    str = '<div class="atalk"><span>A说 :' + TalkWords.value +'</span></div>';
                }
                else{
                    str = '<div class="btalk"><span>B说 :' + TalkWords.value +'</span></div>' ;
                }
                Words.innerHTML = Words.innerHTML + str;
            }
        }
    }
</script>

<style scoped>
  .talk_con{
    width:97%;
    height:500px;
    border:1px solid #666;
    margin:50px auto 0;
    background:#f9f9f9;
  }
  .talk_show{
    width:90%;
    height:420px;
    border:1px solid #666;
    background:#fff;
    margin:10px auto 0;
    overflow:auto;
  }
  .talk_input{
    width:80px;
    margin:10px auto 0;
  }
  .whotalk{
    width:80px;
    height:30px;
    /*float:left;*/
    position: absolute;
    bottom: 20px;
    left: 5px;
    outline:none;
  }
  .talk_word{
    width:160px;
    height:26px;
    padding:0px;
    /*float:left;*/
    position: absolute;
    bottom: 20px;
    left: 90px;
    margin-left:10px;
    outline:none;
    text-indent:10px;
  }
  .talk_sub{
    width:80px;
    height:30px;
    position: absolute;
    bottom: 20px;
    right: 5px;
    /*float:left;*/
    margin-left:10px;
  }
  .atalk{
    margin:10px;
  }
  .atalk span{
    display:inline-block;
    background:#0181cc;
    border-radius:10px;
    color:#fff;
    padding:5px 10px;
  }
  .btalk{
    margin:10px;
    text-align:right;
  }
  .btalk span{
    display:inline-block;
    background:#ef8201;
    border-radius:10px;
    color:#fff;
    padding:5px 10px;
  }
</style>
