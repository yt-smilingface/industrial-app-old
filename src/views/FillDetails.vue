<template>
  <div class="basic-information-form">
    <div class="fill-form">
      <div class="home-title">基本信息</div>
      <div class="basic-information">
        <div class="basic-form">
          <van-form validate-first label-width="390" :colon="colonTrue" border>
            <van-field
              v-model="tableData.fillName"
              name="表单名称"
              label="表单名称"
              border
              disabled
            ></van-field>
            <van-field
              v-model="userInfo.enterpriseUserInfoVo.enterpriseName"
              name="上报企业"
              label="上报企业"
              border
              disabled
            ></van-field>
            <van-field
              v-model="tableData.fillType"
              name="本次填报期别"
              label="本次填报期别"
              border
              disabled
            ></van-field>
          </van-form>
        </div>
      </div>
    </div>
    <!--  -->
    <div class="fill-form">
      <div class="home-title">填报内容</div>
      <div class="basic-information">
        <div class="basic-form">
          <van-form validate-first label-width="100%" :colon="colonTrue" border>
            <van-field
              v-for="(itme, index) in tableData.contentJson"
              :key="index"
              v-model="inputData['input' + (index + 1)]"
              :name="tableData.contentJson[index].name"
              :label="tableData.contentJson[index].name"
              border
              :disabled="formIndex === '0' ? false : true"
            ></van-field>
            <!-- 提交 -->
            <div class="sign-now-button">
              <van-button type="info" @click="onSubmit" class="sign-up-now">
                提交
              </van-button>
              <van-button
                type="default"
                class="cancel-button"
                @click="cancelButton"
              >
                取 消
              </van-button>
            </div>
          </van-form>
          <!-- <van-form
            validate-first
            label-width="290"
            :colon="colonTrue"
            border
            @submit="onSubmit"
          >
            <div class="fill-content-title">单位详细名称:</div>
            <van-field v-model="username" border></van-field>
            <div class="fill-content-title">法定代表人(单位负责人):</div>
            <van-field v-model="username" border></van-field>
            <div class="fill-content-title">单位所在地:</div>
            <van-field
              readonly
              clickable
              :value="value"
              @click="showPicker = true"
            />
            <van-popup v-model="showPicker" round position="bottom">
              <van-area
                show-toolbar
                :area-list="areaList"
                @cancel="showPicker = false"
                @confirm="onConfirm"
              />
            </van-popup>
            <div class="fill-content-title">网址:</div>
            <van-field v-model="a" border></van-field>
            <div class="fill-content-title">是否有出口业务:</div>
            <van-radio-group
              v-model="radio"
              direction="horizontal"
              class="ckyw-radio"
            >
              <van-radio name="1" shape="square">是</van-radio>
              <van-radio name="2" shape="square">否</van-radio>
            </van-radio-group>
            <div class="fill-content-title">登记注册类型:</div>
            <van-radio-group
              v-model="radio"
              direction="horizontal"
              class="ckyw-radio"
            >
              <van-radio name="1" shape="square">国有</van-radio>
              <van-radio name="2" shape="square">集体</van-radio>
              <van-radio name="3" shape="square">股份</van-radio>
              <van-radio name="4" shape="square">股份合作</van-radio>
              <van-radio name="5" shape="square">三资</van-radio>
              <van-radio name="6" shape="square">私营</van-radio>
              <van-radio name="7" shape="square">其他</van-radio>
            </van-radio-group>
            <div class="fill-content-title">是否国有控股:</div>
            <van-radio-group
              v-model="radio"
              direction="horizontal"
              class="ckyw-radio"
            >
              <van-radio name="1" shape="square">是</van-radio>
              <van-radio name="2" shape="square">否</van-radio>
            </van-radio-group>

        
            <div class="sign-now-button">
              <van-button type="info" native-type="submit" class="sign-up-now">
                提交
              </van-button>
              <van-button
                type="default"
                class="cancel-button"
                @click="cancelButton"
              >
                取 消
              </van-button>
            </div>
          </van-form> -->
        </div>
      </div>
    </div>
  </div>
</template>

<script src="../js/FillDetails.js">
</script>

<style>
.basic-information-form {
  margin: auto;
  width: 100%;
}
.basic-information {
  margin: 10px auto 10px;
  width: 94%;
  background: #ffffff;
}
.basic-form {
  width: 100%;
  text-align: left;
}
.basic-form .van-cell {
  display: inline-block !important;
}

.basic-form .van-field__control {
  border: 1px solid #707070 !important;
}
.fill-content-title {
  font-size: 14px;
  padding-left: 20px;
}
.ckyw-radio {
  margin-top: 11px;
  margin-left: 16px;
  margin-bottom: 10px;
}
/*  */
.sign-now-button {
  margin: 16px;
  text-align: center;
}
.sign-up-now {
  margin-right: 20px !important;
  width: 2.8rem;
  height: 0.89rem !important;
  margin-bottom: 10px !important;
}
.cancel-button {
  height: 0.89rem !important;
  width: 2.8rem;
  margin-bottom: 10px !important;
}
</style>