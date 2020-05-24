<template>
  <div id="tab-bar">
      <slot></slot>
    </div>

</template>

<script>
    export default {
        name: "tabber"
    }
</script>

<style scoped>
  #tab-bar{
    display: flex;
    background-color: #f6f6f6;
    position: absolute;
    top: 50%;
    right: 0;
    left: 0;
    width: 90%;
    border-radius: 20px;
    margin:0 auto;
    box-shadow: 0 -1px 1px rgba(100,100,100,.2);
  }
</style>
