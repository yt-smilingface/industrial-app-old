import {
    Notify
} from 'vant';
import {
    getTotalGDP,
    getFixedAssetInvestmentGrowthRate,
    getAreaGDP,
    mGetIndustryValueAddedComparison,
    getDataByJsonIdAndDbcode
} from '../../api'
import {
    getIndustryValueAdded
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
        totalGDPData: [],
        FixedAssetInvestmentGrowthRate: [],
        // 云南省地区生产总值
        areaGDPEchart: {
            tooltip: {
                trigger: 'axis',
                formatter: '{a0}:{c0}亿元 <br/> {a1}:{c1}% <br/>',
                axisPointer: {
                    type: 'cross',
                    crossStyle: {
                        color: '#999'
                    }
                }
            },
            grid: {
                x: '15%',
                // left:'12%',
                height: "65%"
            },
            title: {
                text: '云南省地区生产总值',
                left: 'center',
                textStyle: {
                    fontSize: this.remFontSize(0.3)
                }
            },
            legend: {
                data: ['累计GDP(亿元)', 'GDP累计增速'],
                bottom: '0',
                textStyle: {
                    fontSize: this.remFontSize(0.3)
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
                    rotate: 20,
                    textStyle: {
                        fontSize: this.remFontSize(0.3)
                    }
                }

            }],
            yAxis: [{
                type: 'value',
                name: '',
                axisLabel: {
                    formatter: '{value}',
                    textStyle: {
                        fontSize: this.remFontSize(0.3)
                    }
                },
                nameTextStyle: {
                    fontSize: this.remFontSize(0.3)
                }
            }, {
                type: 'value',
                name: '',
                axisLabel: {
                    formatter: '{value}%',
                    textStyle: {
                        fontSize: this.remFontSize(0.3)
                    }
                },
                nameTextStyle: {
                    fontSize: this.remFontSize(0.3)
                }
            }],
            series: [{
                name: '累计GDP(亿元)',
                type: 'bar',
                data: [],
                barWidth: '20%',
                color: '#03A9F4',
            }, {
                name: 'GDP累计增速',
                type: 'line',
                data: [],
                yAxisIndex: 1,
                color: '#ED7D31',
            }]
        },
        // 地区生产总值增速对比
        industryValueAddedComparisonEchart: {
            tooltip: {
                trigger: 'axis',
                formatter: '{a0}:{c0}亿元 <br/> {a1}:{c1}% <br/> {a2}:{c2}% <br/> {a3}:{c3}% <br/> {a4}:{c4}% <br/>',
                axisPointer: {
                    type: 'cross',
                    crossStyle: {
                        color: '#999'
                    }
                }
            },
            grid: {
                x: '15%',
                // left:'12%',
                height: "65%"
            },
            title: {
                text: '地区生产总值增速对比',
                left: 'center',
                textStyle: {
                    fontSize: this.remFontSize(0.3)
                }
            },
            legend: {
                data: ['全国', '云南', '四川', '贵州', '广西'],
                bottom: '0',
                textStyle: {
                    fontSize: this.remFontSize(0.3)
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
                    rotate: 20,
                    textStyle: {
                        fontSize: this.remFontSize(0.3)
                    }
                }
            }],
            yAxis: [{
                type: 'value',
                name: '',
                axisLabel: {
                    formatter: '{value}',
                    textStyle: {
                        fontSize: this.remFontSize(0.3)
                    }
                },
                nameTextStyle: {
                    fontSize: this.remFontSize(0.3)
                }
            }, {
                type: 'value',
                name: '',
                axisLabel: {
                    formatter: '{value}%',
                    textStyle: {
                        fontSize: this.remFontSize(0.3)
                    }
                },
                nameTextStyle: {
                    fontSize: this.remFontSize(0.3)
                }
            }],
            series: [{
                name: '全国',
                type: 'line',
                data: [],
                color: '#ED7D31',
            }, {
                name: '云南',
                type: 'line',
                data: [],
                yAxisIndex: 1,
                color: '#03A9F4',
            }, {
                name: '四川',
                type: 'line',
                data: [],
                yAxisIndex: 1,
                color: '#A5A5A5',
            }, {
                name: '贵州',
                type: 'line',
                data: [],
                yAxisIndex: 1,
                color: '#FFC000',
            }, {
                name: '广西',
                type: 'line',
                data: [],
                yAxisIndex: 1,
                color: '#4472C4',
            }]
        },
        // 云南省固定资产投资
        fixedAssetsEchart: {
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
                x: '15%',
                // left:'12%',
                height: "65%"
            },
            title: {
                text: '固定资产投资完成额累计增长',
                left: 'center',
                textStyle: {
                    fontSize: this.remFontSize(0.3)
                }
            },
            legend: {
                data: ['固定资产投资完成额累计增长(%)'],
                bottom: '0',
                textStyle: {
                    fontSize: this.remFontSize(0.3)
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
                    rotate: 20,
                    textStyle: {
                        fontSize: this.remFontSize(0.3)
                    }
                }
            }],
            yAxis: [{
                type: 'value',
                name: '',
                axisLabel: {
                    formatter: '{value}%',
                    textStyle: {
                        fontSize: this.remFontSize(0.3)
                    }
                },
                nameTextStyle: {
                    fontSize: this.remFontSize(0.3)
                }
            }],
            series: [{
                name: '固定资产投资完成额累计增长(%)',
                type: 'line',
                data: [],
                color: '#03A9F4',
            }]
        },
        // 云南省国内贸易
        tradeEchart: {
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
                text: '社会消费品零售总额累计增长(%)',
                left: 'center',
                textStyle: {
                    fontSize: this.remFontSize(0.3)
                }
            },
            legend: {
                data: ['社会消费品零售总额累计增长(%)'],
                bottom: '0',
                textStyle: {
                    fontSize: this.remFontSize(0.3)
                }
            },
            grid: {
                x: '15%',
                // left:'12%',
                height: "65%"
            },
            xAxis: [{
                type: 'category',
                data: [],
                axisPointer: {
                    type: 'shadow'
                },
                axisLabel: {
                    interval: 0,
                    rotate: 20,
                    textStyle: {
                        fontSize: this.remFontSize(0.3)
                    }
                }
            }],
            yAxis: [{
                type: 'value',
                name: '',
                axisLabel: {
                    formatter: '{value}',
                    textStyle: {
                        fontSize: this.remFontSize(0.3)
                    }
                },
                nameTextStyle: {
                    fontSize: this.remFontSize(0.3)
                }
            }],
            series: [{
                name: '社会消费品零售总额累计增长(%)',
                type: 'line',
                data: [],
                barWidth: '20%',
                color: '#03A9F4',
            }]
        },
    }
}
root.methods = {
    remFontSize(rem) {
        var fontSize = document.documentElement.style.fontSize;
        return Math.floor(rem * fontSize.replace('px', ''));
    },
    // 1-6月累计GDP
    getTotalGDP() {
        let that = this;
        getTotalGDP().then((res) => {
            if (res.data.status_code == 100) {
                that.totalGDPData = res.data.data;
            }
        });
    },
    // 1-9月固定资产投资增速
    getFixedAssetInvestmentGrowthRate() {
        let that = this;
        getFixedAssetInvestmentGrowthRate().then((res) => {
            if (res.data.status_code == 100) {
                that.FixedAssetInvestmentGrowthRate = res.data.data;
            }
        });
    },
    // 云南省地区生产总值
    getAreaGDP() {
        let that = this;
        getAreaGDP().then((res) => {
            if (res.data.status_code == 100) {
                that.areaGDPEchart.xAxis[0].data = res.data.data.x;
                that.areaGDPEchart.series[0].data = res.data.data.GDPTotal;
                that.areaGDPEchart.series[1].data = res.data.data.GDPRate;
            }
        });
    },
    // 地区生产总值增速对比
    getIndustryValueAddedComparison() {
        let that = this;
        mGetIndustryValueAddedComparison().then((res) => {
            if (res.data.status_code == 100) {
                that.industryValueAddedComparisonEchart.xAxis[0].data = res.data.data.x;
                that.industryValueAddedComparisonEchart.series[1].data = res.data.data.yuan_nan;
                that.industryValueAddedComparisonEchart.series[0].data = res.data.data.quan_guo;
                that.industryValueAddedComparisonEchart.series[2].data = res.data.data.si_chuan;
                that.industryValueAddedComparisonEchart.series[3].data = res.data.data.gui_zhou;
                that.industryValueAddedComparisonEchart.series[4].data = res.data.data.guang_xi;
            }
        });
    },
    // 云南省固定资产投资/云南省国内贸易
    getDataByJsonIdAndDbcode() {
        let that = this;
        getDataByJsonIdAndDbcode().then((res) => {
            if (res.data.status_code == 100) {
                that.fixedAssetsEchart.xAxis[0].data = res.data.data.month;
                that.fixedAssetsEchart.series[0].data = res.data.data.FixedAssetInvestment;

                that.tradeEchart.xAxis[0].data = res.data.data.season;
                that.tradeEchart.series[0].data = res.data.data.DomesticTrade;
            }
        });
    },





    // 点击切换事件
    handleTo(path) {
        this.$router.push(path);
    }

}

root.mounted = function () {
    this.getTotalGDP();
    this.getFixedAssetInvestmentGrowthRate();


    this.getAreaGDP();
    this.getIndustryValueAddedComparison();
    this.getDataByJsonIdAndDbcode();


}
export default root;