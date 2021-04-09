<template>
  <div class="home">
    <div class="home-top">
      <div class="home-top-cont">
        <img src="../assets/image/home/header.png" alt="" />
        <div>你好，{{ userInfo.username }}！</div>
        <div>个人中心</div>
        <div class="user-logout">
          <van-button type="info" @click="logout" size="mini"
            >退出登录</van-button
          >
        </div>
      </div>
    </div>

    <div class="news">
      <van-tabs v-model="newsActive" @click="noticeClick">
        <van-tab title="行业资讯"></van-tab>
        <van-tab title="政策文件"></van-tab>
        <van-tab title="政策解读"></van-tab>
        <van-tab title="热点研报"></van-tab>
      </van-tabs>
      <div class="bbd-notice-item" v-for="(item, index) in noticeOptions" :key="index" @click="noticechange(item)">
        <span style="margin-right: 10px;">{{item.gmtCreate}}</span>
        <span>{{item.fileName}}</span>
      </div>
      <div class="bbd-notice-more"><span @click="noticeMore">更多</span></div>
    </div>

    <div class="home-mon">
      <div class="home-title">工业运行监测</div>
      <div class="home-mon-cont">
        <img
          src="../assets/image/home/pandect.png"
          alt=""
          @click="handleTo('/macroeconomics')"
        />
        <img
          src="../assets/image/home/economymonitor.png"
          @click="handleTo('/industrialEconomy')"
          alt=""
        />
        <img src="../assets/image/home/trademonitor.png" alt="" />
        <img
          src="../assets/image/home/img.png"
          alt=""
          @click="handleTo('/keyEnterprise')"
        />
      </div>
    </div>

    <!-- <div class="home-watch">
      <div class="home-title">数据资产总览</div>
      <ul class="home-watch-ul">
        <li>
          <div>数据来源</div>
          <div class="bigNum">6</div>
          <div>个</div>
        </li>
        <li>
          <div>数据目录</div>
          <div class="bigNum">8,124</div>
          <div>项</div>
        </li>
        <li>
          <div>数据总量</div>
          <div class="bigNum">341,123,653</div>
          <div>条</div>
        </li>
        <li>
          <div>数据服务处室</div>
          <div class="bigNum">8</div>
          <div>个</div>
        </li>
        <li>
          <div>数据服务量</div>
          <div class="bigNum">43,454,453</div>
          <div>次</div>
        </li>
      </ul>
      <div class="home-watch-logo">
        <div class="home-watch-logo-item">
          <img src="../assets/image/home/logo2.jpg" alt="" />
          <div class="home-watch-logo-item-cont">宏观经济库</div>
        </div>
        <div class="home-watch-logo-item">
          <img src="../assets/image/home/logo1.jpg" alt="" />
          <div class="home-watch-logo-item-cont">工业经济库</div>
        </div>
        <div class="home-watch-logo-item">
          <img src="../assets/image/home/logo4.jpg" alt="" />
          <div class="home-watch-logo-item-cont">行业经济数据</div>
        </div>
        <div class="home-watch-logo-item">
          <img src="../assets/image/home/logo3.jpg" alt="" />
          <div class="home-watch-logo-item-cont">城市数据库</div>
        </div>
        <div class="home-watch-logo-item">
          <img src="../assets/image/home/logo5.jpg" alt="" />
          <div class="home-watch-logo-item-cont">企业经济库</div>
        </div>
      </div>
    </div> -->
    
    <div class="home-mon">
      <div class="home-title">项目管理 
        <span style="float:right;margin-right: 20px;" @click="$router.push('/menagement')">更多</span>
      </div>
      <div class="menage-item">项目总个数<span class="menageNum">{{manage.projects}}个</span></div>
      <div class="menage-item">项目总投资<span class="menageNum">{{(manage.projectAmounts/10000).toFixed(2)}}亿元</span></div>
      <div class="menage-item">投资总进度<span class="menageNum">{{manage.schedule.toFixed(2)}}%</span></div>
    </div>

    <div class="home-mon">
      <div class="home-title">重点企业TOP5 
        <span style="float:right;margin-right: 20px;" @click="handleTo('/keyEnterprise')">更多</span>
      </div>
      <div class="menagement-item" v-for="(item, index) in menagementOptions" :key="index">
        <div class="menage-title">{{item.companyName}}</div>
        <span>所属州市：{{item.city}}</span>
        <span>注册资本：{{item.registeredCapital}}万元</span>
        <span>总资产：{{item.totalCapital}}万元</span>
        <span>营业总收入：{{item.totalOperatingRevenue}}万元</span>
        <span>综合评分：{{item.score}}分</span>
      </div>
    </div>

    <div class="home-news">
      <div class="home-title">企业直报总览</div>
      <div class="industry-monitor-data">
        <div
          class="industry-monitor-data-item" 
          v-for="(item, index) in industryMonitorData.echartsData" :key="index"
        >
          <chart class="setChart" :options="item" :auto-resize="true"></chart>
          <p class="industry-monitor-p">{{ orgOptions[index] }}</p>
        </div>
      </div>
    </div>
    <div class="copyright">
      <div class="footer" style="height: 40px">
        版权所有权：@云南省工业和信息化厅
      </div>
    </div>
  </div>
</template>

<script src="../js/home.js">
</script>

<style>
.setChart {
  width: 80px;
  height: 80px;
  right: "-15%";
}
.home {
  width: 100%;
  overflow: hidden;
  margin: auto;
}
.home-top {
  padding: 10px;
  height: 100px;
  padding-bottom: 0;
}
.home-top-cont {
  width: 96%;
  height: 80px;
  border-radius: 10px;
  display: flex;
  margin-left: 20px;
  background-color: #eef7f7;
  justify-content: start;
  align-items: center;
  margin: auto;
  box-shadow: 4px 4px 10px 4px #ddd;
}

.home-top-cont img {
  width: 50px;
  margin-left: 20px;
}
.user-logout {
  margin-left: 20px;
}
.home-title {
  text-align: left;
  padding-left: 10px;
  font-size: 13px;
  color: #000;
  font-weight: 600;
  margin-left: 24px;
  border-left: 4px solid rgba(18, 166, 255, 1);
}
.home-mon {
  padding-top: 10px;
  width: 100%;
  margin: auto;
  background-color: #fff;
  margin-bottom: 20px;
}
.home-mon-cont {
  margin-top: 10px;
  width: 96%;
  margin: auto;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
}
.home-mon-cont img {
  width: 50%;
}
.home-watch-ul {
  margin-top: 10px;
}
.home-watch-ul li {
  height: 40px;
  line-height: 40px;
  width: 86%;
  font-size: 10px;
  margin: auto;
  border-radius: 6px;
  margin-bottom: 10px;
  background-color: #f4f6f9;
  box-shadow: 4px 4px 10px #ddd;
  display: flex;
  padding-left: 20px;
}
.home-watch-ul li:nth-child(1) .bigNum {
  margin: 0px 90px;
  margin-right: 140px;
}
.home-watch-ul li:nth-child(2) .bigNum {
  margin: 0px 90px;
  margin-right: 100px;
}
.home-watch-ul li:nth-child(3) .bigNum {
  margin: 0px 90px;
  margin-right: 40px;
}
.home-watch-ul li:nth-child(4) .bigNum {
  margin: 0px 70px;
  margin-right: 140px;
}
.home-watch-ul li:nth-child(5) .bigNum {
  margin: 0px 80px;
  margin-right: 50px;
}
.bigNum {
  font-size: 20px;
  color: rgba(18, 150, 219, 1);
  margin: 0px 80px;
}
.home-watch-logo {
  width: 100%;
  display: flex;
  margin-top: 20px;
  justify-content: center;
}
.home-watch-logo-item {
  width: 29%;
  display: flex;
  font-size: 8px;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.home-watch-logo-item img {
  width: 53px;
  height: 53px;
}
.home-watch-logo-item-cont {
  font-size: 8px;
  color: #000;
  line-height: 30px;
}
.industry-monitor-eh {
  display: flex;
  text-align: center;
  background: #ffffff;
  text-align: center;
  border-radius: 10px;
}
.home-news {
  height: 160px;
}
.industry-monitor-data {
  margin: auto;
  width: 90%;
  display: flex;
  justify-content: space-around;
  margin-top: 10px;
}
.industry-monitor-data-item {
  width: 20%;
  display: flex;
  text-align: left;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  /* height: 200px; */
}
.industry-monitor-p {
  font-size: 8px;
}
.copyright {
  margin-top: 12px;
  margin-bottom: 20px;
}


</style>
<style scoped>

/* 咨询 */
.news {
  margin-bottom: 10px;
}
.bbd-notice-item {
  background-color:#fff;
	padding: 5px;
  text-align: left;
	font-size: 12px;
	color: #666;
	cursor: pointer;
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
}
.bbd-notice-item:hover {
	color: #409eff;
}
.bbd-notice-more {
  background-color:#fff;
	padding: 5px 20px;
  text-align: right;
	font-size: 12px;
	color: #888;
	cursor: pointer;
}
.bbd-notice-more:hover {
	color: #409eff;
}


/* 重点企业 */
.menagement-item {
  text-align: left;
  padding: 10px;
  background-color: #fff;
  margin-bottom: 10px;
  border-bottom: 1px solid #f0f0f0;
}
.menagement-item span {
  display: inline-block;
  vertical-align: top;
  width: 50%;
}
.menage-title {
  margin-bottom: 6px;
  font-size: 14px;
  font-weight: bolder;
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
}

/* 项目管理 */
.menage-item {
  display: inline-block;
  vertical-align: top;
  width: 33.333%;
  padding: 10px 0;
	text-align: center;
}
.menage-item span {
  display: block;
  font-size: 16px;
  font-weight: bolder;
}
</style>