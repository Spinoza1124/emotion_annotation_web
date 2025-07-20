// 这行代码从 vue 这个库里“拿”一个叫 createApp 的函数来用
// createApp 的作用是：创建一个全新的 Vue 应用实例（可以想象成“造了一辆新车”）
import { createApp } from 'vue'

// 这行代码从 pinia 这个库里“拿”一个叫 createPinia 的函数
// createPinia 用来创建一个“全局数据仓库”（官方叫“状态管理”）
import { createPinia } from 'pinia'


// 这行代码把我们刚刚写的 App.vue 组件“拿”进来
// 给这个组件起个名字叫 App（名字可以随便起，但大家都习惯叫 App）
import App from './App.vue'

// 这行代码把 router 文件夹里的 index.js（或 index.ts）“拿”进来
// 这个文件里提前写好了所有页面的路由规则
import router from './router'

/**
 * 应用程序入口文件 main.js
 * 浏览器加载 index.html 后，会先执行这里的代码
 * 作用：造一辆“Vue 新车”，装上“路由导航仪”和“数据仓库”，最后开到页面上
 */

// 用 createApp(App) 造一辆“新车”，并把 App.vue 当成“车身”
const app = createApp(App)

// 给“新车”安装“数据仓库”（Pinia 插件）
// 以后任何组件都能随时从这个仓库里拿数据或改数据
app.use(createPinia())

// 给“新车”安装“路由导航仪”（Vue-Router 插件）
// 这样点击导航栏时，页面能无刷新切换
app.use(router)

// 把“新车”开到 index.html 里 id="app" 的位置
// 相当于告诉浏览器：把整辆 Vue 应用渲染到页面上的 <div id="app"></div> 里
app.mount('#app')

// 现在整个 Vue 应用就正式跑起来啦！