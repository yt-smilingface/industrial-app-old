import {
    Notify
} from 'vant';
import IndustrialEconomyEcharts from '../views/industrialEconomy/IndustrialEconomy-echarts.vue'
import IndustrialEconomyMap from '../views/industrialEconomy/IndustrialEconomy-map.vue'


const root = {};
root.components = {
    IndustrialEconomyEcharts,
    IndustrialEconomyMap
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