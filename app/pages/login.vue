<script setup lang="ts">
import { GalleryVerticalEnd } from "@lucide/vue"
import LoginForm from '@/components/login-02/components/LoginForm.vue'

definePageMeta({
  layout: false
})
</script>

<template>
  <div class="grid min-h-svh lg:grid-cols-2">
    <div class="flex flex-col gap-4 p-6 md:p-10">
      <div class="flex justify-center gap-2 md:justify-start">
        <a href="#" class="flex items-center gap-2 font-medium">
          <div class="bg-primary text-primary-foreground flex size-6 items-center justify-center rounded-md">
            <GalleryVerticalEnd class="size-4" />
          </div>
          Fidrix
        </a>
      </div>
      <div class="flex flex-1 items-center justify-center">
        <div class="w-full max-w-xs">
          <LoginForm />
        </div>
      </div>
    </div>
    <div class="bg-muted relative hidden lg:block">
      <img
        src="~/assets/img/image.png"
        alt="Image"
        class="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
      >
      <div class="absolute inset-0 bg-black/45 flex flex-col items-center justify-center p-8 text-center text-white backdrop-blur-[2px]">
        <h2 class="text-3xl font-extrabold tracking-tight mb-2 text-white drop-shadow-md">Fidrix</h2>
        <p class="text-xl font-medium max-w-sm text-white/90 drop-shadow-sm">Quản lý tài chính đơn giản hơn</p>
      </div>
    </div>
  </div>
</template>
