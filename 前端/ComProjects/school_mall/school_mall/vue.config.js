const path = require("path");
const myTheme = path.resolve(__dirname, "src/assets/style/myTheme.less");

module.exports = {
    lintOnSave: false,
  devServer: {
    port:8001,
    proxy: {
      //名字可以自定义，这里我用的是api
      '/api': {
        target: 'http://localhost:8083',//设置你调用的接口域名和端口号 别忘了加http
        changeOrigin: true,//这里设置是否跨域

        pathRewrite: {
          '^/api': ''
        }
      },
        '/accrite': {
            target: 'http://localhost:8088',//设置你调用的接口域名和端口号 别忘了加http
            changeOrigin: true,//这里设置是否跨域

            pathRewrite: {
                '^/accrite': ''
            }
        },
        '/alipay': {
            target: 'http://localhost:8086',//设置你调用的接口域名和端口号 别忘了加http
            changeOrigin: true,//这里设置是否跨域

            pathRewrite: {
                '^/alipay': ''
            }
        }
    },
    disableHostCheck:true
  },

  // 基本路径
  publicPath: './',

  // 输出文件目录
  outputDir: 'dist',

  configureWebpack: {
    resolve: {
      alias: {
        'components': '@/components',
        'content': 'components/content',
        'common': 'components/common',
        // 'other':'@/other',
        'assets': '@/assets',
        // 'network': '@/network',
        'views': '@/views',
      }
    }
  },
    css: {
        loaderOptions: {
            less: {
                modifyVars: {
                    //上传图片
                    'uploader-mask-background-color':'#fff',
                    // 直接覆盖变量
                    'nav-bar-arrow-size':'23px',
                    'nav-bar-icon-color':'#ff976a',
                    'nav-bar-text-color':'#ff976a',
                    'grid-item-content-background-color':'#969799',
                    'grid-item-content-padding':'0px',
                    // 'search-content-background-color':'#323233',
                    'search-action-text-color':'#ff976a',
                    //搜索按钮
                    'button-mini-height':'28px',
                    'nav-bar-height':'58px'
                    // 'nav-bar-background-color':
                    // // 或者可以通过 less 文件覆盖（文件路径为绝对路径）
                    // hack: `true; @import "${path.resolve(__dirname,'/src/assets/style/my-theme.less')}";`,
                },
            },
        },
    }
}
