<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from '#app'
import { useFinancialStore } from '~/stores/financialStore'

definePageMeta({
  layout: 'default'
})

const router = useRouter()
const financialStore = useFinancialStore()

// Sub-tabs: 'all' | 'reminders' | 'txs'
const activeSubTab = ref<'all' | 'reminders' | 'txs'>('all')

// Read notifications state
const readNotifications = ref<Record<string, boolean>>({})

const isRead = (id: number, type: string) => {
  return !!readNotifications.value[`${id}-${type}`]
}

const toggleRead = (id: number, type: string) => {
  readNotifications.value[`${id}-${type}`] = true
}

const markAllAsRead = () => {
  allNotifications.value.forEach(item => {
    readNotifications.value[`${item.id}-${item.type}`] = true
  })
}

const formatVND = (value: number) => {
  return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(value)
}

// Generate notifications lists
const reminders = computed(() => {
  return financialStore.upcomingPayments.map(p => ({
    id: p.id,
    type: 'reminder',
    title: p.name,
    desc: `Hạn chót thanh toán: ${p.dueDate}`,
    time: '2 ngày trước',
    amount: p.amount,
    isUrgent: p.isUrgent
  }))
})

const transactionNotices = computed(() => {
  return financialStore.transactions.map(t => ({
    id: t.id,
    type: 'tx',
    title: t.desc,
    desc: `Danh mục: ${t.category} · Ngày: ${t.date}`,
    time: 'Giao dịch thành công',
    amount: t.amount,
    isIncome: t.type === 'income'
  }))
})

const allNotifications = computed(() => {
  // Merge both lists
  const list: any[] = []
  reminders.value.forEach(r => list.push(r))
  transactionNotices.value.forEach(t => list.push(t))
  return list
})
</script>

<template>
  <div class="max-w-xl mx-auto space-y-4 text-left">
    <!-- Header with Back Button -->
    <div class="flex items-center justify-between pb-2 border-b border-gray-100">
      <div class="flex items-center gap-3">
        <button 
          @click="router.back()"
          class="w-9 h-9 rounded-xl bg-white border border-gray-100 flex items-center justify-center shadow-sm cursor-pointer hover:bg-gray-50 transition"
        >
          <svg class="w-4 h-4 text-slate-800" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24">
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>
        <h2 class="text-lg font-bold text-[#1a1a2e]">Trung tâm thông báo</h2>
      </div>
      <button 
        @click="markAllAsRead"
        class="text-xs font-semibold text-blue-500 hover:text-blue-600 transition cursor-pointer select-none"
      >
        Đọc tất cả
      </button>
    </div>

    <!-- Notification Sub-Tabs switcher -->
    <div class="flex bg-white p-1 rounded-xl shadow-xs border border-gray-100">
      <button 
        @click="activeSubTab = 'all'"
        class="flex-1 text-center py-2 text-xs font-bold rounded-lg cursor-pointer transition"
        :class="activeSubTab === 'all' ? 'bg-[#0f172a] text-white' : 'text-gray-500 hover:text-[#1a1a2e]'"
      >
        Tất cả
      </button>
      <button 
        @click="activeSubTab = 'reminders'"
        class="flex-1 text-center py-2 text-xs font-bold rounded-lg cursor-pointer transition"
        :class="activeSubTab === 'reminders' ? 'bg-[#0f172a] text-white' : 'text-gray-500 hover:text-[#1a1a2e]'"
      >
        Nhắc nhở
      </button>
      <button 
        @click="activeSubTab = 'txs'"
        class="flex-1 text-center py-2 text-xs font-bold rounded-lg cursor-pointer transition"
        :class="activeSubTab === 'txs' ? 'bg-[#0f172a] text-white' : 'text-gray-500 hover:text-[#1a1a2e]'"
      >
        Giao dịch
      </button>
    </div>

    <!-- Notifications List -->
    <div class="space-y-2">
      <!-- ALL NOTIFICATIONS -->
      <div v-if="activeSubTab === 'all'" class="space-y-2">
        <div 
          v-for="item in allNotifications" 
          :key="item.id + '-' + item.type"
          @click="toggleRead(item.id, item.type)"
          class="rounded-xl p-4 shadow-sm border flex items-start gap-3 hover:shadow transition cursor-pointer"
          :class="isRead(item.id, item.type) ? 'bg-gray-50/40 border-gray-100 opacity-65' : 'bg-white border-gray-200'"
        >
          <div 
            class="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
            :class="item.type === 'reminder' ? (item.isUrgent ? 'bg-red-50 text-red-500' : 'bg-orange-50 text-orange-500') : (item.isIncome ? 'bg-emerald-50 text-emerald-500' : 'bg-slate-50 text-slate-500')"
          >
            <!-- Bell for reminder, check/dollar for transactions -->
            <svg v-if="item.type === 'reminder'" class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
              <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
              <path d="M13.73 21a2 2 0 0 1-3.46 0" />
            </svg>
            <svg v-else class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
              <rect x="2" y="3" width="20" height="14" rx="2" />
              <line x1="8" y1="21" x2="16" y2="21" />
              <line x1="12" y1="17" x2="12" y2="21" />
            </svg>
          </div>

          <div class="flex-1 min-w-0">
            <div class="flex items-center justify-between gap-1 mb-0.5">
              <div class="flex items-center gap-1.5 min-w-0">
                <span v-if="!isRead(item.id, item.type)" class="w-2 h-2 rounded-full bg-blue-500 flex-shrink-0"></span>
                <h4 class="text-sm font-semibold text-slate-800 truncate" :class="!isRead(item.id, item.type) ? 'font-bold text-slate-900' : 'text-slate-700'">{{ item.title }}</h4>
              </div>
              <span class="text-[10px] text-gray-400 font-medium whitespace-nowrap">{{ item.time }}</span>
            </div>
            <p class="text-xs text-gray-500 leading-relaxed">{{ item.desc }}</p>
            <p 
              v-if="item.amount"
              class="text-xs font-bold mt-1"
              :class="item.type === 'tx' ? (item.isIncome ? 'text-emerald-600' : 'text-slate-800') : (item.isUrgent ? 'text-red-500' : 'text-slate-800')"
            >
              {{ item.type === 'tx' && item.isIncome ? '+' : '-' }}{{ formatVND(item.amount) }}
            </p>
          </div>
        </div>
      </div>

      <!-- REMINDERS ONLY -->
      <div v-else-if="activeSubTab === 'reminders'" class="space-y-2">
        <div v-if="reminders.length === 0" class="text-center py-8 text-gray-400 text-sm">
          Không có nhắc nhở nào.
        </div>
        <div 
          v-for="item in reminders" 
          :key="item.id"
          @click="toggleRead(item.id, 'reminder')"
          class="rounded-xl p-4 shadow-sm border flex items-start gap-3 hover:shadow transition cursor-pointer"
          :class="isRead(item.id, 'reminder') ? 'bg-gray-50/40 border-gray-100 opacity-65' : 'bg-white border-gray-200'"
        >
          <div 
            class="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
            :class="item.isUrgent ? 'bg-red-50 text-red-500' : 'bg-orange-50 text-orange-500'"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
              <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
              <path d="M13.73 21a2 2 0 0 1-3.46 0" />
            </svg>
          </div>

          <div class="flex-1 min-w-0">
            <div class="flex items-center justify-between gap-1 mb-0.5">
              <div class="flex items-center gap-1.5 min-w-0">
                <span v-if="!isRead(item.id, 'reminder')" class="w-2 h-2 rounded-full bg-blue-500 flex-shrink-0"></span>
                <h4 class="text-sm font-semibold text-slate-800 truncate" :class="!isRead(item.id, 'reminder') ? 'font-bold text-slate-900' : 'text-slate-700'">{{ item.title }}</h4>
              </div>
              <span 
                v-if="item.isUrgent" 
                class="text-[9px] bg-red-50 text-red-500 border border-red-200 px-1.5 py-0.5 rounded font-bold uppercase tracking-wider"
              >
                Gấp
              </span>
            </div>
            <p class="text-xs text-gray-500">{{ item.desc }}</p>
            <p class="text-xs font-bold text-slate-800 mt-1">Số tiền: {{ formatVND(item.amount) }}</p>
          </div>
        </div>
      </div>

      <!-- TRANSACTIONS ONLY -->
      <div v-else-if="activeSubTab === 'txs'" class="space-y-2">
        <div v-if="transactionNotices.length === 0" class="text-center py-8 text-gray-400 text-sm">
          Không có thông báo giao dịch nào.
        </div>
        <div 
          v-for="item in transactionNotices" 
          :key="item.id"
          @click="toggleRead(item.id, 'tx')"
          class="rounded-xl p-4 shadow-sm border flex items-start gap-3 hover:shadow transition cursor-pointer"
          :class="isRead(item.id, 'tx') ? 'bg-gray-50/40 border-gray-100 opacity-65' : 'bg-white border-gray-200'"
        >
          <div 
            class="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
            :class="item.isIncome ? 'bg-emerald-50 text-emerald-500' : 'bg-red-50 text-red-500'"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
              <rect x="2" y="3" width="20" height="14" rx="2" />
              <line x1="8" y1="21" x2="16" y2="21" />
              <line x1="12" y1="17" x2="12" y2="21" />
            </svg>
          </div>

          <div class="flex-1 min-w-0">
            <div class="flex items-center justify-between gap-1 mb-0.5">
              <div class="flex items-center gap-1.5 min-w-0">
                <span v-if="!isRead(item.id, 'tx')" class="w-2 h-2 rounded-full bg-blue-500 flex-shrink-0"></span>
                <h4 class="text-sm font-semibold text-slate-800 truncate" :class="!isRead(item.id, 'tx') ? 'font-bold text-slate-900' : 'text-slate-700'">{{ item.title }}</h4>
              </div>
              <span class="text-[10px] text-gray-400">{{ item.time }}</span>
            </div>
            <p class="text-xs text-gray-500">{{ item.desc }}</p>
            <p class="text-xs font-bold mt-1" :class="item.isIncome ? 'text-emerald-600' : 'text-red-500'">
              {{ item.isIncome ? '+' : '-' }}{{ formatVND(item.amount) }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
