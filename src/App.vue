<script setup lang="ts">
import Meteor from './components/Meteor.vue'
import Title from './components/Title.vue'
import Navigator from './components/Navigator.vue'
import Contents from './components/Contents.vue'
import { ref } from 'vue'

// 当前选中的主菜单和子菜单
const mainTab = ref('项目管理')
const subTab = ref('项目统计')

// 处理导航栏切换
function handleTabChange(main: string, sub: string) {
  mainTab.value = main
  subTab.value = sub
}
</script>

<template>
  <!-- <div style="display:flex;justify-content:center;align-items:center;height:100vh;">
    <Meteor/>
  </div> -->
  <div>
    <Title />
    <Navigator :mainTab="mainTab" :subTab="subTab" @tab-change="handleTabChange" />
    <Contents :mainTab="mainTab" :subTab="subTab" />
  </div>
</template>

<style scoped>
</style>