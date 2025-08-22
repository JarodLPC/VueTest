<template>
  <el-header height="60px" class="title-header">
    <div class="left">
      <img src="@/assets/img/Sidel_White_logo.png" alt="logo" class="logo" />
      <span class="project-title">EIT项目管理系统</span>
    </div>

    <div class="right">
      <template v-if="user">
        <el-avatar :size="36" :style="{background: '#334' }">{{ userInitial }}</el-avatar>
        <span class="user-name">{{ user }}</span>
        <el-button type="text" class="logout" @click="logout">退出</el-button>
      </template>
      <template v-else>
        <el-button type="primary" @click="showLogin">登录</el-button>
      </template>
    </div>
    <Login ref="loginRef" @login-success="onLoginSuccess" />
  </el-header>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import Login from './Login.vue'

const loginRef = ref<any>(null)
const user = ref<string | null>(null)

function showLogin() {
  loginRef.value?.open?.()
}

function onLoginSuccess(username: string) {
  user.value = username
}

function logout() {
  user.value = null
}

const userInitial = computed(() => (user.value ? user.value.charAt(0).toUpperCase() : 'U'))
</script>

<style scoped>
.title-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: #181c3a;
  color: #fff;
  padding: 0 18px;
  border-bottom: 1px solid #23265a;
  height: 60px;
}
.left {
  display:flex;
  align-items:center;
  gap:12px;
}
.logo {
  height:40px;
}
.project-title {
  font-size: 20px;
  font-weight: 600;
  color: #fff;
}
.right {
  display:flex;
  align-items:center;
  gap:12px;
}
.user-name {
  color:#fff;
  margin-right:8px;
}
.logout {
  color:#ff8a65;
}
</style>