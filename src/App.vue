<script setup lang="ts">
import Title from './components/Title.vue'
import Navigator from './components/Navigator.vue'
import Contents from './components/Contents.vue'
import { ref,reactive } from 'vue'
import axios from 'axios'

// 当前选中的主菜单和子菜单
const mainTab = ref('项目管理')
const subTab = ref('项目统计')
const input = ref('')
// 处理导航栏切换
function handleTabChange(main: string, sub: string) {
  mainTab.value = main
  subTab.value = sub
}

const onSubmit = () => {
  axios.post('/api/token/', {
    username: form.name,
    password: form.password
  }).then(res => {
    console.log(res)
  })
}
const form = reactive({
  name: '',
  password: ''
})
</script>

<template>

  <el-header>
    <Title />
  </el-header>
  <el-main>
    <Navigator :mainTab="mainTab" :subTab="subTab" @tab-change="handleTabChange" />

    <Contents :mainTab="mainTab" :subTab="subTab" />
    <el-form :model="form" label-width="auto" style="max-width: 600px">
      <el-form-item label="Username">
        <el-input v-model="form.name" style="width: 240px" placeholder="Please input" />
      </el-form-item>
      <el-form-item label="password">
        <el-input v-model="form.password" style="width: 240px" type="password" placeholder="Please input password"
        show-password />
      </el-form-item>
      
      
      <el-form-item>
      <el-button type="primary" @click="onSubmit">Create</el-button>
      <el-button>Cancel</el-button>
    </el-form-item>
    </el-form>


  </el-main>



</template>