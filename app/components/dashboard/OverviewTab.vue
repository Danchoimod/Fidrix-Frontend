<script setup lang="ts">
import { ArrowUpRight, ArrowDownRight } from "@lucide/vue"
import BalanceCard from './BalanceCard.vue'
import StatsGrid from './StatsGrid.vue'
import UpcomingPayments from './UpcomingPayments.vue'

const props = defineProps<{
  netBalance: number
  netDebt: number
  totalIncome: number
  totalExpense: number
  totalLend: number
  totalOwe: number
  transactions: any[]
  optimalSettlement: any[]
  doneTransactions: Record<number, boolean>
  upcomingPayments: any[]
  formatVND: (val: number) => string
}>()

const emit = defineEmits<{
  (e: 'changeTab', tab: 'home' | 'ledger' | 'debt' | 'reports'): void
  (e: 'toggleSettleDone', index: number): void
  (e: 'payPayment', id: number): void
}>()
</script>

<template>
  <div class="space-y-5 w-full">
    <!-- Responsive layout: 1 col on mobile, 3 cols on desktop -->
    <div class="grid grid-cols-1 gap-5 lg:grid-cols-3 w-full">
      <!-- Balance and Stats Cards -->
      <div class="col-span-1 lg:col-span-2 space-y-4 w-full">
        <!-- Balance banner -->
        <BalanceCard :balance="props.netBalance" :savingsGoalPercent="85" />
        
        <!-- Quick stats 2x2 grid -->
        <StatsGrid 
          :income="props.totalIncome"
          :expense="props.totalExpense"
          :totalDebt="props.netDebt"
          :dueThisMonth="4500000"
        />
      </div>

      <!-- Upcoming payments panel -->
      <div class="col-span-1 lg:col-span-1 bg-white rounded-2xl p-5 shadow border border-gray-100 flex flex-col justify-between h-full w-full">
        <UpcomingPayments 
          :payments="props.upcomingPayments" 
          @pay="(id) => emit('payPayment', id)"
          @viewAll="emit('changeTab', 'ledger')"
        />
      </div>
    </div>

    <!-- Recent transactions & Optimal settlements -->
    <div class="grid grid-cols-1 gap-5 lg:grid-cols-2 w-full">
      <!-- Recent Transactions -->
      <div class="rounded-2xl border border-gray-100 p-5 bg-white shadow-sm space-y-4 text-left">
        <div class="flex items-center justify-between">
          <h3 class="text-base font-bold text-[#1a1a2e]">Giao dịch gần đây</h3>
          <button 
            @click="emit('changeTab', 'ledger')" 
            class="text-xs text-[#10b981] font-bold hover:underline"
          >
            Sổ chi tiêu →
          </button>
        </div>
        <div class="h-[1px] bg-gray-100"></div>
        
        <div class="space-y-2">
          <div 
            v-for="tx in transactions.slice(0, 4)" 
            :key="tx.id" 
            class="flex items-center justify-between p-2.5 rounded-xl hover:bg-gray-50/75 transition duration-150"
          >
            <div class="flex items-center gap-3">
              <div 
                class="w-9 h-9 rounded-full flex items-center justify-center" 
                :class="tx.type === 'income' ? 'bg-emerald-50 text-emerald-600' : 'bg-red-50 text-red-500'"
              >
                <ArrowUpRight v-if="tx.type === 'income'" class="w-4 h-4" />
                <ArrowDownRight v-else class="w-4 h-4" />
              </div>
              <div class="text-left">
                <p class="text-sm font-semibold text-[#1a1a2e]">{{ tx.desc }}</p>
                <span class="text-[11px] text-gray-400">{{ tx.category }} · {{ tx.date }}</span>
              </div>
            </div>
            <span class="text-sm font-extrabold" :class="tx.type === 'income' ? 'text-emerald-600' : 'text-[#1a1a2e]'">
              {{ tx.type === 'income' ? '+' : '-' }}{{ formatVND(tx.amount) }}
            </span>
          </div>
        </div>
      </div>

      <!-- Optimal Settle Plan -->
      <div class="rounded-2xl border border-gray-100 p-5 bg-white shadow-sm space-y-4 text-left">
        <div class="flex items-center justify-between">
          <h3 class="text-base font-bold text-[#1a1a2e]">Bù trừ công nợ tối ưu</h3>
          <span class="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md">
            {{ optimalSettlement.length }} Giao dịch cần xử lý
          </span>
        </div>
        <div class="h-[1px] bg-gray-100"></div>

        <div 
          v-if="optimalSettlement.length === 0" 
          class="flex flex-col items-center justify-center p-8 text-gray-400 text-center"
        >
          <span class="text-3xl mb-2">⚖️</span>
          <p class="text-sm font-medium">Tuyệt vời! Công nợ đang ở trạng thái cân bằng.</p>
        </div>
        
        <div v-else class="space-y-2">
          <div 
            v-for="(t, index) in optimalSettlement" 
            :key="index" 
            class="flex items-center justify-between p-3 border border-gray-100 rounded-xl hover:bg-gray-50/75 transition duration-150"
          >
            <div class="flex items-center gap-2">
              <div 
                class="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold text-white" 
                :style="{ backgroundColor: t.fromColor }"
              >
                {{ t.from[0].toUpperCase() }}
              </div>
              <span class="text-xs text-gray-400">gửi cho</span>
              <div 
                class="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold text-white" 
                :style="{ backgroundColor: t.toColor }"
              >
                {{ t.to[0].toUpperCase() }}
              </div>
              <span class="text-xs font-semibold text-[#1a1a2e] ml-1">{{ t.from }} → {{ t.to }}</span>
            </div>
            <div class="flex items-center gap-3">
              <span class="text-sm font-extrabold text-[#1a1a2e]">{{ formatVND(t.amount) }}</span>
              <button 
                @click="emit('toggleSettleDone', index)"
                class="text-[10px] font-bold px-2 py-1 rounded transition duration-200 border"
                :class="doneTransactions[index] ? 'bg-emerald-500 border-emerald-500 text-white' : 'bg-gray-100 border-gray-200 text-gray-500 hover:bg-gray-200'"
              >
                {{ doneTransactions[index] ? 'Đã xong' : 'Xong' }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
