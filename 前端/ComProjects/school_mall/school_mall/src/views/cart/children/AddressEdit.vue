<template>
  <div>
    <!--头部导航栏-->
    <van-nav-bar
            title="确认订单"
            left-text="返回"
            left-arrow
            @click-left="back"
    />
    <van-address-edit
            :value="value"
            :area-list="areaList"
            show-postal
            show-delete
            show-set-default
            show-search-result
            :search-result="searchResult"
            :area-columns-placeholder="['请选择', '请选择', '请选择']"
            @save="onSave"
            @delete="onDelete"

    />
  </div>
</template>

<script>
  import areaList from '../../../assets/js/area'
    export default {
        name: "AddressEdit",
        data() {
            return {
                searchResult: [],
                address:{}
            };
        },
        methods: {
            back(){
                this.$router.back()
            },
            onSave() {

            },
            onDelete() {
               this.$http.get("/deleteAds",{
                   params:""
               })
            },
            onChangeDetail(val) {
                if (val) {
                    this.searchResult = [
                        {
                            name: '黄龙万科中心',
                            address: '杭州市西湖区',
                        },
                    ];
                } else {
                    this.searchResult = [];
                }
            },
        }
    }
</script>

<style scoped>

</style>
