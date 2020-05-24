<template>
  <div>
    <!--头部导航-->
    <van-nav-bar
            title="地址列表"
            left-text="返回"
            left-arrow
            @click-left="back"
    />
    <van-address-list
            v-model="chosenAddressId"
            :list="list"
            default-tag-text="默认"
            @add="onAdd"
            @edit="onEdit"
    />
  </div>
</template>

<script>
    export default {
        name: "AddressList",
        data() {
            return {
                address:{},
                chosenAddressId: '1',
                list: [
                    {
                        id: '1',
                        name: '张三',
                        tel: '13000000000',
                        address: '浙江省杭州市西湖区文三路 138 号东方通信大厦 7 楼 501 室',
                    },
                    {
                        id: '2',
                        name: '李四',
                        tel: '1310000000',
                        address: '浙江省杭州市拱墅区莫干山路 50 号',
                    },
                ]
            }
        },
        methods: {
            onAdd() {
                this.$router.push("/addressEdit")
            },
            onEdit(item, index) {

            }
        }
    }
</script>

<style scoped>

</style>
