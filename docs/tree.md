my-nuxt-project/
├── .nuxt/              # Thư mục build (do Nuxt tự tạo)
├── app/                # THƯ MỤC CHÍNH (Nuxt 4)
│   ├── assets/         # CSS, hình ảnh, font chữ
│   ├── components/     # Component của ứng dụng
│   │   ├── ui/         # [shadcn-vue] Các component UI (Button, Card, Input...)
│   │   └── ...         # Các component custom khác
│   ├── composables/    # Các logic có thể tái sử dụng
│   ├── layouts/        # Layout của trang (default.vue, auth.vue)
│   ├── middleware/     # Các hàm điều hướng (auth, guest)
│   ├── pages/          # Các trang (file-based routing)
│   ├── plugins/        # Plugin khởi tạo (nếu có)
│   ├── utils/          # Các hàm tiện ích (utils.ts cho tailwind)
│   ├── app.vue         # Root component
│   └── app.config.ts   # Cấu hình ứng dụng
├── public/             # Static files (favicon, robots.txt)
├── server/             # API routes, middleware server
├── components.json     # [shadcn-vue] Cấu hình shadcn cho dự án
├── nuxt.config.ts      # Cấu hình chính của Nuxt
├── tailwind.config.js  # Cấu hình Tailwind CSS
├── tsconfig.json       # Cấu hình TypeScript
└── package.json