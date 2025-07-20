/* ---------- 1. 从 vue-router 工具箱里拿工具 ---------- */
// createRouter：用来“制造”一个路由器
// createWebHistory：用来让网址看起来更“正常”（没有 # 号）
import { createRouter, createWebHistory } from 'vue-router'

/**
 * 路由配置
 * 作用：告诉浏览器“当用户输入什么网址，就给他看什么页面”
 * 就像医院的指路牌：挂号的往 1 号窗口，拿药的往 2 号窗口……
 */

/* ---------- 2. 路由懒加载（异步加载页面） ---------- */
// 普通写法：import Home from '../views/Home.vue'
// 懒加载写法：只有当用户真的需要访问那个页面时，才去加载对应的文件
// 好处：第一次打开网站更快，省流量
const Home       = () => import('../views/Home.vue')        // 首页
const Annotation = () => import('../views/Annotation.vue')  // 音频标注页
const Statistics = () => import('../views/Statistics.vue')  // 统计分析页
const NotFound   = () => import('../views/NotFound.vue')    // 404 页面

/* ---------- 3. 路由表：把网址跟页面一一对应 ---------- */
const routes = [
  /* 3-1 首页 */
  {
    path: '/',                // 当浏览器地址是  http://域名/  时
    name: 'Home',             // 给这条路由取个名字，以后代码里可以 this.$router.push({ name: 'Home' })
    component: Home,          // 真正要渲染的组件
    meta: { title: '首页' }   // 附加信息：页面标题
  },

  /* 3-2 音频标注页 */
  {
    path: '/annotation',      // 当浏览器地址是  http://域名/annotation
    name: 'Annotation',
    component: Annotation,
    meta: { title: '音频标注' }
  },

  /* 3-3 统计分析页 */
  {
    path: '/statistics',      // http://域名/statistics
    name: 'Statistics',
    component: Statistics,
    meta: { title: '统计分析' }
  },

  /* 3-4 404 页面：当用户输入不存在的地址时显示 */
  {
    path: '/:pathMatch(.*)*', // 正则写法：匹配所有没定义过的路径
    name: 'NotFound',
    component: NotFound,
    meta: { title: '页面未找到' }
  }
]

/* ---------- 4. 制造路由器并配置 ---------- */
const router = createRouter({
  history: createWebHistory(), // 使用“正常网址”模式（不带 # 号）
  routes                      // 把我们上面写好的路由表塞进来
})

/* ---------- 5. 路由前置守卫（每次跳转前都会执行的函数） ---------- */
// 作用：动态修改浏览器标签页的标题
// 例如：用户在 /annotation 时，标签页显示 “音频标注 - 语音情感标注系统”
router.beforeEach((to, from, next) => {
  // to   = 即将进入的路由对象
  // from = 正要离开的路由对象
  // next = 放行函数，必须调用，否则页面就卡住了

  // 设置页面标题：如果 meta 里有 title 就用它，否则用默认名
  document.title = to.meta.title
    ? `${to.meta.title} - 语音情感标注系统`
    : '语音情感标注系统'

  next() // 放行，允许这次路由跳转
})

/* ---------- 6. 把路由器“拿出去”给别人用 ---------- */
// main.js 里会 import 这个 router，然后 app.use(router)
export default router