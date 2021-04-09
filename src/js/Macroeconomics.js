import {
    Notify
} from 'vant';
import MacroeconomicsEcharts from '../views/macroeconomics/Macroeconomics-echarts.vue'
import MacroeconomicsMap from '../views/macroeconomics/Macroeconomics-map.vue'


const root = {};
root.components = {
    MacroeconomicsEcharts,
    MacroeconomicsMap
};
root.data = function () {
    return {
        tableIndex: true,
    }
}
root.methods = {
    handleTo() {
        this.tableIndex = !(this.tableIndex);
    },
}

root.mounted = function () {

}
export default root;