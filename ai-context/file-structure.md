phiobi/
├── app/                  # Routing y Server Components (Next.js App Router)
│   ├── (auth)/           # Grupo de rutas para login/registro
│   ├── (dashboard)/      # Rutas protegidas (perfil, ajustes)
│   ├── assets/           # Rutas dinámicas de tickers: /assets/[symbol]
│   ├── tesis/            # Listado y detalle de tesis de inversión
│   ├── api/              # API Routes (webhooks, proxy de datos bolsa)
│   └── layout.tsx        # Layout principal (Nav, Footer)
├── components/           # Componentes React
│   ├── ui/               # Componentes atómicos (Botones, Inputs - estilo shadcn)
│   ├── shared/           # Componentes comunes (Navbar, Sidebar, Footer)
│   ├── assets/           # Lógica visual de tickers (Gráficas, Mini-fichas)
│   ├── forum/            # Componentes de hilos y comentarios
│   └── tesis/            # Card de tesis, editor de texto rico
├── lib/                  # Utilidades y configuraciones core
│   ├── supabase/         # Clientes de Supabase (client y server)
│   ├── utils/            # Helpers (formateo de moneda, fechas, tailwind-merge)
│   └── constants/        # Tickers permitidos, sectores, config de mercado
├── services/             # Lógica de fetching de datos externos
│   ├── bolsa/            # Wrappers para EODHD o Twelve Data
│   └── ai/               # Lógica para resúmenes y extracción de datos
├── hooks/                # Hooks personalizados (useAuth, useMarketData)
├── types/                # Definiciones de TypeScript (Interfaces de DB y API)
├── public/               # Assets estáticos (logos, iconos)
└── supabase/             # Migraciones y Seed de la base de datos