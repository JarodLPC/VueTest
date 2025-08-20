<script setup lang="ts">
import { defineProps, defineEmits } from 'vue'
const props = defineProps<{ mainTab: string, subTab: string }>()
const emit = defineEmits<{
  (e: 'tab-change', main: string, sub: string): void
}>()

const menus = [
  {
    name: '项目管理',
    subs: ['项目统计', '项目计划']
  },
  {
    name: '财务管理',
    subs: ['项目财务', '财务看板']
  },
  {
    name: '项目编辑',
    subs: ['OPC', '客户', 'PLC', '服务器']
  }
]
</script>

<template>
  <el-menu :default-active="props.mainTab" mode="horizontal" @select="(main: string) => emit('tab-change', main, menus.find(m=>m.name===main)?.subs[0] || '')" background-color="#181c3a"
    text-color="#fff"
    active-text-color="#ffd04b"
    class="eit-menu">
    <el-sub-menu v-for="menu in menus" :key="menu.name" :index="menu.name">
      <template #title>{{ menu.name }}</template>
      <el-menu-item v-for="sub in menu.subs" :key="sub" :index="sub" @click="emit('tab-change', menu.name, sub)">
        {{ sub }}
      </el-menu-item>
    </el-sub-menu>
  </el-menu>
</template>

<style scoped>
.eit-menu {
  background: #181c3a !important;
  border-bottom: 1px solid #23265a;
}
.el-menu-item, .el-sub-menu__title {
  color: #fff !important;
  background: #181c3a !important;
}
.el-menu-item.is-active {
  background: #23265a !important;
  color: #ffd04b !important;
}
</style>