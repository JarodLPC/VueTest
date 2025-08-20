<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { drawMeteor } from '@/utils/meteor';

const canvasRef = ref<HTMLCanvasElement | null>(null);

onMounted(() => {
  const canvas = canvasRef.value;
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  drawMeteor(ctx, {
    brightness: 0.9,
    tailLength: 40,
    meteorRadius: 2.5,
    tailRadiusStep: 0.08,
    speed: 0.006,
    shadowBlur: 10,
    // 其它参数可选
  });
});
</script>

<template>
  <div style="display:flex;justify-content:center;align-items:center;height:100vh;">
    <canvas ref="canvasRef" width="400" height="300" style="background:#222;border-radius:10px;" />
  </div>
</template>

<style scoped>
</style>