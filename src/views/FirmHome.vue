<template>
  <div class="home">
    <div class="home-top">
      <div class="home-top-cont">
        <img src="../assets/image/home/header.png" alt="" />
        <div>
          {{ showTime }}好,{{ userInfo.enterpriseUserInfoVo.enterpriseName }}！
        </div>
        <div style="line-height: 28px">
          个人中心<van-icon name="arrow-down" color="#1989fa" size="12" />
        </div>
        <div class="user-logout">
          <van-button type="info" @click="logout" size="mini"
            >退出登录</van-button
          >
        </div>
      </div>
    </div>
    <!--  -->
    <div class="news-notice">
      <div class="inform-uesrInform">
        <p class="inform-uesrInform-p">
          <span></span>
          <span class="news-notice-time"></span>
        </p>
        <!-- <p class="inform-uesrInform-p">
          <span>【shengji】金士顿发到你发送到</span>
          <span class="news-notice-time">08-05</span>
        </p>-->
      </div>
    </div>
    <!--  -->
    <div class="data-provided">
      <div class="data-provided-details">
        <div class="provided-details-img">
          <!-- <img src="../assets/image/home/data-provided.png" /> -->
        </div>
        <div class="provided-details-button">
          <p class="provided-details-p">
            您有
            <span>{{ total }}</span
            >项数据填报任务
          </p>
          <van-button class="provided-btn" type="info" @click="fillForm"
            >立即填报</van-button
          >
        </div>
      </div>
    </div>
    <!--  -->
    <div class="pending-form">
      <div class="pending-form-details">
        <div class="pending-form-title">
          <p>待填报表单</p>
          <div class="" @click="fillFormTwo">
            查看全部 <van-icon name="arrow" color="#0090ff" />
          </div>
        </div>
        <div class="pending-form-content">
          <div class="pending-form-one" v-for="(item, index) in tableData">
            <div class="pending-form-one-img"></div>
            <div class="pending-form-text">
              <p class="pending-form-text-p1">企业基本信息表</p>
              <p class="pending-form-text-p2" v-if="item.fillType === 0">
                期次：{{ item.endTime.substring(0, 4) }}月报
              </p>
              <p class="pending-form-text-p2" v-if="item.fillType === 1">
                期次：{{ item.endTime.substring(0, 4) }}季报
              </p>
              <p class="pending-form-text-p2" v-if="item.fillType === 2">
                期次：{{ item.endTime.substring(0, 4) }}年报
              </p>
              <p class="pending-form-text-p2" v-if="item.fillType === 3">
                期次：{{ item.endTime.substring(0, 4) }}一次
              </p>
              <p class="pending-form-text-p3">
                截止日期：剩余{{ item.closingDate }}天
              </p>
              <div class="pending-btn-div">
                <van-button
                  class="pending-btn"
                  type="info"
                  @click="pendingForm(item)"
                  >立即填报</van-button
                >
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!--  -->
    <div class="enterprise-interaction">
      <div class="enterprise-interaction-details">
        <div class="enterprise-one">政企互动专区</div>
        <div class="enterprise-two">
          <p>我想对工信厅说@工信厅</p>
          <van-button
            class="pending-btn"
            type="info"
            @click="interactiveMessage"
            >点击进入</van-button
          >
        </div>
      </div>
    </div>
    <!--  -->
    <div class="copyright">
      <div class="footer" style="height: 40px">
        版权所有权：@云南省工业和信息化厅
      </div>
    </div>
  </div>
</template>

<script src="../js/FirmHome.js">
</script>

<style>
.news-notice {
  width: 100%;
  margin: auto;
}
.news-notice .inform-uesrInform {
  margin: auto;
  width: 90%;
  /* margin-top: 30px; */
  margin-bottom: 20px;
}
.news-notice .inform-uesrInform-p {
  background: url("../assets/image/home/newsimage.png") #ffffff no-repeat 8px
    50%;
  background-size: 24px 70%;
  font-size: 12px;
  height: 33px;
  line-height: 0.88rem;
  font-weight: 500;
  text-align: left;
  padding-left: 31px;
  padding-right: 8px;
  margin-bottom: 8px;
  box-shadow: 0px 3px 6px 0px rgba(0, 0, 0, 0.16);
  border-radius: 3px;
}
.news-notice-time {
  float: right;
}
/*  */
.data-provided {
  width: 100%;
  margin: 10px auto;
}
.data-provided-details {
  width: 90%;
  height: 99px;
  margin: auto;
  background: #ffffff;
  border-radius: 3px;
  box-shadow: 0px 3px 6px 0px rgba(0, 0, 0, 0.16);
  display: flex;
}
.provided-details-img {
  background: url(../assets/image/home/data-provided.png) no-repeat 50%;
  background-size: 70%;
  width: 30%;
  height: 100%;
}
.provided-details-button {
  width: 70%;
  height: 100%;
}
.provided-details-p {
  font-size: 20px;
  line-height: 60px;
}
.provided-details-p span {
  text-decoration: underline;
  color: #1989fa;
  font-size: 28px;
}
.provided-btn {
  height: 30px !important;
  float: right;
  right: 20px;
}
/*  */
.pending-form {
  width: 100%;
  margin: 14px auto;
  text-align: left;
}
.pending-form-details {
  width: 100%;
  margin: auto;
}
.pending-form-title {
  border-bottom: 1px solid #cbcbcb;
  display: flex;
  width: 100%;
  height: 40px;
  line-height: 40px;
  background: #ffffff;
}
.pending-form-title p {
  font-size: 16px;
  font-weight: 600;
  color: #000000;
  width: 59%;
  text-align: left;
  margin-left: 30px;
}
.pending-form-title div {
  font-size: 12px;
  width: 30%;
  float: right;
  text-align: right;
  color: #0090ff;
}
.pending-form-content {
  background: #ffffff;
  width: 100%;
  height: 180px;
  margin: auto;
  text-align: center;
  display: flex;
}
.pending-form-one {
  width: 30%;
  margin-left: 10px;
}
.pending-form-one-img {
  background: url(../assets/image/home/pending-form-one.png) no-repeat 50%;
  background-size: 60%;
  height: 90px;
}
.pending-form-two-img {
  background: url(../assets/image/home/pending-form-two.png) no-repeat 50%;
  background-size: 60%;
  height: 90px;
}
.pending-form-three-img {
  background: url(../assets/image/home/pending-form-three.png) no-repeat 50%;
  background-size: 60%;
  height: 90px;
}
.pending-form-text p {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  width: 100%;
  text-align: center;
  margin: 2px 0px;
}
.pending-form-text-p1 {
  color: #000;
  font-weight: 600;
  font-size: 14px;
}
.pending-form-text-p2 {
  color: #989898;
  font-size: 12px;
}
.pending-form-text-p3 {
  color: #bb0000;
  font-size: 10px;
}
.pending-btn-div {
  width: 100%;
  text-align: center;
}
.pending-btn {
  height: 20px !important;
}
.enterprise-interaction {
  width: 100%;
  margin: 10px auto;
  text-align: left;
}
.enterprise-interaction-details {
  width: 100%;
  margin: auto;
  background: #d8e8ff;
  box-shadow: 0px 2px 3px 0px rgba(0, 0, 0, 0.16);
  height: 80px;
}
.enterprise-one {
  font-weight: 600;
  font-size: 16px;
  margin-left: 20px;
  line-height: 40px;
}
.enterprise-two {
  font-weight: 600;
  font-size: 14px;
  display: flex;
  float: right;
  margin-right: 20px;
}
.enterprise-two p {
  margin-right: 10px;
}
</style>