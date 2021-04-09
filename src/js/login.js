import {
    Notify
} from 'vant';
import {
    getLogin
} from '../api'


const root = {};
root.components = {

};
root.data = function () {
    return {
        form: {
            type: 1,
        },
    }
}
root.methods = {
    async handleLogin() {
        if (this.form.username === '') {
            Notify({
                type: 'danger',
                message: "请输入用户名"
            });
        } else if (this.form.password === '') {
            Notify({
                type: 'danger',
                message: "请输入密码"
            });
        } else {
            let res = await getLogin(this.form);
            if (res.data.status_code == 100) {
                Notify({
                    type: 'success',
                    message: '登录成功'
                });
                localStorage.setItem('userInfo', JSON.stringify(res.data.data));
                if (res.data.data.type === 1) {
                    // this.$router.push('/home')
                    this.$router.push('/director')
                } else if (res.data.data.type === 2) {
                    this.$router.push('/firmHome')
                }
            } else {
                Notify({
                    type: 'danger',
                    message: res.data.error_msg
                });
            }
        }

    },

    // 注册
    registerAccount() {
        this.$router.push('/registerAccount')
    },
    // 密码长度校验
    passwordValidator(val) {
        return val.length >= 6 && val.length < 25
    },
}

root.mounted = function () {
    // Notify('通知内容');
}
export default root;