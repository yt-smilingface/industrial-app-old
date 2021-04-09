<template>
  <div class="ssssss">
    <div class="map-switching" v-if="tableIndex">
      <p @click="handleTo()">
        切换地图模式
        <van-icon name="map-marked" color="rgba(18,150,219,1)" size="28px" />
      </p>
    </div>
    <div class="setTable" v-if="!tableIndex">
      <p @click="handleTo()">切换成图表模式</p>
      <van-icon name="bar-chart-o" color="rgba(18,150,219,1)" size="28px" />
    </div>
    <div v-if="tableIndex">
      <MacroeconomicsEcharts></MacroeconomicsEcharts>
    </div>
    <div v-if="!tableIndex">
      <MacroeconomicsMap></MacroeconomicsMap>
    </div>
  </div>
</template>

<script src="../js/Macroeconomics.js">
</script>

<style>
.ssssss {
  margin-bottom: 50px;
}
.map-switching {
  width: 100%;
  text-align: right;
  font-size: 14px;
}
</style>