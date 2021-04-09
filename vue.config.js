module.exports = {
    publicPath: '/app',
    // publicPath: '',
    css: {
        loaderOptions: {
            css: {},
            postcss: { //css代码转化
                plugins: [
                    require("postcss-px2rem")({
                        remUnit: 37.5 //淘宝适配 自动除以75
                    })
                ]
            }
        }
    },
    transpileDependencies: [
        'vue-echarts',
        'resize-detector'
    ],
    devServer: {
        proxy: {
            '/': {
                // target: 'http://139.9.150.10:10001/gzh', // 要跨域的域名
                target: 'http://139.9.234.168:10001/gzh', // 要跨域的域名
                changeOrigin: true,
                pathRewrite: {
                    '^/': '' // 在请求的时候 凡是/api开头的地址都可以跨域
                }
            },
        }
    }
}