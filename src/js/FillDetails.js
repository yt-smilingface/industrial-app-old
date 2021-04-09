import {
    Notify
} from 'vant';
import {
    viewHistoryReport
} from '../api'
import {
    insertMsg
} from '../api'

import areaList from '../utils/area.js'

const root = {};
root.components = {

};
root.data = function () {
    return {
        userInfo: {
            enterpriseUserInfoVo: {}
        }, //用户信息
        formId: '',
        formIndex: '',
        tableData: [],
        colonTrue: true,
        //    填报数据
        inputData: {
            input1: '',
            input2: '',
            input3: '',
            input4: '',
            input5: '',
            input6: '',
            input7: '',
            input8: '',
            input9: '',
            input10: '',
            input11: '',
            input12: '',
            input13: '',
            input14: '',
            input15: '',
            input16: '',
            input17: '',
            input18: '',
            input19: '',
            input20: '',
            input21: '',
            input22: '',
            input23: '',
            input24: '',
            input25: '',
            input26: '',
            input27: '',
            input28: '',
            input29: '',
            input30: '',
            input31: '',
            input32: '',
            input33: '',
            input34: '',
            input35: '',
            input36: '',
            input37: '',
            input38: '',
            input39: '',
            input40: '',
            input41: '',
            input42: '',
            input43: '',
            input44: '',
            input45: '',
            input46: '',
            input47: '',
            input48: '',
            input49: '',
            input50: '',
            input51: '',
            input52: '',
            input53: '',
            input54: '',
            input55: '',
            input56: '',
            input57: '',
            input58: '',
            input59: '',
            input60: '',
            input61: '',
            input62: '',
            input63: '',
            input64: '',
            input65: '',
            input66: '',
            input67: '',
            input68: '',
            input69: '',
            input70: '',
            input71: '',
            input72: '',
            input73: '',
            input74: '',
            input75: '',
            input76: '',
            input77: '',
            input78: '',
            input79: '',
            input80: '',
            input81: '',
            input82: '',
            input83: '',
            input84: '',
            input85: '',
            input86: '',
            input87: '',
            input88: '',
            input89: '',
            input90: '',
            input91: '',
            input92: '',
            input93: '',
            input94: '',
            input95: '',
            input96: '',
            input97: '',
            input98: '',
            input99: '',
            input100: '',
            input101: '',
            input102: '',
            input103: '',
            input104: '',
            input105: '',
            input106: '',
            input107: '',
            input108: '',
            input109: '',
            input110: '',
            input111: '',
            input112: '',
            input113: '',
            input114: '',
            input115: '',
            input116: '',
            input117: '',
            input118: '',
            input119: '',
            input200: '',
        },
    }
}
root.methods = {
    // 填报详情
    viewHistoryReport() {
        let that = this;
        viewHistoryReport(that.formId).then((res) => {
            if (res.data.status_code == 100) {
                that.tableData = res.data.data;

                if (res.data.data.fillType === 0) {
                    that.tableData.fillType = '月报';
                } else if (res.data.data.fillType === 1) {
                    that.tableData.fillType = '季报';
                } else if (res.data.data.fillType === 2) {
                    that.tableData.fillType = '年报';
                } else if (res.data.data.fillType === 3) {
                    that.tableData.fillType = '一次';
                }
                that.tableData.contentJson = JSON.parse(res.data.data.dynamicFill);
                if (that.formIndex === '1') {
                    that.tableData.dynamicFill = JSON.parse(res.data.data.dynamicFill);
                    that.tableData.dynamicFill.forEach((item, index) => {
                        that.inputData['input' + (index + 1)] = item.value;
                    })
                }
            }
        });

    },




    onConfirm(value) {
        for (let i = 0; i < value.length; i++) {
            if (i === value.length - 1) {
                this.value += value[i].name;
            } else {
                this.value += value[i].name + '—';
            }
        }
        this.showPicker = false;
    },
    onSubmit() {
        let that = this;
        that.tableData.contentJson.forEach((item, index) => {
            that.tableData.contentJson[index].value = Number(that.inputData['input' + (index + 1)]);
        })
        let data = {
            fillId: that.formId,
            dynamicFill: JSON.stringify(that.tableData.contentJson)
        }
        insertMsg(data).then((res) => {
            if (res.data.status_code == 100) {
                Notify({
                    type: 'success',
                    message: '填报成功'
                });
                that.cancelButton();
            }
        });
    },
    cancelButton() {
        this.$router.go(-1);
    },
}

root.mounted = function () {
    this.formId = this.$route.query.id;
    this.formIndex = this.$route.query.index;
    this.userInfo = JSON.parse(localStorage.getItem('userInfo'));
    this.viewHistoryReport();


}
export default root;