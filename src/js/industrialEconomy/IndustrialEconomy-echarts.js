import {
    Notify
} from 'vant';
import {
    getTargetData
} from '../../api'
import {
    getIndustryValueAdded
} from '../../api'
import {
    getIndustryValueAddedComparison
} from '../../api'
import {
    getIndustryInvestmentComparison
} from '../../api'
import {
    getIndustryBusinessEfficiency
} from '../../api'
import {
    getIndustryCategory
} from '../../api'
import {
    getIndustryPPI
} from '../../api'
// import {
//     
// } from '../api'




const root = {};
root.components = {

};
root.data = function () {
    return {
        industryData: [],
        industrialOutputEchart: {
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'cross',
                    crossStyle: {
                        color: '#999'
                    }
                }
            },
            title: {
                text: '工业增加值累计增速',
                left: 'center',
            },
            legend: {
                data: ['工业增加值累计增速(%)'],
                bottom: '0',
                textStyle: {
                    fontSize: 14
                }
            },
            xAxis: [{
                type: 'category',
                data: [],
                axisPointer: {
                    type: 'shadow'
                },
                axisLabel: {
                    interval: 0,
                    rotate: 40
                }
            }],
            yAxis: [{
                type: 'value',
                name: '',
                interval: 1,
                axisLabel: {
                    formatter: '{value}%',
                    textStyle: {
                        fontSize: 14
                    }
                },
                nameTextStyle: {
                    fontSize: 14
                },
            }],
            series: [{
                name: '工业增加值累计增速(%)',
                type: 'line',
                data: [],
                color: '#03A9F4',
                barWidth: '30'
            }]
        },
        growthEchart: {
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'cross',
                    crossStyle: {
                        color: '#999'
                    }
                }
            },
            title: {
                text: '地区生产总值增速对比',
                left: 'center',
            },
            legend: {
                data: ['云南', '全国', '四川', '贵州', '广西'],
                bottom: '0',
                textStyle: {
                    fontSize: 14
                }
            },
            xAxis: [{
                type: 'category',
                data: [],
                axisPointer: {
                    type: 'shadow'
                },
                axisLabel: {
                    interval: 0,
                    rotate: 40
                }
            }],
            yAxis: [{
                type: 'value',
                name: '',
                axisLabel: {
                    formatter: '{value}%',
                    textStyle: {
                        fontSize: 14
                    }
                },
                nameTextStyle: {
                    fontSize: 14
                }
            }],
            series: [{
                name: '云南',
                type: 'line',
                data: [],
                color: '#03A9F4',
            }, {
                name: '全国',
                type: 'line',
                data: [],
                color: '#ED7D31',
            }, {
                name: '四川',
                type: 'line',
                data: [],
                color: '#A5A5A5',
            }, {
                name: '贵州',
                type: 'line',
                data: [],
                color: '#FFC000',
            }, {
                name: '广西',
                type: 'line',
                data: [],
                color: '#4472C4',
            }]
        },
        // 工业投资增速
        investmentEchart: {
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'cross',
                    crossStyle: {
                        color: '#999'
                    }
                }
            },
            title: {
                text: '云南省工业投资增速',
                left: 'center',
            },
            legend: {
                data: ['电力投资增速', '工业投资增速', '非电投资增速'],
                bottom: '0',
                textStyle: {
                    fontSize: 12
                }
            },
            xAxis: [{
                type: 'category',
                data: [],
                axisPointer: {
                    type: 'shadow'
                },
                axisLabel: {
                    interval: 0,
                    rotate: 25
                }
            }],
            yAxis: [{
                type: 'value',
                name: '',
                axisLabel: {
                    formatter: '{value}%',
                    textStyle: {
                        fontSize: 14
                    }
                },
                nameTextStyle: {
                    fontSize: 14
                }
            }],
            series: [{
                name: '电力投资增速',
                type: 'line',
                data: [],
                color: '#03A9F4',
            }, {
                name: '工业投资增速',
                type: 'line',
                data: [],
                color: '#ED7D31',
            }, {
                name: '非电投资增速',
                type: 'line',
                data: [],
                color: '#A5A5A5',
            }]
        },
        // 云南省工业企业效益
        benefitEchart: {
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'cross',
                    crossStyle: {
                        color: '#999'
                    }
                }
            },
            grid: {
                x: '60',
            },
            title: {
                text: '云南省工业企业效益',
                left: 'center',
            },
            legend: {
                data: ['营业收入累计值(亿元)', '工业投资增速'],
                bottom: '0',
                textStyle: {
                    fontSize: 14
                }
            },
            xAxis: [{
                type: 'category',
                data: [],
                axisPointer: {
                    type: 'shadow'
                },
                axisLabel: {
                    interval: 0,
                    rotate: 25
                }
            }],
            yAxis: [{
                type: 'value',
                name: '',
                axisLabel: {
                    formatter: '{value}',
                    textStyle: {
                        fontSize: 14
                    }
                },
                nameTextStyle: {
                    fontSize: 14
                }
            }, {
                type: 'value',
                name: '',
                axisLabel: {
                    formatter: '{value}%',
                    textStyle: {
                        fontSize: 14
                    }
                },
                nameTextStyle: {
                    fontSize: 14
                }
            }],
            series: [{
                name: '营业收入累计值(亿元)',
                type: 'bar',
                data: [],
                barWidth: '20%',
                color: '#03A9F4',
            }, {
                name: '工业投资增速',
                type: 'line',
                data: [],
                yAxisIndex: 1,
                color: '#ED7D31',
            }]
        },
        // 云南省工业三大门类增长
        categoryGrowthEchart: {
            grid: {
                y2: '80px'
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
            title: {
                text: '云南省工业三大门类增长',
                left: 'center',
            },
            legend: {
                data: ['制造业增加值累计增速(%)', '采矿业增加值累计增速(%)', '电力、燃气和水的生产和供应业增加值累计增速(%)'],
                bottom: '0',
                textStyle: {
                    fontSize: 12
                }
            },
            xAxis: [{
                type: 'category',
                data: [],
                axisPointer: {
                    type: 'shadow'
                },
                axisLabel: {
                    interval: 0,
                    rotate: 25
                }
            }],
            yAxis: [{
                type: 'value',
                name: '',
                axisLabel: {
                    formatter: '{value}%',
                    textStyle: {
                        fontSize: 14
                    }
                },
                nameTextStyle: {
                    fontSize: 14
                }
            }],
            series: [{
                name: '制造业增加值累计增速(%)',
                type: 'line',
                data: [],
                color: '#03A9F4',
            }, {
                name: '采矿业增加值累计增速(%)',
                type: 'line',
                data: [],
                color: '#ED7D31',
            }, {
                name: '电力、燃气和水的生产和供应业增加值累计增速(%)',
                type: 'line',
                data: [],
                color: '#ED7D31',
            }]
        },
        // 工业PPI
        PPIEchart: {
            grid: {
                y2: '80px'
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
            title: {
                text: '云南省工业PPI',
                left: 'center',
            },
            legend: {
                data: ['工业生产者出厂价格指数'],
                bottom: '0',
                textStyle: {
                    fontSize: 12
                }
            },
            xAxis: [{
                type: 'category',
                data: [],
                axisPointer: {
                    type: 'shadow'
                },
                axisLabel: {
                    interval: 0,
                    rotate: 25
                }
            }],
            yAxis: [{
                type: 'value',
                name: '',
                min: 90,
                axisLabel: {
                    formatter: '{value}',
                    textStyle: {
                        fontSize: 14
                    }
                },
                nameTextStyle: {
                    fontSize: 14
                }
            }],
            series: [{
                name: '工业生产者出厂价格指数',
                type: 'line',
                data: [],
                color: '#03A9F4',
            }]
        },
    }
}
root.methods = {
    // 工业监测图表名称
    iEMonitoringTargetData() {
        let that = this;
        getTargetData().then((res) => {
            if (res.data.status_code == 100) {
                that.industryData = res.data.data;
            }
        });
    },
    // 工业增加值图表数据
    getIndustryValueAdded() {
        let that = this;
        getIndustryValueAdded().then((res) => {
            if (res.data.status_code == 100) {
                that.industrialOutputEchart.xAxis[0].data = res.data.data.x;
                that.industrialOutputEchart.series[0].data = res.data.data.y;
            }
        });
    },
    // 工业增加值增速对比
    getIndustryValueAddedComparison() {
        let that = this;
        getIndustryValueAddedComparison().then((res) => {
            if (res.data.status_code == 100) {
                that.growthEchart.xAxis[0].data = res.data.data.x;
                that.growthEchart.series[0].data = res.data.data.yuan_nan;
                that.growthEchart.series[1].data = res.data.data.quan_guo;
                that.growthEchart.series[2].data = res.data.data.si_chuan;
                that.growthEchart.series[3].data = res.data.data.gui_zhou;
                that.growthEchart.series[4].data = res.data.data.guang_xi;
            }
        });
    },
    // 工业投资增速
    getIndustryInvestmentComparison() {
        let that = this;
        getIndustryInvestmentComparison().then((res) => {
            if (res.data.status_code == 100) {
                that.investmentEchart.xAxis[0].data = res.data.data.x;
                that.investmentEchart.series[0].data = res.data.data.electricityInvestment;
                that.investmentEchart.series[1].data = res.data.data.industryInvestment;
                that.investmentEchart.series[2].data = res.data.data.nonElectricInvestmentMap;
            }
        });
    },
    // 云南省工业企业效益
    getIndustryBusinessEfficiency() {
        let that = this;
        getIndustryBusinessEfficiency().then((res) => {
            if (res.data.status_code == 100) {
                that.benefitEchart.xAxis[0].data = res.data.data.x;
                that.benefitEchart.series[0].data = res.data.data.operatingIncome;
                that.benefitEchart.series[1].data = res.data.data.operatingIncomeAccumulative;
            }
        });
    },
    // 工业三大门类增长
    getIndustryCategory() {
        let that = this;
        getIndustryCategory().then((res) => {
            if (res.data.status_code == 100) {
                that.categoryGrowthEchart.xAxis[0].data = res.data.data.x;
                that.categoryGrowthEchart.series[0].data = res.data.data.manufacturing;
                that.categoryGrowthEchart.series[1].data = res.data.data.miningIndustry;
                that.categoryGrowthEchart.series[2].data = res.data.data.electricity_gas_water;
            }
        });
    },

    // 工业三大门类增长
    getIndustryPPI() {
        let that = this;
        getIndustryPPI().then((res) => {
            if (res.data.status_code == 100) {
                that.PPIEchart.xAxis[0].data = res.data.data.x;
                that.PPIEchart.series[0].data = res.data.data.industryPPI;
            }
        });
    },




    // 点击切换事件
    handleTo(path) {
        this.$router.push(path);
    }

}

root.mounted = function () {
    this.iEMonitoringTargetData();
    this.getIndustryValueAdded();
    this.getIndustryValueAddedComparison();
    this.getIndustryInvestmentComparison();
    this.getIndustryBusinessEfficiency();
    this.getIndustryCategory();
    this.getIndustryPPI();

}
export default root;