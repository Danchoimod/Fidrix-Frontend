<script setup lang="ts">
const props = defineProps<{
  activeTab: 'home' | 'ledger' | 'debt' | 'reports'
}>()

const emit = defineEmits<{
  (e: 'changeTab', tab: 'home' | 'ledger' | 'debt' | 'reports'): void
}>()
</script>

<template>
  <nav class="fixed bottom-0 left-0 w-full bg-white border-t border-gray-100 flex p-[10px_0_16px] z-30 shadow-[-4px_0_20px_rgba(0,0,0,0.08)]">
    <!-- Home Tab -->
    <button 
      class="nav-item flex-1 flex flex-col items-center justify-center cursor-pointer p-[4px_0] transition-colors border-none bg-transparent"
      @click="emit('changeTab', 'home')"
    >
      <div 
        v-if="props.activeTab === 'home'" 
        class="nav-pill bg-[#0f172a] rounded-[14px] p-[8px_20px_6px] flex flex-col items-center gap-1 text-white"
      >
        <svg class="w-[22px] h-[22px]" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
          <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
          <polyline points="9 22 9 12 15 12 15 22" />
        </svg>
        <span class="text-[10px] font-semibold tracking-[0.02em]">Home</span>
      </div>
      <div v-else class="flex flex-col items-center gap-1 text-gray-400 hover:text-gray-600">
        <svg class="w-[22px] h-[22px]" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
          <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
          <polyline points="9 22 9 12 15 12 15 22" />
        </svg>
        <span class="text-[10px] font-semibold tracking-[0.02em]">Home</span>
      </div>
    </button>

    <!-- Ledger Tab -->
    <button 
      class="nav-item flex-1 flex flex-col items-center justify-center cursor-pointer p-[4px_0] transition-colors border-none bg-transparent"
      @click="emit('changeTab', 'ledger')"
    >
      <div 
        v-if="props.activeTab === 'ledger'" 
        class="nav-pill bg-[#0f172a] rounded-[14px] p-[8px_20px_6px] flex flex-col items-center gap-1 text-white"
      >
        <svg class="w-[22px] h-[22px]" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
          <polyline points="14 2 14 8 20 8" />
          <line x1="16" y1="13" x2="8" y2="13" />
          <line x1="16" y1="17" x2="8" y2="17" />
        </svg>
        <span class="text-[10px] font-semibold tracking-[0.02em]">Ledger</span>
      </div>
      <div v-else class="flex flex-col items-center gap-1 text-gray-400 hover:text-gray-600">
        <svg class="w-[22px] h-[22px]" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
          <polyline points="14 2 14 8 20 8" />
          <line x1="16" y1="13" x2="8" y2="13" />
          <line x1="16" y1="17" x2="8" y2="17" />
        </svg>
        <span class="text-[10px] font-semibold tracking-[0.02em]">Ledger</span>
      </div>
    </button>

    <!-- Debt Tab -->
    <button 
      class="nav-item flex-1 flex flex-col items-center justify-center cursor-pointer p-[4px_0] transition-colors border-none bg-transparent"
      @click="emit('changeTab', 'debt')"
    >
      <div 
        v-if="props.activeTab === 'debt'" 
        class="nav-pill bg-[#0f172a] rounded-[14px] p-[8px_20px_6px] flex flex-col items-center gap-1 text-white"
      >
        <svg class="w-[22px] h-[22px]" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
          <rect x="1" y="4" width="22" height="16" rx="2" />
          <line x1="1" y1="10" x2="23" y2="10" />
        </svg>
        <span class="text-[10px] font-semibold tracking-[0.02em]">Debt</span>
      </div>
      <div v-else class="flex flex-col items-center gap-1 text-gray-400 hover:text-gray-600">
        <svg class="w-[22px] h-[22px]" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
          <rect x="1" y="4" width="22" height="16" rx="2" />
          <line x1="1" y1="10" x2="23" y2="10" />
        </svg>
        <span class="text-[10px] font-semibold tracking-[0.02em]">Debt</span>
      </div>
    </button>

    <!-- Reports Tab -->
    <button 
      class="nav-item flex-1 flex flex-col items-center justify-center cursor-pointer p-[4px_0] transition-colors border-none bg-transparent"
      @click="emit('changeTab', 'reports')"
    >
      <div 
        v-if="props.activeTab === 'reports'" 
        class="nav-pill bg-[#0f172a] rounded-[14px] p-[8px_20px_6px] flex flex-col items-center gap-1 text-white"
      >
        <svg class="w-[22px] h-[22px]" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
          <rect x="3" y="3" width="18" height="18" rx="2" />
          <path d="M3 9h18M9 21V9" />
        </svg>
        <span class="text-[10px] font-semibold tracking-[0.02em]">Reports</span>
      </div>
      <div v-else class="flex flex-col items-center gap-1 text-gray-400 hover:text-gray-600">
        <svg class="w-[22px] h-[22px]" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
          <rect x="3" y="3" width="18" height="18" rx="2" />
          <path d="M3 9h18M9 21V9" />
        </svg>
        <span class="text-[10px] font-semibold tracking-[0.02em]">Reports</span>
      </div>
    </button>
  </nav>
</template>
