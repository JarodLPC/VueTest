<script setup lang="ts">
import { defineProps, ref } from 'vue'
const props = defineProps<{ mainTab: string, subTab: string }>()

// OPC数据示例
const tableData = [
    {
        date: '2016-05-03',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles',
    },
    {
        date: '2016-05-02',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles',
    },
    {
        date: '2016-05-04',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles',
    },
    {
        date: '2016-05-01',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles',
    },
]

// 操作方法（可扩展为弹窗或接口调用）
function handleEdit(row: { id: number, type: string }) {
    alert(`编辑：${row.type}`)
}
function handleCreate() {
    alert('创建新OPC类型')
}
function handleDelete(row: { id: number, type: string }) {
    alert(`删除：${row.type}`)
}
</script>

<template>
    <div class="contents-wrap">
        <h2>{{ props.mainTab }} - {{ props.subTab }}</h2>
        <div v-if="props.mainTab === '项目管理' && props.subTab === '项目统计'">
            <el-card class="eit-card">这里是项目统计详情</el-card>
        </div>
        <div v-else-if="props.mainTab === '项目管理' && props.subTab === '项目计划'">
            <el-card class="eit-card">这里是项目计划详情</el-card>
        </div>
        <div v-else-if="props.mainTab === '财务管理' && props.subTab === '项目财务'">
            <el-card class="eit-card">这里是项目财务详情</el-card>
        </div>
        <div v-else-if="props.mainTab === '财务管理' && props.subTab === '财务看板'">
            <el-card class="eit-card">这里是财务看板详情</el-card>
        </div>
        <div v-else-if="props.mainTab === '项目编辑' && props.subTab === 'OPC'">
            <el-card class="eit-card">
                <div style="margin-bottom: 12px; text-align: right;">
                    <el-button type="primary" size="small" @click="handleCreate">创建</el-button>
                </div>
                <el-table :data="tableData" style="width: 100%" border>
                    <el-table-column prop="date" label="Date" width="180" />
                    <el-table-column prop="name" label="Name" width="180" />
                    <el-table-column prop="address" label="Address" />
                    <el-table-column label="操作" width="180">
                        <template #default="scope">
                            <el-button type="success" size="small" @click="handleEdit(scope.row)">编辑</el-button>
                            <el-button type="danger" size="small" @click="handleDelete(scope.row)">删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </el-card>
        </div>
        <div v-else-if="props.mainTab === '项目编辑'">
            <el-card class="eit-card">这里是 {{ props.subTab }} 详情</el-card>
        </div>
    </div>
</template>

<style scoped>
.contents-wrap {
    padding: 24px;
    background: #0a0236;
    min-height: 400px;
}

h2 {
    color: #ffd04b;
    margin-bottom: 16px;
}

.eit-card {
    background: #181c3a !important;
    color: #fff !important;
    border: 1px solid #23265a;
}
</style>