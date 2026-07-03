<script setup lang="ts">
import { Separator } from '~/components/ui/separator'

defineProps<{
  totalIncome: number
  totalExpense: number
  netBalance: number
  formatVND: (val: number) => string
}>()
</script>

<template>
  <div class="space-y-6 max-w-4xl mx-auto text-left">
    <div class="grid gap-6 md:grid-cols-2">
      
      <!-- SVG Financial Distribution Charts -->
      <div class="bg-canvas border border-border p-6 rounded-2xl space-y-4">
        <h3 class="font-bold text-lg text-ink">Báo cáo cơ cấu Thu - Chi</h3>
        <Separator />

        <!-- Vertical representation bar graphs -->
        <div class="space-y-4 py-4">
          <div>
            <div class="flex items-center justify-between text-xs text-ink-muted font-bold mb-1">
              <span>TỔNG THU NHẬP</span>
              <span class="text-emerald-600">{{ formatVND(totalIncome) }}</span>
            </div>
            <div class="h-3 w-full bg-surface-2 rounded-full overflow-hidden">
              <div class="h-full bg-emerald-500 rounded-full" style="width: 100%"></div>
            </div>
          </div>

          <div>
            <div class="flex items-center justify-between text-xs text-ink-muted font-bold mb-1">
              <span>TỔNG CHI TIÊU</span>
              <span class="text-destructive">{{ formatVND(totalExpense) }}</span>
            </div>
            <div class="h-3 w-full bg-surface-2 rounded-full overflow-hidden">
              <div class="h-full bg-destructive rounded-full" :style="{ width: `${totalIncome > 0 ? Math.min(Math.round((totalExpense / totalIncome) * 100), 100) : 0}%` }"></div>
            </div>
            <span class="text-[10px] text-ink-muted mt-1 block">Chiếm {{ totalIncome > 0 ? Math.round((totalExpense / totalIncome) * 100) : 0 }}% tổng thu nhập của bạn</span>
          </div>
        </div>
      </div>

      <!-- Categories Breakdown -->
      <div class="bg-canvas border border-border p-6 rounded-2xl space-y-4">
        <h3 class="font-bold text-lg text-ink">Phân tích danh mục chi tiêu</h3>
        <Separator />

        <div class="space-y-3">
          <div>
            <div class="flex items-center justify-between text-xs mb-1">
              <span class="font-semibold text-ink">Mua sắm</span>
              <span class="font-bold text-ink">1.250.000đ</span>
            </div>
            <div class="h-2 w-full bg-surface-2 rounded-full overflow-hidden">
              <div class="h-full bg-blue-500 rounded-full" style="width: 50%"></div>
            </div>
          </div>

          <div>
            <div class="flex items-center justify-between text-xs mb-1">
              <span class="font-semibold text-ink">Hóa đơn</span>
              <span class="font-bold text-ink">850.000đ</span>
            </div>
            <div class="h-2 w-full bg-surface-2 rounded-full overflow-hidden">
              <div class="h-full bg-orange-400 rounded-full" style="width: 35%"></div>
            </div>
          </div>

          <div>
            <div class="flex items-center justify-between text-xs mb-1">
              <span class="font-semibold text-ink">Ăn uống</span>
              <span class="font-bold text-ink">450.000đ</span>
            </div>
            <div class="h-2 w-full bg-surface-2 rounded-full overflow-hidden">
              <div class="h-full bg-emerald-400 rounded-full" style="width: 15%"></div>
            </div>
          </div>
        </div>
      </div>

    </div>

    <!-- Financial advice box -->
    <div class="bg-primary/5 border border-primary/20 p-6 rounded-2xl flex items-start gap-4">
      <span class="text-2xl mt-0.5">💡</span>
      <div>
        <h4 class="font-bold text-sm text-primary">Lời khuyên tài chính cá nhân</h4>
        <p class="text-xs text-ink-muted leading-relaxed mt-1">
          Khoản tiết kiệm khả dụng của bạn chiếm {{ totalIncome > 0 ? Math.round((netBalance / totalIncome) * 100) : 0 }}% thu nhập. Hãy cố gắng đầu tư tự động khoảng 20% tổng thu nhập vào các quỹ chỉ số để xây dựng tài sản lâu dài. Hãy kiểm tra các khoản nợ phải trả trước ngày 12 hàng tháng để tránh phạt trả chậm.
        </p>
      </div>
    </div>
  </div>
</template>
