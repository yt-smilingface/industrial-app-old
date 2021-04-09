<template>
  <div class="bbd-menagement">
    <van-nav-bar
      title="项目管理"
      left-text="返回"
      left-arrow
      @click-left="$router.go(-1)"
    />
    <div class="bbd-static">
      <div class="menage-item">项目总个数<span class="menageNum">{{manage.projects}}个</span></div>
      <div class="menage-item">项目总投资<span class="menageNum">{{manage.projectAmounts}}亿元</span></div>
      <div class="menage-item">投资总进度<span class="menageNum">{{manage.schedule}}%</span></div>
    </div>

     <chart
      style="width:100%;height: 500px;background-color:#fff;margin-bottom: 10px;"
      :options="echartsOptions"
      :auto-resize="true"
    ></chart>

    <van-form @submit="onSubmit">
      <van-field
        v-model="inputInfo.name"
        name="项目名称"
        label="项目名称"
        placeholder="项目名称"
      />
      <van-field
        v-model="inputInfo.ownedEnterprise"
        name="归属企业"
        label="归属企业"
        placeholder="归属企业"
      />
      <div style="margin: 16px;">
        <van-button type="primary" native-type="submit" style="margin-right: 20px;">搜索</van-button>
        <van-button type="default" @click="cancelClick">重置</van-button>
      </div>
    </van-form>

    <div class="bbd-item" v-for="(item, index) in menagementOptions" :key="index">
      <div class="bbd-title">{{item.name}}</div>
      <div class="bbd-label">归属企业：{{item.ownedEnterprise}}</div>
      <div class="bbd-label">所在州市：{{item.cityName}}</div>
      <div class="bbd-label">所属行业：{{item.industryName}}</div>
      <div class="bbd-label">时间：{{item.startTime}} - {{item.endTime}}</div>
      <div class="bbd-label">总投资：{{item.proTotalInvestment}}万元</div>
    </div>  

    <van-pagination style="margin-bottom: 40px;" v-model="curPage" :total-items="total" :items-per-page="limit" @change="paginatioinChange" />


  </div>
</template>

<script>
import axios from "axios";
import {baseURL, token} from '@/utils/baseUrl.js'
export default {
  data() {
    return {
      baseURL: baseURL,
      token: token,

      manage: {},
      echartsOptions: {
        // title: {
        //   text: '项目阶段',
        //   left: 'center',
        //   textStyle: {
        //     fontSize: 36,
        //   }
        // },
        tooltip: {
          trigger: 'item'
        },
        color: ['#5470c6', '#91cc75', '#fac858', '#ee6666', '#73c0de', '#3ba272', '#fc8452', '#9a60b4', '#ea7ccc'],
        series: [{
          name: '项目类别',
          type: 'pie',
          radius: '50%',
          label: {
            formatter: '{b} {c}个',
          },
          "label": {
            "normal": {
                "show": true,
                "textStyle": {
                    "fontSize": 22
                }
            },
            "emphasis": {
                "show": true
            }
        },
          data: [],
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          }
        }],
      },

      inputInfo: {
        name: '',
        ownedEnterprise: ''
      },
      limit: 10,
      curPage: 1,
      total: 0,
      menagementOptions: []
    }   
  },
  mounted() {
    this.getMgenageData()
    this.getMenagementList()
  },
  methods: {
    // 获取项目信息
    getMgenageData() {
      axios( {
        method: 'GET',
        url: this.baseURL + 'projectManagement/getProjectManageCount',
        headers: {
          'Content-Type': 'application/json;charset=utf8',
          Authorization: this.token
        }
      }).then((res) => {
        this.manage = res.data.data
        this.manage.projectAmounts = (this.manage.projectAmounts/10000).toFixed(2)
        this.manage.schedule = this.manage.schedule.toFixed(2)

        
				let mangementTypeData = []
				this.manage.projectTypeCount.forEach(item => {
						if (item.projectType == 0) {
								item.projectType = '在谈'
						} else if (item.projectType == 1) {
								item.projectType = '签约'
						} else if (item.projectType == 2) {
								item.projectType = '新开工'
						} else if (item.projectType == 3) {
								item.projectType = '续建'
						} else if (item.projectType == 4) {
								item.projectType = '竣工投产'
						} else if (item.projectType == null) {
								item.projectType = '其它'
						}
						let obj = {}
						obj.name = item.projectType
						obj.value = item.typeCount
						mangementTypeData.push(obj)
				})
        this.echartsOptions.series[0].data = mangementTypeData

      })
    },

    // 获取项目列表
    getMenagementList() {
      const params = {
        name: this.inputInfo.name,
        ownedEnterprise: this.inputInfo.ownedEnterprise,
        limit: this.limit,
        curPage: this.curPage
      }
      axios( {
        method: 'POST',
        url: this.baseURL + 'projectManagement/list_all',
        headers: {
          'Content-Type': 'application/json;charset=utf8',
          Authorization: this.token
        },
        data: params
      }).then((res) => {
        this.total = res.data.cum
        this.menagementOptions = res.data.data
      })
    },

    // 搜索
    onSubmit(data) {
      this.inputInfo.name = data.项目名称
      this.inputInfo.ownedEnterprise = data.归属企业
      this.getMenagementList()
    },

    // 重置
    cancelClick() {
      this.inputInfo.name = ''
      this.inputInfo.ownedEnterprise = ''
      this.limit = 10
      this.curPage = 1
      this.getMenagementList()
    },

    // 页码改变
    paginatioinChange(data) {
      this.curPage = data
      this.getMenagementList()
    },
  }
}
</script>

<style scoped>

/* 项目管理 */
.bbd-static {
  margin-bottom: 10px;
  margin-top: 10px;
  background-color: #fff;
}
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

/* 项目列表 */
.bbd-item {
  text-align: left;
  padding: 10px;
  margin-bottom: 10px;
  background-color: #fff;
}
.bbd-title {
  font-size: 14px;
  font-weight: bolder;
}
.bbd-label {
  margin-top: 6px;
  display: inline-block;
  vertical-align: top;
  width: 10 0%;
  font-size: 12px;
  color:#666;
}
</style>