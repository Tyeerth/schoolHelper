<template>
  <div>
    <van-nav-bar
            title="发布宝贝"
            left-arrow
            @click-left="back"
    />
    <div style="margin-left: 34%;margin-top: 10px">
      <van-uploader :after-read="afterRead" :max-count="1" v-model="fileList">
      </van-uploader>
      <span style="color:#dcdee0">添加图片</span>
    </div>

    <div class="message">
      <van-field
              v-model="title"
              show-word-limit
              maxlength="20"
              placeholder="宝贝标题"
      />
      <van-field
              v-model="message"
              rows="3"
              autosize
              type="textarea"
              maxlength="30"
              placeholder="描述不可少
    在这里详细描述一下宝贝转手原因、入手渠道、新旧程度和使用感受吧~~"
              show-word-limit
      />
    </div>

    <div class="location">
      <van-cell title="位置" icon="location-o"  @click="getMap"/>
    </div>
    <div>
      <van-cell title="分类" value="选择分类"  is-link/>
    </div>
    <div>
      <van-cell title="价格" value="开个价"  is-link/>
    </div>

    <div class="but">
      <van-button type="primary" @click="issue" round color="linear-gradient(to right, #ffd01e, #ff6034)" size="large">发布</van-button>
    </div>
  </div>
</template>

<script>

    import {Toast} from 'vant'
    export default {
        name: "IssueDiary",
        data(){
            return{
                //
                sex:0,
                value: '',
                dep: ['计算机工程学院', '材料与环境工程学院', '智能制造学院', '电子工程学院', '自动化与电器工程学院','网络与通信工程学院','经济与管理学院','人文设计学院','大数据与人工智能学院'],
                showPicker: false,
                fileList:[],
                message:'',
                title:''
            }
        },
        methods: {
            onConfirm(value) {
                this.value = value;
                this.showPicker = false;
            },
            afterRead(file) {
                // 此时可以自行将文件上传至服务器
                console.log(file);
            },
            //返回
            back(){
                this.$router.back()
            },
            //发布
            issue()
            {
                Toast.success("发布成功")
            },
            getMap()
            {
                this.$router.push("/map")
            }
        }
    }
</script>

<style scoped>
  .van-nav-bar_title{
    color:#ff976a;
  }
  .but{
    width: 90%;
    position: absolute;
    top:70%;
    left:5%
  }
</style>
