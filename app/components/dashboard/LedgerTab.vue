<script setup lang="ts">
import { ref } from 'vue'
import { Plus, Trash2 } from "@lucide/vue"
import { Button } from '~/components/ui/button'
import { Separator } from '~/components/ui/separator'

defineProps<{
  transactions: any[]
  debts: any[]
  formatVND: (val: number) => string
}>()

const emit = defineEmits<{
  (e: 'addTransaction', tx: { desc: string, amount: number, category: string, type: 'income' | 'expense', date: string }): void
  (e: 'deleteTransaction', id: number): void
  (e: 'addDebt', debt: { name: string, amount: number, type: 'lend' | 'owe', note: string }): void
  (e: 'deleteDebt', id: number): void
}>()

// Transaction form
const newTxDesc = ref('')
const newTxAmount = ref<number | null>(null)
const newTxCategory = ref('Ăn uống')
const newTxType = ref<'income' | 'expense'>('expense')
const newTxDate = ref(new Date().toISOString().substring(0, 10))

const handleAddTx = () => {
  if (!newTxDesc.value || !newTxAmount.value || newTxAmount.value <= 0) return
  emit('addTransaction', {
    desc: newTxDesc.value,
    amount: newTxAmount.value,
    category: newTxCategory.value,
    type: newTxType.value,
    date: newTxDate.value
  })
  newTxDesc.value = ''
  newTxAmount.value = null
}

// Debt form
const newDebtName = ref('')
const newDebtAmount = ref<number | null>(null)
const newDebtNote = ref('')
const newDebtType = ref<'lend' | 'owe'>('lend')

const handleAddDebt = () => {
  if (!newDebtName.value || !newDebtAmount.value || newDebtAmount.value <= 0) return
  emit('addDebt', {
    name: newDebtName.value,
    amount: newDebtAmount.value,
    type: newDebtType.value,
    note: newDebtNote.value
  })
  newDebtName.value = ''
  newDebtAmount.value = null
  newDebtNote.value = ''
}
</script>

<template>
  <div class="space-y-6 max-w-5xl mx-auto text-left">
    <div class="grid gap-6 md:grid-cols-3">
      <!-- Add Transaction Card -->
      <div class="md:col-span-1 bg-surface-1 border border-border p-6 rounded-2xl space-y-4 h-fit">
        <h3 class="font-bold text-lg text-ink">Thêm giao dịch</h3>
        
        <form @submit.prevent="handleAddTx" class="space-y-3">
          <div>
            <label class="block text-xs font-semibold text-ink-muted mb-1">Mô tả</label>
            <input v-model="newTxDesc" type="text" class="w-full text-sm px-3 py-2 bg-canvas border border-border rounded-lg focus:outline-none focus:ring-1 focus:ring-primary" placeholder="VD: Mua trà sữa..." required />
          </div>

          <div>
            <label class="block text-xs font-semibold text-ink-muted mb-1">Số tiền (đ)</label>
            <input v-model="newTxAmount" type="number" class="w-full text-sm px-3 py-2 bg-canvas border border-border rounded-lg focus:outline-none focus:ring-1 focus:ring-primary" placeholder="VD: 50000" min="1" required />
          </div>

          <div>
            <label class="block text-xs font-semibold text-ink-muted mb-1">Loại</label>
            <div class="grid grid-cols-2 gap-2">
              <button type="button" @click="newTxType = 'expense'" class="py-1.5 text-xs font-bold rounded-lg border text-center transition" :class="newTxType === 'expense' ? 'bg-ink text-canvas border-ink' : 'bg-canvas text-ink border-border'">
                Khoản chi
              </button>
              <button type="button" @click="newTxType = 'income'" class="py-1.5 text-xs font-bold rounded-lg border text-center transition" :class="newTxType === 'income' ? 'bg-primary text-white border-primary' : 'bg-canvas text-ink border-border'">
                Thu nhập
              </button>
            </div>
          </div>

          <div>
            <label class="block text-xs font-semibold text-ink-muted mb-1">Danh mục</label>
            <select v-model="newTxCategory" class="w-full text-sm px-3 py-2 bg-canvas border border-border rounded-lg focus:outline-none">
              <option>Ăn uống</option>
              <option>Mua sắm</option>
              <option>Hóa đơn</option>
              <option>Di chuyển</option>
              <option>Thu nhập</option>
              <option>Khác</option>
            </select>
          </div>

          <div>
            <label class="block text-xs font-semibold text-ink-muted mb-1">Ngày giao dịch</label>
            <input v-model="newTxDate" type="date" class="w-full text-sm px-3 py-2 bg-canvas border border-border rounded-lg focus:outline-none" required />
          </div>

          <Button type="submit" class="w-full bg-primary hover:bg-primary-hover text-white font-semibold py-2">
            <Plus class="size-4 mr-2" /> Thêm giao dịch
          </Button>
        </form>
      </div>

      <!-- Transaction Records / Table -->
      <div class="md:col-span-2 bg-canvas border border-border p-6 rounded-2xl space-y-4">
        <div class="flex items-center justify-between">
          <h3 class="font-bold text-lg text-ink">Nhật ký thu chi</h3>
          <span class="text-xs text-ink-muted font-medium">{{ transactions.length }} giao dịch</span>
        </div>
        
        <Separator />

        <div class="overflow-x-auto">
          <table class="w-full text-left border-collapse">
            <thead>
              <tr class="border-b border-border text-ink-muted text-xs font-bold">
                <th class="pb-3 font-semibold">Mô tả / Ngày</th>
                <th class="pb-3 font-semibold">Danh mục</th>
                <th class="pb-3 font-semibold">Loại</th>
                <th class="pb-3 font-semibold text-right">Số tiền</th>
                <th class="pb-3 text-right"></th>
              </tr>
            </thead>
            <tbody class="divide-y divide-border/60">
              <tr v-for="tx in transactions" :key="tx.id" class="text-sm hover:bg-surface-1/40 transition">
                <td class="py-3.5">
                  <p class="font-semibold text-ink">{{ tx.desc }}</p>
                  <span class="text-[11px] text-ink-muted">{{ tx.date }}</span>
                </td>
                <td class="py-3.5 text-ink-muted">{{ tx.category }}</td>
                <td class="py-3.5">
                  <span class="px-2 py-0.5 text-[10px] font-bold rounded" :class="tx.type === 'income' ? 'bg-emerald-50 text-emerald-700' : 'bg-neutral-100 text-neutral-700'">
                    {{ tx.type === 'income' ? 'Thu' : 'Chi' }}
                  </span>
                </td>
                <td class="py-3.5 font-bold text-right" :class="tx.type === 'income' ? 'text-emerald-600' : 'text-ink'">
                  {{ tx.type === 'income' ? '+' : '-' }}{{ formatVND(tx.amount) }}
                </td>
                <td class="py-3.5 text-right">
                  <button @click="emit('deleteTransaction', tx.id)" class="text-ink-muted hover:text-destructive p-1 rounded transition duration-150">
                    <Trash2 class="size-4" />
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <!-- Debt Management Form & List -->
    <div class="bg-canvas border border-border p-6 rounded-2xl space-y-6">
      <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
        <div>
          <h3 class="font-bold text-lg text-ink">Quản lý nợ & cho vay</h3>
          <p class="text-xs text-ink-muted">Theo dõi bù trừ nợ và tự động tính toán bù trừ nhanh</p>
        </div>
        
        <form @submit.prevent="handleAddDebt" class="flex items-center gap-2">
          <input v-model="newDebtName" type="text" placeholder="Tên" class="text-xs px-2.5 py-1.5 bg-surface-1 border border-border rounded-lg focus:outline-none" required />
          <input v-model="newDebtAmount" type="number" placeholder="Số tiền" class="text-xs w-24 px-2.5 py-1.5 bg-surface-1 border border-border rounded-lg focus:outline-none" min="1" required />
          <select v-model="newDebtType" class="text-xs px-2.5 py-1.5 bg-surface-1 border border-border rounded-lg focus:outline-none">
            <option value="lend">Cho vay</option>
            <option value="owe">Đi vay</option>
          </select>
          <button type="submit" class="text-xs font-semibold bg-primary hover:bg-primary-hover text-white px-3 py-1.5 rounded-lg flex items-center gap-1 transition">
            <Plus class="size-3" /> Thêm
          </button>
        </form>
      </div>
      
      <Separator />

      <div class="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        <div v-for="d in debts" :key="d.id" class="p-4 border border-border rounded-xl relative hover:shadow-xs transition flex flex-col justify-between" :style="{ borderLeft: `4px solid ${d.color}` }">
          <div>
            <div class="flex items-center gap-2 mb-1">
              <div class="size-6 rounded-full flex items-center justify-center text-xs font-bold text-white" :style="{ backgroundColor: d.color }">
                {{ d.name[0].toUpperCase() }}
              </div>
              <span class="font-bold text-sm text-ink">{{ d.name }}</span>
            </div>
            <span class="text-xs font-semibold" :class="d.amount > 0 ? 'text-emerald-600' : 'text-destructive'">
              {{ d.amount > 0 ? `Họ nợ bạn: ${formatVND(d.amount)}` : `Bạn nợ họ: ${formatVND(Math.abs(d.amount))}` }}
            </span>
            <p class="text-[11px] text-ink-muted mt-1 italic" v-if="d.note">{{ d.note }}</p>
          </div>

          <div class="flex justify-end mt-4">
            <button @click="emit('deleteDebt', d.id)" class="text-xs text-ink-muted hover:text-destructive bg-surface-2 px-2 py-1 rounded transition duration-150">
              Xóa nợ
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
