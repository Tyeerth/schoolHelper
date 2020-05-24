<template>
	<div>
	 <!-- <input type="button" title="开启摄像头" value="开启摄像头" @click="getMedia" /> -->
		<button id="snap" @click="takePhoto">拍照</button>
		<video id="video" width="300px" height="300px" autoplay="autoplay"></video>
		<canvas id="canvas" width="300px" height="300px"></canvas>
	</div>
</template>
<script>

export default {
    name: 'SignCamera',
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
          //获得Canvas对象
          let video = document.getElementById("video");
          let canvas = document.getElementById("canvas");
          let ctx = canvas.getContext('2d');
          ctx.drawImage(video, 0, 0, 300, 300);
          video.style.display="none";
          canvas.style.display="inline-block";
          var imgData = canvas.toDataURL();
          var imgData1 = imgData.substring(22);
          this.$store.commit('submitImg',imgData1)
          },
        stopMedia() {
          }
        },
    mounted(){
      this.getMedia();
    }
}

</script>
<style lang="stylus" scoped>

</style>
