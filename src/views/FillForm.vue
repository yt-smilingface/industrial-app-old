<template>
  <div class="enterprise-choice">
    <div class="miniheight">
      <div class="fill-form">
        <div class="home-title">待填报表单</div>
        <div class="pending-form">
          <div class="pending-form-details">
            <table border="1" class="pending-table">
              <tr>
                <th class="table-th1">序号</th>
                <th>表单名称</th>
                <th>填报期别</th>
                <th>本次填报期别</th>
                <th>填报截止时间</th>
                <th class="table-th6">操作</th>
              </tr>
              <tr v-for="(item, index) in tableData" :key="index">
                <td>{{ item.id }}</td>
                <td>{{ item.fillName }}</td>
                <td>
                  <template>
                    <div v-if="item.fillType === 0">月报</div>
                    <div v-if="item.fillType === 1">季报</div>
                    <div v-if="item.fillType === 2">年报</div>
                    <div v-if="item.fillType === 3">一次</div>
                  </template>
                </td>
                <td>{{ item.fillPeriod }}</td>
                <td>{{ item.endTime }}</td>
                <td>
                  <van-button size="mini" type="info" @click="pendingForm(item)"
                    >立即填报</van-button
                  >
                </td>
              </tr>
            </table>
          </div>
        </div>
      </div>
      <!--  -->
      <div class="fill-form" v-if="formIndex === '1'">
        <div class="home-title">历史填报表单</div>
        <div class="pending-form">
          <div class="pending-form-details">
            <table border="1" class="pending-table">
              <tr>
                <th class="table-th1">序号</th>
                <th>表单名称</th>
                <th>填报期别</th>
                <th>本次填报期别</th>
                <th>填报截止时间</th>
                <th class="table-th6">操作</th>
              </tr>
              <tr v-for="(item, index) in tableDataTwo" :key="index">
                <td>{{ item.id }}</td>
                <td>{{ item.fillName }}</td>
                <td>
                  <template>
                    <div v-if="item.fillType === 0">月报</div>
                    <div v-if="item.fillType === 1">季报</div>
                    <div v-if="item.fillType === 2">年报</div>
                    <div v-if="item.fillType === 3">一次</div>
                  </template>
                </td>
                <td>{{ item.fillPeriod }}</td>
                <td>{{ item.endTime }}</td>
                <td>
                  <van-button size="mini" type="info" @click="lookForm(item)"
                    >查 看</van-button
                  >
                </td>
              </tr>
            </table>
          </div>
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

<script src="../js/FillForm.js">
</script>

<style>
.fill-form {
  margin: 20px auto 0px;
  width: 100%;
}
.pending-form {
  width: 100%;
  margin: 18px auto 0px;
  text-align: center;
}
.pending-form-details {
  width: 94%;
  margin: auto;
  background: #ffffff;
  border-radius: 4px;
}
.table-th1 {
  width: 0.67rem;
}
.table-th6 {
  width: 1.4rem;
}
.miniheight {
  min-height: 600px;
}
.pending-table .van-button--mini {
  padding: 0 0 !important;
}
</style>