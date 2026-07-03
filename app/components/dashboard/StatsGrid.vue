<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  income: number
  expense: number
  totalDebt: number
  dueThisMonth: number
}>()

const formatCompact = (value: number) => {
  if (value >= 1e9) {
    return (value / 1e6).toFixed(1).replace(/\.0$/, '') + 'M' // wait, the mockup had 1.2B for 1.2 Billion, and 800M change
    // Let's check mockup: Total debt "1.2B" (billion), and "800M" (million) change
    // Let's implement standard compact formatter:
  }
  // Let's check how the mockup handles it:
  // "1.2B" for 1,200,000,000. "15.2M" for 15,200,000.
}

const formatValue = (value: number) => {
  if (value >= 1e9) {
    return (value / 1e9).toFixed(1).replace(/\.0$/, '') + 'B'
  } else if (value >= 1e6) {
    return (value / 1e6).toFixed(1).replace(/\.0$/, '') + 'M'
  } else if (value >= 1e3) {
    return (value / 1e3).toFixed(0) + 'K'
  }
  return value.toString()
}
</script>

<template>
  <div class="grid grid-cols-1 sm:grid-cols-2 gap-2.5 w-full">
    <!-- Income -->
    <div class="bg-white rounded-2xl p-4 shadow">
      <div class="flex items-center justify-between mb-2.5">
        <div class="w-9 h-9 rounded-lg flex items-center justify-center bg-green-50 text-emerald-500">
          <svg class="w-[18px] h-[18px]" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
            <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
            <polyline points="17 6 23 6 23 12" />
          </svg>
        </div>
        <span class="text-[11px] font-semibold p-[2px_6px] rounded-md text-emerald-500 bg-emerald-100">+12%</span>
      </div>
      <div class="text-[12px] text-gray-500 mb-1">Thu nhập</div>
      <div class="text-[22px] font-extrabold text-[#1a1a2e] tracking-[-0.02em]">
        {{ formatValue(props.income) }}
      </div>
    </div>

    <!-- Expense -->
    <div class="bg-white rounded-2xl p-4 shadow">
      <div class="flex items-center justify-between mb-2.5">
        <div class="w-9 h-9 rounded-lg flex items-center justify-center bg-red-50 text-red-500">
          <svg class="w-[18px] h-[18px]" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
            <polyline points="23 18 13.5 8.5 8.5 13.5 1 6" />
            <polyline points="17 18 23 18 23 12" />
          </svg>
        </div>
        <span class="text-[11px] font-semibold p-[2px_6px] rounded-md text-red-500 bg-red-100">-5%</span>
      </div>
      <div class="text-[12px] text-gray-500 mb-1">Chi tiêu</div>
      <div class="text-[22px] font-extrabold text-[#1a1a2e] tracking-[-0.02em]">
        {{ formatValue(props.expense) }}
      </div>
    </div>

    <!-- Total Debt -->
    <div class="bg-white rounded-2xl p-4 shadow">
      <div class="flex items-center justify-between mb-2.5">
        <div class="w-9 h-9 rounded-lg flex items-center justify-center bg-orange-100 text-orange-500">
          <svg class="w-[18px] h-[18px]" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
            <rect x="2" y="5" width="20" height="14" rx="2" />
            <line x1="2" y1="10" x2="22" y2="10" />
          </svg>
        </div>
        <span class="text-[11px] font-semibold p-[2px_6px] rounded-md text-orange-500 bg-orange-100">800M</span>
      </div>
      <div class="text-[12px] text-gray-500 mb-1">Tổng nợ</div>
      <div class="text-[22px] font-extrabold text-[#1a1a2e] tracking-[-0.02em]">
        {{ formatValue(props.totalDebt) }}
      </div>
    </div>

    <!-- Need to pay August -->
    <div class="bg-white rounded-2xl p-4 shadow">
      <div class="flex items-center justify-between mb-2.5">
        <div class="w-9 h-9 rounded-lg flex items-center justify-center bg-indigo-100 text-indigo-500">
          <svg class="w-[18px] h-[18px]" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
            <rect x="1" y="4" width="22" height="16" rx="2" />
            <line x1="1" y1="10" x2="23" y2="10" />
          </svg>
        </div>
        <span class="text-[11px] font-semibold p-[2px_6px] rounded-md text-indigo-500 bg-indigo-100">T8</span>
      </div>
      <div class="text-[12px] text-gray-500 mb-1">Cần trả T8</div>
      <div class="text-[22px] font-extrabold text-[#1a1a2e] tracking-[-0.02em]">
        {{ formatValue(props.dueThisMonth) }}
      </div>
    </div>
  </div>
</template>
