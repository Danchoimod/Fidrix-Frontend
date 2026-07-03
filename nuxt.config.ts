import tailwindcss from '@tailwindcss/vite'

export default defineNuxtConfig({
  css: ['~/assets/css/tailwind.css'],
  compatibilityDate: '2025-01-01',
  experimental: {
    appManifest: false
  },
  app: {
    head: {
      link: [
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap'
        },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap'
        },
        {
          rel: 'icon',
          type: 'image/png',
          href: '/app_icon.png'
        }
      ]
    }
  },
  vite: {
    plugins: [tailwindcss()],
    optimizeDeps: {
      include: [
        '@lucide/vue',
        '@tanstack/vue-query',
        '@vueuse/core',
        'class-variance-authority',
        'clsx',
        'reka-ui',
        'tailwind-merge',
      ]
    }
  },
  modules: [
    'shadcn-nuxt',
    '@pinia/nuxt',
    '@vite-pwa/nuxt'
  ],
  pwa: {
    manifest: {
      name: 'Fidrix Quản Lý Tài Chính',
      short_name: 'Fidrix',
      description: 'Ứng dụng quản lý tài chính cá nhân đơn giản và hiệu quả',
      theme_color: '#0f172a',
      background_color: '#f0f2f5',
      icons: [
        {
          src: '/app_icon.png',
          sizes: '512x512',
          type: 'image/png',
          purpose: 'any maskable'
        }
      ]
    },
    workbox: {
      navigateFallback: '/'
    },
    devOptions: {
      enabled: true,
      type: 'module'
    }
  },
  shadcn: {
    /**
     * Prefix for all the imported component.
     * @default "Ui"
     */
    prefix: 'Ui',
    /**
     * Directory that the component lives in.
     * Will respect the Nuxt aliases.
     * @link https://nuxt.com/docs/api/nuxt-config#alias
     * @default "@/components/ui"
     */
    componentDir: '@/components/ui',
  },
})


