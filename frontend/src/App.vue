<!-- 这是 Vue3 单文件组件的“模板(template)”部分 -->
<!-- 模板里写的就是最终浏览器会渲染出来的 HTML 结构 -->
<template>
    <!-- 根元素，整个组件最外层的“容器” -->
    <!-- 浏览器会把这里的内容替换到 index.html 里 <div id="app"></div> 的位置 -->
    <div class="app">
        <!-- 网页头部区域 -->
        <header>
            <!-- 一级标题，显示在页面最上方 -->
            <h1>语音情感标注系统</h1>

            <!-- 导航栏，放三个可以点击的链接 -->
            <nav>
                <!-- router-link 是 Vue-Router 提供的“路由链接”组件 -->
                <!-- to="/" 表示点击后跳转到网站根路径（首页） -->
                <router-link to="/">首页</router-link> |

                <!-- 跳转到 /annotation 路径（标注页） -->
                <router-link to="/annotation">标注</router-link> |

                <!-- 跳转到 /statistics 路径（统计页） -->
                <router-link to="/statistics">统计</router-link>
            </nav>
        </header>

        <!-- 网页主体内容区域 -->
        <main>
            <!-- router-view 是 Vue-Router 的“路由出口” -->
            <!-- 点上面任意 router-link 后，对应页面的组件会渲染在这里 -->
            <router-view />
        </main>

        <!-- 网页底部版权信息 -->
        <footer>
            <!-- 版权符号 &copy; 等于 © -->
            <p>© 2025 语音情感标注系统</p>
        </footer>
    </div>
</template>


<!-- 这是 Vue3 单文件组件的“脚本(script)”部分 -->
<!-- setup 语法糖：写起来更简洁，所有顶层变量/函数都可以在模板中直接使用 -->
<script setup>
/**
 * 应用程序主组件
 * 整体布局：头部（标题+导航） + 主体（路由页面） + 底部（版权）
 * 目前这里什么都没写，因为只是做静态布局，具体功能会在子页面组件里实现
 *
 * 小知识：
 * 1. 文件名通常叫 App.vue，被 main.js 引入并挂载到 index.html 的 <div id="app"> 上
 * 2. 在 Vue3 中，<script setup> 里的代码会在组件创建时自动执行
 */
</script>


<!-- 这是 Vue3 单文件组件的“样式(style)”部分 -->
<!-- 写的都是 CSS，用来美化上面的 HTML -->
<style>
/* 给最外层 .app 元素加的通用样式 */
.app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif; /* 字体列表，优先用 Avenir，没有就按顺序往后找 */
    -webkit-font-smoothing: antialiased;   /* 让文字在苹果设备上更平滑 */
    -moz-osx-font-smoothing: grayscale;    /* 让文字在 Firefox 苹果版上更平滑 */
    text-align: center;                    /* 所有文字居中 */
    color: #2c3e50;                        /* 默认文字颜色：深蓝灰 */
    margin-top: 60px;                      /* 整个内容与浏览器顶部留出 60 像素空隙 */
}

/* 头部区域样式 */
header {
    margin-bottom: 30px; /* 头部与下面的主体之间空出 30 像素 */
}

/* 导航栏本身的样式 */
nav {
    padding: 30px; /* 导航栏内部上下左右都留出 30 像素内边距 */
}

/* 导航栏里所有 <a> 标签（router-link 渲染后就是 <a>）的样式 */
nav a {
    font-weight: bold;   /* 加粗 */
    color: #2c3e50;      /* 文字颜色：深蓝灰 */
    text-decoration: none; /* 去掉下划线 */
    margin: 0 10px;      /* 每个链接左右各 10 像素外边距 */
}

/* 当前激活的路由链接样式 */
/* Vue-Router 会自动给当前页面的链接加上 .router-link-exact-active 类名 */
nav a.router-link-exact-active {
    color: #42b983; /* 激活时文字颜色变成绿色 */
}

/* 主体内容区域样式 */
main {
    max-width: 960px; /* 主体最大宽度 960 像素，再大就不再变宽 */
    margin: 0 auto;   /* 上下 0 像素，左右自动居中（让整个 main 区域水平居中） */
    padding: 20px;    /* 内部留出 20 像素内边距，文字不会贴边 */
}

/* 底部版权信息样式 */
footer {
    margin-top: 40px; /* 底部与主体之间空出 40 像素 */
    font-size: 0.8em; /* 字体缩小到默认的 80% */
    color: #666;      /* 浅灰色文字 */
}
</style>