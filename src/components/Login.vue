<script setup lang="ts">
import { ref } from 'vue'

const emit = defineEmits<{
  (e: 'login-success', username: string): void
}>()

const visible = ref(false)
const username = ref('')
const password = ref('')
const loading = ref(false)
const error = ref('')

function open() {
  visible.value = true
  error.value = ''
  username.value = ''
  password.value = ''
}

async function handleLogin() {
  loading.value = true
  error.value = ''
  // 模拟登录请求
  await new Promise((r) => setTimeout(r, 700))
  loading.value = false
  // 简单演示：用户名 admin 密码 123456
  if (username.value === 'admin' && password.value === '123456') {
    visible.value = false
    emit('login-success', username.value)
  } else {
    error.value = '用户名或密码错误'
  }
}

defineExpose({ open })
</script>

<template>
  <el-dialog v-model="visible" title="用户登录" width="360px" :close-on-click-modal="false">
    <el-form @submit.prevent="handleLogin" label-position="top">
      <el-form-item label="用户名">
        <el-input v-model="username" autocomplete="off" />
      </el-form-item>
      <el-form-item label="密码">
        <el-input v-model="password" type="password" autocomplete="off" />
      </el-form-item>
      <div v-if="error" style="color:#ff6b6b;margin-bottom:8px">{{ error }}</div>
      <el-form-item>
        <el-button type="primary" @click="handleLogin" :loading="loading" style="width:100%">登录</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<style scoped>
.el-dialog__header {
  background: #181c3a;
  color: #fff;
}
.el-dialog__body {
  background: #0f1530;
  color: #fff;
}
</style>