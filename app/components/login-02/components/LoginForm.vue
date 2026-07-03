<script setup lang="ts">
import type { HTMLAttributes } from "vue"
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from '@/components/ui/field'
import { Input } from '@/components/ui/input'

import { navigateTo, useCookie } from '#app'

const props = defineProps<{
  class?: HTMLAttributes["class"]
}>()

const handleLogin = () => {
  const auth = useCookie('auth')
  auth.value = 'true'
  navigateTo('/')
}
</script>

<template>
  <form @submit.prevent="handleLogin" :class="cn('flex flex-col gap-6', props.class)">
    <FieldGroup>
      <div class="flex flex-col items-center gap-1 text-center">
        <h1 class="text-2xl font-bold">
          Chào mừng trở lại
        </h1>
        <p class="text-muted-foreground text-sm text-balance">
          Nhập tài khoản của bạn dưới đây
        </p>
      </div>
      <Field>
        <FieldLabel for="email">
          Email
        </FieldLabel>
        <Input id="email" type="email" placeholder="m@example.com" required />
      </Field>
      <Field>
        <div class="flex items-center">
          <FieldLabel for="password">
            Mật khẩu
          </FieldLabel>
        </div>
        <Input id="password" type="password" required />
      </Field>
      <Field>
        <Button type="submit">
          Đăng nhập
        </Button>
      </Field>
    </FieldGroup>
  </form>
</template>
