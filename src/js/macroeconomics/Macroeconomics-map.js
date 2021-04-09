import {
    Notify
} from 'vant';
import DataCoverUtils from '../../utils/DataCoverUtils.js';
import 'echarts/map/js/province/yunnan.js';
import {
    getMacroEconomyMap,
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
    remFontSize(rem) {
        var fontSize = document.documentElement.style.fontSize;
        return Math.floor(rem * fontSize.replace('px', ''));
    },
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
                    fontSize: this.remFontSize(0.3),
                },
                interval: 0,
                show: true,
                rotate: 38,
            };
            this.lineOption.yAxis[0].axisLabel = {
                textStyle: {
                    fontSize: this.remFontSize(0.3),
                },

            };
            this.lineOption.grid = {
                height: '50%'
            }
        }
    },
}

root.mounted = async function () {
    let res = await getMacroEconomyMap();
    let suffix = '%';
    const echartsData = DataCoverUtils.dataAreaMapInit(res.data.data, suffix);
    echartsData.title.textStyle.fontSize = this.remFontSize(0.5);
    echartsData.tooltip.textStyle = {
        fontSize: this.remFontSize(0.3)
    };
    this.mapOption = echartsData;
}
export default root;