<template>
  <div class="register-account">
    <div class="title-name">
      <p>云南省工业经济运行监测管理平台</p>
    </div>
    <div class="registered-title">
      <p>企业注册</p>
    </div>
    <div class="registered-form">
      <div class="registered-form-two">
        <van-form
          validate-first
          @failed="onFailed"
          @submit="signUpNow"
          label-width="3rem"
          label-align="right"
          border
        >
          <van-field
            v-model="formInfo.username"
            name="用户名"
            label="用户名"
            required
            show-error-message="true"
            autocomplete="off"
            disableautocomplete
            :rules="[{ pattern: uPattern, message: '请输入用户名' }]"
          />
          <van-field
            v-model="formInfo.enterpriseName"
            name="企业名称"
            label="企业名称"
            required
            show-error-message="true"
            autocomplete="off"
            disableautocomplete
            :rules="[{ required: true, message: '请输入企业名称' }]"
          />
          <van-field
            v-model="formInfo.name"
            name="企业联系人姓名"
            label="企业联系人姓名"
            required
            show-error-message="true"
            autocomplete="off"
            disableautocomplete
            :rules="[{ required: true, message: '请输入企业联系人姓名' }]"
          />
          <van-field
            v-model="formInfo.phone"
            name="phone"
            label="手机号"
            required
            show-error-message="true"
            autocomplete="off"
            disableautocomplete
            :rules="[{ pattern: phoneReg, message: '请输入手机号' }]"
          />
          <van-field
            v-model="formInfo.password"
            name="password"
            label="登录密码"
            type="password"
            required
            show-error-message="true"
            autocomplete="off"
            disableautocomplete
            :rules="[{ validator: passwordRulse, message: '请输入正确内容' }]"
          />
          <van-field
            v-model="formInfo.repassword"
            name="repassword"
            label="确认登录密码"
            type="password"
            required
            show-error-message="true"
            autocomplete="off"
            disableautocomplete
            :rules="[{ validator: repassword, message: '两次密码不一致' }]"
          />
          <van-field
            v-model="formInfo.code"
            center
            clearable
            required
            label="验证码"
            name="code"
            autocomplete="off"
            disableautocomplete
            :rules="[{ validator: verificationCode, message: '验证码不对' }]"
          >
            <template #button>
              <van-button @click="gainCode" type="info" native-type="button">{{
                verificationCodeData
              }}</van-button>
            </template>
          </van-field>
          <div class="sign-now-button">
            <van-button type="info" class="sign-up-now" native-type="submit">
              立即注册
            </van-button>
            <van-button
              type="default"
              class="cancel-button"
              @click="cancelButton"
              native-type="button"
            >
              取 消
            </van-button>
          </div>
        </van-form>
      </div>
    </div>
  </div>
</template>

<script src="../js/RegisterAccount.js">
</script>

<style>
* {
  font-family: PingFang SC, PingFang SC-Regular;
}
.register-account {
  text-align: center;
  margin: 0 auto;
}
.title-name {
  width: 100%;
  height: 46px;
  background: #0090ff;
}
.title-name p {
  font-size: 20px;
  font-weight: 400;
  line-height: 46px;
  text-align: center;
  color: #ffffff;
}
.registered-title {
  margin: 20px auto 12px;
  width: 100%;
  height: 28px;
  font-size: 20px;
  font-weight: 400;
  text-align: center;
  color: #000000;
}
.registered-form {
  width: 100%;
  margin: auto;
  /* height: 11rem; */
}
.registered-form-two {
  width: 96%;
  margin: auto;
  border-radius: 5px;
  box-shadow: 0px 3px 6px 0px rgba(0, 0, 0, 0.16);
  background: #fff;
  height: 100%;
}
.sign-now-button {
  margin: 16px;
}
.sign-up-now {
  margin-right: 20px !important;
  width: 2.6rem;
}
.cancel-button {
  width: 2.6rem;
}
.registered-form-two .van-field__control {
  border: 1px solid #707070 !important;
  border-radius: 4px;
  box-shadow: 0px 3px 6px 0px rgb(0 0 0 / 16%);
  height: 0.9rem;
  padding-left: 0.2rem;
}
.registered-form-two .van-field__label {
  line-height: 0.9rem;
}
.registered-form-two .van-cell {
  padding: 0.166667rem 0.426667rem !important;
}
</style>