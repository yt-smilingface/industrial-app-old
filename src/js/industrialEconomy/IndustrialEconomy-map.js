import {
    Notify
} from 'vant';
import DataCoverUtils from '../../utils/DataCoverUtils.js';
import 'echarts/map/js/province/yunnan.js';
import {
    getIndustryEconomyMap,
    getLine,

} from '../../api'

const root = {};
root.components = {

};
root.data = function () {
    return {
        tableData: [{
            'name': 111
        }],
        show: false,
        isShowLine: false,
        value: 111,
        mapOption: {},
        lineOption: {}
    }
}
root.methods = {
    handleTo(path) {
        this.$router.push(path);
    },
    openValue() {
        this.show = !this.show;
    },
    getvalue(index, item) {
        this.value = item.name;
        this.show = false;
    },
    //区域分布获取点击地图对应市获取对应数据
    areaEnClick: async function (chooseArea) {
        if (chooseArea.data) {
            let res = await getLine({
                area: 0,
                areaCode: "532800",
                dataSourceInfoId: 159,
                fre: 1,
                index: "6",
                tabType: 1,
                time: "2020-09-30 00:00:00"
            })
            this.isShowLine = true;
            const echartsData = DataCoverUtils.dataAreaInit(res.data.data);
            this.lineOption = this.echartsUtils.getInitOption2("2", echartsData);
            this.lineOption.xAxis[0].axisLabel = {
                textStyle: {
                    fontSize: '20',
                },
                interval: 0,
                show: true,
                rotate: 38,
            };
            this.lineOption.yAxis[0].axisLabel = {
                textStyle: {
                    fontSize: '20',
                },

            };
            this.lineOption.grid = {
                height: '50%'
            }
            console.log(this.lineOption);
        }
    },
}

root.mounted = async function () {
    let res = await getIndustryEconomyMap();
    let suffix = '%';
    const echartsData = DataCoverUtils.dataAreaMapInit(res.data.data, suffix);
    this.mapOption = echartsData;
    // this.mapOption.visualMap.left = "10%";
}
export default root;