<script setup lang="ts">
import { ref, computed } from 'vue'
import { useCookie, navigateTo } from '#app'
import OverviewTab from '@/components/dashboard/OverviewTab.vue'
import LedgerTab from '@/components/dashboard/LedgerTab.vue'
import ReportTab from '@/components/dashboard/ReportTab.vue'
import BottomNav from '@/components/dashboard/BottomNav.vue'
import SidebarNav from '@/components/dashboard/SidebarNav.vue'
import TransactionModal from '@/components/dashboard/TransactionModal.vue'

// Define page meta if needed (empty or omit if global middleware handles auth)
definePageMeta({})

// Tab state: 'home' | 'ledger' | 'debt' | 'reports'
const activeTab = ref<'home' | 'ledger' | 'debt' | 'reports'>('home')

// Modal state
const isModalOpen = ref(false)

// Formatting helper
const formatVND = (value: number) => {
  return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(value)
}

// Transaction data state
const transactions = ref([
  { id: 1, desc: 'Lương tháng 8', amount: 15200000, category: 'Thu nhập', type: 'income', date: '2024-08-05' },
  { id: 2, desc: 'Mua sắm Shopee', amount: 5050000, category: 'Mua sắm', type: 'expense', date: '2024-08-06' },
  { id: 3, desc: 'Laptop Trả Góp', amount: 2150000, category: 'Hóa đơn', type: 'expense', date: '2024-08-15' },
  { id: 4, desc: 'Thẻ Tín Dụng VIB', amount: 1200000, category: 'Hóa đơn', type: 'expense', date: '2024-08-12' },
])

// Upcoming payments list
const upcomingPayments = ref([
  { id: 101, name: 'Laptop Trả Góp', dueDate: '15 Thg 08', amount: 2150000, isUrgent: false },
  { id: 102, name: 'Thẻ Tín Dụng VIB', dueDate: '12 Thg 08', amount: 1200000, isUrgent: true }
])

// Debts list
const debts = ref([
  { id: 1, name: 'Linh', amount: 800000, type: 'lend', note: 'Tiền ăn trưa nhóm', color: '#10b981' },
  { id: 2, name: 'Nam', amount: -400000, type: 'owe', note: 'Vay mua trà sữa', color: '#ef4444' }
])

// Optimal settlement list
const optimalSettlement = ref([
  { from: 'Nam', fromColor: '#ef4444', to: 'Linh', toColor: '#10b981', amount: 400000 }
])
const doneTransactions = ref<Record<number, boolean>>({})

// Computed financial statistics
const totalIncome = computed(() => {
  return transactions.value
    .filter(t => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0)
})

const totalExpense = computed(() => {
  return transactions.value
    .filter(t => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0)
})

// Net balance
const netBalance = computed(() => {
  return 50000000 + totalIncome.value - totalExpense.value // Start with a base of 50.000.000đ from mockup
})

// Debt aggregations
const totalLend = computed(() => {
  return debts.value
    .filter(d => d.amount > 0)
    .reduce((sum, d) => sum + d.amount, 0)
})

const totalOwe = computed(() => {
  return debts.value
    .filter(d => d.amount < 0)
    .reduce((sum, d) => sum + Math.abs(d.amount), 0)
})

const netDebt = computed(() => {
  return totalLend.value - totalOwe.value
})

// Handlers for adding/deleting items
const handleAddTransaction = (newTx: any) => {
  const nextId = transactions.value.length ? Math.max(...transactions.value.map(t => t.id)) + 1 : 1
  transactions.value.unshift({
    id: nextId,
    desc: newTx.desc,
    amount: newTx.amount,
    category: newTx.category,
    type: newTx.type === 'income' ? 'income' : 'expense',
    date: newTx.date
  })
}

const handleDeleteTransaction = (id: number) => {
  transactions.value = transactions.value.filter(t => t.id !== id)
}

const handleAddDebt = (newDebt: any) => {
  const nextId = debts.value.length ? Math.max(...debts.value.map(d => d.id)) + 1 : 1
  const amt = newDebt.type === 'lend' ? newDebt.amount : -newDebt.amount
  debts.value.push({
    id: nextId,
    name: newDebt.name,
    amount: amt,
    type: newDebt.type,
    note: newDebt.note,
    color: newDebt.type === 'lend' ? '#10b981' : '#ef4444'
  })
}

const handleDeleteDebt = (id: number) => {
  debts.value = debts.value.filter(d => d.id !== id)
}

const handleToggleSettleDone = (index: number) => {
  doneTransactions.value[index] = !doneTransactions.value[index]
}

const handlePayPayment = (id: number) => {
  const payment = upcomingPayments.value.find(p => p.id === id)
  if (payment) {
    // Add to transactions as an expense
    handleAddTransaction({
      desc: payment.name,
      amount: payment.amount,
      category: 'Hóa đơn',
      type: 'expense',
      date: new Date().toISOString().substring(0, 10)
    })
    // Remove from upcoming list
    upcomingPayments.value = upcomingPayments.value.filter(p => p.id !== id)
  }
}

// Logout handler
const handleLogout = () => {
  const auth = useCookie('auth')
  auth.value = null
  navigateTo('/login')
}
</script>

<template>
  <div class="min-h-screen bg-[#f0f2f5]">
    <!-- ==================================================== -->
    <!-- DESKTOP MODE (md and up)                             -->
    <!-- ==================================================== -->
    <div class="hidden md:block pl-64">
      <!-- Sidebar Nav -->
      <SidebarNav :active-tab="activeTab" @change-tab="tab => activeTab = tab" @logout="handleLogout" />

      <!-- Main container -->
      <main class="max-w-7xl mx-auto p-8 space-y-6">
        <!-- Desktop Header -->
        <header class="flex items-center justify-between pb-4 border-b border-gray-200">
          <div>
            <span class="text-xs text-gray-500 font-semibold uppercase tracking-wider">Tháng 8, 2024</span>
            <h1 class="text-2xl font-extrabold text-[#1a1a2e]">Chào, Tuấn</h1>
          </div>
          <div class="flex items-center gap-4">
            <!-- Add Transaction desktop button -->
            <button 
              @click="isModalOpen = true"
              class="bg-[#0f172a] hover:bg-slate-800 text-white font-bold px-4 py-2 rounded-xl transition text-sm flex items-center gap-2"
            >
              <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24">
                <line x1="12" y1="5" x2="12" y2="19" />
                <line x1="5" y1="12" x2="19" y2="12" />
              </svg>
              Thêm giao dịch
            </button>
            
            <div class="w-10 h-10 rounded-full bg-gradient-to-br from-[#667eea] to-[#764ba2] flex items-center justify-center text-white font-bold text-sm">
              T
            </div>
          </div>
        </header>

        <!-- Dynamic Content tabs -->
        <OverviewTab 
          v-if="activeTab === 'home'" 
          :net-balance="netBalance"
          :net-debt="netDebt"
          :total-income="totalIncome"
          :total-expense="totalExpense"
          :total-lend="totalLend"
          :total-owe="totalOwe"
          :transactions="transactions"
          :optimal-settlement="optimalSettlement"
          :done-transactions="doneTransactions"
          :upcoming-payments="upcomingPayments"
          :format-v-n-d="formatVND"
          @change-tab="tab => activeTab = tab"
          @toggle-settle-done="handleToggleSettleDone"
          @pay-payment="handlePayPayment"
        />

        <LedgerTab 
          v-else-if="activeTab === 'ledger' || activeTab === 'debt'" 
          :transactions="transactions"
          :debts="debts"
          :format-v-n-d="formatVND"
          @add-transaction="handleAddTransaction"
          @delete-transaction="handleDeleteTransaction"
          @add-debt="handleAddDebt"
          @delete-debt="handleDeleteDebt"
        />

        <ReportTab 
          v-else-if="activeTab === 'reports'" 
          :total-income="totalIncome"
          :total-expense="totalExpense"
          :net-balance="netBalance"
          :format-v-n-d="formatVND"
        />
      </main>
    </div>

    <!-- ==================================================== -->
    <!-- MOBILE MODE (below md)                               -->
    <!-- ==================================================== -->
    <div class="block md:hidden max-w-[420px] mx-auto min-h-screen pb-24 relative bg-[#f0f2f5] overflow-x-hidden">
      <!-- Mobile Header -->
      <header class="p-[16px_20px_12px] flex items-center justify-between sticky top-0 z-10 bg-[#f0f2f5]/90 backdrop-blur-md">
        <div class="flex items-center gap-3">
          <div class="w-11 h-11 rounded-full bg-gradient-to-br from-[#667eea] to-[#764ba2] flex items-center justify-center text-white font-bold text-base">
            T
          </div>
          <div class="text-left">
            <small class="text-[11px] text-gray-500 font-medium block tracking-[0.02em]">Tháng 8, 2024</small>
            <h2 class="text-xl font-bold text-[#1a1a2e] leading-tight">Chào, Tuấn</h2>
          </div>
        </div>
        <div class="flex gap-2">
          <button class="w-[38px] h-[38px] rounded-xl bg-white flex items-center justify-center shadow active:scale-95 transition" @click="activeTab = 'ledger'">
            <svg class="w-[18px] h-[18px] text-[#1a1a2e]" fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24">
              <rect x="3" y="4" width="18" height="18" rx="2" />
              <line x1="16" y1="2" x2="16" y2="6" />
              <line x1="8" y1="2" x2="8" y2="6" />
              <line x1="3" y1="10" x2="21" y2="10" />
            </svg>
          </button>
          <button class="w-[38px] h-[38px] rounded-xl bg-white flex items-center justify-center shadow active:scale-95 transition relative" @click="handleLogout">
            <!-- Logout icon for quick exit on mobile -->
            <svg class="w-[18px] h-[18px] text-[#1a1a2e]" fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24">
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
              <polyline points="16 17 21 12 16 7" />
              <line x1="21" y1="12" x2="9" y2="12" />
            </svg>
          </button>
        </div>
      </header>

      <!-- Scroll Content -->
      <div class="px-4 py-2 space-y-4">
        <OverviewTab 
          v-if="activeTab === 'home'" 
          :net-balance="netBalance"
          :net-debt="netDebt"
          :total-income="totalIncome"
          :total-expense="totalExpense"
          :total-lend="totalLend"
          :total-owe="totalOwe"
          :transactions="transactions"
          :optimal-settlement="optimalSettlement"
          :done-transactions="doneTransactions"
          :upcoming-payments="upcomingPayments"
          :format-v-n-d="formatVND"
          @change-tab="tab => activeTab = tab"
          @toggle-settle-done="handleToggleSettleDone"
          @pay-payment="handlePayPayment"
        />

        <LedgerTab 
          v-else-if="activeTab === 'ledger' || activeTab === 'debt'" 
          :transactions="transactions"
          :debts="debts"
          :format-v-n-d="formatVND"
          @add-transaction="handleAddTransaction"
          @delete-transaction="handleDeleteTransaction"
          @add-debt="handleAddDebt"
          @delete-debt="handleDeleteDebt"
        />

        <ReportTab 
          v-else-if="activeTab === 'reports'" 
          :total-income="totalIncome"
          :total-expense="totalExpense"
          :net-balance="netBalance"
          :format-v-n-d="formatVND"
        />
      </div>

      <!-- Mobile FAB -->
      <button 
        @click="isModalOpen = true"
        class="fixed bottom-20 right-4 w-[52px] h-[52px] rounded-full bg-[#0f172a] text-white flex items-center justify-center shadow-lg hover:scale-105 active:scale-95 transition z-20"
      >
        <svg class="w-[22px] h-[22px]" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24">
          <line x1="12" y1="5" x2="12" y2="19" />
          <line x1="5" y1="12" x2="19" y2="12" />
        </svg>
      </button>

      <!-- Mobile Bottom Navigation -->
      <BottomNav :active-tab="activeTab" @change-tab="tab => activeTab = tab" />
    </div>

    <!-- Add Transaction Dialog/BottomSheet (Desktop & Mobile shared modal) -->
    <TransactionModal 
      :is-open="isModalOpen" 
      @close="isModalOpen = false" 
      @submit="handleAddTransaction"
    />
  </div>
</template>
