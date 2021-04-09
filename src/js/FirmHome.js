import {
    Notify
} from 'vant';
import ECharts from 'vue-echarts';

import 'echarts/lib/chart/line'
import 'echarts/lib/component/polar'
import {
    undoneList
} from '../api'


const root = {};
root.components = {
    ECharts
}
root.data = function () {
    return {
        userInfo: {
            enterpriseUserInfoVo: {}
        }, //用户信息
        showTime: '',
        total: '',
        tableData: [],
    }
}
root.methods = {
    // 未填报列表数
    undoneList(currentPage = 1, pageSize = 10) {
        let that = this;
        let data = {
            currentPage,
            pageSize
        }
        undoneList(data).then((res) => {
            if (res.data.status_code == 100) {
                that.tableData = res.data.data.splice(0, 3);
                this.total = res.data.cum;
            }
            that.tableData.forEach((item, index) => {
                that.tableData[index].closingDate = parseInt(this.GetDateDiff(new Date(), this.getDate(item.endTime)));
            });
        });

    },

    // 获取两时间相差多少天
    GetDateDiff(startDate, endDate) {
        var startTime = startDate.getTime();
        var endTime = endDate.getTime();
        var dates = Math.abs((startTime - endTime)) / (1000 * 60 * 60 * 24);
        return dates;
    },
    //字符串转日期格式
    getDate(strDate) {
        var st = strDate;
        var a = st.split(" ");
        var b = a[0].split("-");
        var c = a[1].split(":");
        b[1] = b[1] - 1;
        var date = new Date(b[0], b[1], b[2], c[0], c[1], c[2]);
        return date;
    },


    //填报表单
    fillForm() {
        this.$router.push({
            path: '/fillForm',
            query: {
                index: 0,
            }
        });
    },
    fillFormTwo() {
        this.$router.push({
            path: '/fillForm',
            query: {
                index: 1,
            }
        });
    },
    // 填报表单
    pendingForm(item) {
        this.$router.push({
            path: '/fillDetails',
            query: {
                index: 0,
                id: item.id
            }
        });
    },

    interactiveMessage() {
        this.$router.push('/interactiveMessage');
    },
    showtime() {
        let obj = new Date();
        var hour = obj.getHours();
        if (hour < 10) {
            this.showTime = "上午";
        } else if (hour < 12) {
            this.showTime = "中午";
        } else if (hour < 18) {
            this.showTime = "下午";
        } else {
            this.showTime = "晚上";
        }
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
    this.showtime();
    this.undoneList();


}
export default root;