<template>
  <div class="bbd-menagement">
    <div class="home-top">
      <div class="home-top-cont">
        <img src="../assets/image/home/header.png" alt="" />
        <div>你好，{{ userInfo.username }}！</div>
        <div>个人中心</div>
        <div class="user-logout">
          <van-button type="info" @click="$router.push('/')" size="mini"
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
      <div class="home-title" style="margin-bottom: 20px;">工业经济运行监测</div>
			<van-dropdown-menu active-color="#1989fa" direction="up"> 
				<van-dropdown-item v-model="industrialValue" :options="industrialOptions" @change="industrialChange" />
			</van-dropdown-menu>

			<div class="bbd-industrial-value">
				<div class="bbd-industrial-title">云南省：{{industrialName}}</div>
				<div class="bbd-industrial-item" v-if="isIndustrialCumul">累计值(亿元) <span>{{industrialCumul}}</span></div>
				<div class="bbd-industrial-item" v-if="isIndustrialIncrease">同比增长(%) <span>{{industrialIncrease}}</span></div>
			</div>


		</div>

    <div class="home-mon">
      <div class="home-title" style="margin-bottom: 20px;">产业企业发展情况</div>
      <div class="bbd-developmont-echarts">
        <div class="bbd-tips">
          {{developmontTips}}<br/>
          <span style="font-size: 18px;">{{developmontValue}}</span>
        </div>
        <div id="developmentEcharts" style="width:100%;height:350px;"></div>
      </div>
      <div class="bbd-industry-echarts">
				<van-dropdown-menu active-color="#1989fa" direction="down"> 
					<van-dropdown-item v-model="developmentValue" :options="developmentOptions" @change="devolopmentChange" />
				</van-dropdown-menu>
        <div id="industryEcharts" style="width:100%;height:350px;"></div>
      </div>
      <!-- <div style="margin-top: 0;border-top: 1px solid #ddd;">
        <div class="bbd-industry-title">{{monitorTitle}}规上企业 ({{monitorSumCompany}}家)</div>
        <div class="bbd-industry-table" style="width: 800px">
          <el-table class="bbd-ranking-yunnan-table" :data="distributionData" style="height: 300px; overflow: auto;">
            <el-table-column prop="companyName" align="center" label="企业名称" min-width="200" show-overflow-tooltip> </el-table-column>
            <el-table-column prop="city" align="center" label="所属州市" show-overflow-tooltip> </el-table-column>
            <el-table-column prop="industry" align="center" min-width="200" label="行业">	</el-table-column>
            <el-table-column prop="registeredCapital" width="130" align="right" label="注册资本(万元)">	</el-table-column>
          </el-table>
        </div>	
        <div class="bbd-distribution-echarts" style="width: 370px;height:350px;overflow:hidden;">
          <div id="distributionEcharts" style="margin-top: -40px;margin-left: 0px;width:380px;height:	380px;"></div>
        </div>
      </div> -->
    </div>


    <div class="home-mon">
      <div class="home-title">项目管理 
        <span style="float:right;margin-right: 20px;" @click="$router.push('/menagement')">更多</span>
      </div>
      <div class="menage-item">项目总个数<span class="menageNum">{{manage.projects}}个</span></div>
      <div class="menage-item">项目总投资<span class="menageNum">{{manage.projectAmounts}}亿元</span></div>
      <div class="menage-item">投资总进度<span class="menageNum">{{manage.schedule}}%</span></div>
    </div>


  </div>
</template>

<script>
import axios from "axios";
import echarts from 'echarts'
import {baseURL, token} from '@/utils/baseUrl.js'

export default {
  components: {
    
  },
  data() {
    return {
      baseURL: baseURL,
      token: token,
      userInfo: {},

      noticeOptions: [],
      newsActive: 0,

      manage: {},

			// 工业运行监测
			industrialValue: '24521.90',
			industrialOptions: [],

			industrialName: '',
			industrialCumul: '',
			industrialIncrease: '',
			isIndustrialCumul: true,
			isIndustrialIncrease: true,

      // 产业行业
      developmontTips: '',
      developmontValue: '',
      developmentValue: '1',
      developmentOptions: [],

      
			// 产业行业发展情况图表数据
			industryEchartsOption: {}

    }   
  },
  mounted() {
    this.userInfo = JSON.parse(localStorage.getItem('userInfo'));
    this.getNoticeData()
    this.getMgenageData()
    this.getOutputData()
		this.getMonitorListData()
  },
  methods: {
    
    // 获取咨询列表
    getNoticeData(type) {
        if(this.newsActive == 0) {
            type = 1
        } else if(this.newsActive == 1) {
            type = 3
        } else if(this.newsActive == 2) {
            type = 4
        } else if(this.newsActive == 3) {
            type = 6
        }
        axios( {
            method: 'GET',
            url: this.baseURL + 'tbbdfileinfo/list_all?type=' + type + '&officeCode=' + this.userInfo.departmentInfoId,
            headers: {
                'Content-Type': 'application/json;charset=utf8',
                Authorization: this.token
            }
        }).then((res) => {
            this.noticeOptions = res.data.data.splice(0,5)
            this.noticeOptions.forEach(item => {
                if(type == 6) {
                    if(/^([0-9-]+)$/.test(item.fileName.substring(0,10))) {
                        item.fileName = item.fileName.substring(10)
                    }
                }
                item.gmtCreate = item.gmtCreate.substring(0, 10)
            })
        })


    },



    // 咨询选项卡点击
    noticeClick(name, title) {
        let type = 1
        if(this.newsActive == 0) {
            type = 1
        } else if(this.newsActive == 1) {
            type = 3
        } else if(this.newsActive == 2) {
            type = 4
        } else if(this.newsActive == 3) {
            type = 6
        }
        this.getNoticeData(type)
        
    },

    // 点击咨询列表
    noticechange(item) {
        window.open(item.path)
    },

    // 点击更多
    noticeMore() {
        let type = 1
        if(this.newsActive == 0) {
            type = 1
        } else if(this.newsActive == 1) {
            type = 3
        } else if(this.newsActive == 2) {
            type = 4
        } else if(this.newsActive == 3) {
            type = 6
        }
        this.$router.push({path: '/newsList', query: {type: type}})
    },
    
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

        
				// let mangementTypeData = []
				// this.manage.projectTypeCount.forEach(item => {
				// 		if (item.projectType == 0) {
				// 				item.projectType = '在谈'
				// 		} else if (item.projectType == 1) {
				// 				item.projectType = '签约'
				// 		} else if (item.projectType == 2) {
				// 				item.projectType = '新开工'
				// 		} else if (item.projectType == 3) {
				// 				item.projectType = '续建'
				// 		} else if (item.projectType == 4) {
				// 				item.projectType = '竣工投产'
				// 		} else if (item.projectType == null) {
				// 				item.projectType = '其它'
				// 		}
				// 		let obj = {}
				// 		obj.name = item.projectType
				// 		obj.value = item.typeCount
				// 		mangementTypeData.push(obj)
				// })
        // this.echartsOptions.series[0].data = mangementTypeData

      })
    },

    
		// 获取各产业总产值占比
		getOutputData() {
			var myChart = echarts.init(document.getElementById('developmentEcharts'));
			var datas = [
					{value: 174.41, name: '电子信息',industryCode:[39]},
					{value: 385.65, name: '石化化工',industryCode:[7,25,26]},
					{value: 352.44, name: '食品',industryCode:[13,14,15]},
					{value: 1246.33, name: '能源',industryCode:[6,7,25,44,45]},
					{value: 1176.18, name: '原材料',industryCode:[6,8,9,10,31,32,30]},
					{value: 1413.85, name: '烟草',industryCode:[16]},
					{value: 21.63, name: '交通物流',industryCode:[37]},
					{value: 36.95, name: '资源综合利用',industryCode:[42,46,12]},
					{value: 97.40, name: '装备制造',industryCode:[33,34,35,36,37,38,40,41,43]},
					{value: 122.34, name: '生物医药',industryCode:[27]},
					{value: 153.66, name: '消费品',industryCode:[17,18,19,20,21,22,23,24,28,29]},
				]
			var	option = {
					title: {
						text: '2020年1-12月工业增加值累计值占比',
						left: 'center',
						top: 0,
						textStyle: {
							color: "#409EFF",
              fontSize: 28,
						}
					},
					tooltip: {
							trigger: 'item'
					},
					legend:{
							right: 0,
							top: 50,
							orient:'vertical',
							tooltip:{
								show:true,
							},
              textStyle: {
                color: "#409EFF",
                fontSize: 22,
              },
							data: ['电子信息','石化化工','食品','能源','原材料','烟草','交通物流','资源综合利用','装备制造','生物医药','消费品']
					},
					color: ['#5470c6', '#91cc75', '#fac858', '#ee6666', '#73c0de', '#3ba272', '#fc8452', '#9a60b4', '#ea7ccc'],
					series: [
							{
									name: '',
									type: 'pie',
									center: ["30%", "54%"], 
									radius: ['60%', '80%'],
									avoidLabelOverlap: false,
									itemStyle: {
											borderRadius: 10,
											borderColor: '#fff',
											borderWidth: 2
									},
									label: {
											show: false,
											position: 'center'
									},
									emphasis: {
											label: {
													show: false,
													fontSize: '14',
													fontWeight: 'bold'
											}
									},
									labelLine: {
											show: false
									},
									data: datas
							}
					]
			};
			myChart.setOption(option);
			let index = 0
			let that = this
			let datasSum = 0
			datas.forEach(item => {
				datasSum = datasSum + item.value
			})

			// 阻止图例点击事件
			myChart.on('legendselectchanged', (params) => {
				// 处理自己的自定义事件
				// 阻止默认事件（原理就是将点击的图例重新选中）
				myChart.dispatchAction({
							type: 'legendSelect',
							name: params.name
					});
			});

			//设置默认选中高亮部分
			myChart.dispatchAction({type: 'highlight',seriesIndex: 0,dataIndex: 0});
			this.developmontTips = datas[0].name
			this.monitorTitle = datas[0].name
			this.developmontValue = datas[0].value + '亿元/' + 
				((datas[0].value / datasSum)*100).toFixed(2) + '%'
			// 移入的时候显示移入的数据
			myChart.on('mouseover', function(e) {
				if(e.dataIndex != index){
					that.developmontTips = e.data.name
					that.developmontValue = e.data.value + '亿元/' + ((e.data.value / datasSum)*100).toFixed(2) + '%'
					myChart.dispatchAction({type: 'downplay', seriesIndex: 0, dataIndex: index  });
					
				}
			})
			// 移出的时候显示移出时候的数据
			myChart.on('mouseout',function(e){
					index = e.dataIndex;
					that.developmontTips = e.data.name
					that.developmontValue = e.data.value + '亿元/' + ((e.data.value / datasSum)*100).toFixed(2) + '%'
					myChart.dispatchAction({type: 'highlight',seriesIndex: 0,dataIndex: e.dataIndex});
			});
			
			// 默认行业
			this.developmentValue = '1'
			// this.industryEchartsOption.title.text = datas[0].name + '产业下各行业增加值累计增速'
			this.developmentOptions = [
				{text: '计算机、通信和其他电子设备制造业', value: '1',dataSourceInfoId: 293,index: '60'},
			]
			
			let Industryparams = {
				appType: 1,
				area: 2,
				dataSourceInfoId: 293,
				fre: 1,
				index: "60",
				isAllIndex: 0,
				tabType: 7
			}
			this.devolopmentEcharts(this.developmentOptions[0])

			// 重点企业默认电子信息
			// this.getCrojectManagementData(39)

			// 移出的时候显示移出时候的数据
			myChart.on('click',function(e){
				that.monitorTitle = e.name
				if(e.name == '电子信息') {
					that.developmentOptions = [
						{text: '计算机、通信和其他电子设备制造业', value: '1',dataSourceInfoId: 293,index: '60',code: 39},
					]
				} else if(e.name == '生物医药') {
					that.developmentOptions = [
						{text: '医药制造业', value: '1',dataSourceInfoId: 190,index: '48',code: 27},
					]
				} else if(e.name == '石化化工') {
					that.developmentOptions = [
						{text: '石油和天然气开采业', value: '3',dataSourceInfoId: 196,index: '27',code: 7},
						{text: '石油、煤炭及其他燃料加工业', value: '4',dataSourceInfoId: 254,index: '46',code: 25},
						{text: '化学原料和化学制品制造业', value: '5',dataSourceInfoId: 257,index: '47',code: 26},
					]
				} else if(e.name == '食品') {
					that.developmentOptions = [
						{text: '农副食品加工业', value: '3',dataSourceInfoId: 217,index: '34',code: 13},
						{text: '食品制造业', value: '4',dataSourceInfoId: 220,index: '35',code: 14},
						{text: '酒、饮料和精制茶制造业', value: '5',dataSourceInfoId: 223,index: '36',code: 15},
					]
				} else if(e.name == '消费品') {
					that.developmentOptions = [
						{text: '纺织业', value: '1',dataSourceInfoId: 230,index: '38',code: 17},
						{text: '纺织服装、服饰业', value: '2',dataSourceInfoId: 233,index: '39',code: 18},	
						{text: '皮革、毛皮、羽毛及其制品和制鞋业', value: '3',dataSourceInfoId: 234,index: '40',code: 19},
						{text: '木材加工和木、竹、藤、棕、草制品业', value: '4',dataSourceInfoId: 237,index: '41',code: 20},
						{text: '家具制造业', value: '5',dataSourceInfoId: 240,index: '42',code: 21},
						{text: '造纸和纸制品业', value: '6',dataSourceInfoId: 243,index: '43',code: 22},
						{text: '印刷和记录媒介复制业', value: '7',dataSourceInfoId: 246,index: '44',code: 23},
						{text: '文教、工美、体育和娱乐用品制造业', value: '8',dataSourceInfoId: 249,index: '45',code: 24},
						{text: '化学纤维制造业', value: '9',dataSourceInfoId: 258,index: '49',code: 28},
						{text: '橡胶和塑料制品业', value: '10',dataSourceInfoId: 261,index: '50',code: 29},
					]
				} else if(e.name == '烟草') {
					that.developmentOptions = [
						{text: '烟草制品业', value: '1',dataSourceInfoId: 226,index: '37',code: 16},
					]
				} else if(e.name == '原材料') {
					that.developmentOptions = [
						{text: '煤炭开采和洗选业', value: '1',dataSourceInfoId: 193,index: '26',code: 6},
						{text: '黑色金属矿采选业', value: '2',dataSourceInfoId: 199,index: '28',code: 8},
						{text: '有色金属矿采选业', value: '3',dataSourceInfoId: 202,index: '29',code: 9},
						{text: '非金属矿采选业', value: '4',dataSourceInfoId: 205,index: '30',code: 10},
						{text: '黑色金属冶炼和压延加工业', value: '5',dataSourceInfoId: 267,index: '52',code: 31},
						{text: '有色金属冶炼和压延加工业', value: '6',dataSourceInfoId: 270,index: '53',code: 32},
						{text: '非金属矿物制品业', value: '7',dataSourceInfoId: 204,index: '30',code: 30},
					]
				} else if(e.name == '装备制造') {
					that.developmentOptions = [
						{text: '金属制品业', value: '1',dataSourceInfoId: 274,index: '54',code: 33},
						{text: '通用设备制造业', value: '2',dataSourceInfoId: 277,index: '55',code: 34},
						{text: '专用设备制造业', value: '3',dataSourceInfoId: 281,index: '56',code: 35},
						{text: '汽车制造业', value: '4',dataSourceInfoId: 284,index: '57',code: 36},
						{text: '铁路、船舶、航空航天和其他运输设备制造业', value: '5',dataSourceInfoId: 287,index: '50',code: 37},
						{text: '电气机械和器材制造业', value: '6',dataSourceInfoId: 290,index: '59',code: 38},
						{text: '仪器仪表制造业', value: '7',dataSourceInfoId: 296,index: '61',code: 40},
						{text: '其他制造业', value: '8',dataSourceInfoId: 299,index: '62',code: 41},
						{text: '金属制品、机械和设备修理业', value: '9',dataSourceInfoId: 305,index: '64',code: 43},
					]
				} else if(e.name == '资源综合利用') {
					that.developmentOptions = [
						{text: '废弃资源综合利用业', value: '1',dataSourceInfoId: 302,index: '63',code: 42},
						{text: '水的生产和供应业', value: '2',dataSourceInfoId: 317,index: '68',code: 46},
						{text: '其他采矿业', value: '3',dataSourceInfoId: 211,index: '32',code: 12},
					]
				} else if(e.name == '交通物流') {
					that.developmentOptions = [
						{text: '汽车制造业', value: '1',dataSourceInfoId: 284,index: '57',code: 32},
						{text: '铁路、船舶、航空航天和其他运输设备制造业', value: '2',dataSourceInfoId: 287,index: '58',code: 37},
					]
				} else if(e.name == '能源') {
					that.developmentOptions = [
						{text: '煤炭开采和洗选业', value: '1',dataSourceInfoId: 193,index: '26',code: 6},
						{text: '石油和天然气开采业', value: '3',dataSourceInfoId: 196,index: '27',code: 7},
						{text: '石油、煤炭及其他燃料加工业', value: '4',dataSourceInfoId: 252,index: '46',code: 25},
						{text: '电力、热力生产和供应业', value: '5',dataSourceInfoId: 311,index: '66',code: 44},
						{text: '燃气生产和供应业', value: '6',dataSourceInfoId: 314,index: '67',code: 45},
					]
				}

				// that.industryEchartsOption.title.text = e.name + '产业下各行业增加值累计增速'
				that.developmentValue = that.developmentOptions[0].value
				that.devolopmentEcharts(that.developmentOptions[0])

				// that.getCrojectManagementData(e.data.industryCode.toString())
			});
		},


		// 各行业点击
		devolopmentChange(value) {
			console.dir(value)
			this.developmentOptions.forEach(item => {
				if(item.value == value) {
					this.devolopmentEcharts(item)
				}
			})
		},

		// 选择产业行业相对变化
		devolopmentEcharts(item) {
			let params = {
				appType: 1,
				area: 2,
				dataSourceInfoId: item.dataSourceInfoId,
				fre: 1,
				index: item.index,
				isAllIndex: 0,
				tabType: 7
			}
			
			axios( {
				method: 'POST',
				url: this.baseURL + 'changeTrend/getIndustryChangeTrend',
				headers: {
						'Content-Type': 'application/json;charset=utf8',
						Authorization: this.token
				},
				data: params
			}).then((res) => {
				this.getIndustryData(res.data.data.x, res.data.data[item.dataSourceInfoId].yun_nan)
			})
		},
    
		// 获取监测图表数据
		getIndustryData(xAxisData, data) {
			var myChart = echarts.init(document.getElementById('industryEcharts'));
			var	option = {
					title: {
						text: '',
						textStyle: {
							color: "#409EFF"
						}
					},
					tooltip: {
					trigger: 'axis',
					axisPointer: {
							type: 'cross',
							crossStyle: {
									color: '#999'
							}
					}
				},
				color: ['#409EFF', '#67C23A', '#E6A23C', '#EE6666', '#F56C6C', '#09399'],
				legend: {
						top: 30,
						x: 'center',
						data: ['行业增加值累计增速']
				},
				xAxis: [
						{
								type: 'category',
								data: xAxisData,
								axisPointer: {
										type: 'shadow'
								},
								axisLabel: {  
									interval:0,  
									rotate:40  
								}
						}
				],
				yAxis: [
					{
						type: 'value',
						axisLabel: {
							formatter: '{value} %'
						}
					}
				],
				series: [
						{
						name: '行业增加值累计增速',
						type: 'line',
						itemStyle: {normal: {color: "#9dd3e8"}},
						data: data
					}
				]
			}
			myChart.setOption(option, true);
		},

		
		// 获取工业运行监测列表
		getMonitorListData() {
			axios( {
				method: 'GET',
				url: this.baseURL + 'nationwide/getVariousIndicatorsData',
				headers: {
						'Content-Type': 'application/json;charset=utf8',
						Authorization: this.token
				},
			}).then((res) => {
			// 	this.getIndustryData(res.data.data.x, res.data.data[item.dataSourceInfoId].yun_nan)
			// })
			// this.componentsMoudel.startGet('nationwide/getVariousIndicatorsData', {}, false).then((res) => {
				this.industrialOptions = res.data.data
				let value1 = ''
				let rabk1 = ''
				this.industrialOptions.forEach((item, index) => {
 					if(parseInt(item.value) <= 100) {
						item.values = item.value + '% / ' + item.rank + '位'
					} else {
						item.values = item.value + '亿元 / ' + item.rank + '位'
					}
				})
				this.industrialOptions.forEach((item, index) => {
					if(index == 0) {
						item.sort = 0
						item.text = '地区生产总值(季)'
						item.industrialCumul = item.values
						item.industrialIncrease = '103.8% / 10位'
					} else if (index == 1) {
						item.sort = 2
						item.text = '社会消费品零售总额累计增长(季)'
						value1 = item.value
						rabk1 = item.rank
						item.value = this.industrialOptions[3].value
						item.rank = this.industrialOptions[3].rank
						item.industrialIncrease = '2.4% / 18位'
					} else if (index == 2) {
						item.sort = 1
						item.text = '固定资产投资完成额累计增长(月)'
						item.industrialIncrease = item.values
					} else if (index == 3) {
						item.sort = 0
						item.text = '工业增加值累计增长(月)'
						item.value = value1
						item.rank = rabk1
						item.industrialIncrease = '-3.6% / 15位'
					} else if (index == 4) {
						item.sort = 2
						item.text = '利润总额累计值(月)'
						item.industrialCumul = item.values
						item.industrialIncrease = '13.6% / 6位'
					} else if (index == 5) {
						item.sort = 0
						item.text = '营业收入累计值(月)'
						item.industrialCumul = item.values
						item.industrialIncrease = '6.6% / 4位'
					} else if (index == 6) {
						item.sort = 0
						item.text = '资产总计(月)'
						item.industrialCumul = item.values
						item.industrialIncrease = '8.0% / 9位'
					}
				})
				this.industrialName = this.industrialOptions[0].text
				this.industrialCumul = this.industrialOptions[0].values
				this.industrialIncrease = this.industrialOptions[0].industrialIncrease
				this.isIndustrialCumul = true
				this.isIndustrialIncrease = true
			})
		},

		// 工业运行监测列表点击
		industrialChange(value) {
			console.dir(value)
			this.industrialOptions.forEach((item, index) => {
				if(value == item.value) {
					this.industrialName = item.text
					if(index == 0) {
						this.industrialCumul = item.industrialCumul
						this.industrialIncrease = item.industrialIncrease
						this.isIndustrialCumul = true
						this.isIndustrialIncrease = true
					} else if (index == 1) {
						this.industrialIncrease = item.industrialIncrease
						this.isIndustrialCumul = false
						this.isIndustrialIncrease = true
					} else if (index == 2) {
						this.industrialIncrease = item.industrialIncrease
						this.isIndustrialCumul = false
						this.isIndustrialIncrease = true
					} else if (index == 3) {
						this.industrialIncrease = item.industrialIncrease
						this.isIndustrialCumul = false
						this.isIndustrialIncrease = true
					} else if (index == 4) {
						this.industrialCumul = item.industrialCumul
						this.industrialIncrease = item.industrialIncrease
						this.isIndustrialCumul = true
						this.isIndustrialIncrease = true
					} else if (index == 5) {
						this.industrialCumul = item.industrialCumul
						this.industrialIncrease = item.industrialIncrease
						this.isIndustrialCumul = true
						this.isIndustrialIncrease = true
					} else if (index == 6) {
						this.industrialCumul = item.industrialCumul
						this.industrialIncrease = item.industrialIncrease
						this.isIndustrialCumul = true
						this.isIndustrialIncrease = true
					}
				}
			})
		},




  }
}
</script>

<style scoped>
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


/* 项目管理 */

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



/* // 行业企业发展情况 */
	.bbd-developmont-echarts {
		position: relative;
  }
  .bbd-tips {
    position: absolute;
    top: 70px;
    left: 22px;
    width: 180px;
    height: 80px;
    z-index: 9;
    text-align: center;
    font-size: 16px;
    color: #409eff;
  }
	.bbd-industry-echarts {
		margin-left: 14px;
		position: relative;
	}
	.bbd-industry-table {
		margin-right:14px;
		margin-top: 14px;
		display: inline-block;
		vertical-align: top;
	}
	.bbd-industry-title {
		padding-top: 20px;
		padding-right: 380px;
		text-align: right;
		font-weight: bolder;
		color: #409eff;
	}
	.bbd-distribution-echarts {
		margin-top: 14px;
		display: inline-block;
		vertical-align: top;
	}

	/* 工业运行监测 */
	.bbd-industrial-value {
		padding: 20px;
	}
	.bbd-industrial-title {
		margin-bottom: 10px;
		font-size: 14px;
		font-weight: bolder;
	}
	.bbd-industrial-item {
		padding: 5px 0;
	}
	.bbd-industrial-item span {
		margin-left: 20px;
		font-size: 16px;
		font-weight:bolder;
	}


</style>