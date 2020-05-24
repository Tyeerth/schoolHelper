<template>
  <div class="mapbox">
    <van-nav-bar
            title="校园服务中心"
            right-text="更多(智能服务)"
            left-arrow
            @click-left="back"
            @click-right="more"
    />
    <van-row class="map_title">
      <van-col span="20" class="map_title_span">
        <!--<p>经度：{{locationdata.center ? locationdata.center.lng : center.lng}}</p>-->
        <!--<p>纬度：{{locationdata.center ? locationdata.center.lat : center.lat}}</p>-->
      </van-col>
      <!--<van-col span="4"><van-button type="info" size="small"  @click="getmapdamodata()">提交</van-button></van-col>-->
    </van-row>
    <baidu-map
            @click="getLocation"
            class="map"
            @ready="handler"
            :center="center"
            :map-click="false">
      <!--//是否可以切换全景-->
      <bm-panorama></bm-panorama>
      <!--//自动定位的控件-->
      <bm-geolocation anchor="BMAP_ANCHOR_BOTTOM_RIGHT" :showAddressBar="true" :autoLocation="true"></bm-geolocation>
      <bml-marker-clusterer
              :averageCenter="true"
              v-if="flag==1"
      >
        <div
                v-for="(item, i) in activities"
                :key="i">
          <bm-marker
                  :dragging="true"
                  animation="BMAP_ANIMATION_BOUNCE"

                  :position="{lng: item.lng, lat:item.lat}"
                  @click="infoWindowOpen(markers[i])"
          >
            <bm-info-window
                    :width="150"

                    :position="{lng: item.lng, lat:item.lat}"
                    :show="markers[i].showFlag"
                    @close="infoWindowClose(markers[i])"
                    @open="infoWindowOpen(markers[i])"
            >
              <div style="height: 100%;width: 100%;">
                <p>活动名称:{{item.name}}</p>
                <p>活动内容:{{item.content}}</p>
                <p>活动地址:{{item.address}}</p>
                <p>活动时间:{{item.time}}</p>
              </div>
            </bm-info-window>
          </bm-marker>
        </div>
      </bml-marker-clusterer>
<!--#########################################################-->
      <bml-marker-clusterer
              :averageCenter="true"
              v-if="flag==2"
      >
        <div
                v-for="(item, i) in runs"
                :key="i">
          <bm-marker
                  :dragging="true"
                  animation="BMAP_ANIMATION_BOUNCE"

                  :position="{lng: item.lng, lat:item.lat}"
                  @click="infoWindowOpen(markers3[i])"
          >
            <bm-info-window
                    :width="150"

                    :position="{lng: item.lng, lat:item.lat}"
                    :show="markers3[i].showFlag"
                    @close="infoWindowClose(markers3[i])"
                    @open="infoWindowOpen(markers3[i])"
            >
              <div style="height: 100%;width: 100%;">
                <p>物品名称:快递包</p>
                <p>物品描述:哈罗单车上的一个快递，体积不大</p>
                <p>丢失地址:3237楼下</p>
                <p>丢失时间:17:25</p>
              </div>
            </bm-info-window>
          </bm-marker>
        </div>
      </bml-marker-clusterer>
<!--￥￥￥￥￥￥￥￥￥￥￥￥￥跑腿￥￥￥￥￥￥￥￥￥￥￥￥￥￥￥￥￥￥￥-->
      <bml-marker-clusterer
              :averageCenter="true"
              v-if="flag==3"
      >
        <div
                v-for="(item, i) in runs"
                :key="i">
          <bm-marker
                  :dragging="true"
                  animation="BMAP_ANIMATION_BOUNCE"
                  :position="{lng: item.lng, lat:item.lat}"
                  @click="infoWindowOpen(markers3[i])"
          >
            <bm-info-window
                    :width="150"
                    :position="{lng: item.lng, lat:item.lat}"
                    :show="markers3[i].showFlag"
                    @close="infoWindowClose(markers3[i])"
                    @open="infoWindowOpen(markers3[i])"
            >
              <div style="height: 100%;width: 100%;">
                <p>发起人:{{item.name}}</p>
                <p>跑腿内容:{{item.content}}</p>
                <p>发起人电话:{{item.phone}}</p>
                <p>发起时间:{{item.time}}</p>
              </div>
            </bm-info-window>
          </bm-marker>
        </div>
      </bml-marker-clusterer>
    </baidu-map>
    <!-- 右滑进入 -->
    <transition name="van-slide-up">
      <div class="pan" v-show="show">
        <p @click="onActivity">活动发布</p>
        <p @click="onLose">实物招领</p>
        <p @click="onRun">跑腿服务</p>
      </div>
    </transition>
    <div class="issue" @click="add">
    <van-icon name="add" size="42" color="#ff976a"/>
    </div>
    <div class="tabBar">
    <div class="a" @click="handler">
    <van-icon name="location" size="36" color="#ee0a24" />
    </div >
    <div class="a" @click="getActivities">
    <van-icon name="friends" size="36" color="#ee0a24"/>
    </div>
    <div class="a" @click="getLose">
    <van-icon name="bag" size="36" color="#ee0a24"/>
    </div>
    <div class="a" @click="getRuns">
    <van-icon name="youzan-shield" size="36" color="#ee0a24"/>
    </div>
    </div>
    <!--</div>-->
  </div>
</template>

<script>
    // 按需引入点聚合
    import { BmlMarkerClusterer } from 'vue-baidu-map'
    // 引入marker
    import BmMarker from 'vue-baidu-map/components/overlays/Marker'

    // 插入 100 个随机点
    //{lng: 103.894108, lat:30.793805}
    var markers = []
    var markers2=[]
    var markers3=[]
    for (let i = 0; i < 20; i++) {
        const position = { showFlag: false }
            markers.push(position)
            markers2.push(position)
        markers3.push(position)
    }
    const carList = [
        {}
    ]
    export default {
        name: 'Bmaptrace',
        components: {
            BmlMarkerClusterer,
            BmMarker
        },
        data () {
            return {
                BMap: '',
                map: '',
                markers,
                markers2,
                markers3,
                carList,
                flag:1,
                show: false,
                center: {lng: 103.894108, lat:30.793805},
                activities:[],
                loses:[],
                runs:[]
            }
        },
        created(){
            // this.getActivities()
            this.getRuns()
        },
        methods: {
            add(){
                this.show=!this.show
            },
            more(){
                this.$router.push("/serviceMore")
                this.show=false
            },
            getActivities()
            {
                this.flag=1
                this.$http.get("/api/api/service/activity/get").then(res=>{
                    this.activities=res.data
                    var lng=103.894108
                    var lat=30.793805
                    for(var i=0;i<this.activities.length;i++)
                    {
                        this.activities[i].lng=lng
                        this.activities[i].lat=lat
                        this.activities[i].showFlag=false
                        lng=lng+0.00003
                        lat=lat+0.0003
                    }
                })
            },
            getRuns()
            {
                this.flag=3
                this.$http.get("/api/api/service/run/get").then(res=>{
                    this.runs=res.data
                    console.log(this.runs)
                    var lng=103.894178
                    var lat=30.793905
                    for(var i=0;i<this.runs.length;i++)
                    {
                        this.runs[i].lng=lng
                        this.runs[i].lat=lat
                        this.runs[i].showFlag=false
                        lng=lng+0.00003
                        lat=lat+0.0003
                    }
                })

            },
            getLose()
            {
                this.flag=2
                this.$http.get("/api/api/service/lose/get").then(res=>{
                    this.loses=res.data
                    var lng=103.894131
                    var lat=30.792767
                    for(var i=0;i<this.loses.length;i++)
                    {
                        this.loses[i].lng=lng
                        this.loses[i].lat=lat
                        this.loses[i].showFlag=false
                        lng=lng+0.00003
                        lat=lat+0.0003
                    }
                })
            },
            //获取信息
            getLocation(e){
                // this.center.lng = e.point.lng;     //通过  e.point.lng获取经度
                // this.center.lat = e.point.lat;     //通过  e.point.lat获取纬度
                // console.log(this.center)
                // this.marker.showFlag=
            },
            onLose(){
                this.$router.push("/lose")
                this.show=false
            },
            onRun(){
                this.$router.push("/run")
                this.show=false
            },
            onActivity(){
                this.$router.push("/activity")
                this.show=false
            },
            back(){
                this.$router.push("/")
                console.log("11111")
                this.show=false
            },
            handler ({ BMap, map }) {
                map.enableScrollWheelZoom(true)
                map.centerAndZoom('成都工业学院允明楼', 19)
                // 赋值，方便调用，本节没用到
                this.BMap = BMap
                this.map = map
            },
            // 关闭信息窗口 @close 自带的方法
            infoWindowClose (marker) {
                marker.showFlag = false
                // marker=true
            },
            // 首先点击marker时开启信息窗口，其实没必要在 bm-info-window 上写 @open 因为如果是关闭状态根本就点不到，所以就无法触发 @open
            // 如果在 bm-info-window 上写了 @open 在点击marker时会触发两次infoWindowOpen函数，而且可以很明显的看到有延时
            infoWindowOpen (marker) {
                marker.showFlag = true
                // marker=true
            }
        }
    }
</script>
<style scoped lang="stylus">
.map {
width: 100%;
height: 6.6667*6rem;
}
.anchorBL {
display:none
}
.map_title{
display: flex;
justify-content: center;
align-items: center;
padding: 0.1533rem;
.map_title_span{
font-size: 0.29rem;
}
}
.issue{
background-color white
border-radius 33px
position fixed
bottom 90px
right 20px

}
.tabBar{
display flex
position fixed
bottom 0px
left 0px
height 55px
width 100%
background-color #ff976a
}
.a{
flex 1
position relative
top:10px
left 10px
}
.pan{
  z-index 11111
  width:20%
  height: 20%
  background-color #ff976a
  position absolute
  bottom 70px
  right 70px
  border #df5000 3px solid
  border-radius 6px
  p{
    position relative
    left 5px
  }
}
</style>

