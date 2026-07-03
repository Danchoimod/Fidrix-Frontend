<script setup lang="ts">
import {
  ArrowUpRight,
  ArrowDownRight,
  CheckCircle2,
  AlertCircle
} from "@lucide/vue"
import { Separator } from '~/components/ui/separator'

defineProps<{
  netBalance: number
  netDebt: number
  totalIncome: number
  totalExpense: number
  totalLend: number
  totalOwe: number
  transactions: any[]
  optimalSettlement: any[]
  doneTransactions: Record<number, boolean>
  formatVND: (val: number) => string
}>()

const emit = defineEmits<{
  (e: 'changeTab', tab: string): void
  (e: 'toggleSettleDone', index: number): void
}>()
</script>

<template>
  <div class="space-y-6 max-w-6xl mx-auto">
    <!-- Balance banner and quick statistics -->
    <div class="grid gap-6 md:grid-cols-3">
      <!-- Dropbox Premium Balance Card -->
      <div class="md:col-span-2 relative overflow-hidden rounded-2xl bg-slate-900 text-white p-6 shadow-md border border-slate-800 transition duration-300 hover:shadow-lg">
        <div class="absolute -top-12 -right-12 size-40 rounded-full bg-primary/20 blur-2xl" />
        <span class="text-xs font-bold tracking-widest text-slate-400 uppercase">TỔNG SỐ DƯ RÒNG</span>
        <h2 class="text-4xl font-extrabold tracking-tight mt-1 mb-6 text-white">{{ formatVND(netBalance) }}</h2>
        
        <div class="space-y-2 mt-4 pt-4 border-t border-slate-800">
          <div class="flex items-center justify-between text-xs text-slate-400">
            <span>Mục tiêu tiết kiệm tháng này</span>
            <span class="font-bold text-emerald-400">65%</span>
          </div>
          <div class="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
            <div class="h-full bg-gradient-to-r from-primary to-emerald-500 rounded-full transition-all duration-1000" style="width: 65%"></div>
          </div>
        </div>
      </div>

      <!-- Net Debt Card -->
      <div class="rounded-2xl bg-surface-1 border border-border p-6 flex flex-col justify-between">
        <div>
          <span class="text-xs font-bold tracking-widest text-ink-muted uppercase">SỐ DƯ CÔNG NỢ</span>
          <h3 class="text-3xl font-extrabold mt-1" :class="netDebt >= 0 ? 'text-emerald-600' : 'text-destructive'">
            {{ netDebt >= 0 ? '+' : '' }}{{ formatVND(netDebt) }}
          </h3>
          <p class="text-xs text-ink-muted mt-2">
            {{ netDebt >= 0 ? '✅ Bạn đang được nợ ròng' : '⚠️ Bạn đang nợ ròng' }}
          </p>
        </div>
        
        <div class="grid grid-cols-2 gap-2 mt-4 pt-4 border-t border-border">
          <div>
            <span class="text-[10px] text-ink-muted uppercase font-semibold">Họ nợ tôi</span>
            <p class="text-sm font-bold text-emerald-600">{{ formatVND(totalLend) }}</p>
          </div>
          <div>
            <span class="text-[10px] text-ink-muted uppercase font-semibold">Tôi nợ họ</span>
            <p class="text-sm font-bold text-destructive">{{ formatVND(totalOwe) }}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Stats grid -->
    <div class="grid gap-4 grid-cols-2 lg:grid-cols-4">
      <div class="rounded-xl bg-surface-1 border border-border p-4 transition hover:bg-surface-2">
        <div class="flex items-center justify-between mb-2">
          <span class="text-xs font-medium text-ink-muted">Thu nhập</span>
          <span class="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded">+8%</span>
        </div>
        <p class="text-xl font-bold text-ink">{{ formatVND(totalIncome) }}</p>
      </div>

      <div class="rounded-xl bg-surface-1 border border-border p-4 transition hover:bg-surface-2">
        <div class="flex items-center justify-between mb-2">
          <span class="text-xs font-medium text-ink-muted">Chi tiêu</span>
          <span class="text-[10px] font-bold text-destructive bg-destructive/5 px-1.5 py-0.5 rounded">-5%</span>
        </div>
        <p class="text-xl font-bold text-ink">{{ formatVND(totalExpense) }}</p>
      </div>

      <div class="rounded-xl bg-surface-1 border border-border p-4 transition hover:bg-surface-2">
        <div class="flex items-center justify-between mb-2">
          <span class="text-xs font-medium text-ink-muted">Tỉ lệ tiết kiệm</span>
          <span class="text-[10px] font-bold text-primary bg-primary/5 px-1.5 py-0.5 rounded">Khá tốt</span>
        </div>
        <p class="text-xl font-bold text-ink font-semibold">
          {{ totalIncome > 0 ? Math.round((netBalance / totalIncome) * 100) : 0 }}%
        </p>
      </div>

      <div class="rounded-xl bg-surface-1 border border-border p-4 transition hover:bg-surface-2">
        <div class="flex items-center justify-between mb-2">
          <span class="text-xs font-medium text-ink-muted">Giao dịch mới</span>
          <span class="text-[10px] font-bold text-neutral-500 bg-neutral-100 px-1.5 py-0.5 rounded">Hôm nay</span>
        </div>
        <p class="text-xl font-bold text-ink">+2</p>
      </div>
    </div>

    <!-- Detailed Grid: Transactions & Settle Plan -->
    <div class="grid gap-6 lg:grid-cols-2">
      
      <!-- Recent Transactions -->
      <div class="rounded-2xl border border-border p-6 bg-canvas space-y-4">
        <div class="flex items-center justify-between">
          <h3 class="text-lg font-bold text-ink">Giao dịch gần đây</h3>
          <button @click="emit('changeTab', 'ledger')" class="text-xs text-primary font-bold hover:underline">Sổ chi tiêu →</button>
        </div>
        <Separator />
        
        <div class="space-y-3">
          <div v-for="tx in transactions.slice(0, 4)" :key="tx.id" class="flex items-center justify-between p-2 rounded-lg hover:bg-surface-1 transition">
            <div class="flex items-center gap-3">
              <div class="size-10 rounded-full flex items-center justify-center" :class="tx.type === 'income' ? 'bg-emerald-50 text-emerald-600' : 'bg-destructive/5 text-destructive'">
                <ArrowUpRight v-if="tx.type === 'income'" class="size-5" />
                <ArrowDownRight v-else class="size-5" />
              </div>
              <div class="text-left">
                <p class="text-sm font-semibold text-ink">{{ tx.desc }}</p>
                <span class="text-[11px] text-ink-muted">{{ tx.category }} · {{ tx.date }}</span>
              </div>
            </div>
            <span class="text-sm font-extrabold" :class="tx.type === 'income' ? 'text-emerald-600' : 'text-ink'">
              {{ tx.type === 'income' ? '+' : '-' }}{{ formatVND(tx.amount) }}
            </span>
          </div>
        </div>
      </div>

      <!-- Optimal Settle Plan -->
      <div class="rounded-2xl border border-border p-6 bg-canvas space-y-4">
        <div class="flex items-center justify-between">
          <h3 class="text-lg font-bold text-ink">Bù trừ công nợ tối ưu</h3>
          <span class="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">
            {{ optimalSettlement.length }} Giao dịch cần xử lý
          </span>
        </div>
        <Separator />

        <div v-if="optimalSettlement.length === 0" class="flex flex-col items-center justify-center p-8 text-ink-muted text-center">
          <span class="text-3xl mb-2">⚖️</span>
          <p class="text-sm font-medium">Tuyệt vời! Công nợ đang ở trạng thái cân bằng.</p>
        </div>
        
        <div v-else class="space-y-3">
          <div v-for="(t, index) in optimalSettlement" :key="index" class="flex items-center justify-between p-3 border border-border rounded-xl hover:bg-surface-1 transition duration-150">
            <div class="flex items-center gap-2">
              <div class="size-7 rounded-full flex items-center justify-center text-xs font-bold text-white" :style="{ backgroundColor: t.fromColor }">
                {{ t.from[0].toUpperCase() }}
              </div>
              <span class="text-xs text-ink-muted">gửi cho</span>
              <div class="size-7 rounded-full flex items-center justify-center text-xs font-bold text-white" :style="{ backgroundColor: t.toColor }">
                {{ t.to[0].toUpperCase() }}
              </div>
              <span class="text-xs font-semibold text-ink ml-1 text-left">{{ t.from }} → {{ t.to }}</span>
            </div>
            <div class="flex items-center gap-3">
              <span class="text-sm font-extrabold text-ink">{{ formatVND(t.amount) }}</span>
              <button 
                @click="emit('toggleSettleDone', index)"
                class="text-[10px] font-bold px-2 py-1 rounded transition duration-200 border"
                :class="doneTransactions[index] ? 'bg-emerald-500 border-emerald-500 text-white' : 'bg-surface-2 border-border text-ink-muted hover:bg-surface-2'"
              >
                {{ doneTransactions[index] ? 'Đã xong' : 'Xong' }}
              </button>
            </div>
          </div>
        </div>
      </div>

    </div>

    <!-- Upcoming payments panel -->
    <div class="rounded-2xl border border-border p-6 bg-canvas space-y-4">
      <h3 class="text-lg font-bold text-ink">Thanh toán định kỳ sắp tới</h3>
      <div class="grid gap-4 sm:grid-cols-2 text-left">
        <div class="flex items-center justify-between p-4 border border-emerald-500/20 bg-emerald-50/10 rounded-xl">
          <div class="flex items-center gap-3">
            <div class="size-10 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-600">
              <CheckCircle2 class="size-5" />
            </div>
            <div>
              <p class="text-sm font-semibold text-ink">Laptop trả góp</p>
              <span class="text-xs text-ink-muted">Hạn chót: 15 Thg 08</span>
            </div>
          </div>
          <span class="text-sm font-extrabold text-ink">2.150.000đ</span>
        </div>

        <div class="flex items-center justify-between p-4 border border-destructive/20 bg-destructive/5 rounded-xl">
          <div class="flex items-center gap-3">
            <div class="size-10 rounded-xl bg-destructive/10 flex items-center justify-center text-destructive">
              <AlertCircle class="size-5" />
            </div>
            <div>
              <p class="text-sm font-semibold text-ink">Thẻ tín dụng VIB</p>
              <span class="text-xs text-destructive font-semibold">Hạn chót: 12 Thg 08 (Sắp tới)</span>
            </div>
          </div>
          <span class="text-sm font-extrabold text-destructive">1.200.000đ</span>
        </div>
      </div>
    </div>
  </div>
</template>
