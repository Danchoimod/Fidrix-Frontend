<script setup lang="ts">
import { useFinancialStore } from '~/stores/financialStore'
import OverviewTab from '~/components/dashboard/OverviewTab.vue'

definePageMeta({})

const financialStore = useFinancialStore()

const formatVND = (value: number) => {
  return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(value)
}

const handleTabChange = (tab: 'home' | 'ledger' | 'debt' | 'reports') => {
  if (tab === 'home') navigateTo('/')
  else navigateTo(`/${tab}`)
}
</script>

<template>
  <OverviewTab 
    :net-balance="financialStore.netBalance"
    :net-debt="financialStore.netDebt"
    :total-income="financialStore.totalIncome"
    :total-expense="financialStore.totalExpense"
    :total-lend="financialStore.totalLend"
    :total-owe="financialStore.totalOwe"
    :transactions="financialStore.transactions"
    :optimal-settlement="financialStore.optimalSettlement"
    :done-transactions="financialStore.doneTransactions"
    :upcoming-payments="financialStore.upcomingPayments"
    :format-v-n-d="formatVND"
    @change-tab="handleTabChange"
    @toggle-settle-done="financialStore.toggleSettleDone"
    @pay-payment="financialStore.payPayment"
  />
</template>
