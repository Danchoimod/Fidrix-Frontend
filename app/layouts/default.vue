<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRoute, useCookie, navigateTo } from '#app'
import { useFinancialStore } from '~/stores/financialStore'
import SidebarNav from '~/components/dashboard/SidebarNav.vue'
import BottomNav from '~/components/dashboard/BottomNav.vue'
import TransactionModal from '~/components/dashboard/TransactionModal.vue'

const route = useRoute()
const financialStore = useFinancialStore()
const isModalOpen = ref(false)

// Map path to active tab
const activeTab = computed(() => {
  if (route.path === '/ledger') return 'ledger'
  if (route.path === '/debt') return 'debt'
  if (route.path === '/reports') return 'reports'
  return 'home'
})

// Page title based on route
const pageTitle = computed(() => {
  if (route.path === '/ledger') return 'Sổ thu chi'
  if (route.path === '/debt') return 'Quản lý công nợ'
  if (route.path === '/reports') return 'Báo cáo phân tích'
  return 'Tổng quan'
})

const handleTabChange = (tab: 'home' | 'ledger' | 'debt' | 'reports') => {
  if (tab === 'home') navigateTo('/')
  else navigateTo(`/${tab}`)
}

const handleAddTx = (tx: any) => {
  financialStore.addTransaction(tx)
}

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
      <SidebarNav :active-tab="activeTab" @change-tab="handleTabChange" @logout="handleLogout" />

      <!-- Main container -->
      <main class="max-w-7xl mx-auto p-8 space-y-6">
        <!-- Desktop Header -->
        <header class="flex items-center justify-between pb-4 border-b border-gray-200">
          <div>
            <span class="text-xs text-gray-500 font-semibold uppercase tracking-wider">Tháng 8, 2024</span>
            <h1 class="text-2xl font-extrabold text-[#1a1a2e]">{{ pageTitle }}</h1>
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

        <!-- Dynamic Slot Content -->
        <slot />
      </main>
    </div>

    <!-- ==================================================== -->
    <!-- MOBILE MODE (below md)                               -->
    <!-- ==================================================== -->
    <div class="block md:hidden max-w-[420px] mx-auto min-h-screen relative bg-[#f0f2f5] overflow-x-hidden" :class="route.path !== '/notifications' ? 'pb-24' : 'pb-6'">
      <!-- Mobile Header -->
      <header v-if="route.path !== '/notifications'" class="p-[16px_20px_12px] flex items-center justify-between sticky top-0 z-10 bg-[#f0f2f5]/90 backdrop-blur-md">
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
          <button class="w-[38px] h-[38px] rounded-xl bg-white flex items-center justify-center shadow active:scale-95 transition" @click="handleTabChange('ledger')">
            <svg class="w-[18px] h-[18px] text-[#1a1a2e]" fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24">
              <rect x="3" y="4" width="18" height="18" rx="2" />
              <line x1="16" y1="2" x2="16" y2="6" />
              <line x1="8" y1="2" x2="8" y2="6" />
              <line x1="3" y1="10" x2="21" y2="10" />
            </svg>
          </button>
          <button class="w-[38px] h-[38px] rounded-xl bg-white flex items-center justify-center shadow active:scale-95 transition relative cursor-pointer" @click="navigateTo('/notifications')">
            <svg class="w-[18px] h-[18px] text-[#1a1a2e]" fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24">
              <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
              <path d="M13.73 21a2 2 0 0 1-3.46 0" />
            </svg>
            <span class="absolute top-[6px] right-[6px] w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
          </button>
        </div>
      </header>

      <!-- Scroll Content -->
      <div class="px-4 py-2 space-y-4" :class="route.path === '/notifications' ? 'pt-4' : ''">
        <slot />
      </div>

      <!-- Mobile FAB -->
      <button 
        v-if="route.path !== '/notifications'"
        @click="isModalOpen = true"
        class="fixed bottom-30 right-5 w-[52px] h-[52px] rounded-full bg-[#0f172a] text-white flex items-center justify-center shadow-lg hover:scale-105 active:scale-95 transition z-20"
      >
        <svg class="w-[22px] h-[22px]" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24">
          <line x1="12" y1="5" x2="12" y2="19" />
          <line x1="5" y1="12" x2="19" y2="12" />
        </svg>
      </button>

      <!-- Mobile Bottom Navigation -->
      <BottomNav v-if="route.path !== '/notifications'" :active-tab="activeTab" @change-tab="handleTabChange" />
    </div>

    <!-- Add Transaction Dialog/BottomSheet (Desktop & Mobile shared modal) -->
    <TransactionModal 
      :is-open="isModalOpen" 
      @close="isModalOpen = false" 
      @submit="handleAddTx"
    />
  </div>
</template>
