<script setup lang="ts">
import { onMounted, ref } from 'vue'

const props = withDefaults(defineProps<{
  balance: number
  savingsGoalPercent?: number
}>(), {
  savingsGoalPercent: 85
})

const animatedWidth = ref('0%')

onMounted(() => {
  setTimeout(() => {
    animatedWidth.value = `${props.savingsGoalPercent}%`
  }, 100)
})

const formatVND = (value: number) => {
  return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(value)
}
</script>

<template>
  <div class="relative overflow-hidden rounded-[20px] bg-[#0f172a] p-6 text-white shadow-md">
    <!-- Circular gradients for background aesthetics -->
    <div class="absolute -top-10 -right-10 h-40 w-40 rounded-full bg-white/[0.04]"></div>
    <div class="absolute -bottom-[30px] left-[30px] h-[100px] w-[100px] rounded-full bg-white/[0.03]"></div>
    
    <div class="text-[10px] font-semibold uppercase tracking-[0.1em] text-white/55 mb-2">
      Tổng số dư khả dụng
    </div>
    <div class="text-[34px] font-extrabold tracking-[-0.02em] leading-none mb-5">
      {{ formatVND(props.balance) }}
    </div>
    
    <div class="flex items-center justify-between mb-2">
      <span class="text-[12px] text-white/60">Tiến độ tiết kiệm</span>
      <span class="text-[13px] font-bold text-[#10b981]">{{ props.savingsGoalPercent }}%</span>
    </div>
    <div class="h-[6px] w-full bg-white/12 rounded-full overflow-hidden">
      <div 
        class="h-full bg-gradient-to-r from-[#10b981] to-[#34d399] rounded-full transition-all duration-1000 ease-[cubic-bezier(0.4,0,0.2,1)]" 
        :style="{ width: animatedWidth }"
      ></div>
    </div>
  </div>
</template>
