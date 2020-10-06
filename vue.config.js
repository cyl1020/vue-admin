module.exports = {
    devServer : {
        proxy : {
            '/api' : {
                target : 'http://localhost:5000',
                changeOrigin : true,
                pathRewrite: {
                    '^/api': ''  //通过pathRewrite重写地址，将前缀/api转为/
                }
            }
        }
    }
}