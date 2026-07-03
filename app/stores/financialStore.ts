import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useFinancialStore = defineStore('financial', () => {
  // State
  const transactions = ref([
    { id: 1, desc: 'Lương tháng 8', amount: 15200000, category: 'Thu nhập', type: 'income', date: '2024-08-05' },
    { id: 2, desc: 'Mua sắm Shopee', amount: 5050000, category: 'Mua sắm', type: 'expense', date: '2024-08-06' },
    { id: 3, desc: 'Laptop Trả Góp', amount: 2150000, category: 'Hóa đơn', type: 'expense', date: '2024-08-15' },
    { id: 4, desc: 'Thẻ Tín Dụng VIB', amount: 1200000, category: 'Hóa đơn', type: 'expense', date: '2024-08-12' },
  ])

  const upcomingPayments = ref([
    { id: 101, name: 'Laptop Trả Góp', dueDate: '15 Thg 08', amount: 2150000, isUrgent: false },
    { id: 102, name: 'Thẻ Tín Dụng VIB', dueDate: '12 Thg 08', amount: 1200000, isUrgent: true }
  ])

  const debts = ref([
    { id: 1, name: 'Linh', amount: 800000, type: 'lend', note: 'Tiền ăn trưa nhóm', color: '#10b981' },
    { id: 2, name: 'Nam', amount: -400000, type: 'owe', note: 'Vay mua trà sữa', color: '#ef4444' }
  ])

  const doneTransactions = ref<Record<number, boolean>>({})

  const optimalSettlement = ref([
    { from: 'Nam', fromColor: '#ef4444', to: 'Linh', toColor: '#10b981', amount: 400000 }
  ])

  // Getters
  const totalIncome = computed(() => {
    return transactions.value
      .filter(t => t.type === 'income')
      .reduce((sum, t) => sum + t.amount, 0)
  })

  const totalExpense = computed(() => {
    return transactions.value
      .filter(t => t.type === 'expense')
      .reduce((sum, t) => sum + t.amount, 0)
  })

  const netBalance = computed(() => {
    return 50000000 + totalIncome.value - totalExpense.value
  })

  const totalLend = computed(() => {
    return debts.value
      .filter(d => d.amount > 0)
      .reduce((sum, d) => sum + d.amount, 0)
  })

  const totalOwe = computed(() => {
    return debts.value
      .filter(d => d.amount < 0)
      .reduce((sum, d) => sum + Math.abs(d.amount), 0)
  })

  const netDebt = computed(() => {
    return totalLend.value - totalOwe.value
  })

  // Actions
  const addTransaction = (newTx: { desc: string; amount: number; category: string; type: 'income' | 'expense'; date: string }) => {
    const nextId = transactions.value.length ? Math.max(...transactions.value.map(t => t.id)) + 1 : 1
    transactions.value.unshift({
      id: nextId,
      desc: newTx.desc,
      amount: newTx.amount,
      category: newTx.category,
      type: newTx.type,
      date: newTx.date
    })
  }

  const deleteTransaction = (id: number) => {
    transactions.value = transactions.value.filter(t => t.id !== id)
  }

  const addDebt = (newDebt: { name: string; amount: number; type: 'lend' | 'owe'; note: string }) => {
    const nextId = debts.value.length ? Math.max(...debts.value.map(d => d.id)) + 1 : 1
    const amt = newDebt.type === 'lend' ? newDebt.amount : -newDebt.amount
    debts.value.push({
      id: nextId,
      name: newDebt.name,
      amount: amt,
      type: newDebt.type,
      note: newDebt.note,
      color: newDebt.type === 'lend' ? '#10b981' : '#ef4444'
    })
  }

  const deleteDebt = (id: number) => {
    debts.value = debts.value.filter(d => d.id !== id)
  }

  const toggleSettleDone = (index: number) => {
    doneTransactions.value[index] = !doneTransactions.value[index]
  }

  const payPayment = (id: number) => {
    const payment = upcomingPayments.value.find(p => p.id === id)
    if (payment) {
      addTransaction({
        desc: payment.name,
        amount: payment.amount,
        category: 'Hóa đơn',
        type: 'expense',
        date: new Date().toISOString().substring(0, 10)
      })
      upcomingPayments.value = upcomingPayments.value.filter(p => p.id !== id)
    }
  }

  return {
    transactions,
    upcomingPayments,
    debts,
    doneTransactions,
    optimalSettlement,
    totalIncome,
    totalExpense,
    netBalance,
    totalLend,
    totalOwe,
    netDebt,
    addTransaction,
    deleteTransaction,
    addDebt,
    deleteDebt,
    toggleSettleDone,
    payPayment
  }
})
