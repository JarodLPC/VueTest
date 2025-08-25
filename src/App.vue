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
    localStorage.setItem('token', res.data.access)
  })
}
const form = reactive({
  name: '',
  password: ''
})
const tableData = ref([])
//定义查询函数，要求通过token查询项目数据
const onQuery = () => {
  const token = localStorage.getItem('token')
  axios.get('/projects/', {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }).then(res => {
    console.log(res)
    tableData.value = res.data
  })
}
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
    <!-- 添加一个查询按钮 在table中展示projectinfo 数据  "projid": 1,
        "customername": "ABInbev",
        "servertype": "Dell 塔式",
        "databasetype": "Mysql",
        "ProjStatus": "未启动",
        "projno": "X1.000123",
        "plannedwh": 200,
        "location": "beijing",
        "projdescription": "测试项目",
        "startingtime": "2025-07-04T14:47:00+08:00",
        "opcstatus": "采购中",
        "serverstatus": "已收货",
        "osstatus": "采购中",
        "databasestatus": "采购中",
        "opcidgroup": "1，2",
        "kodate": "2025-07-04",
        "projstatusid": 1,
        "customerid": 1,
        "serverid": 2,
        "databaseid": 3-->

     <el-button @click="onQuery">查询</el-button>
     
     <el-table :data="tableData" style="width: 30%"> 
      <el-table-column
        prop="projid"
        label="项目ID"
        width="200">
      </el-table-column>
      <el-table-column
        prop="customername"
        label="客户名称"
        width="350">
      </el-table-column>
    </el-table>

  </el-main>



</template>