<!-- ==================== 模板部分（HTML） ==================== -->
<template>
  <!-- 整个首页的最外层盒子，class 叫 home，方便下面写样式 -->
  <div class="home">
    <!-- 二级大标题，告诉用户这是哪里 -->
    <h2>欢迎使用语音情感标注系统</h2>

    <!-- 一段简单的介绍文字 -->
    <p>这是一个用于音频情感标注的 Web 应用程序。</p>

    <!-- 放按钮的区域，名字叫 actions（“动作”的意思） -->
    <div class="actions">
      <!-- 第一个按钮：点击后跳到 /annotation 页面（音频标注页） -->
      <!-- router-link 是 Vue-Router 提供的“超链接”，不会刷新页面 -->
      <!-- class="btn" 是给按钮加样式用的 -->
      <router-link to="/annotation" class="btn">开始标注</router-link>

      <!-- 第二个按钮：点击后跳到 /statistics 页面（统计页） -->
      <router-link to="/statistics" class="btn">查看统计</router-link>
    </div>
  </div>
</template>


<!-- ==================== 脚本部分（JavaScript） ==================== -->
<script setup>
/**
 * 首页组件 Home.vue
 * 作用：
 *   1. 向用户打招呼
 *   2. 提供两个快速入口按钮
 * 目前不需要写任何逻辑代码，所以这里只有注释
 *
 * 小知识：
 *   - <script setup> 是 Vue3 的“语法糖”写法，更简单
 *   - 如果以后想加欢迎动画、统计访问量等，都可以写在这里
 */
</script>


<!-- ==================== 样式部分（CSS） ==================== -->
<!-- scoped 表示“只对这个组件生效”，不会影响到别的页面 -->
<style scoped>
/* 整个首页容器的样式 */
.home {
  text-align: center; /* 文字居中 */
  padding: 20px;      /* 内边距：四周留出 20 像素的空白，不贴边 */
}

/* 按钮区域的样式 */
.actions {
  margin-top: 30px;      /* 和上面的段落空出 30 像素 */
  display: flex;         /* 弹性布局：让按钮横着排 */
  justify-content: center; /* 横轴居中 */
  gap: 20px;             /* 两个按钮之间空出 20 像素 */
}

/* 按钮本身的通用样式 */
.btn {
  display: inline-block;   /* 让链接表现得像按钮，可设宽高 */
  background-color: #42b983; /* 绿色背景（Vue 官方绿） */
  color: white;            /* 白色文字 */
  padding: 10px 20px;      /* 上下 10 像素，左右 20 像素 */
  border-radius: 4px;      /* 小圆角 */
  text-decoration: none;   /* 去掉链接自带的下划线 */
  font-weight: bold;       /* 文字加粗 */
  transition: background-color 0.3s; /* 鼠标放上去时颜色渐变 0.3 秒 */
}

/* 鼠标悬停（hover）时按钮的样式 */
.btn:hover {
  background-color: #3aa876; /* 颜色稍微变深，提示可点击 */
}
</style>