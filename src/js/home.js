import {
    Notify
} from 'vant';
import ECharts from 'vue-echarts';
import axios from "axios";

import 'echarts/lib/chart/line'
import 'echarts/lib/component/polar'
import {baseURL, token} from '@/utils/baseUrl.js'


const root = {};
root.components = {
    ECharts
}
root.data = function () {
    return {
        orgOptions: ['企业综合填报率', '表单发放总数', '本月填报率', '本月发放量', '本月发放企业数'],
        industryMonitorData: {
            echartsData: [{
                title: {
                    text: "82%",
                    left: "center",
                    top: "38%",
                    textStyle: {
                        color: "#000000",
                        fontSize: 12,
                        align: "center"
                    }
                },
                series: [{
                    name: '',
                    type: 'pie',
                    radius: ['50%', '70%'],
                    avoidLabelOverlap: false,
                    hoverAnimation: false,
                    label: {
                        show: false,
                        position: 'center'
                    },
                    emphasis: {
                        label: {
                            show: false,
                            fontSize: '20',
                            fontWeight: 'bold'
                        }
                    },
                    labelLine: {
                        show: false
                    },
                    data: [{
                        value: 18,
                        name: '全部',
                        itemStyle: {
                            normal: {

                                color: '#D8D8D8',
                                fontSize: '10px',

                            },
                            emphasis: {
                                color: '#D8D8D8'
                            }
                        }
                    }, {
                        value: 82,
                        name: '企业综合填报率',
                        itemStyle: {
                            normal: {
                                color: '#62DEFF'
                            },
                            emphasis: {
                                color: '#62DEFF'
                            }
                        }
                    }]
                }]
            }, {
                title: {
                    text: "121,312",
                    left: "center",
                    top: "38%",
                    textStyle: {
                        color: "#000000",
                        fontSize: 12,
                        align: "center"
                    }
                },
                series: [{
                    type: 'pie',
                    radius: ['50%', '70%'],
                    avoidLabelOverlap: false,
                    hoverAnimation: false,
                    label: {
                        show: false,
                        position: 'center'
                    },
                    emphasis: {
                        label: {
                            show: false,
                            fontSize: '30',
                            fontWeight: 'bold'
                        }
                    },
                    labelLine: {
                        show: false
                    },
                    data: [{
                        value: 100,
                        name: '表单发放总数',
                        itemStyle: {
                            normal: {
                                color: '#62DEFF'
                            },
                            emphasis: {
                                color: '#62DEFF'
                            }
                        }
                    }]
                }]
            }, {
                title: {
                    text: "90%",
                    left: "center",
                    top: "38%",
                    textStyle: {
                        color: "#000000",
                        fontSize: 12,
                        align: "center"
                    }
                },
                series: [{
                    type: 'pie',
                    radius: ['50%', '70%'],
                    avoidLabelOverlap: false,
                    hoverAnimation: false,
                    label: {
                        show: false,
                        position: 'center'
                    },
                    emphasis: {
                        label: {
                            show: false,
                            fontSize: '30',
                            fontWeight: 'bold'
                        }
                    },
                    labelLine: {
                        show: false
                    },
                    data: [{
                            value: 10,
                            name: '全部',
                            itemStyle: {
                                normal: {
                                    color: '#D8D8D8'
                                },
                                emphasis: {
                                    color: '#D8D8D8'
                                }
                            }
                        },
                        {
                            value: 90,
                            name: '本月填报率',
                            itemStyle: {
                                normal: {
                                    color: '#62DEFF'
                                },
                                emphasis: {
                                    color: '#62DEFF'
                                }
                            }
                        }
                    ]
                }]
            }, {
                title: {
                    text: "7332",
                    left: "center",
                    top: "38%",
                    textStyle: {
                        color: "#000000",
                        fontSize: 12,
                        align: "center"
                    }
                },
                series: [{
                    type: 'pie',
                    radius: ['50%', '70%'],
                    avoidLabelOverlap: false,
                    hoverAnimation: false,
                    label: {
                        show: false,
                        position: 'center'
                    },
                    emphasis: {
                        label: {
                            show: false,
                            fontSize: '30',
                            fontWeight: 'bold'
                        }
                    },
                    labelLine: {
                        show: false
                    },
                    data: [{
                        value: 100,
                        name: '本月发放量',
                        itemStyle: {
                            normal: {
                                color: '#62DEFF'
                            },
                            emphasis: {
                                color: '#62DEFF'
                            }
                        }
                    }]
                }]
            }, {
                title: {
                    text: "4342",
                    left: "center",
                    top: "38%",
                    textStyle: {
                        color: "#000000",
                        fontSize: 12,
                        align: "center"
                    }
                },
                series: [{
                    type: 'pie',
                    radius: ['50%', '70%'],
                    avoidLabelOverlap: false,
                    hoverAnimation: false,
                    label: {
                        show: false,
                        position: 'center'
                    },
                    emphasis: {
                        label: {
                            show: false,
                            fontSize: '30',
                            fontWeight: 'bold'
                        }
                    },
                    labelLine: {
                        show: false
                    },
                    data: [{
                        value: 100,
                        name: '本月发放企业数',
                        itemStyle: {
                            normal: {
                                color: '#62DEFF'
                            },
                            emphasis: {
                                color: '#62DEFF'
                            }
                        }
                    }]
                }],
            }]
        },
        userInfo: {},
        newsActive: 0,
        noticeOptions: [],
        baseURL: baseURL,
        token: token,

        menagementOptions: [],
        manage: {}
    }
}
root.methods = {
    handleTo(path) {
        this.$router.push(path);
    },

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

    // 重点企业
    getMenagementOptions() {
        axios( {
            method: 'GET',
            url: this.baseURL + 'manage/department/getDepartmentIndustry?departmentId=' + this.userInfo.departmentInfoId,
            headers: {
                'Content-Type': 'application/json;charset=utf8',
                Authorization: this.token
            }
        }).then((res) => {
            let arr = ''
            if(this.userInfo.departmentInfoId == 5) {
                arr = '16'
            } else if(this.userInfo.departmentInfoId == 6) {
                arr = '39'
            } else if(this.userInfo.departmentInfoId == 15) {
                arr = '27,39'
            } else if(this.userInfo.departmentInfoId == 16) {
                arr = '10,30,8,31,6,9,32'
            } else if(this.userInfo.departmentInfoId == 17) {
                arr = '38,43,33,41,36,37,34,40,35'
            } else if(this.userInfo.departmentInfoId == 18) {
                arr = '18,17,28,21,20,19,24,29,23,22'
            } else if(this.userInfo.departmentInfoId == 19) {
                arr = '15,13,14,27'
            } else if(this.userInfo.departmentInfoId == 20) {
                arr = '26,25,7'
            }
            axios( {
                method: 'GET',
                url: this.baseURL + 'tbbdcompanyshow/list_all?industryCode=' + arr,
                headers: {
                    'Content-Type': 'application/json;charset=utf8',
                    Authorization: this.token
                }
            }).then((res) => {
                this.menagementOptions = res.data.data.splice(0,5)
            })
        })
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


    //  退出登陆
    logout() {
        window.localStorage.removeItem('userInfo')
        this.$router.push({
            path: '/',
        })
        window.localStorage.clear()
    },
}

root.mounted = function () {
    this.userInfo = JSON.parse(localStorage.getItem('userInfo'));
    this.getNoticeData()
    this.getMenagementOptions()
    this.getMgenageData()
}
export default root;