import {
    Notify
} from 'vant';
import {
    getRegister
} from '../api'


const root = {};
root.components = {

};
root.data = function () {
    return {
        formInfo: {
            username: '',
            enterpriseName: '',
            name: '',
            phone: '',
            password: '',
            repassword: "",
            code: '',
        },

        uPattern: /^[a-zA-Z0-9_@.$%&*-]{6,16}$/, //用户名正则
        phoneReg: /^1[3|4|5|7|8][0-9]{9}$/, //电话号码正则
        pattern1: '/^1(?:3\d|4[4-9]|5[0-35-9]|6[67]|7[013-8]|8\d|9\d)\d{8}$/',
        passwordRulseData: /((?=.*[a-z])(?=.*\d)|(?=[a-z])(?=.*[#@!~%^&*.])|(?=.*\d)(?=.*[#@!~%^&*.]))[a-z\d#@!~%^&*.]{6,25}/i, //密码验证
        verificationCodeData: '获取验证码',
    }
}
root.methods = {
    onFailed(errorInfo) {
        console.log('failed', errorInfo.errors);
    },
    async signUpNow() {
        //判断两次密码是否一致
        if (this.formInfo.password == this.formInfo.repassword) {
            let res = await getRegister(this.formInfo);
            //成功
            if (res.data.status_code == 100) {
                this.$router.push('/firmHome');
                localStorage.setItem('userInfo', JSON.stringify(res.data.data));
            } else {
                Notify({
                    type: 'warning',
                    message: res.data.msg
                });
            }
            //验证码错误
            if (res.data.status_code == 900) {
                Notify({
                    type: 'warning',
                    message: "验证码错误"
                });
            }
            //手机号已被注册
            if (res.data.status_code == 905) {
                Notify({
                    type: 'warning',
                    message: res.data.msg
                });
            }
            // 企业名称错误
            if (res.data.status_code == 500) {
                Notify({
                    type: 'warning',
                    message: res.data.error_msg
                });
            }
        } else {
            Notify({
                type: 'warning',
                message: '两次密码不一致'
            });
        }

    },
    cancelButton() {
        this.$router.go(-1);
    },

    // 获取验证码
    gainCode() {
        let that = this;
        let strCode = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        let str = '';
        while (str.length < 6) {
            let str1 = strCode.charAt(Math.round(Math.random() * 61));
            if (str.indexOf(str1) === -1) {
                str += str1;
            }
        }
        that.verificationCodeData = str;
    },


    //
    // 密码验证
    passwordRulse(val) {
        return this.passwordRulseData.test(val);
    },
    // 确认密码验证
    repassword(val) {
        return this.formInfo.password === val;
    },
    // 验证码校验
    verificationCode(val) {
        return this.verificationCodeData === val;
    },

}

root.mounted = function () {
    // Notify('通知内容');
}
export default root;