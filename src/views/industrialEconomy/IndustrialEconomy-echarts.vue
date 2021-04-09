<template>
  <div class="ssssss">
    <div class="overall-situation-title">
      <div class="home-title">总体情况</div>
      <div class="overall-situation">
        <div class="overall-situation-top">
          <div
            :class="
              id % 2 === 0
                ? 'overall-situation-top-left'
                : 'overall-situation-top-right'
            "
            v-for="(item, id) in industryData.slice(0, 2)"
          >
            <p class="overall-situation-top-p1">{{ item.targetName }}</p>
            <p class="overall-situation-top-p2">{{ item.value }}%</p>
            <p class="overall-situation-top-p3">
              全国排名第 {{ item.rank }} 位
            </p>
          </div>
        </div>
        <div class="overall-situation-top">
          <div
            :class="
              id % 2 === 0
                ? 'overall-situation-bottom-left'
                : 'overall-situation-bottom-right'
            "
            v-for="(item, id) in industryData.slice(2)"
          >
            <p class="overall-situation-top-p1">{{ item.targetName }}</p>
            <p class="overall-situation-top-p2">{{ item.value }}%</p>
            <p class="overall-situation-top-p3">
              全国排名第 {{ item.rank }} 位
            </p>
          </div>
        </div>
      </div>
    </div>
    <!-- 地区生产总值 -->
    <div>
      <div class="home-title">工业增加值</div>
      <div class="area-gdp">
        <div class="area-gdp-echart">
          <chart
            :options="industrialOutputEchart"
            :auto-resize="true"
            class="area-gdp-echarts"
          ></chart>
        </div>
      </div>
    </div>
    <!-- 地区生产总值增速对比 -->
    <div>
      <div class="home-title">地区生产总值增速对比</div>
      <div class="area-gdp">
        <div class="area-gdp-echart">
          <chart
            :options="growthEchart"
            :auto-resize="true"
            class="area-gdp-echarts"
          ></chart>
        </div>
      </div>
    </div>
    <!-- 云南省工业投资增速 -->
    <div>
      <div class="home-title">云南省工业投资增速</div>
      <div class="area-gdp">
        <div class="area-gdp-echart">
          <chart
            :options="investmentEchart"
            :auto-resize="true"
            class="area-gdp-echarts"
          ></chart>
        </div>
      </div>
    </div>
    <!-- 云南省工业企业效益 -->
    <div>
      <div class="home-title">云南省工业企业效益</div>
      <div class="area-gdp">
        <div class="area-gdp-echart">
          <chart
            :options="benefitEchart"
            :auto-resize="true"
            class="area-gdp-echarts"
          ></chart>
        </div>
      </div>
    </div>
    <!-- 工业三大门类增长 -->
    <div>
      <div class="home-title">云南省工业三大门类增长</div>
      <div class="area-gdp">
        <div class="area-gdp-echart">
          <chart
            :options="categoryGrowthEchart"
            :auto-resize="true"
            class="area-gdp-echarts"
          ></chart>
        </div>
      </div>
    </div>
    <!--   工业PPI -->
    <div>
      <div class="home-title">云南省工业PPI</div>
      <div class="area-gdp">
        <div class="area-gdp-echart">
          <chart
            :options="PPIEchart"
            :auto-resize="true"
            class="area-gdp-echarts"
          ></chart>
        </div>
      </div>
    </div>
  </div>
</template>


<script src="../../js/industrialEconomy/IndustrialEconomy-echarts.js">
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
.home-title {
  text-align: left;
  margin-left: 24px;
  padding-left: 10px;
  width: 90%;
  font-size: 13px;
  color: #000;
  font-weight: 600;
  border-left: 4px solid rgba(18, 166, 255, 1);
}

.overall-situation-title {
  margin-bottom: 18px;
}
.overall-situation {
  width: 100%;
  background: #ffffff;
  box-shadow: 0px 3px 6px 0px rgba(0, 0, 0, 0.16);
  padding-top: 20px;
  padding-bottom: 20px;
  margin-top: 12px;
}
.overall-situation-top {
  display: flex;
  width: 90%;
  margin: 20px auto 0px;
  text-align: center;
}
.overall-situation-top-left {
  width: 45%;
  background: linear-gradient(#32c5d2 67%, #2dbbc8 33%);
  margin-right: 8%;
  border-radius: 4px;
  padding: 5px;
}
.overall-situation-top-right {
  width: 45%;
  background: linear-gradient(#5395c3 67%, #2b7cb5 33%);
  border-radius: 4px;
  padding: 5px;
}
.overall-situation-top-p1 {
  text-align: left;
  color: #ffffff;
  font-size: 10px;
}
.overall-situation-top-p2 {
  text-align: center;
  color: #ffffff;
  font-size: 24px;
}
.overall-situation-top-p3 {
  text-align: right;
  color: #ffffff;
  font-size: 10px;
}
.overall-situation-bottom {
  display: flex;
  display: flex;
  width: 90%;
  margin: 20px auto 0px;
  text-align: center;
}
.overall-situation-bottom-left {
  width: 45%;
  background: linear-gradient(#f29fa5 67%, #e18d93 33%);
  margin-right: 8%;
  border-radius: 4px;
  padding: 5px;
}
.overall-situation-bottom-right {
  width: 45%;
  background: linear-gradient(#8e44ad 67%, #853fa2 33%);
  border-radius: 4px;
  padding: 5px;
}

.area-gdp {
  margin: 13px auto;
  width: 100%;
}
.area-gdp-echart {
  width: 92%;
  margin: auto;
  background: #ffffff;
}
.area-gdp-echarts {
  width: 100%;
  height: 240px;
}
</style>