<template>
  <div class="interactive-message">
    <!--  -->
    <div class="enterprise-interaction">
      <div class="enterprise-interaction-details">
        <div class="enterprise-one">政企互动专区</div>
        <div class="enterprise-two">
          <p>我想对工信厅说@工信厅</p>
        </div>
      </div>
    </div>
    <!--  -->
    <div class="enterprise-message-form">
      <div class="enterprise-message-form2">
        <van-form
          validate-first
          @submit="onSubmit"
          label-width="100%"
          label-align="left"
          border
        >
          <van-field
            v-model="selectData.title"
            name="标题"
            label="标题"
            required
            show-error-message="true"
            maxlength="40"
            :rules="[{ validator: titleLength, message: '标题最长40个字符' }]"
          />
          <van-field
            readonly
            clickable
            name="picker"
            :value="selectData.category"
            label="分类"
            show-error-message="true"
            required
            placeholder="点击选择分类"
            @click="showPicker = true"
          />
          <van-popup v-model="showPicker" position="bottom">
            <van-picker
              item-height="100%"
              show-toolbar
              :columns="columns"
              @confirm="onConfirm"
              @cancel="showPicker = false"
            />
          </van-popup>

          <van-field
            name="checkboxGroup"
            label="责任处室"
            required
            class="enterprise-message-form3"
          >
            <template #input>
              <van-checkbox-group
                v-model="checkboxGroup"
                direction="horizontal"
              >
                <van-checkbox
                  v-for="(item, index) in checkboxLeaveMessageDepVo"
                  :key="index"
                  :name="item.id"
                  shape="square"
                  >{{ item.name }}</van-checkbox
                >
              </van-checkbox-group>
            </template>
          </van-field>
          <van-field
            v-model="selectData.content"
            name="内容"
            label="内容"
            rows="4"
            type="textarea"
            required
            show-error-message="true"
            maxlength="1000"
            :rules="[
              { validator: contentLength, message: '类容最长1000个字符' },
            ]"
          />
          <!-- 提交 -->
          <div class="sign-now-button">
            <van-button type="info" class="sign-up-now" native-type="submit" :disabled="isClick">
              提交
            </van-button>
            <van-button
              type="default"
              class="cancel-button"
              native-type="button"
              @click="cancelButton"
            >
              取 消
            </van-button>
          </div>
        </van-form>
      </div>
    </div>
    <div class="copyright">
      <div class="footer" style="height: 40px">
        版权所有权：@云南省工业和信息化厅
      </div>
    </div>
  </div>
</template>

<script src="../js/InteractiveMessage.js">
</script>

<style>
.interactive-message {
  margin: auto;
  width: 100%;
}
.enterprise-message-form {
  margin: 20px auto;
  width: 100%;
  min-height: 450px;
}
.enterprise-message-form2 {
  margin: auto;
  width: 90%;
  background: #ffffff;
}
.enterprise-message-form2 .van-field__control {
  border: 1px solid #707070 !important;
}
.enterprise-message-form2 .van-cell {
  display: inline-block !important;
}
.enterprise-message-form3 .van-field__control {
  border: 0px solid #fff !important;
}
.enterprise-message-form3 .van-checkbox--horizontal {
  margin-top: 0.2rem !important;
}
</style>