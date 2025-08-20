<template>
  <el-header height="60px" class="title-header">
    <img src="@/assets/img/Sidel_White_logo.png" alt="logo" style="height:40px;vertical-align:middle;margin-right:16px;">
    <span class="project-title">EIT项目管理系统</span>
    <div class="user-info">
      <el-avatar src="/user.png" />
      <span>张三 已登录</span>
    </div>
  </el-header>
</template>

<style scoped>
.title-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: #181c3a;
  color: #fff;
  padding: 0 24px;
  border-bottom: 1px solid #23265a;
}
.project-title {
  font-size: 22px;
  font-weight: bold;
  color: #fff;
}
.user-info {
  display: flex;
  align-items: center;
  gap: 8px;
  color: #fff;
}
</style>