<template>
  <div class="todo-row">
    <div class="todo-top">
      <span class="todo-title">{{ title }}</span>
      <span class="todo-pct font-num">{{ pct }}%</span>
    </div>
    <div class="todo-bar">
      <div class="todo-fill" :style="{ width: pct + '%', background: color }"></div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  title: { type: String, required: true },
  pct: { type: Number, required: true },
  color: { type: String, default: '#06B6D4' },
})
</script>

<style scoped>
.todo-row{padding:9px 0;border-bottom:1px solid var(--gray100)}
.todo-row:last-child{border-bottom:none}
.todo-top{display:flex;justify-content:space-between;margin-bottom:4px}
.todo-title{font-size:0.82rem;font-weight:600;color:var(--gray700)}
.todo-pct{font-size:0.78rem;font-weight:700;color:var(--gray500)}
.todo-bar{width:100%;height:4px;background:var(--gray100);border-radius:2px;overflow:hidden}
.todo-fill{height:100%;border-radius:2px;transition:width 0.5s ease}
</style>
