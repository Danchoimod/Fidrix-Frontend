<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  payments: Array<{
    id: number
    name: string
    dueDate: string
    amount: number
    isUrgent: boolean
  }>
}>()

const emit = defineEmits<{
  (e: 'viewAll'): void
  (e: 'pay', id: number): void
}>()

const formatVND = (value: number) => {
  return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(value)
}
</script>

<template>
  <div class="space-y-3">
    <div class="flex items-center justify-between px-0.5">
      <span class="text-base font-bold text-[#1a1a2e]">Thanh toán sắp tới</span>
      <span @click="emit('viewAll')" class="text-[13px] text-[#10b981] font-semibold cursor-pointer select-none hover:underline">
        Xem tất cả
      </span>
    </div>

    <div class="flex flex-col gap-2">
      <div 
        v-for="item in props.payments" 
        :key="item.id"
        @click="emit('pay', item.id)"
        class="bg-white rounded-[14px] p-3.5 flex items-center gap-3 shadow border-l-4 hover:translate-x-[2px] hover:shadow-md transition-all cursor-pointer"
        :class="item.isUrgent ? 'border-l-red-500' : 'border-l-[#10b981]'"
      >
        <div 
          class="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
          :class="item.isUrgent ? 'bg-red-50 text-red-500' : 'bg-indigo-100 text-indigo-500'"
        >
          <svg v-if="!item.isUrgent" class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24">
            <rect x="2" y="3" width="20" height="14" rx="2" />
            <polyline points="8 21 12 17 16 21" />
          </svg>
          <svg v-else class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24">
            <rect x="1" y="4" width="22" height="16" rx="2" />
            <line x1="1" y1="10" x2="23" y2="10" />
          </svg>
        </div>

        <div class="flex-1 min-w-0">
          <div class="text-sm font-semibold text-[#1a1a2e] mb-0.5 truncate">{{ item.name }}</div>
          <div 
            class="text-[11px] truncate"
            :class="item.isUrgent ? 'text-red-500 font-semibold' : 'text-gray-400'"
          >
            Hạn chót: {{ item.dueDate }} <span v-if="item.isUrgent">(Sắp tới)</span>
          </div>
        </div>

        <div 
          class="text-[15px] font-bold flex-shrink-0"
          :class="item.isUrgent ? 'text-red-500' : 'text-[#10b981]'"
        >
          {{ formatVND(item.amount) }}
        </div>
      </div>
    </div>
  </div>
</template>
