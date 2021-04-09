import {
    Notify
} from 'vant';
import {
    listCategory
} from '../api'
import {
    listResponsibilityOffice
} from '../api'
import {
    interactive
} from '../api'
import areaList from '../utils/area.js'

const root = {};
root.components = {

};
root.data = function () {
    return {
        selectData: {
            title: '',
            category: '',
            leaveMessageDepVo: [],
            content: '',
        },
        columns: [],
        showPicker: false,
        checkboxLeaveMessageDepVo: [],
        checkboxGroup: [],
        isClick: false, //解决多次点击
    }
}
root.methods = {
    listCategory() {
        let that = this;
        listCategory().then((res) => {
            if (res.data.status_code == 100) {
                that.columns = res.data.data;
            }
        });
    },
    listResponsibilityOffice() {
        let that = this;
        listResponsibilityOffice().then((res) => {
            if (res.data.status_code == 100) {
                that.checkboxLeaveMessageDepVo = res.data.data;
            }
            that.checkboxLeaveMessageDepVo.push({
                id: 66,
                name: 'sdsdsa'
            })
        });

    },
    // 提交
    onSubmit() {
        let that = this;
        that.isClick = true;
        that.checkboxGroup.forEach((item, index) => {
            let depId2 = {
                depId: item,
            }
            that.selectData.leaveMessageDepVo.push(depId2);
        })
        let data = that.selectData;
        interactive(data).then((res) => {
            if (res.data.status_code == 100) {
                Notify({
                    type: 'success',
                    message: '留言填报提交成功，感谢您的反馈'
                });

                setTimeout(() => {
                    that.cancelButton();
                    that.isClick = false;
                }, 5000);
            }
        });
        setTimeout(() => {
            that.isClick = false;
        }, 6000);
    },
    // 取消
    cancelButton() {
        this.$router.go(-1);
    },

    onConfirm(value) {
        this.selectData.category = value;
        this.showPicker = false;
    },
    // 标题长度验证
    titleLength(val) {
        return val.length > 0 && val.length < 40;
    },
    // 备注长度验证
    contentLength(val) {
        return val.length > 0 && val.length < 40;
    },
}

root.mounted = function () {
    this.listCategory();
    this.listResponsibilityOffice();

}
export default root;