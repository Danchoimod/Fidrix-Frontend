<script setup lang="ts">
import { useFinancialStore } from '~/stores/financialStore'
import ReportTab from '~/components/dashboard/ReportTab.vue'

definePageMeta({})

const financialStore = useFinancialStore()

const formatVND = (value: number) => {
  return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(value)
}
</script>

<template>
  <ReportTab 
    :total-income="financialStore.totalIncome"
    :total-expense="financialStore.totalExpense"
    :net-balance="financialStore.netBalance"
    :format-v-n-d="formatVND"
  />
</template>
