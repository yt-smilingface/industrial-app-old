import {
    Notify
} from 'vant';
import {
    undoneList,
    doneList
} from '../api'


const root = {};
root.components = {

};
root.data = function () {
    return {
        tableData: [],
        tableDataTwo: [],
        formIndex: '',
        pageSize: [5, 10, 15, 20],
        currentPage: 1,
        cpage: 10,
        total: 0,
        currentPage2: 1,
        cpage2: 10,
        total2: 0
    }
}
root.methods = {
    // 未填报列表
    undoneList(currentPage = 1, pageSize = 10) {
        let that = this;
        let data = {
            currentPage,
            pageSize
        }
        undoneList(data).then((res) => {
            if (res.data.status_code == 100) {
                that.tableData = res.data.data;
                this.total = res.data.cum;
            }
        });

    },
    // 查看历史填报表单
    doneList(currentPage = 1, pageSize = 10) {
        let that = this;
        let data = {
            currentPage,
            pageSize
        }
        doneList(data).then((res) => {
            if (res.data.status_code == 100) {
                that.tableDataTwo = res.data.data;
                this.total2 = res.data.cum;
            }
        })
    },
    pendingForm(item) {
        this.$router.push({
            path: '/fillDetails',
            query: {
                index: 0,
                id: item.id
            }
        });
    },
    lookForm(item) {
        this.$router.push({
            path: '/fillDetails',
            query: {
                index: 1,
                id: item.id
            }
        });
    }
}

root.mounted = function () {
    this.formIndex = this.$route.query.index;
    this.undoneList();
    this.doneList();
}
export default root;