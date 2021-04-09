import {
    Notify
} from 'vant';
import {
    enterpriseDetails,
    enterpriseSelect,
    getQyxxBasicInfoByBbdQyxxId
} from '../api'


const root = {};
root.components = {

};
root.data = function () {
    return {
        value: '',
        showPicker: false,
        columns: [],
        columnsId: [],
        enterpriseData: [],
        enterpriseImage: require('../assets/KeyEnterprise/corporate-avatar.jpg'),

        areaGdpEchart: {
            grid: {
                // top: 50,
                // x: 45,
                left: '12%', // 默认10%，给24就挺合适的。
                // top: 60, // 默认60
                // right: '8%', // 默认10%
                bottom: 100, // 默认60
                // width: '100%', // grid 组件的宽度。默认自适应。
                // height: '100%',
            },
            legend: {
                data: ['地区生产总值(季度累计)', '同比增长(右轴)'],
                bottom: '0',
                textStyle: {
                    fontSize: 14
                }
            },
            xAxis: [{
                type: 'category',
                data: ['1-3月', '1-6月', '1-9月'],
                axisPointer: {
                    type: 'shadow'
                }
            }],
            yAxis: [{
                    type: 'value',
                    name: 'GDP',
                    min: 0,
                    max: 12000,
                    interval: 3000,
                    axisLabel: {
                        formatter: '{value}',
                        textStyle: {
                            fontSize: 12
                        }
                    },
                    nameTextStyle: {
                        fontSize: 12
                    }
                },
                {
                    type: 'value',
                    name: '增长率',
                    min: -2,
                    max: 2,
                    interval: 1,
                    axisLabel: {
                        formatter: '{value}%',
                        textStyle: {
                            fontSize: 12
                        }
                    },
                    nameTextStyle: {
                        fontSize: 12
                    }
                }
            ],
            series: [{
                    name: '地区生产总值(季度累计)',
                    type: 'bar',
                    data: [8000, 4500, 12000],
                    color: '#03A9F4',
                    barWidth: '30'
                },
                {
                    name: '同比增长(右轴)',
                    type: 'line',
                    yAxisIndex: 1,
                    data: [-1.0, 0.5, 1.8],
                    color: '#FFA516',
                }
            ]
        },
        growthEchart: {
            grid: {
                // top: 50,
                // x: 45,
                // left: '12%', // 默认10%，给24就挺合适的。
                // top: 60, // 默认60
                // right: '8%', // 默认10%
                // bottom: 100, // 默认60
                // width: '100%', // grid 组件的宽度。默认自适应。
                // height: '100%',
            },
            legend: {
                data: ['云南', '全国', '四川', '重庆', '广西'],
                bottom: '0',
                textStyle: {
                    fontSize: 14
                }
            },
            xAxis: [{
                type: 'category',
                data: ['1-2月', '1-3月', '1-4月', '1-5月', '1-6月', '1-7月', '1-8月', '1-9月', ],
                axisPointer: {
                    type: 'shadow'
                }
            }],
            yAxis: [{
                type: 'value',
                name: '',
                min: -20,
                max: 40,
                interval: 10,
                axisLabel: {
                    formatter: '{value}%',
                    textStyle: {
                        fontSize: 12
                    }
                },
                nameTextStyle: {
                    fontSize: 12
                }
            }],
            series: [{
                    name: '云南',
                    type: 'line',
                    data: [-10, 18, 20, 8, 8, 0, 9, 20],
                    color: '#03A9F4',
                    barWidth: '30'
                },
                {
                    name: '全国',
                    type: 'line',
                    data: [0, 11, 18, 17, 17, 20, 22, 30],
                    color: '#ED7D31',
                }, {
                    name: '四川',
                    type: 'line',
                    data: [-15, 0, 8, 8, 8, 12, 19, 19],
                    color: '#A5A5A5',
                }, {
                    name: '重庆',
                    type: 'line',
                    data: [-5, 5, 25, 20, 25, 18, 26, 29],
                    color: '#FFC000',
                }, {
                    name: '广西',
                    type: 'line',
                    data: [5, 1, 10, 13, 18, 20, 31, 40],
                    color: '#4472C4',
                }
            ]
        },
    }
}
root.methods = {
    onConfirm(value) {
        let that = this;
        that.value = value;
        let index = that.columns.indexOf(value);
        // console.log(that.columnsId[index]);
        getQyxxBasicInfoByBbdQyxxId(that.columnsId[index]).then((res) => {
            that.enterpriseData = res.data.data;
            console.log(that.enterpriseData);
        });

        this.showPicker = false;
    },
    //企业详情左边统计记录   股东详情
    async getLeftDirectory() {
        let that = this;
        let data = {
            bbd_qyxx_id: this.enterpriseId
        };
        let res = await enterpriseDetails(this.enterpriseId, data);
        if (res.data.status_code == 100) {
            console.log(res.data.data)
        }
    },
    enterpriseSelect() {
        let that = this;
        enterpriseSelect().then((res) => {
            res.data.data.forEach((item, index) => {
                that.columns.push(item.companyName);
                that.columnsId.push(item.bbdQyxxId);
            });
            that.value = that.columns[0];
            this.onConfirm(that.value);
        });
    },

    // 取消
    cancelButton() {
        this.$router.go(-1);
    },
}

root.mounted = function () {
    this.enterpriseSelect();
}
export default root;