<template>
  <div style="background-color: #ff976a">
    <div class="talk_con">
      <div class="talk_show" id="words">
        <div class="atalk">
          <div>
            <van-image
                    round
                    width="1.5rem"
                    height="1.5rem"
                    fit="cover"
                    src="https://img.yzcdn.cn/vant/cat.jpeg"
            />
          </div>
          <span id="asay">Hi! 我是智能机器人小龙！ 有什么可以为您服务的吗？  您可以这样问我：
(你叫什么名字
几岁了
你能跟我聊聊天么)
</span>
        </div>
      </div>
      <div class="talk_input">

        <input type="text" class="talk_word" id="talkwords">
        <input type="button" value="发送" class="talk_sub" id="talksub" @click="TalkSub1">
      </div>
    </div>
  </div>
</template>

<script>

    var Words
    var TalkWords
    var TalkSub
    import {Toast} from 'vant'
    export default {
        name: "Bubble",
        data(){
            return{
                yqList:[],
                show:false
            }
        },
        created(){

        },
        mounted(){
            Words = document.getElementById("words");
            // var Who = document.getElementById("who");
            TalkWords = document.getElementById("talkwords");
            TalkSub = document.getElementById("talksub");
        },
        methods:{
            //抗击疫情
            yq(query){
                this.$http.post("/api/api/service/unit",this.$qs.stringify({
                    query:query,
                    botId:"1026457",
                    userId:"001"
                })).then(res=>{
                    this.yqList=res.data.result.response.action_list[0].say
                })
            },
            TalkSub1()
            {
                var str = ""
                var str2=""
                if(TalkWords.value == ""){
                    // 消息为空时弹窗
                    alert("消息不能为空");
                    return;
                }
                this.yq(TalkWords.value)
                str = '<div class="btalk" style="margin:10px;text-align:right;"><div><img  style="border-radius:50%; overflow:hidden;" width="20px" height="20px" src="https://himg.bdimg.com/sys/portrait/item/7acfb486"/></div><span style="color:#fff;padding:5px 10px;display:inline-block;background:#ef8201;border-radius:10px;">' + TalkWords.value +'</span></div>' ;

                Words.innerHTML = Words.innerHTML + str;
                Toast("正为您搜查相关数据")
                setTimeout(()=>{
                    str2 = '<div class="atalk" style="margin:10px;"><div><img  style="border-radius:50%; overflow:hidden;" width="20px" height="20px" src="https://himg.bdimg.com/sys/portrait/item/7acfb486"/></div><span style="color:#fff;padding:5px 10px;display:inline-block;background:#0181cc;border-radius:10px;">' + this.yqList +'</span></div>' ;
                    Words.innerHTML = Words.innerHTML + str2;
                },"2000")
                TalkWords.value =""
                // this.show=true
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
  .talk_word{
    width:140px;
    height:26px;
    padding:0px;
    /*float:left;*/
    position: absolute;
    bottom: 20px;
    left: 120px;
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
