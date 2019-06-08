# 一个简单的react项目的模板
## 使用方法
```sh
# 下载依赖
npm install

# 启动项目
npm start

# 打包项目
npm run build
```
## 目录结构
```
.
|-- config
    |-- webpack #webpack的配置
        |-- paths.js #webpack中用到的一些路径
        |-- rules #webpack打包的规则
        |-- webpack.common.js #webpack公用的配置，开发环境和生产环境均依赖此文件
        |-- webpack.dev.js #开发环境下的webpack配置，通过webpack-merge和webpack.common.js生成webpack配置文件
        |-- webpack.prod.js #生产环境下的webpack配置文件
|-- src
    |-- index.html #模板html文件
    |-- index.jsx #页面入口
    |-- index.css
    |-- App.jsx #App内容
    |-- App.css
    |-- pages #页面文件夹
        |-- page1
            |-- index.jsx
            |-- index.css
        |-- page2
    |-- assets #资源文件
    |-- components #组件文件夹，一些可复用的组件
|-- .babelrc #babel配置文件
|-- .gitignore
|-- package-lock.json
|-- package.json
|-- webpack.config.js  #webpack的配置文件，文件名不可更改
```
## 技术栈
这个项目用到的一些技术
### webpack
webpack是一款打包工具，其目的是将不同的模块整合到一个文件中，启动一个webpack的项目，首先要安装webpack模块和webpack-cli模块，并配置webpack.config.js，如果需要热更新还需要安装webpack-dev-server模块。详细用法可以参考[官方文档](https://webpack.js.org/)。
### babel
babel 主要处理es6和jsx，具体怎么用我也不太清楚。一起看[官方文档](https://babeljs.io/)学习吧。
### React
React是一款前端框架，[官方文档](https://reactjs.org/)
### react-router-dom
React中的路由工具，[官方文档](https://reacttraining.com/react-router/web/example/basic)
### Ant Design
蚂蚁金服维护的React组件库，[官方文档](https://ant.design/)
### axios
支持Promise API的网络请求工具，[官方文档](https://github.com/axios/axios)
## 未来打算用到的技术
### react-redux
现在还不会，以后看看能不能有机会用到。[官方文档](https://redux.js.org/basics/usage-with-react)
