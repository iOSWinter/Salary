<template>
  <div id="app">
    <!-- <img src="./assets/logo.png"> -->
    <keep-alive>

      <router-view/>
    </keep-alive>
  </div>
</template>

<script>

export default {
  name: 'App'
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100%;
  background-color: #eee;
}


/*#region 弹出式详情样式 */
.layui-layer-content {
    padding: 10px 0 0 0;
}

.layui-layer-content>.titleDiv {
    height: 30px;
    color: black;
}

.layui-layer-content>.titleDiv>p {
    margin: 0;
    line-height: 30px;
    font-size: 18px;
    text-align: center;
}

.layui-layer-content>.itemDiv {
    height: 30px;
    padding: 0 10px 0 30px;
    color: black;
}

.layui-layer-content>.itemDiv>label {
    width: 85px;
    text-align: justify;
    text-align-last: justify;
    color: #888;
    display: inline-block;
    height: 100%;
    line-height: 30px;
}

.layui-layer-content>.itemDiv>p {
    display: inline-block;
    padding-left: 10px;
    margin: 0;
    height: 100%;
    line-height: 30px;
    vertical-align: middle;
    margin-top: -4px;
    width: calc(100% - 85px);
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
}
</style>
