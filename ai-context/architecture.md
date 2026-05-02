# PHIOBI: Architecture & Conventions

## 1. Data Fetching
- **Server First:** Priorizar Server Components para el fetching de datos desde Supabase para optimizar SEO y rendimiento.
- **Service Layer:** No hacer llamadas directas a APIs externas desde los componentes. Usar la carpeta `/services` para centralizar la lógica de la bolsa.
- **Cache:** Implementar Next.js `revalidate` para datos de mercado (EOD) para no saturar la cuota de la API.

## 2. Componentes
- **Atomic Design:** Usar `/components/ui` para elementos base.
- **Client Components:** Solo cuando haya interactividad (gráficas, formularios, toggles). Marcar con 'use client' explícitamente.
- **Gráficas:** Localizadas en `/components/assets/Chart.tsx` usando TradingView Lightweight Charts.

## 3. Estado y Auth
- **Auth:** Gestionada por Supabase Auth.
- **Context:** Minimizar el uso de Context Providers globales. Usar búsqueda por URL (searchParams) para filtros y navegación siempre que sea posible.

## 4. Estilo
- **Tailwind CSS:** Obligatorio.
- **Temas:** Soporte nativo para Dark Mode (fondo #0A0A0A, acento financiero verde/rojo sobrio).