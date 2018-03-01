const path = require('path')
const webpack = require('webpack')
const HTMLPlugin = require('html-webpack-plugin')

const isDev = process.env.NODE_ENV === 'development'

const config = {
    target:'web',//浏览器
    entry:path.join(__dirname,'src/index.js'),
    output:{
        filename:'bundle.js',
        path:path.join(__dirname,'dist')
    },
    module: {
        rules:[
            {
                test: /\.vue$/,
                loader: 'vue-loader'
            },
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader'
                ]
            }
            // {
            //     test:'/\.(gif|jpg|jpeg|png|svg)$/',
            //     use: [
            //         {
            //             loader:'url-loader',
            //             option: {
            //                 limit:1024,
            //                 name:'[name]-aaa.[ext]'
            //             }
            //         }
            //     ]
            // }
        ]
    },
    plugins:[
        new webpack.DefinePlugin({
            'process.env':{
                NODE_ENV: isDev ? '"development"' : '"production"'
            }
        }),
        new HTMLPlugin() //html模板
    ]
}
if(isDev){
    config.devtool = '#cheap-module-eval-source-map'//代码调试
    config.devServer = {
       port: 8002,
       host: '0.0.0.0',
       overlay:{
           errors:true
       },
       hot:true,//不需要重新刷新整个页面
       open:true //自动打开浏览器 
    }
    //热加载
    config.plugins.push(
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin()
    )
}
module.exports = config