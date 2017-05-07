# website-3d-printer

## 技术栈

- Vue 全家桶
- Express
- Webpack
- axios

## 如何使用

``` bash
# install dependencies
npm install
cd server
npm install

# start server
cd server
npm start

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

## 目录结构

```
website-3d-printer
├─┬ build  // 配置文件
├─┬ config  // webpack配置文件
├─┬ dist  // 生产文件
│ ├── static  // 静态文件(css,img,js)
│ └── index.html  // 入口HTML
├─┬ server  // 本地后台服务器
│ ├── public  // 公共资源
│ ├── router  // 路由文件
│ ├── node_modules  // npm安装的nodejs的模块包
│ ├── package.json  // npm配置文件
│ └── app.js  // 入口
├─┬ src  // 编写的源文件
│ ├── components  // 组件
│ ├── router  // 路由
│ ├── store  // vuex
│ ├── views  // 模块视图
│ ├── App.vue  // 主视图
│ └── main.js  // 入口
├── node_modules  // npm安装的nodejs的模块包
├── package.json  // npm配置文件
├── README.md  // 介绍文件
├── .gitignore  // git配置文件
└── .babelrc  // babel配置文件
```

