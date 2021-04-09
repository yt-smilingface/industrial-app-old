<template>
  <div class="box">
    <div class="home-title">云南省工业经济地图</div>
    <div class="margin-top10">
      <van-tabs
        type="card"
        color="#76b3e8"
        title-active-color="#fff"
        background="#f5f5f5"
      >
        <van-tab title="工业增加值累计同比增长">
          <div class="blue-bg"></div>
          <div class="setMytitle">1-9月工业增加值增速</div>
          <!-- <div class="setMytitle">
            指标
            <div class="divInput">
              <div class="input" @click="openValue">
                <input v-model="value" type="text" placeholder="筛选实验类型" />
                <van-icon class="incoarrow" name="arrow-down" />
              </div>
              <div class="list" v-show="show">
                <ul>
                  <li
                    @click="getvalue(index, item)"
                    v-for="(item, index) in tableData"
                    :key="item.index"
                  >
                    {{ item.name }}
                  </li>
                </ul>
              </div>
            </div>
          </div> -->
          <div class="chart" style="width: 100%; height: 800px">
            <chart
              :options="mapOption"
              style="width: 100%; height: 800px; backgorund: #fff"
              @click=""
            ></chart>
          </div>
        </van-tab>
      </van-tabs>
    </div>
    <div class="copyright">
      <div class="footer" style="height: 40px">
        版权所有权：@云南省工业和信息化厅
      </div>
    </div>
  </div>
</template>

<script src="../../js/industrialEconomy/IndustrialEconomy-map.js">
</script>

<style>
.box {
  width: 100%;
  height: 100%;
  overflow: hidden;
}
.setTable {
  text-align: right;
  font-size: 12px;
  margin-top: 10px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
}
.blue-bg {
  width: 100%;
  background-color: #72b0e6;
  height: 5px;
}
.van-tabs__nav--card .van-tab.van-tab--active {
  background: linear-gradient(to bottom, #9bccf3, #72b0e6) !important;
}
.setMytitle {
  margin: auto;
  font-size: 12px;
  color: #000;
  line-height: 46px;
}
.divInput {
  margin-left: 10px;
  display: inline-block;
}
ul li {
  list-style: none;
}
.input {
  width: 140px;
  height: 30px;
  line-height: 30px;
  padding-left: 0px;
  border: 1px solid #cccccc;
  position: relative;
}
.input input {
  border: none;
  outline: none;
  width: 90%;
}
.input img {
  position: absolute;
  right: 34px;
  top: 48%;
}
.list {
  width: 140px;
  border: 1px solid #cccccc;
  overflow: hidden;
  z-index: 10;
  position: absolute;
}
.list ul li {
  width: 100%;
  height: 30px;
  font-size: 14px;
  cursor: pointer;
  line-height: 30px;
  padding-left: 0px;
  background-color: #fff;
}
.list ul li:hover {
  background-color: #cccccc;
}
.chart {
  width: 800px;
  height: 400px;
  margin: auto auto;
}
.key-industry-map {
  height: 82px;
  margin-top: 20px;
}
.key-industry-mapTwo {
  width: 95%;
  margin: auto;
  display: flex;
}
.key-industry-left {
  width: 48%;
  margin-right: 4%;
  background: #ffffff;
  border: 2px solid #0265ba;
  border-radius: 3px 3px 3px 3px;
  box-shadow: 0px 2px 3px 0px rgba(0, 0, 0, 0.16);
}
.key-industry-right {
  width: 48%;
  background: #ffffff;
  border: 2px solid #0265ba;
  border-radius: 3px 3px 3px 3px;
  box-shadow: 0px 2px 3px 0px rgba(0, 0, 0, 0.16);
}
.key-industry-p1 {
  height: 40px;
  color: #ffffff;
  background: #0265ba;
  box-shadow: 0px 2px 3px 0px rgba(0, 0, 0, 0.16);
  padding: 8px 0px 0px 10px;
}
.key-industry-p2 {
  color: #000000;
  font-size: 0.52rem;
  line-height: 0.71rem;
}
.setChart {
  width: 800px;
}

.van-tab__pane,
.van-tab__pane-wrapper {
  background: #fff;
}
</style>