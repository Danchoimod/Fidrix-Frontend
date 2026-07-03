<script setup lang="ts">
import { ref, watch } from 'vue'

const props = defineProps<{
  isOpen: boolean
}>()

const emit = defineEmits<{
  (e: 'close'): void
  (e: 'submit', transaction: {
    desc: string
    amount: number
    type: 'income' | 'expense' | 'debt' | 'transfer' | 'savings' | 'investment'
    category: string
    date: string
  }): void
}>()

// Step state: 'grid' | 'form'
const step = ref<'grid' | 'form'>('grid')

// Form states
const selectedType = ref<'income' | 'expense' | 'debt' | 'transfer' | 'savings' | 'investment'>('expense')
const amount = ref<number | null>(null)
const desc = ref('')
const category = ref('')
const date = ref(new Date().toISOString().substring(0, 10))

const resetForm = () => {
  step.value = 'grid'
  amount.value = null
  desc.value = ''
  category.value = ''
  date.value = new Date().toISOString().substring(0, 10)
}

watch(() => props.isOpen, (newVal) => {
  if (!newVal) {
    resetForm()
  }
})

const handleSelectType = (type: typeof selectedType.value) => {
  selectedType.value = type
  // Set default category based on type
  if (type === 'income') category.value = 'Thu nhập'
  else if (type === 'expense') category.value = 'Ăn uống'
  else if (type === 'debt') category.value = 'Trả nợ'
  else if (type === 'transfer') category.value = 'Chuyển khoản'
  else if (type === 'savings') category.value = 'Tiết kiệm'
  else if (type === 'investment') category.value = 'Đầu tư'
  
  step.value = 'form'
}

const handleSubmit = () => {
  if (!amount.value || amount.value <= 0 || !desc.value) return
  emit('submit', {
    desc: desc.value,
    amount: amount.value,
    type: selectedType.value,
    category: category.value || 'Khác',
    date: date.value
  })
  emit('close')
}
</script>

<template>
  <div 
    class="fixed inset-0 z-50 flex items-end justify-center bg-black/50 transition-opacity duration-300"
    :class="props.isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'"
    @click.self="emit('close')"
  >
    <div 
      class="bg-white rounded-t-[24px] p-5 w-full max-w-[420px] transition-transform duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]"
      :class="props.isOpen ? 'translate-y-0' : 'translate-y-full'"
    >
      <!-- Sheet Handle -->
      <div class="w-9 h-1 bg-gray-200 rounded-full mx-auto mb-5"></div>

      <!-- STEP 1: GRID SELECTION -->
      <div v-if="step === 'grid'">
        <h3 class="text-lg font-bold mb-4 text-[#1a1a2e] text-center">Thêm giao dịch</h3>
        <div class="grid grid-cols-3 gap-3">
          <!-- Income -->
          <button @click="handleSelectType('income')" class="flex flex-col items-center gap-2 p-3.5 rounded-2xl bg-gray-50 border-none cursor-pointer active:scale-95 transition hover:bg-gray-100">
            <div class="w-11 h-11 rounded-xl flex items-center justify-center bg-green-50 text-emerald-500">
              <svg class="w-[22px] h-[22px]" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                <line x1="12" y1="5" x2="12" y2="19" />
                <line x1="5" y1="12" x2="19" y2="12" />
              </svg>
            </div>
            <span class="text-xs font-semibold text-[#1a1a2e]">Thu nhập</span>
          </button>

          <!-- Expense -->
          <button @click="handleSelectType('expense')" class="flex flex-col items-center gap-2 p-3.5 rounded-2xl bg-gray-50 border-none cursor-pointer active:scale-95 transition hover:bg-gray-100">
            <div class="w-11 h-11 rounded-xl flex items-center justify-center bg-red-50 text-red-500">
              <svg class="w-[22px] h-[22px]" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                <line x1="5" y1="12" x2="19" y2="12" />
              </svg>
            </div>
            <span class="text-xs font-semibold text-[#1a1a2e]">Chi tiêu</span>
          </button>

          <!-- Debt -->
          <button @click="handleSelectType('debt')" class="flex flex-col items-center gap-2 p-3.5 rounded-2xl bg-gray-50 border-none cursor-pointer active:scale-95 transition hover:bg-gray-100">
            <div class="w-11 h-11 rounded-xl flex items-center justify-center bg-orange-100 text-orange-500">
              <svg class="w-[22px] h-[22px]" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                <path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20z" />
                <polyline points="12 6 12 12 16 14" />
              </svg>
            </div>
            <span class="text-xs font-semibold text-[#1a1a2e]">Trả nợ</span>
          </button>

          <!-- Transfer -->
          <button @click="handleSelectType('transfer')" class="flex flex-col items-center gap-2 p-3.5 rounded-2xl bg-gray-50 border-none cursor-pointer active:scale-95 transition hover:bg-gray-100">
            <div class="w-11 h-11 rounded-xl flex items-center justify-center bg-indigo-100 text-indigo-500">
              <svg class="w-[22px] h-[22px]" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                <path d="M17 1l4 4-4 4" />
                <path d="M3 11V9a4 4 0 0 1 4-4h14" />
                <path d="M7 23l-4-4 4-4" />
                <path d="M21 13v2a4 4 0 0 1-4 4H3" />
              </svg>
            </div>
            <span class="text-xs font-semibold text-[#1a1a2e]">Chuyển tiền</span>
          </button>

          <!-- Savings -->
          <button @click="handleSelectType('savings')" class="flex flex-col items-center gap-2 p-3.5 rounded-2xl bg-gray-50 border-none cursor-pointer active:scale-95 transition hover:bg-gray-100">
            <div class="w-11 h-11 rounded-xl flex items-center justify-center bg-[#f3e8ff] text-[#9333ea]">
              <svg class="w-[22px] h-[22px]" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
              </svg>
            </div>
            <span class="text-xs font-semibold text-[#1a1a2e]">Tiết kiệm</span>
          </button>

          <!-- Investment -->
          <button @click="handleSelectType('investment')" class="flex flex-col items-center gap-2 p-3.5 rounded-2xl bg-gray-50 border-none cursor-pointer active:scale-95 transition hover:bg-gray-100">
            <div class="w-11 h-11 rounded-xl flex items-center justify-center bg-[#fef9c3] text-[#ca8a04]">
              <svg class="w-[22px] h-[22px]" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="3" />
                <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
              </svg>
            </div>
            <span class="text-xs font-semibold text-[#1a1a2e]">Đầu tư</span>
          </button>
        </div>
      </div>

      <!-- STEP 2: DETAILS FORM -->
      <div v-else>
        <div class="flex items-center justify-between mb-4">
          <button @click="step = 'grid'" class="text-sm font-semibold text-gray-500 hover:text-gray-700 flex items-center gap-1">
            ← Quay lại
          </button>
          <h3 class="text-base font-bold text-[#1a1a2e]">
            Nhập {{ selectedType === 'income' ? 'khoản thu' : 'khoản chi' }}
          </h3>
          <div class="w-14"></div>
        </div>

        <form @submit.prevent="handleSubmit" class="space-y-4 text-left">
          <div>
            <label class="block text-xs font-bold text-gray-500 uppercase mb-1">Mô tả</label>
            <input 
              v-model="desc" 
              type="text" 
              class="w-full text-sm px-3 py-2 border rounded-lg focus:outline-none focus:ring-1 focus:ring-[#10b981]" 
              placeholder="VD: Ăn sáng, Lương tháng..." 
              required 
            />
          </div>

          <div>
            <label class="block text-xs font-bold text-gray-500 uppercase mb-1">Số tiền (đ)</label>
            <input 
              v-model="amount" 
              type="number" 
              class="w-full text-sm px-3 py-2 border rounded-lg focus:outline-none focus:ring-1 focus:ring-[#10b981]" 
              placeholder="VD: 50000" 
              min="1" 
              required 
            />
          </div>

          <div>
            <label class="block text-xs font-bold text-gray-500 uppercase mb-1">Danh mục</label>
            <select v-model="category" class="w-full text-sm px-3 py-2 border rounded-lg focus:outline-none focus:ring-1 focus:ring-[#10b981]">
              <option v-if="selectedType === 'income'">Thu nhập</option>
              <option v-if="selectedType === 'expense'">Ăn uống</option>
              <option v-if="selectedType === 'expense'">Mua sắm</option>
              <option v-if="selectedType === 'expense'">Hóa đơn</option>
              <option v-if="selectedType === 'expense'">Di chuyển</option>
              <option v-if="selectedType === 'expense'">Giải trí</option>
              <option v-if="selectedType === 'debt'">Trả nợ</option>
              <option v-if="selectedType === 'transfer'">Chuyển khoản</option>
              <option v-if="selectedType === 'savings'">Tiết kiệm</option>
              <option v-if="selectedType === 'investment'">Đầu tư</option>
              <option>Khác</option>
            </select>
          </div>

          <div>
            <label class="block text-xs font-bold text-gray-500 uppercase mb-1">Ngày giao dịch</label>
            <input 
              v-model="date" 
              type="date" 
              class="w-full text-sm px-3 py-2 border rounded-lg focus:outline-none focus:ring-1 focus:ring-[#10b981]" 
              required 
            />
          </div>

          <button 
            type="submit" 
            class="w-full bg-[#0f172a] text-white font-bold py-2.5 rounded-xl hover:bg-slate-800 transition active:scale-98"
          >
            Xác nhận thêm
          </button>
        </form>
      </div>
    </div>
  </div>
</template>
