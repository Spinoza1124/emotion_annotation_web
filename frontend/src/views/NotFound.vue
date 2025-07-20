<template>
  <div class="not-found">
    <h2>404 - 页面未找到</h2>
    <p>抱歉，您请求的页面不存在。</p>
    <router-link to="/" class="home-link">返回首页</router-link>
  </div>
</template>

<script setup>
/**
 * 404页面组件
 * 当用户访问不存在的路由时显示
 */
</script>

<style scoped>
.not-found {
  text-align: center;
  padding: 40px 20px;
}

.home-link {
  display: inline-block;
  margin-top: 20px;
  color: #42b983;
  text-decoration: none;
  font-weight: bold;
}

.home-link:hover {
  text-decoration: underline;
}
</style>