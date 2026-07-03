<script setup lang="ts">
const props = defineProps<{
  activeTab: 'home' | 'ledger' | 'debt' | 'reports'
}>()

const emit = defineEmits<{
  (e: 'changeTab', tab: 'home' | 'ledger' | 'debt' | 'reports'): void
  (e: 'logout'): void
}>()
</script>

<template>
  <aside class="w-64 bg-slate-900 text-slate-100 flex flex-col h-screen fixed left-0 top-0 border-r border-slate-800">
    <!-- Brand / Logo -->
    <div class="p-6 border-b border-slate-800 flex items-center gap-3">
      <div class="w-10 h-10 rounded-xl bg-gradient-to-br from-[#667eea] to-[#764ba2] flex items-center justify-center text-white font-extrabold text-lg">
        F
      </div>
      <div>
        <h1 class="text-lg font-bold text-white tracking-tight">Fidrix</h1>
        <span class="text-[10px] text-slate-400 font-semibold tracking-wider uppercase">Quản lý tài chính</span>
      </div>
    </div>

    <!-- Navigation List -->
    <nav class="flex-1 p-4 space-y-1.5">
      <!-- Home -->
      <button 
        @click="emit('changeTab', 'home')"
        class="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition"
        :class="props.activeTab === 'home' ? 'bg-white/10 text-white font-bold' : 'text-slate-400 hover:text-white hover:bg-white/5'"
      >
        <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
          <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
          <polyline points="9 22 9 12 15 12 15 22" />
        </svg>
        Tổng quan
      </button>

      <!-- Ledger -->
      <button 
        @click="emit('changeTab', 'ledger')"
        class="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition"
        :class="props.activeTab === 'ledger' ? 'bg-white/10 text-white font-bold' : 'text-slate-400 hover:text-white hover:bg-white/5'"
      >
        <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
          <polyline points="14 2 14 8 20 8" />
          <line x1="16" y1="13" x2="8" y2="13" />
          <line x1="16" y1="17" x2="8" y2="17" />
        </svg>
        Sổ thu chi (Ledger)
      </button>

      <!-- Debt -->
      <button 
        @click="emit('changeTab', 'debt')"
        class="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition"
        :class="props.activeTab === 'debt' ? 'bg-white/10 text-white font-bold' : 'text-slate-400 hover:text-white hover:bg-white/5'"
      >
        <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
          <rect x="1" y="4" width="22" height="16" rx="2" />
          <line x1="1" y1="10" x2="23" y2="10" />
        </svg>
        Quản lý công nợ (Debt)
      </button>

      <!-- Reports -->
      <button 
        @click="emit('changeTab', 'reports')"
        class="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition"
        :class="props.activeTab === 'reports' ? 'bg-white/10 text-white font-bold' : 'text-slate-400 hover:text-white hover:bg-white/5'"
      >
        <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
          <rect x="3" y="3" width="18" height="18" rx="2" />
          <path d="M3 9h18M9 21V9" />
        </svg>
        Báo cáo phân tích
      </button>
    </nav>

    <!-- Logout / Footer -->
    <div class="p-4 border-t border-slate-800">
      <button 
        @click="emit('logout')"
        class="w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-xs font-bold text-red-400 hover:text-red-300 hover:bg-red-500/10 transition"
      >
        <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
          <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
          <polyline points="16 17 21 12 16 7" />
          <line x1="21" y1="12" x2="9" y2="12" />
        </svg>
        Đăng xuất
      </button>
    </div>
  </aside>
</template>
