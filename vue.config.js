module.exports = {
    pages: {
        index: {
            entry: 'src/main.js',
            template: 'public/index.html',
            filename: 'index.html',
            title: '尘心音乐',
            chunks: ['chunk-vendors', 'chunk-common', 'index']
        }
    },
    devServer: {
        proxy: { //配置代理，解决跨域请求后台数据的问题
            '/api': {
                target: 'http://127.0.0.1:5050/', //后台接口
                ws: true, //是否跨域
                changeOrigin: true,
                pathRewrite: {
                    '^/api': ''
                }
            }
        }
    }
}