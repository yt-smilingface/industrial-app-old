<template>
  <div class="login">
    <div class="login-img">
      <img src="@/assets/image/login/login-bg.png" class="login-img" alt="" />
      <div class="login-img-cont">
        <div class="login-img-title">云南省工业经济运行监测管理平台</div>
        <div class="login-img-sectitle">云南省工业和信息化厅</div>
      </div>
    </div>
    <div class="login-title">
      <ul class="login-title-ul">
        <li :class="form.type == 1 ? 'active' : ''" @click="form.type = 1">
          政府登录
        </li>
        <li :class="form.type == 2 ? 'active' : ''" @click="form.type = 2">
          企业登录
        </li>
      </ul>
    </div>
    <div class="login-cont" v-if="form.type === 1">
      <van-form @submit="handleLogin">
        <van-field
          v-model="form.username"
          placeholder="用户名"
          class="login-box-item"
          left-icon="contact"
          :rules="[{ required: true, message: '请填写用户名' }]"
          autocomplete="off"
          disableautocomplete
        />
        <van-field
          v-model="form.password"
          placeholder="密码"
          type="password"
          class="login-box-item"
          left-icon="https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=468352180,2516833877&fm=26&gp=0.jpg"
          right-icon="eye-o"
          :rules="[
            { validator: passwordValidator, message: '密码最少6位字符' },
          ]"
          autocomplete="off"
          disableautocomplete
        />
        <div style="margin: 16px" class="login-btn">
          <van-button round block type="info" native-type="submit"
            >登录</van-button
          >
        </div>
      </van-form>
    </div>
    <!-- 企业端 -->
    <div class="login-cont" v-if="form.type === 2">
      <van-form @submit="handleLogin">
        <van-field
          v-model="form.username"
          placeholder="用户名"
          class="login-box-item"
          left-icon="contact"
          :rules="[{ required: true, message: '请填写用户名' }]"
          autocomplete="off"
          disableautocomplete
        />
        <van-field
          v-model="form.password"
          placeholder="密码"
          type="password"
          class="login-box-item"
          left-icon="https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=468352180,2516833877&fm=26&gp=0.jpg"
          right-icon="eye-o"
          :rules="[
            { validator: passwordValidator, message: '密码最少6位字符' },
          ]"
          autocomplete="off"
          disableautocomplete
        />
        <div class="register-account-button" @click="registerAccount">
          账号注册
        </div>
        <div style="margin: 16px" class="login-btn">
          <van-button round block type="info" native-type="submit"
            >登录</van-button
          >
        </div>
      </van-form>
    </div>

    <div class="login-bottom">版权所有：@云南省工业和信息化厅</div>
  </div>
</template>

<script src="../js/login.js">
</script>

<style>
.login {
  width: 100%;
  text-align: center;
  margin: 0 auto;
}
.login-title {
  height: 70px;
  width: 80%;
  margin: auto;
  display: flex;
  justify-content: center;
  align-items: center;
}
.login-img {
  width: 100%;
  margin-bottom: 60px;
}
.login-title-ul li {
  float: left;
  height: 40px;
  font-weight: 600;
  width: 135px;
  border-bottom: 3px solid #ccc;
  color: #ccc;
  font-size: 16px;
  line-height: 40px;
}
.login-title-ul li.active {
  color: #3c90f7;
  border-bottom: 3px solid #3c90f7;
}
.login-title img {
  width: 80px;
}
.login-cont {
  width: 80%;
  margin: auto;
  margin-bottom: 10px;
}
.forgetPass {
  width: 85%;
  line-height: 40px;
  text-align: right;
}
.forgetPass2 {
  width: 40%;
  line-height: 40px;
  text-align: right;
  float: left;
}
.register-account-button {
  line-height: 1.066667rem;
  text-align: right !important;
  float: right;
  margin-left: 4%;
  font-size: 0.433333rem;
  color: #3c90f7;
}
.login-box-item .van-field__control {
  font-size: 14px;
}

.login-btn {
  border-radius: 35px;
  width: 80%;
  position: absolute !important;
  top: 70%;
  left: 10%;
}
.login-img {
  position: relative;
}
.login-img-cont {
  top: 40px;
  left: 0px;
  right: 0;
  bottom: 0;

  position: absolute;
}
.login-img-title {
  font-size: 20px;
  font-weight: 600;
  text-align: center;
  color: #fff;
}
.login-img-sectitle {
  font-size: 14px;
  margin-top: 20px;
  color: #fff;
  text-align: center;
}
.login-bottom {
  width: 100%;
  position: absolute;
  text-align: center;
  font-size: 10px;
  line-height: 34px;
  bottom: 40px;
}
</style>