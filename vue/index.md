## vue源码解读 - 预备
>几个关键知识点
1. 源码使用 Flow 进行静态类型检查。
2. 源码模块打包工具 rollup
3. vue的父子组件的继承采用的是原型继承。
4. Object.defineProperty
5. 编译原理：[AST](https://astexplorer.net/)

### vue源码 - 目录结构
.
├── package.json
└── scripts //构建脚本
└── src
    └── compiler
    └── core
      ├── index.js //主代码入口
    └── platform
      └── web //构建入口
      └── weex
      
### vue - 入口
> 调试模式：npm run dev

入口地址：src/platforms/web/entry-runtime-with-compiler.js
