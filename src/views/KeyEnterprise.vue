<template>
  <div>
    <div class="enterprise-choice">
      <van-field
        readonly
        clickable
        label="企业："
        :value="value"
        @click="showPicker = true"
      />
      <van-popup v-model="showPicker" round position="bottom">
        <van-picker
          show-toolbar
          :columns="columns"
          @cancel="showPicker = false"
          @confirm="onConfirm"
        />
      </van-popup>
    </div>
    <!-- 企业详情 -->
    <div class="enterprise-details">
      <div class="corporate-avatar">
        <img class="corporate-avatar-img" :src="enterpriseImage" />
        <div class="corporate-name">
          {{ enterpriseData.companyName }}
          <span class="corporate-name-type">
            {{ enterpriseData.companyEnterpriseStatus }}
          </span>
        </div>
      </div>
      <div class="corporate-avatar">
        <div class="enterprise-type">
          <p class="p1">上市企业</p>
        </div>
      </div>
      <div class="corporate-avatar">
        <div class="corporate-information">
          <p class="corporate-information-p1">法定代表人</p>
          <p class="corporate-information-p2">{{ enterpriseData.frname }}</p>
        </div>
        <div class="corporate-information">
          <p class="corporate-information-p1">注册资本</p>
          <p class="corporate-information-p2">{{ enterpriseData.regcap }}</p>
        </div>
        <div class="corporate-information">
          <p class="corporate-information-p1">成立日期</p>
          <p class="corporate-information-p2">{{ enterpriseData.openfrom }}</p>
        </div>
        <div class="corporate-information4">
          <p class="corporate-information-p1">企业地址</p>
          <p class="corporate-information-p2">{{ enterpriseData.address }}</p>
        </div>
      </div>
    </div>
    <!-- 总体情况 -->
    <div class="enterprise-overview">
      <div class="home-title">总体情况</div>
      <div class="enterprise-overview-two">
        <div class="overview-one">
          <div class="overview-left">
            <p class="enterprise-overview-p1">134641千元</p>
            <p class="enterprise-overview-p2">资产总计(2019年末)</p>
          </div>
          <div class="overview-right">
            <p class="enterprise-overview-p1">641千元</p>
            <p class="enterprise-overview-p2">负债总计(2019年末)</p>
          </div>
        </div>
        <div class="overview-one">
          <div class="overview-left">
            <p class="enterprise-overview-p1">34641千元</p>
            <p class="enterprise-overview-p2">营业收入(2019年末)</p>
          </div>
          <div class="overview-right">
            <p class="enterprise-overview-p1">6345千元</p>
            <p class="enterprise-overview-p2">主营业务收入(2019年末)</p>
          </div>
        </div>
        <div class="overview-one">
          <div class="overview-left">
            <p class="enterprise-overview-p1">13441人</p>
            <p class="enterprise-overview-p2">从业人员数（2019年末）</p>
          </div>
          <div class="overview-right">
            <p class="enterprise-overview-p1">11%</p>
            <p class="enterprise-overview-p2">研发人员占比（2019年末）</p>
          </div>
        </div>
        <div class="overview-one">
          <div class="overview-left">
            <p class="enterprise-overview-p1">634千元</p>
            <p class="enterprise-overview-p2">研发经费投入（2019年）</p>
          </div>
          <div class="overview-right">
            <p class="enterprise-overview-p1">3项</p>
            <p class="enterprise-overview-p2">企业获得专利数(2019年末)</p>
          </div>
        </div>
      </div>
    </div>

    <!-- 产业增加值及增速 -->
    <div class="enterprise-overview">
      <div class="home-title">产业增加值及增速</div>
      <div class="area-gdp">
        <div class="area-gdp-echart">
          <chart
            :options="areaGdpEchart"
            :auto-resize="true"
            class="area-gdp-echarts"
          ></chart>
        </div>
      </div>
    </div>

    <!-- 产业投资额及增速 -->
    <div class="enterprise-overview">
      <div class="home-title">产业投资额及增速</div>
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
    <!-- 版权 -->
    <div class="copyright">
      <div class="footer" style="height: 40px">
        版权所有权：@云南省工业和信息化厅
      </div>
    </div>
  </div>
</template>

<script src="../js/KeyEnterprise.js">
</script>

<style>
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

.enterprise-choice .van-field__label {
  width: 3.2em !important;
}
.enterprise-choice .van-cell {
  background-color: #f3f6f9;
}
.enterprise-choice .van-field__control {
  width: 70%;
  border: 1px solid #000;
  background-color: #fff;
}
.enterprise-details {
  width: 100%;
  /* height: ; */
  background: #fff;
}
.corporate-avatar {
  width: 95%;
  margin: 8px auto 0px;
  display: flex;
}
.corporate-avatar-img {
  width: 46px;
  height: 46px;
  margin-top: 10px;
}
.corporate-name {
  margin-top: 10px;
  margin-left: 8px;
  line-height: 46px;
  font-size: 15px;
  font-weight: 700;
  text-align: left;
  color: #000000;
}
.corporate-types {
  margin-top: 10px;
  margin-left: 10px;
  line-height: 1.226667rem;
  display: inline-block;
  vertical-align: middle;
  /* margin: auto 10px; */
}
.corporate-name-type {
  border: 1px solid #0265ba;
  border-radius: 2px;
  color: #0265ba;
  font-weight: 600;
  font-size: 12px;
  margin: auto;
}
.enterprise-type {
  display: flex;
}
.enterprise-type p {
  height: 18px;
  border-radius: 3px;
  font-size: 12px;
  font-weight: 400;
  text-align: center;
  color: #ffffff;
  padding: 3px;
  margin-right: 8px;
}
.enterprise-type .p1 {
  background: #44aeff;
}
.enterprise-type .p2 {
  background: #0bdcc0;
}
.enterprise-type .p3 {
  background: #dc820b;
}

.corporate-information {
  width: 23.6%;
  margin-right: 2%;
  min-height: 50px;
  background: #ecf7ff;
  border-radius: 3px;
  box-shadow: 0px 2px 3px 0px rgba(0, 0, 0, 0.16);
}
.corporate-information4 {
  width: 23.6%;
  min-height: 50px;
  background: #ecf7ff;
  border-radius: 3px;
  box-shadow: 0px 2px 3px 0px rgba(0, 0, 0, 0.16);
}
.corporate-information-p1 {
  font-size: 0.335rem;
  color: #aaaaaa;
  line-height: 0.7rem;
}
.corporate-information-p2 {
  font-size: 0.3rem;
  color: #000000;
  font-weight: 600;
}
/* 总体情况 */
.enterprise-overview {
  width: 100%;
  margin: 22px auto 18px;
}
.enterprise-overview-two {
  width: 90%;
  margin: auto;
}
.overview-one {
  width: 100%;
  height: 78px;
  display: flex;
  margin: 18px auto 0px;
}
.overview-left {
  width: 48%;
  margin-right: 4%;
  background: #ffffff;
  border-radius: 5px;
  box-shadow: 0px 2px 3px 0px rgba(0, 0, 0, 0.16);
  text-align: center;
}
.overview-right {
  width: 48%;
  background: #ffffff;
  border-radius: 5px;
  box-shadow: 0px 2px 3px 0px rgba(0, 0, 0, 0.16);
  text-align: center;
}
.enterprise-overview-p1 {
  font-size: 0.5345rem;
  line-height: 1.2rem;
  font-weight: 600;
  color: #0265ba;
  letter-spacing: 0px;
  text-align: center;
}
.enterprise-overview-p2 {
  font-size: 0.33rem;
  color: #000000;
  font-weight: 500;
  text-align: center;
}

/* 产业增加值及增速 */

/* 产业投资额及增速 */
</style>