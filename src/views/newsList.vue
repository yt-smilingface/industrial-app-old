<template>
  <div class="bbd-new-list">
    <van-nav-bar
      title="咨询列表"
      left-text="返回"
      left-arrow
      @click-left="$router.go(-1)"
    />
    <div class="bbd-new-item" v-for="(item, index) in newOptions" :key="index" @click="noticechange(item)">
      <span style="margin-right: 10px;">{{item.gmtCreate}}</span>
      <span class="bbd-name" :title="item.name">{{item.fileName}}</span>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import {baseURL, token} from '@/utils/baseUrl.js'
export default {
  // name: 'newList',
  data(){
    return {
      type: '',
      newOptions: [],
      userInfo: '',
      baseURL: baseURL,
      token: token,
    }
  },
  mounted() {
    this.userInfo = JSON.parse(localStorage.getItem('userInfo'));
    this.type = this.$route.query.type
    this.$route.meta.CName = this.$route.query.noticeName
    this.getNoticeData(this.type)
  },
  methods: {
		// 获取咨询数据
		getNoticeData(type) {
      axios( {
          method: 'GET',
          url: this.baseURL + 'tbbdfileinfo/list_all?type=' + type,
          headers: {
              'Content-Type': 'application/json;charset=utf8',
              Authorization: this.token
          }
      }).then((res) => {
        console.log(res)
				this.newOptions = res.data.data
				this.newOptions.forEach(item => {
					if(type == '6') {
						if(/^([0-9-]+)$/.test(item.fileName.substring(0,10))) {
							item.fileName = item.fileName.substring(10)
						}
					}
					item.gmtCreate = item.gmtCreate.substring(0, 10)
				})
    	})
		},
		// 点击咨询列表
		noticechange(item) {
			window.open(item.path)
		},
  }
}
</script>

<style scoped >
.bbd-new-list {
  background-color: #fff;
  padding: 20px;
}
.bbd-new-item {
  text-align: left;
  margin-bottom: 10px;
  font-size: 12px;
  color: #666;
}
.bbd-new-item:hover {
  color: #409eff;
}
.bbd-btn {
  margin-left: 10px;
}

</style>