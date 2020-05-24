<template>
  <div>
    <div>
      <van-nav-bar
              title="人脸录入"
      />
      <!-- <input type="button" title="开启摄像头" value="开启摄像头" @click="getMedia" /> -->
      <!--<button id="snap" @click="takePhoto">拍照</button>-->
      <div class="face">
        <video id="video" width="300px" height="300px" autoplay="autoplay"></video>
        <canvas id="canvas" width="300px" height="300px"></canvas>
      </div>
      <div class="but">
        <van-button round block type="info"  color="linear-gradient(to right, #ffd01e, #ff6034)" :loading-text="text" :loading="loading">人脸录入</van-button>
      </div>
    </div>
  </div>
</template>

<script>
    import { Dialog } from 'vant';
    import {Toast} from 'vant'
    var num=0
    export default {
        name: 'FaceRegistry',
        data(){
            return{
                loading:false,
                text:"录入中...",
                uid:""
            }
        },
        methods:{
            getMedia() {
                let constraints = {
                    video: {width: 300, height: 300},
                    audio: true
                };
                //获得video摄像头区域
                let video = document.getElementById("video");
                //这里介绍新的方法，返回一个 Promise对象
                // 这个Promise对象返回成功后的回调函数带一个 MediaStream 对象作为其参数
                // then()是Promise对象里的方法
                // then()方法是异步执行，当then()前的方法执行完后再执行then()内部的程序
                // 避免数据没有获取到
                let promise = navigator.mediaDevices.getUserMedia(constraints);
                promise.then(function (MediaStream) {
                    video.srcObject = MediaStream;
                    video.play();
                });
            },
            takePhoto() {
                this.uid=this.$route.params.uid
                num++;
                //获得Canvas对象
                let video = document.getElementById("video");
                let canvas = document.getElementById("canvas");
                let ctx = canvas.getContext('2d');
                ctx.drawImage(video, 0, 0, 300, 300);
                video.style.display="none";
                canvas.style.display="inline-block";
                var imgData = canvas.toDataURL();
                var imgData1 = imgData.substring(22);
                this.$http.post("/accrite/face_register",this.$qs.stringify({"img":imgData1,"uid":this.uid})).then((res)=>{

                        Toast.success("录入成功，正为您跳转人脸登陆...")
                        setTimeout(()=>{this.$router.push("/faceLogin")},"2000")
                        this.$destroy('FaceRegistry')
                        this.stopMedia()

                }).catch(()=>{
                    this.text="录入失败"
                        Toast.fail("录入失败，请保持人像处于框内 2秒后重新录入");
                        if(num<3){
                            setTimeout(()=>{this.takePhoto()},"3000");
                        }else {
                            this.text="录入失败"
                            Dialog.confirm({
                                title: '人脸录入失败',
                                message: '是否继续录入',
                            })
                                .then(() => {
                                    // this.$destroy('FaceRegistry')
                                    // this.$router.push("/faceRegistry")
                                    this.$router.go(0)
                                })
                                .catch(() => {
                                    Toast.fail("录入失败 三秒后回到主页");
                                    setTimeout(()=>{this.$router.push("/messageLogin")},"3000");
                                    this.$destroy('FaceRegistry')
                                    this.stopMedia()
                                });
                        }
                })
            },
            stopMedia() {
                this.mediaStreamTrack && this.mediaStreamTrack.stop();
            }
        },
        mounted(){
            setTimeout(()=>{Toast("正为您打开摄像头....")},"1000")
            setTimeout(()=>{this.getMedia();},"2000")
            setTimeout(()=>{Toast("请正视摄像头")},"3000")
            setTimeout(()=>{this.loading=true},"4000")
            setTimeout(()=>{this.takePhoto()},"6000")
        },
        created(){
        }
    }

</script>
<style lang="stylus" scoped>
  .but{
    width 60%
    position absolute
    top 370px
    left 70px
  }
  .face{
    position absolute
    left 30px
    top 40px
  }
</style>

