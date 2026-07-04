<script setup lang="ts">
import { useFinancialStore } from '~/stores/financialStore'
import LedgerTab from '~/components/dashboard/LedgerTab.vue'

definePageMeta({
  layout: 'default'
})

const financialStore = useFinancialStore()

const formatVND = (value: number) => {
  return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(value)
}
</script>

<template>
  <LedgerTab 
    :transactions="financialStore.transactions"
    :debts="financialStore.debts"
    :format-v-n-d="formatVND"
    @add-transaction="financialStore.addTransaction"
    @delete-transaction="financialStore.deleteTransaction"
    @add-debt="financialStore.addDebt"
    @delete-debt="financialStore.deleteDebt"
  />
</template>
