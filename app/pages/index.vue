<template>
  <main class="container">
    <h1>Chào mừng đến với Nuxt!</h1>
    <p>Đây là trang cơ bản đầu tiên của bạn.</p>
    
    <button @click="handleClick">
      Bấm vào đây
    </button>
    
    <p v-if="showMessage" class="success-msg">
      Bạn đã tương tác thành công!
    </p>
  </main>
</template>

<script setup>
// Sử dụng Composition API (phổ biến trong Nuxt)
import { ref } from 'vue'

// Khai báo biến reactive
const showMessage = ref(false)

// Khai báo hàm xử lý sự kiện
const handleClick = () => {
  showMessage.value = true
}
</script>

<style scoped>
/* Scoped giúp CSS chỉ áp dụng riêng cho trang này */
.container {
  font-family: sans-serif;
  text-align: center;
  margin-top: 50px;
}

h1 {
  color: #00dc82; /* Màu đặc trưng của Nuxt */
}

button {
  padding: 10px 20px;
  background-color: #00dc82;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
}

button:hover {
  background-color: #059c55;
}

.success-msg {
  color: #00dc82;
  font-weight: bold;
  margin-top: 15px;
}
</style>
